import { allBlogs, type Blog } from "contentlayer/generated";
import { siteMetadata } from "@/data/siteMetadata";
import { ENV } from "@/lib/env";
export { buildAiPrompt } from "@/lib/blog-ai-prompt";

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
  const metadata = [
    `title: ${JSON.stringify(blog.title)}`,
    `url: ${postUrl}`,
    `publishedAt: ${blog.publishedAt}`,
    blog.updatedAt ? `updatedAt: ${blog.updatedAt}` : null,
    `summary: ${JSON.stringify(blog.summary)}`,
  ].filter(Boolean);

  return `---
${metadata.join("\n")}
---

# ${blog.title}

> ${blog.summary}

Source: ${postUrl}

${blog.body.raw.trim()}
`;
}
