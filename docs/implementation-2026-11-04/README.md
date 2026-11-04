# Focused study UI implementation

4 November 2026. Implements the approved page-by-page proposals in the real app, preserving the imported planner work and the newer content/Studio changes from main. The earlier design gallery remains a proposal reference; [these captures](CAPTURES.md) show actual production-build screens.

## Page changes

| Page | Result |
| --- | --- |
| Landing | Shorter entry message, accurate curriculum scope and a clear setup/return action. |
| Welcome | Named steps, deliberate heading focus, retained answers and clearer Skip/account wording. |
| Today | The next study task precedes supporting prompts and quieter progress panels. |
| Plan overview | Active, completed and deadline-passed outcomes are separate; Continue preserves the intended task. |
| Plan builder | Four steps with focus/reveal, preserved choices and responsive topic controls. |
| AI draft | Supported scheduling assumptions, combined estimated load and explicit profile changes; manual fallback preserves a useful route. |
| Calendar | Next task before figures, honest expired/incomplete recovery, estimated-work labels and goal-specific actions alongside explicit overview links. |
| Library | Continue before the preview image; subject names and counts reflow at 320px with 200% text. |
| Search | Stable topic/structure titles, content-type context and shorter highlighted excerpts. |
| Topic | Study actions precede the phone hero; coverage, sources and topic-specific entry remain intact. |
| Lesson | Preserve step focus and camera framing; wide-screen controls sit beneath the relevant visual. |
| 3D Studio | Preserve main's newer region models, search, quiz and measured panel-aware framing. |
| Knee sample | Prompt, marked model and choices stay close; readable fallback labels and an explicit custom-angle cue. |
| Drawing | Focus each label layer and completion; retain the label-bank trainer and drawing on paper. |
| Practice | Quiet question surface, honest session results and return to the originating plan or topic. |
| Recall | Compact reading area and four visible rating labels/hints. |
| Books | Clear selection and field-adjacent saved feedback. |
| Profile | Study settings first, smaller identity area and local save notices. |
| Account | Bounded forms, wrapping controls/email and truthful device/account state; test fixtures cannot be adopted by an account. |
| Offline | Calm, qualified availability wording and a direct return to Today. |
| Review | Quieter queue/evidence surfaces, responsive filters and preserved review history/permissions. |
| Admin | Responsive roster and clear access versus content-decision context. |
| Facilitator | Preview and confirm replacement, freshly verify account state and persist a local test-session boundary across routes/tabs. Ending test mode clears fixtures before sync resumes. |

The shared sky-to-cream background remains, with quieter reading surfaces and darker gold display accents. Phone navigation keeps Profile visible alongside the five study destinations. Its measured height now reserves space when labels wrap or text is enlarged; the proposed move to a header remains a student-discovery experiment rather than removing a familiar destination.

## Reliability and local access

- Startup refreshes local API and test-mailbox settings without resetting data. Bootstrap still performs its documented explicit reset.
- Authentication-service failures are distinguished from a verified signed-out device.
- Facilitator fixtures are blocked from upload, restore and account adoption. Their marker must persist before replacement; clearing must persist before normal sync resumes.
- CI now runs the API/repository integration tests as well as database checks and coverage.
- Windows test runs use threads to avoid the observed idle fork-worker startup; backend round trips have a bounded 30-second test limit.

The original local `admin@example.com` account was confirmed to exist with a verified email and password set. Its password and original database records were preserved. Use Account's **Forgot your password?** flow if needed; local confirmation mail is visible at `http://localhost:54324`. Validation used a separate disposable database, not a reset of the original one.

## Verification

Current run logs are in the ignored `test-results/` directory. The focused page suites, production build, package type checks, lint, database and integration checks are recorded in the final PR. The image gallery records its six scoped layout checks separately.

Physical-device testing, a complete assistive-technology journey, and independent educator verification remain external acceptance work. Existing anatomy provenance and awaiting-review labels are preserved; test review decisions and rendering preference do not establish medical accuracy.
