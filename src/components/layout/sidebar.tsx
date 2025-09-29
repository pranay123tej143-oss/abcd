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
