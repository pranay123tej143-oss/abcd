import { db } from "./index";
import { teams, members, attendanceLogs, relayStates } from "./schema";
import { eq, desc } from "drizzle-orm";

export async function findMemberByRfid(rfidUid: string) {
  const result = await db
    .select()
    .from(members)
    .where(eq(members.rfidUid, rfidUid))
    .limit(1);
  return result[0] || null;
}

export async function getTeamById(teamId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.teamId, teamId))
    .limit(1);
  return result[0] || null;
}

export async function getActiveTeams() {
  return await db.select().from(teams).where(eq(teams.active, true));
}

export async function getAllRelayStates() {
  return await db.select().from(relayStates).orderBy(relayStates.relayId);
}

export async function updateRelayState(
  relayId: number,
  state: boolean,
  controlledBy: string
) {
  return await db
    .update(relayStates)
    .set({ state, controlledBy, lastUpdated: new Date() })
    .where(eq(relayStates.relayId, relayId))
    .returning();
}

export async function setTeamActive(teamId: string, active: boolean) {
  return await db
    .update(teams)
    .set({ active, lastScan: new Date() })
    .where(eq(teams.teamId, teamId))
    .returning();
}

export async function logAttendance(
  teamId: string,
  memberId: number,
  rfidUid: string,
  scanType: "check-in" | "check-out",
  relaySnapshot: string
) {
  return await db
    .insert(attendanceLogs)
    .values({ teamId, memberId, rfidUid, scanType, relaySnapshot })
    .returning();
}

export async function getRecentAttendance(limit: number = 10) {
  return await db
    .select({
      id: attendanceLogs.id,
      teamId: attendanceLogs.teamId,
      memberName: members.name,
      rfidUid: attendanceLogs.rfidUid,
      scanTime: attendanceLogs.scanTime,
      scanType: attendanceLogs.scanType,
    })
    .from(attendanceLogs)
    .leftJoin(members, eq(attendanceLogs.memberId, members.id))
    .orderBy(desc(attendanceLogs.scanTime))
    .limit(limit);
}
