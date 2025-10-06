import { formatDate } from "@/lib/utils";
import { Blog } from "contentlayer/generated";
import { ArrowRight, Clock } from "lucide-react";

type BlogListItemProps = Pick<
  Blog,
  "readingTime" | "slug" | "title" | "summary" | "publishedAt"
>;

export function BlogListItem({ blog }: { blog: BlogListItemProps }) {
  return (
    <article className="group py-8 border-b border-border/40 last:border-b-0">
      <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8">
        {/* Left side - Date and Reading time */}
        <div className="flex md:flex-col gap-3 md:gap-1 text-sm text-muted-foreground">
          <time dateTime={blog.publishedAt} className="whitespace-nowrap">
            {formatDate(blog.publishedAt)}
          </time>
          <div className="flex items-center gap-1.5 md:hidden">
            <Clock className="h-3.5 w-3.5" />
            <span>{blog.readingTime.text}</span>
          </div>
        </div>

        {/* Right side - Content */}
        <div className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
              {blog.title}
            </h2>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {blog.summary}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200">
              <span>Read article</span>
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Reading time for desktop */}
            <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>{blog.readingTime.text}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
