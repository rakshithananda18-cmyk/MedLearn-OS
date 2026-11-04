# 3D model candidates for MedLearn OS (17 Oct 2026)

Research only: nothing was downloaded and no sign-ins were used. Each licence below was checked on the model's own page or API record (Sketchfab API `/v3/models/UID`, NIH 3D entry pages, AnatomyTOOL pages, the University of Denver repository, Zenodo). Anything not opened directly is marked **unverified**.

## Summary: top 5 recommendations, in order

1. **Open3DModel upper limb, hand and lower limb (AnatomyTOOL, Leiden UMC and partners), CC BY-SA 4.0.** This is the direct, maintained successor to the BodyParts3D and Z-Anatomy meshes we already use. One to three specialist anatomists reviewed every structure, and about 70% of shapes were changed. All upper and lower limb vessels and nerves were newly modelled, and articular cartilage, bursae and synovial sheaths were added. It can be downloaded as GLB, OBJ or Blender files. It is clearly better than ours for `upper-limb`, `hip-thigh`, `leg-foot`, `lower-limb` and `lower-limb-joints`. Because it comes from the same source as our meshes, it probably sits on our coordinate frame, but check that with an overlay before relying on it.
2. **Open3DModel skull set (coloured skull, exploded skull, coloured skull base), overview skeleton and typical vertebrae, CC BY-SA 4.0.** These cover the bony part of head and neck, the back and the `body` skeleton layer. The project remodelled the orbit and the bones of the face, added the ear ossicles and the hand sesamoids, and added cartilage at the joints.
3. **Human Reference Atlas (HRA) female reference organ set (NIH / HuBMAP, Visible Human Female), CC BY 4.0.** This is the only openly licensed whole female body with separate named parts that we found. It covers skin, brain, eyes, mouth, larynx, trachea, lungs, heart, liver, kidneys, gut, uterus, ovaries, uterine tubes, uterine ligaments, vagina, bladder, mammary glands, pelvis, vertebrae, spinal cord and knees. It has gaps: no skull, ribs, shoulder girdle, arm or foot bones, and almost no muscle.
4. **Andreassen et al. 2023, Visible Human Female and Male lower extremities (University of Denver), CC BY 4.0.** It has 130 named geometries per subject (76 muscles, 28 bones, 16 cartilages, 8 ligaments, 2 fat layers), segmented from cadaver cryosections and CT. It fills the female lower limb and pelvic bones, which is the biggest musculoskeletal gap in the HRA female set.
5. **HRA Allen brain v1.3 (female and male sizes), CC BY 4.0.** It has 141 named structures (cortical areas, deep nuclei, brainstem parts), drawn by Song-Lin Ding on the ICBM 2009b MRI template. It adds detailed brain parcellation alongside Z-Anatomy Neurology, which still covers the cranial nerves, spinal cord and peripheral nerves.

**Worth asking for:** Open3DModel has also finished pelvis and perineum (Dec 2025), the inguinal and femoral canal models (Jan 2026), the muscles of thorax, abdomen and back (Mar 2026), and spinal cord and surroundings (Sept 2026). These are better than ours for `pelvis`, `abdominal-wall`, `thorax` and the back. They are CC BY-SA, but at present they can only be viewed online ("Additional formats: None available"). We can request the source files through https://anatomytool.org/open3dmodel-contact.

**Nothing beats what we have** for thoracic organs and heart, abdominal organs, or the male pelvic organs. The HRA versions of those organs are useful only as female counterparts.

### Licence notes that apply across the report
- **CC BY-SA 4.0 (Open3DModel, Z-Anatomy):** any simplified or recoloured mesh we publish must stay CC BY-SA 4.0 with attribution. We already do this for Z-Anatomy, and it does not affect the app's own code. **Do not use the Open3DModel muscle textures:** they are CC BY-NC-SA (from Claudia Krebs et al., UBC).
- **BodyParts3D:** the archive README now states CC BY 4.0 (licence page updated 25–27 Feb 2025). There has been no new geometry since Release 4.0 in 2013, and it is male only. https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html
- **HRA brain:** use v1.3 or later, because the CC BY 4.0 licence applies from v1.3 onward (stated on the NIH 3D page).
- **Open Anatomy / Harvard SPL atlases** (brain, head and neck, inner ear, knee, abdomen, liver, Mauritanian thorax) use the "3D Slicer License, Part B". Slicer describes it as BSD-style and says commercial use is allowed, but it is **not on our allowed list** (CC0, PD, CC BY, CC BY-SA). They are listed separately below for your decision; they are not recommended.

