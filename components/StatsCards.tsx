import { AlertCircle, CheckCircle2, ClipboardList, Clock3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardsProps {
  total: number;
  completed: number;
  loading?: boolean;
}

export default function StatsCards({ total, completed, loading }: StatsCardsProps) {
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      subtitle: total === 0 ? "No tasks yet" : `${total} in your workspace`,
      icon: ClipboardList,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Pending",
      value: pending,
      subtitle: pending > 0 ? "Needs your attention" : "All caught up",
      icon: Clock3,
      color: "text-warning",
      bg: "bg-warning/10",
      trend:
        pending > 0
          ? { icon: AlertCircle, label: "Action needed", color: "text-warning" }
          : { icon: CheckCircle2, label: "All clear", color: "text-success" },
    },
    {
      title: "Completed",
      value: completed,
      subtitle: completed > 0 ? "Nice work!" : "None yet",
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
      trend:
        completed > 0
          ? { icon: TrendingUp, label: `${completed} done`, color: "text-success" }
          : undefined,
    },
    {
      title: "Progress",
      value: `${percentage}%`,
      subtitle: `${completed} of ${total} done`,
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-5">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-background" />
            <div className="mt-4 h-3 w-16 animate-pulse rounded bg-background" />
            <div className="mt-2 h-6 w-10 animate-pulse rounded bg-background" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const Trend = card.trend?.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-muted/50"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${card.bg}`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
              {Trend && card.trend && (
                <span className={`flex items-center gap-1 text-[11px] font-medium ${card.trend.color}`}>
                  <Trend className="h-3 w-3" />
                  {card.trend.label}
                </span>
              )}
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
              {card.title}
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{card.value}</p>
            <p className="mt-1 text-xs text-muted">{card.subtitle}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
