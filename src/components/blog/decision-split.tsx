import * as React from "react";
import { cn } from "@/lib/utils";

type DecisionOptionProps = {
  label: string;
  headline: React.ReactNode;
  tone?: "default" | "primary";
  side?: "left" | "right";
  children: React.ReactNode;
};

/**
 * A compact two-way decision for comparison posts.
 *
 * ```mdx
 * <DecisionSplit note="Keep stable code when neither option earns a rewrite.">
 *   <DecisionOption label="Stay with X" headline="A short decision rule.">...</DecisionOption>
 *   <DecisionOption side="right" tone="primary" label="Choose Y" headline="Another rule.">...</DecisionOption>
 * </DecisionSplit>
 * ```
 */
export function DecisionSplit({
  children,
  note,
}: {
  children: React.ReactNode;
  note?: React.ReactNode;
}) {
  return (
    <section className="not-prose my-10 border-y border-border" aria-label="Decision guide">
      <div className="grid md:grid-cols-2">{children}</div>
      {note ? (
        <div className="border-t border-border py-4 text-sm text-muted-foreground">
          {note}
        </div>
      ) : null}
    </section>
  );
}

export function DecisionOption({
  label,
  headline,
  tone = "default",
  side = "left",
  children,
}: DecisionOptionProps) {
  return (
    <section
      className={cn(
        "py-7",
        side === "left" ? "md:pr-10" : "border-t border-border md:border-t-0 md:border-l md:pl-10",
      )}
    >
      <p
        className={cn(
          "m-0 text-sm font-semibold",
          tone === "primary" ? "text-primary" : "text-foreground",
        )}
      >
        {label}
      </p>
      <p className="mt-2 text-lg leading-snug text-foreground">{headline}</p>
      <div className="mt-3 max-w-[42ch] text-sm leading-6 text-muted-foreground [&_p]:m-0">
        {children}
      </div>
    </section>
  );
}
