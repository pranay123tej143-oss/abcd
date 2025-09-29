import { NextResponse } from "next/server";
import { getActiveTeams } from "@/lib/db/queries";

export async function GET() {
  try {
    const activeTeams = await getActiveTeams();

    return NextResponse.json({
      status: "ok",
      teams: activeTeams,
      count: activeTeams.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch active teams",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
