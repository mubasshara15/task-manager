"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, LogOut, Menu, Plus, Search, Settings, User } from "lucide-react";
import toast from "react-hot-toast";
import type { AuthUser } from "@/types";

interface TopBarProps {
  user: AuthUser;
  search: string;
  setSearch: (value: string) => void;
  onOpenSidebar: () => void;
  onNewTask: () => void;
  onLogout: () => void;
}

export default function TopBar({
  user,
  search,
  setSearch,
  onOpenSidebar,
  onNewTask,
  onLogout,
}: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = user.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          onClick={onOpenSidebar}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-foreground/5 hover:text-foreground md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-11 w-64 rounded-xl border border-border bg-surface p-4 shadow-xl">
                <p className="text-sm font-medium text-foreground">Notifications</p>
                <p className="mt-1 text-xs text-muted">No new notifications.</p>
              </div>
            )}
          </div>

          <div ref={avatarRef} className="relative">
            <button
              onClick={() => setAvatarOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary transition-colors hover:bg-primary/25"
              aria-label="Account menu"
            >
              {initial}
            </button>
            {avatarOpen && (
              <div className="absolute right-0 top-11 w-48 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-xl">
                <p className="truncate border-b border-border px-3 py-2 text-xs text-muted">
                  {user.name}
                </p>
                <button
                  onClick={() => toast("Coming soon", { icon: "🚧" })}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                >
                  <User className="h-3.5 w-3.5" /> Profile
                </button>
                <button
                  onClick={() => toast("Coming soon", { icon: "🚧" })}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                >
                  <Settings className="h-3.5 w-3.5" /> Settings
                </button>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-danger transition-colors hover:bg-danger/10"
                >
                  <LogOut className="h-3.5 w-3.5" /> Log out
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onNewTask}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 active:bg-primary/80"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
