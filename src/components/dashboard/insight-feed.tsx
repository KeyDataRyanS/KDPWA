"use client";

import { useState } from "react";
import {
  Bookmark,
  MoreHorizontal,
  Sparkles,
  BarChart2,
  Share2,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterPanel } from "@/components/dashboard/filter-panel";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type TopMover = {
  name: string;
  value: string;
  change: string;
  positive: boolean;
};

type InsightItem = {
  id: string;
  accentColor: string;
  title: string;
  description: string;
  category: string;
  metric?: string;
  metricDelta?: string;
  deltaPositive?: boolean;
  previousPeriod?: string;
  table?: TopMover[];
};

// ─── Data ────────────────────────────────────────────────────────────────────

const INSIGHTS: InsightItem[] = [
  {
    id: "occupancy",
    accentColor: "#22c55e",
    title: "Occupancy is up 4.2% this month",
    description:
      "Your portfolio occupancy has climbed to 76.8%, outpacing the market average of 72.1%. This is your strongest month since last September.",
    metric: "76.8%",
    metricDelta: "4.2pp",
    deltaPositive: true,
    previousPeriod: "72.6%",
    category: "Occupancy",
  },
  {
    id: "revenue",
    accentColor: "#22c55e",
    title: "Revenue per unit reached $1,842",
    description:
      "Average revenue per unit increased by $127 compared to last month. This growth is driven by higher nightly rates in your coastal properties.",
    metric: "$1,842",
    metricDelta: "127",
    deltaPositive: true,
    previousPeriod: "$1,715",
    category: "Revenue",
  },
  {
    id: "top-movers",
    accentColor: "#22c55e",
    title: "Top movers: 5 properties leading bookings",
    description:
      "These properties saw the highest 7-day booking pickup in your portfolio. Beach House 101 leads with 14 new bookings.",
    category: "Bookings",
    table: [
      { name: "Beach House 101", value: "14 bookings", change: "+6", positive: true },
      { name: "Sunset Villa 203", value: "11 bookings", change: "+4", positive: true },
      { name: "Harbor View 305", value: "10 bookings", change: "+3", positive: true },
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function InsightCard({ item }: { item: InsightItem }) {
  return (
    <div
      className="overflow-hidden rounded-xl bg-card border border-border border-l-[3px] text-sm text-card-foreground"
      style={{ borderLeftColor: item.accentColor }}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-1.5">
            <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            <Button variant="ghost" size="icon-sm" aria-label="Bookmark">
              <Bookmark className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More options">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Single metric */}
      {item.metric && (
        <div className="px-4 pb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{item.metric}</span>
            <span
              className={cn(
                "flex items-center gap-0.5 text-sm font-medium",
                item.deltaPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              )}
            >
              {item.deltaPositive ? (
                <ArrowUp className="size-4" />
              ) : (
                <ArrowDown className="size-4" />
              )}
              {item.metricDelta}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Previous period: {item.previousPeriod}
          </p>
        </div>
      )}

      {/* Top movers table */}
      {item.table && (
        <div className="px-4 pb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left text-xs font-medium text-muted-foreground">Name</th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Value</th>
                <th className="pb-2 text-right text-xs font-medium text-muted-foreground">Change</th>
              </tr>
            </thead>
            <tbody>
              {item.table.map((row) => (
                <tr key={row.name} className="border-b border-border last:border-0">
                  <td className="py-2 font-medium">{row.name}</td>
                  <td className="py-2 text-right text-muted-foreground">{row.value}</td>
                  <td
                    className={cn(
                      "py-2 text-right font-medium",
                      row.positive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    )}
                  >
                    {row.positive ? "↑" : "↓"} {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-3 border-t border-border px-4 py-2.5">
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <Sparkles className="size-3.5" />
          Ask Dext AI
        </button>
        <span className="select-none text-border">|</span>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <BarChart2 className="size-3.5" />
          View Report
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {item.category}
          </span>
          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Share"
          >
            <Share2 className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function InsightFeed() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div className="space-y-5">
        {/* Greeting + filter trigger */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <h1 className="text-3xl font-bold tracking-tight">Good morning, John</h1>
            <p className="text-sm text-muted-foreground">
              You have 45 units across 3 markets
            </p>
            <p className="text-sm text-muted-foreground">
              Here&rsquo;s what&rsquo;s happening with your portfolio today
            </p>
          </div>
          {/* Filter button — hidden on xl where the right panel is always visible */}
          <Button
            variant="outline"
            size="sm"
            className="xl:hidden shrink-0 gap-1.5"
            onClick={() => setFilterOpen(true)}
          >
            <SlidersHorizontal className="size-3.5" />
            Filters
          </Button>
        </div>

        {/* Insight cards */}
        <div className="space-y-4">
          {INSIGHTS.map((item) => (
            <InsightCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Filter drawer for mobile/tablet */}
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="right" className="w-72 sm:max-w-72 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Customize</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <FilterPanel />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
