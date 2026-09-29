import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import { SUPRASCAPULAR_NERVE } from './scapular-3d';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 2 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const deltoidRotatorCuff: Topic = {
  slug: 'deltoid-rotator-cuff',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Scapular region: deltoid and the rotator cuff',
  summary:
    'The deltoid and the four cuff muscles that hold the head of the humerus in its shallow socket, their nerves, and what each injury costs.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 6 Scapular Region, pages 73 to 78'),
    bookSource(
      'grays-anatomy',
      'Chapter 7 Upper Limb, posterior scapular region, pages 702 to 708',
    ),
    {
      title: 'TeachMeAnatomy: The Rotator Cuff',
      url: 'https://teachmeanatomy.info/upper-limb/muscles/shoulder/rotator-cuff/',
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
    'Deltoid: lateral third of the clavicle, acromion and spine of the scapula to the deltoid tuberosity. Axillary nerve. Its middle fibres abduct the arm from about 15 to 90 degrees.',
    'The rotator cuff is supraspinatus, infraspinatus, teres minor and subscapularis (SITS). Their tendons blend with the capsule above, behind and in front, but not below.',
    'Supraspinatus starts abduction; infraspinatus and teres minor rotate the arm laterally; subscapularis rotates it medially.',
    'Suprascapular nerve: supraspinatus and infraspinatus. Axillary nerve: deltoid and teres minor. Upper and lower subscapular nerves: subscapularis (and teres major).',
    'A fracture of the surgical neck or a dislocated shoulder can injure the axillary nerve: the shoulder flattens, abduction fails and skin over the lower deltoid goes numb.',
  ],
  visual: {
    kind: 'path',
    // Each nerve on the left, the muscles it supplies, and what they do.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'axillary', label: 'Axillary\nnerve', name: 'Axillary nerve', x: 60, y: 70 },
        { id: 'deltoid', label: 'Deltoid', name: 'Deltoid', x: 180, y: 40 },
        { id: 'teres-minor', label: 'Teres\nminor', name: 'Teres minor', x: 180, y: 100 },
        {
          id: 'abduction',
          label: 'Abducts\nthe arm',
          name: 'Abduction of the arm from about 15 to 90 degrees',
          x: 300,
          y: 40,
        },
        {
          id: 'lateral-rotation',
          label: 'Turn arm\noutwards',
          name: 'Lateral rotation of the arm',
          x: 300,
          y: 130,
        },
        {
          id: 'suprascapular',
          label: 'Supra-\nscapular n.',
          name: 'Suprascapular nerve',
          x: 60,
          y: 190,
        },
        {
          id: 'infraspinatus',
          label: 'Infra-\nspinatus',
          name: 'Infraspinatus',
          x: 180,
          y: 160,
        },
        {
          id: 'supraspinatus',
          label: 'Supra-\nspinatus',
          name: 'Supraspinatus',
          x: 180,
          y: 220,
        },
        {
          id: 'start-abduction',
          label: 'Starts\nabduction',
          name: 'Starting abduction (the first 15 degrees or so)',
          x: 300,
          y: 220,
        },
        {
          id: 'subscapular-nerves',
          label: 'Subscapular\nnerves',
          name: 'Upper and lower subscapular nerves',
          x: 60,
          y: 320,
        },
        {
          id: 'subscapularis',
          label: 'Subscap-\nularis',
          name: 'Subscapularis',
          x: 180,
          y: 290,
        },
        { id: 'teres-major', label: 'Teres\nmajor', name: 'Teres major', x: 180, y: 350 },
        {
          id: 'medial-rotation',
          label: 'Turn arm\ninwards',
          name: 'Medial rotation of the arm',
          x: 300,
          y: 320,
        },
      ],
      edges: [
        { from: 'axillary', to: 'deltoid' },
        { from: 'axillary', to: 'teres-minor' },
        { from: 'deltoid', to: 'abduction' },
        { from: 'teres-minor', to: 'lateral-rotation' },
        { from: 'suprascapular', to: 'infraspinatus' },
        { from: 'suprascapular', to: 'supraspinatus' },
        { from: 'infraspinatus', to: 'lateral-rotation' },
        { from: 'supraspinatus', to: 'start-abduction' },
        { from: 'subscapular-nerves', to: 'subscapularis' },
        { from: 'subscapular-nerves', to: 'teres-major' },
        { from: 'subscapularis', to: 'medial-rotation' },
        { from: 'teres-major', to: 'medial-rotation' },
      ],
    },
    lesions: [
      {
        id: 'axillary-injury',
        label: 'Axillary nerve injury',
        nodeIds: ['axillary'],
        explanation:
          'The axillary nerve winds round the surgical neck of the humerus, so a fracture there or a dislocated shoulder can stretch or tear it. Deltoid and teres minor are paralysed: the shoulder loses its round contour, the arm cannot be abducted beyond the first few degrees, and a patch of skin over the lower deltoid (the regimental badge area) goes numb.',
      },
      {
        id: 'suprascapular-injury',
        label: 'Suprascapular nerve injury',
        nodeIds: ['suprascapular'],
        explanation:
          'The suprascapular nerve can be trapped at the suprascapular notch or injured by a fracture of the scapula. Supraspinatus and infraspinatus waste above and below the spine of the scapula; starting abduction and rotating the arm outwards become weak.',
      },
      {
        id: 'supraspinatus-tear',
        label: 'Supraspinatus tendon tear',
        nodeIds: ['supraspinatus'],
        explanation:
          'The supraspinatus tendon runs under the acromion, where it wears, becomes inflamed and can tear, often in older people. Starting abduction is hard, and when inflamed it hurts most between about 60 and 120 degrees of abduction (the painful arc), where the tendon rubs under the acromion.',
      },
    ],
    drill: [
      {
        id: 'nerves',
        title: 'Nerves',
        hint: 'Two nerves for the back of the shoulder, two small ones for the front of the scapula.',
        nodeIds: ['axillary', 'suprascapular', 'subscapular-nerves'],
      },
      {
        id: 'muscles',
        title: 'Muscles',
        hint: 'Deltoid, the four cuff muscles, and teres major.',
        nodeIds: [
          'deltoid',
          'teres-minor',
          'infraspinatus',
          'supraspinatus',
          'subscapularis',
          'teres-major',
        ],
      },
      {
        id: 'actions',
        title: 'What they do',
        hint: 'Abduct, start abducting, and turn the arm out or in.',
        nodeIds: ['abduction', 'lateral-rotation', 'start-abduction', 'medial-rotation'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'deltoid',
        'supraspinatus',
        'infraspinatus',
        'teres-minor',
        'subscapularis',
        'teres-major',
        'scapula',
        'clavicle',
        'humerus',
      ]),
      traces: [
        { id: 'axillary', kind: 'nerve', paths: plexusNerve('axillary') },
        { id: 'suprascapular', kind: 'nerve', paths: SUPRASCAPULAR_NERVE },
      ],
      stops: [
        {
          id: 'behind',
          title: 'Back of the shoulder',
          description:
            'Supraspinatus fills the fossa above the spine of the scapula; infraspinatus and teres minor lie below it, and deltoid caps them all.',
          target: [-150, -40, 1285],
          position: [-330, 380, 1420],
        },
        {
          id: 'deltoid',
          title: 'Deltoid',
          description:
            'From the side, deltoid wraps the shoulder from the clavicle round to the spine of the scapula and narrows to the deltoid tuberosity.',
          target: [-190, -75, 1265],
          position: [-600, -250, 1330],
        },
        {
          id: 'from-above',
          title: 'Under the acromion',
          description:
            'From above, the supraspinatus tendon passes under the acromion to the top of the greater tubercle, the place where it wears and tears.',
          target: [-130, -50, 1320],
          position: [-230, 100, 1720],
        },
        {
          id: 'front',
          title: 'Subscapularis',
          description:
            'From the front, subscapularis fills the face of the scapula and crosses in front of the joint to the lesser tubercle.',
          target: [-110, -60, 1260],
          position: [-230, -560, 1320],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'deltoid',
      title: 'Deltoid',
      body: 'Deltoid gives the shoulder its round shape. It arises from the lateral third of the clavicle, the acromion and the spine of the scapula, the same line trapezius inserts into, and narrows to the deltoid tuberosity halfway down the humerus. It is supplied by the axillary nerve.',
      focus: ['axillary', 'deltoid'],
    },
    {
      id: 'deltoid-action',
      title: 'Three parts, three jobs',
      body: 'The multipennate middle fibres from the acromion abduct the arm from about 15 to 90 degrees. The front fibres flex and rotate the arm inwards; the back fibres extend and rotate it outwards. Injections go into the upper part of the muscle, well above the axillary nerve, which crosses its deep surface about 5 cm below the acromion.',
      focus: ['deltoid', 'abduction'],
    },
    {
      id: 'cuff',
      title: 'The rotator cuff',
      body: 'Four short muscles wrap the head of the humerus: supraspinatus above, infraspinatus and teres minor behind, subscapularis in front (SITS). Their tendons blend with the joint capsule and hold the large head in the small glenoid cavity. Below, the capsule has no cuff, so the shoulder most often dislocates downwards.',
      focus: ['supraspinatus', 'infraspinatus', 'teres-minor', 'subscapularis'],
    },
    {
      id: 'supraspinatus',
      title: 'Supraspinatus',
      body: 'Supraspinatus runs from the supraspinous fossa under the acromion to the top of the greater tubercle. It starts abduction and holds the head down in the socket while deltoid takes over. It is supplied by the suprascapular nerve, and its tendon is the one most often inflamed or torn.',
      focus: ['suprascapular', 'supraspinatus', 'start-abduction'],
    },
    {
      id: 'infraspinatus-teres-minor',
      title: 'Infraspinatus and teres minor',
      body: 'Infraspinatus fills the infraspinous fossa and teres minor comes from the upper lateral border of the scapula; both insert on the back of the greater tubercle and turn the arm outwards. Infraspinatus is supplied by the suprascapular nerve, teres minor by the axillary nerve.',
      focus: ['suprascapular', 'infraspinatus', 'axillary', 'teres-minor', 'lateral-rotation'],
    },
    {
      id: 'subscapularis',
      title: 'Subscapularis',
      body: 'Subscapularis covers the front of the scapula and inserts into the lesser tubercle; it turns the arm inwards and guards the front of the joint. The upper and lower subscapular nerves supply it, and the lower one also supplies teres major, which is not part of the cuff.',
      focus: ['subscapular-nerves', 'subscapularis', 'teres-major', 'medial-rotation'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a nerve to see its muscles and what they do. Then turn on an injury to see what a patient loses.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'cuff-not-member',
      prompt: 'Which muscle is NOT part of the rotator cuff?',
      options: [
        { id: 'teres-major', text: 'Teres major' },
        { id: 'teres-minor', text: 'Teres minor' },
        { id: 'subscapularis', text: 'Subscapularis' },
        { id: 'supraspinatus', text: 'Supraspinatus' },
      ],
      answerId: 'teres-major',
      explanation:
        'The cuff is supraspinatus, infraspinatus, teres minor and subscapularis. Teres major inserts into the humerus below the joint and does not touch the capsule.',
    },
    {
      id: 'cuff-start-abduction',
      prompt: 'Which muscle starts abduction of the arm?',
      options: [
        { id: 'supraspinatus', text: 'Supraspinatus' },
        { id: 'deltoid', text: 'Deltoid' },
        { id: 'infraspinatus', text: 'Infraspinatus' },
        { id: 'trapezius', text: 'Trapezius' },
      ],
      answerId: 'supraspinatus',
      explanation:
        'Supraspinatus starts abduction; deltoid carries it on to about 90 degrees, and trapezius with serratus anterior turns the scapula for the rest.',
    },
    {
      id: 'cuff-teres-minor-nerve',
      prompt: 'Teres minor is supplied by the:',
      options: [
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'suprascapular', text: 'Suprascapular nerve' },
        { id: 'lower-subscapular', text: 'Lower subscapular nerve' },
        { id: 'radial', text: 'Radial nerve' },
      ],
      answerId: 'axillary',
      explanation:
        'The axillary nerve supplies deltoid and teres minor. The suprascapular nerve supplies supraspinatus and infraspinatus.',
    },
    {
      id: 'cuff-surgical-neck',
      prompt:
        'After a fracture of the surgical neck of the humerus, a patient cannot abduct the arm and has a numb patch over the lower deltoid. Which nerve is injured?',
      options: [
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'suprascapular', text: 'Suprascapular nerve' },
        { id: 'musculocutaneous', text: 'Musculocutaneous nerve' },
      ],
      answerId: 'axillary',
      explanation:
        'The axillary nerve winds round the surgical neck. It supplies deltoid and the skin over its lower half (the regimental badge area).',
    },
    {
      id: 'cuff-dislocation',
      prompt: 'Why does the shoulder joint most often dislocate downwards?',
      options: [
        { id: 'no-cuff', text: 'The capsule has no cuff tendon below' },
        { id: 'deep-socket', text: 'The glenoid cavity is deepest below' },
        { id: 'ligament', text: 'The coracohumeral ligament pulls the head down' },
        { id: 'deltoid', text: 'Deltoid pulls the head downwards' },
      ],
      answerId: 'no-cuff',
      explanation:
        'The cuff tendons reinforce the capsule above, behind and in front; its lower part is loose and unsupported, so the head escapes that way.',
    },
  ],
  cards: [
    {
      id: 'cuff-members',
      front: 'Muscles of the rotator cuff?',
      back: 'Supraspinatus, infraspinatus, teres minor, subscapularis (SITS).',
    },
    {
      id: 'cuff-deltoid',
      front: 'Attachments and nerve of deltoid?',
      back: 'Lateral third of the clavicle, acromion and spine of the scapula to the deltoid tuberosity. Axillary nerve.',
    },
    {
      id: 'cuff-suprascapular',
      front: 'Muscles supplied by the suprascapular nerve?',
      back: 'Supraspinatus and infraspinatus.',
    },
    {
      id: 'cuff-painful-arc',
      front: 'Painful arc between about 60 and 120 degrees of abduction suggests?',
      back: 'An inflamed or torn supraspinatus tendon rubbing under the acromion.',
    },
    {
      id: 'cuff-regimental-badge',
      front: 'Nerve behind a numb regimental badge area?',
      back: 'The axillary nerve (upper lateral cutaneous nerve of the arm).',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 6 Scapular Region', pages: '73–78' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '702–708' },
  ],
};
