import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import { siteMetadata } from "@/data/siteMetadata";
import NotFound from "@/app/not-found";
import { formatDate } from "@/lib/utils";
import { getMDXComponent } from "next-contentlayer2/hooks";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const generateStaticParams = async () =>
  allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) return;

  const ogImage = new URL("/og", siteMetadata.siteUrl);
  ogImage.searchParams.set("title", blog.title);

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: blog.publishedAt,
      url: `${siteMetadata.siteUrl}/blog/${blog.slug}`,
      authors: siteMetadata.author,
      images: [{ url: ogImage.toString(), width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [ogImage.toString()],
    },
  };
}

export default async function BlogPost(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  if (!blog) return <NotFound />;

  const Content = getMDXComponent(blog.body.code);

  return (
    <article className="py-4">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-10 group"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        Writing
      </Link>

      {/* Header */}
      <header className="mb-10 max-w-2xl">
        <h1
          className="text-3xl sm:text-4xl font-black tracking-tight leading-tight mb-4"
          style={{ letterSpacing: "-0.03em", textWrap: "balance" } as React.CSSProperties}
        >
          <Balancer>{blog.title}</Balancer>
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed mb-5">
          {blog.summary}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
          <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
          <span className="text-border">·</span>
          <span>{blog.readingTime.text}</span>
        </div>
      </header>

      <div className="w-full border-t border-border mb-10" />

      {/* Prose — Spectral font applied via global.css .prose */}
      <div className="max-w-2xl">
        <Mdx code={blog.body.code} />
      </div>
    </article>
  );
}
