# revamping first website
This is a full-stack personal website built to demonstrate production-grade frontend and backend patterns: schema-first APIs, async data aggregation, feature flags, versioned content, and i18n-aware rendering.
yaritzaperez.tech

# Yaritza Perez — Personal Portfolio

yaritzaperez.tech

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Service Layer, Typed Data Models
- **Testing:** Jest, ts-jest
- **Deployment:** Vercel

## Architecture
```
Next.js UI
  → API Routes (gateway layer)
    → Service Layer (business logic)
      → Data Layer (typed models)
```

## Features

- Work highlights and skills fetched from API routes
- Payment retry simulator with failure handling
- International currency formatter (en-US, de-DE, ja-JP, en-GB, pt-BR)
- Contact page
- Jest integration tests for API routes

## Planned: Java Backend Migration

The Next.js API layer is designed to act as a gateway to a Java Spring Boot microservice.
The TypeScript service layer will be replaced by a Spring Boot backend, demonstrating
a production-style polyglot architecture.
```
Next.js (gateway) → Java Spring Boot (business logic)
```

This mirrors real-world systems used at companies like Stripe, Block, and Adyen.

## Running Locally
```bash
npm install
npm run dev
```

## Running Tests
```bash
npm test
```