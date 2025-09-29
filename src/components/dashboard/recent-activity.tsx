"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

async function fetchRecentActivity() {
  const res = await fetch("/api/attendance/logs?limit=10");
  return res.json();
}

export function RecentActivity() {
  const { data, isLoading } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: fetchRecentActivity,
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-16 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      ) : data?.logs.length > 0 ? (
        <div className="space-y-3">
          {data.logs.map((log: any) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {log.scanType === "check-in" ? (
                  <ArrowUpCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {log.memberName || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {log.teamId} • {log.scanType}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(log.scanTime).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No recent activity
        </div>
      )}
    </div>
  );
}
