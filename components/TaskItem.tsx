import { Trash2, Pencil, Save, X } from "lucide-react";
import { motion } from "framer-motion";


interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface TaskItemProps {
  task: Task;
  toggleTask: (id: string, completed: boolean) => void;
  deleteTask: (id: string) => void;

  editingId: string;
  editingTitle: string;
  setEditingId: (id: string) => void;
  setEditingTitle: (title: string) => void;
  updateTask: () => void;
}

export default function TaskItem({
  task,
  toggleTask,
  deleteTask,
  editingId,
  editingTitle,
  setEditingId,
  setEditingTitle,
  updateTask,
}: TaskItemProps) {
  const isEditing = editingId === task._id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex justify-between items-center hover:border-blue-500 transition-all"
    >
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task._id, !task.completed)}
          className="h-5 w-5"
        />

        <div className="flex-1">
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
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white outline-none focus:border-blue-500"
              autoFocus
            />
          ) : (
            <>
              <h3
                className={`text-lg font-semibold ${
                  task.completed
                    ? "line-through text-gray-500"
                    : "text-white"
                }`}
              >
                {task.title}
              </h3>

              <div className="flex gap-3 items-center mt-2 flex-wrap">
                {task.completed ? (
                  <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                    ✅ Completed
                  </span>
                ) : (
                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                    🟡 Pending
                  </span>
                )}

                <span className="text-xs text-gray-500">
                  📅 {new Date(task.createdAt).toLocaleDateString()}
                </span>

                <span className="text-xs text-gray-500">
                  🕒{" "}
                  {new Date(task.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={updateTask}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-xl flex items-center gap-2 text-white"
            >
              <Save size={18} />
              Save
            </button>

            <button
              onClick={() => {
                setEditingId("");
                setEditingTitle("");
              }}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl flex items-center gap-2 text-white"
            >
              <X size={18} />
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditingId(task._id);
                setEditingTitle(task.title);
              }}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl flex items-center gap-2 text-white"
            >
              <Pencil size={18} />
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl flex items-center gap-2 text-white"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}