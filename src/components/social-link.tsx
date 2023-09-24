import { cn } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

export interface Props {
  className?: string;
  href: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}

export function SocialLink({ className, href, children, icon: Icon }: Props) {
  return (
    <div className={cn(className, "flex")}>
      <Link
        href={href}
        className="hover:text-primary group flex text-sm font-medium text-zinc-800 transition dark:text-zinc-200"
      >
        <Icon className="group-hover:fill-primary h-6 w-6 flex-none fill-zinc-500 transition" />
        {children && <span className="ml-4">{children}</span>}
      </Link>
    </div>
  );
}
