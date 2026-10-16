# MedLearn OS reliability implementation

Implemented on `codex/reliability-ui-fixes`, in `D:\Dev Workspace\MedLearn-OS-Codex`. The source checkout was read only. The branch incorporates main `09ceb91` and the latest source content at `dcea718` (PR #67); its implementation PR is [#68](https://github.com/rakshithananda18-cmyk/MedLearn-OS/pull/68), stacked on the content branch.

## Behavior changed

- Goal removals and final revisit completion survive account sync, older device snapshots and reloads. `removedGoals` remains the released field name; temporary `deletedGoalIds` and released terminal revisit records are normalized on ingestion. Markers do not expire. Local storage preserves markers beyond the API limit; sync rejects over 5000 instead of silently erasing deletions.
- Review decisions refresh while a page stays open and after focus, reconnection or a new decision. An approval must match the content digest delivered to that student and the deployed evidence. Legacy decisions require a new review. The database stamps reviewer identity/time and orders decisions by append identity.
- The digest covers the compiled topic, book evidence, selected lectures, movements, X-ray metadata and referenced local visual bytes. A generated manifest also supplies model, poster, body-index and X-ray cache keys. External video bytes cannot be pinned by this manifest.
- Search has distinct loading, empty and retryable failure states. Stale responses cannot replace a newer query; a ten-second deadline also covers a response body that never finishes. Reconnection retries a failed search.
- Practice and global recall load bounded batches of at most 20 teaching items, with explicit recovery states. Topic sessions receive only their topic's questions/cards initially.
- Successful teaching batches, posters and X-rays recover offline. Remaining subsets can be reconstructed after a card rating or a new shuffle. Online HTTP errors remain errors; learner/account/review APIs are excluded. The shared cache is bounded to 400 entries, not a byte quota, and covers previously opened content.
- Short-phone and landscape Studio controls scroll above the lower sheet with 48-pixel targets. Floating sheets have nonmodal dialog semantics, Escape and focus return. Library actions wrap and grow with enlarged text. New questions, recall prompts/answers and lectures receive predictable focus.
- Reviewer evidence links open the lesson, diagram and 3D view, with evidence before the decision form on phones.

## Database rollout

Keep the existing upstream audit migration (`20261016130000`) and apply the additive migrations in order: progress deletion handling (`140000`), review evidence (`150000`), then released-format normalization (`20261017100000`). The last migration normalizes saved progress while preserving compare-and-swap timestamps. Database types were regenerated from a local database.

Deploy migrations before the app. Old review decisions remain in history and require rechecking; a version number alone cannot preserve approval. Historical removals made before any marker existed cannot be inferred retroactively.

## Verification

- Workspace types, repository lint and production build passed. The build generated 431 static pages.
- All 80 pgTAP checks passed against an isolated local test project; the source project's database was not reset.
- The first combined CI run passed lint/types/unit/component tests, database/integration/coverage and SonarCloud. Each browser size passed 40 of 41 journeys; the one stale assertion for the old Sources wording was corrected. Final checks are tracked on [PR #68](https://github.com/rakshithananda18-cmyk/MedLearn-OS/pull/68/checks).
- The visual review captured 46 states across six viewport sizes, including night mode, with no recorded page-script errors or horizontal overflow. Six targeted Today/lesson accessibility scans found no serious or critical violations. These checks do not replace an actual-device pilot.

Indicative production response sizes after alignment: Practice hub 151 KiB raw / 36 KiB gzip; topic Practice 154 / 37; global Revise 106 / 30; topic Revise 23 / 6. The earlier 119-topic audit measured 556 / 89 for both Practice routes and 536 / 97 for global Revise. The catalogue now has 132 topics and other upstream changes are included, so this is not a controlled timing benchmark or a complete page-download measurement.

The [student design review](UI_REVIEW_2026-10-17.md) records the next UI recommendations. Those proposed hierarchy, resume and visual-polish changes are distinct from the reliability fixes implemented here.
