# Proposal asset notes

The gallery reuses the existing MedLearn anatomy posters (knee-joint, brachial-plexus), Noto Sans and Instrument Serif fonts, and Lucide icons. Anatomy is not newly generated or independently validated. The browser mockups are design proposals with illustrative state, not production screenshots or evidence of teaching accuracy.

## Anatomy provenance

Source credits are preserved from the repository, not independently reclassified:

- Knee bones: BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP).
- Knee capsules, ligaments and menisci: Z-Anatomy, CC BY-SA 4.0. The source model has no patellar ligament or anterior tibiotalar part of the deltoid ligament. The recognition still uses the existing cruciate-ligament sample and does not add either structure.
- Brachial plexus context: bones, muscles and vessels from BodyParts3D, © The Database Center for Life Science, CC BY 4.0 (files marked CC BY-SA 2.1 JP). Nerve paths are a MedLearn schematic, not yet medically reviewed.
- The diagram-trainer proposal uses nodes and label choices from the existing brachial-plexus drill; it is a schematic, not a new anatomy source.

See apps/web/src/content/lower-limb-joints-3d.ts, shoulder-3d.ts and brachial-plexus-3d.ts for the original model credit and source definitions. Preserve their attribution and applicable share-alike conditions when redistributing derivatives. The images do not carry an educator approval.

## Interface assets

Noto Sans and Instrument Serif are copied from the app's existing locally compiled font assets. Lucide icons are rendered from the existing project dependency (ISC licence). Keep upstream licence notices with redistributed assets. No AI-generated anatomy or additional illustration source is used.
