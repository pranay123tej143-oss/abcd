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
