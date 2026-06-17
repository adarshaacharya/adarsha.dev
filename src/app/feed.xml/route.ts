import { siteMetadata } from "@/data/siteMetadata";
import { getPublishedBlogs } from "@/lib/blog";


function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const blogs = getPublishedBlogs();
  const siteUrl = siteMetadata.siteUrl.replace(/\/$/, "");
  const lastBuildDate = blogs[0]?.publishedAt ?? new Date().toISOString();

  const items = blogs
    .map((blog) => {
      const url = `${siteUrl}/blog/${blog.slug}`;

      return `
        <item>
          <title>${escapeXml(blog.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${new Date(blog.publishedAt).toUTCString()}</pubDate>
          <description>${escapeXml(blog.summary)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteMetadata.title)}</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(siteMetadata.description)}</description>
    <language>en-US</language>
    <lastBuildDate>${new Date(lastBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
