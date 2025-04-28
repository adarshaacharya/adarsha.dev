import { BlogCard } from "@/components/blog/blog-card";
import { Pagination } from "@/components/blog/pagination";
import { allBlogs } from "contentlayer/generated";
import { generatePageMetadata } from "../seo";
import Link from "next/link";
import { ENV } from "@/lib/env";

export const metadata = generatePageMetadata({
  title: "Blog",
  description: "Read my blogs on web development, design and more.",
});

const isProd = ENV.NODE_ENV === "production";
const BLOG_POSTS_PER_PAGE = 6;

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const pageParam = (await searchParams).page;
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) || 1 : 1;

  const blogs = allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const undraftedBlogs = isProd ? blogs.filter((blog) => !blog.draft) : blogs;

  const totalPages = Math.ceil(undraftedBlogs.length / BLOG_POSTS_PER_PAGE);
  const currentPage = page > totalPages ? 1 : page;

  const currentPosts = undraftedBlogs.slice(
    (currentPage - 1) * BLOG_POSTS_PER_PAGE,
    currentPage * BLOG_POSTS_PER_PAGE,
  );

  return (
    <section>
      <ul className="space-y-4">
        {currentPosts.map((blog) => (
          <li
            key={blog.slug}
            className="py-1 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <Link href={`/blog/${blog.slug}`}>
              <BlogCard blog={blog} />
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </section>
  );
}
