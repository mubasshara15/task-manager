import { Code2, Database, Palette, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-zinc-800 pt-8 pb-8">

      <div className="flex flex-col items-center gap-5">

        <p className="text-lg font-semibold text-white">
          Built with modern web technologies
        </p>

        <div className="flex flex-wrap justify-center gap-4">

          <span className="px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-400 flex items-center gap-2">
            <Code2 size={16} />
            Next.js
          </span>

          <span className="px-4 py-2 rounded-full bg-green-500/15 border border-green-500/20 text-green-400 flex items-center gap-2">
            <Database size={16} />
            MongoDB
          </span>

          <span className="px-4 py-2 rounded-full bg-pink-500/15 border border-pink-500/20 text-pink-400 flex items-center gap-2">
            <Palette size={16} />
            Tailwind CSS
          </span>

        </div>

        <p className="text-sm text-zinc-400">
            Powered by Next.js, MongoDB & Tailwind CSS
        </p>

        <p className="text-xs text-zinc-500">
          © 2026 Task Manager. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}