import { formatDate } from "@/lib/utils";
import { Blog } from "contentlayer/generated";

type BlogListItemProps = Pick<
  Blog,
  "readingTime" | "slug" | "title" | "summary" | "publishedAt"
>;

export function BlogListItem({ blog }: { blog: BlogListItemProps }) {
  return (
    <article className="group py-5 border-b border-border/60 last:border-0">
      <div className="flex items-baseline gap-5 sm:gap-8">
        <time
          dateTime={blog.publishedAt}
          className="hidden sm:block text-xs text-muted-foreground tabular-nums w-24 flex-shrink-0"
        >
          {formatDate(blog.publishedAt)}
        </time>
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200" style={{ textWrap: "balance" } as React.CSSProperties}>
              {blog.title}
            </h2>
            <span className="hidden sm:block text-xs text-muted-foreground/70 flex-shrink-0 tabular-nums mt-0.5">
              {blog.readingTime.text}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {blog.summary}
          </p>
          <div className="flex items-center gap-3 sm:hidden text-xs text-muted-foreground/70 tabular-nums">
            <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
            <span>·</span>
            <span>{blog.readingTime.text}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
