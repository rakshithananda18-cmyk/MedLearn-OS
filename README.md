# MedLearn OS

The daily learning system for MBBS students. Phase 1 is an installable web app (Next.js + Supabase).

Product and design decisions live in `docs/`:

- `MedLearn_OS_Product_Blueprint_v0_2.docx`: what we are building and why
- `MedLearn_OS_Visual_UX_UI_Engineering_Plan_v0_1.docx`: how it looks and how it is built

## Quick start on Windows

Double-click **`startapp.bat`**. It:

1. Checks for **Node.js 24+** and **Docker Desktop** and offers to install them with `winget` if missing
   (these need administrator approval; afterwards close the window and run it again).
2. Sets up pnpm, installs the project packages, and on first run creates the local database, env
   files and test browser (`pnpm bootstrap`).
3. Starts Docker, the local database and the web app, and opens http://localhost:3000.

Press **Ctrl+C** in its window to stop everything it started; when Windows asks
"Terminate batch job (Y/N)?", answer **Y**.

## Prerequisites (manual setup, any OS)

- Node.js 24 LTS
- pnpm, through Corepack: `corepack enable pnpm`
- Docker Desktop, for the local Supabase stack (start it from the Start menu)

## Setup

```bash
pnpm install
pnpm bootstrap
pnpm start
```

`pnpm start` is the everyday command: it starts Docker Desktop if needed, the local database and the
web app, then opens the browser. Ctrl+C stops the web app and the database it started (data is kept).

`pnpm bootstrap` (once, or to reset local data) starts local Supabase, writes `apps/web/.env.local` and
`.env.test.local`, rebuilds the database from migrations and seed data, and installs the Playwright
browser. Re-running it resets local data only.

## Commands

| Command                        | What it does                                                      |
| ------------------------------ | ----------------------------------------------------------------- |
| `pnpm start`                   | Database, web app and browser; Ctrl+C stops everything it started |
| `pnpm dev`                     | Web app only, on http://localhost:3000                            |
| `pnpm test`                    | Unit and component tests                                          |
| `pnpm test:integration`        | API and repository tests against the local database               |
| `pnpm test:db`                 | pgTAP tests for tables, constraints and access rules              |
| `pnpm test:e2e`                | Playwright tests on phone and desktop viewports                   |
| `pnpm test:all`                | Everything above                                                  |
| `pnpm test:coverage`           | All Vitest layers with coverage thresholds (needs DB)             |
| `pnpm lint` / `pnpm typecheck` | ESLint (including the no-emoji rule) and TypeScript               |
| `pnpm db:reset`                | Rebuild the local database from migrations and seed               |
| `pnpm db:types`                | Regenerate `packages/db/src/database.types.ts`                    |

## Structure

| Path                  | Contents                                                         |
| --------------------- | ---------------------------------------------------------------- |
| `apps/web`            | Next.js app: routes, pages, server helpers                       |
| `packages/ui`         | Shared, accessible UI components                                 |
| `packages/core`       | Domain logic and the `AppError` type                             |
| `packages/schemas`    | Zod schemas and types shared by frontend and backend             |
| `packages/db`         | Supabase client and repositories (the only place with queries)   |
| `packages/logger`     | Structured logger for server and browser, with redaction         |
| `packages/config`     | Shared TypeScript and ESLint config, including the no-emoji rule |
| `packages/test-utils` | Test setup, factories and accessibility helpers                  |
| `scripts`             | `bootstrap` and `start`, with shared helpers in `scripts/lib`    |
| `supabase`            | Migrations, seed data and database tests                         |
| `e2e`                 | Playwright end-to-end tests                                      |

## Conventions

- Every API route uses `withRoute` (`apps/web/src/server/route.ts`): request id, logging and the
  standard `{ data }` / `{ error }` response shapes.
- Log through the logger only; `console` is a lint error. Personal data is redacted automatically.
- Code used in two places moves into a package.
- No emojis anywhere; icons are outlined SVG.
- Commits follow Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`), checked on commit.
