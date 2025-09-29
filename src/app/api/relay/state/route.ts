import { NextResponse } from "next/server";
import { getAllRelayStates } from "@/lib/db/queries";

export async function GET() {
  try {
    const relays = await getAllRelayStates();

    return NextResponse.json({
      status: "ok",
      relays,
      stats: {
        total: relays.length,
        on: relays.filter((r) => r.state).length,
        off: relays.filter((r) => !r.state).length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch relay states",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
