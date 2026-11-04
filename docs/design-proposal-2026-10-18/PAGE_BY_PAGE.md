# MedLearn OS: page-by-page design proposal

18 October 2026. Based on synced `339bdc7` plus the copied planner working files. This specifies proposed presentation and corrections; application code is unchanged. The accompanying HTML/PNG gallery shows proposals, not implemented screens. Any example plan dates, minutes, percentages, names or answers in mockups are explicitly illustrative. Reuse the app's real anatomy assets and existing catalogue; no additional subjects, content or AI capabilities are implied.

## Shared visual and interaction rules

Keep Calm Sky: blue fading to warm cream, quiet white reading surfaces, teal primary actions and restrained gold display accents. Use existing semantic tokens, including their dark-theme equivalents. Gold is for a large title or small accent, not paragraphs or secondary metadata. A large anatomy image must earn its space by supporting the current task.

Use one page h1: display serif around 36–44px on laptops, 30–36px on phones. Section headings use the sans face at 18–24px. Teaching text stays 16–18px with generous line spacing and a reading measure near 60–70 characters; metadata is smaller but never essential instructions. Use the existing 4px spacing rhythm; flatten nested groups rather than stacking multiple glass cards.

Each page has one dominant next action. Status explains what happened; an action explains what happens next. Use **Study coverage**, **cards seen**, **questions correct**, and **estimated work**, keeping retention and elapsed time claims separate. Preserve sample/review labels and source access.

Laptop: rail plus bounded content; split comparison tasks. Tablet: select split versus stack by actual pane space, including landscape height. Phone: task first, flexible wrapping, safe-area-aware controls; avoid a tall repeated hero. Maintain roughly 48px primary touch targets. Six current phone destinations need density testing; do not silently remove Plan or Practice. If Profile moves to a header in a candidate, retain an explicit name and test discovery.

After explicit step changes, reveal and focus the new instruction; unrelated rerenders preserve exploration. Dialogs restore focus, save/error states announce succinctly, and reduced motion stays supported. Independently check 320 CSS pixels, enlarged text, keyboard, screen reader, slow connections and actual touch devices. A clean screenshot or axe scan alone is insufficient.

## Student pages

### Landing and root entry: `/`

**Job / primary:** explain the daily loop; **Start in 4 steps** for a new learner, **Open today's plan** for a returning learner, following existing `StartLink` behavior. Use one existing teaching preview (the current curve or anatomy artwork), shorten competing badges and make sign-in a quieter secondary action.

**Devices:** laptop text/preview split; tablet balanced stack; phone value statement and entry action before the preview. **States / acceptance:** fresh, returning, hydration and dark theme; verify each entry reaches Welcome or Today correctly without a misleading redirect or layout jump.

### Welcome: `/welcome`

**Job / primary:** answer the existing age, year, exam and daily-time questions; **Continue**, then **Open my plan**. Name each step, retain Back and optional exam-date handling, and make Skip's result understandable. Describe actual storage behavior without implying that setup creates a signed-in account.

**Devices:** laptop centered reading column; tablet large choices; phone controls remain above navigation/keyboard. **Acceptance:** missing answer, skipped exam, all age choices and backtracking preserve selections; focus announces the next question and Today reflects the saved choices.

### Today: `/today`

**Job / primary:** begin the next useful task. Place **Continue lesson / Start recall / Practise** immediately after a compact greeting. Optional books/account prompts follow the task. Keep daily goal and estimated work separate; suggested extra work stays visibly optional.

**Devices:** laptop next task and plan with quiet progress aside; tablet prioritized stack; phone compact task card before statistics. **Acceptance:** new, interrupted, catch-up, exam, goal-met and no-work states give an unambiguous next or stopping action; returning learners can start without searching below setup prompts.

### Plan overview: `/plan`

**Job / primary:** resume or create a plan. Lead with today's task and **Continue**; make **New plan** secondary when active work exists. Separate active, completed and deadline-passed outcomes using existing state, rather than presenting all ended plans as successful.

**Devices:** laptop overview rows plus weekly summaries; tablet wrap metadata; phone Continue precedes rings and week strips. **Acceptance:** empty, multiple, future-start, complete and expired plans explain remaining work consistently with Today; illustrative mockup progress never appears as measured learning.

### Manual plan wizard: `/plan/new`

**Job / primary:** choose kind, topics, dates/days and check the resulting plan; **Next**, then **Add plan**. Keep four named steps, selected count, eligibility explanations and an editable review summary. Collapse long weekly schedules behind their summary.

**Devices:** laptop limited-width form; tablet comfortably spaced groups; phone one step with visible next action and wrapping topic choices. **Acceptance:** backtracking preserves values; no eligible topics and invalid date/day combinations explain why continuation is unavailable. Explicit transitions focus the heading; test a long topic selection, not only the short default path.

### AI plan path

**Job / primary:** obtain an editable suggestion; **Suggest a plan**, then **Add to my plans**. Keep exam date and optional details, show supported assumptions, dates and estimated load before acceptance. Remove the unsupported “weekends off” example until saved proposals represent it; direct existing day adjustments to the calendar.

