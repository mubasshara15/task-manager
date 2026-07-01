"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ListChecks,
  Clock3,
  CheckCircle2,
  Calendar,
  BarChart3,
  Settings,
  Rocket,
  Moon,
  Sun,
  ClipboardCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import type { NavSection } from "@/types";

interface SidebarProps {
  activeNav: NavSection;
  onNavigate: (section: NavSection) => void;
  open: boolean;
  onClose: () => void;
}

type NavItem =
  | { label: string; icon: typeof LayoutDashboard; kind: "nav"; section: NavSection }
  | { label: string; icon: typeof LayoutDashboard; kind: "soon" };

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, kind: "nav", section: "dashboard" },
  { label: "All Tasks", icon: ListChecks, kind: "nav", section: "all" },
  { label: "Pending", icon: Clock3, kind: "nav", section: "pending" },
  { label: "Completed", icon: CheckCircle2, kind: "nav", section: "completed" },
  { label: "Calendar", icon: Calendar, kind: "soon" },
  { label: "Statistics", icon: BarChart3, kind: "soon" },
  { label: "Settings", icon: Settings, kind: "soon" },
];

export default function Sidebar({ activeNav, onNavigate, open, onClose }: SidebarProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleClick = (item: NavItem) => {
    if (item.kind === "soon") {
      toast("Coming soon", { icon: "🚧" });
      return;
    }

    onNavigate(item.section);
    onClose();
  };

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/60 md:hidden" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform duration-200 ease-out md:w-[72px] md:translate-x-0 lg:w-64 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-border px-5 md:justify-center lg:justify-start">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground md:hidden lg:inline">
            Task Manager
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.kind === "nav" && activeNav === item.section;

            return (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:justify-center lg:justify-start ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-foreground/5 hover:text-foreground"
                } ${item.kind === "soon" ? "opacity-60" : ""}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="md:hidden lg:inline">{item.label}</span>
                {item.kind === "soon" && (
                  <span className="ml-auto shrink-0 rounded-full border border-border px-1.5 py-0.5 text-[10px] text-muted md:hidden lg:inline">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="hidden flex-col gap-3 border-t border-border p-4 lg:flex">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <Rocket className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm font-semibold text-foreground">Stay productive 🚀</p>
            <p className="mt-1 text-xs text-muted">
              Small steps every day lead to big results.
            </p>
            <button
              onClick={() => toast("Coming soon", { icon: "🚧" })}
              className="mt-3 w-full rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View Statistics
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg px-1 py-1 text-xs text-muted">
            <span className="flex items-center gap-2">
              {isDark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
              {isDark ? "Dark mode" : "Light mode"}
            </span>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                isDark ? "bg-primary" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  isDark ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
