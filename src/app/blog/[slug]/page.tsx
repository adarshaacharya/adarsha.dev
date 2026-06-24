import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import { siteMetadata } from "@/data/siteMetadata";
import NotFound from "@/app/not-found";
import { formatDate } from "@/lib/utils";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export const generateStaticParams = async () =>
  allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const params = await props.params;
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) {
    return;
  }

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
      images: [
        {
          url: ogImage.toString(),
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [ogImage.toString()],
    },
  };
}

export default async function Blog(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  if (!blog) {
    return <NotFound />;
  }

  const Content = getMDXComponent(blog.body.code);

  return (
    <article className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/blog">
          <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
          Back
        </Link>
      </Button>

      <header className="space-y-5">
        <h1 className="font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
          <Balancer>{blog.title}</Balancer>
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {blog.summary}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground/70">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{blog.readingTime.text}</span>
          </div>
        </div>
      </header>

      <Separator />

      <Mdx code={blog.body.code} />
    </article>
  );
}
