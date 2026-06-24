"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export const BlogComments = () => {
  const { resolvedTheme } = useTheme();
  const giscusTheme = resolvedTheme === "dark" ? "dark_dimmed" : "light";

  return (
    <Giscus
      repo="adarshaacharya/portfolio-giscus"
      repoId="R_kgDOKdCDlg"
      category="Announcements"
      categoryId="DIC_kwDOKdCDls4CZ7ll"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={giscusTheme}
      lang="en"
      loading="lazy"
    />
  );
};
