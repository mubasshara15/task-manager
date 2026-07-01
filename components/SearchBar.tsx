import { Search } from "lucide-react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="relative mb-6">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        size={20}
      />

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}