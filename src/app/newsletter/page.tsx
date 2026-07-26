import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Occasional notes on engineering, AI, and building on the web from Adarsha Acharya.",
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
            <p className="mb-5 text-sm text-muted-foreground">
              For people who build on the web.
            </p>
            <h1 className="text-balance font-serif text-5xl leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
              Useful notes for thoughtful builders.
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Occasional writing on TypeScript, AI, and the practical work of
              shipping products—sent only when there’s something useful to say.
            </p>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A quiet inbox, a sharper point of view, and no manufactured
            urgency.
          </p>
        </section>

        <section className="flex min-h-[46svh] items-center border-t border-border bg-muted/35 px-6 py-14 sm:px-10 lg:min-h-screen lg:border-l lg:border-t-0 lg:px-12">
          <div className="w-full max-w-md">
            <NewsletterForm
              title="Get the next note"
              description="New posts and useful ideas, delivered directly to you."
            />

            <p className="mt-7 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">
              No spam. No schedule for the sake of a schedule. Unsubscribe
              anytime.
            </p>
          </div>
        </section>
      </div>
    </article>
  );
}
