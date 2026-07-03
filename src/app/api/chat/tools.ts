import { promises as fs } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { tool } from "ai";
import { z } from "zod/v4";
import { LINKS } from "@/data/links";
import { WEB_APPS, TOOLS } from "@/data/projects";
import { siteMetadata } from "@/data/siteMetadata";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const MAX_POST_CHARS = 16000;
const MAX_CODE_CHARS = 3000;
const MAX_CODE_RESULT_CHARS = 12000;

type BlogFile = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  draft: boolean;
  raw: string;
  body: string;
};

type PortfolioCorpusFile = {
  path: string;
  type: "blog" | "project" | "tool" | "metadata" | "resume";
  title: string;
  summary: string;
  url?: string;
  content: string;
};

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { frontmatter: {} as Record<string, string>, body: raw };
  }

  const frontmatter = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => {
        const index = line.indexOf(":");
        if (index === -1) return null;
        const key = line.slice(0, index).trim();
        const value = line
          .slice(index + 1)
          .trim()
          .replace(/^["']|["']$/g, "");
        return [key, value];
      })
      .filter((entry): entry is [string, string] => Boolean(entry)),
  );

  return {
    frontmatter,
    body: raw.slice(match[0].length),
  };
}

async function readBlogFiles() {
  const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);

  const blogs = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, file), "utf8");
      const { frontmatter, body } = parseFrontmatter(raw);

      return {
        slug: file.replace(/\.mdx$/, ""),
        title: frontmatter.title ?? file.replace(/\.mdx$/, ""),
        summary: frontmatter.summary ?? "",
        publishedAt: frontmatter.publishedAt ?? "",
        draft: frontmatter.draft === "true",
        raw,
        body,
      } satisfies BlogFile;
    }),
  );

  return blogs
    .filter((blog) => !blog.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function compactContent(content: string, maxChars = MAX_POST_CHARS) {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .slice(0, maxChars);
}

function normalizeCodeResult(value: unknown) {
  const serialized =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);

  if (!serialized) return "";

  return serialized.slice(0, MAX_CODE_RESULT_CHARS);
}

function assertSafePortfolioCode(code: string) {
  if (code.length > MAX_CODE_CHARS) {
    throw new Error(`Code is too long. Keep it under ${MAX_CODE_CHARS} chars.`);
  }

  const forbiddenPattern =
    /\b(?:import|require|process|globalThis|global|Function|eval|constructor|__proto__|prototype|fetch|XMLHttpRequest|WebSocket|setTimeout|setInterval|Promise|async|await)\b/;

  if (forbiddenPattern.test(code)) {
    throw new Error(
      "Code uses blocked runtime features. Use only synchronous JavaScript over the portfolio API.",
    );
  }
}

