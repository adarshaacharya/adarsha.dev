import { AnimatedBlogList } from "@/components/blog/animated-blog-list";
import { Pagination } from "@/components/blog/pagination";
import { SearchInput } from "../../components/blog/search-input";
import { allBlogs } from "contentlayer/generated";
import { generatePageMetadata } from "../seo";
import { ENV } from "@/lib/env";

export const metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Explore my blog posts on Javascript, Typescript, React.js, Next.js, Prisma, Nest.js, AI , LLMs and more.",
});

const isProd = ENV.NODE_ENV === "production";
const BLOG_POSTS_PER_PAGE = 6;

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const searchQuery = resolvedSearchParams.search?.toString() || "";
  const page = typeof pageParam === "string" ? parseInt(pageParam, 10) || 1 : 1;

  const blogs = allBlogs.sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const undraftedBlogs = isProd ? blogs.filter((blog) => !blog.draft) : blogs;

  const filteredBlogs = searchQuery
    ? undraftedBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : undraftedBlogs;

  const totalPages = Math.ceil(filteredBlogs.length / BLOG_POSTS_PER_PAGE);
  const currentPage = page > totalPages ? 1 : page;

  const currentPosts = filteredBlogs.slice(
    (currentPage - 1) * BLOG_POSTS_PER_PAGE,
    currentPage * BLOG_POSTS_PER_PAGE,
  );

  return (
    <div className="space-y-10 md:space-y-12">
      <section className="space-y-8 md:space-y-10">
        <div className="space-y-5 md:space-y-6">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              Blog
            </h1>
            <p className="text-muted-foreground max-w-3xl text-sm md:text-base">
              Thoughts on software development, web technologies, Generative AI, and
              engineering practices.
            </p>
          </div>
          <SearchInput />
        </div>

        <div className="max-w-5xl">
          <AnimatedBlogList posts={currentPosts} />
        </div>
      </section>
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
