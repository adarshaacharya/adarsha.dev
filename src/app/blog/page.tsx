import { AnimatedBlogList } from "@/components/blog/animated-blog-list";
import { Pagination } from "@/components/blog/pagination";
import { SearchInput } from "../../components/blog/search-input";
import { generatePageMetadata } from "../seo";
import { getPublishedBlogs } from "@/lib/blog";

export const metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Thoughts on TypeScript, React, Next.js, AI, and modern web development.",
});

const BLOG_POSTS_PER_PAGE = 8;

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const searchQuery = resolvedSearchParams.search?.toString() || "";
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) || 1 : 1;

  const blogs = getPublishedBlogs();

  const filteredBlogs = searchQuery
    ? blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : blogs;

  const totalPages = Math.ceil(filteredBlogs.length / BLOG_POSTS_PER_PAGE);
  const currentPage = page > totalPages ? 1 : page;

  const currentPosts = filteredBlogs.slice(
    (currentPage - 1) * BLOG_POSTS_PER_PAGE,
    currentPage * BLOG_POSTS_PER_PAGE,
  );

  return (
    <div className="py-4 space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight" style={{ letterSpacing: "-0.03em" }}>
          Writing
        </h1>
        <p className="text-sm text-muted-foreground">
          {blogs.length} posts on TypeScript, React, AI, and what I learn building things.
        </p>
      </div>

      <SearchInput />

      <div>
        <AnimatedBlogList posts={currentPosts} />
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
