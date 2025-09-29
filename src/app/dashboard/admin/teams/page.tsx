import { TeamManager } from "@/components/admin/team-manager";

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Team Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure teams and resource assignments
        </p>
      </div>

      <TeamManager />
    </div>
  );
}
