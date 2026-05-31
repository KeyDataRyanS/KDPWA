"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";
import { cn } from "@/lib/utils";

const THRESHOLD = 72;

export function PullToRefresh() {
  const router = useRouter();

  const onRefresh = useCallback(async () => {
    router.refresh();
    // Brief pause so the spinner is visible even on fast refreshes
    await new Promise((r) => setTimeout(r, 600));
  }, [router]);

  const { pullDistance, isRefreshing, threshold } = usePullToRefresh(onRefresh);

  const visible = pullDistance > 0 || isRefreshing;
  // How far through the pull gesture (0 → 1)
  const progress = Math.min(pullDistance / threshold, 1);
  // Translate the indicator down as the user pulls
  const translateY = isRefreshing ? 0 : pullDistance * 0.4;

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      aria-label={isRefreshing ? "Refreshing…" : "Pull to refresh"}
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center"
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <div
        className={cn(
          "mt-16 flex size-9 items-center justify-center rounded-full border border-border bg-card shadow-md",
          "transition-opacity duration-150",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        <RefreshCw
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-150",
            isRefreshing && "animate-spin"
          )}
          style={
            !isRefreshing
              ? { transform: `rotate(${Math.round(progress * 270)}deg)` }
              : undefined
          }
          aria-hidden
        />
      </div>
    </div>
  );
}
