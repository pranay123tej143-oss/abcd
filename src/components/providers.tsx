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
