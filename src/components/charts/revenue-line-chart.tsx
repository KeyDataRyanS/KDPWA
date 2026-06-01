"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jun", revenue: 61200 },
  { month: "Jul", revenue: 74800 },
  { month: "Aug", revenue: 82100 },
  { month: "Sep", revenue: 69400 },
  { month: "Oct", revenue: 58300 },
  { month: "Nov", revenue: 52700 },
  { month: "Dec", revenue: 67900 },
  { month: "Jan", revenue: 55100 },
  { month: "Feb", revenue: 60400 },
  { month: "Mar", revenue: 71800 },
  { month: "Apr", revenue: 78600 },
  { month: "May", revenue: 84231 },
];

export function RevenueLineChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-border)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          cursor={{ stroke: "var(--color-border)" }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            const value = payload[0].value;
            const formatted =
              typeof value === "number" ? `$${value.toLocaleString()}` : String(value ?? "");
            return (
              <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
                <p className="font-medium text-card-foreground">{label}</p>
                <p className="text-muted-foreground">{formatted}</p>
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="var(--color-primary)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: "var(--color-primary)", strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
