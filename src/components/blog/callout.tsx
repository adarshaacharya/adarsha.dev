import * as React from "react";
import { Lightbulb, TriangleAlert, OctagonAlert, Info } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type CalloutVariant = "default" | "tip" | "warning" | "destructive";

const variantClassName: Record<CalloutVariant, string> = {
  default: "border-border border-l-border bg-muted/60 text-foreground",
  tip: "border-border border-l-primary bg-primary/5 text-foreground",
  warning: "border-border border-l-amber-500 bg-amber-500/5 text-foreground",
  destructive:
    "border-border border-l-destructive bg-destructive/5 text-foreground",
};

const variantIconClassName: Record<CalloutVariant, string> = {
  default: "text-muted-foreground",
  tip: "text-primary",
  warning: "text-amber-500",
  destructive: "text-destructive",
};

const variantIcon: Record<CalloutVariant, React.ComponentType<{ className?: string }>> = {
  default: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
  destructive: OctagonAlert,
};

/**
 * Editorial callout for MDX posts. Backward-compatible with the emoji prop.
 * Without an emoji, each variant falls back to its own icon so tip/warning/
 * destructive stay distinguishable even at a glance.
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
  const Icon = variantIcon[variant];

  return (
    <Alert
      className={cn(
        "not-prose my-8 w-full grid-cols-[auto_1fr] gap-x-3 rounded-lg border-l-[3px] px-4 py-3.5",
        variantClassName[variant],
      )}
    >
      <span
        className={cn(
          "row-span-2 mt-0.5 flex w-4 shrink-0 items-start leading-none",
          variantIconClassName[variant],
        )}
      >
        {emoji ? (
          <span className="text-base leading-none">{emoji}</span>
        ) : (
          <Icon className="size-4" />
        )}
      </span>
      {title ? (
        <AlertTitle className="col-start-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {title}
        </AlertTitle>
      ) : null}
      <AlertDescription
        className={cn(
          "callout col-start-2 mt-1 text-sm text-foreground [&_p]:m-0",
        )}
      >
        {children}
      </AlertDescription>
    </Alert>
  );
}
