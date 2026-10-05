# MedLearn OS alignment review

Reviewed on 29 September 2026 against Product Blueprint v0.5, Visual, UX/UI & Engineering Plan v0.6, source main at [`55a7806`](https://github.com/rakshithananda18-cmyk/MedLearn-OS/commit/55a7806), and the Upper Limb batch 3 branch at [`3db6439`](https://github.com/rakshithananda18-cmyk/MedLearn-OS/commit/3db6439).

The app has a working foundation for the planned private study group: a shared learning loop, visual lessons, questions, spaced recall, accounts, offline support, notes and textbook choices. It now has sixteen sample topics, a shared 3D studio, and the redesigned Today and progress screens. All sixteen topics remain marked as not medically reviewed. The third Upper Limb batch is incorporated from the separate Claude branch. The immediate Codex work strengthens continuity and protects saved progress; the knowledge map, reading guidance and reviewed content pipeline remain separate milestones.

## Planning sources

- [Product Blueprint v0.5](MedLearn_OS_Product_Blueprint_v0_5.docx): Sections 10, 11, 15, 23 and 29-34.
- [Engineering Plan v0.6](MedLearn_OS_Visual_UX_UI_Engineering_Plan_v0_6.docx): Sections 2, 10-18, 21B-21D and 25A.
- [Product review dated 27 September](MedLearn_OS_Product_Blueprint_v0_3_Review_2026-09-27.docx): useful historical gap analysis; v0.5 supersedes its audience and textbook-delivery scope.
- The agreed ChatGPT direction adds a permanent Medical Knowledge Map, separate college and exam study sequences, a primary textbook, guidance on how much to read, and a personalized "What Should I Read?" engine. These additions need explicit domain models; the DOCX does not yet specify their full behavior.

Older sections of the documents retain historical statuses and decisions. The latest marked changes take precedence. In particular, email/password accounts supersede phone-first signup, the private group precedes a college pilot, and the current hand-written service worker is an accepted interim implementation.

## What the latest blueprint changes

Blueprint v0.5 Section 34 adds a concrete textbook-to-topic pipeline:

- Map each local textbook once and follow the college's lecture and dissection order.
- Start with BD Chaurasia Volume 1, 8th edition, and Gray's Anatomy for Students, 4th edition.
- Write discrete topics with 5-8 interactive steps, 4-6 key facts, explained questions, recall/viva prompts and suitable visuals.
- Cross-reference both books through `readIn`; prefer the student's selected books and explain differences between sources.
- Deliver batches of 4-6 topics on dedicated branches. The first batch covers the pectoral region, axilla boundaries, axillary vessels, axillary lymph nodes and brachial plexus.
- Keep full textbooks local and excluded from Git. Original notes need source attribution and a way to identify and replace book-derived content.

The source baseline includes both anatomy editions and reading references for the first-batch Upper Limb topics; the second- and third-batch topics also include references. This review does not verify those page ranges against the books or treat their presence as medical approval.

## Source changes incorporated

The current Codex branch builds on these source changes, rather than replacing them:

- [Upper Limb batch, pull request 14](https://github.com/rakshithananda18-cmyk/MedLearn-OS/pull/14): pectoral region, axilla, axillary vessels and axillary lymph nodes join brachial plexus and the oxygen curve. The fixed topic order follows the anatomy chapters before physiology.
- [3D studio, pull request 15](https://github.com/rakshithananda18-cmyk/MedLearn-OS/pull/15): `/studio` provides body-region browsing, topic models, layers, guided views, drawings, a structure quiz and links to other topics showing a structure. Old topic 3D routes redirect to the studio.
- [Redesign phase 1, pull request 16](https://github.com/rakshithananda18-cmyk/MedLearn-OS/pull/16): Today has an up-next card, activity summaries, a daily ring, streaks and weekly activity; topic mastery and lesson/drill layouts share the redesigned components. The navigation features the 3D studio and the night theme has updated tokens.
- [Upper Limb batch 2, pull request 17](https://github.com/rakshithananda18-cmyk/MedLearn-OS/pull/17) adds back muscles, deltoid/rotator cuff, scapular spaces, front of arm and back of arm/radial nerve, along with the larger shared 3D model and regenerated posters. It is now part of main.
- [Upper Limb batch 3 branch](https://github.com/rakshithananda18-cmyk/MedLearn-OS/tree/upper-limb-batch-3) adds skin/veins/lymph, cubital fossa, forearm flexors, forearm vessels/nerves and carpal tunnel, together with expanded 3D structures and posters. Its published commit is integrated into this Codex branch for validation; the Claude branch remains separate.

These are implemented source features, not evidence of completed medical review, usability sessions or release validation. Daily minutes are estimates from completed activities, not measured active-study time.
## Alignment by capability

"Implemented" below means the capability exists in the inspected code. It does not imply a completed production release gate or a new passing test run.

| Capability | Status | Evidence and remaining work |
| --- | --- | --- |
| One app and shared engineering foundation | Implemented | `apps/web`, shared schemas/core/UI/visuals/database/logger packages, local Supabase and CI are present. Continue extending these parts. |
| Today, lessons, practice, recall and progress | Implemented, with continuity fixes in scope | The redesigned core loop includes daily activity, streaks, weekly summaries and topic mastery. Topic-specific links and capped recall sessions must preserve the context and workload promised by Today. |
| Private access and accounts | Implemented | Invite-list checks, email/password accounts, emailed codes, recovery and adult progress sync exist. Production configuration and invite-list operation still require deployment validation. |
| Offline and multiple-device progress | Partial | Opened pages cache and offline progress saves exist. Concurrent saves, merging, cancellation, sign-out and unavailable browser storage are the current reliability work. |
| Textbook catalogue and My books | Implemented starter catalogue | `apps/web/src/content/books.ts` includes BD Chaurasia 8th and Gray's 4th; profile stores multiple selected book IDs. There is no distinct primary-book preference per subject. |
| Where to read this | Partial | All fifteen Upper Limb topics have `readIn` references; oxygen curve has none. The UI prefers selected books, but there is no reading-depth choice, stopping rule or structured page-level evidence per answer. |
| Learning content | Upper Limb batches implemented as samples | `apps/web/src/content/topics.ts` registers fifteen Upper Limb anatomy topics and the oxygen curve. All sixteen remain `reviewed: false`. Content review and the complete production-topic gate remain open. |
| Permanent knowledge map and Connections | Partial foundation | Topic regions and the studio body browser organize anatomy; shared structure IDs expose other topics showing a structure. A persistent cross-subject concept graph, explicit relationship types and topic-hub Connections are still missing. |
| 3D and visual workspace | Implemented, with validation gaps | The studio unifies topic models, layer controls, drawing and structure quizzes, with a 2D fallback. It is not a complete reviewed whole-body anatomy library. Drawings and quiz best scores are stored on the device, separately from account progress. |
| College and exam sequences | Partial | Today changes its task mix near an exam and after missed days. New learning still uses one fixed topic array; there is no college timetable or separate sequence model. |
| Personalized reading recommendation | Missing | Existing Today scheduling and book preferences are useful inputs, but they do not yet produce a sourced reading prescription. |
| Content trust and feedback | Partial | Source drawer, content version, sample banner and report issue exist in the learning loop. The studio carries model credits but its lesson/clinical information does not yet expose the same source and report controls. A boolean review flag cannot represent reviewer identity, date, scope or decisions. |
| Provenance and publication workflow | Missing | Resource registry, rights evidence, draft/review/approved lifecycle, audit history and editor are still required by Blueprint Sections 11 and 30. |
| Full production topic package | Partial | Brachial plexus and the new anatomy topics connect lessons, practice, recall, diagram training and the shared 3D studio. Reviewed external video, viva/spotter and exam mapping, cross-subject Connections and complete review records remain open. |
| Usability and release validation | Open | The usability kit exists. No completed five-student session or real entry-level Android 3D validation is established by this review. |

## Current Codex implementation scope

The changes for this branch focus on completing the existing learning loop reliably:

1. Preserve the selected topic when moving from a topic or lesson into Practice and Revise, while keeping the full decks available through normal navigation.
2. Apply the Today review limit to a bounded recall session, so a student who returns after a gap does not see the entire overdue backlog after opening Revise.
3. Make progress writes conditional on the server revision that was read, detect conflicts and merge independent study records instead of replacing an entire device's progress. Preserve the new activity field when merging and validating older saved profiles.
4. Serialize and cancel synchronization work appropriately. A response from an old request must not restore cleared progress after sign-out or reset.
5. Retain progress for the current visit when browser storage is unavailable, and cover these failure paths with regression tests.

Integration must retain the source redesign and shared layouts. Today's task URLs now come from `features/today/describe.ts`; topic-specific weak-spot links also need the selected topic. Account boundaries must account for the studio's separate local drawing and quiz records.

The current source activity merge takes the maximum daily minutes and counters from each device. It preserves completed-item lists but can undercount independent same-day sessions. Accurate combined activity totals need event or per-device identifiers; this branch must not describe those totals as lossless.

These fixes support Engineering Plan Section 2 (interruptible, honest offline), Section 5 (no lost answers), and Sections 13 and 16 (access controls and tests). They do not establish medical review, a complete textbook batch or production readiness.

## Plan inconsistencies to resolve

### Peer checking and medical approval

New Blueprint Section 34 says a student can compare a draft with the textbook and set `reviewed: true`. Sections 11 and 15 still require medical-review records before production publication. The current source drawer translates that boolean to "Approved by a medical reviewer."

Represent peer checking and medical approval separately. Record who checked which version, in what role and when. Do not turn the existing flag on for a peer check while it produces the stronger medical-approval claim. Private peer-reviewed material should have an accurate visible status, and production publication should retain its explicit approval gate.

### Milestone names and source rights

The product blueprint calls the provenance foundation "M5a"; Engineering Section 21D uses "M5a" for installability, offline pages and budgets. Refer to those deliverables by name until the milestone IDs are reconciled.

Engineering Section 25A records the BodyParts3D licence-page/file-notice mismatch and the need to review the schematic nerves. Preserve those caveats. A resource's reputation or an "open access" label is not a verified per-asset licence record; source replacements need the same registry checks.

## Recommended build order after the reliability changes

1. Establish the source registry and separate peer/medical review records with an enforced publication lifecycle. Tag textbook-derived content and store versioned evidence for questions as well as whole topics. Extend source, review-status and report controls to the studio's lesson and clinical information.
2. Extend the existing body-region and shared-structure foundation into a permanent concept/topic map with separate teaching/exam sequences. Add the minimal topic-hub Connections block from Blueprint Section 10 before a graph explorer.
3. Add primary-book preferences and structured reading guidance: verified edition/chapter/pages, purpose, reading depth and stop condition. Keep missing references visibly unavailable. Allow a student to see why a reading was selected.
4. Finish the brachial-plexus package against that workflow, then review and complete the three implemented sample Upper Limb batches. Preserve sample status until the appropriate review actually happens.
5. Run the existing usability kit with the private group, collect its real timetable and use the observations to refine Today and reading guidance. Validate production email, access restrictions, recovery/offline behavior and performance on actual phones before widening access.

The permanent map, sequence and reading work can proceed independently of completing the textbook batch if they share agreed schema contracts. Keep Codex and Claude changes on their own branches and reconcile those contracts through reviewed changes.

## Validation boundary

This document records code and requirements inspection, not test execution or medical validation. Changes should be accompanied by the applicable unit/component, database/integration and end-to-end results in the branch review. The repository's normal commands are listed in the README. Run the relevant checks before merging; do not infer success from the presence of test files or from historical CI claims in the planning documents.
