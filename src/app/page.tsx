import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Users, TrendingUp, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$84,231",
    delta: "+12.5%",
    icon: TrendingUp,
    description: "vs last month",
  },
  {
    title: "Active Guests",
    value: "2,841",
    delta: "+4.1%",
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Avg. Daily Rate",
    value: "$182",
    delta: "+2.3%",
    icon: BarChart3,
    description: "vs last month",
  },
  {
    title: "Occupancy",
    value: "78%",
    delta: "-1.2%",
    icon: Activity,
    description: "vs last month",
  },
];

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here&rsquo;s your property overview.
          </p>
        </div>

        {/* Stats grid: 1-col phone, 2-col tablet, 4-col desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ title, value, delta, icon: Icon, description }) => (
            <Card key={title}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>{title}</CardDescription>
                  <Icon className="size-4 text-muted-foreground" aria-hidden />
                </div>
                <CardTitle className="text-2xl tabular-nums">{value}</CardTitle>
              </CardHeader>
              <CardContent>
                <span
                  className={
                    delta.startsWith("+")
                      ? "text-xs font-medium text-green-600 dark:text-green-400"
                      : "text-xs font-medium text-red-600 dark:text-red-400"
                  }
                >
                  {delta}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  {description}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting started</CardTitle>
            <CardDescription>
              This is the app shell. Add feature pages incrementally.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button>View reports</Button>
            <Button variant="outline">Manage properties</Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
