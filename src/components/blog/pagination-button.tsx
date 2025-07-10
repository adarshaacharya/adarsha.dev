"use client";

import { Button } from "@/components/ui/button";
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
  if (isDisabled || !href) {
    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        disabled={isDisabled}
        className={className}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      className={className}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
