# MedLearn OS

The daily learning system for MBBS students. Phase 1 is an installable web app (Next.js + Supabase).

The current private prototype (for a study group of about five) has 31 sample topics: the whole
Upper Limb in three batches, plus the oxygen–haemoglobin curve. The content is written from the
standard textbooks and is still marked as not medically reviewed.

## What is in the app

| Area      | What it does                                                                                                                                                   |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Today     | One plan for the day: lessons, practice, recall, spaced revisits of learnt topics, class-test goals and exam phases                                            |
| Library   | Subjects as a tree of regions, book sections and topics, with progress, live search and suggestions, and the books the student follows                         |
| Topic     | Where to read in each book, a lecture video with timed notes, the lesson, drills and the topic's 3D model                                                      |
| 3D studio | One 3D body with seven systems as layers, tap any structure for its name and topics, topic models, guided tours read aloud, X-ray films, drawing and "Find it" |
| Practice  | Quick mix, weak spots, timed tests, strengths by book section, and planned class tests and revisits                                                            |
| Revise    | Spaced-recall cards (FSRS)                                                                                                                                     |
| Account   | Progress is kept on the phone, and saved to the account for adults, merged safely across devices                                                               |

Product and design decisions live in `docs/` (each version adds to the one before):

- [Product Blueprint v0.7](docs/MedLearn_OS_Product_Blueprint_v0_7.docx): product scope, the 3D plan (Complete Anatomy as the bar) and the AI and agent plan
- [Visual, UX/UI & Engineering Plan v0.6](docs/MedLearn_OS_Visual_UX_UI_Engineering_Plan_v0_6.docx): design, architecture and quality requirements
- [Codex alignment review](docs/CODEX_ALIGNMENT_REVIEW.md): implemented capabilities, reliability work and remaining plan gaps

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

| Command                        | What it does                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `pnpm start`                   | Database, web app and browser; Ctrl+C stops everything it started                              |
| `pnpm start --prod`            | Production build served to phones on the same Wi-Fi (usability sessions; also `usability.bat`) |
| `pnpm dev`                     | Web app only, on http://localhost:3000                                                         |
| `pnpm test`                    | Unit and component tests                                                                       |
| `pnpm test:integration`        | API and repository tests against the local database                                            |
| `pnpm test:db`                 | pgTAP tests for tables, constraints and access rules                                           |
| `pnpm test:e2e`                | Playwright tests on phone, tablet and desktop viewports                                        |
| `pnpm test:all`                | Everything above                                                                               |
| `pnpm test:coverage`           | All Vitest layers with coverage thresholds (needs DB)                                          |
| `pnpm lint` / `pnpm typecheck` | ESLint (including the no-emoji rule) and TypeScript                                            |
| `pnpm db:reset`                | Rebuild the local database from migrations and seed                                            |
| `pnpm db:types`                | Regenerate `packages/db/src/database.types.ts`                                                 |

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
| `packages/visuals`    | The 3D viewer (React Three Fiber) and the flat diagrams          |
| `scripts`             | `bootstrap` and `start`, with shared helpers in `scripts/lib`    |
| `scripts/models`      | Builds the 3D models, X-ray films and topic posters              |
| `supabase`            | Migrations, seed data and database tests                         |
| `e2e`                 | Playwright end-to-end tests                                      |
| `books`               | The group's textbook PDFs; stay on this computer (git-ignored)   |
| `models-src`          | Source 3D models and images; stay on this computer (git-ignored) |

## 3D models and images

MedLearn OS is a paid product, so it uses only assets whose licence allows commercial use
(CC0, CC BY, CC BY-SA), each credited on screen. Non-commercial sources such as Radiopaedia are
not used. The originals stay in `models-src/` (not committed); only the built, compressed files in
`apps/web/public/` are.

| Asset                              | Source and licence                                                                      | Build                                                                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Whole body: seven system layers    | BodyParts3D 4.0, The Database Center for Life Science, CC BY 4.0 (some CC BY-SA 2.1 JP) | `node scripts/models/build-body-systems.mjs models-src/bodyparts3d/isa_BP3D_4.0_obj_99 models-src/bodyparts3d/isa_element_parts.txt` |
| Upper limb and body surface models | BodyParts3D, as above                                                                   | `node scripts/models/build-models.mjs <OBJ folder> <isa_element_parts.txt>`                                                          |
| X-ray films                        | "X-ray of normal …" series by Mikael Häggström on Wikimedia Commons, CC0                | `node scripts/models/build-xrays.mjs` (originals in `models-src/xrays`)                                                              |
| Topic posters                      | Rendered from the app's own 3D models                                                   | Start the app, then `node scripts/models/render-posters.mjs`                                                                         |

### Female body (in progress)

No open female body of BodyParts3D quality exists, so it is being built from CC BY models on
Sketchfab. Downloading needs a free Sketchfab account (sign up at https://sketchfab.com). On each
model page choose **Download 3D Model**, then **GLB** (or glTF), and save it into
`models-src/female/` under the name given:

| Model                                                | Page                                                             | Save as                   |
| ---------------------------------------------------- | ---------------------------------------------------------------- | ------------------------- |
| Human Female Skeleton, GW Anthropology Laboratories  | https://sketchfab.com/3d-models/3607576e0a7f422a802663ae358b7951 | `skeleton.glb`            |
| Female Reproductive System, Stanford Medicine EdTech | https://sketchfab.com/3d-models/c4d5e725198d4a1997c641d548bb20ce | `reproductive.glb`        |
| Bony Pelvis and Pelvic Organs from MRI, audreybyrd   | https://sketchfab.com/3d-models/ad38f2971a054b4db2cd05e3efce9c59 | `pelvis.glb`              |
| Human Female Breast Anatomy, Anatomy by Doctor Jana  | https://sketchfab.com/3d-models/e521ddef44924d67a612d41764779505 | `breast.glb`              |
| Female Reproductive Organs (whole), CVallance        | https://sketchfab.com/3d-models/a7638a209026490fa3c8a3f9eecafcf9 | `reproductive-organs.glb` |

All five were checked as CC BY and downloadable on 1 October 2026.

## Conventions

- Every API route uses `withRoute` (`apps/web/src/server/route.ts`): request id, logging and the
  standard `{ data }` / `{ error }` response shapes.
- Log through the logger only; `console` is a lint error. Personal data is redacted automatically.
- Code used in two places moves into a package.
- No emojis anywhere; icons are outlined SVG.
- Commits follow Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`), checked on commit.
