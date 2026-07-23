import * as React from "react";
import { ArrowDown, ArrowRight, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

type ActorTone = "sky" | "amber" | "emerald" | "violet" | "rose";

const KNOWN_ACTOR_TONES: Record<string, ActorTone> = {
  Model: "sky",
  Tool: "amber",
  Host: "emerald",
  Sandbox: "violet",
};

const FALLBACK_ACTOR_TONES: ActorTone[] = [
  "sky",
  "amber",
  "emerald",
  "violet",
  "rose",
];

const actorTextClass: Record<ActorTone, string> = {
  sky: "text-sky-700 dark:text-sky-300",
  amber: "text-amber-800 dark:text-amber-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  violet: "text-violet-700 dark:text-violet-300",
  rose: "text-rose-700 dark:text-rose-300",
};

function toneForActor(actor: string, assigned: Map<string, ActorTone>) {
  if (KNOWN_ACTOR_TONES[actor]) return KNOWN_ACTOR_TONES[actor];
  if (assigned.has(actor)) return assigned.get(actor)!;

  const tone = FALLBACK_ACTOR_TONES[assigned.size % FALLBACK_ACTOR_TONES.length];
  assigned.set(actor, tone);
  return tone;
}

function LoopStepChip({
  actor,
  tone,
  children,
}: {
  actor?: string;
  tone?: ActorTone;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex max-w-full min-w-0 items-baseline gap-1.5 rounded-md border border-border/70 bg-background px-2.5 py-1.5 text-sm leading-snug shadow-sm">
      {actor ? (
        <span className={cn("shrink-0 font-medium", tone && actorTextClass[tone])}>
          {actor}
        </span>
      ) : null}
      <span className={cn("min-w-0 text-pretty", actor ? "text-muted-foreground" : "text-foreground")}>
        {children}
      </span>
    </span>
  );
}

/**
 * A short cyclic handoff for MDX posts — model/tool/host loops and similar.
 *
 * ```mdx
 * <Loop>
 *   <LoopStep actor="Model">chooses a tool</LoopStep>
 *   <LoopStep actor="Tool">runs</LoopStep>
 *   <LoopStep actor="Host">result enters the conversation</LoopStep>
 * </Loop>
 * ```
 */
export function Loop({ children }: { children: React.ReactNode }) {
  const steps = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement<{ actor?: string; children?: React.ReactNode }>[];

  const assignedTones = new Map<string, ActorTone>();

  return (
    <figure className="not-prose blog-editorial-surface my-8 w-full px-4 py-4 sm:px-5 sm:py-5">
      <ol className="m-0 flex list-none flex-col items-start gap-2 p-0 sm:flex-row sm:flex-wrap sm:items-center">
        {steps.map((step, index) => {
          if (!React.isValidElement<{ actor?: string; children?: React.ReactNode }>(step))
            return null;

          const actor = step.props.actor;
          const tone = actor ? toneForActor(actor, assignedTones) : undefined;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={index}
              className="flex w-full min-w-0 flex-col items-start gap-2 sm:w-auto sm:flex-row sm:items-center"
            >
              <LoopStepChip actor={actor} tone={tone}>
                {step.props.children}
              </LoopStepChip>
              {!isLast ? (
                <>
                  <ArrowDown
                    aria-hidden="true"
                    className="size-3.5 text-muted-foreground/45 sm:hidden"
                    strokeWidth={1.75}
                  />
                  <ArrowRight
                    aria-hidden="true"
                    className="hidden size-3.5 shrink-0 text-muted-foreground/45 sm:block"
                    strokeWidth={1.75}
                  />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
      <p className="m-0 mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Repeat aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={1.75} />
        <span>Repeats from the first step.</span>
      </p>
    </figure>
  );
}

export function LoopStep({
  children,
}: {
  actor?: string;
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}
