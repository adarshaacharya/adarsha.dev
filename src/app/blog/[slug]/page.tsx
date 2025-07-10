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

// export async function generateStaticParams() {
//   const paths = allBlogs.map((blog) => ({ slug: blog.slug }));

//   return paths;
// }

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

  const ogImage = `${siteMetadata.siteUrl}/og?title=${blog.title}`;

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
          url: ogImage,
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
      images: [ogImage],
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
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to blog
        </Link>
      </Button>

      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          <Balancer>{blog.title}</Balancer>
        </h1>
        <p className="text-lg text-muted-foreground">{blog.summary}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{blog.readingTime.text}</span>
          </div>
        </div>
      </header>

      <Separator />

      <Mdx code={blog.body.code} />
    </article>
  );
}
