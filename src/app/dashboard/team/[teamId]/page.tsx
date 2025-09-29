import { getTeamById } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { TeamStatus } from "@/components/dashboard/team-status";

export default async function TeamDetailPage({
  params,
}: {
  params: { teamId: string };
}) {
  const team = await getTeamById(params.teamId);

  if (!team) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {team.teamName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Team ID: {team.teamId}
        </p>
      </div>

      <TeamStatus team={team} />
    </div>
  );
}
