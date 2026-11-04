import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  PELVIC_WALL_MEDIAL,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  SACRAL_PLEXUS_FRONT,
  TRACES,
} from './pelvis-3d';

// Pelvis batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const sacralPlexus: Topic = {
  slug: 'sacral-plexus',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'Sacral plexus and pelvic autonomic nerves',
  summary:
    'How the lumbosacral trunk and sacral ventral rami make the plexus on piriformis, its branches to the limb and perineum, the coccygeal plexus, and the pelvic sympathetic trunks, hypogastric plexuses and pelvic splanchnic nerves.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 2, Chapter 34 Walls of Pelvis: nerves of the pelvis, pages 491 to 493',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: sacral and coccygeal plexuses and visceral plexuses, pages 481 to 488',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bony pelvis, piriformis, and the sciatic, superior gluteal, pudendal and obturator nerves in the 3D view; the sacral roots and autonomic nerves are drawn as lines',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The sacral (lumbosacral) plexus is made by the lumbosacral trunk (part of L4 and all of L5) and the ventral rami of S1 to S3 and part of S4. The trunk crosses the brim in front of the sacroiliac joint to join S1.',
    'The plexus lies on the front of piriformis, outside the parietal pelvic fascia, behind the internal iliac vessels and the ureter; the superior gluteal vessels pass between the trunk and S1, the inferior gluteal vessels between S1 and S2.',
    'Its two main branches are the sciatic nerve (L4 to S3), for the limb, and the pudendal nerve (S2 to S4), for the perineum. Others: the superior gluteal (L4 to S1), inferior gluteal (L5 to S2), posterior cutaneous nerve of the thigh, and the nerves to quadratus femoris, obturator internus and piriformis.',
    'The pelvic sympathetic trunks run down the front of the sacrum medial to the anterior foramina and join in front of the coccyx at the ganglion impar.',
    'The pelvic splanchnic nerves (nervi erigentes) are the sacral parasympathetic outflow from S2 to S4; with the hypogastric nerves and branches of the sympathetic trunks they make the inferior hypogastric plexus beside the rectum, which sends plexuses to the rectum, bladder, prostate and uterus.',
  ],
  visual: {
    kind: 'path',
    // Left: the somatic plexus and its branches. Right: the autonomic nerves.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'sacral-plexus', label: 'Sacral plexus', name: 'Sacral plexus', x: 180, y: 30 },
        {
          id: 'lumbosacral-trunk',
          label: 'Lumbosacral trunk:\nL4, L5',
          name: 'Lumbosacral trunk, from L4 and L5, over the sacral ala to join S1',
          x: 85,
          y: 100,
        },
        {
          id: 'sacral-rami',
          label: 'Ventral rami S1\nto S4',
          name: 'Ventral rami of S1 to S4, from the anterior sacral foramina onto piriformis',
          x: 85,
          y: 165,
        },
        {
          id: 'sciatic-nerves',
          label: 'Sciatic: L4 to S3',
          name: 'Sciatic nerve, L4 to S3, out below piriformis to the limb',
          x: 85,
          y: 225,
        },
        {
          id: 'superior-gluteal-nerves',
          label: 'Superior gluteal:\nL4 to S1',
          name: 'Superior gluteal nerve, L4, L5, S1, out above piriformis',
          x: 85,
          y: 290,
        },
        {
          id: 'pudendal-nerves',
          label: 'Pudendal: S2 to S4',
          name: 'Pudendal nerve, S2 to S4, to the perineum',
          x: 85,
          y: 355,
        },
        {
          id: 'coccygeal-plexus',
          label: 'Coccygeal plexus',
          name: 'Coccygeal plexus, from S4, S5 and the coccygeal nerve, on coccygeus',
          x: 85,
          y: 415,
        },
        {
          id: 'sympathetic-trunk',
          label: 'Sympathetic trunks:\nganglion impar',
          name: 'Pelvic sympathetic trunks, medial to the anterior sacral foramina, joining at the ganglion impar',
          x: 275,
          y: 100,
        },
        {
          id: 'hypogastric-nerves',
          label: 'Hypogastric nerves',
          name: 'Hypogastric nerves, from the superior hypogastric plexus down to the inferior plexuses',
          x: 275,
          y: 165,
        },
        {
          id: 'pelvic-splanchnic',
          label: 'Pelvic splanchnic:\nS2 to S4',
          name: 'Pelvic splanchnic nerves (nervi erigentes), the parasympathetic outflow from S2 to S4',
          x: 275,
          y: 225,
        },
        {
          id: 'inferior-hypogastric',
          label: 'Inferior\nhypogastric plexus',
          name: 'Inferior hypogastric plexus, on each side of the rectum and the pelvic organs',
          x: 275,
          y: 290,
        },
        {
          id: 'visceral-plexuses',
          label: 'Rectal, vesical,\nprostatic plexuses',
          name: 'Rectal, vesical, prostatic and uterovaginal plexuses along the visceral arteries',
          x: 275,
          y: 355,
        },
        {
          id: 'obturator-nerves',
          label: 'Obturator nerve:\nside wall',
          name: 'Obturator nerve (lumbar plexus), along the side wall of the pelvis',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'sacral-plexus', to: 'lumbosacral-trunk' },
        { from: 'lumbosacral-trunk', to: 'sacral-rami' },
        { from: 'sacral-rami', to: 'sciatic-nerves' },
        { from: 'sciatic-nerves', to: 'superior-gluteal-nerves' },
        { from: 'superior-gluteal-nerves', to: 'pudendal-nerves' },
        { from: 'pudendal-nerves', to: 'coccygeal-plexus' },
        { from: 'sacral-plexus', to: 'sympathetic-trunk' },
        { from: 'sympathetic-trunk', to: 'hypogastric-nerves' },
        { from: 'hypogastric-nerves', to: 'pelvic-splanchnic' },
        { from: 'pelvic-splanchnic', to: 'inferior-hypogastric' },
        { from: 'inferior-hypogastric', to: 'visceral-plexuses' },
        { from: 'visceral-plexuses', to: 'obturator-nerves' },
      ],
    },
    lesions: [
      {
        id: 'sacroiliac-disease',
        label: 'Disease of the sacroiliac joint',
        nodeIds: ['lumbosacral-trunk', 'sacral-rami'],
        explanation:
          'The lumbosacral trunk (L4, L5) and the ventral ramus of S1 cross the pelvic surface of the sacroiliac joint, so disease of the joint can press on them and cause pain where they are felt below the knee: L4 on the inner leg, S1 on the outer side of the sole.',
      },
      {
        id: 'pelvic-surgery',
        label: 'Pelvic splanchnic nerve injury',
        nodeIds: ['pelvic-splanchnic', 'inferior-hypogastric'],
        explanation:
          'The pelvic splanchnic nerves and the inferior hypogastric plexus lie on each side of the rectum. Damaging them in operations on the rectum or prostate takes away the parasympathetic supply that empties the bladder and gives erection, the reason for nerve-sparing surgery.',
      },
    ],
    drill: [
      {
        id: 'somatic',
        title: 'The plexus and its branches',
        hint: 'What makes it, then its branches to the limb and the perineum, and the small plexus below it.',
        nodeIds: [
          'lumbosacral-trunk',
          'sacral-rami',
          'sciatic-nerves',
          'superior-gluteal-nerves',
          'pudendal-nerves',
          'coccygeal-plexus',
        ],
      },
      {
        id: 'autonomic',
        title: 'Autonomic nerves',
        hint: 'The sympathetic trunks and hypogastric nerves, the parasympathetic outflow, the plexus they make and its branches, then the nerve on the side wall.',
        nodeIds: [
          'sympathetic-trunk',
          'hypogastric-nerves',
          'pelvic-splanchnic',
          'inferior-hypogastric',
          'visceral-plexuses',
          'obturator-nerves',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'piriformis',
          'coccygeus',
          'levator-ani',
          'sciatic-nerves',
          'superior-gluteal-nerves',
          'pudendal-nerves',
          'obturator-nerves',
          'iliac-arteries',
          'rectum',
        ],
        ['hip-bones', 'levator-ani', 'iliac-arteries', 'rectum'],
      ),
      traces: [
        { id: 'lumbosacral-trunk', ...TRACES.lumbosacralTrunk },
        { id: 'sacral-rami', ...TRACES.sacralRami },
        { id: 'sympathetic-trunk', ...TRACES.sympatheticTrunk },
        { id: 'hypogastric-nerves', ...TRACES.hypogastricNerves },
        { id: 'pelvic-splanchnic', ...TRACES.pelvicSplanchnic },
        { id: 'inferior-hypogastric', ...TRACES.inferiorHypogastric },
      ],
      stops: [SACRAL_PLEXUS_FRONT, PELVIC_WALL_MEDIAL],
    },
  },
  lesson: [
    {
      id: 'formation',
      title: 'Formation',
      body: 'The sacral (lumbosacral) plexus is made by the lumbosacral trunk and the ventral rami of S1 to S3 and part of S4. The trunk is formed by the descending branch of L4 and the whole ventral ramus of L5; it comes down over the ala of the sacrum, crosses the pelvic brim in front of the sacroiliac joint and joins S1. L4, which helps make both the lumbar and the sacral plexuses, is the nervus furcalis. S1 and S2 are large; the sacral nerves below them get steadily smaller. Each ventral ramus takes a grey ramus communicans from the sympathetic trunk as it leaves its anterior sacral foramen.',
      focus: ['lumbosacral-trunk', 'sacral-rami'],
    },
    {
      id: 'relations',
      title: 'Relations',
      body: 'The superior gluteal vessels pass between the lumbosacral trunk and S1, and the inferior gluteal vessels between S1 and S2. The trunk and S1 lie in front of the sacroiliac joint before reaching piriformis. S2, S3 and part of S4 lie between piriformis and the pelvic fascia. The plexus itself lies on the front of piriformis, behind the internal iliac vessels and the ureter, outside the parietal pelvic fascia: so its nerves leave the pelvis without piercing that fascia, while the gluteal vessels, inside it, have to.',
      focus: ['sacral-rami'],
    },
    {
      id: 'branches',
      title: 'Branches',
      body: 'Before the rami unite they give twigs to piriformis (S1, S2), to levator ani, coccygeus and the external anal sphincter (S4), and the pelvic splanchnic nerves (S2 to S4). The plexus then gives two main nerves: the sciatic nerve (L4 to S3), for movement, its common peroneal part from the dorsal divisions and its tibial part from the ventral divisions; and the pudendal nerve (S2 to S4), for the perineum. From the dorsal divisions come the superior gluteal (L4, L5, S1), inferior gluteal (L5, S1, S2), nerve to piriformis (S1, S2) and perforating cutaneous nerve (S2, S3); from the ventral divisions, the nerves to quadratus femoris (L4, L5, S1) and obturator internus (L5, S1, S2); from both, the posterior cutaneous nerve of the thigh. The perineal branch of S4 runs on coccygeus to the external sphincter and the skin between anus and coccyx.',
      focus: ['sciatic-nerves', 'superior-gluteal-nerves', 'pudendal-nerves'],
    },
    {
      id: 'coccygeal',
      title: 'The coccygeal plexus',
      body: 'The descending branch of S4, S5 and the coccygeal nerve join on the pelvic surface of coccygeus into the small coccygeal plexus. Its anococcygeal nerves pierce the sacrotuberous ligament to the skin over the coccyx. On the side wall above, the obturator nerve of the lumbar plexus runs forwards to the obturator canal, lateral to the internal iliac artery.',
      focus: ['coccygeal-plexus', 'obturator-nerves'],
    },
    {
      id: 'autonomic',
      title: 'Autonomic nerves',
      body: 'The pelvic sympathetic trunks run down over the sacrum, medial to the anterior sacral foramina, each with four sacral ganglia, and join in front of the coccyx in the single ganglion impar. They send grey rami to every sacral and coccygeal ventral ramus, branches to the inferior hypogastric plexus and to the rectum. The inferior hypogastric plexus, on each side of the rectum and the other pelvic organs, is made by the hypogastric nerve from the superior hypogastric plexus, branches of the upper sacral ganglia and the pelvic splanchnic nerves. These nervi erigentes are the sacral parasympathetic outflow, fine filaments from the ventral rami of S2, S3 and S4; some run up through the hypogastric nerves to the colon from the hindgut. The plexus sends rectal, vesical, prostatic and uterovaginal plexuses along the visceral arteries.',
      focus: [
        'sympathetic-trunk',
        'hypogastric-nerves',
        'pelvic-splanchnic',
        'inferior-hypogastric',
        'visceral-plexuses',
      ],
    },
  ],
  questions: [
    {
      id: 'sp-trunk',
      prompt: 'The lumbosacral trunk is formed by:',
      options: [
        { id: 'l4-l5', text: 'Part of L4 and all of L5' },
        { id: 'l5-s1', text: 'L5 and S1' },
        { id: 'l3-l4', text: 'L3 and L4' },
        { id: 'l4-only', text: 'L4 alone' },
      ],
      answerId: 'l4-l5',
      explanation: 'It crosses the brim in front of the sacroiliac joint and joins S1.',
    },
    {
      id: 'sp-erigentes',
      prompt: 'The nervi erigentes arise from:',
      options: [
        { id: 'ventral-s2-4', text: 'The ventral rami of S2, S3 and S4' },
        { id: 'dorsal-s2-4', text: 'The dorsal rami of S2, S3 and S4' },
        { id: 'ventral-s1-3', text: 'The ventral rami of S1, S2 and S3' },
        { id: 'sympathetic', text: 'The sacral sympathetic ganglia' },
      ],
      answerId: 'ventral-s2-4',
      explanation: 'They are the pelvic splanchnic nerves, the sacral parasympathetic outflow.',
    },
    {
      id: 'sp-fascia',
      prompt:
        'Why do the nerves of the sacral plexus leave the pelvis without piercing the parietal pelvic fascia?',
      options: [
        { id: 'outside', text: 'They lie outside the fascia, on piriformis' },
        { id: 'inside', text: 'They lie inside the fascia, with the viscera' },
        { id: 'foramen', text: 'They leave through the obturator canal' },
        { id: 'no-fascia', text: 'There is no fascia over piriformis' },
      ],
      answerId: 'outside',
      explanation: 'The gluteal vessels lie inside the fascia and must pierce it.',
    },
    {
      id: 'sp-impar',
      prompt: 'The two pelvic sympathetic trunks end by joining in the:',
      options: [
        { id: 'impar', text: 'Ganglion impar, in front of the coccyx' },
        { id: 'superior-hypogastric', text: 'Superior hypogastric plexus' },
        { id: 'inferior-hypogastric', text: 'Inferior hypogastric plexus' },
        { id: 'coccygeal-plexus', text: 'Coccygeal plexus' },
      ],
      answerId: 'impar',
      explanation:
        'Each trunk bears four sacral ganglia before they meet in the single ganglion impar.',
    },
  ],
  cards: [
    {
      id: 'sp-formation',
      front: 'Roots of the sacral plexus?',
      back: 'The lumbosacral trunk (L4, L5) and the ventral rami of S1, S2, S3 and part of S4.',
    },
    {
      id: 'sp-gluteal-vessels',
      front: 'Which vessels separate the roots of the sacral plexus?',
      back: 'Superior gluteal vessels between the lumbosacral trunk and S1; inferior gluteal vessels between S1 and S2.',
    },
    {
      id: 'sp-main-branches',
      front: 'Two main branches of the sacral plexus?',
      back: 'Sciatic nerve (L4 to S3), for locomotion; pudendal nerve (S2 to S4), for the perineum.',
    },
    {
      id: 'sp-furcalis',
      front: 'Which nerve is the nervus furcalis, and why?',
      back: 'L4: it helps form both the lumbar and the sacral plexus.',
    },
    {
      id: 'sp-inferior-hypogastric',
      front: 'What makes the inferior hypogastric plexus?',
      back: 'The hypogastric nerve, branches from the upper sacral sympathetic ganglia and the pelvic splanchnic nerves (S2 to S4).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 34 Walls of Pelvis',
      pages: '491–493',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '481–488' },
  ],
};
