import * as React from "react";
import { CodeTabs } from "./code-tabs";

/**
 * Before/after code progression — same tab UI as CodeCompare,
 * with default labels tuned for migrations and refactors.
 *
 * ```mdx
 * <BeforeAfter>
 * ```ts
 * // before
 * ```
 * ```ts
 * // after
 * ```
 * </BeforeAfter>
 * ```
 */
export function BeforeAfter({
  labels = ["Before", "After"],
  children,
}: {
  labels?: string[];
  children: React.ReactNode;
}) {
  return (
    <CodeTabs labels={labels} ariaLabel="Before and after code comparison">
      {children}
    </CodeTabs>
  );
}
