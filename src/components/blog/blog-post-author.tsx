import { LINKS } from "@/data/links";
import { siteMetadata } from "@/data/siteMetadata";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";

export function BlogPostAuthor() {
  return (
    <aside className="not-prose mx-auto mt-12 max-w-4xl">
      <div className="overflow-hidden rounded-lg border border-primary/25 bg-card px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:gap-7">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-16 sm:w-16">
            <CalendarDays className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.8} />
          </div>

          <div className="max-w-2xl space-y-5">
            <div className="space-y-3">
              <h2 className="text-balance font-serif text-2xl leading-tight tracking-tight text-foreground sm:text-3xl">
                Need help turning this into production?
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                I help teams ship full-stack TypeScript and AI features with
                clean architecture, maintainable DX, and production-minded
                delivery.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Button
                size="default"
                className="h-10 rounded-md px-5 text-sm"
                asChild
              >
                <a
                  href={LINKS.CAL_COM}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <a
                href={`mailto:${siteMetadata.social.email}`}
                className="text-sm font-semibold text-foreground underline decoration-foreground underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                Email me
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
