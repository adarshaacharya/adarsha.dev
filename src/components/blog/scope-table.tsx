import * as React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type ScopeRow = {
  label: string;
  values: boolean[];
};

const SCOPE_COLUMN_WIDTH = "6rem";

function scopeGridStyle(columnCount: number): React.CSSProperties {
  return {
    gridTemplateColumns: `minmax(0, 1fr) repeat(${columnCount}, ${SCOPE_COLUMN_WIDTH})`,
  };
}

/**
 * Yes/no matrix for "where does X live" comparisons.
 */
export function ScopeTable({
  title,
  description,
  columns,
  rows,
  className,
}: {
  title?: string;
  description?: string;
  columns: string[];
  rows: ScopeRow[];
  className?: string;
}) {
  const gridStyle = scopeGridStyle(columns.length);

  return (
    <figure
      className={cn(
        "not-prose blog-editorial-surface my-8 block w-full overflow-hidden",
        className,
      )}
    >
      {title || description ? (
        <figcaption className="border-b border-border/60 px-4 py-3 sm:px-5">
          {title ? (
            <p className="m-0 text-sm font-medium text-foreground">{title}</p>
          ) : null}
          {description ? (
            <p className="mt-1 mb-0 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </figcaption>
      ) : null}

      <div className="w-full text-sm" role="table">
        <div
          className="grid w-full border-b border-border/60 bg-muted/40"
          style={gridStyle}
          role="row"
        >
          <div
            className="px-4 py-2.5 text-left font-medium text-foreground sm:px-5"
            role="columnheader"
          >
            Cache layer
          </div>
          {columns.map((column) => (
            <div
              key={column}
              className="px-4 py-2.5 text-center font-medium text-foreground sm:px-5"
              role="columnheader"
            >
              {column}
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div
            key={row.label}
            className="grid w-full border-b border-border/40 last:border-b-0"
            style={gridStyle}
            role="row"
          >
            <div
              className="px-4 py-2.5 text-left text-foreground sm:px-5"
              role="rowheader"
            >
              {row.label}
            </div>
            {row.values.map((active, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-4 py-2.5 sm:px-5"
                role="cell"
              >
                <ScopeCell active={active} label={columns[index]} row={row.label} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </figure>
  );
}

function ScopeCell({
  active,
  label,
  row,
}: {
  active: boolean;
  label: string;
  row: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-full",
        active
          ? "bg-primary/15 text-primary"
          : "bg-muted text-muted-foreground/40",
      )}
      aria-label={`${row}: ${active ? "yes" : "no"} on ${label}`}
    >
      {active ? (
        <Check className="size-4" strokeWidth={2.5} aria-hidden="true" />
      ) : (
        <Minus className="size-4" strokeWidth={2} aria-hidden="true" />
      )}
    </span>
  );
}
