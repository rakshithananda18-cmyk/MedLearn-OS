import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 2 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const scapularSpaces: Topic = {
  slug: 'scapular-spaces',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Spaces around the scapula and the scapular anastomosis',
  summary:
    'The quadrangular and triangular spaces that let nerves and vessels reach the back of the shoulder, and the arterial detour round the scapula.',
  estimatedMinutes: 10,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 6 Scapular Region, pages 78 to 81'),
    bookSource(
      'grays-anatomy',
      'Chapter 7 Upper Limb, posterior scapular region, pages 705 to 709',
    ),
    {
      title: 'TeachMeAnatomy: The Quadrangular Space',
      url: 'https://teachmeanatomy.info/upper-limb/areas/quadrangular-space/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, muscles and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Teres minor above, teres major below and the long head of triceps between them make three gaps from the axilla to the back.',
    'Quadrangular space: teres minor, teres major, long head of triceps, surgical neck of the humerus. Carries the axillary nerve and posterior circumflex humeral vessels.',
    'Upper triangular space: teres minor, teres major, long head of triceps. Carries the circumflex scapular artery.',
    'Lower triangular space (triangular interval): teres major, long head of triceps, humerus. Carries the radial nerve and profunda brachii vessels.',
    'The scapular anastomosis joins the first part of the subclavian artery (suprascapular, dorsal scapular) to the third part of the axillary (circumflex scapular), a detour if the axillary artery is blocked.',
  ],
  visual: {
    kind: 'path',
    // Each space with what passes through it; below, the scapular anastomosis as the route blood
    // takes when the axillary artery is blocked.
    diagram: {
      width: 360,
      height: 490,
      nodes: [
        {
          id: 'quadrangular',
          label: 'Quadrangular\nspace',
          name: 'Quadrangular space',
          x: 60,
          y: 50,
        },
        { id: 'axillary', label: 'Axillary\nnerve', name: 'Axillary nerve', x: 200, y: 25 },
        {
          id: 'posterior-circumflex-humeral-artery',
          label: 'Post. circumflex\nhumeral a.',
          name: 'Posterior circumflex humeral artery',
          x: 200,
          y: 75,
        },
        {
          id: 'lower-triangle',
          label: 'Lower triang.\nspace',
          name: 'Lower triangular space (triangular interval)',
          x: 60,
          y: 160,
        },
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 200, y: 140 },
        {
          id: 'deep-brachial-artery',
          label: 'Profunda\nbrachii a.',
          name: 'Profunda brachii artery',
          x: 200,
          y: 190,
        },
        {
          id: 'upper-triangle',
          label: 'Upper triang.\nspace',
          name: 'Upper triangular space',
          x: 60,
          y: 260,
        },
        {
          id: 'circumflex-scapular-artery',
          label: 'Circumflex\nscapular a.',
          name: 'Circumflex scapular artery',
          x: 200,
          y: 260,
        },
        {
          id: 'scapular-network',
          label: 'Scapular\nnetwork',
          name: 'Anastomosis round the scapula',
          x: 310,
          y: 300,
        },
        {
          id: 'subscapular-artery',
          label: 'Subscapular\nartery',
          name: 'Subscapular artery',
          x: 200,
          y: 320,
        },
        {
          id: 'axillary-artery-1',
          label: 'Axillary a.\n1st part',
          name: 'First part of the axillary artery',
          x: 60,
          y: 380,
        },
        {
          id: 'axillary-artery-3',
          label: 'Axillary a.\n3rd part',
          name: 'Third part of the axillary artery',
          x: 200,
          y: 380,
        },
        {
          id: 'suprascapular-artery',
          label: 'Supra-\nscapular a.',
          name: 'Suprascapular artery',
          x: 310,
          y: 400,
        },
        {
          id: 'subclavian-artery',
          label: 'Subclavian\nartery',
          name: 'Subclavian artery',
          x: 60,
          y: 460,
        },
        {
          id: 'dorsal-scapular-artery',
          label: 'Dorsal\nscapular a.',
          name: 'Dorsal scapular artery',
          x: 230,
          y: 460,
        },
      ],
      edges: [
        { from: 'quadrangular', to: 'axillary' },
        { from: 'quadrangular', to: 'posterior-circumflex-humeral-artery' },
        { from: 'lower-triangle', to: 'radial' },
        { from: 'lower-triangle', to: 'deep-brachial-artery' },
        { from: 'upper-triangle', to: 'circumflex-scapular-artery' },
        // The direct route, and the detour through the network when it is blocked.
        { from: 'subclavian-artery', to: 'axillary-artery-1' },
        { from: 'axillary-artery-1', to: 'axillary-artery-3' },
        { from: 'subclavian-artery', to: 'suprascapular-artery' },
        { from: 'subclavian-artery', to: 'dorsal-scapular-artery' },
        { from: 'suprascapular-artery', to: 'scapular-network' },
        { from: 'dorsal-scapular-artery', to: 'scapular-network' },
        { from: 'scapular-network', to: 'circumflex-scapular-artery' },
        { from: 'circumflex-scapular-artery', to: 'subscapular-artery' },
        { from: 'subscapular-artery', to: 'axillary-artery-3' },
      ],
    },
    lesions: [
      {
        id: 'quadrangular-space',
        label: 'Surgical neck fracture',
        nodeIds: ['quadrangular'],
        explanation:
          'The axillary nerve and posterior circumflex humeral vessels leave the quadrangular space by winding round the surgical neck of the humerus. A fracture there, a dislocated shoulder or a tight fibrous band in the space can injure them: deltoid and teres minor weaken and skin over the lower deltoid goes numb.',
      },
      {
        id: 'axillary-blocked',
        label: 'Axillary artery blocked',
        nodeIds: ['axillary-artery-1'],
        explanation:
          'If the axillary artery is blocked or tied above the origin of the subscapular artery, the direct route to its third part is cut. Blood still reaches the arm: it flows from the subclavian through the suprascapular and dorsal scapular arteries into the network round the scapula, then back along the circumflex scapular and subscapular arteries into the third part. Trace that detour on the diagram. The detour cannot help if the block is below the subscapular artery.',
      },
    ],
    drill: [
      {
        id: 'spaces',
        title: 'The three spaces',
        hint: 'One four-sided space and two triangles.',
        nodeIds: ['quadrangular', 'lower-triangle', 'upper-triangle'],
      },
      {
        id: 'contents',
        title: 'What passes through',
        hint: 'Two nerves and three arteries.',
        nodeIds: [
          'axillary',
          'posterior-circumflex-humeral-artery',
          'radial',
          'deep-brachial-artery',
          'circumflex-scapular-artery',
        ],
      },
      {
        id: 'anastomosis',
        title: 'The detour',
        hint: 'Two arteries from the subclavian, the network, and the branch that carries blood back to the axillary.',
        nodeIds: [
          'suprascapular-artery',
          'dorsal-scapular-artery',
          'scapular-network',
          'subscapular-artery',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'teres-minor',
        'teres-major',
        'triceps-long',
        'subscapularis',
        'scapula',
        'clavicle',
        'humerus',
        'subclavian-artery',
        'axillary-artery-1',
        'axillary-artery-2',
        'axillary-artery-3',
        'brachial-artery',
        'subscapular-artery',
        'circumflex-scapular-artery',
        'posterior-circumflex-humeral-artery',
        'deep-brachial-artery',
        'suprascapular-artery',
        'dorsal-scapular-artery',
      ]),
      traces: [
        { id: 'axillary', kind: 'nerve', paths: plexusNerve('axillary') },
        { id: 'radial', kind: 'nerve', paths: plexusNerve('radial') },
      ],
      stops: [
        {
          id: 'spaces',
          title: 'Three gaps',
          description:
            'From behind: teres minor above, teres major below, and the long head of triceps running down between them.',
          target: [-160, -45, 1265],
          position: [-330, 330, 1290],
        },
        {
          id: 'quadrangular',
          title: 'Quadrangular space',
          description:
            'Lateral to the long head of triceps and against the surgical neck: the axillary nerve and posterior circumflex humeral artery pass through.',
          target: [-170, -60, 1290],
          position: [-360, 180, 1300],
        },
        {
          id: 'lower-triangle',
          title: 'Lower triangular space',
          description:
            'Below teres major, between the long head of triceps and the humerus: the radial nerve and profunda brachii artery head for the radial groove.',
          target: [-165, -60, 1235],
          position: [-340, 250, 1220],
        },
        {
          id: 'anastomosis',
          title: 'Round the scapula',
          description:
            'The suprascapular artery crosses the top of the scapula, the dorsal scapular runs down its medial border, and the circumflex scapular winds round its lateral border. They meet on its back.',
          target: [-100, -30, 1285],
          position: [-200, 520, 1450],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'gaps',
      title: 'Three gaps',
      body: 'Teres minor runs along the upper part of the lateral border of the scapula and teres major along its lower part. The long head of triceps runs down between them to the arm. Together with the humerus they leave three gaps through which nerves and vessels pass from the axilla to the back of the shoulder and arm.',
      focus: ['quadrangular', 'upper-triangle', 'lower-triangle'],
    },
    {
      id: 'quadrangular',
      title: 'Quadrangular space',
      body: 'Above is teres minor from behind (subscapularis and the joint capsule from the front), below is teres major, medially the long head of triceps, and laterally the surgical neck of the humerus. The axillary nerve and the posterior circumflex humeral vessels pass through it and wind round the surgical neck.',
      focus: ['quadrangular', 'axillary', 'posterior-circumflex-humeral-artery'],
    },
    {
      id: 'upper-triangle',
      title: 'Upper triangular space',
      body: 'Medial to the long head of triceps, between teres minor above and teres major below. The circumflex scapular artery passes through it to reach the infraspinous fossa.',
      focus: ['upper-triangle', 'circumflex-scapular-artery'],
    },
    {
      id: 'lower-triangle',
      title: 'Lower triangular space',
      body: 'Below teres major, between the long head of triceps medially and the shaft of the humerus laterally; also called the triangular interval. The radial nerve and the profunda brachii vessels pass through it on their way to the radial groove.',
      focus: ['lower-triangle', 'radial', 'deep-brachial-artery'],
    },
    {
      id: 'anastomosis',
      title: 'The scapular anastomosis',
      body: 'Three arteries meet round the scapula: the suprascapular from the thyrocervical trunk of the first part of the subclavian, the dorsal scapular from the subclavian, and the circumflex scapular from the subscapular branch of the third part of the axillary. Intercostal branches join them.',
      focus: [
        'suprascapular-artery',
        'dorsal-scapular-artery',
        'scapular-network',
        'circumflex-scapular-artery',
        'subscapular-artery',
      ],
    },
    {
      id: 'detour',
      title: 'A detour for the arm',
      body: 'Because the network links the subclavian to the axillary, the arm still gets blood if the axillary artery is blocked or tied above the subscapular artery: blood runs round the scapula and back along the circumflex scapular and subscapular arteries into the third part.',
      focus: [
        'subclavian-artery',
        'suprascapular-artery',
        'dorsal-scapular-artery',
        'scapular-network',
        'circumflex-scapular-artery',
        'subscapular-artery',
        'axillary-artery-3',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a space to see what passes through it. Then turn on a blocked axillary artery and follow the detour.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'spaces-quadrangular-contents',
      prompt: 'What passes through the quadrangular space?',
      options: [
        { id: 'axillary', text: 'Axillary nerve and posterior circumflex humeral vessels' },
        { id: 'radial', text: 'Radial nerve and profunda brachii vessels' },
        { id: 'circumflex-scapular', text: 'Circumflex scapular artery' },
        { id: 'suprascapular', text: 'Suprascapular nerve and artery' },
      ],
      answerId: 'axillary',
      explanation:
        'The axillary nerve and posterior circumflex humeral vessels. The radial nerve uses the lower triangular space and the circumflex scapular artery the upper one.',
    },
    {
      id: 'spaces-quadrangular-lateral',
      prompt: 'The lateral boundary of the quadrangular space is the:',
      options: [
        { id: 'surgical-neck', text: 'Surgical neck of the humerus' },
        { id: 'triceps', text: 'Long head of triceps' },
        { id: 'teres-major', text: 'Teres major' },
        { id: 'teres-minor', text: 'Teres minor' },
      ],
      answerId: 'surgical-neck',
      explanation:
        'Teres minor above, teres major below, the long head of triceps medially and the surgical neck laterally.',
    },
    {
      id: 'spaces-lower-triangle',
      prompt: 'Which nerve passes through the lower triangular space?',
      options: [
        { id: 'radial', text: 'Radial nerve' },
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'musculocutaneous', text: 'Musculocutaneous nerve' },
      ],
      answerId: 'radial',
      explanation:
        'The radial nerve and profunda brachii vessels pass through it to the radial groove on the back of the humerus.',
    },
    {
      id: 'spaces-anastomosis',
      prompt: 'The scapular anastomosis links:',
      options: [
        {
          id: 'subclavian-axillary',
          text: 'The first part of the subclavian with the third part of the axillary',
        },
        { id: 'axillary-brachial', text: 'The axillary artery with the brachial artery' },
        { id: 'brachial-radial', text: 'The brachial artery with the radial artery' },
        { id: 'carotid-subclavian', text: 'The common carotid with the subclavian' },
      ],
      answerId: 'subclavian-axillary',
      explanation:
        'The suprascapular (from the first part of the subclavian) and the circumflex scapular (from the third part of the axillary) meet round the scapula, with the dorsal scapular.',
    },
  ],
  cards: [
    {
      id: 'spaces-quadrangular',
      front: 'Boundaries and contents of the quadrangular space?',
      back: 'Teres minor above, teres major below, long head of triceps medially, surgical neck laterally. Axillary nerve and posterior circumflex humeral vessels.',
    },
    {
      id: 'spaces-upper-triangle',
      front: 'Content of the upper triangular space?',
      back: 'The circumflex scapular artery.',
    },
    {
      id: 'spaces-lower-triangle-card',
      front: 'Boundaries and contents of the lower triangular space?',
      back: 'Teres major above, long head of triceps medially, humerus laterally. Radial nerve and profunda brachii vessels.',
    },
    {
      id: 'spaces-anastomosis-arteries',
      front: 'Arteries of the scapular anastomosis?',
      back: 'Suprascapular, dorsal scapular and circumflex scapular, joined by intercostal branches.',
    },
    {
      id: 'spaces-detour',
      front: 'When does the scapular anastomosis save the arm?',
      back: 'When the axillary artery is blocked or tied above the origin of the subscapular artery.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 6 Scapular Region', pages: '78–81' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '705–709' },
  ],
};
