interface TaskFormProps {
  title: string;
  setTitle: (value: string) => void;
  addTask: () => void;
}

export default function TaskForm({
  title,
  setTitle,
  addTask,
}: TaskFormProps) {
  return (
    <div className="flex gap-3 mb-8">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white outline-none focus:border-blue-500"
      />

      <button
        onClick={addTask}
        className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Add Task
      </button>
    </div>
  );
}