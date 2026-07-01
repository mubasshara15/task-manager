import { motion } from "framer-motion";

interface ProgressCardProps {
  total: number;
  completed: number;
  onViewDetails: () => void;
}

export default function ProgressCard({ total, completed, onViewDetails }: ProgressCardProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const subtitle =
    total === 0
      ? "Add your first task to get started."
      : percentage === 100
      ? "All tasks completed. Amazing work!"
      : percentage >= 50
      ? "You're making great progress! Keep it up."
      : "Let's get some tasks done today.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.15 }}
      className="mt-4 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-foreground">Overall Progress</h2>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-2.5 w-full max-w-md overflow-hidden rounded-full bg-background">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <span className="shrink-0 text-sm font-semibold text-foreground">{percentage}%</span>
          </div>

          <p className="mt-2 text-xs text-muted">
            {completed} of {total} tasks completed
          </p>
        </div>

        <button
          onClick={onViewDetails}
          className="shrink-0 self-start rounded-lg border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5 sm:self-center"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}
