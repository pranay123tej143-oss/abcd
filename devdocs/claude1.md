# 📁 **Complete App Router & File Structure**

I'll generate the **entire Next.js App Router structure** with all necessary files.

---

## 🗂️ **Full Directory Tree**

```
smart-lab/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   │   ├── teams/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── members/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── controls/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   ├── [teamId]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   ├── rfid/
│   │   │   │   ├── scan/
│   │   │   │   │   └── route.ts
│   │   │   │   └── verify/
│   │   │   │       └── route.ts
│   │   │   ├── relay/
│   │   │   │   ├── toggle/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── state/
│   │   │   │   │   └── route.ts
│   │   │   │   └── bulk/
│   │   │   │       └── route.ts
│   │   │   ├── teams/
│   │   │   │   ├── route.ts
│   │   │   │   ├── [teamId]/
│   │   │   │   │   └── route.ts
│   │   │   │   └── active/
│   │   │   │       └── route.ts
│   │   │   ├── attendance/
│   │   │   │   ├── logs/
│   │   │   │   │   └── route.ts
│   │   │   │   └── stats/
│   │   │   │       └── route.ts
│   │   │   ├── mqtt/
│   │   │   │   └── init/
│   │   │   │       └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── dashboard/
│   │   ├── admin/
│   │   └── layout/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── store/
├── public/
├── drizzle/
└── package.json
```

---

## 📄 **Root Layout**

### `src/app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Lab - RFID Access Control",
  description: "Team-based lab resource management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

### `src/app/page.tsx`

```typescript
import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to dashboard
  redirect("/dashboard");
}
```

---

### `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

---

## 🔐 **Auth Route Group**

### `src/app/(auth)/layout.tsx`

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
```

---

### `src/app/(auth)/login/page.tsx`

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Implement actual authentication
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Smart Lab
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          RFID Access Control System
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="admin@lab.edu"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
```

---

## 📊 **Dashboard Route Group**

### `src/app/(dashboard)/layout.tsx`

```typescript
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="lg:pl-64">
        <Header />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

---

### `src/app/(dashboard)/page.tsx`

```typescript
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ActiveTeams } from "@/components/dashboard/active-teams";
import { RelayGrid } from "@/components/dashboard/relay-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time lab monitoring and control
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveTeams />
        <RelayGrid />
      </div>

      <RecentActivity />
    </div>
  );
}
```

---

### `src/app/(dashboard)/admin/page.tsx`

```typescript
import Link from "next/link";
import { Users, Shield, ToggleLeft } from "lucide-react";

