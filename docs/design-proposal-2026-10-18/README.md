# MedLearn OS design proposals

18 October 2026. A deeper review of the existing study journey, with 23 page designs and 69 laptop/tablet/phone images. These are reviewable proposals; production application UI is unchanged.

- [Explore all page images](http://localhost:3106/images.html)
- [Interactive page and device gallery](http://localhost:3106/)
- [Page-by-page changes, states and acceptance criteria](PAGE_BY_PAGE.md)
- [Individual image index](PAGE_IMAGES.md)
- [Four-page direction board](images/direction-board.png)
- [One task across three devices](images/device-board.png)

The gallery includes student pages, the knee evaluation sample, and separately labelled staff/test utilities. Redirects and the existing design-only routes are covered in the written brief rather than duplicating their destinations. Each design has a job, specific changes and a way to check the result.

The proposals build on the [current-app review and observed defects](../UI_UX_REVIEW_2026-10-18.md). Plan outcome and navigation corrections are supported by that review; spacing, hierarchy and navigation alternatives remain design hypotheses for student testing.

## Recommended order

1. **Trust the plan.** Correct expired/incomplete wording, make calendar Continue reach the intended study task, and remove unsupported AI scheduling promises.
2. **Start studying quickly.** Put Today’s task and Library’s Continue action before secondary cards, use a single manual-plan step at a time, and keep question, visual and answer choices close.
3. **Unify the reading surface.** Keep the blue-to-cream background and restrained gold serif titles from the supplied references. Use near-white teaching cards, dark sans-serif study text, teal actions and fewer nested surfaces. Reserve large imagery for teaching.
4. **Adapt composition to the device.** Laptop compares panes; tablet balances pane width and landscape height; phone prioritizes the task and reachable controls. The five-item phone navigation with Profile in the header is a candidate that needs discovery testing.
5. **Validate with students and an educator.** Observe the five neutral tasks in the brief on students’ normal devices. Check reflow, enlarged text, keyboard/screen reader and failure states separately. Anatomy accuracy needs educator review.

## Images and interactions

Images render at 1440×1024 (laptop), 820×1180 (tablet) and 390×844 (phone). They show the initial viewport rather than pretending every page fits without scrolling. Scroll the interactive gallery to inspect lower content. Page navigation, device/theme switching, recall reveal and illustrative answer feedback work locally. Forms, AI, scenario setup and model-view controls do not perform their production operations.

Anatomy posters are existing project assets. The knee recognition image is a still captured from the actual model. This keeps the layout proposal anatomically grounded without suggesting that a static image rotates. Data, dates and progress are examples; awaiting-review labels remain visible. See [asset provenance](ASSET_NOTES.md).

## Verification and reproduction

`capture-results.json` records the 69 device renders, broken-image and horizontal-overflow checks, plus the local navigation/reveal/theme checks. Passing these checks establishes only the tested layout behavior, not WCAG conformance or learning effectiveness. The full brief lists remaining critical states and independent acceptance checks.

Eight key pages also passed 16 checks at 320px width and 1024×768 tablet landscape: no horizontal overflow, text-width clipping, broken images or page errors. Lower controls were reachable through ordinary scrolling. See `additional-layout-results.json`. Its eight root-font probes are not counted as enlarged-text validation because the fixed-pixel prototype text did not enlarge; actual browser zoom and assistive-technology checks remain required.

From the repository root, run `node docs/design-proposal-2026-10-18/serve.mjs`, then visit the gallery. With that server running, `node docs/design-proposal-2026-10-18/capture.mjs` regenerates the image index and screenshots using the project’s existing Playwright dependency and Chrome. The gallery does not require an application build, database or account.
