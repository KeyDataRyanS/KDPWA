import { AppShell } from "@/components/app-shell";
import { PortfolioSnapshot } from "@/components/dashboard/portfolio-snapshot";
import { InsightFeed } from "@/components/dashboard/insight-feed";
import { FilterPanel } from "@/components/dashboard/filter-panel";

export default function HomePage() {
  return (
    <AppShell>
      {/*
        Mobile (<lg): single column — InsightFeed first, PortfolioSnapshot below.
        Tablet (lg): two columns — PortfolioSnapshot left, InsightFeed right.
        Desktop (xl): three columns — adds the FilterPanel on the right.
        FilterPanel is also accessible via the Filters button inside InsightFeed on <xl.
      */}
      <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[240px_1fr] lg:items-start lg:gap-5 xl:grid-cols-[240px_1fr_210px]">
        <div className="order-2 lg:order-1">
          <PortfolioSnapshot />
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <InsightFeed />
        </div>
        <div className="order-3 hidden xl:block">
          <FilterPanel />
        </div>
      </div>
    </AppShell>
  );
}
