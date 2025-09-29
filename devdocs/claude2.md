# 📦 **Component Files**

Now let's create all the component files referenced in the routes.

---

## 🎨 **Providers & Theme**

### `src/components/providers.tsx`

```typescript
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchInterval: 5000, // 5 seconds for real-time updates
          },
        },
      })
  );

  // Initialize MQTT connection on mount
  useEffect(() => {
    fetch("/api/mqtt/init")
      .then((res) => res.json())
      .then((data) => console.log("MQTT initialized:", data))
      .catch((err) => console.error("MQTT init failed:", err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

---

### `src/components/theme-provider.tsx`

```typescript
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

---

## 🧩 **Layout Components**

### `src/components/layout/sidebar.tsx`

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Shield,
  ToggleLeft,
  Activity,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Teams", href: "/team", icon: Users },
  { name: "Admin Panel", href: "/admin", icon: Shield },
  { name: "Team Management", href: "/admin/teams", icon: Users },
  { name: "Members", href: "/admin/members", icon: Users },
  { name: "Relay Controls", href: "/admin/controls", icon: ToggleLeft },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Smart Lab
          </h1>
        </div>

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400"
                              : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="mt-auto">
              <Link
                href="/settings"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Settings className="h-6 w-6 shrink-0" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
```

---

### `src/components/layout/header.tsx`

```typescript
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex h-16 items-center gap-x-4 px-4 sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="lg:hidden -m-2.5 p-2.5 text-gray-700 dark:text-gray-300"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* User Menu */}
            <div className="flex items-center gap-x-4">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" />
              <div className="flex items-center gap-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="hidden lg:block text-sm font-semibold text-gray-900 dark:text-white">
                  Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## 📊 **Dashboard Components**

### `src/components/dashboard/stats-cards.tsx`

```typescript
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
```

---

### `src/components/dashboard/active-teams.tsx`

```typescript
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
      ) : data?.teams.length > 0 ? (
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
```

---

### `src/components/dashboard/relay-grid.tsx`

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Zap, Fan, Lightbulb } from "lucide-react";

async function fetchRelayStates() {
  const res = await fetch("/api/relay/state");
  return res.json();
}

async function toggleRelay(relayId: number, state: boolean) {
  const res = await fetch("/api/relay/toggle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      relay_id: relayId,
      state,
      controlled_by: "admin",
    }),
  });
  return res.json();
}

export function RelayGrid() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["relay-states"],
    queryFn: fetchRelayStates,
  });

  const mutation = useMutation({
    mutationFn: ({ relayId, state }: { relayId: number; state: boolean }) =>
      toggleRelay(relayId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relay-states"] });
    },
  });

  const getRelayIcon = (deviceType: string) => {
    return deviceType === "fan" ? Fan : Lightbulb;
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Relay Status
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Relay Status
        </h2>
        <Zap className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data?.relays.map((relay: any) => {
          const Icon = getRelayIcon(relay.deviceType);
          return (
            <button
              key={relay.relayId}
              onClick={() =>
                mutation.mutate({
                  relayId: relay.relayId,
                  state: !relay.state,
                })
              }
              disabled={mutation.isPending}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${
                  relay.state
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
                }
                hover:scale-105 disabled:opacity-50
              `}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-6 w-6 ${
                    relay.state
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-400"
                  }`}
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {relay.deviceType === "fan" ? "Fan" : "Light"} #
                    {relay.deviceNumber}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {relay.state ? "ON" : "OFF"}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {data?.stats.on} / {data?.stats.total} relays active
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Last update: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

### `src/components/dashboard/recent-activity.tsx`

```typescript
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
```

---

### `src/components/dashboard/team-status.tsx`

```typescript
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
```

---

## 👨‍💼 **Admin Components**

### `src/components/admin/relay-controls.tsx`

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Power, Fan, Lightbulb } from "lucide-react";

async function fetchRelayStates() {
  const res = await fetch("/api/relay/state");
  return res.json();
}

async function toggleRelay(relayId: number, state: boolean) {
  const res = await fetch("/api/relay/toggle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      relay_id: relayId,
      state,
      controlled_by: "admin",
    }),
  });
  return res.json();
}

export function RelayControls() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["relay-states"],
    queryFn: fetchRelayStates,
  });

  const mutation = useMutation({
    mutationFn: ({ relayId, state }: { relayId: number; state: boolean }) =>
      toggleRelay(relayId, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relay-states"] });
    },
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading relays...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Individual Relay Controls
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data?.relays.map((relay: any) => (
          <div
            key={relay.relayId}
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {relay.deviceType === "fan" ? (
                  <Fan className="h-5 w-5 text-blue-500" />
                ) : (
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {relay.deviceType === "fan" ? "Fan" : "Light"} #
                  {relay.deviceNumber}
                </span>
              </div>
              <span
                className={`text-xs font-semibold ${
                  relay.state ? "text-green-600" : "text-gray-400"
                }`}
              >
                {relay.state ? "ON" : "OFF"}
              </span>
            </div>

            <button
              onClick={() =>
                mutation.mutate({
                  relayId: relay.relayId,
                  state: !relay.state,
                })
              }
              disabled={mutation.isPending}
              className={`
                w-full py-2 px-4 rounded-lg font-semibold transition-all
                ${
                  relay.state
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                }
                disabled:opacity-50
              `}
            >
              {relay.state ? "Turn OFF" : "Turn ON"}
            </button>

            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              Controlled by: {relay.controlledBy || "System"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### `src/components/admin/bulk-actions.tsx`

```typescript
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Power, Sun, Wind } from "lucide-react";

async function bulkToggleRelays(relayIds: number[], state: boolean) {
  const res = await fetch("/api/relay/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      relay_ids: relayIds,
      state,
      controlled_by: "admin",
    }),
  });
  return res.json();
}

export function BulkActions() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ relayIds, state }: { relayIds: number[]; state: boolean }) =>
      bulkToggleRelays(relayIds, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relay-states"] });
    },
  });

  const handleAllOn = () => {
    mutation.mutate({ relayIds: [1, 2, 3, 4, 5, 6, 7, 8], state: true });
  };

  const handleAllOff = () => {
    mutation.mutate({ relayIds: [1, 2, 3, 4, 5, 6, 7, 8], state: false });
  };

  const handleAllFans = (state: boolean) => {
    mutation.mutate({ relayIds: [1, 2, 3, 4], state });
  };

  const handleAllLights = (state: boolean) => {
    mutation.mutate({ relayIds: [5, 6, 7, 8], state });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Bulk Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={handleAllOn}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Power
```
