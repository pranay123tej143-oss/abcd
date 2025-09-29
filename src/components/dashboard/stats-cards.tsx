"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Zap, Activity, Clock } from "lucide-react";

async function fetchStats() {
  const [teamsRes, relaysRes, attendanceRes] = await Promise.all([
    fetch("/api/teams/active"),
    fetch("/api/relay/state"),
    fetch("/api/attendance/stats"),
  ]);

  const teams = await teamsRes.json();
  const relays = await relaysRes.json();
  const attendance = await attendanceRes.json();

  return { teams, relays, attendance };
}

export function StatsCards() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  const stats = [
    {
      name: "Active Teams",
      value: data?.teams.count || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      name: "Relays ON",
      value: data?.relays.stats?.on || 0,
      icon: Zap,
      color: "bg-green-500",
    },
    {
      name: "Today's Scans",
      value:
        data?.attendance.stats?.reduce(
          (acc: number, s: any) => acc + s.checkIns,
          0
        ) || 0,
      icon: Activity,
      color: "bg-purple-500",
    },
    {
      name: "Lab Status",
      value: data?.teams.count > 0 ? "Active" : "Idle",
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow animate-pulse"
          >
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.name}
              </p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
