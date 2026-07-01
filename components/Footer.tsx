import { Globe, Link2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted sm:flex-row">
      <div className="text-center sm:text-left">
        <p className="text-foreground">© 2026 Task Manager</p>
        <p className="mt-0.5">Built with Next.js, MongoDB and Tailwind CSS</p>
      </div>

      <div className="flex items-center gap-2">
        <span
          title="GitHub"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <Link2 className="h-4 w-4" />
        </span>
        <span
          title="LinkedIn"
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          <Globe className="h-4 w-4" />
        </span>
      </div>
    </footer>
  );
}
