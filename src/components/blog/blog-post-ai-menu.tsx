"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
  LoaderCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildAiPrompt } from "@/lib/blog-markdown";

type Props = {
  title: string;
  markdownUrl: string;
  postUrl: string;
};

const CHATGPT_URL = "https://chatgpt.com/";
const CLAUDE_URL = "https://claude.ai/new";

async function fetchMarkdown(markdownUrl: string) {
  const response = await fetch(markdownUrl);
  if (!response.ok) {
    throw new Error("Failed to load markdown");
  }
  return response.text();
}

function openAiApp(url: string) {
  return window.open(url, "_blank", "noopener,noreferrer");
}

export function BlogPostAiMenu({
  title,
  markdownUrl,
  postUrl,
}: Props) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const runAction = async (
    actionId: string,
    handler: (markdown: string) => void | Promise<void>,
  ) => {
    setLoadingAction(actionId);
    try {
      const markdown = await fetchMarkdown(markdownUrl);
      await handler(markdown);
    } catch {
      toast.error("Couldn't load this article as markdown. Try again.");
    } finally {
      setLoadingAction(null);
      if (actionId !== "copy") setOpen(false);
    }
  };

  const openWithAi = (actionId: string, appName: string, appUrl: string) => {
    const openedWindow = openAiApp(appUrl);

    runAction(actionId, async (markdown) => {
      const prompt = buildAiPrompt({
        title,
        markdown,
        markdownUrl: new URL(markdownUrl, postUrl).toString(),
        postUrl,
      });

      await navigator.clipboard.writeText(prompt);

      if (openedWindow) {
        toast.success(`Prompt copied. Paste it into ${appName}.`);
      } else {
        toast.success(
          `Prompt copied. Open ${appName} and paste it there.`,
        );
      }
    });
  };

  const items = [
    {
      id: "copy",
      label: "Copy as Markdown",
      icon: copied ? Check : Copy,
      onClick: () =>
        runAction("copy", async (markdown) => {
          await navigator.clipboard.writeText(markdown);
          setCopied(true);
          toast.success("Markdown copied to clipboard");
          setTimeout(() => {
            setCopied(false);
            setOpen(false);
          }, 900);
        }),
    },
    {
      id: "view",
      label: "View as Markdown",
      icon: FileText,
      onClick: () => {
        window.open(markdownUrl, "_blank", "noopener,noreferrer");
        setOpen(false);
      },
    },
    {
      id: "chatgpt",
      label: "Open in ChatGPT",
      icon: ExternalLink,
      onClick: () => openWithAi("chatgpt", "ChatGPT", CHATGPT_URL),
    },
    {
      id: "claude",
      label: "Open in Claude",
      icon: ExternalLink,
      onClick: () => openWithAi("claude", "Claude", CLAUDE_URL),
    },
  ] as const;

  return (
    <div ref={rootRef} className="relative">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className="gap-1.5"
      >
        Ask AI
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform",
            open && "rotate-180",
          )}
        />
      </Button>

      {open ? (
        <div
          id={menuId}
          aria-label="AI actions"
          className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-lg"
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isLoading = loadingAction === item.id;

            return (
              <button
                key={item.id}
                type="button"
                disabled={Boolean(loadingAction)}
                onClick={item.onClick}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-4 w-4 text-muted-foreground" />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <a
        href={markdownUrl}
        className="sr-only"
        rel="alternate"
        type="text/markdown"
      >
        Markdown version of {title}
      </a>
    </div>
  );
}
