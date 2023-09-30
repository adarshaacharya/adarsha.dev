import { formatDate } from "@/lib/utils";
import Link from "next/link";

type BlogCardProps = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
};

export function BlogCard({ blog }: { blog: BlogCardProps }) {
  return (
    <article className="space-y-2 cursor-pointer transition hover:bg-zinc-50 hover:dark:bg-zinc-800/50 p-4 rounded-lg">
      <dl>
        <dt className="sr-only">Published on</dt>
        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
          <time dateTime={blog.publishedAt}>
            {formatDate(blog.publishedAt)}
          </time>
        </dd>
      </dl>
      <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100
      
      ">
        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
      </h3>
      <p className="prose max-w-none text-gray-500 dark:text-gray-400">
        {blog.summary}
      </p>
    </article>
  );
}
