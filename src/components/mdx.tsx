import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { BlogComments } from "./blog-comments";

function CustomLink(props: { href: string; children: React.ReactNode }) {
  const { href, ...rest } = props;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: { alt: string; src: string }) {
  return <Image {...props} alt={props.alt} className="rounded-lg" />;
}

function Callout(props: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
};

export function Mdx({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code);

  return (
    <React.Fragment>
      {/* https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width */}
      <article className="prose prose-neutral dark:prose-invert prose-quoteless  max-w-none">
        <MDXComponent components={components} />
      </article>
      <BlogComments />
    </React.Fragment>
  );
}
