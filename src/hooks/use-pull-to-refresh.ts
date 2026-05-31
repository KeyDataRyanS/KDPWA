"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const THRESHOLD = 72; // px of pull needed to trigger a refresh

function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.navigator as any).standalone === true
  );
}

export function usePullToRefresh(onRefresh: () => Promise<void> | void) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  // Snapshot PWA status once on mount — avoids re-checking on every event
  const active = useRef(false);

  useEffect(() => {
    active.current = isPWA();
  }, []);

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!active.current || isRefreshing) return;
      if (window.scrollY === 0) startY.current = e.touches[0].clientY;
    },
    [isRefreshing]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!active.current || isRefreshing || startY.current === null) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0 && window.scrollY === 0) {
        // Block native browser pull-to-refresh / overscroll
        e.preventDefault();
        setPullDistance(Math.min(delta, THRESHOLD * 1.5));
      }
    },
    [isRefreshing]
  );

  const onTouchEnd = useCallback(async () => {
    if (!active.current || startY.current === null) return;
    const pulled = pullDistance;
    startY.current = null;
    setPullDistance(0);
    if (pulled >= THRESHOLD) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
  }, [pullDistance, onRefresh]);

  useEffect(() => {
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    // passive: false so we can call preventDefault and block overscroll
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [onTouchStart, onTouchMove, onTouchEnd]);

  return { pullDistance, isRefreshing, threshold: THRESHOLD };
}
