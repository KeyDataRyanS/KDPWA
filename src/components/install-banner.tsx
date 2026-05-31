"use client";

import { X, Share, PlusSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { cn } from "@/lib/utils";

export function InstallBanner() {
  const { installState, visible, install, dismiss } = useInstallPrompt();

  if (!visible) return null;

  return (
    /* Slide up from the bottom; hidden on lg+ (desktop) */
    <div
      role="banner"
      aria-label="Install app"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 lg:hidden",
        "animate-in slide-in-from-bottom-4 duration-300"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="m-3 rounded-xl border border-border bg-card p-4 shadow-lg ring-1 ring-foreground/5">
        <div className="flex items-start gap-3">
          {/* App icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon-192x192.png"
            alt=""
            aria-hidden
            className="size-12 shrink-0 rounded-xl"
          />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight">
              Add KeyData to your home screen
            </p>

            {installState?.type === "ios" ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Tap{" "}
                <Share
                  className="inline-block size-3.5 align-text-bottom"
                  aria-label="Share"
                />{" "}
                then{" "}
                <span className="inline-flex items-center gap-0.5 font-medium text-foreground">
                  <PlusSquare className="size-3" aria-hidden />
                  Add to Home Screen
                </span>
                .
              </p>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">
                Works offline and feels like a native app.
              </p>
            )}

            {installState?.type === "android" && (
              <Button
                size="sm"
                className="mt-3 min-h-[44px] w-full sm:w-auto"
                onClick={install}
              >
                Add to Home Screen
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Dismiss"
            className="shrink-0"
            onClick={dismiss}
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
