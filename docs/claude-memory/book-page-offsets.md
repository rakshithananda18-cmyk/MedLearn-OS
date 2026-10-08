---
name: book-page-offsets
description: "Verified PDF-index to printed-page offsets for the local BD Chaurasia and Gray's PDFs, and Gray's upper limb section map"
metadata:
  node_type: memory
  type: reference
  originSessionId: d644a0aa-dd75-4477-b27f-b2aef6c6e658
  modified: 2026-09-29T12:04:03.919Z
---

Local PDFs in books/anatomy (gitignored). Read with `pdftotext -f IDX -l IDX`.

- BD Chaurasia Vol 1 (8th ed): PDF index = printed page + 23 (verified 29 Sep 2026 from the pages' own running headers; the earlier "+22" was wrong and made batch 3–6 citations one page high). Upper limb: Ch5 back ~66–72, Ch6 scapular 73–82, Ch7 cutaneous/veins/lymph 83–92, Ch8 arm 94–110 (elbow anastomosis 101, cubital fossa 103–105), Ch9 forearm and hand 113–153 (front muscles 114–118, vessels/nerves 119–123, retinaculum 124–125, hand muscles 127–132, palm vessels/nerves 133–140, spaces/sheaths 141–143, snuffbox/extensor retinaculum 143–146, back of forearm 146–150), Ch10 joints 155–177 (SC 155, AC 156, shoulder 158, elbow 164, radioulnar 168, wrist 170, CMC 174), Ch11 surface marking 180–185 / radiology 185–187, Ch12 nerves/arteries/clinical terms 191–199, embryology 200; ossification tables in Ch2 (p 24, carpals 27).
- Gray's Anatomy for Students (4th ed): in chapter 7, printed page = PDF index − 23 (verified 29 Sep 2026 across idx 700–832; early chapters have index = printed). The earlier "−22" was wrong and shifted Batch 3–4 citations by one page.
- Gray's ch 7 Upper Limb is printed 677–825 (blueprint v0.5 wrongly says 727–840): overview 677–689, shoulder 690–704 (SC 693, AC 694, glenohumeral 695–698), posterior scapular 705–710, axilla 711–738 (plexus 727–736, lymph 737), arm 739–752, elbow joint 753–757, cubital fossa 759–760, forearm bones/radioulnar 761–766, anterior compartment 767–774, posterior 775–782, hand 783–809, surface anatomy 810–819, cases 820–825. Back chapter superficial muscles 86–91.

Build a page index with pdftotext and check citations by running headers ("Regional Anatomy • X"), not by an assumed offset. See [[medlearn-os-project]].
