import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  MIDPALMAR_SPACE,
  PALMAR_APONEUROSIS,
  PULP_SPACE,
  RADIAL_BURSA,
  THENAR_SPACE,
  ULNAR_BURSA,
} from './hand-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 4 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const palmSpaces: Topic = {
  slug: 'palm-spaces',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Palm: aponeurosis, spaces and synovial sheaths',
  summary:
    'The palmar aponeurosis, the fascial spaces where pus collects, and the synovial sheaths that carry infection from a finger into the palm and forearm.',
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
      'Volume 1, Chapter 9 Forearm and Hand, pages 126 to 127 and 142 to 144',
    ),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, hand, pages 791 to 792'),
    {
      title: 'TeachMeAnatomy: The Palm of the Hand',
      url: 'https://teachmeanatomy.info/upper-limb/areas/palm/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, tendons and muscles in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The palmar aponeurosis is the thickened deep fascia of the central palm: its apex continues palmaris longus at the retinaculum and its base splits into four slips to the fingers. It protects the vessels and nerves beneath and helps grip.',
    'Deep to the flexor tendons lie two fascial spaces, the thenar space laterally and the midpalmar space medially, divided by a septum to the third metacarpal.',
    'The ulnar bursa wraps the superficialis and profundus tendons from above the wrist into the palm and continues along the little finger; the radial bursa wraps flexor pollicis longus to the thumb tip.',
    'The index, middle and ring fingers have their own digital sheaths, separate from the bursae.',
    'The pulp space of a fingertip is divided by fibrous septa, so an infection there (whitlow) builds up pressure and hurts badly.',
  ],
  visual: {
    kind: 'path',
    // Left: the aponeurosis and the fascial spaces. Right: the synovial sheaths and where each
    // leads. Bottom: the fingertip.
    diagram: {
      width: 360,
      height: 390,
      nodes: [
        {
          id: 'palmaris-longus',
          label: 'Palmaris\nlongus',
          name: 'Palmaris longus',
          x: 70,
          y: 30,
        },
        {
          id: 'palmar-aponeurosis',
          label: 'Palmar\naponeurosis',
          name: 'Palmar aponeurosis',
          x: 70,
          y: 100,
        },
        {
          id: 'septum',
          label: 'Septum to\n3rd metacarpal',
          name: 'Intermediate palmar septum, to the third metacarpal',
          x: 70,
          y: 170,
        },
        {
          id: 'thenar-space',
          label: 'Thenar\nspace',
          name: 'Thenar space',
          x: 40,
          y: 245,
        },
        {
          id: 'midpalmar-space',
          label: 'Midpalmar\nspace',
          name: 'Midpalmar space',
          x: 120,
          y: 245,
        },
        {
          id: 'ulnar-bursa',
          label: 'Ulnar\nbursa',
          name: 'Ulnar bursa, the common flexor sheath',
          x: 230,
          y: 60,
        },
        {
          id: 'radial-bursa',
          label: 'Radial\nbursa',
          name: 'Radial bursa, the sheath of flexor pollicis longus',
          x: 320,
          y: 60,
        },
        {
          id: 'flexor-digitorum-superficialis',
          label: 'Finger\nflexors',
          name: 'Superficialis and profundus tendons',
          x: 230,
          y: 130,
        },
        {
          id: 'flexor-pollicis-longus',
          label: 'Flexor poll.\nlongus',
          name: 'Flexor pollicis longus tendon',
          x: 315,
          y: 130,
        },
        {
          id: 'little-finger-sheath',
          label: 'Little finger\nsheath',
          name: 'Digital sheath of the little finger',
          x: 200,
          y: 200,
        },
        {
          id: 'thumb-sheath',
          label: 'Thumb\nsheath',
          name: 'Sheath along the thumb',
          x: 320,
          y: 200,
        },
        {
          id: 'middle-sheaths',
          label: 'Index, middle,\nring sheaths',
          name: 'Separate digital sheaths of the index, middle and ring fingers',
          x: 270,
          y: 275,
        },
        {
          id: 'pulp-space',
          label: 'Pulp\nspace',
          name: 'Pulp space of a fingertip',
          x: 90,
          y: 340,
        },
        {
          id: 'distal-phalanx',
          label: 'Distal\nphalanx',
          name: 'Distal phalanx',
          x: 200,
          y: 340,
        },
      ],
      edges: [
        { from: 'palmaris-longus', to: 'palmar-aponeurosis' },
        { from: 'palmar-aponeurosis', to: 'septum' },
        { from: 'septum', to: 'thenar-space' },
        { from: 'septum', to: 'midpalmar-space' },
        { from: 'ulnar-bursa', to: 'flexor-digitorum-superficialis' },
        { from: 'radial-bursa', to: 'flexor-pollicis-longus' },
        { from: 'flexor-digitorum-superficialis', to: 'little-finger-sheath' },
        { from: 'flexor-pollicis-longus', to: 'thumb-sheath' },
        { from: 'flexor-digitorum-superficialis', to: 'middle-sheaths' },
        { from: 'pulp-space', to: 'distal-phalanx' },
      ],
    },
    lesions: [
      {
        id: 'dupuytren',
        label: 'Dupuytren contracture',
        nodeIds: ['palmar-aponeurosis'],
        explanation:
          'The aponeurosis thickens and shortens, most often over the ring and little fingers, forming nodules and cords in the palm. The fingers are pulled into a bent position at the knuckle and middle joints and cannot be straightened. It is painless, commoner in older men and runs in families.',
      },
      {
        id: 'tenosynovitis',
        label: 'Infected tendon sheath',
        nodeIds: ['little-finger-sheath', 'ulnar-bursa', 'radial-bursa'],
        explanation:
          'A puncture of the little finger infects its sheath, which leads straight into the ulnar bursa and the palm; a thumb infection spreads through the radial bursa. As the two bursae often meet above the wrist, pus can pass from one to the other (a horseshoe abscess) and on into the forearm. The finger is held bent, swollen along its length, and stretching it hurts.',
      },
      {
        id: 'whitlow',
        label: 'Whitlow (pulp infection)',
        nodeIds: ['pulp-space', 'distal-phalanx'],
        explanation:
          'The fibrous septa of the pulp make it a set of closed pockets, so pus raises the pressure quickly: a throbbing fingertip. The vessels to most of the distal phalanx run through the pulp, so an untreated whitlow can kill the bone. It is drained by an incision at the side of the fingertip.',
      },
    ],
    drill: [
      {
        id: 'aponeurosis-spaces',
        title: 'Aponeurosis and spaces',
        hint: 'What the aponeurosis continues, and the septum that divides the space beneath.',
        nodeIds: [
          'palmaris-longus',
          'palmar-aponeurosis',
          'septum',
          'thenar-space',
          'midpalmar-space',
        ],
      },
      {
        id: 'sheaths',
        title: 'Synovial sheaths',
        hint: 'Two bursae, what each wraps, and which digits they continue into.',
        nodeIds: [
          'ulnar-bursa',
          'radial-bursa',
          'flexor-digitorum-superficialis',
          'flexor-pollicis-longus',
          'little-finger-sheath',
          'thumb-sheath',
          'middle-sheaths',
        ],
      },
      {
        id: 'fingertip',
        title: 'The fingertip',
        hint: 'The space in the fingertip and the bone at risk.',
        nodeIds: ['pulp-space', 'distal-phalanx'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Aponeurosis, spaces and sheaths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'palmaris-longus',
        'flexor-digitorum-superficialis',
        'flexor-digitorum-profundus',
        'flexor-pollicis-longus',
        'flexor-retinaculum',
        'thenar-muscles',
        'hypothenar-muscles',
        'adductor-pollicis',
        'lumbricals',
        ...HAND_BONES,
        'radius',
        'ulna',
      ]),
      traces: [
        { id: 'palmar-aponeurosis', kind: 'outline', paths: PALMAR_APONEUROSIS },
        { id: 'thenar-space', kind: 'outline', paths: THENAR_SPACE },
        { id: 'midpalmar-space', kind: 'outline', paths: MIDPALMAR_SPACE },
        { id: 'ulnar-bursa', kind: 'outline', paths: ULNAR_BURSA },
        { id: 'radial-bursa', kind: 'outline', paths: RADIAL_BURSA },
        { id: 'pulp-space', kind: 'outline', paths: PULP_SPACE },
      ],
      stops: [
        {
          id: 'aponeurosis',
          title: 'Palmar aponeurosis',
          description:
            'A triangle of tough fascia from the end of palmaris longus at the wrist to the bases of the four fingers, lying over the flexor tendons.',
          target: [-258, -145, 755],
          position: [-335, -489, 790],
        },
        {
          id: 'spaces',
          title: 'Spaces and sheaths',
          description:
            'Deep to the tendons: the thenar space on the thumb side and the midpalmar space on the little finger side. The ulnar bursa runs down to the little finger, the radial bursa to the thumb.',
          target: [-262, -142, 765],
          position: [-300, -420, 840],
        },
        {
          id: 'fingertip',
          title: 'Fingertip',
          description:
            'The pulp of the fingertip, packed with fat in small fibrous pockets, lies in front of the distal phalanx.',
          target: [-305, -182, 670],
          position: [-420, -380, 690],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'aponeurosis',
      title: 'Palmar aponeurosis',
      body: 'The deep fascia of the central palm is thickened into a tough triangle. Its apex joins the flexor retinaculum and continues the tendon of palmaris longus; its base splits into four slips that pass to the fingers. It shields the superficial palmar arch and the digital vessels and nerves, and anchors the skin for a firm grip.',
      focus: ['palmaris-longus', 'palmar-aponeurosis'],
    },
    {
      id: 'spaces',
      title: 'Thenar and midpalmar spaces',
      body: 'Beneath the flexor tendons and lumbricals lies a potential space, split by a septum from the aponeurosis to the third metacarpal. The thenar space lies on the thumb side, in front of adductor pollicis; the midpalmar space lies on the little finger side, in front of the interossei. Infection in either swells the palm and is drained through an incision in the web.',
      focus: ['septum', 'thenar-space', 'midpalmar-space'],
    },
    {
      id: 'ulnar-bursa',
      title: 'Ulnar bursa',
      body: 'The superficialis and profundus tendons pass through the carpal tunnel in one synovial sheath, the ulnar bursa. It begins above the wrist, reaches the middle of the palm, and continues along the little finger as its digital sheath.',
      focus: ['ulnar-bursa', 'flexor-digitorum-superficialis', 'little-finger-sheath'],
    },
    {
      id: 'radial-bursa',
      title: 'Radial bursa and the other sheaths',
      body: 'Flexor pollicis longus has its own sheath, the radial bursa, from above the wrist to the thumb tip. The index, middle and ring fingers have separate digital sheaths that stop short of the palm. So an infection of the thumb or little finger can travel into the palm and forearm, while one in the middle three fingers usually stays in the finger.',
      focus: ['radial-bursa', 'flexor-pollicis-longus', 'thumb-sheath', 'middle-sheaths'],
    },
    {
      id: 'pulp',
      title: 'The pulp space',
      body: 'The fingertip pulp is fat divided into small pockets by fibrous septa that run from the skin to the distal phalanx. Infection here (a whitlow) is very painful because the pockets cannot swell, and it can cut off the blood supply of most of the distal phalanx.',
      focus: ['pulp-space', 'distal-phalanx'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each space and sheath to see where it lies in the hand. Then turn on an infection to see where it spreads.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'palm-spaces-little-finger',
      prompt: 'Infection of the tendon sheath of the little finger spreads first into the:',
      options: [
        { id: 'ulnar-bursa', text: 'Ulnar bursa' },
        { id: 'radial-bursa', text: 'Radial bursa' },
        { id: 'thenar', text: 'Thenar space' },
        { id: 'pulp', text: 'Pulp space' },
      ],
      answerId: 'ulnar-bursa',
      explanation:
        'The sheath of the little finger is continuous with the ulnar bursa, the common flexor sheath of the palm.',
    },
    {
      id: 'palm-spaces-septum',
      prompt: 'The septum that divides the thenar from the midpalmar space is attached to the:',
      options: [
        { id: 'third', text: 'Third metacarpal' },
        { id: 'first', text: 'First metacarpal' },
        { id: 'fifth', text: 'Fifth metacarpal' },
        { id: 'hamate', text: 'Hook of the hamate' },
      ],
      answerId: 'third',
      explanation:
        'The septum runs from the palmar aponeurosis to the third metacarpal, with the thenar space lateral to it.',
    },
    {
      id: 'palm-spaces-dupuytren',
      prompt: 'Dupuytren contracture is a disease of the:',
      options: [
        { id: 'aponeurosis', text: 'Palmar aponeurosis' },
        { id: 'retinaculum', text: 'Flexor retinaculum' },
        { id: 'sheath', text: 'Flexor tendon sheaths' },
        { id: 'interossei', text: 'Interossei' },
      ],
      answerId: 'aponeurosis',
      explanation:
        'The aponeurosis thickens and shortens, pulling the ring and little fingers into flexion.',
    },
    {
      id: 'palm-spaces-radial-bursa',
      prompt: 'The radial bursa encloses the tendon of:',
      options: [
        { id: 'fpl', text: 'Flexor pollicis longus' },
        { id: 'fcr', text: 'Flexor carpi radialis' },
        { id: 'apl', text: 'Abductor pollicis longus' },
        { id: 'fds', text: 'Flexor digitorum superficialis' },
      ],
      answerId: 'fpl',
      explanation:
        'The radial bursa is the sheath of flexor pollicis longus, from above the wrist to the thumb tip.',
    },
  ],
  cards: [
    {
      id: 'palm-spaces-aponeurosis',
      front: 'Palmar aponeurosis: apex and base?',
      back: 'Apex continues palmaris longus at the retinaculum; base splits into four slips to the fingers.',
    },
    {
      id: 'palm-spaces-two-spaces',
      front: 'The two fascial spaces of the palm?',
      back: 'Thenar (lateral, in front of adductor pollicis) and midpalmar (medial, in front of the interossei), divided by a septum to the third metacarpal.',
    },
    {
      id: 'palm-spaces-bursae',
      front: 'Ulnar and radial bursae: contents and continuations?',
      back: 'Ulnar: superficialis and profundus tendons, continuous with the little finger sheath. Radial: flexor pollicis longus, to the thumb tip.',
    },
    {
      id: 'palm-spaces-middle-fingers',
      front: 'Why does infection of the middle finger usually stay in the finger?',
      back: 'The index, middle and ring fingers have separate digital sheaths that do not reach the palmar bursae.',
    },
    {
      id: 'palm-spaces-whitlow',
      front: 'Why is a whitlow dangerous?',
      back: 'Fibrous septa trap the pus under pressure, and the vessels to most of the distal phalanx pass through the pulp, so the bone can die.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '126–127, 142–144' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '791–792' },
  ],
};
