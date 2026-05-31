"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { LayoutDashboard, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { InstallBanner } from "@/components/install-banner";
import { PullToRefresh } from "@/components/pull-to-refresh";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground"
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}

function Sidebar() {
  return (
    <aside className="flex h-full w-56 flex-col bg-sidebar p-3 lg:w-64">
      <div className="flex h-12 items-center px-3">
        <span className="text-base font-semibold tracking-tight">KeyData</span>
      </div>
      <Separator className="my-2 bg-sidebar-border" />
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}

function DrawerNav({ onClose }: { onClose: () => void }) {
  return (
    <nav className="flex flex-col gap-1 p-1">
      {navItems.map((item) => (
        <NavLink key={item.href} {...item} onClick={onClose} />
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar: visible on md+ */}
      <div className="hidden border-r border-border md:flex md:shrink-0">
        <Sidebar />
      </div>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Sticky header */}
        <header
          className="sticky top-0 z-30 flex shrink-0 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            minHeight: "calc(3.5rem + env(safe-area-inset-top))",
          }}
        >
          {/* Mobile drawer trigger — hidden on md+ */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-3 bg-sidebar">
              <SheetHeader className="mb-2">
                <SheetTitle className="text-left text-base">KeyData</SheetTitle>
              </SheetHeader>
              <Separator className="mb-2 bg-sidebar-border" />
              <DrawerNav onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <span className="font-semibold md:hidden">KeyData</span>
          <div className="flex-1" />
          <ThemeToggle />
        </header>

        {/* Scrollable content */}
        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
      </div>

      <InstallBanner />
      <PullToRefresh scrollRef={mainRef} />
    </div>
  );
}
