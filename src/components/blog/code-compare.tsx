"use client";

import * as React from "react";

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
    const code = panelRef.current?.querySelector("pre")?.innerText;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
      <div
        role="tablist"
        aria-label="Code comparison"
        className="flex items-center border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50"
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
                ? "border-b-2 border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                : "border-b-2 border-transparent px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            }
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="ml-auto mr-2 flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-200/60 hover:text-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700/60 dark:hover:text-neutral-200"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Copied" : "Copy"}
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

function CopyIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
