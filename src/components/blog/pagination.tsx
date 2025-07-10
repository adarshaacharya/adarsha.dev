"use client";

import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationButton } from "./pagination-button";

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

  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      <PaginationButton
        href={
          currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : undefined
        }
        isDisabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </PaginationButton>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2 text-muted-foreground"
            >
              ...
            </span>
          );
        }

        return (
          <PaginationButton
            key={page}
            href={`${basePath}?page=${page}`}
            isActive={page === currentPage}
          >
            {page}
          </PaginationButton>
        );
      })}

      <PaginationButton
        href={
          currentPage < totalPages
            ? `${basePath}?page=${currentPage + 1}`
            : undefined
        }
        isDisabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </PaginationButton>
    </nav>
  );
}
