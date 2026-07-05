"use client";

import * as React from "react";
import { mermaid as mermaidPlugin } from "@streamdown/mermaid";
import { useTheme } from "next-themes";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { DiagramCanvas } from "./diagram-canvas";
import { getMdxText } from "./mdx-text";

let lastTheme: "dark" | "light" | null = null;
let mermaidInstance: ReturnType<typeof mermaidPlugin.getMermaid> | null = null;

function getMermaid(theme: "dark" | "light") {
  if (lastTheme === theme && mermaidInstance) return mermaidInstance;

  mermaidInstance = mermaidPlugin.getMermaid({
    startOnLoad: false,
    theme: theme === "dark" ? "dark" : "neutral",
    securityLevel: "strict",
    fontFamily: "var(--font-geist, ui-sans-serif, system-ui, sans-serif)",
  });
  lastTheme = theme;
  return mermaidInstance;
}

/**
 * Interactive Mermaid diagram for MDX posts.
 * Supports pan, zoom, reset, fullscreen, and source toggle.
 *
 * ```mdx
 * <BlogDiagram title="Hybrid search flow">
 * {`
 * flowchart LR
 *   Q[Query] --> FTS[Keyword Search]
 *   Q --> VS[Vector Search]
 * `}
 * </BlogDiagram>
 * ```
 */
export function BlogDiagram({
  title,
  description,
  source,
  children,
  className,
}: {
  title?: string;
  description?: string;
  source?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const text = getMdxText(children, source);
  const diagramId = React.useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const [svg, setSvg] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [sourceOpen, setSourceOpen] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (!text) return;

    let cancelled = false;

    async function renderDiagram() {
      try {
        const mermaid = getMermaid(theme);
        const { svg: rendered } = await mermaid.render(
          `blog-diagram-${diagramId}`,
          text,
        );
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setSvg("");
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [text, theme, diagramId]);

  const canvas = svg ? (
    <DiagramCanvas
      svg={svg}
      onFullscreen={() => setFullscreen(true)}
    />
  ) : (
    <div className="flex min-h-[280px] items-center justify-center px-6 text-sm text-muted-foreground">
      {error ?? "Rendering diagram…"}
    </div>
  );

  return (
    <>
      <figure
        className={cn(
          "not-prose blog-editorial-surface my-8 block w-full overflow-hidden",
          className,
        )}
      >
        {title || description ? (
          <figcaption className="border-b border-border/60 px-4 py-3 sm:px-5">
            {title ? (
              <p className="m-0 text-sm font-medium text-foreground">{title}</p>
            ) : null}
            {description ? (
              <p className="mt-1 mb-0 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </figcaption>
        ) : null}

        {canvas}

        <Collapsible open={sourceOpen} onOpenChange={setSourceOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between border-t border-border/60 px-4 py-2.5 text-left text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
            View Mermaid source
            <ChevronRight
              className={cn(
                "size-4 transition-transform duration-150",
                sourceOpen && "rotate-90",
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t border-border/60">
            <pre className="m-0 overflow-x-auto bg-neutral-100 p-4 font-mono text-xs leading-relaxed text-neutral-800 dark:bg-[hsl(220,16%,14%)] dark:text-neutral-200">
              <code>{text}</code>
            </pre>
          </CollapsibleContent>
        </Collapsible>
      </figure>

      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent className="flex h-[90vh] max-w-5xl flex-col gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-6 py-4">
            <DialogTitle>{title ?? "Diagram"}</DialogTitle>
          </DialogHeader>
          <div className="min-h-0 flex-1">
            {svg ? (
              <DiagramCanvas
                svg={svg}
                fullscreen
                viewportClassName="min-h-[calc(90vh-8rem)]"
                onFullscreen={() => setFullscreen(false)}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
