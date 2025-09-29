import { NextResponse } from "next/server";
import { getRecentAttendance } from "@/lib/db/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const logs = await getRecentAttendance(limit);

    return NextResponse.json({
      status: "ok",
      logs,
      count: logs.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch attendance logs",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
