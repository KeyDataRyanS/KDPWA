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
      {/* Tab list — horizontally scrollable on narrow screens */}
      <Tabs.List
        className="flex border-b border-border"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            className={cn(
              "-mb-px shrink-0 whitespace-nowrap border-b-2 border-transparent px-4 py-2.5",
              "text-sm font-medium text-muted-foreground transition-colors",
              "hover:text-foreground",
              "data-[selected]:border-primary data-[selected]:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
            )}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

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
