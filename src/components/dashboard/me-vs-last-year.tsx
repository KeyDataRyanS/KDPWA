"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  PacingAreaChart,
  CURR_COLOR,
  COMP_YTD_COLOR,
  COMP_FULL_COLOR,
} from "@/components/charts/pacing-area-chart";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

// ADR ($)
const adrData = [
  { month: "Jan", curr: 182, compYtd: 170, compFull: 170 },
  { month: "Feb", curr: 198, compYtd: 184, compFull: 184 },
  { month: "Mar", curr: 226, compYtd: 210, compFull: 210 },
  { month: "Apr", curr: 248, compYtd: 232, compFull: 232 },
  { month: "May", curr: 268, compYtd: 249, compFull: 249 },
  { month: "Jun", curr: null, compYtd: null, compFull: 278 },
  { month: "Jul", curr: null, compYtd: null, compFull: 306 },
  { month: "Aug", curr: null, compYtd: null, compFull: 298 },
  { month: "Sep", curr: null, compYtd: null, compFull: 258 },
  { month: "Oct", curr: null, compYtd: null, compFull: 206 },
  { month: "Nov", curr: null, compYtd: null, compFull: 178 },
  { month: "Dec", curr: null, compYtd: null, compFull: 170 },
];

// Adj. Paid Occ. %
const occData = [
  { month: "Jan", curr: 22, compYtd: 20, compFull: 20 },
  { month: "Feb", curr: 30, compYtd: 27, compFull: 27 },
  { month: "Mar", curr: 38, compYtd: 34, compFull: 34 },
  { month: "Apr", curr: 44, compYtd: 40, compFull: 40 },
  { month: "May", curr: 50, compYtd: 45, compFull: 45 },
  { month: "Jun", curr: null, compYtd: null, compFull: 68 },
  { month: "Jul", curr: null, compYtd: null, compFull: 88 },
  { month: "Aug", curr: null, compYtd: null, compFull: 85 },
  { month: "Sep", curr: null, compYtd: null, compFull: 71 },
  { month: "Oct", curr: null, compYtd: null, compFull: 52 },
  { month: "Nov", curr: null, compYtd: null, compFull: 34 },
  { month: "Dec", curr: null, compYtd: null, compFull: 25 },
];

// Adj. RevPAR ($)
const revparData = [
  { month: "Jan", curr: 40, compYtd: 34, compFull: 34 },
  { month: "Feb", curr: 59, compYtd: 50, compFull: 50 },
  { month: "Mar", curr: 86, compYtd: 71, compFull: 71 },
  { month: "Apr", curr: 109, compYtd: 93, compFull: 93 },
  { month: "May", curr: 134, compYtd: 113, compFull: 113 },
  { month: "Jun", curr: null, compYtd: null, compFull: 189 },
  { month: "Jul", curr: null, compYtd: null, compFull: 270 },
  { month: "Aug", curr: null, compYtd: null, compFull: 253 },
  { month: "Sep", curr: null, compYtd: null, compFull: 183 },
  { month: "Oct", curr: null, compYtd: null, compFull: 107 },
  { month: "Nov", curr: null, compYtd: null, compFull: 61 },
  { month: "Dec", curr: null, compYtd: null, compFull: 43 },
];

