import {
  formatBlogMarkdown,
  getBlogBySlug,
} from "@/lib/blog-markdown";

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug: string }> },
) {
  const { slug } = await props.params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = formatBlogMarkdown(blog);

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
