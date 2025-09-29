# 🔄 **Fresh Start - RFID Smart Lab System**

Got it! Let me generate everything from scratch based on your architecture docs.

---

## 📦 **Project Initialization**

### **Step 1: Create Next.js Project**

```bash
npx create-next-app@latest smart-lab \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd smart-lab
```

### **Step 2: Install Dependencies**

```bash
# Database & ORM
npm install drizzle-orm @neondatabase/serverless
npm install drizzle-kit -D

# Validation & State
npm install zod zustand

# MQTT Communication
npm install mqtt
npm install @types/mqtt -D

# UI Components (shadcn/ui)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-slot @radix-ui/react-switch
npm install @radix-ui/react-tabs @radix-ui/react-toast
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install date-fns

# React Query for data fetching
npm install @tanstack/react-query
```

---

## 🗂️ **File Structure Setup**

Create these directories:

```bash
mkdir -p src/lib/{db,mqtt,auth}
mkdir -p src/hooks
mkdir -p src/types
mkdir -p src/store
mkdir -p src/components/{ui,dashboard,admin,layout}
mkdir -p src/app/{api,\(auth\),\(dashboard\)}
```

---

## ⚙️ **Configuration Files**

### **1. Environment Variables**

Create `.env.local`:

```bash
# Database (NeonDB)
DATABASE_URL="postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/smart_lab?sslmode=require"

# MQTT Broker (HiveMQ Cloud Free)
MQTT_BROKER_URL="mqtts://your-instance.s2.eu.hivemq.cloud:8883"
MQTT_USERNAME="your_username"
MQTT_PASSWORD="your_password"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

Create `.env.example`:

```bash
DATABASE_URL="postgresql://..."
MQTT_BROKER_URL="mqtts://..."
MQTT_USERNAME=""
MQTT_PASSWORD=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

### **2. Drizzle Config**

Create `drizzle.config.ts`:

```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;
```

---

### **3. TypeScript Config**

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### **4. Next.js Config**

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.externals.push({
      mqtt: "commonjs mqtt",
    });
    return config;
  },
};

module.exports = nextConfig;
```

---

## 🗄️ **Database Schema**

Create `src/lib/db/schema.ts`:

```typescript
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
```

---

Create `src/lib/db/index.ts`:

```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
```

---

Create `src/lib/db/queries.ts`:

```typescript
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
```

---

### **Generate Migration**

```bash
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

---

## 🔌 **MQTT Integration**

Create `src/lib/mqtt/client.ts`:

```typescript
import mqtt from "mqtt";
import { handleRfidScan, handleRelayStateUpdate } from "./handlers";

let client: mqtt.MqttClient | null = null;

export function getMqttClient() {
  if (client?.connected) return client;

  const options: mqtt.IClientOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: `smart-lab-${Math.random().toString(16).slice(2, 8)}`,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30000,
  };

  client = mqtt.connect(process.env.MQTT_BROKER_URL!, options);

  client.on("connect", () => {
    console.log("✅ MQTT Connected");
    client?.subscribe("lab/rfid/scan", { qos: 1 });
    client?.subscribe("lab/relay/state", { qos: 1 });
  });

  client.on("message", async (topic, payload) => {
    try {
      const data = JSON.parse(payload.toString());

      if (topic === "lab/rfid/scan") {
        await handleRfidScan(data);
      } else if (topic === "lab/relay/state") {
        await handleRelayStateUpdate(data);
      }
    } catch (error) {
      console.error("❌ MQTT message error:", error);
    }
  });

  client.on("error", (error) => {
    console.error("❌ MQTT error:", error);
  });

  return client;
}

export function publishRelayCommand(
  relayId: number,
  state: boolean,
  controlledBy: string
) {
  const client = getMqttClient();

  if (!client?.connected) {
    console.error("❌ MQTT not connected");
    return;
  }

  const message = {
    relay_id: relayId,
    state,
    timestamp: Date.now(),
    controlled_by: controlledBy,
  };

  client.publish("lab/relay/command", JSON.stringify(message), { qos: 1 });
  console.log(`📡 Relay command: ${relayId} → ${state ? "ON" : "OFF"}`);
}
```

---

Create `src/lib/mqtt/handlers.ts`:

```typescript
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
```

---

**Next up:** Would you like me to generate:

1. **API Routes** (relay control, team management)?
2. **Dashboard Components** (relay grid, active teams)?
3. **ESP32 Code** (RFID + Relay with MQTT)?
4. **Seed Script** (populate database with test teams)?

Pick one and I'll generate it! 🚀
