"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FlatNode = {
  name: string;
  note?: string;
  isFolder: boolean;
  depth: number;
};

type TreeItem = {
  name: string;
  note?: string;
  isFolder: boolean;
  children: TreeItem[];
};

const EXTENSION_COLORS: Record<string, string> = {
  tsx: "#3178c6",
  ts: "#3178c6",
  jsx: "#61dafb",
  js: "#f7df1e",
  mdx: "#a3a3a3",
  md: "#a3a3a3",
  json: "#f5a623",
  css: "#e34f8a",
};

const DEFAULT_FILE_COLOR = "#737373";

function parseFileTree(source: string): { root?: string; nodes: FlatNode[] } {
  const lines = source.split("\n").filter((line) => line.trim() !== "");

  let root: string | undefined;
  let startIndex = 0;

  if (lines[0]?.trim().endsWith("/")) {
    root = lines[0].trim();
    startIndex = 1;
  }

  const nodes: FlatNode[] = [];

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(\s*)(.+)$/);
    if (!match) continue;

    const depth = Math.floor(match[1].length / 2);
    const content = match[2].trim();
    const arrowMatch = content.match(/^(.+?)\s*(?:→|->)\s*(.+)$/);

    const name = arrowMatch ? arrowMatch[1].trim() : content;
    const note = arrowMatch?.[2].trim();
    const isFolder = name.endsWith("/");

    nodes.push({ name, note, isFolder, depth });
  }

  return { root, nodes };
}

function buildTree(nodes: FlatNode[]): TreeItem[] {
  const root: TreeItem[] = [];
  const stack: { item: TreeItem; depth: number }[] = [];

  for (const node of nodes) {
    const item: TreeItem = {
      name: node.isFolder ? node.name.replace(/\/$/, "") : node.name,
      note: node.note,
      isFolder: node.isFolder,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(item);
    } else {
      stack[stack.length - 1].item.children.push(item);
    }

    if (node.isFolder) {
      stack.push({ item, depth: node.depth });
    }
  }

  return root;
}

function collectFolderPaths(items: TreeItem[], parent = ""): string[] {
  const paths: string[] = [];

  for (const item of items) {
    if (!item.isFolder) continue;

    const path = parent ? `${parent}/${item.name}` : item.name;
    paths.push(path);
    paths.push(...collectFolderPaths(item.children, path));
  }

  return paths;
}

function getSource(children: React.ReactNode, source?: string): string {
  if (source) return source;

  if (typeof children === "string") return children;

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === "string" ? child : ""))
      .join("")
      .trim();
  }

  return "";
}

function getFileColor(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_COLORS[ext] ?? DEFAULT_FILE_COLOR;
}

/** Crisp 16×16 SVG — no tiny text, solid fills, integer viewBox. */
function FolderIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="shrink-0"
        aria-hidden="true"
      >
        <path
          d="M1 5.5h5.2L7.8 7H14.5V13.5H1V5.5Z"
          fill="#C09553"
        />
        <path
          d="M1 4h5.2L7.8 5.5H14.5V6.5H1V4Z"
          fill="#DCB67A"
        />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M1 4.5h5.2L7.8 6H14.5V13.5H1V4.5Z"
        fill="#DCB67A"
      />
    </svg>
  );
}

function FileTypeIcon({ filename }: { filename: string }) {
  const accent = getFileColor(filename);

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0"
      aria-hidden="true"
    >
      <path
        d="M4 1h6.2L13 3.8V15H4V1Z"
        className="fill-neutral-200 stroke-neutral-300 dark:fill-[#1c1c1c] dark:stroke-neutral-700"
        strokeWidth="0.75"
      />
      <path
        d="M10.2 1V3.8H13"
        className="fill-neutral-100 stroke-neutral-300 dark:fill-[#262626] dark:stroke-neutral-700"
        strokeWidth="0.75"
      />
      <rect x="4" y="1" width="2.5" height="14" fill={accent} />
    </svg>
  );
}

function ItemNote({ note, className }: { note: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-500",
        className,
      )}
    >
      <span className="shrink-0 text-neutral-400 dark:text-neutral-600" aria-hidden="true">
        →
      </span>
      <span className="truncate">{note}</span>
    </span>
  );
}

const rowBase =
  "rounded-[5px] transition-colors duration-100 hover:bg-neutral-200/80 focus-visible:outline-none focus-visible:bg-neutral-200/80 dark:hover:bg-white/[0.06] dark:focus-visible:bg-white/[0.06]";

