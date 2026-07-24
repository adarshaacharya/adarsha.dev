import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  return (
    <aside className={cn("not-prose max-w-md space-y-5", className)}>
      <div className="space-y-2">
        <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
          Stay up to date
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Get new articles in your inbox when I publish.{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
          >
            Learn more
          </Link>
        </p>
      </div>

      <form className="flex gap-2">
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1"
        />
        <Button type="button" className="shrink-0">
          Subscribe
        </Button>
      </form>
    </aside>
  );
}
