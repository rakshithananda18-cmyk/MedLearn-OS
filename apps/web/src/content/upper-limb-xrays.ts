import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 6 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const upperLimbXrays: Topic = {
  slug: 'upper-limb-xrays',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Upper limb X-rays and ossification',
  summary:
    'Reading plain X-rays of the shoulder, elbow and wrist, and the order in which the growth centres appear, so a growth plate is never mistaken for a fracture.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 1, Chapter 11, radiological anatomy, pages 185 to 187; Chapter 2 Bones, ossification, pages 24 and 27 to 28',
    ),
    {
      title: 'OpenStax Anatomy and Physiology 2e',
      detail: '6.4 Bone Formation and Development',
      url: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/6-4-bone-formation-and-development',
      licence: 'CC BY-NC-SA 4.0; cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Take an anteroposterior and a lateral view, and compare with the other side: a growth plate has smooth edges and is the same on both sides; a fracture line is irregular and one-sided.',
    'The end of a long bone whose growth centre appears first fuses last. In the upper limb the growing ends are at the shoulder and the wrist: the upper humerus and the lower radius and ulna.',
    'Elbow centres appear in a fixed order, CRITOE: capitulum (about 1 year), radial head (about 5), internal (medial) epicondyle (about 6), trochlea (about 9), olecranon (about 10), external (lateral) epicondyle (about 12).',
    'No carpal bone is ossified at birth. The capitate and hamate appear in the first year, then the triquetral, lunate, scaphoid, trapezium and trapezoid over the next few years; the pisiform comes last, around 10 to 12 years.',
    'Books differ by a year or so on each age; the order matters more than the exact year.',
  ],
  visual: {
    kind: 'path',
    // Top: the elbow centres in order. Middle: the carpal bones in order. Bottom: the growing
    // ends.
    diagram: {
      width: 360,
      height: 490,
      nodes: [
        {
          id: 'elbow',
          label: 'Elbow\ncentres',
          name: 'Growth centres at the elbow',
          x: 180,
          y: 35,
        },
        {
          id: 'capitulum',
          label: 'Capitulum\n~1 yr',
          name: 'Capitulum, about 1 year',
          x: 60,
          y: 105,
        },
        {
          id: 'radial-head',
          label: 'Radial head\n~5 yr',
          name: 'Head of the radius, about 5 years',
          x: 180,
          y: 105,
        },
        {
          id: 'medial-epicondyle',
          label: 'Medial epi-\ncondyle ~6 yr',
          name: 'Medial (internal) epicondyle, about 6 years',
          x: 300,
          y: 105,
        },
        {
          id: 'trochlea',
          label: 'Trochlea\n~9 yr',
          name: 'Trochlea, about 9 years',
          x: 60,
          y: 175,
        },
        {
          id: 'olecranon',
          label: 'Olecranon\n~10 yr',
          name: 'Olecranon, about 10 years',
          x: 180,
          y: 175,
        },
        {
          id: 'lateral-epicondyle',
          label: 'Lateral epi-\ncondyle ~12 yr',
          name: 'Lateral (external) epicondyle, about 12 years',
          x: 300,
          y: 175,
        },
        {
          id: 'carpals',
          label: 'Carpal\ncentres',
          name: 'Growth centres of the carpus',
          x: 180,
          y: 250,
        },
        { id: 'capitate', label: 'Capitate', name: 'Capitate, first year', x: 45, y: 320 },
        { id: 'hamate', label: 'Hamate', name: 'Hamate, first year', x: 135, y: 320 },
        {
          id: 'triquetral',
          label: 'Triquetral',
          name: 'Triquetral, about 3 years',
          x: 225,
          y: 320,
        },
        { id: 'lunate', label: 'Lunate', name: 'Lunate, about 4 years', x: 315, y: 320 },
        { id: 'scaphoid', label: 'Scaphoid', name: 'Scaphoid, about 5 years', x: 45, y: 385 },
        {
          id: 'trapezium',
          label: 'Trapezium',
          name: 'Trapezium, about 5 to 6 years',
          x: 135,
          y: 385,
        },
        { id: 'trapezoid', label: 'Trapezoid', name: 'Trapezoid, about 6 years', x: 225, y: 385 },
        {
          id: 'pisiform',
          label: 'Pisiform',
          name: 'Pisiform, about 10 to 12 years',
          x: 315,
          y: 385,
        },
        {
          id: 'growing-ends',
          label: 'Growing ends:\nshoulder, wrist',
          name: 'Growing ends: upper humerus, lower radius and ulna',
          x: 180,
          y: 455,
        },
      ],
      edges: [
        { from: 'elbow', to: 'capitulum' },
        { from: 'capitulum', to: 'radial-head' },
        { from: 'radial-head', to: 'medial-epicondyle' },
        { from: 'medial-epicondyle', to: 'trochlea' },
        { from: 'trochlea', to: 'olecranon' },
        { from: 'olecranon', to: 'lateral-epicondyle' },
        { from: 'carpals', to: 'capitate' },
        { from: 'capitate', to: 'hamate' },
        { from: 'hamate', to: 'triquetral' },
        { from: 'triquetral', to: 'lunate' },
        { from: 'lunate', to: 'scaphoid' },
        { from: 'scaphoid', to: 'trapezium' },
        { from: 'trapezium', to: 'trapezoid' },
        { from: 'trapezoid', to: 'pisiform' },
      ],
    },
    lesions: [
      {
        id: 'trapped-epicondyle',
        label: 'Medial epicondyle pulled into the joint',
        nodeIds: ['medial-epicondyle', 'trochlea'],
        explanation:
          'In a child the medial epicondyle, still a separate growth centre, can be pulled off and dragged into the elbow joint, where on X-ray it may look like the trochlear centre. The order settles it: the trochlea never appears before the medial epicondyle. If a trochlear centre is seen but no medial epicondyle, suspect a trapped fragment.',
      },
      {
        id: 'scaphoid-occult',
        label: 'Scaphoid fracture not seen at first',
        nodeIds: ['scaphoid'],
        explanation:
          'A crack across the waist of the scaphoid is often invisible on the first X-ray. With snuffbox tenderness after a fall, the wrist is splinted and imaged again after about ten days, or scanned, because a missed fracture can leave the proximal part without blood.',
      },
    ],
    drill: [
      {
        id: 'elbow',
        title: 'Elbow centres',
        hint: 'Six centres in the order of CRITOE.',
        nodeIds: [
          'capitulum',
          'radial-head',
          'medial-epicondyle',
          'trochlea',
          'olecranon',
          'lateral-epicondyle',
        ],
      },
      {
        id: 'carpals',
        title: 'Carpal centres',
        hint: 'First the two big ones, last the pea-shaped one.',
        nodeIds: [
          'capitate',
          'hamate',
          'triquetral',
          'lunate',
          'scaphoid',
          'trapezium',
          'trapezoid',
          'pisiform',
        ],
      },
      {
        id: 'growing',
        title: 'Growing ends',
        hint: 'Where the upper limb bones grow longest.',
        nodeIds: ['growing-ends'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: SHOULDER_MODEL_CREDIT,
      parts: shoulderParts(['clavicle', 'scapula', 'humerus', 'radius', 'ulna', ...HAND_BONES]),
      traces: [],
      stops: [
        {
          id: 'shoulder',
          title: 'Shoulder, front view',
          description:
            'As on an AP X-ray: the humeral head against the glenoid, the greater tubercle as the most lateral point, the acromion above and the coracoid seen end-on.',
          target: [-150, -80, 1310],
          position: [-150, -460, 1329],
        },
        {
          id: 'elbow',
          title: 'Elbow, front view',
          description:
            'The capitulum, trochlea and both epicondyles of the humerus; the radial head and the ulna below. In a child each is a separate growth centre until it fuses.',
          target: [-212, -70, 1040],
          position: [-212, -370, 1055],
        },
        {
          id: 'wrist',
          title: 'Wrist and hand, front view',
          description:
            'The radial and ulnar styloids, the eight carpal bones (the pisiform overlaps the triquetral, the trapezium the trapezoid), and the metacarpals and phalanges.',
          target: [-258, -125, 780],
          position: [-258, -425, 795],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'reading',
      title: 'Reading a plain X-ray',
      body: 'Bone shows white. Always ask for two views at right angles, anteroposterior and lateral, and compare with the other limb. A growth plate has smooth, regular edges and matches the other side; a fracture line is irregular and one-sided. Look at alignment, joint spaces and the bone texture too.',
      focus: [],
    },
    {
      id: 'law',
      title: 'The law of ossification',
      body: 'In a long bone with growth centres at both ends, the end whose centre appears first fuses last, and so grows longest. In the upper limb these growing ends are at the shoulder and the wrist: the upper end of the humerus and the lower ends of the radius and ulna. The nutrient canals point away from them, towards the elbow.',
      focus: ['growing-ends'],
    },
    {
      id: 'elbow',
      title: 'Elbow centres: CRITOE',
      body: 'The six centres around the elbow appear in a fixed order: capitulum (about 1 year), radial head (about 5), internal or medial epicondyle (about 6), trochlea (about 9), olecranon (about 10) and external or lateral epicondyle (about 12). Knowing the order lets you read a child elbow X-ray and spot a displaced fragment.',
      focus: [
        'capitulum',
        'radial-head',
        'medial-epicondyle',
        'trochlea',
        'olecranon',
        'lateral-epicondyle',
      ],
    },
    {
      id: 'carpals',
      title: 'Carpal centres',
      body: 'None of the carpal bones is ossified at birth. The capitate appears first and the hamate soon after, both in the first year; then roughly one a year: triquetral, lunate, scaphoid, trapezium and trapezoid. The pisiform, a sesamoid bone in the flexor carpi ulnaris tendon, comes last, around 10 to 12 years. The count of carpal centres helps estimate a child’s bone age.',
      focus: [
        'capitate',
        'hamate',
        'triquetral',
        'lunate',
        'scaphoid',
        'trapezium',
        'trapezoid',
        'pisiform',
      ],
    },
    {
      id: 'hand',
      title: 'Metacarpals and phalanges',
      body: 'The second to fifth metacarpals have their growth centre in the head; the first metacarpal, like a phalanx, has it in the base. Every phalanx has its growth centre in the base.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each centre to see its bone in the model, then turn on a problem to see why the order matters.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'xrays-critoe-last',
      prompt: 'Which elbow growth centre appears last?',
      options: [
        { id: 'lateral', text: 'Lateral epicondyle' },
        { id: 'capitulum', text: 'Capitulum' },
        { id: 'medial', text: 'Medial epicondyle' },
        { id: 'olecranon', text: 'Olecranon' },
      ],
      answerId: 'lateral',
      explanation:
        'CRITOE: capitulum, radial head, internal epicondyle, trochlea, olecranon, external epicondyle.',
    },
    {
      id: 'xrays-carpal-first',
      prompt: 'The first carpal bone to ossify is the:',
      options: [
        { id: 'capitate', text: 'Capitate' },
        { id: 'pisiform', text: 'Pisiform' },
        { id: 'scaphoid', text: 'Scaphoid' },
        { id: 'lunate', text: 'Lunate' },
      ],
      answerId: 'capitate',
      explanation:
        'The capitate appears in the first year, the pisiform last, around 10 to 12 years.',
    },
    {
      id: 'xrays-growing-end',
      prompt: 'The growing end of the humerus is its:',
      options: [
        { id: 'upper', text: 'Upper end, at the shoulder' },
        { id: 'lower', text: 'Lower end, at the elbow' },
        { id: 'both', text: 'Both ends equally' },
        { id: 'shaft', text: 'Middle of the shaft' },
      ],
      answerId: 'upper',
      explanation:
        'In the upper limb the growing ends are at the shoulder and wrist; the nutrient canals point towards the elbow.',
    },
    {
      id: 'xrays-growth-plate',
      prompt: 'A growth plate is told from a fracture on X-ray because a growth plate is:',
      options: [
        { id: 'regular', text: 'Smooth, regular and the same on both sides' },
        { id: 'irregular', text: 'Irregular and one-sided' },
        { id: 'wider', text: 'Always wider than a fracture' },
        { id: 'dark', text: 'Whiter than the bone around it' },
      ],
      answerId: 'regular',
      explanation:
        'A fracture line is usually irregular and on one side only; comparing with the other limb helps.',
    },
  ],
  cards: [
    {
      id: 'xrays-critoe',
      front: 'Order of the elbow growth centres?',
      back: 'CRITOE: capitulum ~1, radial head ~5, internal epicondyle ~6, trochlea ~9, olecranon ~10, external epicondyle ~12 years.',
    },
    {
      id: 'xrays-carpal-order',
      front: 'Order of carpal ossification?',
      back: 'Capitate and hamate (first year), triquetral, lunate, scaphoid, trapezium, trapezoid, then pisiform last (about 10 to 12 years).',
    },
    {
      id: 'xrays-law',
      front: 'Law of ossification?',
      back: 'In a long bone with two epiphyses, the one that appears first fuses last; that end is the growing end.',
    },
    {
      id: 'xrays-growing-ends',
      front: 'Growing ends of the upper limb long bones?',
      back: 'Upper end of the humerus; lower ends of the radius and ulna (at the shoulder and wrist).',
    },
    {
      id: 'xrays-metacarpal',
      front: 'Where is the growth centre of the first metacarpal, and of the others?',
      back: 'First metacarpal: in the base (like a phalanx). Second to fifth: in the head.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 11 (radiological anatomy) and Chapter 2 Bones',
      pages: '185–187, 24, 27–28',
    },
  ],
};
