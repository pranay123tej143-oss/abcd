import { MemberList } from "@/components/admin/member-list";

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Member Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Add members and assign RFID cards
        </p>
      </div>

      <MemberList />
    </div>
  );
}