**Devices:** laptop proposal beside a compact summary; tablet stacked goals; phone editable goal cards with clear Add/Ask again. **Acceptance:** unavailable, sign-in-required, rate-limited, empty and edited proposals retain input and provide a useful manual route. No mockup implies a live AI response, automatic acceptance or unsupported scheduling.

### Plan calendar: `/plan/[id]`

**Job / primary:** perform today's scheduled work; **Continue: [topic]** before statistics. Give each topic an explicit study action preserving its goal context; label overview links separately. Replace false completion on an expired incomplete plan with deadline and remaining topics plus date adjustment. Rename “Time spent” to **Estimated work completed**.

**Devices:** laptop day list and adjustment aside; tablet task before controls; phone Continue, today's topics, then weeks and settings. **Acceptance:** complete versus expired, rest day, future start, missing plan and edits produce truthful states; calendar actions and overview Continue launch the same intended task.

### Library: `/subjects`

**Job / primary:** find and start a relevant topic. Preserve the subject/region/section tree, search, direct lesson preview and current selection. Keep learning progress quiet; reduce repeated preview decoration and make reading guidance accessible.

**Devices:** laptop list/preview split; tablet drawer; phone selected topic drawer with task first. Individual subject chips and account cards must shrink/wrap rather than force horizontal scrolling. **Acceptance:** empty subject, long titles, completed topics, valid book selection and 320px enlarged-text state remain operable; closing preview restores the originating row.

### Search: `/search`

**Job / primary:** open the intended topic, structure or teaching passage. Put stable title first, content type/context second, short highlighted excerpt third. Group existing result kinds; preserve fuzzy matching and personal-note distinctions without reproducing long lesson paragraphs as headlines.

**Devices:** laptop bounded result list; tablet generous rows; phone concise two- or three-line cards. **Acceptance:** exact name, misspelling, clinical phrase, notes, no result and request failure all have clear destinations; learners can distinguish a 3D structure result from a lesson before opening it.

### Topic hub: `/learn/[slug]`

**Job / primary:** choose the next study mode; **Start / Continue / Go over lesson**. Keep the summary, trust label and reading link, followed by study actions and coverage. Optional lectures, tour and notes follow. Avoid another large decorative image above the phone action.

**Devices:** laptop anatomy/context beside actions; tablet condensed image; phone concise identity and study controls. **Acceptance:** new, interrupted, completed, reviewed/unreviewed and no-video topics expose accurate wording and sources; recall/practice stay topic-specific.

### Lesson: `/learn/[slug]/lesson`

**Job / primary:** understand one explanation with its visual; **Next**, then **Finish lesson**. Preserve the newly fixed heading focus and framing. Keep step count compact; make relevant visual emphasis match the explanation. Wrap-up distinguishes completed lesson, check questions and suggested recall.

**Devices:** laptop stable comparison panes; landscape tablet sufficient text/model width; portrait tablet/phone instruction directly above visual. **Acceptance:** advance, Back, resume, Start over, completion and unavailable storage preserve task clarity; verify the actual new heading is visible, not merely mounted.

### 3D Studio and topic alias

**Job / primary:** inspect a named structure or guided view. Keep real anatomy, restrained selection, context, readable names and named More tools. Put the active task above optional tools; use one active floating panel. Preserve corrected panel-aware camera framing.

**Devices:** laptop docked tools; tablet measured comparison panes; phone lightweight overlays, landscape model beside description. **Acceptance:** whole-body/topic, search, tour, quiz, X-ray, resize, loading and diagram fallback keep selected anatomy usable. `/learn/[slug]/3d` remains a redirect to the same topic in `/studio`; do not create another viewer.

### Drawing: `/learn/[slug]/draw`

**Job / primary:** place labels through diagram layers, then draw on paper; **Next layer / Finish**. State the paper task clearly, keep the highlighted blank and label bank close, and explain wrong choices without relying on shake/color alone.

**Devices:** laptop diagram/step split; tablet label bank beside or below; phone current instruction, diagram, wrapping labels and reachable controls. **Acceptance:** long labels, wrong answer, layer completion and final completion remain readable; no mockup suggests an unimplemented freehand editor or automatic drawing assessment.

### Practice: `/practice`

**Job / primary:** answer an appropriate set, then resolve errors. Keep Quick mix, Weak spots and Timed test; make a running question dominate. Results show current-session accuracy and missed items, with **Retry misses** or return to the originating topic/plan. Label broader recall as optional.

**Devices:** laptop centered question; tablet spacious options; phone answer/explanation/next in sequence. **Acceptance:** topic/goal entry, timer expiry, early exit, no content, retry and completion preserve credited answers and explain session boundaries; results never silently redirect into unrelated revision.

### Recall: `/revise`

**Job / primary:** attempt an answer, reveal it, then rate recall honestly. Keep prompt, **Show answer**, answer and four ratings visually distinct. Show topic, remaining session count and a clear return destination; avoid equating cards seen with successful recall.

