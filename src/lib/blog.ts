import { allBlogs } from "contentlayer/generated";
import { ENV } from "@/lib/env";

const isProd = ENV.NODE_ENV === "production";

export function getPublishedBlogs() {
  const blogs = [...allBlogs].sort((a, b) => {
    if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
      return -1;
    }

    return 1;
  });

  return isProd ? blogs.filter((blog) => !blog.draft) : blogs;
}
