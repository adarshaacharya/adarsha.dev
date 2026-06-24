"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
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
    <div className="relative max-w-xs">
      <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
      <Input
        type="text"
        onChange={(e) => debouncedSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        placeholder="Search..."
        className="pl-9 h-8 text-sm bg-transparent"
      />
    </div>
  );
}
