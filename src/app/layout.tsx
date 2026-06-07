import "./global.css";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Space_Grotesk } from "next/font/google";
import { siteMetadata } from "@/data/siteMetadata";
import Head from "./head";
import { ENV } from "@/lib/env";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ChatBot } from "@/components/bot/chat-bot";
import { Toaster, toast } from 'sonner';
import { Metadata } from "next/dist/types";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head />
      <body
        className={cn(
          "min-h-screen w-full antialiased dark:bg-zinc-950 dark:text-gray-100",
          space_grotesk.className,
        )}
      >
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark" // default to dark mode, can be light, dark, system
            enableSystem
            disableTransitionOnChange
          >
            <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 sm:px-6 xl:max-w-4xl 2xl:max-w-5xl">
              <Header />
              <div className="flex-1">{children}</div>
              <Suspense fallback={null}>
                <ChatBot />
              </Suspense>
              <Footer />
              <Toaster position="top-right" richColors />
            </main>
            <TailwindIndicator />
          </ThemeProvider>
        </Suspense>
        <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
