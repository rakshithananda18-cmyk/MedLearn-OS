---
name: 3d-studio-direction
description: "User wants 3D as one universal full-bleed \"play area\" studio across the app, with overlaid lists, drawing and customisation"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 26269efa-6230-4e37-adb4-58cb232ad4e0
  modified: 2026-10-08T17:28:05.401Z
---

On 28 Sep 2026 the user asked to make 3D a universal part of MedLearn OS: one 3D area (not a page of stacked lists), every list overlaid inside the 3D area so it takes little space, topics on the left, a modern, engaging, "addictive" play area with customisation (layers, opacity, isolate), drawing on the model (draw, edit, discard), knowledge on selection (not "just a diagram"), and quizzes.

**Why:** the first per-topic 3D pages stacked chip lists under a sticky viewer; on phones the lists became unusable and felt like a diagram, not a learning space.

On 30 Sep 2026 the user set Complete Anatomy (3d4medical.com) as the bar: male and female bodies, every system, animations, 2D and X-ray views, rendering matched to the device. Blueprint v0.7 Section 38 stages it; female-body and X-ray sources still need the user's decision (no open female model of BodyParts3D quality; Radiopaedia is NC).

On 30 Sep 2026 the user rejected a separate 2D "Body atlas" panel: they want ONE 3D body carrying every system and function (like Complete Anatomy), not side panels of pictures. BodyParts3D 4.0 source (2,234 OBJ parts, about 6.7M triangles: skeleton 570k, muscles 2.1M, arteries 0.8M, veins 0.8M, organs 0.34M, nerves only 28 parts) is now kept at models-src/bodyparts3d (git-ignored); build tooling is scripts/models/build-models.mjs (gltf-transform + meshopt).

Shipped 30 Sep 2026 (PR #29, #28 closed): the whole body is one model with 7 system layers (per-system GLBs from scripts/models/build-body-systems.mjs), tap any structure for its name and topics. The user then asked that layers open from a Layers button **beside the settings icon**, one identical layers sheet (dot + switch) for the body and topics, and that the **right panel hold information only** (topic modes and structure card; on the body it appears only once a structure is picked).

Z-Anatomy downloaded 5 Oct 2026 (user said yes) into models-src/z-anatomy: Nervous, LymphoidOrgans, Visceral FBX. PR #33 builds nerves + lymph layers (scripts/models/build-z-anatomy.mjs; frame map x'=10x, y'=-10z-97, z'=10y-72). Lungs (5 lobes) and whole liver from the visceral file are the next follow-up. Source details: Z-Anatomy, CC BY-SA 4.0, FBX per system at github.com/LluisV/Z-Anatomy/tree/PC-Version/Resources/Models/FBX (NervousSystem100.fbx 53.9 MB, LymphoidOrgans100.fbx 2.1 MB, VisceralSystem100.fbx 18.4 MB may fill lung/liver gaps). Convert with three's FBXLoader in Node into the existing gltf-transform pipeline; derived GLBs must be credited and shared CC BY-SA 4.0.

Status 8 Oct 2026, all merged: #30 Section tool and isolate on the body; #31 search any body structure (camera turns to it; public/models/body-index.json); #32 "Find it" on the whole body; #33 Z-Anatomy nerves and lymph nodes; #34 whole lungs and liver; #35 library/books open without the database; #36 X-rays on the whole body beside the bones they show; #37 README. Open: #38 joint movements (elbow flexion, pronation, shoulder abduction, knee flexion; rigid bones, muscles do not follow) and #39 .claude settings. Still to do: the female body, last (the user will download the five Sketchfab models into models-src/female).

**How to apply:** build 3D features into the shared studio (full-bleed canvas, glass overlay panels, bottom tool bar), not as new stacked sections; every anatomy topic gets a model; keep 2D fallback for weak phones; check phone/tablet/dark. Related: [[design-direction-calm-sky]], [[engineering-standards]].
