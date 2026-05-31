"use client";

import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflinePage() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <WifiOff className="size-12 text-muted-foreground" aria-hidden />
      <h1 className="text-2xl font-semibold tracking-tight">You&rsquo;re offline</h1>
      <p className="max-w-xs text-sm text-muted-foreground">
        No internet connection. Previously visited pages are still available.
      </p>
      <Button onClick={() => location.reload()}>Retry</Button>
    </div>
  );
}
