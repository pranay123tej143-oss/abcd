import { RelayControls } from "@/components/admin/relay-controls";
import { BulkActions } from "@/components/admin/bulk-actions";

export default function ControlsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Relay Controls
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manual control of all relays
        </p>
      </div>

      <BulkActions />
      <RelayControls />
    </div>
  );
}
