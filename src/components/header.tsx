"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggler } from "./theme-toggle";
import React from "react";

const navItems = {
  "/": {
    name: "Home",
  },
  "/blog": {
    name: "Blog",
  },
  "/projects": {
    name: "Projects",
  },
};

export function Header() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <header className="mb-12 mt-8">
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-8">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {name}
              </Link>
            );
          })}
        </div>

        <ThemeToggler />
      </nav>
    </header>
  );
}
