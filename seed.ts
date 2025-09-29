// seed.ts
// Run this script with: npx tsx seed.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  teams,
  members,
  relayStates,
  attendanceLogs,
} from "./src/lib/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  // Teams
  await db.insert(teams).values([
    {
      teamId: "T1",
      teamName: "Alpha Team",
      assignedFan: 1,
      assignedLight: 1,
      active: true,
    },
    {
      teamId: "T2",
      teamName: "Beta Team",
      assignedFan: 2,
      assignedLight: 2,
      active: false,
    },
  ]);

  // Members
  await db.insert(members).values([
    {
      teamId: "T1",
      email: "alpha1@example.com",
      name: "Alice",
      rfidUid: "RFID123",
      role: "member",
      active: true,
    },
    {
      teamId: "T2",
      email: "beta1@example.com",
      name: "Bob",
      rfidUid: "RFID456",
      role: "admin",
      active: true,
    },
  ]);

  // Relay States
  await db.insert(relayStates).values([
    {
      relayId: 1,
      deviceType: "fan",
      deviceNumber: 1,
      state: true,
      controlledBy: "T1",
    },
    {
      relayId: 2,
      deviceType: "light",
      deviceNumber: 1,
      state: false,
      controlledBy: "T2",
    },
  ]);

  // Attendance Logs
  await db.insert(attendanceLogs).values([
    { teamId: "T1", memberId: 1, rfidUid: "RFID123", scanType: "check-in" },
    { teamId: "T2", memberId: 2, rfidUid: "RFID456", scanType: "check-out" },
  ]);

  console.log("✅ Seed data inserted!");
}

seed().catch((err) => {
  console.error("❌ Seed error:", err);
  process.exit(1);
});
