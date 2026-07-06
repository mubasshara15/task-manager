import { Trash2, Pencil, Save, X, Check } from "lucide-react";
import { motion } from "framer-motion";
import type { Task } from "@/types";

interface TaskRowProps {
  task: Task;
  toggleTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;
  editingId: string;
  editingTitle: string;
  setEditingId: (id: string) => void;
  setEditingTitle: (title: string) => void;
  updateTask: () => void;
}

export default function TaskRow({
  task,
  toggleTask,
  deleteTask,
  editingId,
  editingTitle,
  setEditingId,
  setEditingTitle,
  updateTask,
}: TaskRowProps) {
  const isEditing = editingId === task.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-foreground/[0.03] ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => toggleTask(task.id, task.completed)}
        aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
          task.completed
            ? "border-success bg-success/20 text-success"
            : "border-muted text-transparent hover:border-primary"
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") updateTask();

              if (e.key === "Escape") {
                setEditingId("");
                setEditingTitle("");
              }
            }}
            className="w-full rounded-md border border-primary/50 bg-background/60 px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-primary"
            autoFocus
          />
        ) : (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              className={`truncate text-sm ${
                task.completed ? "text-muted line-through" : "text-foreground"
              }`}
            >
              {task.title}
            </span>

            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                task.completed
                  ? "bg-success/15 text-success"
                  : "bg-warning/15 text-warning"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>

            <span className="text-xs text-muted">
              {new Date(task.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
              {" · "}
              {new Date(task.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        {isEditing ? (
          <>
            <button
              onClick={updateTask}
              aria-label="Save"
              className="flex h-7 w-7 items-center justify-center rounded-md text-success transition-colors hover:bg-success/10"
            >
              <Save className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => {
                setEditingId("");
                setEditingTitle("");
              }}
              aria-label="Cancel"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditingId(task.id);
                setEditingTitle(task.title);
              }}
              aria-label="Edit task"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted opacity-0 transition-all hover:bg-foreground/5 hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              aria-label="Delete task"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted opacity-0 transition-all hover:bg-danger/10 hover:text-danger group-hover:opacity-100 focus-visible:opacity-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}
