import * as React from "react";

/**
 * Three-column mapping table: two short code/identifier columns plus one
 * longer prose column ("use it when", "before/after", "instead of"). Built
 * for that specific shape instead of a raw markdown table, which has no
 * column-width control and truncates the prose column into a horizontal
 * scrollbar.
 *
 * Renders as a real table on wide screens (code columns stay narrow, the
 * prose column wraps instead of truncating) and as stacked, labeled cards
 * below `sm` — no scrollbar hunting on mobile.
 *
 * ```mdx
 * <MappingTable columns={["React Hook Form", "TanStack Form", "Use it when"]}>
 *   <MappingRow left="watch()" right="useSelector(form.store, (s) => s.values)">
 *     A broad form-root read.
 *   </MappingRow>
 * </MappingTable>
 * ```
 */

/**
 * Never rendered directly — `MappingTable` reads `left`/`right`/`children`
 * straight off each element's props and lays the row out itself.
 */
export function MappingRow(_props: {
  left: string;
  right: string;
  children: React.ReactNode;
}) {
  return null;
}

export function MappingTable({
  columns,
  children,
}: {
  columns: [string, string, string];
  children: React.ReactNode;
}) {
  const rows = React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child)) return [];
    const props = child.props as {
      left?: string;
      right?: string;
      children?: React.ReactNode;
    };
    return [{ left: props.left ?? "", right: props.right ?? "", detail: props.children }];
  });

  const gridStyle = {
    gridTemplateColumns: "minmax(9rem, 1fr) minmax(9rem, 1fr) minmax(14rem, 1.3fr)",
  };

  return (
    <figure className="not-prose blog-editorial-surface my-8 block w-full overflow-hidden">
      {/* Desktop / tablet: a real table, wrapping the prose column instead of truncating. */}
      <div className="hidden sm:block">
        <div className="grid w-full border-b border-border/60 bg-muted/40" style={gridStyle} role="row">
          {columns.map((column) => (
            <div
              key={column}
              className="px-4 py-2.5 text-left text-sm font-medium text-foreground sm:px-5"
              role="columnheader"
            >
              {column}
            </div>
          ))}
        </div>
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid w-full border-b border-border/40 last:border-b-0"
            style={gridStyle}
            role="row"
          >
            <div className="px-4 py-3 align-top sm:px-5">
              <code className="text-xs break-words sm:text-[13px]">{row.left}</code>
            </div>
            <div className="px-4 py-3 align-top sm:px-5">
              <code className="text-xs break-words sm:text-[13px]">{row.right}</code>
            </div>
            <div className="px-4 py-3 text-sm leading-relaxed text-muted-foreground sm:px-5">
              {row.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked, labeled cards — nothing to scroll horizontally. */}
      <div className="divide-y divide-border/40 sm:hidden">
        {rows.map((row, index) => (
          <div key={index} className="space-y-2 px-4 py-3.5">
            <div>
              <p className="m-0 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                {columns[0]}
              </p>
              <code className="text-xs">{row.left}</code>
            </div>
            <div>
              <p className="m-0 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                {columns[1]}
              </p>
              <code className="text-xs">{row.right}</code>
            </div>
            <div>
              <p className="m-0 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                {columns[2]}
              </p>
              <p className="m-0 text-sm leading-relaxed text-muted-foreground">{row.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
