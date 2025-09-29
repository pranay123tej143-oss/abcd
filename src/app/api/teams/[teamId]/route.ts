import { NextResponse } from "next/server";
import { getTeamById } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const team = await getTeamById(params.teamId);

    if (!team) {
      return NextResponse.json(
        {
          status: "error",
          message: "Team not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "ok",
      team,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch team",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
