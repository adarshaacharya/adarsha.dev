import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * CLI terminal block for command + output pairs in MDX posts.
 *
 * ```mdx
 * <Terminal>
 *   <Command>npx create-tsrouter-app my-app</Command>
 *   <Output>Scaffolding project...</Output>
 * </Terminal>
 * ```
 */
export function Terminal({
  title = "terminal",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const items = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  return (
    <div className="not-prose blog-code-surface my-8 w-full overflow-hidden">
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-3 py-2.5 dark:border-[hsl(220,16%,16%)] dark:bg-[#111111]">
        <span className="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" aria-hidden="true" />
        <span className="size-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600" aria-hidden="true" />
        <span className="ml-1 font-mono text-xs font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
          {title}
        </span>
      </div>
      <div className="divide-y divide-neutral-200 dark:divide-[hsl(220,16%,16%)]">
        {items}
      </div>
    </div>
  );
}

export function Command({
  children,
  prompt = "$",
}: {
  children: React.ReactNode;
  prompt?: string;
}) {
  return (
    <div className="bg-neutral-50 px-3 py-2.5 font-mono text-[13px] text-neutral-800 dark:bg-[hsl(220,16%,12%)] dark:text-neutral-100">
      <span className="mr-2 select-none text-primary/80">{prompt}</span>
      <span>{children}</span>
    </div>
  );
}

export function Output({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-100/80 px-3 py-2.5 font-mono text-[13px] leading-relaxed text-muted-foreground dark:bg-[hsl(220,16%,14%)]">
      {children}
    </div>
  );
}

/** Alias for clearer MDX authoring */
export { Output as TerminalOutput };
