import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

/**
 * Structured decision/takeaway list for comparison posts.
 *
 * ```mdx
 * <Takeaways>
 *   <Takeaway title="Deployment target">If you run on Vercel...</Takeaway>
 * </Takeaways>
 * ```
 */
export function Takeaways({ children }: { children: React.ReactNode }) {
  const items = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  return (
    <Card className="not-prose blog-editorial-surface my-8 w-full rounded-lg shadow-none">
      <CardContent className="p-0">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 ? <Separator className="bg-border/60" /> : null}
            {item}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}

export function Takeaway({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 px-4 py-4 sm:px-5">
      <span
        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="m-0 font-medium text-foreground">{title}</p>
        <div className="prose prose-sm prose-slate dark:prose-invert mt-2 max-w-none text-muted-foreground [&_p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}
