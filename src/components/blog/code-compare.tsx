"use client";

import * as React from "react";
import { CopyIcon, CheckIcon } from "./code-block";

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
  labels?: [string, string] | string[];
  children: React.ReactNode;
}) {
  const blocks = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  const [active, setActive] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  if (blocks.length < 2) {
    // Fallback: not enough blocks to compare — render whatever we got.
    return <>{children}</>;
  }

  const handleCopy = async () => {
    const text = panelRef.current?.querySelector("pre")?.innerText;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <div className="group my-8 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 dark:border-[hsl(220,16%,18%)] dark:bg-[hsl(220,16%,12%)]">
      <div
        role="tablist"
        aria-label="Code comparison"
        className="flex items-center border-b border-neutral-200 bg-neutral-50 dark:border-[hsl(220,16%,16%)] dark:bg-[hsl(220,16%,12%)]"
      >
        {labels.slice(0, blocks.length).map((label, i) => (
          <button
            key={label}
            role="tab"
            type="button"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={
              active === i
                ? "border-b-2 border-neutral-800 dark:border-amber-500 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                : "border-b-2 border-transparent px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            }
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="ml-auto mr-3 flex items-center justify-center rounded-md p-1.5 text-neutral-500 opacity-0 transition-all hover:text-neutral-800 dark:hover:text-neutral-100 focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      {blocks.map((block, i) => (
        <div
          key={i}
          ref={active === i ? panelRef : undefined}
          hidden={active !== i}
          className="code-compare-panel"
        >
          {block}
        </div>
      ))}
    </div>
  );
}
