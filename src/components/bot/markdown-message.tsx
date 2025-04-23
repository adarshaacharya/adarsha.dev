import ReactMarkdown from "react-markdown";
import Link from "next/link";

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <>
      <ReactMarkdown
        components={{
          a: ({ node, ref, ...props }) => (
            <Link
              {...props}
              href={props.href ?? ""}
              className="text-primary hover:underline"
            />
          ),
          p: ({ node, ...props }) => (
            <p {...props} className="mt-3 first:mt-0" />
          ),
          ul: ({ node, ...props }) => (
            <ul {...props} className="mt-3 list-inside list-disc first:mt-0" />
          ),
          ol: ({ node, ...props }) => (
            <ol
              {...props}
              className="mt-3 list-inside list-decimal first:mt-0"
            />
          ),
          li: ({ node, ...props }) => <li {...props} className="mt-1" />,
          blockquote: ({ node, ...props }) => (
            <blockquote {...props} className="text-primary" />
          ),
          code: ({ node, ...props }) => {
            const { inline } = node as any;
            return (
              <code
                {...props}
                className={`rounded p-1 ${
                  inline ? "inline-block" : "block"
                } mt-3 first:mt-0 text-primary`}
              />
            );
          },
          pre: ({ node, ...props }) => (
            <pre
              {...props}
              className="bg-gray-100 rounded p-3 overflow-auto mt-3 first:mt-0"
            />
          ),
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-3xl font-bold mt-4 first:mt-0" />
          ),
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-2xl font-bold mt-3 first:mt-0" />
          ),
          h3: ({ node, ...props }) => (
            <h3 {...props} className="text-xl font-bold mt-3 first:mt-0" />
          ),
          h4: ({ node, ...props }) => (
            <h4 {...props} className="text-lg font-bold mt-3 first:mt-0" />
          ),
          h5: ({ node, ...props }) => (
            <h5 {...props} className="text-base font-bold mt-3 first:mt-0" />
          ),
          h6: ({ node, ...props }) => (
            <h6 {...props} className="text-sm font-bold mt-3 first:mt-0" />
          ),
          table: ({ node, ...props }) => (
            <table
              {...props}
              className="w-full mt-3 border-collapse border border-gray-200 first:mt-0"
            />
          ),
          thead: ({ node, ...props }) => (
            <thead {...props} className="bg-gray-100" />
          ),
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => (
            <tr {...props} className="border-t border-gray-200" />
          ),
          th: ({ node, ...props }) => (
            <th {...props} className="px-4 py-2 text-left font-semibold" />
          ),
          td: ({ node, ...props }) => <td {...props} className="px-4 py-2" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </>
  );
}
