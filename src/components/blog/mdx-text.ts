import * as React from "react";

/** Extract plain text from MDX children (string, array, or nested). */
export function getMdxText(children: React.ReactNode, source?: string): string {
  if (source) return source.trim();

  if (typeof children === "string") return children.trim();

  if (Array.isArray(children)) {
    return children
      .map((child) => (typeof child === "string" ? child : ""))
      .join("")
      .trim();
  }

  return "";
}
