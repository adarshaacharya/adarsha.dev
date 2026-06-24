import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { BlogComments } from "./blog/blog-comments";
import { CodeCompare } from "./blog/code-compare";
import { CodeBlock } from "./blog/code-block";
import { FileTree } from "./blog/file-tree";

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
    <div className="mb-8 flex items-start rounded-lg border border-border bg-muted/60 px-4 py-3 text-sm text-foreground">
      <div className="mr-3 mt-0.5 flex w-4 shrink-0 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  CodeCompare,
  FileTree,
  figure: CodeBlock,
};

export function Mdx({ code }: { code: string }) {
  const Content = getMDXComponent(code);

  return (
    <React.Fragment>
      {/* https://github.com/tailwindlabs/tailwindcss-typography#overriding-max-width */}
      <article className="prose prose-slate dark:prose-invert prose-quoteless max-w-none">
        <React.Suspense fallback={null}>
          <Content components={components} />
        </React.Suspense>
      </article>
      <BlogComments />
    </React.Fragment>
  );
}
