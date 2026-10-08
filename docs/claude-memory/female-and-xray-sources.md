---
name: female-and-xray-sources
description: "Sources found 30 Sep 2026 for a female 3D body (CC BY Sketchfab set) and upper limb X-rays (CC0 Wikimedia series); downloads pending the user's yes"
metadata:
  node_type: memory
  type: project
  originSessionId: d644a0aa-dd75-4477-b27f-b2aef6c6e658
  modified: 2026-10-08T17:28:10.593Z
---

The user wants a female body "like the male one" and X-rays in the 3D studio (Complete Anatomy as the bar, see [[3d-studio-direction]]).

Female body: no open full female body of BodyParts3D quality exists. BodyParts3D, Z-Anatomy and AnatomyTOOL's Open3Dmodel (CC BY-SA 4.0) are all the male volunteer; Open3Dmodel lists female reproductive organs as planned, not released (checked 30 Sep 2026). Chosen route: combine CC BY models from Sketchfab (download needs a signed-in Sketchfab account, so the user downloads them):
- Human Female Skeleton, GW Anthropology Laboratories: sketchfab.com/3d-models/3607576e0a7f422a802663ae358b7951
- Female Reproductive System, Stanford Medicine EdTech: c4d5e725198d4a1997c641d548bb20ce
- Bony Pelvis and Pelvic Organs from MRI, audreybyrd: ad38f2971a054b4db2cd05e3efce9c59
- Human Female Breast Anatomy, Anatomy by Doctor Jana: e521ddef44924d67a612d41764779505
- Female Reproductive Organs (whole), C. Vallance (also on AnatomyTOOL): a7638a209026490fa3c8a3f9eecafcf9
CC BY needs an on-screen credit per model, like the BodyParts3D line. Mixed authors: each part needs the medical review gate.

X-rays: Wikimedia Commons "X-ray of normal …" series is CC0 (elbow AP/lateral/two obliques, wrist PA/lateral, hand PA/lateral/oblique, shoulder Grashey AP and Y view; about 3.3 MB). Not found as CC0: humerus, forearm, clavicle, child elbow ossification. Commons rate-limits fast API calls; send a User-Agent and pause between queries.

Status 30 Sep 2026: the 11 X-rays are built into the studio (PR #27, merged; scripts/models/build-xrays.mjs). The user's "2D or animated diagram" meant illustrated whole-body plates (they showed a PNGTree stock image, which is unusable). Built as the Body atlas (PR #28; scripts/models/build-atlas.mjs) from Commons: Mariana Ruiz skeleton/circulation/digestion SVGs and Häggström muscles (public domain), nervous system (CC BY-SA 4.0), Blausen female lymph and reproductive (CC BY 3.0). Still missing: muscles back, female skeleton plate, the Sketchfab female 3D set (user has to download it).

**Why:** paid product, so only commercial-use licences (CC0, CC BY, CC BY-SA); NC sources like Radiopaedia are out.
**How to apply:** ask before each download (file, source, size); keep sources off `main` (open-licence originals live on the `source-assets` branch; books/ never goes to git), commit only built outputs with credits.
