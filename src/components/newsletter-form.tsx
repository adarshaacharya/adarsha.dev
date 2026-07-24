"use client";

import { useActionState } from "react";
import {
  subscribeToNewsletter,
  type NewsletterFormState,
} from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const initialState: NewsletterFormState = { status: "idle" };
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  return (
    <aside className={cn("not-prose max-w-md space-y-5", className)}>
      <div className="space-y-2">
        <h2 className="font-serif text-2xl tracking-tight text-foreground sm:text-3xl">
          Stay up to date
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Get new articles in your inbox when I publish.
        </p>
      </div>

      <form className="flex gap-2" action={formAction}>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1"
          required
          disabled={isPending}
        />
        <Button type="submit" className="shrink-0" disabled={isPending}>
          {isPending ? "Subscribing…" : "Subscribe"}
        </Button>
      </form>
      {state.message && (
        <p
          className={cn(
            "text-sm",
            state.status === "error"
              ? "text-destructive"
              : "text-muted-foreground",
          )}
          role={state.status === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      )}
    </aside>
  );
}