async function buildPortfolioCorpus() {
  const blogs = await readBlogFiles();

  const files: PortfolioCorpusFile[] = [
    ...blogs.map((blog) => ({
      path: `blog/${blog.slug}`,
      type: "blog" as const,
      title: blog.title,
      summary: blog.summary,
      url: `${siteMetadata.siteUrl}/blog/${blog.slug}`,
      content: compactContent(blog.body, 30000),
    })),
    ...WEB_APPS.map((project) => ({
      path: `project/${project.title.toLowerCase().replace(/\W+/g, "-")}`,
      type: "project" as const,
      title: project.title,
      summary: project.description,
      url: project.demo ?? project.repo,
      content: [
        project.description,
        `Tags: ${project.tags.join(", ")}`,
        project.demo ? `Demo: ${project.demo}` : "",
        project.repo ? `Repo: ${project.repo}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    })),
    ...TOOLS.map((item) => ({
      path: `tool/${item.title.toLowerCase().replace(/\W+/g, "-")}`,
      type: "tool" as const,
      title: item.title,
      summary: item.description,
      url: item.demo ?? item.repo,
      content: [
        item.description,
        `Tech: ${item.techs.join(", ")}`,
        item.demo ? `Demo: ${item.demo}` : "",
        item.repo ? `Repo: ${item.repo}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    })),
    {
      path: "resume",
      type: "resume",
      title: "Resume",
      summary: "Adarsha's public resume link.",
      url: `${siteMetadata.siteUrl}/resume`,
      content: [
        `Resume redirect: ${siteMetadata.siteUrl}/resume`,
        `Google Docs resume: ${LINKS.RESUME}`,
      ].join("\n"),
    },
    {
      path: "metadata/contact",
      type: "metadata",
      title: "Contact and social links",
      summary: "Official contact and social profile metadata.",
      url: siteMetadata.siteUrl,
      content: JSON.stringify(
        {
          name: siteMetadata.author,
          site: siteMetadata.siteUrl,
          email: siteMetadata.social.email,
          github: siteMetadata.social.githubLink,
          linkedin: siteMetadata.social.linkedinLink,
          x: siteMetadata.social.x,
        },
        null,
        2,
      ),
    },
  ];

  return {
    files,
    resume: {
      url: `${siteMetadata.siteUrl}/resume`,
      googleDocsUrl: LINKS.RESUME,
    },
  };
}

function executePortfolioCodeInSandbox(code: string, corpus: unknown) {
  assertSafePortfolioCode(code);

  const script = new vm.Script(
    `
    "use strict";
    const corpus = JSON.parse(corpusJson);
    const normalize = (value) => String(value ?? "").toLowerCase();
    const termsFor = (query) => normalize(query).split(/\\W+/).filter((term) => term.length > 2);
    const scoreFile = (query, file) => {
      const terms = termsFor(query);
      const haystack = normalize([file.path, file.title, file.summary, file.content].join(" "));
      return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
    };
    const compactFile = (file) => ({
      path: file.path,
      type: file.type,
      title: file.title,
      summary: file.summary,
      url: file.url,
    });
    const portfolio = Object.freeze({
      listFiles: () => corpus.files.map(compactFile),
      readFile: (filePath) => {
        const file = corpus.files.find((item) => item.path === filePath);
        if (!file) return null;
        return { ...file, content: String(file.content ?? "").slice(0, 16000) };
      },
      search: (query, limit = 8) => corpus.files
        .map((file) => ({ ...compactFile(file), score: scoreFile(query, file) }))
        .filter((file) => file.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(1, Math.min(Number(limit) || 8, 12))),
      getResumeLink: () => corpus.resume,
    });

    (function () {
      "use strict";
      ${code}
    })();
    `,
    {
      filename: "portfolio-code-action.js",
    },
  );

  return script.runInNewContext(
    Object.create(null, {
      corpusJson: {
        value: JSON.stringify(corpus),
        enumerable: true,
      },
    }),
    {
      displayErrors: false,
      timeout: 250,
    },
  );
}

export const portfolioTools = {
  executePortfolioCode: tool({
    description:
      "CodeAct-style tool for all portfolio lookups. Write a small synchronous JavaScript function body to inspect Adarsha's allowlisted portfolio corpus. Use it to search content, list blog posts/projects/tools, read a blog/project/tool/metadata file by path, get contact links from metadata/contact, or get the resume link. Available API: portfolio.listFiles(), portfolio.readFile(path), portfolio.search(query, limit), portfolio.getResumeLink(). Return only serializable data. No imports, network, filesystem, process, async, eval, or shell access.",
    inputSchema: z.object({
      task: z
        .string()
        .min(1)
        .describe("What the generated code is trying to inspect or compute."),
      code: z
        .string()
        .min(1)
        .max(MAX_CODE_CHARS)
        .describe(
          "Synchronous JavaScript function body. Example: return portfolio.search('AI SDK', 5);",
        ),
    }),
    execute: async ({ task, code }) => {
      try {
        const corpus = await buildPortfolioCorpus();
        const result = executePortfolioCodeInSandbox(code, corpus);

        return {
          ok: true,
          task,
          result: normalizeCodeResult(result),
        };
      } catch (error) {
        return {
          ok: false,
          task,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  }),
};
