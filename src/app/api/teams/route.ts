import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teams } from "@/lib/db/schema";

export async function GET() {
  try {
    const allTeams = await db.select().from(teams);

    return NextResponse.json({
      status: "ok",
      teams: allTeams,
      count: allTeams.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch teams",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
