import { promises as fs } from "node:fs";
import path from "node:path";
import { tool } from "ai";
import { z } from "zod/v4";
import { WEB_APPS, TOOLS } from "@/data/projects";
import { siteMetadata } from "@/data/siteMetadata";

const CONTENT_DIR = path.join(process.cwd(), "src/content");
const MAX_POST_CHARS = 16000;

type BlogFile = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  draft: boolean;
  raw: string;
  body: string;
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

function scoreText(query: string, values: string[]) {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 2);
  const haystack = values.join(" ").toLowerCase();

  return terms.reduce((score, term) => {
    if (haystack.includes(term)) return score + 1;
    return score;
  }, 0);
}

export const portfolioTools = {
  searchSiteContent: tool({
    description:
      "Search Adarsha's local portfolio content, including blog posts, project data, tools, and contact metadata. Use this before answering specific questions.",
    inputSchema: z.object({
      query: z.string().min(1).describe("The user's search topic."),
      limit: z.number().int().min(1).max(8).default(5),
    }),
    execute: async ({ query, limit }) => {
      const blogs = await readBlogFiles();

      const blogMatches = blogs
        .map((blog) => ({
          type: "blog",
          title: blog.title,
          url: `${siteMetadata.siteUrl}/blog/${blog.slug}`,
          summary: blog.summary,
          publishedAt: blog.publishedAt,
          score: scoreText(query, [
            blog.slug,
            blog.title,
            blog.summary,
            blog.body.slice(0, 4000),
          ]),
        }))
        .filter((item) => item.score > 0);

      const webAppMatches = WEB_APPS.map((project) => ({
        type: "project",
        title: project.title,
        url: project.demo ?? project.repo,
        summary: project.description,
        tags: project.tags,
        score: scoreText(query, [
          project.title,
          project.description,
          project.tags.join(" "),
        ]),
      })).filter((item) => item.score > 0);

      const toolMatches = TOOLS.map((item) => ({
        type: "tool",
        title: item.title,
        url: item.demo,
        repo: item.repo,
        summary: item.description,
        tags: item.techs,
        score: scoreText(query, [
          item.title,
          item.description,
          item.techs.join(" "),
        ]),
      })).filter((item) => item.score > 0);

      return [...blogMatches, ...webAppMatches, ...toolMatches]
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    },
  }),

  listBlogPosts: tool({
    description:
      "List published blog posts with titles, summaries, dates, slugs, and URLs.",
    inputSchema: z.object({
      limit: z.number().int().min(1).max(20).default(10),
    }),
    execute: async ({ limit }) => {
      const blogs = await readBlogFiles();

      return blogs.slice(0, limit).map((blog) => ({
        slug: blog.slug,
        title: blog.title,
        summary: blog.summary,
        publishedAt: blog.publishedAt,
        url: `${siteMetadata.siteUrl}/blog/${blog.slug}`,
      }));
    },
  }),

  readBlogPost: tool({
    description:
      "Read one local MDX blog post by slug. Use this when a user asks about details from a specific article.",
    inputSchema: z.object({
      slug: z.string().min(1).describe("Blog slug, without .mdx."),
    }),
    execute: async ({ slug }) => {
      const blogs = await readBlogFiles();
      const blog = blogs.find((item) => item.slug === slug);

      if (!blog) {
        return { found: false, slug };
      }

      return {
        found: true,
        slug: blog.slug,
        title: blog.title,
        summary: blog.summary,
        publishedAt: blog.publishedAt,
        url: `${siteMetadata.siteUrl}/blog/${blog.slug}`,
        content: compactContent(blog.body),
      };
    },
  }),

  listProjects: tool({
    description:
      "List Adarsha's projects and small tools from the portfolio data.",
    inputSchema: z.object({
      type: z.enum(["web-apps", "tools", "all"]).default("all"),
    }),
    execute: async ({ type }) => ({
      webApps:
        type === "tools"
          ? []
          : WEB_APPS.map((project) => ({
              title: project.title,
              description: project.description,
              tags: project.tags,
              repo: project.repo,
              demo: project.demo,
            })),
      tools:
        type === "web-apps"
          ? []
          : TOOLS.map((item) => ({
              title: item.title,
              description: item.description,
              techs: item.techs,
              repo: item.repo,
              demo: item.demo,
            })),
    }),
  }),

  getContactInfo: tool({
    description:
      "Get Adarsha's official contact links and social profiles from site metadata.",
    inputSchema: z.object({}),
    execute: async () => ({
      name: siteMetadata.author,
      site: siteMetadata.siteUrl,
      email: siteMetadata.social.email,
      github: siteMetadata.social.githubLink,
      linkedin: siteMetadata.social.linkedinLink,
      x: siteMetadata.social.x,
    }),
  }),
};
