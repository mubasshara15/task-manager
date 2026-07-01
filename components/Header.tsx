import { ClipboardCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="inline-flex items-center gap-4">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
          <ClipboardCheck className="w-10 h-10 text-white" />
        </div>

        <div className="text-left">
          <h1 className="text-5xl font-extrabold text-white">
            Task Manager
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Organize your tasks with speed and simplicity.
          </p>
        </div>
      </div>
    </header>
  );
}