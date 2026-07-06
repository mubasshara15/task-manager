"use client";

import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import TaskToolbar from "@/components/TaskToolbar";
import TaskRow from "@/components/TaskRow";
import TaskSkeleton from "@/components/TaskSkeleton";
import EmptyState from "@/components/EmptyState";
import type { Task } from "@/types";

interface TaskTableProps {
  tasks: Task[];
  loading: boolean;
  filter: string;
  setFilter: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  quickTitle: string;
  setQuickTitle: (value: string) => void;
  addTask: () => void;
  toggleTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  editingId: string;
  editingTitle: string;
  setEditingId: (id: string) => void;
  setEditingTitle: (title: string) => void;
  updateTask: () => void;
}

export default function TaskTable({
  tasks,
  loading,
  filter,
  setFilter,
  sort,
  setSort,
  quickTitle,
  setQuickTitle,
  addTask,
  toggleTask,
  deleteTask,
  editingId,
  editingTitle,
  setEditingId,
  setEditingTitle,
  updateTask,
}: TaskTableProps) {
  return (
    <div className="mt-4 rounded-2xl border border-border bg-surface shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Tasks <span className="font-normal text-muted">({tasks.length})</span>
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={quickTitle}
            onChange={(e) => setQuickTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
          />
          <button
            onClick={addTask}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90 active:bg-primary/80"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <TaskToolbar filter={filter} setFilter={setFilter} sort={sort} setSort={setSort} />
      </div>

      {loading ? (
        <TaskSkeleton />
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="divide-y divide-border">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editingId={editingId}
                editingTitle={editingTitle}
                setEditingId={setEditingId}
                setEditingTitle={setEditingTitle}
                updateTask={updateTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
