"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface PaginationButtonProps {
  href?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function PaginationButton({
  href,
  isActive,
  isDisabled,
  children,
  className,
}: PaginationButtonProps) {
  const baseStyles = cn(
    "flex items-center justify-center rounded-md transition-colors",
    isDisabled && "opacity-50 cursor-not-allowed",
    className,
  );

  const commonProps = {
    className: cn(
      baseStyles,
      isActive
        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium"
        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
    ),
  };

  if (isDisabled || !href) {
    return <div {...commonProps}>{children}</div>;
  }

  return (
    <Link href={href} {...commonProps}>
      {children}
    </Link>
  );
}
