import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  between,
  MEDIAN_FOREARM,
  MEDIAN_RECURRENT_BRANCH,
  ULNAR_DEEP_BRANCH,
  ULNAR_FOREARM_MAIN,
  ULNAR_SUPERFICIAL_BRANCH,
} from './forearm-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 4 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const handMuscles: Topic = {
  slug: 'hand-muscles',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Hand: the small muscles',
  summary:
    'Thenar and hypothenar muscles, adductor pollicis, lumbricals and interossei: what each does and why the ulnar nerve supplies most of them.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 9 Forearm and Hand, pages 127 to 132'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, hand, pages 795 to 801'),
    {
      title: 'TeachMeAnatomy: The Intrinsic Muscles of the Hand',
      url: 'https://teachmeanatomy.info/upper-limb/muscles/hand/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Thenar muscles (abductor pollicis brevis, flexor pollicis brevis, opponens pollicis): the recurrent branch of the median nerve.',
    'Hypothenar muscles (abductor, flexor and opponens digiti minimi): the deep branch of the ulnar nerve.',
    'Adductor pollicis, all the interossei and the third and fourth lumbricals: the deep branch of the ulnar nerve. The first and second lumbricals: the median nerve.',
    'Lumbricals and interossei bend the knuckles and straighten the finger joints.',
    'Dorsal interossei spread the fingers from the line of the middle finger; palmar interossei bring them together (DAB and PAD).',
    'Every small muscle of the hand is supplied by T1.',
  ],
  visual: {
    kind: 'path',
    // Nerves on the left, the muscle groups in the middle, what they do on the right.
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 60, y: 75 },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 60, y: 200 },
        {
          id: 'deep-ulnar',
          label: 'Deep br.\nulnar n.',
          name: 'Deep branch of the ulnar nerve',
          x: 60,
          y: 290,
        },
        {
          id: 'thenar-muscles',
          label: 'Thenar\nmuscles',
          name: 'Thenar muscles',
          x: 185,
          y: 40,
        },
        { id: 'lumbricals', label: 'Lumbricals', name: 'Lumbricals', x: 185, y: 110 },
        {
          id: 'adductor-pollicis',
          label: 'Adductor\npollicis',
          name: 'Adductor pollicis',
          x: 185,
          y: 180,
        },
        {
          id: 'hypothenar-muscles',
          label: 'Hypothenar\nmuscles',
          name: 'Hypothenar muscles',
          x: 185,
          y: 240,
        },
        {
          id: 'dorsal-interossei',
          label: 'Dorsal\ninterossei',
          name: 'Dorsal interossei',
          x: 185,
          y: 300,
        },
        {
          id: 'palmar-interossei',
          label: 'Palmar\ninterossei',
          name: 'Palmar interossei',
          x: 185,
          y: 360,
        },
        {
          id: 'oppose',
          label: 'Oppose the\nthumb',
          name: 'Opposition of the thumb',
          x: 305,
          y: 40,
        },
        {
          id: 'knuckles',
          label: 'Bend knuckles,\nstraighten IPs',
          name: 'Flex the knuckles and extend the finger joints',
          x: 300,
          y: 110,
        },
        {
          id: 'adduct-thumb',
          label: 'Adduct the\nthumb',
          name: 'Adduction of the thumb',
          x: 305,
          y: 180,
        },
        {
          id: 'little-finger',
          label: 'Move little\nfinger',
          name: 'Movements of the little finger',
          x: 305,
          y: 240,
        },
        {
          id: 'abduct',
          label: 'Spread the\nfingers',
          name: 'Abduction of the fingers',
          x: 305,
          y: 300,
        },
        {
          id: 'adduct',
          label: 'Close the\nfingers',
          name: 'Adduction of the fingers',
          x: 305,
          y: 360,
        },
      ],
      edges: [
        { from: 'median', to: 'thenar-muscles' },
        { from: 'median', to: 'lumbricals' },
        { from: 'ulnar', to: 'deep-ulnar' },
        { from: 'deep-ulnar', to: 'lumbricals' },
        { from: 'deep-ulnar', to: 'adductor-pollicis' },
        { from: 'deep-ulnar', to: 'hypothenar-muscles' },
        { from: 'deep-ulnar', to: 'dorsal-interossei' },
        { from: 'deep-ulnar', to: 'palmar-interossei' },
        { from: 'thenar-muscles', to: 'oppose' },
        { from: 'lumbricals', to: 'knuckles' },
        { from: 'adductor-pollicis', to: 'adduct-thumb' },
        { from: 'hypothenar-muscles', to: 'little-finger' },
        { from: 'dorsal-interossei', to: 'abduct' },
        { from: 'palmar-interossei', to: 'adduct' },
      ],
    },
    lesions: [
      {
        id: 'deep-ulnar-injury',
        label: 'Deep branch of the ulnar nerve cut',
        nodeIds: ['deep-ulnar'],
        explanation:
          'The interossei, the medial two lumbricals, the hypothenar muscles and adductor pollicis are paralysed. The fingers cannot be spread or closed, the hollows between the metacarpals deepen on the back of the hand, and the ring and little fingers claw. Asked to grip a sheet of paper between thumb and index finger, the student bends the thumb tip with flexor pollicis longus instead of adducting it (Froment sign).',
      },
      {
        id: 't1-claw',
        label: 'T1 root injury (Klumpke palsy)',
        nodeIds: ['median', 'deep-ulnar'],
        explanation:
          'T1 supplies every small muscle of the hand, so a lower plexus injury paralyses them all. With the long flexors and extensors unopposed, the knuckles straighten too far and the finger joints bend: a complete claw hand, with numbness along the medial forearm.',
      },
    ],
    drill: [
      {
        id: 'nerves',
        title: 'Nerves',
        hint: 'The median nerve, and the ulnar nerve with the branch that does most of the work.',
        nodeIds: ['median', 'ulnar', 'deep-ulnar'],
      },
      {
        id: 'muscles',
        title: 'Muscle groups',
        hint: 'Two eminences, the thumb adductor, and the small muscles between the bones.',
        nodeIds: [
          'thenar-muscles',
          'lumbricals',
          'adductor-pollicis',
          'hypothenar-muscles',
          'dorsal-interossei',
          'palmar-interossei',
        ],
      },
      {
        id: 'actions',
        title: 'What they do',
        hint: 'Two thumb movements, the writing position, the little finger, spreading and closing.',
        nodeIds: ['oppose', 'knuckles', 'adduct-thumb', 'little-finger', 'abduct', 'adduct'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'thenar-muscles',
        'hypothenar-muscles',
        'adductor-pollicis',
        'lumbricals',
        'dorsal-interossei',
        'palmar-interossei',
        'flexor-retinaculum',
        ...HAND_BONES,
        'radius',
        'ulna',
      ]),
      traces: [
        {
          id: 'median',
          kind: 'nerve',
          paths: [...between(MEDIAN_FOREARM, 700, 840), ...MEDIAN_RECURRENT_BRANCH],
        },
        {
          id: 'ulnar',
          kind: 'nerve',
          paths: [...between(ULNAR_FOREARM_MAIN, 700, 840), ...ULNAR_SUPERFICIAL_BRANCH],
        },
        { id: 'deep-ulnar', kind: 'nerve', paths: ULNAR_DEEP_BRANCH },
      ],
      stops: [
        {
          id: 'palm',
          title: 'The palm',
          description:
            'The thenar eminence at the base of the thumb, the hypothenar eminence at the base of the little finger, and adductor pollicis deep in the web between them.',
          target: [-262, -140, 755],
          position: [-339, -484, 790],
        },
        {
          id: 'lumbricals',
          title: 'Lumbricals and palmar interossei',
          description:
            'The lumbricals arise from the profundus tendons and pass to the radial side of each finger. The palmar interossei lie on the palm side of the metacarpals.',
          target: [-262, -142, 735],
          position: [-310, -420, 700],
        },
        {
          id: 'back',
          title: 'Dorsal interossei',
          description:
            'Seen from the back, a two-headed dorsal interosseous fills each gap between the metacarpals.',
          target: [-262, -125, 750],
          position: [-360, 200, 800],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'groups',
      title: 'Four groups',
      body: 'The small muscles of the hand lie wholly inside it: the thenar muscles at the base of the thumb, the hypothenar muscles at the base of the little finger, adductor pollicis in the web of the thumb, and the lumbricals and interossei in the middle of the palm.',
      focus: [
        'thenar-muscles',
        'hypothenar-muscles',
        'adductor-pollicis',
        'lumbricals',
        'dorsal-interossei',
        'palmar-interossei',
      ],
    },
    {
      id: 'thenar',
      title: 'Thenar muscles',
      body: 'Abductor pollicis brevis, flexor pollicis brevis and opponens pollicis arise from the flexor retinaculum and the scaphoid and trapezium. Together they turn the thumb to face the fingers, so its tip can touch theirs: opposition. The recurrent branch of the median nerve supplies them.',
      focus: ['thenar-muscles', 'oppose', 'median'],
    },
    {
      id: 'hypothenar-adductor',
      title: 'Hypothenar muscles and adductor pollicis',
      body: 'Abductor, flexor and opponens digiti minimi move the little finger and cup the palm. Adductor pollicis, with an oblique and a transverse head, pulls the thumb against the palm, as when gripping a card. The deep branch of the ulnar nerve supplies both.',
      focus: [
        'hypothenar-muscles',
        'little-finger',
        'adductor-pollicis',
        'adduct-thumb',
        'deep-ulnar',
      ],
    },
    {
      id: 'lumbricals',
      title: 'Lumbricals',
      body: 'Four worm-like muscles arise from the profundus tendons and join the extensor expansions on the radial side of the fingers. They bend the knuckles while straightening the finger joints, the position for writing. The first and second (to the index and middle fingers) are supplied by the median nerve, the third and fourth by the deep branch of the ulnar nerve.',
      focus: ['lumbricals', 'knuckles', 'median', 'deep-ulnar'],
    },
    {
      id: 'interossei',
      title: 'Interossei',
      body: 'Four dorsal interossei, each with two heads, fill the spaces between the metacarpals and spread the fingers away from the line of the middle finger. The palmar interossei, on the palm side, bring the fingers together. Remember DAB and PAD. Both help the lumbricals, and the deep branch of the ulnar nerve supplies them all.',
      focus: ['dorsal-interossei', 'palmar-interossei', 'abduct', 'adduct', 'deep-ulnar'],
    },
    {
      id: 'test',
      title: 'Testing them',
      body: 'Card test: hold a card between two fingers against a pull (palmar interossei). Spread the fingers against resistance, feeling the first dorsal interosseous in the web (dorsal interossei). Hold paper between the thumb and index finger: a bent thumb tip is the Froment sign of a weak adductor pollicis. Touch the thumb to the little finger tip (opposition).',
      focus: ['palmar-interossei', 'dorsal-interossei', 'adductor-pollicis', 'thenar-muscles'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a nerve to see its muscles and what they do. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'hand-muscles-dorsal-interossei',
      prompt: 'The dorsal interossei of the hand:',
      options: [
        { id: 'abduct', text: 'Spread the fingers away from the middle finger' },
        { id: 'adduct', text: 'Bring the fingers together' },
        { id: 'oppose', text: 'Oppose the thumb' },
        { id: 'extend', text: 'Extend the knuckles' },
      ],
      answerId: 'abduct',
      explanation:
        'Dorsal abduct, palmar adduct. Both groups also bend the knuckles and straighten the finger joints.',
    },
    {
      id: 'hand-muscles-lumbrical-nerve',
      prompt: 'The first and second lumbricals are supplied by the:',
      options: [
        { id: 'median', text: 'Median nerve' },
        { id: 'deep-ulnar', text: 'Deep branch of the ulnar nerve' },
        { id: 'superficial-ulnar', text: 'Superficial branch of the ulnar nerve' },
        { id: 'radial', text: 'Radial nerve' },
      ],
      answerId: 'median',
      explanation:
        'The median nerve supplies the lateral two lumbricals; the deep branch of the ulnar nerve supplies the medial two.',
    },
    {
      id: 'hand-muscles-froment',
      prompt: 'A positive Froment sign shows weakness of:',
      options: [
        { id: 'adductor', text: 'Adductor pollicis' },
        { id: 'apb', text: 'Abductor pollicis brevis' },
        { id: 'fpl', text: 'Flexor pollicis longus' },
        { id: 'opponens', text: 'Opponens pollicis' },
      ],
      answerId: 'adductor',
      explanation:
        'With adductor pollicis weak, the student grips paper by bending the thumb tip with flexor pollicis longus, supplied by the median nerve.',
    },
    {
      id: 'hand-muscles-root',
      prompt: 'Every small muscle of the hand is supplied by which spinal segment?',
      options: [
        { id: 't1', text: 'T1' },
        { id: 'c5', text: 'C5' },
        { id: 'c6', text: 'C6' },
        { id: 'c7', text: 'C7' },
      ],
      answerId: 't1',
      explanation:
        'T1 (with C8) supplies all of them, which is why a lower plexus injury causes a complete claw hand.',
    },
  ],
  cards: [
    {
      id: 'hand-muscles-thenar',
      front: 'The thenar muscles and their nerve?',
      back: 'Abductor pollicis brevis, flexor pollicis brevis, opponens pollicis: the recurrent branch of the median nerve.',
    },
    {
      id: 'hand-muscles-ulnar',
      front: 'Small muscles of the hand supplied by the deep branch of the ulnar nerve?',
      back: 'Hypothenar muscles, adductor pollicis, all interossei, third and fourth lumbricals.',
    },
    {
      id: 'hand-muscles-lumbrical-action',
      front: 'Action of the lumbricals?',
      back: 'Flex the knuckles and extend the finger joints, the writing position.',
    },
    {
      id: 'hand-muscles-dab-pad',
      front: 'What do DAB and PAD stand for?',
      back: 'Dorsal interossei abduct, palmar interossei adduct, measured from the line of the middle finger.',
    },
    {
      id: 'hand-muscles-card-test',
      front: 'What does the card test check?',
      back: 'The palmar interossei (ulnar nerve): holding a card between two fingers against a pull.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '127–132' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '795–801' },
  ],
};
