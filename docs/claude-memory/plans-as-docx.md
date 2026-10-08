---
name: plans-as-docx
description: "User wants plans/specs delivered as .docx, and new versions must add to the previous version rather than replace it"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 11ca84d6-430e-4f70-a405-87003df571ac
  modified: 2026-09-26T22:06:08.916Z
---

Deliver plans and product documents as .docx (matching the MedLearn OS blueprint style), not markdown. When making a new version (e.g. v0.1 → v0.2), keep all previous content and add to it; mark changes as tagged notes instead of deleting original text.

**Why:** User said "the plan should always be in docx" and asked to add a v2 "not completely taking off the plan v1".
**How to apply:** For any plan/spec in MedLearn OS, build a docx; version bumps are additive with "NEW vX" / "vX change" tags. Related: [[medlearn-os-project]]

**Reviews (27 Sep 2026):** when asked to review a plan against progress, make an exact copy saved with the date in the file name (e.g. `..._Review_2026-09-27.docx`), keep every original run unchanged, and put dated status notes ("REVIEW 27 SEP" + DONE/PARTLY/NOT STARTED/LATER/DOC ISSUE, lilac background) next to each plan item — inside table rows (widest cell) and after paragraphs — plus a summary near the top and findings/next steps at the end. The user wants to see "what was accomplished written next to the plan".
