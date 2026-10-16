import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANAL_TRIANGLE_BEHIND,
  PELVIC_FLOOR,
  PELVIS_MODEL_CREDIT,
  PELVIS_MODEL_SRC,
  PELVIS_SKELETON,
  pelvisParts,
  PERINEUM_BELOW,
  TRACES,
} from './pelvis-3d';

// Pelvis batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const ischioanalFossa: Topic = {
  slug: 'ischioanal-fossa',
  subjectSlug: 'anatomy',
  regions: ['pelvis'],
  title: 'The ischioanal fossa',
  summary:
    'The wedge of fat on each side of the anal canal: its walls and recesses, its two spaces and the lunate fascia, the pudendal canal in its side wall, what crosses it, and why abscesses here behave as they do.',
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
      'Volume 2, Chapter 28 Perineum: anal region and ischioanal fossa, pages 410 to 414',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 5 Pelvis and Perineum: anal triangle and ischio-anal fossae, pages 498 to 500',
    ),
    {
      title: 'BodyParts3D (DBCLS) and Z-Anatomy',
      detail: 'Pelvic floor, sphincter, side walls and pudendal nerves and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 (files marked CC BY-SA 2.1 JP); Z-Anatomy CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'A wedge-shaped space on each side of the anal canal below the pelvic diaphragm, about 5 cm long, 2.5 cm wide and 5 to 6 cm deep. Its base is the skin of the perineum; its apex is the line where the obturator fascia meets the fascia under levator ani, along the origin of levator ani.',
    'Lateral wall, vertical: obturator internus with its fascia, and the ischial tuberosity below; the pudendal canal runs in it. Medial wall, sloping down and in: levator ani with the anal fascia above, the external anal sphincter below. In front: the back edge of the perineal membrane. Behind: gluteus maximus and the sacrotuberous ligament.',
    'Recesses: the anterior runs forward above the perineal membrane almost to the back of the pubis, beside the prostate or vagina; the smaller posterior runs deep to the sacrotuberous ligament; the horseshoe recess joins the two fossae behind the anal canal.',
    'The perianal fascia separates a shallow perianal space, its fat in small tight loculi, from the deep ischioanal space, its fat in large loose loculi. The lunate fascia arches over the ischioanal fat from the pudendal canal to the sphincter.',
    'Contents: the ischioanal fat; the inferior rectal nerve and vessels, crossing from lateral to medial to the sphincter, the lining below the pectinate line and the skin round the anus; the pudendal canal with its nerve and vessels; the posterior scrotal or labial nerves and vessels; the perineal branch of S4; the perforating cutaneous branches of S2 and S3.',
  ],
  visual: {
    kind: 'path',
    // Left: the walls and recesses. Right: its spaces and contents.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'ischioanal-fossa',
          label: 'Ischioanal fossa',
          name: 'Ischioanal fossa',
          x: 180,
          y: 30,
        },
        {
          id: 'apex',
          label: 'Apex: origin of\nlevator ani',
          name: 'Apex: where the obturator fascia meets the fascia under levator ani',
          x: 85,
          y: 100,
        },
        {
          id: 'obturator-internus',
          label: 'Lateral: obturator\ninternus',
          name: 'Lateral wall: obturator internus and fascia, ischial tuberosity',
          x: 85,
          y: 165,
        },
        {
          id: 'levator-ani',
          label: 'Medial: levator\nani',
          name: 'Medial wall above: levator ani with the anal fascia',
          x: 85,
          y: 230,
        },
        {
          id: 'external-anal-sphincter',
          label: 'Medial below:\nsphincter',
          name: 'Medial wall below: the external anal sphincter',
          x: 85,
          y: 295,
        },
        {
          id: 'gluteus-maximus',
          label: 'Perineal membrane;\ngluteus maximus',
          name: 'In front: the perineal membrane; behind: gluteus maximus and the sacrotuberous ligament',
          x: 85,
          y: 355,
        },
        {
          id: 'recesses',
          label: 'Anterior, posterior,\nhorseshoe',
          name: 'Recesses: anterior, posterior and horseshoe',
          x: 85,
          y: 415,
        },
        {
          id: 'perianal-space',
          label: 'Perianal space:\ntight fat',
          name: 'Perianal space: fat in small tight loculi',
          x: 275,
          y: 100,
        },
        {
          id: 'ischioanal-space',
          label: 'Ischioanal space:\nloose fat',
          name: 'Ischioanal space: fat in large loose loculi',
          x: 275,
          y: 165,
        },
        {
          id: 'lunate-fascia',
          label: 'Lunate fascia',
          name: 'Lunate fascia, arching over the ischioanal fat',
          x: 275,
          y: 225,
        },
        {
          id: 'internal-pudendal-vessels',
          label: 'Pudendal canal',
          name: 'Pudendal canal in the lateral wall: pudendal nerve and internal pudendal vessels',
          x: 275,
          y: 290,
        },
        {
          id: 'inferior-rectal',
          label: 'Inferior rectal\nnerve, vessels',
          name: 'Inferior rectal nerve and vessels, crossing from lateral to medial',
          x: 275,
          y: 355,
        },
        {
          id: 'other-nerves',
          label: 'Scrotal nerves,\nS2 to S4 twigs',
          name: 'Posterior scrotal or labial nerves, the perineal branch of S4, perforating branches of S2 and S3',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'ischioanal-fossa', to: 'apex' },
        { from: 'apex', to: 'obturator-internus' },
        { from: 'obturator-internus', to: 'levator-ani' },
        { from: 'levator-ani', to: 'external-anal-sphincter' },
        { from: 'external-anal-sphincter', to: 'gluteus-maximus' },
        { from: 'gluteus-maximus', to: 'recesses' },
        { from: 'ischioanal-fossa', to: 'perianal-space' },
        { from: 'perianal-space', to: 'ischioanal-space' },
        { from: 'ischioanal-space', to: 'lunate-fascia' },
        { from: 'lunate-fascia', to: 'internal-pudendal-vessels' },
        { from: 'internal-pudendal-vessels', to: 'inferior-rectal' },
        { from: 'inferior-rectal', to: 'other-nerves' },
      ],
    },
    lesions: [
      {
        id: 'abscess',
        label: 'Abscesses',
        nodeIds: ['perianal-space', 'ischioanal-space', 'recesses'],
        explanation:
          'Both spaces are common sites of abscess. In the perianal space the fat is held in small tight loculi, so swelling raises the tension and the pain is severe; in the ischioanal space the loculi are large and loose, so it can swell with less pain. Through the horseshoe recess an abscess on one side can spread to the other.',
      },
      {
        id: 'fistula',
        label: 'Fistula in ano',
        nodeIds: ['ischioanal-space', 'external-anal-sphincter'],
        explanation:
          'An abscess that bursts both into the anal canal, usually at an anal crypt, and onto the skin leaves a track between them: an ischioanal fistula in ano. If it bursts only outside and does not heal, a blind sinus remains.',
      },
      {
        id: 'prolapse',
        label: 'Loss of the fat pad',
        nodeIds: ['ischioanal-space', 'levator-ani'],
        explanation:
          'The ischioanal fat cushions and supports the rectum and anal canal, yet lets them stretch at defaecation. When it wastes, as in children with chronic diarrhoea, the rectum can prolapse.',
      },
    ],
    drill: [
      {
        id: 'walls',
        title: 'Walls and recesses',
        hint: 'From the apex, the lateral and medial walls, front and back, then the recesses.',
        nodeIds: [
          'apex',
          'obturator-internus',
          'levator-ani',
          'external-anal-sphincter',
          'gluteus-maximus',
          'recesses',
        ],
      },
      {
        id: 'contents',
        title: 'Spaces and contents',
        hint: 'The two spaces and the fascia between, then the canal and what crosses the fossa.',
        nodeIds: [
          'perianal-space',
          'ischioanal-space',
          'lunate-fascia',
          'internal-pudendal-vessels',
          'inferior-rectal',
          'other-nerves',
        ],
      },
    ],
    model3d: {
      src: PELVIS_MODEL_SRC,
      credit: PELVIS_MODEL_CREDIT,
      parts: pelvisParts(
        [
          ...PELVIS_SKELETON,
          'gluteus-maximus',
          ...PELVIC_FLOOR,
          'rectum',
          'internal-pudendal-vessels',
          'pudendal-nerves',
        ],
        ['gluteus-maximus', 'obturator-internus'],
      ),
      traces: [{ id: 'ischioanal-fossa', ...TRACES.ischioanalFossa }],
      stops: [ANAL_TRIANGLE_BEHIND, PERINEUM_BELOW],
    },
  },
  lesson: [
    {
      id: 'shape',
      title: 'Shape and size',
      body: 'Each ischioanal (ischiorectal) fossa is a wedge of fat on one side of the anal canal, below the pelvic diaphragm, about 5 cm from front to back, 2.5 cm across and 5 to 6 cm deep. Its base faces down to the skin of the perineum; its sharp apex points up, where the obturator fascia meets the fascia on the underside of levator ani, along the line from which levator ani arises.',
      focus: ['apex'],
    },
    {
      id: 'walls',
      title: 'Walls',
      body: 'The lateral wall is vertical: obturator internus covered by its fascia, and below it the medial surface of the ischial tuberosity; the pudendal canal runs along it. The medial wall slopes down and in: levator ani with the anal fascia above, the external anal sphincter below. In front the fossa is limited by the back edge of the perineal membrane; behind, by the lower border of gluteus maximus and the sacrotuberous ligament.',
      focus: ['obturator-internus', 'levator-ani', 'external-anal-sphincter', 'gluteus-maximus'],
    },
    {
      id: 'recesses',
      title: 'Recesses',
      body: 'The fossa reaches beyond these limits in three places. The anterior recess runs forward above the perineal membrane almost to the back of the pubis, close to the prostate or vagina. The small posterior recess runs deep to the sacrotuberous ligament. The horseshoe recess joins the two fossae behind the anal canal.',
      focus: ['recesses'],
    },
    {
      id: 'spaces',
      title: 'Spaces and fascia',
      body: 'The perianal fascia runs out from the lower end of the anal canal’s longitudinal coat to the pudendal canal, cutting off a shallow perianal space below from the deep ischioanal space. In the perianal space the fat lies in small loculi with complete septa; in the ischioanal space, in large loculi with delicate incomplete septa. The lunate fascia arches over the ischioanal fat from the pudendal canal to the deep sphincter, dividing it into a space above and one below.',
      focus: ['perianal-space', 'ischioanal-space', 'lunate-fascia'],
    },
    {
      id: 'contents',
      title: 'Contents',
      body: 'Besides the fat, the pudendal canal runs in its lateral wall with the pudendal nerve and internal pudendal vessels. The inferior rectal nerve and vessels leave the canal, cross the fossa from lateral to medial, arching above the fat, and supply the external sphincter, the lining of the canal below the pectinate line and the skin round the anus. The posterior scrotal or labial nerves and vessels cross its front part; the perineal branch of S4 enters behind; perforating branches of S2 and S3 appear at the lower border of gluteus maximus.',
      focus: ['internal-pudendal-vessels', 'inferior-rectal', 'other-nerves'],
    },
    {
      id: 'clinic',
      title: 'In the clinic',
      body: 'The fossae let the rectum and anal canal widen as faeces pass. Both spaces are common sites of abscess, which may burst into the canal, onto the skin, or both, leaving a fistula. Rarely a gap between the tendinous origin of levator ani and the obturator fascia (the hiatus of Schwalbe) lets pelvic organs herniate into the fossa.',
      focus: ['ischioanal-space'],
    },
  ],
  questions: [
    {
      id: 'ia-not-content',
      prompt: 'Which is not a content of the ischioanal fossa?',
      options: [
        { id: 'middle-rectal', text: 'Middle rectal vessels' },
        { id: 'inferior-rectal', text: 'Inferior rectal nerve and vessels' },
        { id: 'pudendal', text: 'Pudendal nerve and internal pudendal vessels' },
        { id: 'fat', text: 'Ischioanal pad of fat' },
      ],
      answerId: 'middle-rectal',
      explanation: 'The middle rectal vessels lie above the pelvic floor.',
    },
    {
      id: 'ia-lateral-wall',
      prompt: 'The lateral wall of the ischioanal fossa is formed by:',
      options: [
        { id: 'obturator', text: 'Obturator internus and its fascia' },
        { id: 'levator', text: 'Levator ani' },
        { id: 'sphincter', text: 'External anal sphincter' },
        { id: 'gluteus', text: 'Gluteus maximus' },
      ],
      answerId: 'obturator',
      explanation: 'With the ischial tuberosity below; the pudendal canal runs in it.',
    },
    {
      id: 'ia-horseshoe',
      prompt: 'An abscess spreads from one ischioanal fossa to the other through the:',
      options: [
        { id: 'horseshoe', text: 'Horseshoe recess' },
        { id: 'anterior', text: 'Anterior recess' },
        { id: 'pudendal', text: 'Pudendal canal' },
        { id: 'perianal', text: 'Perianal space' },
      ],
      answerId: 'horseshoe',
      explanation: 'It joins the two fossae behind the anal canal.',
    },
    {
      id: 'ia-painful',
      prompt: 'A perianal abscess is more painful than an ischioanal one because its fat lies in:',
      options: [
        { id: 'small-tight', text: 'Small loculi with complete septa' },
        { id: 'large-loose', text: 'Large loculi with incomplete septa' },
        { id: 'no-septa', text: 'A single space with no septa' },
        { id: 'muscle', text: 'The external sphincter' },
      ],
      answerId: 'small-tight',
      explanation: 'Swelling in tight loculi raises the tension.',
    },
  ],
  cards: [
    {
      id: 'ia-walls',
      front: 'Walls of the ischioanal fossa?',
      back: 'Lateral: obturator internus and fascia, ischial tuberosity. Medial: levator ani, external anal sphincter. Front: perineal membrane. Back: gluteus maximus, sacrotuberous ligament.',
    },
    {
      id: 'ia-recesses',
      front: 'Recesses of the ischioanal fossa?',
      back: 'Anterior (above the perineal membrane), posterior (deep to the sacrotuberous ligament), horseshoe (joins the two behind the anal canal).',
    },
    {
      id: 'ia-contents',
      front: 'Contents of the ischioanal fossa?',
      back: 'Fat; inferior rectal nerve and vessels; pudendal canal; posterior scrotal or labial nerves and vessels; perineal branch of S4; perforating branches of S2, S3.',
    },
    {
      id: 'ia-size',
      front: 'Size of the ischioanal fossa?',
      back: 'About 5 cm long, 2.5 cm wide, 5 to 6 cm deep.',
    },
    {
      id: 'ia-lunate',
      front: 'The lunate fascia?',
      back: 'Arches over the ischioanal fat from the pudendal canal to the external sphincter.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Volume 2, Chapter 28 Perineum', pages: '410–414' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 5 Pelvis and Perineum', pages: '498–500' },
  ],
};
