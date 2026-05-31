"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

const THRESHOLD = 72;

function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.navigator as any).standalone === true
  );
}

export function usePullToRefresh(
  onRefresh: () => Promise<void> | void,
  scrollRef: RefObject<HTMLElement | null>
) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const active = useRef(false);

  useEffect(() => {
    active.current = isPWA();
  }, []);

  const atTop = useCallback(
    () => (scrollRef.current?.scrollTop ?? 0) === 0,
    [scrollRef]
  );

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!active.current || isRefreshing) return;
      // Only arm the gesture when the scroll container is truly at the top
      if (atTop()) startY.current = e.touches[0].clientY;
    },
    [isRefreshing, atTop]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!active.current || isRefreshing || startY.current === null) return;
      // Disarm if the user has scrolled down since the gesture started
      if (!atTop()) {
        startY.current = null;
        setPullDistance(0);
        return;
      }
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0) {
        e.preventDefault();
        setPullDistance(Math.min(delta, THRESHOLD * 1.5));
      }
    },
    [isRefreshing, atTop]
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
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [scrollRef, onTouchStart, onTouchMove, onTouchEnd]);

  return { pullDistance, isRefreshing, threshold: THRESHOLD };
}