**Devices:** laptop quiet reading column; tablet comfortable card; phone ratings wrap with full labels and answer visible. **Acceptance:** Again/Hard/Good/Easy, topic-locked cards, bounded completion, due queue and loading/error states preserve focus and accurate scheduling feedback; long answers do not hide the next prompt.

### Books: `/books`

**Job / primary:** select existing books that reorder reading guidance. Use subject headings in the reading face, clear edition metadata, selected state and **Saved** feedback. Keep auto-save; a simple return link closes the task.

**Devices:** laptop grouped shelves; tablet generous choices; phone one-column labels without truncation. **Acceptance:** no profile, none/one/multiple choices and returning selection work correctly; changing one subject preserves others and topic reading links reflect the choice.

### Profile: `/profile`

**Job / primary:** adjust personal study preferences. Lead with study time/exam settings, then books, quiet progress summary, account and theme. Keep name optional; make save feedback local to the edited field rather than adding a large success card.

**Devices:** laptop two balanced columns; tablet wrap settings; phone one grouped form at a time. **Acceptance:** no profile, blank name, changed date/time, account role links and dark theme remain clear; a year choice does not imply unavailable catalogue coverage.

### Account: `/account`

**Job / primary:** access and protect account progress. Make sign-in/sign-up/reset modes explicit; keep password and confirmation errors close to fields. Explain what is synced versus device-only. Sign-out reports a failed save and preserves work until the existing safe flow succeeds.

**Devices:** laptop bounded form; tablet same hierarchy; phone keyboard-safe inputs and action. **Acceptance:** visitor, signed-in, confirmation, reset, failure and sign-out states preserve input/focus appropriately; cleared lesson/Studio data and session changes match the interface's promises.

### Offline: `/offline`

**Job / primary:** explain the unavailable page and return to usable work; **Go to Today**. Use calm connection wording and accurately distinguish a previously opened page from an uncached request. Do not display invented downloaded-topic inventories.

**Devices:** laptop concise message; tablet/phone reachable return action and persistent navigation. **Acceptance:** uncached navigation, cached Today, reconnection and failed retry preserve progress; offline copy never promises that external lectures or every asset is available.

### Progress alias: `/progress`

**Job / primary:** honor bookmarks by opening Library, where progress now lives. Keep this route as a redirect; do not introduce another competing dashboard.

**Devices:** all sizes reach the same responsive Library. **Acceptance:** direct/back/bookmarked visits avoid loops and expose coverage and due work consistently with the topic and profile views.

## Staff and design-only surfaces

**Review `/review`, `/review/[slug]`:** preserve role gating, version/digest, source sheet, decisions and report triage. Put actionable queue filters first; distinguish pending, changes requested and reviewed states. Laptop can compare sheet/decision; tablet/phone stack with review action after the relevant evidence. Acceptance: revoked role, changed content, failed save and history remain truthful; no public mockup implies medical approval.

**Admin `/admin`:** separate reviewer roster, qualifications, add/edit/remove and change log. Keep destructive confirmation adjacent to its subject, with clear save state. Stack staff tables into labelled rows on narrow screens. Acceptance: authorization, duplicate entry, removal confirmation, failure and audit attribution.

**Facilitator `/facilitator`:** visibly mark test setup and the existing device-progress replacement action. Preview the scenario name and consequence before Apply; distinguish fixtures from real study. Use one column on phone; acceptance verifies intended replacement and clear exit without presenting this as a student feature.

**`/design`, `/design/companion` and `/samples/knee-atlas`:** keep these separately labelled evaluation surfaces. Component gallery documents both themes and states. The knee sample uses actual assets; compact mobile intro/model proportions and keep Recall question, marked anatomy, choices, feedback and retry within comparison distance. Acceptance covers portrait/landscape, diagram fallback, reduced motion and model/source review. The companion design is an optional visual candidate, not evidence of a shipped teaching feature or a reason to interrupt study.

## Implementation and independent validation

1. Correct existing behavior/copy: expired plan outcomes, consistent calendar actions, estimated-time labels and unsupported AI examples.
2. Repair compact composition: enlarged-text reflow, next-task placement, plan-step focus, six-tab density and keyboard-safe forms.
3. Apply shared hierarchy: search titles/excerpts, quieter nested surfaces, topic/practice return context and saved-state feedback.
4. Evaluate the anatomy sample before extending its composition; retain the current tested lesson and Studio corrections.

Five neutral student tasks: start the work planned for today; locate a named knee structure and explain its relation; make a class-test plan and find its first task; leave a lesson and return on the same device; interpret an expired plan and the topic's coverage/recall indicators. Record unassisted completion, wrong turns, missed instructions and interpretations on the student's usual device. Separate candidate preference from task performance, and neither from measured learning outcomes.

Use external acceptance criteria alongside these tasks: [WCAG reflow at 320 CSS pixels](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [text resizing to 200% without loss](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html), and [minimum target sizing](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). The proposed 48px primary controls are a design target, not the wording of the WCAG minimum. Browser image checks do not establish accessibility conformance. An anatomy educator must separately verify structure identity, laterality, relationships and source provenance before teaching use; preference for a rendering is not evidence of accuracy.
