import * as React from "react";
import { cn } from "@/lib/utils";

export type StateLocationTone = "neutral" | "amber" | "sky" | "emerald";

const nodeToneClass: Record<StateLocationTone, string> = {
  neutral: "border-border bg-background text-foreground",
  amber: "border-amber-500/50 bg-amber-500/10 text-amber-800 dark:text-amber-200",
  sky: "border-sky-500/50 bg-sky-800/10 text-sky-800 dark:text-sky-200",
  emerald:
    "border-emerald-500/50 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200",
};

const flowToneClass: Record<Exclude<StateLocationTone, "neutral">, string> = {
  amber: "stroke-amber-500",
  sky: "stroke-sky-500",
  emerald: "stroke-emerald-500",
};

/**
 * A composable diagram shell for showing where state lives and which UI reads it.
 * Pair it with StateLocationPanel, StateLocationNode, StateLocationFlow, and
 * StateLocationScope to describe a particular architecture without hardcoding
 * a framework into the layout primitive.
 */
export function StateLocationDiagram({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <figure className="not-prose my-8 w-full">
      <style>{`
        @keyframes state-location-flow {
          to { stroke-dashoffset: -12; }
        }
        .state-location-flow { animation: state-location-flow 1s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .state-location-flow { animation: none; }
        }
      `}</style>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
      {caption ? (
        <figcaption className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function StateLocationPanel({
  title,
  description,
  children,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className="min-w-0 rounded-lg border border-border/80 bg-muted/20 p-3.5 sm:p-4">
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h3 className="m-0 text-sm font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="m-0 text-right text-xs text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div
        className={cn(
          "grid min-w-0 grid-cols-[minmax(4.75rem,1fr)_1.5rem_minmax(4.75rem,1fr)_1.5rem_minmax(5.75rem,1.15fr)] items-center",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function StateLocationNode({
  tone = "neutral",
  title,
  detail,
}: {
  tone?: StateLocationTone;
  title: React.ReactNode;
  detail?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-h-20 min-w-0 flex-col items-center justify-center rounded-md border px-2.5 py-2 text-center",
        nodeToneClass[tone],
      )}
    >
      <span className="text-[11px] font-semibold leading-tight sm:text-xs">{title}</span>
      {detail ? (
        <span className="mt-1 text-[9px] leading-tight opacity-70 sm:text-[10px]">
          {detail}
        </span>
      ) : null}
    </div>
  );
}

export function StateLocationFlow({
  tone,
  label,
}: {
  tone: Exclude<StateLocationTone, "neutral">;
  label?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-w-6 flex-col items-center justify-center gap-1 self-stretch">
      <svg
        aria-hidden="true"
        viewBox="0 0 48 12"
        className="h-3 w-full min-w-6 overflow-visible"
      >
        <line
          x1="1"
          y1="6"
          x2="41"
          y2="6"
          className={cn("state-location-flow fill-none", flowToneClass[tone])}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d="M40 2 L47 6 L40 10 Z"
          className={cn(flowToneClass[tone], "fill-current")}
        />
      </svg>
      {label ? (
        <span className="absolute top-1/2 mt-3 hidden w-16 text-center text-[9px] leading-tight text-muted-foreground lg:block">
          {label}
        </span>
      ) : null}
    </div>
  );
}

export function StateLocationScope({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-md border border-dashed border-border/90 bg-muted/20 p-2 pt-5">
      <span className="absolute left-2 top-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

/** The RHF/TanStack Form comparison used in this post. */
export function FormStateLocationDiagram() {
  return (
    <StateLocationDiagram caption="Both libraries can keep reads narrow. RHF begins with a native input and form control. TanStack Form begins with a controlled field backed by a store.">
      <StateLocationPanel title="React Hook Form" description="native input first">
        <StateLocationNode title={<>Native &lt;input&gt;</>} />
        <StateLocationFlow tone="amber" label="register" />
        <StateLocationNode tone="amber" title="RHF control" />
        <StateLocationFlow tone="emerald" label="narrow read" />
        <StateLocationScope label="React">
          <StateLocationNode tone="emerald" title="useWatch" />
          <StateLocationNode tone="emerald" title="Summary" />
        </StateLocationScope>
      </StateLocationPanel>
      <StateLocationPanel title="TanStack Form" description="controlled field first">
        <StateLocationNode title={<>Controlled &lt;input&gt;</>} />
        <StateLocationFlow tone="sky" label="handlers" />
        <StateLocationNode tone="sky" title="Form store" />
        <StateLocationFlow tone="emerald" label="narrow read" />
        <StateLocationScope label="React">
          <StateLocationNode tone="sky" title="form.Field" />
          <StateLocationNode tone="emerald" title="Subscribe" />
        </StateLocationScope>
      </StateLocationPanel>
    </StateLocationDiagram>
  );
}
