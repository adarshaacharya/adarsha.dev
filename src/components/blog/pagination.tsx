"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export const BLOG_POSTS_PER_PAGE = 6;

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-6 mt-10 text-sm">
      {currentPage > 1 ? (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1 text-muted-foreground/30 select-none">
          <ChevronLeft className="h-3.5 w-3.5" />
          Prev
        </span>
      )}

      <div className="flex items-center gap-3">
        {pages.map((page) => (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={cn(
              "tabular-nums transition-colors",
              page === currentPage
                ? "text-primary font-semibold underline underline-offset-4 decoration-primary/60"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      ) : (
        <span className="flex items-center gap-1 text-muted-foreground/30 select-none">
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </span>
      )}
    </nav>
  );
}
