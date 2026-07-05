"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

/**
 * Collapsible section for optional depth in MDX posts.
 *
 * ```mdx
 * <CollapsibleSection title="Advanced configuration">
 *   Long JSON or reference content...
 * </CollapsibleSection>
 * ```
 */
export function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="not-prose blog-editorial-surface my-6 w-full overflow-hidden rounded-lg"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/50">
        <span>{title}</span>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-150",
            open && "rotate-90",
          )}
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="border-t border-border/60 px-4 py-3">
        <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-muted-foreground [&_pre]:my-4 [&_figure]:my-4">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
