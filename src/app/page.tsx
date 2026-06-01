import { AppShell } from "@/components/app-shell";
import { CompanyOverviewTabs } from "@/components/dashboard/company-overview-tabs";

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold tracking-tight">Company Overview</h1>
        <CompanyOverviewTabs />
      </div>
    </AppShell>
  );
}
