import {
  pgTable,
  serial,
  varchar,
  timestamp,
  boolean,
  integer,
  text,
} from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  teamId: varchar("team_id", { length: 10 }).unique().notNull(),
  teamName: varchar("team_name", { length: 100 }).notNull(),
  assignedFan: integer("assigned_fan").notNull(), // 1-4
  assignedLight: integer("assigned_light").notNull(), // 1-4
  active: boolean("active").default(false),
  lastScan: timestamp("last_scan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  teamId: varchar("team_id", { length: 10 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  rfidUid: varchar("rfid_uid", { length: 20 }).unique(),
  role: varchar("role", { length: 20 }).default("member"), // member | admin
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const attendanceLogs = pgTable("attendance_logs", {
  id: serial("id").primaryKey(),
  teamId: varchar("team_id", { length: 10 }).notNull(),
  memberId: integer("member_id").notNull(),
  rfidUid: varchar("rfid_uid", { length: 20 }).notNull(),
  scanTime: timestamp("scan_time").defaultNow(),
  scanType: varchar("scan_type", { length: 10 }).notNull(), // check-in | check-out
  relaySnapshot: text("relay_snapshot"), // JSON of relay states
});

export const relayStates = pgTable("relay_states", {
  id: serial("id").primaryKey(),
  relayId: integer("relay_id").notNull().unique(), // 1-8
  deviceType: varchar("device_type", { length: 10 }).notNull(), // fan | light
  deviceNumber: integer("device_number").notNull(), // 1-4
  state: boolean("state").default(false),
  controlledBy: varchar("controlled_by", { length: 50 }), // team_id | admin | manual
  lastUpdated: timestamp("last_updated").defaultNow(),
});
