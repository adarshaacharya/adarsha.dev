"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "./code-block";

type CodeTabsProps = {
  labels: string[];
  children: React.ReactNode;
  ariaLabel?: string;
};

export function CodeTabs({
  labels,
  children,
  ariaLabel = "Code comparison",
}: CodeTabsProps) {
  const blocks = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  const [active, setActive] = React.useState("0");
  const [copied, setCopied] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  if (blocks.length < 2) {
    return <>{children}</>;
  }

  const tabLabels = labels.slice(0, blocks.length);

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
    <Tabs
      value={active}
      onValueChange={setActive}
      className="group blog-code-surface my-8 w-full gap-0"
    >
      <div
        className="flex items-center border-b border-neutral-200 bg-neutral-50 dark:border-[hsl(220,16%,16%)] dark:bg-[hsl(220,16%,12%)]"
        aria-label={ariaLabel}
      >
        <TabsList
          variant="line"
          className="h-auto min-h-0 flex-1 justify-start rounded-none border-0 bg-transparent p-0"
        >
          {tabLabels.map((label, i) => (
            <TabsTrigger
              key={label}
              value={String(i)}
              className={cn(
                "rounded-none !border-0 px-4 py-2 text-sm font-medium shadow-none transition-colors",
                "after:hidden -mb-px !bg-transparent",
                "text-muted-foreground hover:text-foreground",
                "data-[state=active]:!border-b-2 data-[state=active]:!border-b-primary data-[state=active]:!bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                "focus-visible:ring-0 focus-visible:outline-none",
              )}
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="ml-auto mr-3 flex items-center justify-center rounded-md p-1.5 text-neutral-500 opacity-0 transition-all hover:text-neutral-800 focus-visible:opacity-100 group-hover:opacity-100 max-md:opacity-100 dark:hover:text-neutral-100"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
      {blocks.map((block, i) => (
        <TabsContent
          key={i}
          value={String(i)}
          forceMount
          className={cn("code-compare-panel mt-0", active !== String(i) && "hidden")}
        >
          <div ref={active === String(i) ? panelRef : undefined}>{block}</div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
