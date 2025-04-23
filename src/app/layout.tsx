import "./global.css";
import type { Metadata } from "next";
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
          "mx-auto min-h-screen max-w-3xl antialiased dark:bg-zinc-950 dark:text-gray-100",
          space_grotesk.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // default to dark mode, can be light, dark, system
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-4  px-2 md:px-0 lg:mx-auto flex flex-col justify-between min-h-screen">
            <Header />
            {children}
            <ChatBot />
            <Footer />
            <Toaster position="top-right" richColors />
          </main>
          <TailwindIndicator />
        </ThemeProvider>
        <GoogleAnalytics gaId={ENV.GOOGLE_ANALYTICS_ID} />
      </body>
    </html>
  );
}
