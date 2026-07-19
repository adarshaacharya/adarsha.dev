"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * ReRenderScope — a side-by-side render-scope demo for the TanStack Form post.
 *
 * Two miniature forms model the two rendering strategies. Typing into either
 * form's fields flashes every block that re-renders and increments its counter.
 *
 * - React Hook Form column mimics a broadly-scoped `watch()`: reading a value at
 *   the form root re-renders the whole form on every keystroke.
 * - TanStack Form column mimics `form.Subscribe`: only the edited field and the
 *   one block that subscribed to it re-render.
 *
 * The forms are self-contained on purpose — this illustrates the two render
 * models without pulling either library into the bundle.
 *
 * ```mdx
 * <ReRenderScope />
 * ```
 */

type Values = { email: string; plan: string };

function useRenderCount() {
  // This is diagnostic UI: the count must change during render without
  // scheduling another render, otherwise the counter would count itself.
  const ref = React.useRef(0);
  // eslint-disable-next-line react-hooks/refs
  ref.current += 1;
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
}

/** A block that flashes for one frame whenever it re-renders. */
function RenderBlock({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "watch" | "scoped" | "field";
  children: React.ReactNode;
}) {
  const count = useRenderCount();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const toneRing = {
    watch: "ring-amber-500/50",
    scoped: "ring-emerald-500/50",
    field: "ring-sky-500/50",
  }[tone];

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.classList.add("ring-2", toneRing);
    const id = window.setTimeout(
      () => element.classList.remove("ring-2", toneRing),
      220,
    );
    return () => window.clearTimeout(id);
  }, [count, toneRing]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "relative rounded-md border border-border/70 bg-background/60 p-3 transition-shadow duration-200",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span
          className={cn(
            "tabular-nums text-[11px] font-medium",
            "text-muted-foreground/60",
          )}
        >
          {count} render{count === 1 ? "" : "s"}
        </span>
      </div>
      {children}
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="type here…"
        className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-foreground outline-none focus:border-primary/60"
      />
    </label>
  );
}

/**
 * Broad-watch model: the whole form subscribes to every value, so a keystroke
 * anywhere re-renders every block, including the unrelated field.
 */
function WatchColumn() {
  const [values, setValues] = React.useState<Values>({ email: "", plan: "" });
  const set = (k: keyof Values) => (v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-3">
      <RenderBlock label="<Form> — reads watch()" tone="watch">
        <div className="space-y-3">
          <RenderBlock label="email field" tone="watch">
            <TextField label="Email" value={values.email} onChange={set("email")} />
          </RenderBlock>
          <RenderBlock label="plan field" tone="watch">
            <TextField label="Plan" value={values.plan} onChange={set("plan")} />
          </RenderBlock>
          <RenderBlock label="summary — needs the value" tone="watch">
            <p className="m-0 text-sm text-foreground">
              {values.email || "—"} · {values.plan || "—"}
            </p>
          </RenderBlock>
        </div>
      </RenderBlock>
    </div>
  );
}

/**
 * A minimal external store with per-slice subscriptions — the shape TanStack
 * Form's store has. Reads happen through `useSyncExternalStore` so a component
 * only re-renders when the slice it selected actually changes.
 */
function createStore(initial: Values) {
  let state = initial;
  const listeners = new Set<() => void>();
  return {
    getSnapshot: () => state,
    setField(k: keyof Values, v: string) {
      state = { ...state, [k]: v };
      listeners.forEach((l) => l());
    },
    subscribe(l: () => void) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}

type Store = ReturnType<typeof createStore>;

function useSelector<T>(store: Store, selector: (s: Values) => T): T {
  const select = React.useCallback(
    () => selector(store.getSnapshot()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store],
  );
  return React.useSyncExternalStore(store.subscribe, select, select);
}

/**
 * Scoped-subscription model: the store lives outside React, and each block
 * subscribes to exactly one slice. A keystroke only re-renders the edited field
 * and the one block that read that value — the form shell never re-renders.
 */
function SubscribeColumn() {
  const storeRef = React.useRef<Store | null>(null);
  storeRef.current ??= createStore({ email: "", plan: "" });
  const store = storeRef.current;

  return (
    <div className="space-y-3">
      {/* Form shell: renders once, never re-renders on a keystroke. */}
      <RenderBlock label="<form> — never reads values" tone="scoped">
        <div className="space-y-3">
          <FieldSub label="email field" store={store} name="email" />
          <FieldSub label="plan field" store={store} name="plan" />
          <RenderBlock label="form.Subscribe — the only summary subscriber" tone="scoped">
            <SummaryReader store={store} />
          </RenderBlock>
        </div>
      </RenderBlock>
    </div>
  );
}

/** A field block that subscribes to its own slice only. */
function FieldSub({
  label,
  store,
  name,
}: {
  label: string;
  store: Store;
  name: keyof Values;
}) {
  const value = useSelector(store, (s) => s[name]);
  return (
    <RenderBlock label={label} tone="field">
      <TextField
        label={name === "email" ? "Email" : "Plan"}
        value={value}
        onChange={(v) => store.setField(name, v)}
      />
    </RenderBlock>
  );
}

function SummaryReader({ store }: { store: Store }) {
  const email = useSelector(store, (s) => s.email);
  const plan = useSelector(store, (s) => s.plan);
  return (
    <p className="m-0 text-sm text-foreground">
      {email || "—"} · {plan || "—"}
    </p>
  );
}

export function ReRenderScope() {
  return (
    <div className="not-prose my-8 w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="mb-3 text-sm font-medium text-foreground">
            RHF pitfall — broad <code className="text-xs">watch()</code>
          </p>
          <WatchColumn />
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="mb-3 text-sm font-medium text-foreground">
            TanStack Form — <code className="text-xs">form.Subscribe</code>
          </p>
          <SubscribeColumn />
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        The left is a deliberate root-level subscription, not RHF&apos;s default.
        Type in either column: amber renders because a parent read the value;
        blue/green renders because the block itself subscribed to that slice.
        (Counters start at 2 in dev — Strict Mode double-invokes the first render.)
      </p>
    </div>
  );
}
