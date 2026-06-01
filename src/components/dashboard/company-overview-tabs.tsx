"use client";

import { Tabs } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { MeVsLastYear } from "./me-vs-last-year";
import { MeVsMarket } from "./me-vs-market";
import { SalesVsLastYear } from "./sales-vs-last-year";

const tabs = [
  { value: "me-vs-last-year", label: "Me vs. Last Year" },
  { value: "me-vs-market", label: "Me vs. the Market" },
  { value: "sales-vs-last-year", label: "Sales vs. Last Year" },
];

export function CompanyOverviewTabs() {
  return (
    <Tabs.Root defaultValue="me-vs-last-year">
      {/*
        Outer div holds the static border — it never scrolls.
        Tabs.List scrolls horizontally inside it, and each tab's ::after
        provides the active underline indicator on top of the border.
      */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />
        <Tabs.List
          className="relative flex touch-pan-x overscroll-x-contain"
          style={{ overflowX: "auto", scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              className={cn(
                "relative shrink-0 whitespace-nowrap px-4 py-2.5",
                "text-sm font-medium text-muted-foreground transition-colors",
                "hover:text-foreground",
                // Active underline via ::after pseudo-element
                "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5",
                "after:content-[''] after:transition-colors",
                "data-[active]:text-foreground data-[active]:after:bg-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
              )}
            >
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </div>

      <Tabs.Panel value="me-vs-last-year" className="pt-5">
        <MeVsLastYear />
      </Tabs.Panel>
      <Tabs.Panel value="me-vs-market" className="pt-5">
        <MeVsMarket />
      </Tabs.Panel>
      <Tabs.Panel value="sales-vs-last-year" className="pt-5">
        <SalesVsLastYear />
      </Tabs.Panel>
    </Tabs.Root>
  );
}