---

## Upper limb (`upper-limb`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DModel Upper limb, complete selection model. Viewer: https://anatomytool.org/content/open3dmodel-upper-limb-english-labels. GLB: https://caskanatomy.info/open3dmodelfiles/upper-limb/upper-limb-glb.zip (also -obj.zip, -blender.zip) | Open3D project: J. Kooloos (Radboud UMC), E. Lee (Leiden UMC, modeller), D. Arnold (Toronto), M. DeRuiter (Leiden UMC); bones G. Maat | CC BY-SA 4.0 (create page and content page). Version July 2025 | Unverified. The project says the remeshed files are larger than Z-Anatomy's | Yes. Individual structures can be shown or hidden; Terminologia Anatomica names; joint tendons are separate objects; named sub-parts are green overlays | BodyParts3D (one male) remodelled by anatomists | **Better than ours.** Same lineage, anatomist-corrected, new limb vessels and nerves, cartilage, bursae and sheaths |
| Open3DModel Hand, complete. GLB: https://caskanatomy.info/open3dmodelfiles/hand/hand-glb.zip | Same team | CC BY-SA 4.0. July 2025 | Unverified | Yes | Same | **Better than ours** for the hand (sesamoids added, detailed joints) |
| Left Upper Limb. https://sketchfab.com/3d-models/9f5e6584b5754ee391d26f0088ca4b5a | UNCG Imaging Lab | CC BY 4.0 | 479,391 | No. Only three bones (humerus, radius, ulna) | Laser and photo scan of dry bones | Not better: bones only |

## Thorax, thoracic organs and heart (`thorax`, `thoracic-organs`, `heart`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DModel Muscles of thorax, abdomen and back. https://anatomytool.org/content/open3dmodel-muscles-thorax-abdomen-and-back-english-labels | Leiden UMC, Maastricht UMC+ and Radboud anatomists; E. Lee | CC BY-SA 4.0. Version March 2026 | Unverified | Yes (show or hide each structure) | BodyParts3D remodelled | Better for the chest-wall muscles, but **viewer only, no download**. Request the source files |
| HRA Heart, Lung, Trachea, Main bronchus, Larynx, Thymus (female and male). Library: https://humanatlas.io/3d-reference-library. NIH 3D: https://3d.nih.gov/collections/40 | Human Reference Atlas (K. Browne, K. Börner et al.) | CC BY 4.0 on every HRA entry opened (e.g. https://3d.nih.gov/entries/3DPX-020988). The heart entry itself was not opened (**unverified**) | Unverified | Yes. The HRA crosswalk lists about 25 named structures for the female heart | Visible Human cryosections (cadaver) | Complementary: female counterparts for the female body; less detailed than our BodyParts3D heart |
| 17 yo Female, Normal Heart. https://3d.nih.gov/entries/2636 | Matthew Bramlet | Public Domain (CC0 1.0) | Unverified | Unknown. No parts listed; probably one shell | CT | Not better |

