# revamping first website
This is a full-stack personal website built to demonstrate production-grade frontend and backend patterns: schema-first APIs, async data aggregation, feature flags, versioned content, and i18n-aware rendering.
yaritzaperez.tech

# Yaritza Perez — Personal Portfolio

yaritzaperez.tech

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes (gateway), Java Spring Boot (business logic)
- **Testing:** Jest, ts-jest
- **Deployment:** Vercel (Next.js), Railway (Java service — coming soon)

## Architecture
```
Browser
  → Next.js (frontend + API gateway) — Vercel
    → Java Spring Boot (business logic) — Railway (coming soon)
```

## Features

- Work highlights and skills fetched from API routes
- Payment retry simulator with failure handling
- International currency formatter (en-US, de-DE, ja-JP, en-GB, pt-BR)
- Contact page
- Jest integration tests for API routes

## Running Locally

You need both services running simultaneously.

**Next.js:**
```bash
npm install
npm run dev
```

**Java Spring Boot (in a separate terminal):**
```bash
cd ../payments-service-demo
mvn spring-boot:run
```

Then visit `http://localhost:3000`

## Running Tests
```bash
npm test
```

## Planned

- Deploy Java service to Railway
- Add projects page
- Engineering writeups page