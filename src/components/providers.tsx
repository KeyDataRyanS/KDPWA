"use client";

import { ThemeProvider } from "next-themes";
import { SerwistProvider } from "@serwist/turbopack/react";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SerwistProvider swUrl="/serwist/sw.js">
        {children}
        <Toaster richColors closeButton position="bottom-right" />
      </SerwistProvider>
    </ThemeProvider>
  );
}