function TreeBranch({
  items,
  depth,
  pathPrefix,
  expanded,
  onToggle,
}: {
  items: TreeItem[];
  depth: number;
  pathPrefix: string;
  expanded: Set<string>;
  onToggle: (path: string) => void;
}) {
  const indent = depth * 14 + 8;

  return (
    <>
      {items.map((item, index) => {
        const path = pathPrefix ? `${pathPrefix}/${item.name}` : item.name;
        const isExpanded = expanded.has(path);
        const isLast = index === items.length - 1;

        if (item.isFolder) {
          return (
            <div key={path} className="relative">
              {depth > 0 ? (
                <span
                  className="pointer-events-none absolute bottom-0 top-0 w-px bg-neutral-300/80 dark:bg-neutral-700/80"
                  style={{ left: `${indent - 7}px`, height: isLast ? "50%" : "100%" }}
                  aria-hidden="true"
                />
              ) : null}

              <button
                type="button"
                onClick={() => onToggle(path)}
                aria-expanded={isExpanded}
                className={cn(
                  rowBase,
                  "group flex w-full min-w-0 flex-col gap-0.5 py-[3px] pr-2 text-left sm:flex-row sm:items-center sm:gap-2",
                )}
                style={{ paddingLeft: `${indent}px` }}
              >
                <span className="flex min-w-0 items-center gap-1.5">
                  <ChevronRight
                    className={cn(
                      "size-4 shrink-0 text-neutral-400 transition-transform duration-150 ease-out will-change-transform dark:text-neutral-500",
                      isExpanded && "rotate-90",
                    )}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <FolderIcon open={isExpanded} />
                  <span className="truncate font-medium text-neutral-800 dark:text-neutral-100">
                    {item.name}
                  </span>
                </span>

                {item.note ? (
                  <>
                    <span
                      className="mx-2 hidden min-w-[24px] flex-1 border-b border-dotted border-neutral-300/70 dark:border-neutral-700/70 sm:block"
                      aria-hidden="true"
                    />
                    <ItemNote note={item.note} className="hidden sm:inline-flex" />
                  </>
                ) : null}
              </button>

              {item.note ? (
                <div
                  className="pb-0.5 sm:hidden"
                  style={{ paddingLeft: `${indent + 36}px` }}
                >
                  <ItemNote note={item.note} />
                </div>
              ) : null}

              {isExpanded && item.children.length > 0 ? (
                <TreeBranch
                  items={item.children}
                  depth={depth + 1}
                  pathPrefix={path}
                  expanded={expanded}
                  onToggle={onToggle}
                />
              ) : null}
            </div>
          );
        }

        return (
          <div key={path} className="relative">
            {depth > 0 ? (
              <span
                className="pointer-events-none absolute bottom-0 top-0 w-px bg-neutral-300/80 dark:bg-neutral-700/80"
                style={{ left: `${indent + 11}px`, height: isLast ? "50%" : "100%" }}
                aria-hidden="true"
              />
            ) : null}

            <div
              className={cn(
                rowBase,
                "group flex w-full min-w-0 flex-col gap-0.5 py-[3px] pr-2 sm:flex-row sm:items-center sm:gap-2",
              )}
              style={{ paddingLeft: `${indent + 18}px` }}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <FileTypeIcon filename={item.name} />
                <span className="truncate text-neutral-800 dark:text-neutral-100">
                  {item.name}
                </span>
              </span>

              {item.note ? (
                <>
                  <span
                    className="mx-2 hidden min-w-[24px] flex-1 border-b border-dotted border-neutral-300/70 dark:border-neutral-700/70 sm:block"
                    aria-hidden="true"
                  />
                  <ItemNote note={item.note} className="hidden sm:inline-flex" />
                </>
              ) : null}
            </div>

            {item.note ? (
              <div
                className="pb-0.5 sm:hidden"
                style={{ paddingLeft: `${indent + 36}px` }}
              >
                <ItemNote note={item.note} />
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

/**
 * VS Code-style collapsible file tree for MDX blog posts.
 */
export function FileTree({
  source,
  children,
  defaultExpanded = true,
}: {
  source?: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
}) {
  const text = getSource(children, source);

  const { root, tree, allFolderPaths } = React.useMemo(() => {
    const parsed = parseFileTree(text);
    const built = buildTree(parsed.nodes);
    return {
      root: parsed.root,
      tree: built,
      allFolderPaths: collectFolderPaths(built),
    };
  }, [text]);

  const [expanded, setExpanded] = React.useState<Set<string>>(() =>
    defaultExpanded ? new Set(allFolderPaths) : new Set(),
  );

  const onToggle = React.useCallback((path: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  if (tree.length === 0 && !root) {
    return null;
  }

  return (
    <div
      className={cn(
        "not-prose my-8 overflow-hidden rounded-lg text-[13px]",
        "border border-neutral-200 bg-neutral-50 shadow-sm",
        "dark:border-neutral-800 dark:bg-[#0a0a0a] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_8px_24px_-8px_rgba(0,0,0,0.6)]",
      )}
    >
      {root ? (
        <div
          className={cn(
            "flex items-center gap-2 border-b px-3 py-2.5",
            "border-neutral-200 bg-neutral-100",
            "dark:border-neutral-800 dark:bg-[#111111]",
          )}
        >
          <FolderIcon open={false} />
          <span className="font-mono text-xs font-medium tracking-tight text-neutral-600 dark:text-neutral-400">
            {root}
          </span>
        </div>
      ) : null}

      <div
        className="select-none px-1 py-1.5 font-mono antialiased"
        role="tree"
        aria-label={root ? `${root} file tree` : "File tree"}
      >
        <TreeBranch
          items={tree}
          depth={0}
          pathPrefix=""
          expanded={expanded}
          onToggle={onToggle}
        />
      </div>
    </div>
  );
}
