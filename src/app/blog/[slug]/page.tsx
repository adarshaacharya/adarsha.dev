import type { GetStaticPaths, Metadata } from "next";
import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import { siteMetadata } from "@/data/siteMetadata";
import NotFound from "@/app/not-found";

export async function generateStaticParams() {
  const paths = allBlogs.map((blog) => ({ slug: blog.slug }));

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const blog = allBlogs.find((p) => p.slug === params.slug);
  if (!blog) {
    return;
  }

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
      url: "./",
      authors: siteMetadata.author,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
    },
  };
}

export default async function Blog({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    return <NotFound />;
  }

  return (
    <section>
      <h1 className="max-w-[650px] text-2xl font-bold tracking-tighter">
        <Balancer>{blog.title}</Balancer>
      </h1>
      <div className="mb-8 mt-2 flex max-w-[650px] items-center justify-between text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {blog.publishedAt}
        </p>
      </div>
      <Mdx code={blog.body.code} />
    </section>
  );
}
