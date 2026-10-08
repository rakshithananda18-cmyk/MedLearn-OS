---
name: medlearn-os-project
description: "MedLearn OS — daily MBBS learning app for Indian students; small founding team; blueprint v0.1 docx in user's Downloads"
metadata:
  node_type: memory
  type: project
  originSessionId: 11ca84d6-430e-4f70-a405-87003df571ac
  modified: 2026-10-08T17:28:01.730Z
---

MedLearn OS: a visual-first daily learning app for Indian MBBS students, starting with first-year Anatomy/Physiology/Biochemistry. Built by a small founding team (2–5 people, bootstrapped/pre-seed). Source blueprint: C:\Users\91957\Downloads\MedLearn_OS_Product_Blueprint_v0_1_FINAL.docx (dated 2026-09-25). Repo: github.com/rakshithananda18-cmyk/MedLearn-OS; project docs go in docs/.

**Why:** User sees fragmented, paid, exam-focused apps (Marrow etc.) and wants one daily-learning companion.
**How to apply:** Frame recommendations for a small team with limited budget; see [[plans-as-docx]]. Web first (Next.js PWA), native apps later. The repo is PUBLIC (checked 8 Oct 2026), although [[private-phase-book-content]] wanted it private; flag before publishing anything book-derived.

Handover (8 Oct 2026, user moving to another computer): code is all on GitHub; `models-src/` (open-licence sources, ~545 MB) is committed on the separate `source-assets` branch (the user pushes it themselves; restore with `git restore --source=origin/source-assets --worktree -- models-src`); textbook PDFs in `books/` stay out of git (copyrighted, public repo) and are copied by hand; these memory notes are copied into `docs/claude-memory/`.

Strategy since 2026-09-26 (Blueprint v0.3): resource-first — MedLearn originals plus licence-verified open resources plus linked external resources (YouTube link/embed only). Paid product, so only commercial-use licences go in the app; NonCommercial sources (OpenStax, MIT OCW) are link/reference only. Z-Anatomy has NC parts (audit per structure); BodyParts3D is CC BY 4.0 and is the 3D base. Re-check licences on the licence page before relying on them — earlier assumptions here were wrong twice.

Content status (29 Sep 2026): the whole Upper Limb of BD Chaurasia Vol 1 (Ch 3–12) is built as 30 topics in six batches (PRs #17, #18, #20, #21, #22 all merged; blueprint v0.6 in docs/). All topics are `reviewed: false` until a student peer-checks them. Next per blueprint v0.6: peer check, usability round 1, then BD Vol 1 Section 2 (Thorax). Page references: see [[book-page-offsets]]. UI round 2 (30 Sep 2026, PR #23, branch ui-tree-studio-settings): laptop density tokens, focused Today, library tree + preview, topic lecture room (YouTube embeds in content/videos.ts, time-marked notes), studio tree/folds, Practice hub, class-test/revisit goals in progress JSON (`goals`). Blueprint v0.7 plans revision, AI/agentic coach and the 3D atlas. The repo does not allow auto-merge; merge with `gh pr merge --squash` after all checks pass, only when the user has asked.