## Abdominal wall and abdominal organs (`abdominal-wall`, `abdominal-organs`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DAnatomy Inguinal and Femoral Canal and Surrounding Regions (plus two companion hernia models). https://anatomytool.org/content/open3danatomy-3d-model-inguinal-and-femoral-canal-and-surrounding-regions-english-labels | O.P. Gobée (anatomist), E. Lee, D. Jansma (Leiden UMC); reviewers from Radboud, Hasselt and KU Leuven | CC BY-SA 4.0. Page status "To be reviewed" | Unverified | Yes. Includes corona mortis, lacunar ligament, iliopubic tract, Hesselbach's triangle, and overlays for the femoral canal and the deep and superficial rings | BodyParts3D and Z-Anatomy remodelled | Better for the inguinal region, but **viewer only**. Request the source files |
| HRA Liver, Kidneys, Ureters, Pancreas, Spleen, Gallbladder, Biliary tree, Small and large intestine (female and male). https://humanatlas.io/3d-reference-library | HRA | CC BY 4.0 (family verified; individual organ pages not all opened) | Unverified | Yes. About 75 named kidney rows in the crosswalk, about 30 for the liver | Visible Human. The large intestine is sculpted, not from imaging (per NIH 3D search listing, **unverified**) | Complementary: female organs only; not more detailed than ours |

## Male pelvis and perineum (`pelvis`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DAnatomy Pelvic Floor and Perineum. https://anatomytool.org/node/63844 | M. DeRuiter, E. Lee, D. Jansma, O.P. Gobée (Leiden UMC) | CC BY-SA 4.0. Completed Dec 2025 | Unverified | Yes | BodyParts3D and Z-Anatomy remodelled; pelvic fascias and pudendal canal added | Better, but **viewer only** ("Additional formats: None available"). Request the source files |
| HRA Prostate, Urinary bladder (male). https://humanatlas.io/3d-reference-library | HRA | CC BY 4.0 (family verified) | Unverified | Yes | Visible Human Male | Not better |
| Male Pelvis. https://sketchfab.com/3d-models/7aed8bff067947c595f8b3416f9749a8 | SA Anatomy | CC BY 4.0 | 500,026 | No (1 material) | Sculpted in ZBrush from a cadaver | Not better: one mesh, bone only |

