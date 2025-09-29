import { NextResponse } from "next/server";
import { getMqttClient } from "@/lib/mqtt/client";

export async function GET() {
  try {
    const client = getMqttClient();

    return NextResponse.json({
      status: "ok",
      connected: client.connected,
      message: "MQTT client initialized",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to initialize MQTT client",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
