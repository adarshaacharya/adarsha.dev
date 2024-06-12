import { ENV } from "@/lib/env";
import Script from "next/script";

export const GoogleAdsense = ({ pId }: { pId: string }) => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};
