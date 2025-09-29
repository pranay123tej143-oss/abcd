import { NextResponse } from "next/server";
import { z } from "zod";
import { findMemberByRfid } from "@/lib/db/queries";

const verifySchema = z.object({
  rfid_uid: z.string().min(8).max(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rfid_uid } = verifySchema.parse(body);

    const member = await findMemberByRfid(rfid_uid);

    if (!member) {
      return NextResponse.json(
        {
          status: "error",
          message: "RFID not registered",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "ok",
      member: {
        id: member.id,
        name: member.name,
        teamId: member.teamId,
        role: member.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}
