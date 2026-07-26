import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Occasional writing on TypeScript, AI, and the practical work of shipping products from Adarsha Acharya.",
  openGraph: {
    title: "Useful notes for thoughtful builders.",
    description:
      "Occasional writing on TypeScript, AI, and shipping products.",
    images: [
      {
        url: "/newsletter/og",
        width: 1200,
        height: 630,
        alt: "Adarsha's newsletter: Useful notes for thoughtful builders.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Useful notes for thoughtful builders.",
    description:
      "Occasional writing on TypeScript, AI, and shipping products.",
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
      <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,460px)]">
        <section className="flex min-h-svh flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <p className="text-sm font-medium">
            <Link
              href="/"
              className="text-primary transition-colors hover:text-foreground focus-visible:text-foreground"
            >
              ← adarsha.dev
            </Link>{" "}
            <span className="text-muted-foreground">/ newsletter</span>
          </p>

          <div className="flex flex-1 flex-col justify-center py-10 lg:py-16">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm text-muted-foreground">
                For people who build on the web.
              </p>
              <h1 className="text-balance font-serif text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
                Useful notes for thoughtful builders.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Occasional writing on TypeScript, AI, and the practical work of
                shipping products—sent only when there&apos;s something useful to
                say.
              </p>
            </div>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            A quiet inbox, a sharper point of view, and no manufactured urgency.
          </p>
        </section>

        <section className="flex min-h-[min(100%,28rem)] items-center border-t border-border bg-muted/25 px-6 py-12 sm:px-10 lg:min-h-svh lg:border-t-0 lg:border-l lg:px-12 xl:px-14">
          <div className="w-full max-w-sm">
            <NewsletterForm
              variant="landing"
              title="Get the next note"
              description="New posts and useful ideas, delivered directly to you."
            />

            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              No spam. No schedule for the sake of a schedule. Unsubscribe
              anytime.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
