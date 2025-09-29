import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActiveTeams } from "@/components/dashboard/active-teams";
import { RelayGrid } from "@/components/dashboard/relay-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time lab monitoring and control
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveTeams />
        <RelayGrid />
      </div>

      <RecentActivity />
    </div>
  );
}
