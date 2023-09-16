import clsx from "clsx";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/header";
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "@/lib/utils";
import { TailwindIndicator } from "./components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://adarshaacharya.com.np"),
  title: {
    default: "Aadarsha Acharya",
    template: "%s | Aadarsha Acharya",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "mx-auto min-h-screen max-w-3xl antialiased dark:bg-zinc-950 dark:text-gray-100",
          inter.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-4 mt-10 px-2 md:px-0 lg:mx-auto">
            <Header />
            {children}
          </main>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
