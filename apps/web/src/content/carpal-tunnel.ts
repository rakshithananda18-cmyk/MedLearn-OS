import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { between, MEDIAN_FOREARM, MEDIAN_RECURRENT_BRANCH, ULNAR_FOREARM } from './forearm-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 3 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const carpalTunnel: Topic = {
  slug: 'carpal-tunnel',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Wrist: flexor retinaculum and carpal tunnel',
  summary:
    'The band across the front of the wrist, what passes through the tunnel under it and what passes in front of it, and carpal tunnel syndrome.',
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
      'Volume 1, Chapter 9 Forearm and Hand, pages 124 to 125, and carpal tunnel syndrome, pages 138 to 140',
    ),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, hand, pages 789 to 790'),
    {
      title: 'TeachMeAnatomy: The Carpal Tunnel',
      url: 'https://teachmeanatomy.info/upper-limb/areas/carpal-tunnel/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, muscles, tendons and arteries in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The flexor retinaculum is a thick band of deep fascia across the front of the carpus that turns the carpal groove into the carpal tunnel.',
    'Medially it attaches to the pisiform and the hook of the hamate; laterally to the tubercle of the scaphoid and the crest of the trapezium.',
    'Through the tunnel: the median nerve and nine tendons, four of superficialis, four of profundus and flexor pollicis longus. Flexor carpi radialis runs in its own split of the retinaculum.',
    'In front of it: palmaris longus, the palmar cutaneous branches of the median and ulnar nerves, and the ulnar nerve and artery beside the pisiform.',
    'Carpal tunnel syndrome squeezes the median nerve: tingling in the thumb, index, middle and half the ring finger, worse at night, and later a weak, wasted thenar eminence. The central palm keeps its feeling.',
  ],
  visual: {
    kind: 'path',
    // Top: the retinaculum and its four bony attachments. Left: what runs through the tunnel.
    // Right: what runs in front of the retinaculum.
    diagram: {
      width: 360,
      height: 430,
      nodes: [
        { id: 'scaphoid', label: 'Scaphoid', name: 'Tubercle of the scaphoid', x: 50, y: 30 },
        {
          id: 'flexor-retinaculum',
          label: 'Flexor\nretinaculum',
          name: 'Flexor retinaculum',
          x: 180,
          y: 30,
        },
        { id: 'pisiform', label: 'Pisiform', name: 'Pisiform', x: 310, y: 30 },
        { id: 'trapezium', label: 'Trapezium', name: 'Crest of the trapezium', x: 50, y: 80 },
        { id: 'hamate', label: 'Hook of\nhamate', name: 'Hook of the hamate', x: 310, y: 80 },
        { id: 'tunnel', label: 'Carpal\ntunnel', name: 'Through the carpal tunnel', x: 90, y: 150 },
        {
          id: 'superficial',
          label: 'In front of\nretinaculum',
          name: 'In front of the flexor retinaculum',
          x: 270,
          y: 150,
        },
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 40, y: 220 },
        {
          id: 'flexor-digitorum-superficialis',
          label: 'Superficialis\ntendons',
          name: 'Four tendons of flexor digitorum superficialis',
          x: 135,
          y: 220,
        },
        {
          id: 'flexor-digitorum-profundus',
          label: 'Profundus\ntendons',
          name: 'Four tendons of flexor digitorum profundus',
          x: 135,
          y: 270,
        },
        {
          id: 'flexor-pollicis-longus',
          label: 'Flexor poll.\nlongus',
          name: 'Tendon of flexor pollicis longus',
          x: 135,
          y: 320,
        },
        {
          id: 'recurrent-branch',
          label: 'Recurrent\nbranch',
          name: 'Recurrent (thenar) branch of the median nerve',
          x: 40,
          y: 290,
        },
        {
          id: 'thenar-muscles',
          label: 'Thenar\nmuscles',
          name: 'Thenar muscles',
          x: 40,
          y: 360,
        },
        {
          id: 'palmaris-longus',
          label: 'Palmaris\nlongus',
          name: 'Tendon of palmaris longus',
          x: 225,
          y: 220,
        },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 315, y: 220 },
        {
          id: 'palmar-cutaneous',
          label: 'Palmar cut.\nbranches',
          name: 'Palmar cutaneous branches of the median and ulnar nerves',
          x: 225,
          y: 280,
        },
        {
          id: 'hypothenar-muscles',
          label: 'Hypothenar\nmuscles',
          name: 'Hypothenar muscles',
          x: 315,
          y: 300,
        },
        { id: 'ulnar-artery', label: 'Ulnar\nartery', name: 'Ulnar artery', x: 225, y: 340 },
        {
          id: 'superficial-palmar-arch',
          label: 'Superficial\npalmar arch',
          name: 'Superficial palmar arch',
          x: 225,
          y: 400,
        },
      ],
      edges: [
        { from: 'flexor-retinaculum', to: 'scaphoid' },
        { from: 'flexor-retinaculum', to: 'trapezium' },
        { from: 'flexor-retinaculum', to: 'pisiform' },
        { from: 'flexor-retinaculum', to: 'hamate' },
        { from: 'flexor-retinaculum', to: 'tunnel' },
        { from: 'flexor-retinaculum', to: 'superficial' },
        { from: 'tunnel', to: 'median' },
        { from: 'tunnel', to: 'flexor-digitorum-superficialis' },
        { from: 'tunnel', to: 'flexor-digitorum-profundus' },
        { from: 'tunnel', to: 'flexor-pollicis-longus' },
        { from: 'median', to: 'recurrent-branch' },
        { from: 'recurrent-branch', to: 'thenar-muscles' },
        { from: 'superficial', to: 'palmaris-longus' },
        { from: 'superficial', to: 'ulnar' },
        { from: 'superficial', to: 'palmar-cutaneous' },
        { from: 'superficial', to: 'ulnar-artery' },
        { from: 'ulnar', to: 'hypothenar-muscles' },
        { from: 'ulnar-artery', to: 'superficial-palmar-arch' },
      ],
    },
    lesions: [
      {
        id: 'carpal-tunnel-syndrome',
        label: 'Carpal tunnel syndrome',
        nodeIds: ['median', 'recurrent-branch', 'thenar-muscles'],
        explanation:
          'Anything that crowds the tunnel squeezes the median nerve: pregnancy, an underactive thyroid, rheumatoid arthritis, a wrist fracture or a dislocated lunate. The thumb, index, middle and half the ring finger tingle, often waking the student at night. Later the thenar muscles waste and the thumb cannot be lifted away from the palm. The central palm keeps its feeling, because its branch runs in front of the retinaculum. Tapping over the nerve or holding the wrist fully bent brings on the tingling. Cutting the retinaculum relieves it.',
      },
      {
        id: 'ulnar-canal',
        label: 'Ulnar nerve squeezed beside the pisiform',
        nodeIds: ['ulnar', 'hypothenar-muscles'],
        explanation:
          'In front of the retinaculum, between the pisiform and the hook of the hamate, the ulnar nerve lies in a short canal. Long cycling on dropped handlebars or a ganglion can press it there. The small muscles of the hand, including the hypothenar muscles, are weak, and the palm side of the little finger may go numb. The back of the hand is spared: the dorsal branch left higher up.',
      },
    ],
    drill: [
      {
        id: 'attachments',
        title: 'Attachments',
        hint: 'Two bones on each side.',
        nodeIds: ['scaphoid', 'trapezium', 'pisiform', 'hamate'],
      },
      {
        id: 'tunnel',
        title: 'Through the tunnel',
        hint: 'One nerve and nine tendons, then the branch the nerve gives in the palm.',
        nodeIds: [
          'median',
          'flexor-digitorum-superficialis',
          'flexor-digitorum-profundus',
          'flexor-pollicis-longus',
          'recurrent-branch',
          'thenar-muscles',
        ],
      },
      {
        id: 'superficial',
        title: 'In front of it',
        hint: 'A tendon, two skin branches, and the nerve and artery beside the pisiform.',
        nodeIds: [
          'palmaris-longus',
          'ulnar',
          'palmar-cutaneous',
          'ulnar-artery',
          'hypothenar-muscles',
          'superficial-palmar-arch',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'flexor-retinaculum',
        ...HAND_BONES,
        'radius',
        'ulna',
        'flexor-digitorum-superficialis',
        'flexor-digitorum-profundus',
        'flexor-pollicis-longus',
        'flexor-carpi-radialis',
        'palmaris-longus',
        'flexor-carpi-ulnaris',
        'thenar-muscles',
        'hypothenar-muscles',
        'ulnar-artery',
        'radial-artery',
        'superficial-palmar-arch',
        'deep-palmar-arch',
      ]),
      traces: [
        { id: 'median', kind: 'nerve', paths: between(MEDIAN_FOREARM, 700, 880) },
        { id: 'recurrent-branch', kind: 'nerve', paths: MEDIAN_RECURRENT_BRANCH },
        { id: 'ulnar', kind: 'nerve', paths: between(ULNAR_FOREARM, 700, 880) },
      ],
      stops: [
        {
          id: 'front',
          title: 'Front of the wrist',
          description:
            'The retinaculum bridges the front of the carpal bones, from the pisiform and hamate on the medial side to the scaphoid and trapezium on the lateral side.',
          target: [-255, -132, 790],
          position: [-322, -455, 807],
        },
        {
          id: 'tunnel',
          title: 'Into the tunnel',
          description:
            'The median nerve and the long flexor tendons pass under the retinaculum. The ulnar nerve and artery stay in front of it, beside the pisiform.',
          target: [-252, -128, 795],
          position: [-298, -372, 627],
        },
        {
          id: 'palm',
          title: 'In the palm',
          description:
            'Beyond the tunnel the recurrent branch of the median nerve curls back into the thenar muscles, and the ulnar artery forms the superficial palmar arch.',
          target: [-262, -138, 760],
          position: [-371, -479, 724],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'retinaculum',
      title: 'The flexor retinaculum',
      body: 'The carpal bones form a groove on the front of the wrist. A thick band of deep fascia, the flexor retinaculum, bridges the groove and turns it into a tunnel. It also holds the long flexor tendons down when the wrist bends.',
      focus: ['flexor-retinaculum', 'tunnel'],
    },
    {
      id: 'attachments',
      title: 'Four attachments',
      body: 'Medially the retinaculum attaches to the pisiform and the hook of the hamate; laterally to the tubercle of the scaphoid and the crest of the trapezium. Its lateral part splits round a groove on the trapezium, making a separate channel for the flexor carpi radialis tendon.',
      focus: ['scaphoid', 'trapezium', 'pisiform', 'hamate'],
    },
    {
      id: 'contents',
      title: 'Through the tunnel',
      body: 'Ten structures pass through: the median nerve, the four superficialis tendons, the four profundus tendons and the flexor pollicis longus tendon. The median nerve lies just under the retinaculum, the most superficial of them and so the first to be squeezed.',
      focus: [
        'median',
        'flexor-digitorum-superficialis',
        'flexor-digitorum-profundus',
        'flexor-pollicis-longus',
      ],
    },
    {
      id: 'superficial',
      title: 'In front of it',
      body: 'Palmaris longus runs in front of the retinaculum into the palmar aponeurosis. The palmar cutaneous branches of the median and ulnar nerves cross it too. On the medial side the ulnar nerve and artery pass in front of it, lateral to the pisiform, and enter the palm.',
      focus: ['palmaris-longus', 'palmar-cutaneous', 'ulnar', 'ulnar-artery'],
    },
    {
      id: 'palm',
      title: 'Into the palm',
      body: 'Beyond the tunnel the median nerve gives its recurrent branch, which curls back to supply the thenar muscles, and digital branches to the lateral three and a half fingers. The ulnar nerve supplies the hypothenar muscles, and the ulnar artery forms the superficial palmar arch.',
      focus: [
        'recurrent-branch',
        'thenar-muscles',
        'hypothenar-muscles',
        'superficial-palmar-arch',
      ],
    },
    {
      id: 'syndrome',
      title: 'Carpal tunnel syndrome',
      body: 'The tunnel cannot stretch, so any swelling inside it presses on the median nerve. The lateral three and a half fingers tingle and go numb, often at night; later the thenar muscles waste. The skin of the central palm is spared because its branch runs in front of the retinaculum.',
      focus: ['median', 'recurrent-branch', 'thenar-muscles', 'palmar-cutaneous'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each structure to see whether it runs through the tunnel or in front of it. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'carpal-tunnel-not-through',
      prompt: 'Which of these does not pass through the carpal tunnel?',
      options: [
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'median', text: 'Median nerve' },
        { id: 'fpl', text: 'Flexor pollicis longus tendon' },
        { id: 'fdp', text: 'Flexor digitorum profundus tendons' },
      ],
      answerId: 'ulnar',
      explanation:
        'The ulnar nerve and artery pass in front of the flexor retinaculum, beside the pisiform.',
    },
    {
      id: 'carpal-tunnel-lateral-attachment',
      prompt: 'Laterally, the flexor retinaculum is attached to the:',
      options: [
        { id: 'scaphoid-trapezium', text: 'Tubercle of the scaphoid and crest of the trapezium' },
        { id: 'pisiform-hamate', text: 'Pisiform and hook of the hamate' },
        { id: 'radius', text: 'Styloid process of the radius' },
        { id: 'capitate', text: 'Capitate and trapezoid' },
      ],
      answerId: 'scaphoid-trapezium',
      explanation: 'Laterally scaphoid and trapezium; medially pisiform and hamate.',
    },
    {
      id: 'carpal-tunnel-palm-spared',
      prompt: 'In carpal tunnel syndrome the skin of the central palm keeps its feeling because:',
      options: [
        {
          id: 'palmar-branch',
          text: 'The palmar cutaneous branch of the median nerve passes in front of the retinaculum',
        },
        { id: 'ulnar', text: 'The ulnar nerve supplies it' },
        { id: 'radial', text: 'The radial nerve supplies it' },
        { id: 'recurrent', text: 'The recurrent branch supplies it' },
      ],
      answerId: 'palmar-branch',
      explanation:
        'The palmar cutaneous branch leaves the median nerve above the wrist and does not enter the tunnel.',
    },
    {
      id: 'carpal-tunnel-thenar',
      prompt: 'Wasting of the thenar eminence in carpal tunnel syndrome is due to damage to the:',
      options: [
        { id: 'recurrent', text: 'Recurrent branch of the median nerve' },
        { id: 'ain', text: 'Anterior interosseous nerve' },
        { id: 'deep-ulnar', text: 'Deep branch of the ulnar nerve' },
        { id: 'superficial-radial', text: 'Superficial branch of the radial nerve' },
      ],
      answerId: 'recurrent',
      explanation:
        'The recurrent branch leaves the median nerve beyond the tunnel and supplies abductor pollicis brevis, flexor pollicis brevis and opponens pollicis.',
    },
  ],
  cards: [
    {
      id: 'carpal-tunnel-attachments',
      front: 'Attachments of the flexor retinaculum?',
      back: 'Medially: pisiform and hook of the hamate. Laterally: tubercle of the scaphoid and crest of the trapezium.',
    },
    {
      id: 'carpal-tunnel-contents',
      front: 'Contents of the carpal tunnel?',
      back: 'Median nerve and nine tendons: four superficialis, four profundus, flexor pollicis longus.',
    },
    {
      id: 'carpal-tunnel-superficial',
      front: 'Structures in front of the flexor retinaculum?',
      back: 'Palmaris longus tendon, palmar cutaneous branches of the median and ulnar nerves, ulnar nerve and artery.',
    },
    {
      id: 'carpal-tunnel-fcr',
      front: 'Where does the flexor carpi radialis tendon cross the wrist?',
      back: 'In its own channel, in a split of the retinaculum over the groove on the trapezium, not in the main tunnel.',
    },
    {
      id: 'carpal-tunnel-signs',
      front: 'Signs of carpal tunnel syndrome?',
      back: 'Tingling of the lateral three and a half fingers, worse at night; weak, wasted thenar muscles; central palm spared; tapping or full wrist flexion brings on symptoms.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '124–125, 138–140' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '789–790' },
  ],
};
