"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type InstallState =
  | { type: "android"; prompt: BeforeInstallPromptEvent }
  | { type: "ios" };

const DISMISSED_KEY = "pwa-install-dismissed";

export function useInstallPrompt() {
  const [state, setState] = useState<InstallState | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Already running as installed PWA — nothing to show
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window.navigator as any).standalone === true) return;
    // User already dismissed the banner
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod/i.test(ua);
    // Safari but not Chrome/Firefox/Edge on iOS (they can't install anyway)
    const isSafari = /^((?!chrome|crios|fxios|edgios).)*safari/i.test(ua);

    if (isIOS && isSafari) {
      setState({ type: "ios" });
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setState({ type: "android", prompt: e as BeforeInstallPromptEvent });
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function install() {
    if (state?.type !== "android") return;
    await state.prompt.prompt();
    const { outcome } = await state.prompt.userChoice;
    if (outcome === "accepted") setState(null);
  }

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, "1");
    setDismissed(true);
  }

  return {
    installState: state,
    visible: !dismissed && state !== null,
    install,
    dismiss,
  };
}
