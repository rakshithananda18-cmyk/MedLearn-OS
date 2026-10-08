---
name: engineering-standards
description: "MedLearn OS code must be robust and non-\"vibe-coded\" — local test setup, logger, front+back tests, modular reusable code, uniform UI, no emojis (outlined SVG icons only)"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 11ca84d6-430e-4f70-a405-87003df571ac
  modified: 2026-09-25T14:54:23.391Z
---

Build MedLearn OS to a professional standard:
- Runs and tests fully locally (local backend, seed data, one-command setup).
- A shared logger (structured, server + client), no stray console logs.
- Test cases for both frontend and backend (unit, component, integration, E2E).
- Modular: any snippet used in more than one place lives in a shared module/package; no copy-paste code.
- Uniform, clean frontend via a design system (tokens, shared components); backend equally consistent.
- No emojis anywhere in the product, docs or UI — use outlined SVG icons only.

**Why:** User said "lets make this robust... don't make this look like vibe coded and no emojies only svg outlined images".
**How to apply:** Every plan, scaffold and feature must include tests, logging and reuse; review output for emojis before delivering (also avoid emojis in chat replies). Related: [[medlearn-os-project]], [[plans-as-docx]]
