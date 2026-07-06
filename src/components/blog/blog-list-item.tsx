import { formatDate } from "@/lib/utils";
import type { Blog } from "contentlayer/generated";

type BlogListItemProps = Pick<
  Blog,
  "readingTime" | "slug" | "title" | "summary" | "publishedAt" | "updatedAt"
>;

export function BlogListItem({ blog }: { blog: BlogListItemProps }) {
  return (
    <article className="group py-6 border-b border-border/40 last:border-b-0">
      <div className="space-y-1.5">
        <h2 className="font-serif text-xl sm:text-2xl leading-snug group-hover:text-primary transition-colors duration-200">
          {blog.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {blog.summary}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60 pt-1">
          <time dateTime={blog.publishedAt}>
            {formatDate(blog.publishedAt)}
          </time>
          {blog.updatedAt ? (
            <>
              <span aria-hidden>·</span>
              <time dateTime={blog.updatedAt}>
                Updated {formatDate(blog.updatedAt)}
              </time>
            </>
          ) : null}
          <span aria-hidden>·</span>
          <span>{blog.readingTime.text}</span>
        </div>
      </div>
    </article>
  );
}
