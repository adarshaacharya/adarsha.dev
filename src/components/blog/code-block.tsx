"use client";

import * as React from "react";

/**
 * Wraps rehype-pretty-code's <figure> output to add a hover copy button.
 * Registered as the `figure` MDX component. Only code figures
 * (those carrying `data-rehype-pretty-code-figure`) get the button;
 * any other figure renders untouched.
 */
export function CodeBlock(
  props: React.HTMLAttributes<HTMLElement> & {
    "data-rehype-pretty-code-figure"?: string;
  },
) {
  const isCodeFigure = "data-rehype-pretty-code-figure" in props;
  const ref = React.useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

  if (!isCodeFigure) {
    return <figure {...props} />;
  }

  const { children, className, ...rest } = props;

  const handleCopy = async () => {
    const text = ref.current?.querySelector("pre")?.innerText;
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
    <figure
      ref={ref}
      className={`group relative ${className ?? ""}`}
      {...rest}
    >
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-3 top-3 z-10 flex items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 p-1.5 text-neutral-500 opacity-0 transition-all hover:border-neutral-300 hover:text-neutral-900 focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:border-neutral-600 dark:hover:text-neutral-100"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      {children}
    </figure>
  );
}

export function CopyIcon() {
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

export function CheckIcon() {
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
