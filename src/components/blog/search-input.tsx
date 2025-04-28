"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebouncedCallback } from "use-debounce";

export function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative">
      <Search
        className={cn(
          "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400",
        )}
      />
      <input
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        placeholder="Search articles..."
        className={cn(
          "w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-gray-500 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800/10 dark:border-gray-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-neutral-600 dark:focus:ring-neutral-100/10",
        )}
      />
    </div>
  );
}
