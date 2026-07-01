import { Inbox } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="border border-dashed border-gray-700 rounded-2xl p-12 text-center mt-8">
      <Inbox className="mx-auto h-16 w-16 text-gray-500 mb-4" />

      <h2 className="text-2xl font-semibold text-white">
        No Tasks Yet
      </h2>

      <p className="text-gray-400 mt-2">
        Create your first task to get started.
      </p>
    </div>
  );
}