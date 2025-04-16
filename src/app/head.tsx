import { GoogleAnalytics } from "@next/third-parties/google";
import { ENV } from "@/lib/env";
import Script from "next/script";
import { GoogleAdsense } from "@/components/google-adsense";

export default function Head() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/_static/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/_static/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/_static/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/_static/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/_static/favicons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="google-site-verification"
        content="br9AjaAyJgS4OVigpXtHmm2DwdzuzMqzpK4G77lD2TY"
      />

      <meta
        name="google-adsense-account"
        content={`ca-pub-${ENV.ADSENSE_CLIENT_ID}`}
      />
      {/* <GoogleAdsense pId={ENV.ADSENSE_CLIENT_ID} /> */}
    </>
  );
}
