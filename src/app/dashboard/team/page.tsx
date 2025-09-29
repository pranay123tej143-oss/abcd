import { getActiveTeams } from "@/lib/db/queries";
import Link from "next/link";

export default async function TeamsPage() {
  const teams = await getActiveTeams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Teams
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View all teams and their status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link
            key={team.teamId}
            href={`/team/${team.teamId}`}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {team.teamName}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  team.active
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {team.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>Fan: #{team.assignedFan}</p>
              <p>Light: #{team.assignedLight}</p>
              {team.lastScan && (
                <p className="text-xs">
                  Last scan: {new Date(team.lastScan).toLocaleString()}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
