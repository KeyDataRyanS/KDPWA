"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type PacingPoint = {
  month: string;
  curr?: number | null;
  compYtd?: number | null;
  compFull?: number | null;
};

export type PacingLegendItem = {
  label: string;
  color: string;
  dashed?: boolean;
  filled?: boolean;
};

export const CURR_COLOR = "#3b82f6";
export const COMP_YTD_COLOR = "#1e40af";
export const COMP_FULL_COLOR = "#94a3b8";

type Props = {
  data: PacingPoint[];
  yFormatter?: (v: number) => string;
  tooltipFormatter?: (v: number) => string;
  legendItems: PacingLegendItem[];
  height?: number;
  yDomain?: [number | "auto", number | "auto"];
};

export function PacingAreaChart({
  data,
  yFormatter = (v) => `${v}`,
  tooltipFormatter,
  legendItems,
  height = 240,
  yDomain,
}: Props) {
  const fmt = tooltipFormatter ?? yFormatter;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-1.5">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg width="22" height="10" className="shrink-0" aria-hidden>
              {item.filled ? (
                <>
                  <rect x="0" y="4" width="22" height="3" fill={item.color} fillOpacity={0.25} rx="1" />
                  <line x1="0" y1="5.5" x2="22" y2="5.5" stroke={item.color} strokeWidth="2" />
                </>
              ) : (
                <line
                  x1="0"
                  y1="5"
                  x2="22"
                  y2="5"
                  stroke={item.color}
                  strokeWidth="1.5"
                  strokeDasharray={item.dashed ? "5 4" : undefined}
                />
              )}
            </svg>
            <span className="leading-none">{item.label}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={yFormatter}
            domain={yDomain ?? ["auto", "auto"]}
            tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }}
            axisLine={false}
            tickLine={false}
            width={54}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
                  <p className="mb-1 font-medium text-card-foreground">{label}</p>
                  {payload.map((entry) =>
                    entry.value != null ? (
                      <p
                        key={entry.dataKey as string}
                        className="tabular-nums"
                        style={{ color: entry.color }}
                      >
                        {fmt(entry.value as number)}
                      </p>
                    ) : null
                  )}
                </div>
              );
            }}
          />
          {/* Compare full — bottom layer */}
          <Line
            type="monotone"
            dataKey="compFull"
            stroke={COMP_FULL_COLOR}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
            connectNulls={false}
          />
          {/* Compare YTD */}
          <Line
            type="monotone"
            dataKey="compYtd"
            stroke={COMP_YTD_COLOR}
            strokeWidth={1.5}
            strokeDasharray="6 3"
            dot={false}
            connectNulls={false}
          />
          {/* Current year — filled area on top */}
          <Area
            type="monotone"
            dataKey="curr"
            stroke={CURR_COLOR}
            fill={CURR_COLOR}
            fillOpacity={0.18}
            strokeWidth={2}
            dot={false}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
