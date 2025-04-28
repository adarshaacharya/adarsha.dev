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

  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1,
  );

  return (
    <nav className="flex justify-center items-center space-x-3 mt-10 mb-8">
      <PaginationButton
        href={
          currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : undefined
        }
        isDisabled={currentPage <= 1}
        className="p-2 border border-gray-200 dark:border-gray-700"
      >
        <ChevronLeft size={18} />
      </PaginationButton>

      <div className="flex space-x-2 items-center">
        {pageNumbers.map((page) => (
          <PaginationButton
            key={page}
            href={`${basePath}?page=${page}`}
            isActive={page === currentPage}
            className="w-8 h-8"
          >
            {page}
          </PaginationButton>
        ))}

        {totalPages > BLOG_POSTS_PER_PAGE && (
          <>
            <span className="px-2 text-gray-400 dark:text-gray-500">...</span>
            <PaginationButton
              href={`${basePath}?page=${totalPages}`}
              isActive={totalPages === currentPage}
              className="w-8 h-8"
            >
              {totalPages}
            </PaginationButton>
          </>
        )}
      </div>

      <PaginationButton
        href={
          currentPage < totalPages
            ? `${basePath}?page=${currentPage + 1}`
            : undefined
        }
        isDisabled={currentPage >= totalPages}
        className="p-2 border border-gray-200 dark:border-gray-700"
      >
        <ChevronRight size={18} />
      </PaginationButton>
    </nav>
  );
}
