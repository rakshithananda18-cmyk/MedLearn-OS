import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  KIDNEYS_BACK,
  POSTERIOR_WALL,
  POSTERIOR_WALL_FRONT,
  QUADRATUS_LUMBORUM_PATHS,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 5 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const posteriorAbdominalWall: Topic = {
  slug: 'posterior-abdominal-wall',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Muscles of the posterior abdominal wall',
  summary:
    'Psoas major and minor, iliacus and quadratus lumborum: their attachments, nerves and actions, what lies on psoas, the psoas sheath and abscess, and the three layers of the thoracolumbar fascia.',
  estimatedMinutes: 13,
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
      'Volume 2, Chapter 27 Posterior Abdominal Wall: muscles and thoracolumbar fascia, pages 399 to 402',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: posterior abdominal wall, pages 367 to 369; psoas abscess, page 371',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Psoas, iliacus, the thoracolumbar fascia and the skeleton in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Psoas major arises from the sides of the bodies of T12 to L5 and their discs, by five slips with tendinous arches between them over the lumbar vessels, and from the lumbar transverse processes. It runs down along the pelvic brim, behind the inguinal ligament and in front of the hip joint, to the lesser trochanter, joined by iliacus on its lateral side: iliopsoas.',
    'Iliacus: upper two-thirds of the iliac fossa, inner lip of the crest, sacroiliac and iliolumbar ligaments and the sacral ala, to the psoas tendon and the lesser trochanter. Psoas minor, often absent: T12 and L1 to the pecten pubis and iliopubic eminence. Quadratus lumborum: L5 transverse process, iliolumbar ligament and iliac crest, up to the upper four lumbar transverse processes and the medial half of the twelfth rib.',
    'Nerves: psoas major from L2 and L3 (BD; Gray’s says L1 to L3), psoas minor from L1, iliacus from the femoral nerve, quadratus lumborum from T12 to L4. Iliopsoas is the chief flexor of the hip, as in sitting up from lying, and one psoas bends the trunk to its side. Quadratus lumborum fixes the twelfth rib for the diaphragm and bends the spine sideways; both together extend it.',
    'On psoas lie the medial arcuate ligament, kidney and ureter, renal and gonadal vessels, genitofemoral nerve, the IVC and terminal ileum on the right and the colon on the left. The lumbar plexus forms inside it. Along its medial edge: the sympathetic chain, aortic nodes, IVC or aorta, and the external iliac vessels at the brim.',
    'Thoracolumbar fascia has three layers in the loin: posterior, from the lumbar and sacral spines behind erector spinae; middle, from the tips of the transverse processes, between erector spinae and quadratus lumborum; anterior, from the front of the transverse processes over quadratus lumborum, thickened above as the lateral arcuate ligament. The middle and anterior meet at the lateral border of quadratus lumborum.',
  ],
  visual: {
    kind: 'path',
    // Left: the four muscles and what they do. Right: what lies on psoas and the fascia.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'posterior-wall',
          label: 'Posterior wall muscles',
          name: 'Muscles of the posterior abdominal wall',
          x: 180,
          y: 30,
        },
        {
          id: 'psoas-major',
          label: 'Psoas major: T12\nto L5',
          name: 'Psoas major, from T12 to L5, their discs and transverse processes',
          x: 85,
          y: 100,
        },
        {
          id: 'psoas-minor',
          label: 'Psoas minor: to\npecten pubis',
          name: 'Psoas minor, from T12 and L1 to the pecten pubis (often absent)',
          x: 85,
          y: 165,
        },
        {
          id: 'iliacus',
          label: 'Iliacus: iliac\nfossa',
          name: 'Iliacus, from the iliac fossa',
          x: 85,
          y: 230,
        },
        {
          id: 'lesser-trochanter',
          label: 'Iliopsoas to\nlesser trochanter',
          name: 'Psoas and iliacus together to the lesser trochanter',
          x: 85,
          y: 295,
        },
        {
          id: 'quadratus-lumborum',
          label: 'Quadratus: crest\nto rib 12',
          name: 'Quadratus lumborum, from the iliac crest up to the twelfth rib',
          x: 85,
          y: 355,
        },
        {
          id: 'actions',
          label: 'Flex hip; fix\nrib 12',
          name: 'Actions: iliopsoas flexes the hip; quadratus lumborum fixes the twelfth rib',
          x: 85,
          y: 415,
        },
        {
          id: 'on-psoas',
          label: 'On psoas: kidney,\nureter, vessels',
          name: 'On psoas: kidney, ureter, renal and gonadal vessels, genitofemoral nerve',
          x: 275,
          y: 100,
        },
        {
          id: 'lumbar-plexus',
          label: 'Inside: lumbar\nplexus',
          name: 'Inside psoas: the lumbar plexus',
          x: 275,
          y: 165,
        },
        {
          id: 'medial-edge',
          label: 'Medial edge:\nsympathetic chain',
          name: 'Along its medial edge: the sympathetic chain, aortic nodes, IVC or aorta',
          x: 275,
          y: 230,
        },
        {
          id: 'psoas-sheath',
          label: 'Psoas sheath',
          name: 'Psoas sheath: fascia attached to the bodies, discs and tendinous arches',
          x: 275,
          y: 290,
        },
        {
          id: 'thoracolumbar-fascia',
          label: 'Thoracolumbar\nfascia: 3 layers',
          name: 'Thoracolumbar fascia: posterior, middle and anterior layers',
          x: 275,
          y: 350,
        },
        {
          id: 'lateral-arcuate',
          label: 'Anterior layer:\nlateral arcuate',
          name: 'The anterior layer, thickened above as the lateral arcuate ligament',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'posterior-wall', to: 'psoas-major' },
        { from: 'psoas-major', to: 'psoas-minor' },
        { from: 'psoas-minor', to: 'iliacus' },
        { from: 'iliacus', to: 'lesser-trochanter' },
        { from: 'lesser-trochanter', to: 'quadratus-lumborum' },
        { from: 'quadratus-lumborum', to: 'actions' },
        { from: 'posterior-wall', to: 'on-psoas' },
        { from: 'on-psoas', to: 'lumbar-plexus' },
        { from: 'lumbar-plexus', to: 'medial-edge' },
        { from: 'medial-edge', to: 'psoas-sheath' },
        { from: 'psoas-sheath', to: 'thoracolumbar-fascia' },
        { from: 'thoracolumbar-fascia', to: 'lateral-arcuate' },
      ],
    },
    lesions: [
      {
        id: 'psoas-abscess',
        label: 'Psoas abscess',
        nodeIds: ['psoas-sheath', 'psoas-major'],
        explanation:
          'Psoas arises from the discs, so pus from tuberculosis of the lower thoracic or lumbar spine can enter its sheath and track down inside it, under the inguinal ligament, to a soft swelling in the femoral triangle, with a history of back pain.',
      },
      {
        id: 'neck-femur',
        label: 'Broken neck of femur',
        nodeIds: ['lesser-trochanter', 'actions'],
        explanation:
          'After a fracture of the neck of the femur the limb lies rolled outwards; the pull of psoas on the lesser trochanter, now free of the head, helps produce this posture.',
      },
      {
        id: 'psoas-sign',
        label: 'Psoas sign',
        nodeIds: ['on-psoas', 'psoas-major'],
        explanation:
          'An inflamed appendix or abscess lying on the right psoas makes the patient keep the hip bent; stretching the muscle by extending the hip hurts.',
      },
    ],
    drill: [
      {
        id: 'muscles',
        title: 'The four muscles',
        hint: 'Psoas major and minor, iliacus, where they meet, quadratus lumborum, then what they do.',
        nodeIds: [
          'psoas-major',
          'psoas-minor',
          'iliacus',
          'lesser-trochanter',
          'quadratus-lumborum',
          'actions',
        ],
      },
      {
        id: 'relations',
        title: 'Psoas and the fascia',
        hint: 'On it, in it, beside it, round it, then the layers of the fascia.',
        nodeIds: [
          'on-psoas',
          'lumbar-plexus',
          'medial-edge',
          'psoas-sheath',
          'thoracolumbar-fascia',
          'lateral-arcuate',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [...POSTERIOR_WALL, 'thoracolumbar-fascia', 'kidneys', 'ureters', 'lumbar-arteries'],
        ['kidneys', 'diaphragm'],
      ),
      traces: [{ id: 'quadratus-lumborum', kind: 'outline', paths: QUADRATUS_LUMBORUM_PATHS }],
      stops: [POSTERIOR_WALL_FRONT, KIDNEYS_BACK],
    },
  },
  lesson: [
    {
      id: 'psoas',
      title: 'Psoas major',
      body: 'A long spindle-shaped muscle beside the lumbar spine. It arises from the sides of the bodies of T12 to L5 and their discs by five slips, with four tendinous arches between them over the narrow waists of the bodies, where the lumbar vessels and sympathetic rami pass; and from the front and lower borders of the lumbar transverse processes. It runs down along the pelvic brim, passes behind the inguinal ligament in front of the hip joint, and ends on the lesser trochanter, taking iliacus into its lateral side.',
      focus: ['psoas-major', 'lesser-trochanter'],
    },
    {
      id: 'others',
      title: 'Iliacus, psoas minor, quadratus lumborum',
      body: 'Iliacus fills the upper two-thirds of the iliac fossa and also arises from the inner lip of the crest, the front of the sacroiliac and iliolumbar ligaments and the sacral ala; it joins the psoas tendon and reaches the lesser trochanter and the bone below it. Psoas minor, often missing, lies on psoas major, from T12 and L1 to the pecten pubis. Quadratus lumborum is a flat sheet from the L5 transverse process, iliolumbar ligament and 5 cm of the iliac crest up to the tips of the upper four lumbar transverse processes and the medial half of the twelfth rib.',
      focus: ['iliacus', 'psoas-minor', 'quadratus-lumborum'],
    },
    {
      id: 'actions',
      title: 'Nerves and actions',
      body: 'Psoas major is supplied by branches of L2 and L3 (BD; Gray’s gives L1 to L3), psoas minor by L1, iliacus by the femoral nerve, quadratus lumborum by T12 to L4. Iliopsoas is the strongest flexor of the hip, lifting the trunk from lying to sitting, and steadies the hip and trunk when sitting; one psoas bends the trunk to its own side. Quadratus lumborum holds the twelfth rib down so the diaphragm pulls on a fixed base, bends the spine to its side, and with its fellow extends the lumbar spine.',
      focus: ['actions'],
    },
    {
      id: 'relations',
      title: 'What lies on and beside psoas',
      body: 'Its upper end lies behind the medial arcuate ligament in the lowest part of the thorax. In the abdomen, on its front lie the kidney and ureter, the renal and gonadal vessels, the genitofemoral nerve, psoas minor, and the IVC and terminal ileum on the right or the colon on the left. The lumbar plexus lies within it, its branches emerging at its borders and front. Along its medial edge run the sympathetic chain, the aortic nodes, the IVC or aorta, and at the brim the external iliac vessels. In the thigh it lies in front of the hip joint with a bursa between.',
      focus: ['on-psoas', 'lumbar-plexus', 'medial-edge'],
    },
    {
      id: 'sheath',
      title: 'Psoas sheath',
      body: 'The psoas fascia forms a closed sheath: attached medially to the vertebral bodies, discs and tendinous arches, laterally blending with the anterior layer of thoracolumbar fascia, thickened above as the medial arcuate ligament, and continuous below with the fascia iliaca. Infection that starts in a disc or vertebral body can fill the sheath and follow it down into the thigh.',
      focus: ['psoas-sheath'],
    },
    {
      id: 'fascia',
      title: 'Thoracolumbar fascia',
      body: 'It wraps the deep muscles of the back in three layers, the posterior thickest. The posterior layer runs from the lumbar and sacral spines over erector spinae to the back of the thorax and the iliac crest. The middle layer runs from the tips of the transverse processes to the twelfth rib and the crest, between erector spinae and quadratus lumborum. The anterior layer covers the front of quadratus lumborum, from the front of the transverse processes to the crest, and is thickened above as the lateral arcuate ligament. The layers fuse at the lateral borders of the muscles, giving origin to transversus abdominis and internal oblique.',
      focus: ['thoracolumbar-fascia', 'lateral-arcuate'],
    },
  ],
  questions: [
    {
      id: 'pw-qlumborum',
      prompt: 'Quadratus lumborum is inserted into the:',
      options: [
        { id: 'rib-twelve', text: 'Twelfth rib and upper four lumbar transverse processes' },
        { id: 'crest', text: 'Iliac crest and iliolumbar ligament' },
        { id: 'trochanter', text: 'Lesser trochanter' },
        { id: 'pecten', text: 'Pecten pubis' },
      ],
      answerId: 'rib-twelve',
      explanation:
        'It arises below, from the crest, iliolumbar ligament and L5 transverse process.',
    },
    {
      id: 'pw-iliacus-nerve',
      prompt: 'Iliacus is supplied by the:',
      options: [
        { id: 'femoral', text: 'Femoral nerve' },
        { id: 'obturator', text: 'Obturator nerve' },
        { id: 'ilioinguinal', text: 'Ilioinguinal nerve' },
        { id: 'direct', text: 'Direct branches of L1' },
      ],
      answerId: 'femoral',
      explanation: 'Psoas major takes direct branches of the lumbar rami.',
    },
    {
      id: 'pw-fascia-layers',
      prompt: 'Which is not a layer of the thoracolumbar fascia?',
      options: [
        { id: 'medial', text: 'Medial layer' },
        { id: 'anterior', text: 'Anterior layer' },
        { id: 'middle', text: 'Middle layer' },
        { id: 'posterior', text: 'Posterior layer' },
      ],
      answerId: 'medial',
      explanation: 'Posterior, middle and anterior.',
    },
    {
      id: 'pw-abscess',
      prompt:
        'Pus from tuberculosis of the lumbar spine tracking in the psoas sheath appears in the:',
      options: [
        { id: 'femoral-triangle', text: 'Femoral triangle' },
        { id: 'popliteal', text: 'Popliteal fossa' },
        { id: 'gluteal', text: 'Gluteal region' },
        { id: 'scrotum', text: 'Scrotum' },
      ],
      answerId: 'femoral-triangle',
      explanation: 'The sheath follows the muscle behind the inguinal ligament into the thigh.',
    },
  ],
  cards: [
    {
      id: 'pw-psoas-origin',
      front: 'Origin of psoas major?',
      back: 'Sides of T12 to L5 bodies and discs (5 slips, 4 tendinous arches between) and the lumbar transverse processes.',
    },
    {
      id: 'pw-ql',
      front: 'Attachments of quadratus lumborum?',
      back: 'From the L5 transverse process, iliolumbar ligament and iliac crest to the upper four lumbar transverse processes and the medial half of rib 12.',
    },
    {
      id: 'pw-nerves',
      front: 'Nerves of the posterior abdominal wall muscles?',
      back: 'Psoas major: L2, L3 (Gray’s L1 to L3). Psoas minor: L1. Iliacus: femoral nerve. Quadratus lumborum: T12 to L4.',
    },
    {
      id: 'pw-on-psoas',
      front: 'Structures on the front of psoas major?',
      back: 'Medial arcuate ligament, kidney, ureter, renal and gonadal vessels, genitofemoral nerve, psoas minor; IVC and ileum (right), colon (left).',
    },
    {
      id: 'pw-tlf',
      front: 'Layers of the thoracolumbar fascia?',
      back: 'Posterior (spines, behind erector spinae), middle (transverse process tips), anterior (front of transverse processes, over quadratus lumborum; lateral arcuate ligament).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 27 Posterior Abdominal Wall',
      pages: '399–402',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '367–369, 371' },
  ],
};
