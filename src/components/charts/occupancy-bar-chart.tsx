"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jun", occupancy: 71 },
  { month: "Jul", occupancy: 84 },
  { month: "Aug", occupancy: 88 },
  { month: "Sep", occupancy: 76 },
  { month: "Oct", occupancy: 63 },
  { month: "Nov", occupancy: 57 },
  { month: "Dec", occupancy: 69 },
  { month: "Jan", occupancy: 61 },
  { month: "Feb", occupancy: 65 },
  { month: "Mar", occupancy: 74 },
  { month: "Apr", occupancy: 80 },
  { month: "May", occupancy: 78 },
];

export function OccupancyBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={18}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-border)"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-sans)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
          tick={{ fontSize: 11, fill: "var(--color-muted-foreground)", fontFamily: "var(--font-sans)" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip
          cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
                <p className="font-medium text-card-foreground">{label}</p>
                <p className="text-muted-foreground">
                  {payload[0].value}% occupied
                </p>
              </div>
            );
          }}
        />
        <Bar
          dataKey="occupancy"
          fill="var(--color-primary)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
