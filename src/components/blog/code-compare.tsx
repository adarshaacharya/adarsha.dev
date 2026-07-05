import * as React from "react";
import { CodeTabs } from "./code-tabs";

/**
 * Side-by-side code comparison rendered as a single toggle.
 *
 * Usage in MDX — two fenced code blocks as children, blank lines around each:
 *
 * <CodeCompare labels={["Next.js", "TanStack Start"]}>
 *
 * ```tsx
 * // Next.js code
 * ```
 *
 * ```tsx
 * // TanStack Start code
 * ```
 *
 * </CodeCompare>
 *
 * Both blocks keep their build-time shiki highlighting; only the active one is shown.
 * Copy lives in the tab bar (the per-block overlay button is hidden inside panels via CSS).
 */
export function CodeCompare({
  labels = ["Next.js", "TanStack Start"],
  children,
}: {
  labels?: string[];
  children: React.ReactNode;
}) {
  return (
    <CodeTabs labels={labels} ariaLabel="Code comparison">
      {children}
    </CodeTabs>
  );
}
