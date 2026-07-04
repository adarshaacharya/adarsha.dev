import { allBlogs, type Blog } from "contentlayer/generated";
import { siteMetadata } from "@/data/siteMetadata";
import { ENV } from "@/lib/env";

const isProd = ENV.NODE_ENV === "production";

export function getBlogBySlug(slug: string) {
  const blog = allBlogs.find((entry) => entry._raw.flattenedPath === slug);
  if (!blog) return null;
  if (isProd && blog.draft) return null;
  return blog;
}

export function getBlogMarkdownUrl(slug: string) {
  return `/blog/${slug}.md`;
}

export function getBlogPostUrl(slug: string) {
  return `${siteMetadata.siteUrl}/blog/${slug}`;
}

export function formatBlogMarkdown(blog: Blog) {
  const postUrl = getBlogPostUrl(blog.slug);

  return `---
title: ${JSON.stringify(blog.title)}
url: ${postUrl}
publishedAt: ${blog.publishedAt}
summary: ${JSON.stringify(blog.summary)}
---

# ${blog.title}

> ${blog.summary}

Source: ${postUrl}

${blog.body.raw.trim()}
`;
}

export function buildAiPrompt({
  title,
  markdown,
  markdownUrl,
  postUrl,
  maxChars = 24000,
}: {
  title: string;
  markdown: string;
  markdownUrl: string;
  postUrl: string;
  maxChars?: number;
}) {
  const truncated =
    markdown.length > maxChars
      ? `${markdown.slice(0, maxChars).trimEnd()}\n\n...[truncated]`
      : markdown;

  return `Please read and help me understand this article titled "${title}".

${truncated}

Full markdown: ${markdownUrl}
Original post: ${postUrl}`;
}
