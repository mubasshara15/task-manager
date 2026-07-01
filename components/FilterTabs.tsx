interface FilterTabsProps {
  filter: string;
  setFilter: (value: string) => void;
}

export default function FilterTabs({
  filter,
  setFilter,
}: FilterTabsProps) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div className="flex gap-3 mb-6">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`px-5 py-2 rounded-xl font-medium transition
          ${
            filter === item
              ? "bg-blue-600 text-white"
              : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}