import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  FolderGit2,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[64vh] items-center overflow-hidden py-12 sm:py-16">
      <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-56 max-w-2xl rounded-full bg-primary/10 blur-3xl dark:bg-primary/15" />

      <div className="grid w-full gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(280px,1.05fr)] md:items-center">
        <div className="relative min-h-56 sm:min-h-72">
          <div className="absolute left-4 top-3 h-36 w-36 rounded-full border border-border/80 sm:h-48 sm:w-48" />
          <div className="absolute bottom-6 left-20 h-24 w-24 rounded-full border border-primary/40 sm:left-36 sm:h-32 sm:w-32" />
          <div className="absolute left-2 top-16 h-px w-64 origin-left -rotate-6 bg-gradient-to-r from-transparent via-primary/70 to-transparent sm:w-80" />
          <div className="absolute left-12 top-28 h-px w-56 origin-left rotate-12 bg-gradient-to-r from-transparent via-border to-transparent sm:w-72" />

          <div className="relative pt-12">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              Route not found
            </p>
            <h1 className="font-serif text-[7rem] leading-none tracking-tight text-foreground sm:text-[10rem] md:text-[12rem]">
              404
            </h1>
          </div>
        </div>

        <div className="max-w-xl space-y-7">
          <div className="space-y-3">
            <h2 className="max-w-lg text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
              This page drifted out of the current build.
            </h2>
            <p className="max-w-md text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
              The link may be old, the slug may have changed, or the page may
              have moved. Start from the homepage or jump into the latest work.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">
                Projects
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 border-t pt-5 sm:grid-cols-2">
            <Link
              href="/blog"
              className="group flex items-center gap-3 rounded-lg px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FileText className="h-4 w-4" />
              </span>
              Read recent writing
            </Link>
            <Link
              href="/projects"
              className="group flex items-center gap-3 rounded-lg px-1 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FolderGit2 className="h-4 w-4" />
              </span>
              Browse shipped projects
            </Link>
          </div>

          <Link
            href="/"
            aria-label="Return to homepage"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Home className="h-3.5 w-3.5" />
            adarsha.dev
          </Link>
        </div>
      </div>
    </section>
  );
}
