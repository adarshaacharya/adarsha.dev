import { formatDate } from "@/lib/utils";
import { Blog } from "contentlayer/generated";
import { Calendar, Clock } from "lucide-react";

type BlogListItemProps = Pick<
  Blog,
  "readingTime" | "slug" | "title" | "summary" | "publishedAt"
>;

export function BlogListItem({ blog }: { blog: BlogListItemProps }) {
  return (
    <article className="group py-8 border-b border-border/40 last:border-b-0">
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{blog.readingTime.text}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors duration-200">
          {blog.title}
        </h2>

        <p className="text-muted-foreground leading-relaxed line-clamp-2">
          {blog.summary}
        </p>
      </div>
    </article>
  );
}