## Female pelvis (`female-pelvis`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| HRA female Uterus, Ovaries L and R, Uterine tubes L and R, Ligaments of uterus and ovaries, Vagina, Urinary bladder, Pelvis. https://humanatlas.io/3d-reference-library | HRA | CC BY 4.0 (family verified; the ovary page was not opened) | Unverified | Yes. The crosswalk lists about 14 uterus rows and about 25 ligament rows | Visible Human Female cryosections | Complementary: cadaver-imaging source, and shares a frame with the female body we plan; keep the Stanford model for the pelvis topic |
| Andreassen et al., VH Female pelvis bones and hip muscles. https://digitalcommons.du.edu/visiblehuman/ | Center for Orthopaedic Biomechanics, University of Denver | CC BY 4.0 | Unverified | Yes | VH Female cryosections and CT | Complementary: bony pelvis and hip muscles; pelvic floor muscles not confirmed |
| audreybyrd: Bony Pelvis and Pelvic Organs from MRI (https://sketchfab.com/3d-models/ad38f2971a054b4db2cd05e3efce9c59), Pelvic Organs from MRI (2610b30793ed47a5baa18b2994bdee6b), Bony Pelvis from MRI (f51dda64294c46e48b0fc7b19601af13), Bony Pelvis with Neurovascular Supply (e71806a43f5c432d8db2e58c664cbd16) | audreybyrd (Oklahoma State University imaging lab and OSU-CHS) | CC BY 4.0 | 998,660 / 387,942 / 610,718 / 970,024 | Yes, per the description (pelvis, uterus, cervix, tubes, ovaries, vagina, vulva, bladder, rectum) | MRI of a 25-year-old female | Not new: subsets of the model we already have (8c12064abe744fc7b13fe9aded2d4b02) |
| Female Reproductive and Urinary Systems (0ba41334eb384f5b999d7469f906d3ae); adult female reproductive system (94c38b5191324bc1ae1e87974cfdba58) | CVallance; Education Resource Fund | CC BY 4.0 | 525,848; 108,526 | Unknown (14 materials each, no description of parts) | Artist, no source given | Not better than the Stanford model |

Verdict: the Stanford model plus audreybyrd remain the best pelvis-topic models.

## Lower limb (`hip-thigh`, `leg-foot`, `lower-limb`, `lower-limb-joints`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DModel Lower limb, complete selection model. https://caskanatomy.info/open3dmodelfiles/lower-limb/lower-limb-glb.zip (also -obj, -blender). Viewer: https://anatomytool.org/open3dmodel-learn | Open3D project (Leiden UMC and partners) | CC BY-SA 4.0. July 2025 | Unverified | Yes | BodyParts3D remodelled; knee and hip joints reworked; all vessels and nerves new | **Better than ours** |
| Andreassen et al. 2023, 3D Models of the Visible Human Male and Female Lower Extremities. https://digitalcommons.du.edu/visiblehuman/ (paper: https://doi.org/10.1038/s41597-022-01905-2) | T.E. Andreassen, K.B. Shelburne et al., University of Denver | CC BY 4.0 | Unverified (STL: raw, smoothed and final) | Yes. 130 per subject: 76 muscles, 28 bones, 16 cartilages, 8 knee ligaments, 2 fat | VH cryosections and CT; male 39 years, female 59 years | Complementary: high-fidelity muscles and the only open female lower limb; no vessels or nerves |
| HRA Knee L and R, Ligaments of knee (female). https://humanatlas.io/3d-reference-library | HRA | CC BY 4.0 (family verified) | Unverified | Yes | VH Female | Complementary (female) |

## Whole body (`body`)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DModel Overview skeleton. https://caskanatomy.info/open3dmodelfiles/overview-skeleton/overview-skeleton-glb.zip | Open3D project | CC BY-SA 4.0. June 2025 | Unverified | Yes (bones and cartilages) | BodyParts3D remodelled | **Better than ours** for the skeleton layer |
| HRA Body, Male (united set v1.5). https://3d.nih.gov/entries/21022 | HRA | CC BY 4.0. Published on NIH 3D 8 Oct 2026 | Unverified | Yes | Visible Human Male | Not better: less detailed than BodyParts3D; male |
| CT Derived Human Skeleton. https://sketchfab.com/3d-models/7235c83248574ce986dd9e8b35159afa | Terrie Simmons-Ehrhardt (from NIH 3D, user MySegmenter) | CC BY 4.0 | 568,776 | Yes ("each bone is separated and labelled", per the author) | CT; sex not stated | Not better: costal cartilages removed, sex unknown |

## Head and neck (coming)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DModel Coloured skull, Exploded view skull, Coloured skull base. https://anatomytool.org/open3dmodel-create (e.g. https://caskanatomy.info/open3dmodelfiles/exploded-view-skull/exploded-view-skull-glb.zip) | Open3D project | CC BY-SA 4.0. 7 July 2025 | Unverified | Yes (each bone) | BodyParts3D remodelled; orbit and facial bones remodelled; ossicles added | **Better than ours** for the skull. Soft tissue of head and neck is still in progress (planned 2025–26) |
| Z-Anatomy head and neck soft tissue (Myology, Angiology, Neurology, Splanchnology). https://sketchfab.com/Z-Anatomy | Z-Anatomy | CC BY-SA 4.0 | 2–5.7M per system set | Yes | BodyParts3D | Base to build from (already licensed and on our frame) |
| HRA Eye L and R, Extraocular muscles, Mouth v1.2, Larynx, Palatine tonsils (female and male). https://3d.nih.gov/entries/3DPX-020962, https://3d.nih.gov/entries/3DPX-022826 | HRA | CC BY 4.0 (both opened) | Unverified | Yes. Eye: iris, cornea, optic nerve, extraocular muscles, ciliary artery. Mouth: gingiva, tongue, hard and soft palate, teeth, salivary ducts | Visible Human Female, partly modelled | Complementary: eye and oral detail |
| Head and Neck Anatomy for Dentistry. https://sketchfab.com/3d-models/76e6bdbfd39f40dbab847ba7c382ad60 | University of Dundee CAHID | CC BY 4.0 | 1,327,712 | No (0 annotations) | Photogrammetry of a student wax écorché | Not better |
| Anatomy of the Larynx. https://sketchfab.com/3d-models/a00bc73a303c46248db6a13a88b23404 | University of Dundee School of Medicine | CC BY-SA 4.0 | 34,735 | 6 materials | BodyParts3D derivative | Not better: same source as ours |
| Arteries of head and neck. https://sketchfab.com/3d-models/de9a1820a79d4ad19966934ffd68ed41 | Chair_Digital_Anatomy (Prof. J.F. Uhl) | CC BY 4.0 | 676,660 | No (1 material) | Angio-CT | Not better |

## Brain and neuroanatomy (coming)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| HRA Brain, Female and Brain, Male (Allen) v1.3. https://3d.nih.gov/entries/3DPX-020959, https://3d.nih.gov/entries/20960 | HRA, from the Allen Human Reference Atlas 3D 2020 (Ding et al. 2016) | CC BY 4.0 from v1.3 (both pages opened) | Unverified | Yes: 141 structures, mirrored to a whole brain and scaled to the VH bodies | ICBM 2009b MNI average MRI template | **Complementary, and better for cerebral parcellation.** No cranial nerves, so keep Z-Anatomy Neurology for those |
| HRA VH Brain (female). https://humanatlas.io/3d-reference-library | HRA | CC BY 4.0 (family verified) | Unverified | Yes. A third-party build reports 283 regions (**unverified**) | Visible Human Female | Complementary |
| Cranial Nerve Nuclei. https://sketchfab.com/3d-models/12cdb1b5e4a9424da9d24f523a3a7b98 | Medical.Gallery Graphics (scootsmalone) | CC BY 4.0 | 800,508 | Likely (43 materials), not described | Artist | Complementary for the brainstem nuclei topic |
| Spinothalamic Tract 10/13/21 (https://sketchfab.com/3d-models/9754d81f54df426aafa25b3799b5ce65), Corticospinal Tract Animation (908011c3f30946988b475f8a74fa4449), Cauda Equina (5d39455bf3c040a6ba3ab030b7b46890) | aandp | CC BY 4.0 (other versions by this author are NC) | 2,749,220 / 1,276,222 / 1,077,402 | Partly (7 materials; annotations) | Artist | Complementary for the tract topics |
| Model of a human brain. https://sketchfab.com/3d-models/fc7ae7b989f94c80a50152e71f44e47c | Science Museum | CC0 | 743,676 | No | Scan of a historical model | Not better |

## Back (coming)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| Open3DModel Typical vertebrae. https://caskanatomy.info/open3dmodelfiles/vertebrae/vertebrae-glb.zip | Open3D project | CC BY-SA 4.0. June 2025 | Unverified | Yes | BodyParts3D remodelled; facets refitted | **Better than ours** |
| Open3DModel Muscles of thorax, abdomen and back (Mar 2026); Spinal cord and surroundings (Sept 2026). https://anatomytool.org/open3dmodel-learn | Open3D project | CC BY-SA 4.0 | Unverified | Yes | BodyParts3D remodelled | Better, but **viewer only**. Request the source files |
| HRA Vertebrae, Spinal cord (female). https://3d.nih.gov/entries/3DPX-020988 | HRA | CC BY 4.0 | Unverified | Yes. About 30 spinal cord rows | VH Female (6 lumbar vertebrae) | Complementary (female) |
| Vertebral Column (https://sketchfab.com/3d-models/9ef040d718cd4c269844cc5cabf6ceaa); The human spinal column (bcd9eee09ce044ef98a69c315aa792e2) | osuecampus; scratchi | CC BY 4.0 | 561,704; 332,728 | Unknown (26 and 12 materials; no part list) | Unknown; 3ds Max artist | Not better |

## Whole female body (coming)

| Model and link | Creator | Licence (verified) | Triangles | Named parts? | Source | Verdict |
|---|---|---|---|---|---|---|
| HRA female reference organ set ("Female-united", v1.5 from 2023 onward; a third-party build cites v1.10). https://humanatlas.io/3d-reference-library; NIH 3D: https://3d.nih.gov/entries/3DPX-021627 (this page returned 404 when checked; sibling female entries opened fine); files: https://github.com/hubmapconsortium/ccf-releases/tree/main/v2.0/models | HRA (K. Browne, H. Schlehlein, K. Börner et al.) | CC BY 4.0 (every female entry opened says CC BY 4.0) | About 2.8M across 1,220 structures in a third-party build (**unverified**) | Yes. Skin, brain, eyes, mouth, larynx, lungs, heart, vessels, liver, kidneys, gut, spleen, thymus, uterus, ovaries, tubes, ligaments, vagina, bladder, mammary glands, pelvis, vertebrae, spinal cord, knees | Visible Human Female (59 years) cryosections; some parts sculpted (mammary glands, large intestine) | **Better than anything else found.** Gaps: skull, ribs, shoulder girdle, arm and foot bones, almost no muscle |
| Andreassen et al. VH Female lower extremity. https://digitalcommons.du.edu/visiblehuman/ | University of Denver | CC BY 4.0 | Unverified | Yes (130 parts) | Same VH Female subject, so it should line up with HRA (**unverified**) | Complementary: fills lower-limb muscles and bones |
| Human-Atlas (open-source viewer that already merges HRA female, Andreassen and BodyParts3D). https://github.com/slorksmo/Human-Atlas | slorksmo | Code MIT; data stated CC BY 4.0 | About 2.8M female / 2.3M male (per README) | Yes | Same sources as above | Complementary: a worked reference for assembling the female body. It borrows about 180 male bones (skull, chest, arms, feet), and its upper limbs have no muscle |
| Female Anatomy by CheRa: Muscles (https://sketchfab.com/3d-models/132188d5be9b47eabb0e64b378d81603) and Bones (dd376be43a714174b9943294f31c356d) | CheRa | CC BY 4.0 | 863,903 / 509,978 | No (11 and 7 materials) | Artist study | Not better |
| TotalSegmentator dataset v2.0.1. https://zenodo.org/records/10047292 | Wasserthal et al. | CC BY 4.0 | n/a | 117 labelled structures in 1,228 CT scans (masks, not meshes) | Clinical CT, both sexes | Raw data only: could supply specific female structures if meshed ourselves |

---

## Permissive but outside our licence list (for your decision, not recommended)

All of these use the "3D Slicer License, Part B" (BSD-style; Slicer says commercial use is allowed). Each was checked on its Open Anatomy page.
- SPL/NAC Brain Atlas (Jan 2017): more than 300 structures; MPRAGE and T2 MRI of a healthy 42-year-old male. https://www.openanatomy.org/atlas-pages/atlas-spl-nac-brain.html
- SPL Head and Neck Atlas (CT-based, 2015/2016). https://openanatomy.org/atlas-pages/atlas-spl-head-and-neck.html
- SPL Inner Ear Atlas (Feb 2018, flat-panel CT). https://www.openanatomy.org/atlas-pages/atlas-spl-inner-ear.html
- Mauritanian Anatomy Laboratory Thoracic Atlas (Jan 2021; CT of a 38-year-old male). https://www.openanatomy.org/atlas-pages/atlas-mauritania-thorax.html
- SPL Knee, Abdominal and Liver atlases (listed at https://www.openanatomy.org/atlas-pages/; licence assumed to be the same, **unverified**).

## Rejected

**Licence (NonCommercial, NoDerivatives, conflicting, or no open licence)**
- eLearningUMCG (UMC Groningen): all anatomy models (cardiac, airways, abdomen, thorax skeleton, lymphatics) are CC BY-NC-SA or CC BY-NC-ND.
- SBCVL_UCSF neuro and skull-base models (Ventricular System, FTOZ, Sphenoid, Cranial Nerves CN II–XII): CC BY-NC.
- VisibleHeartLabs (University of Minnesota) hearts and heart-lung blocs: CC BY-NC.
- University of Dundee (tilt): Larynx with Muscles and Ligaments, Pharynx and Floor of Mouth, Anatomy of the Inner Ear: CC BY-NC-SA. DundeeDental Lymphatics of head and neck: CC BY-NC-SA.
- University of Dundee "Ligaments of the Female Pelvis" (34f74adaf3ec4105b987f6162ed85eef): the metadata says CC BY 4.0 but the description says CC BY-NC-SA 4.0. Rejected because of the conflict.
- University of Dundee CAHID (anatomy_dundee): most models (skull, cranial nerves, limbic system, female pelvic floor, inner ear) are not downloadable and show no licence.
- Fischer 2023, lower-body bones from cadaver CT (Zenodo 8302449): CC BY-NC-SA 4.0.
- aandp Corticospinal Tract, Spinothalamic Tract 3.23.21, Dorsal Column, Visual Pathway, Auditory Tract: CC BY-NC.
- elvire Anatomy of crying; sykpresents lungs and larynx; siebenmedicalart kidneys: CC BY-NC-ND. aquaman27 larynx and thunderpig kidneys: CC BY-NC. stetterAnschutz larynx: CC BY-NC-SA. cristinasala kidney: CC BY-ND. balensova female body: CC BY-NC.
- Stanford "Female Reproductive Organs" (5e15cc97ef674446bf9f3e527c38d646) and gemaglob1n models: not downloadable, or "Free Standard" licence.
- NIH 3D: mitral valve case (3DPX-000581) CC BY-NC-ND; fetal skull (3DPX-003377) CC BY-NC-SA.
- Open3DModel muscle textures: CC BY-NC-SA. The models themselves are fine.

**Single mesh or no named parts**
- NIH 3D skulls (3DPX-000849 public domain, 3DPX-002545 and 3DPX-002448 CC BY) and VH Skull and Eyes (3DPX-020591, CC BY): CT shells without separate bones.
- Female Thorax with bifurcated rib (valchanov, CC BY, 2,266,678): CT, but 1 material and an anatomical variant.
- 3D Human Thorax: blood volume, skeleton, kidneys (Indiana University AVL, CC BY, 2,012,254): CT, 1 material.
- Chair_Digital_Anatomy angio-CT models (CC BY): 1 material each.
- Full Patient Heart from CT (APIL Toronto, CC BY, 4 materials, parts not named); Heart Anatomy (Dr. N. Morales Lachaume, CC BY, 1 material); Realistic Human Heart (neshallads, CC BY, artist).
- osuecampus Full Skeleton, skulls and pelvis (CC BY): no description, 1 material on the full skeleton.
- Human brain, Cerebrum and Brainstem (pranktoy) and Brain Areas (Versal), both CC BY with 1 material. RISD Nature Lab Human Brain (CC BY, 750,000; scan, not opened).
- Female Body Muscular System (Ruslan Gadzhiev, CC BY, 1 material).

**Quality or no gain over what we have**
- University of Dundee hearts (CC BY-SA) and Anatomy of the Larynx: BodyParts3D derivatives.
- Student segmentation exercises on Sketchfab (brain, tumour, femur, lungs): coursework, unreviewed.
- UNCG arm bones, Island Medical Program Articulated Knee, ebauer4 pelvis scans: bone scans only.
- Allen Human Reference Atlas 3D 2020 raw download (CC BY 4.0): label volumes, not meshes. The HRA GLB is the usable version.
- Z-Anatomy GitHub: no 2025–26 release found. Open3DModel is now the active successor.

**Not assessed**
- Embodi3D: the site returned 403 to read-only fetches. Downloads need an account and licences vary per upload.
- Meshy "anatomy" tag: AI-generated general figures, not anatomy sets.

## Next steps
1. Check the coordinate frame: load the Open3DModel upper-limb GLB beside our `upper-limb` and confirm the bones overlap before swapping.
2. Email the Open3DModel project (https://anatomytool.org/open3dmodel-contact) to ask for source files for pelvis and perineum, inguinal canal, trunk muscles and spinal cord, and to ask when the female organs will be ready.
3. For the female body: use HRA female as the base, add the Andreassen female lower limb, and decide whether borrowed male bones (skull, ribs, arms, feet) are acceptable. Human-Atlas shows that approach working.
