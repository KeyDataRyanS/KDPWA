"use client";

import { useState } from "react";
import {
  Check,
  ChevronUp,
  ChevronDown,
  MapPin,
  Calendar,
  Bookmark,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Occupancy",
  "Revenue",
  "Bookings",
  "Alerts",
  "AI Insights",
  "Market Trends",
];

const TIME_RANGES = ["60 Days", "90 Days", "120 Days"];

const STATUS_LEGEND = [
  { color: "bg-green-500", label: "On Track" },
  { color: "bg-amber-500", label: "Needs Attention" },
  { color: "bg-red-500", label: "Action Required" },
];

function SectionDivider() {
  return <div className="h-px bg-border" />;
}

export function FilterPanel() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRange, setSelectedRange] = useState("60 Days");

  return (
    <div className="space-y-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10 text-sm">
      {/* Categories */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Categories</span>
          <ChevronUp className="size-4 text-muted-foreground" />
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left transition-colors",
              selectedCategory === cat
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span className="flex size-3.5 shrink-0 items-center justify-center">
              {selectedCategory === cat && <Check className="size-3.5" />}
            </span>
            {cat}
          </button>
        ))}
      </div>

      <SectionDivider />

      {/* Markets */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-3.5 text-muted-foreground" />
            <span className="font-semibold">Markets</span>
          </div>
          <ChevronUp className="size-4 text-muted-foreground" />
        </div>
        <p className="px-2.5 text-xs text-muted-foreground">Florida Panhandle</p>
        <div className="flex items-center justify-between rounded-md border border-border px-3 py-1.5 text-sm">
          <span>Florida Panhandle</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </div>
      </div>

      <SectionDivider />

      {/* Time Range */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5 text-muted-foreground" />
            <span className="font-semibold">Time Range</span>
          </div>
          <ChevronUp className="size-4 text-muted-foreground" />
        </div>
        <p className="px-2.5 text-xs text-muted-foreground">{selectedRange}</p>
        {TIME_RANGES.map((range) => (
          <button
            key={range}
            type="button"
            onClick={() => setSelectedRange(range)}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left transition-colors",
              selectedRange === range
                ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                : "text-foreground hover:bg-muted"
            )}
          >
            <span className="flex size-3.5 shrink-0 items-center justify-center">
              {selectedRange === range && <Check className="size-3.5" />}
            </span>
            {range}
          </button>
        ))}
      </div>

      <SectionDivider />

      {/* Saved Items + Email Schedule */}
      <div className="space-y-0.5">
        {[
          { icon: Bookmark, label: "Saved Items" },
          { icon: Mail, label: "Email Schedule" },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left hover:bg-muted"
          >
            <Icon className="size-4 text-muted-foreground" />
            {label}
          </button>
        ))}
      </div>

      <SectionDivider />

      {/* Status Legend */}
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
          Status Legend
        </p>
        {STATUS_LEGEND.map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2.5 px-1">
            <div className={cn("size-2.5 shrink-0 rounded-full", color)} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
