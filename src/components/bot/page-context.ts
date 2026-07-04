"use client";

export type BotPageContext = {
  type: "blog";
  slug: string;
  pathname: string;
};

export function getBotPageContext(pathname: string): BotPageContext | null {
  const match = pathname.match(/^\/blog\/([^/]+)$/);
  if (!match) return null;

  return {
    type: "blog",
    slug: decodeURIComponent(match[1]),
    pathname,
  };
}
