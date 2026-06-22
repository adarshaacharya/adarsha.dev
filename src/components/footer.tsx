"use client";

import { siteMetadata } from "@/data/siteMetadata";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Adarsha Acharya</p>
        <div className="flex items-center gap-5">
          <a
            href="/feed.xml"
            className="hover:text-foreground transition-colors"
          >
            RSS
          </a>
          <a
            href="/sitemap.xml"
            className="hover:text-foreground transition-colors"
          >
            Sitemap
          </a>
          <a
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href={siteMetadata.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}
