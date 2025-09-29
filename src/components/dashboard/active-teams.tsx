"use client";

import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

async function fetchActiveTeams() {
  const res = await fetch("/api/teams/active");
  return res.json();
}

export function ActiveTeams() {
  const { data, isLoading } = useQuery({
    queryKey: ["active-teams"],
    queryFn: fetchActiveTeams,
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Active Teams
        </h2>
        <Users className="h-5 w-5 text-gray-400" />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      ) : Array.isArray(data?.teams) && data.teams.length > 0 ? (
        <div className="space-y-3">
          {data.teams.map((team: any) => (
            <div
              key={team.teamId}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {team.teamName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Fan: #{team.assignedFan} • Light: #{team.assignedLight}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No active teams
        </div>
      )}
    </div>
  );
}
