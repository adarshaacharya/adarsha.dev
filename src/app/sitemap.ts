import { MetadataRoute } from "next";
import { allBlogs } from "contentlayer/generated";
import { siteMetadata } from "@/data/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl;

  const undraftedBlogs = allBlogs.filter((blog) => !blog.draft);
  const blogRoutes = undraftedBlogs.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
  }));

  const routes = ["", "blog", "projects", "privacy"].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogRoutes];
}
