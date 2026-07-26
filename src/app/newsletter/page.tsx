import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Occasional writing about TypeScript, AI, and building software from Adarsha Acharya.",
  openGraph: {
    title: "I write about building software.",
    description:
      "New articles and occasional notes from Adarsha Acharya.",
    images: [
      {
        url: "/newsletter/og",
        width: 1200,
        height: 630,
        alt: "Adarsha's newsletter: I write about building software.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "I write about building software.",
    description: "New articles and occasional notes from Adarsha Acharya.",
    images: ["/newsletter/og"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewsletterPage() {
  return (
    <article className="-mx-4 flex min-h-screen sm:-mx-6">
      <div className="grid w-full border-y border-border lg:grid-cols-[1.15fr_0.85fr]">
        <section className="flex min-h-[54svh] flex-col justify-between px-6 py-7 sm:px-10 sm:py-10 lg:min-h-screen lg:px-14 lg:py-12">
          <p className="text-sm font-medium text-primary">
            <Link
              href="/"
              className="transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              ← adarsha.dev
            </Link>{" "}
            <span className="text-muted-foreground">/ newsletter</span>
          </p>

          <div className="max-w-2xl py-14 lg:py-0">
            <p className="mb-5 text-sm text-muted-foreground">Newsletter</p>
            <h1 className="text-balance font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              I write about building software.
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              I send an email when I publish something new, usually about
              TypeScript, AI, or the parts of product work that are harder to
              fit into a post.
            </p>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Usually a new article. Sometimes a note that did not become one.
          </p>
        </section>

        <section className="flex min-h-[46svh] items-center border-t border-border bg-muted/35 px-6 py-14 sm:px-10 lg:min-h-screen lg:border-l lg:border-t-0 lg:px-12">
          <div className="w-full max-w-md">
            <NewsletterForm
              title="Want the next one?"
              description="Leave your email and I will send it when it goes out."
            />

            <p className="mt-7 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
              No spam. You can unsubscribe whenever you want.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
