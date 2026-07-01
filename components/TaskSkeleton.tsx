export default function TaskSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3">
          <div className="h-5 w-5 shrink-0 animate-pulse rounded-md bg-surface" />
          <div className="flex-1 space-y-2">
            <div
              className="h-3.5 animate-pulse rounded bg-surface"
              style={{ width: `${40 - i * 5}%` }}
            />
          </div>
          <div className="h-3 w-16 shrink-0 animate-pulse rounded bg-surface" />
        </div>
      ))}
    </div>
  );
}
