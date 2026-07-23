import * as React from "react";
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

type HandoffGroup = {
  actor?: string;
  actions: React.ReactNode[];
};

function toneForActor(actor: string, assigned: Map<string, ActorTone>) {
  if (KNOWN_ACTOR_TONES[actor]) return KNOWN_ACTOR_TONES[actor];
  if (assigned.has(actor)) return assigned.get(actor)!;

  const tone = FALLBACK_ACTOR_TONES[assigned.size % FALLBACK_ACTOR_TONES.length];
  assigned.set(actor, tone);
  return tone;
}

function groupSteps(
  steps: React.ReactElement<{ actor?: string; children?: React.ReactNode }>[],
) {
  const groups: HandoffGroup[] = [];

  for (const step of steps) {
    const actor = step.props.actor;
    const last = groups.at(-1);

    if (last && last.actor === actor) {
      last.actions.push(step.props.children);
      continue;
    }

    groups.push({ actor, actions: [step.props.children] });
  }

  return groups;
}

/**
 * Linear workflow steps for contrasting two approaches side by side.
 *
 * ```mdx
 * <Workflow>
 *   <WorkflowStep actor="Model">lists open pull requests</WorkflowStep>
 *   <WorkflowStep actor="Sandbox">filters to the failing ones</WorkflowStep>
 * </Workflow>
 * ```
 */
export function Workflow({
  children,
  nested = false,
  className,
}: {
  children: React.ReactNode;
  nested?: boolean;
  className?: string;
}) {
  const steps = React.Children.toArray(children).filter((child) =>
    React.isValidElement(child),
  ) as React.ReactElement<{ actor?: string; children?: React.ReactNode }>[];

  const groups = groupSteps(steps);
  const assignedTones = new Map<string, ActorTone>();

  const content = (
    <ol className="m-0 list-none space-y-3 p-0">
      {groups.map((group, index) => {
        const tone = group.actor ? toneForActor(group.actor, assignedTones) : undefined;

        return (
          <li key={index} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-medium text-muted-foreground"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              {group.actor ? (
                <p
                  className={cn(
                    "m-0 text-xs font-medium",
                    tone ? actorTextClass[tone] : "text-muted-foreground",
                  )}
                >
                  {group.actor}
                </p>
              ) : null}
              {group.actions.length === 1 ? (
                <p
                  className={cn(
                    "m-0 text-sm leading-relaxed text-foreground",
                    group.actor && "mt-0.5",
                  )}
                >
                  {group.actions[0]}
                </p>
              ) : (
                <ul
                  className={cn(
                    "m-0 list-disc space-y-1 pl-4 text-sm leading-relaxed text-foreground",
                    group.actor && "mt-0.5",
                  )}
                >
                  {group.actions.map((action, actionIndex) => (
                    <li key={actionIndex}>{action}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );

  if (nested) {
    return <div className={cn("not-prose w-full", className)}>{content}</div>;
  }

  return (
    <figure
      className={cn(
        "not-prose blog-editorial-surface my-8 w-full px-4 py-4 sm:px-5 sm:py-5",
        className,
      )}
    >
      {content}
    </figure>
  );
}

export function WorkflowStep({
  children,
}: {
  actor?: string;
  children: React.ReactNode;
}) {
  return <React.Fragment>{children}</React.Fragment>;
}

/**
 * ```mdx
 * <WorkflowCompare labels={["One tool at a time", "Code Mode"]}>
 *   <Workflow>...</Workflow>
 *   <Workflow>...</Workflow>
 * </WorkflowCompare>
 * ```
 */
export function WorkflowCompare({
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
    <figure className="not-prose my-8 w-full overflow-hidden rounded-lg border border-border/80 bg-background">
      <div className="grid divide-y divide-border/60 md:grid-cols-2 md:divide-x md:divide-y-0">
        {items.map((item, index) => (
          <div key={index} className="min-w-0 p-4 sm:p-5">
            {labels?.[index] ? (
              <p className="m-0 mb-4 text-sm font-medium text-foreground">
                {labels[index]}
              </p>
            ) : null}
            {React.isValidElement(item)
              ? React.cloneElement(
                  item as React.ReactElement<{ nested?: boolean; className?: string }>,
                  { nested: true },
                )
              : item}
          </div>
        ))}
      </div>
    </figure>
  );
}
