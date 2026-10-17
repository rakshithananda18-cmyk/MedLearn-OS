# Knee atlas sample: review before proceeding

17 October 2026. Branch: `codex/knee-atlas-sample`.

Local preview: [Open the knee sample](http://localhost:3104/samples/knee-atlas).

This is one isolated sample using the existing right-knee meshes. It keeps the sky/cream scene, gold display headings and teal actions, with a stable stage and a quieter reading panel. The shared Studio and its learning flow are not replaced by this sample.

The three observations are **Orient → Relate → Recall**. Try the anatomical camera views, bone context, names, keyboard-accessible structure choices, recognition feedback and the diagram alternative. On smaller screens, changing steps reveals a brief task above the model. The reading panel sits beside or below the model, so it does not cover the anatomy.

**We will check this sample together, then proceed.** Review these points first:

- Does the model make the selected structure and its surroundings easy to distinguish?
- Do the colours, labels and reading surface feel calm and legible on your usual devices?
- Can you change the view, recover with Reset, and follow the next task without searching?
- Does the label-free recognition check help connect a name with a structure from another view?

The source content is still marked **awaiting anatomy review**. Keep that status visible. The sample demonstrates static geometry and teaching presentation; mesh alignment, attachment accuracy and teaching claims still require an anatomy educator's review. No learning-outcome validation is claimed. The patellar ligament outline mentioned in the shared asset credit is omitted from the 3D sample; the relationship diagram still names that structure.

The sample does not record answers or study completion. Existing model provenance is available in the Sources disclosure. It uses selected meshes from the existing lower-limb joint asset, rather than authoring a new anatomy model or changing the original asset.

Implementation: `apps/web/src/app/samples/knee-atlas/page.tsx`, `apps/web/src/features/samples/`, and a sample-only preloading wrapper exported by `@medlearn/visuals/atlas-sample`. A new optional `Viewer3D.onReady` callback lets this sample settle its initial camera after the meshes mount; existing callers retain their behaviour. The wrapper resolves the model before mounting its initial camera and labels. Diagram mode has its own schematic guidance and keyboard-selectable nodes, rather than asking learners to find bones absent from that diagram.

Local browser measurements and screenshots are retained in `test-results/knee-sample/`. Check the final `results.json` and build log for the recorded validation outcome. This local sample has not been rolled out to other topics or pushed as a new PR.

Validation passed: production build and TypeScript, ESLint, formatting, seven Chromium viewport flows (1366×900 laptop, both tablet orientations, 390×844 and 360×640 phones, and two phone landscape sizes), light/dark presentation, answer feedback and focus, unchanged saved study progress, and diagram fallback for unavailable WebGL or a failed model request. Four automated accessibility scans reported no violations; no unexpected page errors occurred. These are browser checks, not physical-device or educator validation.

Saved previews: [laptop](knee-atlas-sample/laptop-orient.png), [phone recognition step](knee-atlas-sample/phone-recall.png), and [dark theme](knee-atlas-sample/laptop-night.png).
