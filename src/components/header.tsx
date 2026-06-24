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
  "/about": {
    name: "About",
  },
};

export function Header() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <header className="mb-8 mt-5 sm:mt-7">
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-7">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;
            return (
              <Link
                key={path}
                href={path}
                className={cn(
                  "relative text-sm font-medium transition-colors pb-0.5",
                  isActive
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:rounded-full after:bg-primary"
                    : "text-muted-foreground hover:text-foreground",
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
