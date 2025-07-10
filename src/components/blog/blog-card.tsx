import { formatDate } from "@/lib/utils";
import { Blog } from "contentlayer/generated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

type BlogCardProps = Pick<
  Blog,
  "readingTime" | "slug" | "title" | "summary" | "publishedAt"
>;

export function BlogCard({ blog }: { blog: BlogCardProps }) {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog.publishedAt}>
              {formatDate(blog.publishedAt)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{blog.readingTime.text}</span>
          </div>
        </div>
        <CardTitle className="line-clamp-2 text-lg">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
          {blog.summary}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
