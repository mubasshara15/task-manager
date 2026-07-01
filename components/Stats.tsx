import {
  ClipboardList,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface StatsProps {
  total: number;
  completed: number;
}

export default function Stats({
  total,
  completed,
}: StatsProps) {
  const pending = total - completed;

  const stats = [
    {
      title: "Total Tasks",
      value: total,
      icon: ClipboardList,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-sm">
                  {item.title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-2">
                  {item.value}
                </h2>
              </div>

              <div className={`${item.bg} p-3 rounded-xl`}>
                <Icon className={`w-7 h-7 ${item.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}