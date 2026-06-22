"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = {
  "/": { name: "Home" },
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
};

export function Header() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) pathname = "/blog";
  if (pathname.includes("/projects/")) pathname = "/projects";

  return (
    <header className="py-5 mb-8">
      <nav className="flex items-center gap-7">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = path === pathname;
          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "text-sm transition-colors duration-200",
                isActive
                  ? "text-foreground font-medium underline underline-offset-4 decoration-primary decoration-[1.5px]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
