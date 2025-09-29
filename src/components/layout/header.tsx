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
