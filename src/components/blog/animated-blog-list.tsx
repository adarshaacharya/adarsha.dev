"use client";

import { Blog } from "contentlayer/generated";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "./blog-card";

type AnimatedBlogListProps = {
  posts: Array<
    Pick<Blog, "readingTime" | "slug" | "title" | "summary" | "publishedAt">
  >;
};

export function AnimatedBlogList({ posts }: AnimatedBlogListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  return (
    <motion.ul
      className="space-y-4"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      key={searchQuery}
      initial={searchQuery ? { opacity: 0.6 } : false}
    >
      {posts.map((blog) => (
        <li
          key={blog.slug}
          className="py-1 divide-y divide-gray-200 dark:divide-gray-700"
        >
          <Link href={`/blog/${blog.slug}`}>
            <BlogCard blog={blog} />
          </Link>
        </li>
      ))}
    </motion.ul>
  );
}
