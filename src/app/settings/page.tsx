import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your application preferences.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Theme preference is controlled by the toggle in the header.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <p className="mt-4 text-sm text-muted-foreground">
              More settings coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
