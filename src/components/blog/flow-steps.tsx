import * as React from "react";
import { Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTOR_STYLES = [
  {
    text: "text-primary",
    dot: "bg-primary",
  },
  {
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-600 dark:bg-amber-400",
  },
  {
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-600 dark:bg-emerald-400",
  },
  {
    text: "text-sky-600 dark:text-sky-400",
    dot: "bg-sky-600 dark:bg-sky-400",
  },
  {
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    dot: "bg-fuchsia-600 dark:bg-fuchsia-400",
  },
] as const;

type ActorStyle = (typeof ACTOR_STYLES)[number];

/**
 * Compact vertical sequence for a loop or pipeline in MDX posts. Generic:
 * works for any short, ordered list of phrases, optionally tagged with an
 * "actor" (who performs the step) and optionally marked as cyclic.
 *
 * ```mdx
 * <FlowSteps loop>
 *   <FlowStep actor="Model">chooses a tool</FlowStep>
 *   <FlowStep actor="Tool">runs</FlowStep>
 *   <FlowStep actor="Host">result enters the conversation</FlowStep>
 * </FlowSteps>
 * ```
 */
export function FlowSteps({
  children,
  loop = false,
  className,
}: {
  children: React.ReactNode;
  loop?: boolean;
  className?: string;
}) {
  const steps = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement<{ actor?: string; children?: React.ReactNode }>[];

  const actorStyle = new Map<string, ActorStyle>();
  let nextStyleIndex = 0;
  const styleFor = (actor?: string) => {
    if (!actor) return undefined;
    if (!actorStyle.has(actor)) {
      actorStyle.set(actor, ACTOR_STYLES[nextStyleIndex % ACTOR_STYLES.length]);
      nextStyleIndex += 1;
    }
    return actorStyle.get(actor);
  };

  return (
    <div
      className={cn(
        "not-prose blog-editorial-surface my-8 w-full p-4 sm:p-5",
        className,
      )}
    >
      <ol className="relative m-0 list-none space-y-0 p-0">
        {steps.map((step, index) => {
          if (!React.isValidElement<{ actor?: string; children?: React.ReactNode }>(step))
            return null;

          const isLast = index === steps.length - 1;
          const actor = step.props.actor;
          const style = styleFor(actor);

          return (
            <li key={index} className="relative flex gap-3">
              {!isLast ? (
                <span
                  className="absolute top-3.25 bottom-0 left-0.75 w-px bg-border"
                  aria-hidden="true"
                />
              ) : loop ? (
                <span
                  className="absolute top-3.25 -bottom-3.5 left-0.75 w-px border-l border-dashed border-border"
                  aria-hidden="true"
                />
              ) : null}
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-10 mt-1 size-1.5 shrink-0 rounded-full",
                  style?.dot ?? "bg-muted-foreground/50",
                )}
              />
              <p className="m-0 pb-3 font-mono text-sm leading-relaxed">
                {actor ? (
                  <span className={cn("font-semibold", style?.text)}>
                    {actor}
                    <span className="text-muted-foreground/60"> · </span>
                  </span>
                ) : null}
                <span className={actor ? "text-muted-foreground" : "text-foreground"}>
                  {step.props.children}
                </span>
              </p>
            </li>
          );
        })}
      </ol>
      {loop ? (
        <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
          <Repeat aria-hidden="true" className="size-3.5 shrink-0" />
          <span>Repeats from the first step.</span>
        </div>
      ) : null}
    </div>
  );
}

export function FlowStep({
  children,
}: {
  actor?: string;
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}

/**
 * Places two or more FlowSteps side by side with a label above each,
 * for contrasting two versions of the same workflow.
 *
 * ```mdx
 * <FlowStepsCompare labels={["One tool at a time", "Code Mode"]}>
 *   <FlowSteps>...</FlowSteps>
 *   <FlowSteps>...</FlowSteps>
 * </FlowStepsCompare>
 * ```
 */
export function FlowStepsCompare({
  labels,
  children,
}: {
  labels?: string[];
  children: React.ReactNode;
}) {
  const items = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  );

  return (
    <div className="not-prose my-8 grid gap-6 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border [&_.blog-editorial-surface]:my-0 [&_.blog-editorial-surface]:h-full">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn("flex min-w-0 flex-col", index === 0 ? "md:pr-6" : "md:pl-6")}
        >
          {labels?.[index] ? (
            <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              {labels[index]}
            </p>
          ) : null}
          {item}
        </div>
      ))}
    </div>
  );
}
