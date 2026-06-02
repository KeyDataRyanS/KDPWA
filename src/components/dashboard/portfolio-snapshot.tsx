import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

type MetricRow = { label: string; value: string; delta: string; positive: boolean };
type Reminder = { time: string; title: string; description: string };

const mineMetrics: MetricRow[] = [
  { label: "Paid Occupancy", value: "76.8%", delta: "+4.2%", positive: true },
  { label: "ADR", value: "$371", delta: "-$8", positive: false },
  { label: "RevPAR", value: "$285", delta: "+$6", positive: true },
];

const marketMetrics: MetricRow[] = [
  { label: "Paid Occupancy", value: "71.3%", delta: "+1.1%", positive: true },
  { label: "ADR", value: "$348", delta: "+$4", positive: true },
  { label: "RevPAR", value: "$248", delta: "-$2", positive: false },
];

const reminders: Reminder[] = [
  {
    time: "6 days",
    title: "Super Bowl weekend approaching",
    description:
      "Your 4 Downtown units are within 10 miles of the venue — rates may need adjustment.",
  },
  {
    time: "2 weeks",
    title: "Local music festival – Pensacola",
    description:
      "Beachfront inventory near the venue historically fills 3 weeks in advance.",
  },
  {
    time: "3 weeks",
    title: "Ski season opens in 3 weeks",
    description:
      "Review pricing on your 6 Mountain Region properties before the rush.",
  },
  {
    time: "5 weeks",
    title: "Spring break surge starts soon",
    description:
      "Gulf Coast coastal properties typically see 2× booking velocity in this window.",
  },
];

function Delta({ delta, positive }: { delta: string; positive: boolean }) {
  const Icon = positive ? TrendingUp : TrendingDown;
  return (
    <span
      className={cn(
        "flex items-center gap-0.5 text-xs font-medium whitespace-nowrap",
        positive
          ? "text-green-600 dark:text-green-400"
          : "text-red-500 dark:text-red-400"
      )}
    >
      <Icon className="size-3 shrink-0" />
      {delta}
    </span>
  );
}

function MetricsTable({ label, rows }: { label: string; rows: MetricRow[] }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex-1 text-muted-foreground">{row.label}</span>
            <span className="font-medium">{row.value}</span>
            <Delta delta={row.delta} positive={row.positive} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioSnapshot() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Portfolio Snapshot</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Unit Revenue Nightly */}
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Unit Revenue Nightly
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">$284</span>
            <Delta delta="+$12" positive />
          </div>
        </div>

        <div className="h-px bg-border" />
        <MetricsTable label="Mine" rows={mineMetrics} />
        <div className="h-px bg-border" />
        <MetricsTable label="Market" rows={marketMetrics} />
        <div className="h-px bg-border" />

        {/* Smart Reminders */}
        <div className="space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Smart Reminders
          </p>
          <div className="space-y-3.5">
            {reminders.map((r) => (
              <div key={r.title} className="flex gap-3">
                <span className="mt-0.5 shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground whitespace-nowrap leading-5">
                  {r.time}
                </span>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-snug">{r.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
