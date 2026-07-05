"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "./code-block";
import { getMdxText } from "./mdx-text";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const METHOD_STYLES: Record<HttpMethod, string> = {
  GET: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  POST: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  PUT: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  PATCH: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  DELETE: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
};

function statusTone(status: number) {
  if (status >= 500) return "destructive";
  if (status >= 400) return "warning";
  return "success";
}

function formatJson(raw: string) {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw.trim();
  }
}

/**
 * HTTP API response block for NestJS / backend tutorial posts.
 *
 * ```mdx
 * <ApiResponse method="GET" status={200} path="/api/v1/users/:id" title="Before interceptor">
 * {`{"id":"..."}`}
 * </ApiResponse>
 * ```
 */
export function ApiResponse({
  method = "GET",
  status,
  path,
  title,
  children,
  source,
  className,
}: {
  method?: HttpMethod;
  status: number;
  path?: string;
  title?: string;
  children?: React.ReactNode;
  source?: string;
  className?: string;
}) {
  const raw = getMdxText(children, source);
  const formatted = formatJson(raw);
  const [copied, setCopied] = React.useState(false);
  const tone = statusTone(status);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  };

  return (
    <figure
      className={cn(
        "not-prose blog-code-surface group my-8 block w-full overflow-hidden",
        className,
      )}
    >
      <figcaption className="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-3 py-2.5 dark:border-[hsl(220,16%,16%)] dark:bg-[#111111]">
        <Badge
          variant="outline"
          className={cn("font-mono text-[11px] uppercase", METHOD_STYLES[method])}
        >
          {method}
        </Badge>
        {path ? (
          <code className="font-mono text-xs text-neutral-700 dark:text-neutral-300">
            {path}
          </code>
        ) : null}
        <Badge
          variant="outline"
          className={cn(
            "ml-auto font-mono text-[11px]",
            tone === "success" &&
              "border-primary/30 bg-primary/10 text-primary",
            tone === "warning" &&
              "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
            tone === "destructive" &&
              "border-destructive/30 bg-destructive/10 text-destructive",
          )}
        >
          {status}
        </Badge>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy response"}
          className="flex items-center justify-center rounded-md p-1.5 text-neutral-500 opacity-0 transition-all hover:text-neutral-800 focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100 dark:hover:text-neutral-100"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </figcaption>

      {title ? (
        <div className="border-b border-neutral-200 px-3 py-2 text-xs font-medium text-muted-foreground dark:border-[hsl(220,16%,16%)]">
          {title}
        </div>
      ) : null}

      <pre className="m-0 max-h-[420px] overflow-auto bg-neutral-100 p-4 font-mono text-[13px] leading-relaxed text-neutral-800 dark:bg-[hsl(220,16%,14%)] dark:text-neutral-100">
        <code>{formatted}</code>
      </pre>
    </figure>
  );
}
