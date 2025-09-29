import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Test database connection
    await db.query.teams.findMany({ limit: 1 });

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
