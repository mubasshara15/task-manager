"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface TaskToolbarProps {
  filter: string;
  setFilter: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
}

const filters = ["All", "Pending", "Completed"];
const sortOptions = ["Latest First", "Oldest First", "Completed First"];

export default function TaskToolbar({ filter, setFilter, sort, setSort }: TaskToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-background/60 p-0.5">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === item
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div ref={ref} className="relative">
        <button
          onClick={() => setSortOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
        >
          {sort}
          <ChevronDown className="h-3.5 w-3.5" />
        </button>

        {sortOpen && (
          <div className="absolute right-0 top-9 z-10 w-40 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-xl">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSort(option);
                  setSortOpen(false);
                }}
                className={`block w-full px-3 py-1.5 text-left text-xs transition-colors hover:bg-foreground/5 ${
                  sort === option ? "text-primary" : "text-muted"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
