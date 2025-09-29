import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { attendanceLogs, teams } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get stats for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await db
      .select({
        teamId: attendanceLogs.teamId,
        teamName: teams.teamName,
        checkIns: sql<number>`COUNT(CASE WHEN ${attendanceLogs.scanType} = 'check-in' THEN 1 END)`,
        checkOuts: sql<number>`COUNT(CASE WHEN ${attendanceLogs.scanType} = 'check-out' THEN 1 END)`,
      })
      .from(attendanceLogs)
      .leftJoin(teams, eq(attendanceLogs.teamId, teams.teamId))
      .where(sql`${attendanceLogs.scanTime} >= ${today}`)
      .groupBy(attendanceLogs.teamId, teams.teamName);

    return NextResponse.json({
      status: "ok",
      stats,
      date: today.toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch attendance stats",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
