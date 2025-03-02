import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { rehypeCode, remarkGfm } from "fumadocs-core/mdx-plugins";

import rehypePrettyCode, {
  CharsElement,
  LineElement,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import readingTime from "reading-time";

async function transformMDX(document: any, context: any, options: any = {}) {
  const body = await compileMDX(context, document, {
    ...options,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: false,

          onVisitHighlightedLine(node: LineElement) {
            if (
              node.properties.className &&
              node.properties.className.length > 0
            ) {
              node.properties.className.push("line--highlighted");
            } else {
              node.properties.className = ["line--highlighted"];
            }
          },
          onVisitHighlightedChars(node: CharsElement) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  });
  return {
    ...document,
    body,
  };
}

const BlogPost = defineCollection({
  name: "BlogPost",
  directory: "src/content/",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    publishedAt: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
    slug: z.string().optional(),
  }),
  transform : transformMDX
});

export default defineConfig({
  collections: [BlogPost],
});
