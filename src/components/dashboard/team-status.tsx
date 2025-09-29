"use client";

import { Fan, Lightbulb, Users, Clock } from "lucide-react";

export function TeamStatus({ team }: { team: any }) {
  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team Status
          </h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              team.active
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {team.active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Fan className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assigned Fan
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                #{team.assignedFan}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Lightbulb className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Assigned Light
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                #{team.assignedLight}
              </p>
            </div>
          </div>
        </div>

        {team.lastScan && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Last scan: {new Date(team.lastScan).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Members Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Team Members
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400">
          Member list will be displayed here
        </p>
      </div>
    </div>
  );
}
