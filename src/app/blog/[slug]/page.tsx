import type { Metadata } from "next";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import { Mdx } from "@/components/mdx";
import { siteMetadata } from "@/data/siteMetadata";
import NotFound from "@/app/not-found";
import { formatDate } from "@/lib/utils";
import { getMDXComponent } from "next-contentlayer2/hooks";

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
    <section>
      <h1 className="text-2xl font-bold tracking-tighter">
        <Balancer>{blog.title}</Balancer>
      </h1>
      <div className="mb-8 mt-2 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          {formatDate(blog.publishedAt)} - {blog.readingTime.text}
        </p>
      </div>
      <Mdx code={blog.body.code} />
    </section>
  );
}
