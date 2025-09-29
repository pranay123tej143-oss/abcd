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
        {Array.isArray(data?.relays) &&
          data.relays.map((relay: any) => {
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
            {data?.stats?.on ?? 0} / {data?.stats?.total ?? 0} relays active
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            Last update: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