// Unit Revenue Recognized (raw dollars, formatted as $M in chart)
const unitRevData = [
  { month: "Jan", curr: 4_200_000, compYtd: 3_100_000, compFull: 3_100_000 },
  { month: "Feb", curr: 7_500_000, compYtd: 5_900_000, compFull: 5_900_000 },
  { month: "Mar", curr: 11_800_000, compYtd: 8_700_000, compFull: 8_700_000 },
  { month: "Apr", curr: 15_900_000, compYtd: 12_300_000, compFull: 12_300_000 },
  { month: "May", curr: 17_220_000, compYtd: 11_796_408, compFull: 11_796_408 },
  { month: "Jun", curr: null, compYtd: null, compFull: 6_500_000 },
  { month: "Jul", curr: null, compYtd: null, compFull: 4_100_000 },
  { month: "Aug", curr: null, compYtd: null, compFull: 2_400_000 },
  { month: "Sep", curr: null, compYtd: null, compFull: 1_600_000 },
  { month: "Oct", curr: null, compYtd: null, compFull: 1_400_000 },
  { month: "Nov", curr: null, compYtd: null, compFull: 1_100_000 },
  { month: "Dec", curr: null, compYtd: null, compFull: 800_000 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterBar() {
  const [eventsOpen, setEventsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filters = ["Arrival", "Events +", "Filters", "Clear Filters", "Menu"];

  return (
    <>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:grid-cols-3">
          <div className="space-y-0.5">
            <p className="text-muted-foreground">Arrival Primary Range</p>
            <p className="font-medium">1/1/2026 – 12/31/2026</p>
            <p className="text-muted-foreground">as of 5/31/2026</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-muted-foreground">Arrival Compare Range</p>
            <p className="font-medium">1/1/2025 – 12/31/2025</p>
            <p className="text-muted-foreground">as of 6/1/2025</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-muted-foreground">Markets</p>
            <p className="font-medium">Florida Panhandle</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:shrink-0">
          {filters.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={
                label === "Filters" ? () => setFiltersOpen(true)
                : label === "Events +" ? () => setEventsOpen(true)
                : undefined
              }
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === 0
                  ? "bg-foreground text-background"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Sheet open={eventsOpen} onOpenChange={setEventsOpen}>
        <SheetContent side="right" className="w-80 sm:max-w-80">
          <SheetHeader>
            <SheetTitle>Events +</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground">Event options coming soon.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="right" className="w-80 sm:max-w-80">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground">Filter options coming soon.</p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

type DeltaBadgeProps = { value: string; positive: boolean };
function DeltaBadge({ value, positive }: DeltaBadgeProps) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
        positive
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      )}
    >
      {value}
    </span>
  );
}

type MetricCardProps = {
  label: string;
  currValue: string;
  compValue: string;
  currYear?: string;
  compYear?: string;
  company: string;
  delta: string;
  positive: boolean;
};

function MetricCard({
  label,
  currValue,
  compValue,
  currYear = "2026",
  compYear = "2025",
  company,
  delta,
  positive,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-2xl font-semibold leading-none">{currValue}</span>
          <span className="text-xs text-muted-foreground">{currYear}</span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-medium leading-none text-muted-foreground">
            {compValue}
          </span>
          <span className="text-xs text-muted-foreground">{compYear}</span>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-border pt-2">
          <span className="truncate text-xs text-muted-foreground">{company}</span>
          <DeltaBadge value={delta} positive={positive} />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MeVsLastYear() {
  const primaryLabel = "1/1/2026 – 12/31/2026 as of 5/31/2026";
  const compareYtdLabel = "1/1/2025 – 12/31/2025 as of 6/1/2025";
  const compareFullLabel = "1/1/2025 – 12/31/2025";
  const company = "RealJoy Vacations";

  return (
    <div className="space-y-5">
      <FilterBar />

      {/* Top metrics: ADR, Adj. Paid Occ. %, Adj. RevPAR + mini ADR chart */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="ADR"
          currValue="$262"
          compValue="$239"
          company={company}
          delta="+8.5%"
          positive
        />
        <MetricCard
          label="Adj. Paid Occ. %"
          currValue="36.7%"
          compValue="33.3%"
          company={company}
          delta="+10.0%"
          positive
        />
        <MetricCard
          label="Adj. RevPAR"
          currValue="$96"
          compValue="$80"
          company={company}
          delta="+20.4%"
          positive
        />

        {/* Mini ADR pacing chart */}
        <Card>
          <CardHeader className="pb-1">
            <p className="text-xs text-muted-foreground">Pacing Detail: ADR</p>
          </CardHeader>
          <CardContent className="pt-0">
            <PacingAreaChart
              data={adrData}
              yFormatter={(v) => `$${v}`}
              legendItems={[
                {
                  label: `as of 5/31/2026 | $262`,
                  color: CURR_COLOR,
                  filled: true,
                },
                {
                  label: `as of 6/1/2025 | $239`,
                  color: COMP_YTD_COLOR,
                  dashed: true,
                },
                {
                  label: `2025 full year | $222`,
                  color: COMP_FULL_COLOR,
                  dashed: true,
                },
              ]}
              height={130}
            />
          </CardContent>
        </Card>
      </div>

      {/* Bottom metrics: Avg. LOS, Unit Revenue, Guest Checkins */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard
          label="Avg. Length of Stay"
          currValue="5.8"
          compValue="6.0"
          company={company}
          delta="-3.2%"
          positive={false}
        />
        <MetricCard
          label="Unit Revenue (Recognized)"
          currValue="$56.82M"
          compValue="$41.79M"
          company={company}
          delta="+36.0%"
          positive
        />
        <MetricCard
          label="Guest Checkins"
          currValue="36,529"
          compValue="28,155"
          company={company}
          delta="+29.7%"
          positive
        />
      </div>

      {/* Pacing Detail: Adj. Paid Occ. % */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Pacing Detail: Adj. Paid Occ. %</CardTitle>
        </CardHeader>
        <CardContent>
          <PacingAreaChart
            data={occData}
            yFormatter={(v) => `${v}%`}
            legendItems={[
              {
                label: `Adj. Paid Occ. % | ${primaryLabel} | 36.7%`,
                color: CURR_COLOR,
                filled: true,
              },
              {
                label: `Adj. Paid Occ. % | ${compareYtdLabel} | 33.3%`,
                color: COMP_YTD_COLOR,
                dashed: true,
              },
              {
                label: `Adj. Paid Occ. % | ${compareFullLabel} | 54.8%`,
                color: COMP_FULL_COLOR,
                dashed: true,
              },
            ]}
            yDomain={[0, 100]}
          />
        </CardContent>
      </Card>

      {/* Pacing Detail: Adj. RevPAR */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Pacing Detail: Adj. RevPAR</CardTitle>
        </CardHeader>
        <CardContent>
          <PacingAreaChart
            data={revparData}
            yFormatter={(v) => `$${v}`}
            legendItems={[
              {
                label: `Adj. RevPAR | ${primaryLabel} | $96`,
                color: CURR_COLOR,
                filled: true,
              },
              {
                label: `Adj. RevPAR | ${compareYtdLabel} | $80`,
                color: COMP_YTD_COLOR,
                dashed: true,
              },
              {
                label: `Adj. RevPAR | ${compareFullLabel} | $122`,
                color: COMP_FULL_COLOR,
                dashed: true,
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Pacing Detail: Unit Revenue (Recognized) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Pacing Detail: Unit Revenue (Recognized)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PacingAreaChart
            data={unitRevData}
            yFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
            tooltipFormatter={(v) => `$${v.toLocaleString()}`}
            legendItems={[
              {
                label: `Unit Revenue | ${primaryLabel} | $56,620,156`,
                color: CURR_COLOR,
                filled: true,
              },
              {
                label: `Unit Revenue | ${compareYtdLabel} | $41,796,408`,
                color: COMP_YTD_COLOR,
                dashed: true,
              },
              {
                label: `Unit Revenue | ${compareFullLabel} | $60,044,725`,
                color: COMP_FULL_COLOR,
                dashed: true,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}

