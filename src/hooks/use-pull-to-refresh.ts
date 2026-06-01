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
  const startX = useRef<number | null>(null);
  const isHorizontal = useRef(false);
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
      if (atTop()) {
        startY.current = e.touches[0].clientY;
        startX.current = e.touches[0].clientX;
        isHorizontal.current = false;
      }
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
      // Once classified as horizontal, ignore the rest of this gesture
      if (isHorizontal.current) return;

      const dx = Math.abs(e.touches[0].clientX - (startX.current ?? 0));
      const dy = e.touches[0].clientY - startY.current;

      // Wait for at least 5 px of movement before classifying direction
      if (dx < 5 && Math.abs(dy) < 5) return;

      // Horizontal swipe — disarm pull-to-refresh for this gesture
      if (dx > Math.abs(dy)) {
        isHorizontal.current = true;
        setPullDistance(0);
        return;
      }

      if (dy > 0) {
        e.preventDefault();
        setPullDistance(Math.min(dy, THRESHOLD * 1.5));
      }
    },
    [isRefreshing, atTop]
  );

  const onTouchEnd = useCallback(async () => {
    if (!active.current || startY.current === null) return;
    const pulled = pullDistance;
    startY.current = null;
    startX.current = null;
    isHorizontal.current = false;
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
