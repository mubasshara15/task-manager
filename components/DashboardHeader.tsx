interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const firstName = name.trim().split(" ")[0] || name;

  return (
    <div className="mb-6">
      <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
        {greeting}, {firstName} 👋
      </h1>
      <p className="mt-1 text-sm text-muted">
        Here’s what’s happening with your tasks today.
      </p>
    </div>
  );
}