export default function AdminPage() {
  const adminSections = [
    {
      title: "Team Management",
      description: "Create, edit, and manage teams",
      href: "/admin/teams",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Member Management",
      description: "Add members and assign RFID cards",
      href: "/admin/members",
      icon: Shield,
      color: "bg-green-500",
    },
    {
      title: "Relay Controls",
      description: "Manual relay control and monitoring",
      href: "/admin/controls",
      icon: ToggleLeft,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          System administration and configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div
              className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
            >
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {section.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

---

### `src/app/(dashboard)/admin/teams/page.tsx`

```typescript
import { TeamManager } from "@/components/admin/team-manager";

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Team Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure teams and resource assignments
        </p>
      </div>

      <TeamManager />
    </div>
  );
}
```

---

### `src/app/(dashboard)/admin/members/page.tsx`

```typescript
import { MemberList } from "@/components/admin/member-list";

export default function MembersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Member Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Add members and assign RFID cards
        </p>
      </div>

      <MemberList />
    </div>
  );
}
```

---

### `src/app/(dashboard)/admin/controls/page.tsx`

```typescript
import { RelayControls } from "@/components/admin/relay-controls";
import { BulkActions } from "@/components/admin/bulk-actions";

export default function ControlsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Relay Controls
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manual control of all relays
        </p>
      </div>

      <BulkActions />
      <RelayControls />
    </div>
  );
}
```

---

### `src/app/(dashboard)/team/page.tsx`

```typescript
import { getActiveTeams } from "@/lib/db/queries";
import Link from "next/link";

export default async function TeamsPage() {
  const teams = await getActiveTeams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Teams
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          View all teams and their status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <Link
            key={team.teamId}
            href={`/team/${team.teamId}`}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {team.teamName}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  team.active
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {team.active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>Fan: #{team.assignedFan}</p>
              <p>Light: #{team.assignedLight}</p>
              {team.lastScan && (
                <p className="text-xs">
                  Last scan: {new Date(team.lastScan).toLocaleString()}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

---

### `src/app/(dashboard)/team/[teamId]/page.tsx`

```typescript
import { getTeamById } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import { TeamStatus } from "@/components/dashboard/team-status";

export default async function TeamDetailPage({
  params,
}: {
  params: { teamId: string };
}) {
  const team = await getTeamById(params.teamId);

  if (!team) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {team.teamName}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Team ID: {team.teamId}
        </p>
      </div>

      <TeamStatus team={team} />
    </div>
  );
}
```

---

## 🔌 **API Routes**

### `src/app/api/health/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Test database connection
    await db.query.teams.findMany({ limit: 1 });

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/mqtt/init/route.ts`

```typescript
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
```

---

### `src/app/api/relay/state/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getAllRelayStates } from "@/lib/db/queries";

export async function GET() {
  try {
    const relays = await getAllRelayStates();

    return NextResponse.json({
      status: "ok",
      relays,
      stats: {
        total: relays.length,
        on: relays.filter((r) => r.state).length,
        off: relays.filter((r) => !r.state).length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch relay states",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/relay/toggle/route.ts`

```typescript
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
```

---

### `src/app/api/relay/bulk/route.ts`

```typescript
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
```

---

### `src/app/api/teams/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { teams } from "@/lib/db/schema";

export async function GET() {
  try {
    const allTeams = await db.select().from(teams);

    return NextResponse.json({
      status: "ok",
      teams: allTeams,
      count: allTeams.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch teams",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/teams/active/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getActiveTeams } from "@/lib/db/queries";

export async function GET() {
  try {
    const activeTeams = await getActiveTeams();

    return NextResponse.json({
      status: "ok",
      teams: activeTeams,
      count: activeTeams.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch active teams",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/teams/[teamId]/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getTeamById } from "@/lib/db/queries";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  try {
    const team = await getTeamById(params.teamId);

    if (!team) {
      return NextResponse.json(
        {
          status: "error",
          message: "Team not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "ok",
      team,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch team",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/attendance/logs/route.ts`

```typescript
import { NextResponse } from "next/server";
import { getRecentAttendance } from "@/lib/db/queries";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");

    const logs = await getRecentAttendance(limit);

    return NextResponse.json({
      status: "ok",
      logs,
      count: logs.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch attendance logs",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/attendance/stats/route.ts`

```typescript
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { attendanceLogs, teams } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get stats for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await db
      .select({
        teamId: attendanceLogs.teamId,
        teamName: teams.teamName,
        checkIns: sql<number>`COUNT(CASE WHEN ${attendanceLogs.scanType} = 'check-in' THEN 1 END)`,
        checkOuts: sql<number>`COUNT(CASE WHEN ${attendanceLogs.scanType} = 'check-out' THEN 1 END)`,
      })
      .from(attendanceLogs)
      .leftJoin(teams, eq(attendanceLogs.teamId, teams.teamId))
      .where(sql`${attendanceLogs.scanTime} >= ${today}`)
      .groupBy(attendanceLogs.teamId, teams.teamName);

    return NextResponse.json({
      status: "ok",
      stats,
      date: today.toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to fetch attendance stats",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
```

---

### `src/app/api/rfid/scan/route.ts`

```typescript
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
```

---

### `src/app/api/rfid/verify/route.ts`

```typescript
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
```
