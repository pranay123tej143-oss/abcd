import { NextResponse } from "next/server";
import { z } from "zod";
import { publishRelayCommand } from "@/lib/mqtt/client";
import { updateRelayState } from "@/lib/db/queries";

const bulkSchema = z.object({
  relay_ids: z.array(z.number().min(1).max(8)),
  state: z.boolean(),
  controlled_by: z.string().default("admin"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { relay_ids, state, controlled_by } = bulkSchema.parse(body);

    for (const relayId of relay_ids) {
      publishRelayCommand(relayId, state, controlled_by);
      await updateRelayState(relayId, state, controlled_by);
    }

    return NextResponse.json({
      status: "ok",
      affected: relay_ids.length,
      relay_ids,
      state,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Bulk toggle failed",
      },
      { status: 500 }
    );
  }
}
