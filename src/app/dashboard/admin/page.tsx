import Link from "next/link";
import { Users, Shield, ToggleLeft } from "lucide-react";

export default function AdminPage() {
  const adminSections = [
    {
      title: "Team Management",
      description: "Create, edit, and manage teams",
      href: "/admin/teams",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Member Management",
      description: "Add members and assign RFID cards",
      href: "/admin/members",
      icon: Shield,
      color: "bg-green-500",
    },
    {
      title: "Relay Controls",
      description: "Manual relay control and monitoring",
      href: "/admin/controls",
      icon: ToggleLeft,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          System administration and configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div
              className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
