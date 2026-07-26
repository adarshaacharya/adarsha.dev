"use client";

import { useActionState } from "react";
import {
  subscribeToNewsletter,
  type NewsletterFormState,
} from "@/app/actions/newsletter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  className?: string;
  title?: string;
  description?: string;
  variant?: "default" | "landing";
};

export function NewsletterForm({
  className,
  title = "Stay up to date",
  description = "Get new articles in your inbox when I publish.",
  variant = "default",
}: NewsletterFormProps) {
  const initialState: NewsletterFormState = { status: "idle" };
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  const isLanding = variant === "landing";

  return (
    <aside
      className={cn(
        "not-prose max-w-md",
        isLanding ? "space-y-6" : "space-y-5",
        className,
      )}
    >
      <div className={cn(isLanding ? "space-y-2.5" : "space-y-2")}>
        <h2
          className={cn(
            "font-serif tracking-tight text-foreground",
            isLanding ? "text-2xl sm:text-[1.75rem]" : "text-2xl sm:text-3xl",
          )}
        >
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <form
        className={cn(
          "flex gap-3",
          isLanding ? "items-end border-b border-border pb-1" : "gap-2",
        )}
        action={formAction}
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className={cn(
            "min-w-0 flex-1",
            isLanding &&
              "h-10 rounded-none border-0 border-b border-transparent bg-transparent px-0 shadow-none focus-visible:ring-0",
          )}
          required
          disabled={isPending}
        />
        <Button
          type="submit"
          className={cn("shrink-0", isLanding && "rounded-sm px-5")}
          disabled={isPending}
        >
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
