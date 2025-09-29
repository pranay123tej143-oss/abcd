import { NextResponse } from "next/server";
import { z } from "zod";
import { handleRfidScan } from "@/lib/mqtt/handlers";

const scanSchema = z.object({
  rfid_uid: z.string().min(8).max(20),
  timestamp: z.number(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = scanSchema.parse(body);

    // Process RFID scan
    await handleRfidScan(data);

    return NextResponse.json({
      status: "ok",
      message: "Scan processed",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Invalid scan data",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to process scan",
      },
      { status: 500 }
    );
  }
}
