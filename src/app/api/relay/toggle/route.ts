import { NextResponse } from "next/server";
import { z } from "zod";
import { publishRelayCommand } from "@/lib/mqtt/client";
import { updateRelayState } from "@/lib/db/queries";

const toggleSchema = z.object({
  relay_id: z.number().min(1).max(8),
  state: z.boolean(),
  controlled_by: z.string().default("admin"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { relay_id, state, controlled_by } = toggleSchema.parse(body);

    // Publish MQTT command
    publishRelayCommand(relay_id, state, controlled_by);

    // Update database
    await updateRelayState(relay_id, state, controlled_by);

    return NextResponse.json({
      status: "ok",
      relay_id,
      state,
      controlled_by,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid request data",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to toggle relay",
      },
      { status: 500 }
    );
  }
}
