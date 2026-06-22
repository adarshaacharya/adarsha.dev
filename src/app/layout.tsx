import "./global.css";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Geist, Spectral } from "next/font/google";
import { siteMetadata } from "@/data/siteMetadata";
import Head from "./head";
import { ENV } from "@/lib/env";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ChatBot } from "@/components/bot/chat-bot";
import { Toaster } from "sonner";
import { Metadata } from "next/dist/types";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body
        className={cn(
          "min-h-screen w-full antialiased bg-background text-foreground font-sans",
          geist.variable,
          spectral.variable,
        )}
      >
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 sm:px-8 xl:px-10">
          <Header />
          <div className="flex-1">{children}</div>
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
          <Footer />
          <Toaster position="top-right" richColors />
        </main>
        <TailwindIndicator />
        <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
