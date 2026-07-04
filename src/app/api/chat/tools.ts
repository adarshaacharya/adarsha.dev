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
const MAX_REMOTE_CONTENT_CHARS = 30000;
const REMOTE_CONTENT_CACHE_MS = 15 * 60 * 1000;

const remoteContentCache = new Map<
  string,
  {
    expiresAt: number;
    fetchedAt: string;
    requestedUrl: string;
    fetchUrl: string;
    content: string;
  }
>();

const githubContentCache = new Map<
  string,
  {
    expiresAt: number;
    fetchedAt: string;
    content: string;
  }
>();

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
  type: "blog" | "project" | "tool" | "metadata" | "resume" | "github";
  title: string;
  summary: string;
  url?: string;
  content: string;
};

type GitHubRepoRef = {
  owner: string;
  name: string;
  url: string;
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

function getConfiguredRemoteUrls() {
  return [
    ...Object.values(LINKS),
    siteMetadata.siteUrl,
    `${siteMetadata.siteUrl}/resume`,
    ...WEB_APPS.flatMap((project) => [project.demo, project.repo]),
    ...TOOLS.flatMap((item) => [item.demo, item.repo]),
  ].filter((url): url is string => Boolean(url));
}

function normalizeUrl(url: string) {
  const parsed = new URL(url);
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
}

function getGoogleDocsExportUrl(url: string) {
  const parsed = new URL(url);
  const documentId = parsed.pathname.match(/\/document\/d\/([^/]+)/)?.[1];

  if (!documentId) return null;

  return `https://docs.google.com/document/d/${documentId}/export?format=txt`;
}

function resolveAllowedRemoteUrl(url: string) {
  const requestedUrl = normalizeUrl(url);
  const resumePageUrl = normalizeUrl(`${siteMetadata.siteUrl}/resume`);
  const configuredUrls = new Set(getConfiguredRemoteUrls().map(normalizeUrl));

  if (!configuredUrls.has(requestedUrl)) {
    throw new Error("URL is not in the configured portfolio allowlist.");
  }

  const targetUrl = requestedUrl === resumePageUrl ? LINKS.RESUME : url;
  const googleDocsExportUrl = getGoogleDocsExportUrl(targetUrl);

  return {
    requestedUrl,
    fetchUrl: googleDocsExportUrl ?? targetUrl,
  };
}

async function fetchAllowedRemoteContent(url: string) {
  const { requestedUrl, fetchUrl } = resolveAllowedRemoteUrl(url);
  const cacheKey = normalizeUrl(fetchUrl);
  const cached = remoteContentCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(fetchUrl, {
      headers: {
        accept: "text/plain,text/markdown,text/html;q=0.8,*/*;q=0.5",
        "user-agent": "adarsha.dev portfolio assistant",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Remote URL returned HTTP ${response.status}.`);
    }

    const content = compactContent(
      await response.text(),
      MAX_REMOTE_CONTENT_CHARS,
    );
    const fetchedAt = new Date().toISOString();
    const result = {
      expiresAt: Date.now() + REMOTE_CONTENT_CACHE_MS,
      fetchedAt,
      requestedUrl,
      fetchUrl,
      content,
    };

    remoteContentCache.set(cacheKey, result);
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

function getGitHubUsername() {
  try {
    return new URL(siteMetadata.social.githubLink).pathname
      .split("/")
      .filter(Boolean)[0];
  } catch {
    return null;
  }
}

function parseGitHubRepoUrl(url: string | undefined) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;

    const [owner, rawName] = parsed.pathname.split("/").filter(Boolean);
    if (!owner || !rawName) return null;

    return {
      owner,
      name: rawName.replace(/\.git$/, ""),
      url: `https://github.com/${owner}/${rawName.replace(/\.git$/, "")}`,
    } satisfies GitHubRepoRef;
  } catch {
    return null;
  }
}

function getConfiguredGitHubRepos() {
  const repos = [
    parseGitHubRepoUrl(siteMetadata.repo),
    ...WEB_APPS.map((project) => parseGitHubRepoUrl(project.repo)),
    ...TOOLS.map((item) => parseGitHubRepoUrl(item.repo)),
  ].filter((repo): repo is GitHubRepoRef => Boolean(repo));

  const deduped = new Map<string, GitHubRepoRef>();
  for (const repo of repos) {
    deduped.set(`${repo.owner}/${repo.name}`.toLowerCase(), repo);
  }

  return Array.from(deduped.values());
}

async function fetchGitHubText(cacheKey: string, url: string, accept: string) {
  const cached = githubContentCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      headers: {
        accept,
        "user-agent": "adarsha.dev portfolio assistant",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`GitHub returned HTTP ${response.status}.`);
    }

    const content = compactContent(await response.text(), MAX_REMOTE_CONTENT_CHARS);
    const result = {
      expiresAt: Date.now() + REMOTE_CONTENT_CACHE_MS,
      fetchedAt: new Date().toISOString(),
      content,
    };

    githubContentCache.set(cacheKey, result);
    return result;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchGitHubJson(cacheKey: string, apiPath: string) {
  const result = await fetchGitHubText(
    cacheKey,
    `https://api.github.com${apiPath}`,
    "application/vnd.github+json",
  );

  return {
    ...result,
    data: JSON.parse(result.content) as Record<string, unknown>,
  };
}

async function buildGitHubCorpusFiles() {
  const username = getGitHubUsername();
  const repos = getConfiguredGitHubRepos();
  const files: PortfolioCorpusFile[] = [];

  if (username) {
    const profile = await fetchGitHubJson(
      `github:user:${username}`,
      `/users/${username}`,
    ).catch(() => null);

    if (profile) {
      files.push({
        path: "github/profile",
        type: "github",
        title: "GitHub profile",
        summary: `Public GitHub profile for ${username}.`,
        url: siteMetadata.social.githubLink,
        content: profile.content,
      });
    }
  }

  const repoResults = await Promise.allSettled(
    repos.map(async (repo) => {
      const result = await fetchGitHubJson(
        `github:repo:${repo.owner}/${repo.name}`,
        `/repos/${repo.owner}/${repo.name}`,
      );

      return {
        path: `github/repo/${repo.name.toLowerCase()}`,
        type: "github" as const,
        title: `GitHub repo: ${repo.name}`,
        summary:
          typeof result.data.description === "string"
            ? result.data.description
            : `Public GitHub metadata for ${repo.owner}/${repo.name}.`,
        url: repo.url,
        content: result.content,
      } satisfies PortfolioCorpusFile;
    }),
  );

  for (const result of repoResults) {
    if (result.status === "fulfilled") {
      files.push(result.value);
    }
  }

  return files;
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
  const githubFiles = await buildGitHubCorpusFiles();
  const remoteResume = await fetchAllowedRemoteContent(LINKS.RESUME).catch(
    (error) => ({
      fetchedAt: null,
      requestedUrl: normalizeUrl(LINKS.RESUME),
      fetchUrl: LINKS.RESUME,
      content: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }),
  );

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
    ...githubFiles,
    {
      path: "resume",
      type: "resume",
      title: "Resume",
      summary: "Adarsha's public resume link.",
      url: `${siteMetadata.siteUrl}/resume`,
      content: [
        `Resume redirect: ${siteMetadata.siteUrl}/resume`,
        `Google Docs resume: ${LINKS.RESUME}`,
        remoteResume.content
          ? `Live resume content fetched at ${remoteResume.fetchedAt}:\n${remoteResume.content}`
          : `Live resume content unavailable: ${
              "error" in remoteResume ? remoteResume.error : "No content found"
            }`,
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
    const readFile = (filePath, maxChars = 16000) => {
      const file = corpus.files.find((item) => item.path === filePath);
      if (!file) return null;
      return {
        ...file,
        content: String(file.content ?? "").slice(
          0,
          Math.max(1, Math.min(Number(maxChars) || 16000, 30000))
        ),
      };
    };
    const apiDescription = {
      idea: "Write normal synchronous JavaScript to inspect the portfolio corpus and return the exact evidence needed for the final answer.",
      dataModel: {
        file: {
          path: "stable id such as blog/my-post, project/cedular, resume, github/profile, github/repo/name",
          type: "blog | project | tool | metadata | resume | github",
          title: "human title",
          summary: "short host-provided index text",
          url: "public URL when available",
          content: "full local/remote content slice; GitHub entries are raw public GitHub API JSON text",
        },
      },
      api: [
        "portfolio.describe()",
        "portfolio.files.list(type?)",
        "portfolio.files.read(path, maxChars?)",
        "portfolio.files.readMany(paths, maxChars?)",
        "portfolio.files.search(query, limit?)",
        "portfolio.resume.link()",
        "portfolio.resume.read(maxChars?)",
        "portfolio.github.profile(maxChars?)",
        "portfolio.github.listRepos()",
        "portfolio.github.readRepo(repoName, maxChars?)",
      ],
      note: "Search is only a convenience. For better answers, list/read files and write your own filtering, JSON.parse, ranking, grouping, or extraction logic.",
    };
    const portfolio = Object.freeze({
      describe: () => apiDescription,
      files: Object.freeze({
        list: (type) => corpus.files
          .filter((file) => !type || file.type === type)
          .map(compactFile),
        read: readFile,
        readMany: (paths, maxChars = 12000) => (Array.isArray(paths) ? paths : [])
          .map((filePath) => readFile(filePath, maxChars))
          .filter(Boolean),
        search: (query, limit = 8) => corpus.files
          .map((file) => ({ ...compactFile(file), score: scoreFile(query, file) }))
          .filter((file) => file.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, Math.max(1, Math.min(Number(limit) || 8, 12))),
      }),
      listFiles: () => corpus.files.map(compactFile),
      readFile,
      search: (query, limit = 8) => corpus.files
        .map((file) => ({ ...compactFile(file), score: scoreFile(query, file) }))
        .filter((file) => file.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(1, Math.min(Number(limit) || 8, 12))),
      getResumeLink: () => corpus.resume,
      listGitHubRepos: () => corpus.files
        .filter((file) => file.type === "github" && file.path.startsWith("github/repo/"))
        .map(compactFile),
      resume: Object.freeze({
        link: () => corpus.resume,
        read: (maxChars) => readFile("resume", maxChars),
      }),
      github: Object.freeze({
        profile: (maxChars) => readFile("github/profile", maxChars),
        listRepos: () => corpus.files
          .filter((file) => file.type === "github" && file.path.startsWith("github/repo/"))
          .map(compactFile),
        readRepo: (repoName, maxChars) => {
          const normalizedName = normalize(repoName).replace(/^.*\\//, "");
          const file = corpus.files.find((item) =>
            item.type === "github" &&
            item.path.startsWith("github/repo/") &&
            item.path.split("/").pop() === normalizedName
          );
          if (!file) return null;
          return readFile(file.path, maxChars);
        },
      }),
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
      "CodeAct-style tool for portfolio lookups. Write a small synchronous JavaScript function body that inspects Adarsha's allowlisted portfolio corpus and returns evidence for the final answer. Start with portfolio.describe() if you need the runtime API. Prefer list/read/JSON.parse/custom filtering when useful; portfolio.files.search(query, limit) is only a convenience. Return only serializable data. No imports, network, filesystem, process, async, eval, or shell access.",
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
          "Synchronous JavaScript function body. Example: const files = portfolio.files.list(); return files.filter(f => f.type === 'project');",
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
