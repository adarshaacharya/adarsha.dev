import * as React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type CalloutVariant = "default" | "tip" | "warning" | "destructive";

const variantClassName: Record<CalloutVariant, string> = {
  default: "border-border bg-muted/60 text-foreground",
  tip: "border-primary/20 bg-primary/5 text-foreground",
  warning: "border-amber-500/30 bg-amber-500/5 text-foreground",
  destructive: "border-destructive/30 bg-destructive/5 text-foreground",
};

/**
 * Editorial callout for MDX posts. Backward-compatible with the emoji prop.
 *
 * ```mdx
 * <Callout emoji="💡">Tip text here.</Callout>
 * <Callout variant="warning" title="Heads up">...</Callout>
 * ```
 */
export function Callout({
  emoji,
  title,
  variant = "default",
  children,
}: {
  emoji?: string;
  title?: string;
  variant?: CalloutVariant;
  children: React.ReactNode;
}) {
  return (
    <Alert
      className={cn(
        "not-prose my-8 w-full grid-cols-[auto_1fr] gap-x-3 rounded-lg px-4 py-3",
        variantClassName[variant],
        !emoji && "grid-cols-1",
      )}
    >
      {emoji ? (
        <span className="row-span-2 mt-0.5 flex w-4 shrink-0 items-start text-base leading-none">
          {emoji}
        </span>
      ) : null}
      {title ? <AlertTitle className="col-start-2">{title}</AlertTitle> : null}
      <AlertDescription
        className={cn(
          "callout text-sm text-foreground [&_p]:m-0",
          title ? "col-start-2" : emoji ? "col-start-2" : undefined,
        )}
      >
        {children}
      </AlertDescription>
    </Alert>
  );
}
