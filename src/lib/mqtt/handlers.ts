import {
  findMemberByRfid,
  getTeamById,
  setTeamActive,
  logAttendance,
  getAllRelayStates,
  updateRelayState,
} from "@/lib/db/queries";
import { publishRelayCommand } from "./client";

export async function handleRfidScan(data: {
  rfid_uid: string;
  timestamp: number;
}) {
  console.log("📇 RFID scan:", data.rfid_uid);

  const member = await findMemberByRfid(data.rfid_uid);
  if (!member) {
    console.log("❌ Unknown RFID:", data.rfid_uid);
    return;
  }

  const team = await getTeamById(member.teamId);
  if (!team) {
    console.log("❌ Team not found:", member.teamId);
    return;
  }

  console.log(`✅ ${member.name} (${team.teamName})`);

  // Calculate relay IDs
  const fanRelayId = team.assignedFan; // 1-4
  const lightRelayId = team.assignedLight + 4; // 5-8

  // Toggle team state
  const newState = !team.active;
  await setTeamActive(team.teamId, newState);

  if (newState) {
    console.log(`🟢 ${team.teamName} CHECK-IN`);
    publishRelayCommand(fanRelayId, true, team.teamId);
    publishRelayCommand(lightRelayId, true, team.teamId);

    await updateRelayState(fanRelayId, true, team.teamId);
    await updateRelayState(lightRelayId, true, team.teamId);
  } else {
    console.log(`🔴 ${team.teamName} CHECK-OUT`);
    publishRelayCommand(fanRelayId, false, team.teamId);
    publishRelayCommand(lightRelayId, false, team.teamId);

    await updateRelayState(fanRelayId, false, "system");
    await updateRelayState(lightRelayId, false, "system");
  }

  // Log attendance
  const relayStates = await getAllRelayStates();
  await logAttendance(
    team.teamId,
    member.id,
    data.rfid_uid,
    newState ? "check-in" : "check-out",
    JSON.stringify(relayStates)
  );
}

export async function handleRelayStateUpdate(data: {
  relay_id: number;
  state: boolean;
  source: "manual" | "app";
}) {
  console.log(`🔌 Relay ${data.relay_id} → ${data.state} (${data.source})`);

  if (data.source === "manual") {
    await updateRelayState(data.relay_id, data.state, "manual");
  }
}
