import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { getMDXComponent } from "next-contentlayer2/hooks";
import { BlogComments } from "./blog/blog-comments";
import { BeforeAfter } from "./blog/before-after";
import { BlogChart } from "./blog/chart";
import { Callout } from "./blog/callout";
import { CodeCompare } from "./blog/code-compare";
import { CodeBlock } from "./blog/code-block";
import { CollapsibleSection } from "./blog/collapsible-section";
import { FileTree } from "./blog/file-tree";
import { Step, Steps } from "./blog/steps";
import { Takeaway, Takeaways } from "./blog/takeaways";
import { Command, Output, Terminal } from "./blog/terminal";

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

const components = {
  Image: RoundedImage,
  a: CustomLink,
  BeforeAfter,
  BlogChart,
  Callout,
  CodeCompare,
  CollapsibleSection,
  Command,
  FileTree,
  Output,
  Step,
  Steps,
  Takeaway,
  Takeaways,
  Terminal,
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
