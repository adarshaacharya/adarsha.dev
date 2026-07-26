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
    <article className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
      <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(400px,500px)] xl:grid-cols-[minmax(0,1fr)_minmax(480px,600px)]">
        <section className="relative flex min-h-svh flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-12">
          <p className="text-sm font-medium">
            <Link
              href="/"
              className="text-primary transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              ← adarsha.dev
            </Link>{" "}
            <span className="text-muted-foreground">/ newsletter</span>
          </p>

          <div className="flex flex-1 items-center pt-10 lg:pt-0">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm text-muted-foreground">Newsletter</p>
              <h1 className="text-balance font-serif text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
                I write about building software.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                I send an email when I publish something new, usually about
                TypeScript, AI, or the parts of product work that are harder to
                fit into a post.
              </p>
              <p className="mt-10 max-w-md text-sm leading-relaxed text-muted-foreground lg:mt-12">
                Usually a new article. Sometimes a note that did not become one.
              </p>
            </div>
          </div>
        </section>

        <section className="flex min-h-[min(100%,32rem)] items-center border-t border-border bg-muted/50 px-6 py-14 sm:px-10 lg:min-h-svh lg:border-t-0 lg:border-l lg:px-12 xl:px-16">
          <div className="w-full max-w-sm lg:max-w-lg lg:py-8">
            <NewsletterForm
              variant="landing"
              title="Want the next one?"
              description="Leave your email and I will send it when it goes out."
            />

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              No spam. You can unsubscribe whenever you want.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
