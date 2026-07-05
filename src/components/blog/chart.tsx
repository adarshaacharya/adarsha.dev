"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

type ChartType = "bar" | "line" | "area" | "pie";

type SeriesConfig = {
  key: string;
  label: string;
  color?: string;
};

type BlogChartProps = {
  type?: ChartType;
  title?: string;
  description?: string;
  xKey: string;
  data: Record<string, string | number>[];
  series: SeriesConfig[];
  className?: string;
  showLegend?: boolean;
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

function buildChartConfig(series: SeriesConfig[]): ChartConfig {
  return series.reduce<ChartConfig>((config, item, index) => {
    config[item.key] = {
      label: item.label,
      color: item.color ?? CHART_COLORS[index % CHART_COLORS.length],
    };
    return config;
  }, {});
}

/**
 * MDX-friendly chart primitive powered by shadcn/ui + Recharts.
 *
 * ```mdx
 * <BlogChart
 *   type="bar"
 *   title="Cache scope by layer"
 *   xKey="layer"
 *   data={[
 *     { layer: "Request Memo", server: 1, client: 0 },
 *     { layer: "Router Cache", server: 0, client: 1 },
 *   ]}
 *   series={[
 *     { key: "server", label: "Server-side" },
 *     { key: "client", label: "Client-side" },
 *   ]}
 * />
 * ```
 */
export function BlogChart({
  type = "bar",
  title,
  description,
  xKey,
  data,
  series,
  className,
  showLegend = series.length > 1,
}: BlogChartProps) {
  const config = React.useMemo(() => buildChartConfig(series), [series]);

  if (!data.length || !series.length) {
    return null;
  }

  return (
    <figure className={cn("not-prose blog-editorial-surface my-8 w-full overflow-hidden", className)}>
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

      <div className="px-2 py-4 sm:px-4">
        <ChartContainer config={config} className="aspect-[16/9] min-h-[240px] w-full">
          {type === "bar" ? (
            <BarChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend ? (
                <ChartLegend content={<ChartLegendContent />} />
              ) : null}
              {series.map((item) => (
                <Bar
                  key={item.key}
                  dataKey={item.key}
                  fill={`var(--color-${item.key})`}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          ) : null}

          {type === "line" ? (
            <LineChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend ? (
                <ChartLegend content={<ChartLegendContent />} />
              ) : null}
              {series.map((item) => (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  stroke={`var(--color-${item.key})`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          ) : null}

          {type === "area" ? (
            <AreaChart accessibilityLayer data={data} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={xKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} width={32} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {showLegend ? (
                <ChartLegend content={<ChartLegendContent />} />
              ) : null}
              {series.map((item) => (
                <Area
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  stroke={`var(--color-${item.key})`}
                  fill={`var(--color-${item.key})`}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          ) : null}

          {type === "pie" ? (
            <PieChart accessibilityLayer>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              {showLegend ? (
                <ChartLegend content={<ChartLegendContent nameKey={xKey} />} />
              ) : null}
              <Pie
                data={data}
                dataKey={series[0].key}
                nameKey={xKey}
                innerRadius={56}
                strokeWidth={2}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          ) : null}
        </ChartContainer>
      </div>
    </figure>
  );
}
