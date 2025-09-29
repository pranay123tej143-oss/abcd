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
          <Power className="h-5 w-5" />
          <span>All ON</span>
        </button>
        <button
          onClick={handleAllOff}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Power className="h-5 w-5" />
          <span>All OFF</span>
        </button>
        <button
          onClick={() => handleAllFans(true)}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Wind className="h-5 w-5" />
          <span>Fans ON</span>
        </button>
        <button
          onClick={() => handleAllFans(false)}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600/20 hover:bg-blue-600/30 text-blue-700 dark:text-blue-300 font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Wind className="h-5 w-5" />
          <span>Fans OFF</span>
        </button>
        <button
          onClick={() => handleAllLights(true)}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Sun className="h-5 w-5" />
          <span>Lights ON</span>
        </button>
        <button
          onClick={() => handleAllLights(false)}
          disabled={mutation.isPending}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-700 dark:text-yellow-300 font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          <Sun className="h-5 w-5" />
          <span>Lights OFF</span>
        </button>
      </div>
    </div>
  );
}