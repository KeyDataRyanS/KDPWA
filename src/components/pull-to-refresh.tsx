"use client";

import { useRouter } from "next/navigation";
import { useCallback, type RefObject } from "react";
import { RefreshCw } from "lucide-react";
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh";
import { cn } from "@/lib/utils";

const THRESHOLD = 72;

interface PullToRefreshProps {
  scrollRef: RefObject<HTMLElement | null>;
}

export function PullToRefresh({ scrollRef }: PullToRefreshProps) {
  const router = useRouter();

  const onRefresh = useCallback(async () => {
    router.refresh();
    await new Promise((r) => setTimeout(r, 600));
  }, [router]);

  const { pullDistance, isRefreshing, threshold } = usePullToRefresh(onRefresh, scrollRef);

  const visible = pullDistance > 0 || isRefreshing;
  const progress = Math.min(pullDistance / threshold, 1);
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
            "size-4 text-muted-foreground",
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
