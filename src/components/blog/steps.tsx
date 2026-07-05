import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Numbered tutorial steps for MDX posts.
 *
 * ```mdx
 * <Steps>
 *   <Step title="Install dependencies">...</Step>
 *   <Step title="Configure routing">...</Step>
 * </Steps>
 * ```
 */
export function Steps({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  return (
    <div className="not-prose blog-editorial-surface my-8 p-4 sm:p-5">
      <ol className="relative m-0 list-none space-y-0 p-0">
        {steps.map((step, index) => {
          if (!React.isValidElement<{ title?: string; children?: React.ReactNode }>(step))
            return null;

          const isLast = index === steps.length - 1;

          return (
            <li key={index} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast ? (
                <span
                  className="absolute top-9 bottom-0 left-[15px] w-px bg-border"
                  aria-hidden="true"
                />
              ) : null}
              <Badge
                variant="outline"
                className="mt-0.5 size-8 shrink-0 justify-center rounded-full border-border bg-muted p-0 text-sm font-medium text-foreground"
              >
                {index + 1}
              </Badge>
              <div className="min-w-0 flex-1">
                {step.props.title ? (
                  <p className="m-0 text-base font-medium text-foreground">
                    {step.props.title}
                  </p>
                ) : null}
                <div
                  className={cn(
                    "prose prose-sm prose-slate dark:prose-invert max-w-none text-muted-foreground",
                    step.props.title && "mt-2",
                    "[&_pre]:my-4 [&_figure]:my-4",
                  )}
                >
                  {step.props.children}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Step({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-step-title={title}>
      {children}
    </div>
  );
}
