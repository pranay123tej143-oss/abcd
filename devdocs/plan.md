# Modules

## RFID rc522

- generates & processes:
  - Auth token
  - Auth slug

## RFID tag

- contains:
  - teamId
  - teamName
- access db data:
  - members (emails, auth tokens, auth slug) // verification
  - attendance
  - other storage (media, files, urls, etc.)

## Relay module

- informing & updating:
  - switch state update
  - toggle (via app or manual)
  - auto on (after scan, respective team-assigned fans/lights)

# Constraints

- 4 fans
- 4 lights
- 8 relays
- 4 teams (16–20 members)
- 1 admin

# Flow

User
-> Card tap (RFID tag)
-> ESP32 Devkit 1 (RFID rc522)
-> App (Next.js serverless)
-> ESP32 Devkit 2
-> Relay module 1 (through app / manual)
-> Switches (fan, light)

# Rules

- user -> controls respective fan/light
- admin -> controls all fans/lights
