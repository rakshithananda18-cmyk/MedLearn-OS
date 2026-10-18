import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANAL_TRIANGLE_BEHIND,
  PELVIC_FLOOR,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  RECTUM_SIDE,
} from './pelvis-3d';

// Pelvis batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const analCanal: Topic = {
  slug: 'anal-canal',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The anal canal',
  summary:
    'The last 3.8 cm of the gut: its relations, its three parts inside with the pectinate and white lines, the two sphincters and the anorectal ring, and how its supply changes at the pectinate line, with piles, fissures and fistulae.',
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
      'Volume 2, Chapter 33 Rectum and Anal Canal: anal canal, pages 481 to 485',
    ),
    bookSource('grays-anatomy', 'Chapter 5 Pelvis and Perineum: anal canal, pages 452 to 454'),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail:
        'Bony pelvis, pelvic floor, anal sphincter, rectum and pudendal nerves and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'The anal canal is 3.8 cm long, from the anorectal junction (where the rectum narrows and passes through the pelvic diaphragm) down and back to the anus, about 4 cm below and in front of the tip of the coccyx. It lies in the anal triangle between the two ischioanal fossae.',
    'Inside, the upper 15 mm has 6 to 10 anal columns joined below by anal valves, which together make the pectinate line; the next 15 mm is the pecten, ending at Hilton’s white line; the last 8 mm is true skin.',
    'The internal sphincter, thickened circular smooth muscle, surrounds the upper three-quarters and is involuntary. The external sphincter, striated and voluntary, surrounds the whole length; it is supplied by the inferior rectal nerve and the perineal branch of S4.',
    'The anorectal ring, made by puborectalis, the top of the external sphincter and the internal sphincter, keeps the rectum continent: cutting it causes incontinence.',
    'The pectinate line is the watershed. Above it: hindgut endoderm, superior rectal vessels to the portal system, internal iliac nodes, autonomic nerves and painless internal piles. Below it: ectoderm, inferior rectal vessels to the systemic veins, superficial inguinal nodes, the somatic inferior rectal nerve and painful external piles.',
  ],
  visual: {
    kind: 'path',
    // Left: from the junction down through the lining. Right: the muscles, then the supply above
    // and below the pectinate line.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'anal-canal', label: 'Anal canal', name: 'Anal canal', x: 180, y: 30 },
        {
          id: 'anorectal-junction',
          label: 'Anorectal junction',
          name: 'Anorectal junction, where the rectum narrows and passes through the pelvic diaphragm',
          x: 85,
          y: 100,
        },
        {
          id: 'anal-columns',
          label: 'Upper 15 mm:\nanal columns',
          name: 'Upper 15 mm: mucous membrane with 6 to 10 anal columns',
          x: 85,
          y: 165,
        },
        {
          id: 'pectinate-line',
          label: 'Pectinate line:\nanal valves',
          name: 'Pectinate (dentate) line, made by the anal valves, with anal sinuses above them',
          x: 85,
          y: 225,
        },
        {
          id: 'pecten',
          label: 'Pecten: 15 mm',
          name: 'Pecten, the transitional zone, 15 mm of bluish lining over a venous plexus',
          x: 85,
          y: 290,
        },
        {
          id: 'white-line',
          label: 'White line of\nHilton',
          name: 'White line of Hilton, between the internal sphincter and the subcutaneous external sphincter',
          x: 85,
          y: 355,
        },
        {
          id: 'anal-skin',
          label: 'Lower 8 mm: skin',
          name: 'Lower 8 mm: true skin with sweat and sebaceous glands and hair',
          x: 85,
          y: 415,
        },
        {
          id: 'internal-sphincter',
          label: 'Internal sphincter:\ninvoluntary',
          name: 'Internal anal sphincter, thickened circular smooth muscle round the upper three-quarters',
          x: 275,
          y: 100,
        },
        {
          id: 'external-anal-sphincter',
          label: 'External sphincter:\nvoluntary',
          name: 'External anal sphincter, striated muscle round the whole canal',
          x: 275,
          y: 165,
        },
        {
          id: 'anorectal-ring',
          label: 'Anorectal ring',
          name: 'Anorectal ring: puborectalis, the top of the external sphincter and the internal sphincter',
          x: 275,
          y: 225,
        },
        {
          id: 'above-line',
          label: 'Above: superior\nrectal, portal',
          name: 'Above the pectinate line: superior rectal vessels, portal drainage, internal iliac nodes',
          x: 275,
          y: 290,
        },
        {
          id: 'below-line',
          label: 'Below: inferior\nrectal, systemic',
          name: 'Below the pectinate line: inferior rectal vessels, systemic drainage, superficial inguinal nodes',
          x: 275,
          y: 355,
        },
        {
          id: 'anal-nerves',
          label: 'Autonomic above,\nsomatic below',
          name: 'Nerves: autonomic above the pectinate line, the somatic inferior rectal nerve below it',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'anal-canal', to: 'anorectal-junction' },
        { from: 'anorectal-junction', to: 'anal-columns' },
        { from: 'anal-columns', to: 'pectinate-line' },
        { from: 'pectinate-line', to: 'pecten' },
        { from: 'pecten', to: 'white-line' },
        { from: 'white-line', to: 'anal-skin' },
        { from: 'anal-canal', to: 'internal-sphincter' },
        { from: 'internal-sphincter', to: 'external-anal-sphincter' },
        { from: 'external-anal-sphincter', to: 'anorectal-ring' },
        { from: 'anorectal-ring', to: 'above-line' },
        { from: 'above-line', to: 'below-line' },
        { from: 'below-line', to: 'anal-nerves' },
      ],
    },
    lesions: [
      {
        id: 'internal-piles',
        label: 'Internal piles',
        nodeIds: ['anal-columns', 'above-line'],
        explanation:
          'Swellings of the internal rectal venous plexus above the pectinate line: painless, as the lining there has autonomic nerves, but they bleed on straining. The primary piles lie at 3, 7 and 11 o’clock seen in the lithotomy position, where the three main radicles of the superior rectal vein run in the anal columns. Constipation, long standing, straining and portal hypertension favour them; the veins have no valves.',
      },
      {
        id: 'fissure',
        label: 'Anal fissure',
        nodeIds: ['pectinate-line', 'below-line', 'anal-nerves'],
        explanation:
          'A hard stool tears an anal valve. The tear reaches skin, which has somatic nerves, so it is very painful and throws the sphincters into spasm. External piles below the line are painful for the same reason, and do not bleed on straining.',
      },
      {
        id: 'ring-cut',
        label: 'Cutting the anorectal ring',
        nodeIds: ['anorectal-ring', 'external-anal-sphincter'],
        explanation:
          'Continence depends on the anorectal ring, felt by a finger in the canal. When abscesses or fistulae round the anus are opened, the surgeon must keep this ring intact; dividing it leaves the rectum incontinent.',
      },
    ],
    drill: [
      {
        id: 'lining',
        title: 'Down the lining',
        hint: 'From the junction, through the columns and the line they end in, the pecten and its white line, to the skin.',
        nodeIds: [
          'anorectal-junction',
          'anal-columns',
          'pectinate-line',
          'pecten',
          'white-line',
          'anal-skin',
        ],
      },
      {
        id: 'muscle-supply',
        title: 'Muscles and supply',
        hint: 'The two sphincters and the ring they make, then what changes at the pectinate line.',
        nodeIds: [
          'internal-sphincter',
          'external-anal-sphincter',
          'anorectal-ring',
          'above-line',
          'below-line',
          'anal-nerves',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          ...PELVIC_FLOOR,
          'rectum',
          'prostate',
          'internal-pudendal-vessels',
          'pudendal-nerves',
        ],
        ['hip-bones', 'obturator-internus', 'prostate'],
      ),
      traces: [],
      stops: [ANAL_TRIANGLE_BEHIND, RECTUM_SIDE],
    },
  },
  lesson: [
    {
      id: 'extent',
      title: 'Extent and relations',
      body: 'The anal canal is the last part of the gut, below the pelvic diaphragm, in the anal triangle between the right and left ischioanal fossae, whose fat lets it widen as faeces pass. It is 3.8 cm long and runs down and back from the anorectal junction, where the ampulla narrows suddenly and passes through the pelvic diaphragm (at the apex of the prostate in men), to the anus, about 4 cm below and in front of the tip of the coccyx. In front lie the perineal body, and the membranous urethra and bulb of the penis in men or the lower vagina in women; behind, the anococcygeal ligament and the coccyx. Its sphincters keep it closed as a front-to-back slit.',
      focus: ['anorectal-junction'],
    },
    {
      id: 'upper',
      title: 'The upper part',
      body: 'The upper 15 mm is lined by mucous membrane and comes from the endoderm. It has 6 to 10 vertical folds, the anal columns, which carry radicles of the superior rectal vein. Their lower ends are joined by small folds, the anal valves, each with a pocket above it, the anal sinus, into which anal glands open. The valves together make a line round the canal, the pectinate (dentate) line, opposite the middle of the internal sphincter, where the endodermal and ectodermal parts meet.',
      focus: ['anal-columns', 'pectinate-line'],
    },
    {
      id: 'lower',
      title: 'Pecten and skin',
      body: 'The next 15 mm, the pecten or transitional zone, has no columns. Its lining looks bluish over a dense venous plexus, is less mobile, and is thin stratified squamous epithelium with no sweat glands. Its lower limit is often whitish, the white line of Hilton, at the gap between the lower edge of the internal sphincter and the subcutaneous part of the external sphincter. The last 8 mm is true skin, with sweat and sebaceous glands and hair.',
      focus: ['pecten', 'white-line', 'anal-skin'],
    },
    {
      id: 'sphincters',
      title: 'Sphincters and the ring',
      body: 'The internal sphincter is the thickened circular muscle of the gut, involuntary, round the upper 30 mm down to the white line: sympathetic nerves contract it and parasympathetic nerves relax it. The external sphincter is striated and voluntary, round the whole canal, with subcutaneous, superficial and deep parts that work as one; only its middle fibres are fixed to bone, through the anococcygeal ligament to the coccyx, and to the perineal body in front. The inferior rectal nerve and the perineal branch of S4 supply it. Between the two sphincters lies the conjoint longitudinal coat, from puborectalis and the rectal muscle. At the anorectal junction, puborectalis, the top of the external sphincter and the internal sphincter make the anorectal ring.',
      focus: ['internal-sphincter', 'external-anal-sphincter', 'anorectal-ring'],
    },
    {
      id: 'watershed',
      title: 'The pectinate line divides it',
      body: 'Above the pectinate line the canal is supplied by the superior rectal artery and drains through the internal rectal venous plexus to the superior rectal vein and the portal system; its lymph goes with the rectum’s to the internal iliac nodes; its nerves are autonomic, sensitive to stretch and spasm but not to cutting. Below it the inferior rectal arteries supply it, the veins drain through the inferior rectal veins to the systemic circulation, lymph goes to the medial superficial inguinal nodes, and the somatic inferior rectal nerve makes it sensitive to pain, touch and temperature. The internal plexus joins the portal and systemic veins: a site of portosystemic anastomosis.',
      focus: ['above-line', 'below-line', 'anal-nerves'],
    },
  ],
  questions: [
    {
      id: 'ac-length',
      prompt: 'The length of the anal canal is about:',
      options: [
        { id: '3-8', text: '3.8 cm' },
        { id: '1-5', text: '1.5 cm' },
        { id: '7-5', text: '7.5 cm' },
        { id: '12', text: '12 cm' },
      ],
      answerId: '3-8',
      explanation:
        'From the anorectal junction to the anus: 15 mm above the pectinate line, 15 mm of pecten, 8 mm of skin.',
    },
    {
      id: 'ac-piles',
      prompt: 'Internal piles are painless because they lie:',
      options: [
        { id: 'above', text: 'Above the pectinate line, with autonomic nerves' },
        { id: 'below', text: 'Below the pectinate line, with somatic nerves' },
        { id: 'muscle', text: 'Within the external sphincter' },
        { id: 'skin', text: 'In the perianal skin' },
      ],
      answerId: 'above',
      explanation:
        'The lining above the line is supplied by autonomic nerves, which do not carry the pain of cutting or stretching it.',
    },
    {
      id: 'ac-ring',
      prompt: 'Which of these does NOT form the anorectal ring?',
      options: [
        { id: 'conjoint', text: 'The conjoint longitudinal coat' },
        { id: 'puborectalis', text: 'Puborectalis' },
        { id: 'internal', text: 'The internal sphincter' },
        { id: 'deep-external', text: 'The deep external sphincter' },
      ],
      answerId: 'conjoint',
      explanation:
        'The ring is puborectalis, the uppermost external sphincter and the internal sphincter; the conjoint coat lies between the sphincters.',
    },
    {
      id: 'ac-lymph',
      prompt: 'Lymph from the anal canal below the pectinate line drains to the:',
      options: [
        { id: 'inguinal', text: 'Superficial inguinal nodes' },
        { id: 'internal-iliac', text: 'Internal iliac nodes' },
        { id: 'inferior-mesenteric', text: 'Inferior mesenteric nodes' },
        { id: 'sacral', text: 'Sacral nodes' },
      ],
      answerId: 'inguinal',
      explanation:
        'The medial group of the superficial inguinal nodes; above the line it goes to the internal iliac nodes.',
    },
  ],
  cards: [
    {
      id: 'ac-parts',
      front: 'The three parts of the anal canal inside?',
      back: 'Upper 15 mm (anal columns, mucous); middle 15 mm (pecten, transitional); lower 8 mm (true skin).',
    },
    {
      id: 'ac-hilton',
      front: 'Where is the white line of Hilton?',
      back: 'At the lower limit of the pecten, between the lower border of the internal sphincter and the subcutaneous external sphincter.',
    },
    {
      id: 'ac-piles-position',
      front: 'Positions of the primary internal piles?',
      back: '3, 7 and 11 o’clock in the lithotomy position: left lateral, right posterior and right anterior.',
    },
    {
      id: 'ac-external-nerve',
      front: 'Nerves of the external anal sphincter?',
      back: 'The inferior rectal nerve and the perineal branch of the fourth sacral nerve.',
    },
    {
      id: 'ac-development',
      front: 'Development of the anal canal?',
      back: 'Upper 15 mm from the hindgut (primitive anorectal canal, endoderm); lower 23 mm from the proctodaeum (ectoderm).',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 33 Rectum and Anal Canal',
      pages: '481–485',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '452–454' },
  ],
};
