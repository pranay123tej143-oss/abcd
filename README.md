# Smart Lab – RFID Access Control & IoT Dashboard

A full-stack **Next.js App Router** project for team-based lab resource management, real-time relay control, and RFID access logging.  
Built with **NeonDB, Drizzle ORM, MQTT, shadcn/ui, and React Query**.

---

## 🚀 Features

- RFID-based access control for lab members
- Real-time relay control (fans, lights) via MQTT
- Team management (create, assign, monitor teams)
- Attendance logging and stats
- Admin dashboard for bulk actions and monitoring
- Dark/light theme with system preference
- Modular App Router structure for easy scaling

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router, TypeScript, Tailwind)
- **NeonDB** (PostgreSQL serverless)
- **Drizzle ORM**
- **MQTT** (HiveMQ Cloud Free)
- **shadcn/ui, Radix UI, Lucide Icons**
- **React Query, Zustand, Zod**

---

## 📂 Project Structure

```
└── 📁src
    └── 📁app
        └── 📁(auth)
            └── 📁login
                ├── page.tsx
            ├── layout.tsx
        └── 📁api
            └── 📁attendance
                └── 📁logs
                    ├── route.ts
                └── 📁stats
                    ├── route.ts
            └── 📁health
                ├── route.ts
            └── 📁mqtt
                └── 📁init
                    ├── route.ts
            └── 📁relay
                └── 📁bulk
                    ├── route.ts
                └── 📁state
                    ├── route.ts
                └── 📁toggle
                    ├── route.ts
            └── 📁rfid
                └── 📁scan
                    ├── route.ts
                └── 📁verify
                    ├── route.ts
            └── 📁teams
                └── 📁[teamId]
                    ├── route.ts
                └── 📁active
                    ├── route.ts
                ├── route.ts
        └── 📁dashboard
            └── 📁admin
                └── 📁controls
                    ├── page.tsx
                └── 📁members
                    ├── page.tsx
                └── 📁teams
                    ├── page.tsx
                ├── page.tsx
            └── 📁team
                └── 📁[teamId]
                    ├── page.tsx
                ├── page.tsx
            ├── layout.tsx
            ├── page.tsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
    └── 📁components
        └── 📁admin
            ├── bulk-actions.tsx
            ├── relay-controls.tsx
        └── 📁dashboard
            ├── active-teams.tsx
            ├── recent-activity.tsx
            ├── relay-grid.tsx
            ├── stats-cards.tsx
            ├── team-status.tsx
        └── 📁layout
            ├── header.tsx
            ├── sidebar.tsx
        └── 📁ui
        ├── providers.tsx
        ├── theme-provider.tsx
    └── 📁hooks
    └── 📁lib
        └── 📁auth
        └── 📁db
            ├── index.ts
            ├── queries.ts
            ├── schema.ts
        └── 📁mqtt
            ├── client.ts
            ├── handlers.ts
    └── 📁store
    └── types
```

---

## ⚡ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your **NeonDB** and **MQTT** credentials.

### 3. Create database tables

Use the SQL in `schema.ts` to create tables in NeonDB.

### 4. (Optional) Seed the database

```bash
npx tsx seed.ts
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Devdocs

See the `devdocs/` folder for:

- Full file structure
- Component breakdowns
- Setup and architecture notes

---

## 📄 License

**MIT**
