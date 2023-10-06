"use client";

import Giscus from "@giscus/react";

export const BlogComments = () => {
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
      theme="preferred_color_scheme"
      lang="en"
      loading="lazy"
    />
  );
};
