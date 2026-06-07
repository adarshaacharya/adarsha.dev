"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";
import { Button } from "@/components/ui/button";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
          return;
        }
        setTheme("dark");
      }}
      className="h-9 w-9 px-0"
    >
      {mounted ? (
        theme === "dark" ? (
          <SunIcon height={18} width={18} />
        ) : (
          <MoonIcon height={18} width={18} />
        )
      ) : (
        <span className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
