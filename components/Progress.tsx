interface ProgressProps {
  total: number;
  completed: number;
}

export default function Progress({
  total,
  completed,
}: ProgressProps) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <div className="flex justify-between mb-3">
        <span className="text-white font-medium">
          Overall Progress
        </span>

        <span className="text-blue-400 font-semibold">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-zinc-700 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-400 mt-3">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
}