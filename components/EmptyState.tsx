import { ClipboardList } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <ClipboardList className="h-7 w-7 text-primary" />
      </div>
      <h2 className="text-sm font-semibold text-foreground">No tasks yet</h2>
      <p className="mt-1 max-w-xs text-xs text-muted">
        Create your first task to start organizing your work.
      </p>
    </div>
  );
}
