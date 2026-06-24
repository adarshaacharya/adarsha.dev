"use client";

import { Blog } from "contentlayer/generated";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BlogListItem } from "./blog-list-item";

type AnimatedBlogListProps = {
  posts: Array<
    Pick<Blog, "readingTime" | "slug" | "title" | "summary" | "publishedAt">
  >;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function AnimatedBlogList({ posts }: AnimatedBlogListProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">
          {searchQuery
            ? `No articles found matching "${searchQuery}"`
            : "No articles found"}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial={false}
      animate="visible"
      key={searchQuery || "all"}
    >
      {posts.map((blog) => (
        <motion.div
          key={blog.slug}
          variants={itemVariants}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Link
            href={`/blog/${blog.slug}`}
            className="block border-l-2 border-transparent hover:border-primary pl-4 -ml-4 transition-all duration-200"
          >
            <BlogListItem blog={blog} />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
