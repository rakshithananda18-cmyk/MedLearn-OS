import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANTERIOR_INTEROSSEOUS_NERVE,
  MEDIAN_FOREARM,
  MEDIAN_RECURRENT_BRANCH,
  ULNAR_FOREARM,
} from './forearm-3d';
import {
  HAND_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 3 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const forearmFlexors: Topic = {
  slug: 'forearm-flexors',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Forearm: the front compartment muscles',
  summary:
    'Eight flexor and pronator muscles in three layers, what each does, and why the median nerve supplies all but one and a half of them.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 9 Forearm and Hand, pages 115 to 120'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, forearm, pages 766 to 771'),
    {
      title: 'TeachMeAnatomy: Muscles of the Anterior Forearm',
      url: 'https://teachmeanatomy.info/upper-limb/muscles/anterior-forearm/',
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
    'Superficial layer, from the common flexor origin on the medial epicondyle, lateral to medial: pronator teres, flexor carpi radialis, palmaris longus, flexor carpi ulnaris.',
    'Intermediate layer: flexor digitorum superficialis, whose tendons split to reach the middle phalanges of the fingers.',
    'Deep layer: flexor digitorum profundus (to the distal phalanges), flexor pollicis longus (to the distal phalanx of the thumb) and pronator quadratus.',
    'The median nerve and its anterior interosseous branch supply every muscle here except flexor carpi ulnaris and the medial half of flexor digitorum profundus, which the ulnar nerve supplies.',
    'Profundus tendons pass through the split superficialis tendons: superficialis bends the middle joint of a finger, profundus the end joint.',
  ],
  visual: {
    kind: 'path',
    // Nerves on the left, the eight muscles from superficial to deep in the middle, and what they
    // do on the right.
    diagram: {
      width: 360,
      height: 430,
      nodes: [
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 60, y: 105 },
        {
          id: 'anterior-interosseous',
          label: 'Anterior\ninterosseous',
          name: 'Anterior interosseous nerve',
          x: 60,
          y: 290,
        },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 60, y: 400 },
        {
          id: 'pronator-teres',
          label: 'Pronator\nteres',
          name: 'Pronator teres',
          x: 190,
          y: 30,
        },
        {
          id: 'flexor-carpi-radialis',
          label: 'Flexor carpi\nradialis',
          name: 'Flexor carpi radialis',
          x: 190,
          y: 80,
        },
        {
          id: 'palmaris-longus',
          label: 'Palmaris\nlongus',
          name: 'Palmaris longus',
          x: 190,
          y: 130,
        },
        {
          id: 'flexor-digitorum-superficialis',
          label: 'Flexor dig.\nsuperficialis',
          name: 'Flexor digitorum superficialis',
          x: 190,
          y: 180,
        },
        {
          id: 'flexor-pollicis-longus',
          label: 'Flexor poll.\nlongus',
          name: 'Flexor pollicis longus',
          x: 190,
          y: 240,
        },
        {
          id: 'flexor-digitorum-profundus',
          label: 'Flexor dig.\nprofundus',
          name: 'Flexor digitorum profundus',
          x: 190,
          y: 290,
        },
        {
          id: 'pronator-quadratus',
          label: 'Pronator\nquadratus',
          name: 'Pronator quadratus',
          x: 190,
          y: 340,
        },
        {
          id: 'flexor-carpi-ulnaris',
          label: 'Flexor carpi\nulnaris',
          name: 'Flexor carpi ulnaris',
          x: 190,
          y: 400,
        },
        { id: 'pronate', label: 'Pronate', name: 'Pronation of the forearm', x: 305, y: 60 },
        {
          id: 'flex-wrist',
          label: 'Flex the\nwrist',
          name: 'Flexion of the wrist',
          x: 305,
          y: 130,
        },
        {
          id: 'flex-fingers',
          label: 'Flex the\nfingers',
          name: 'Flexion of the fingers',
          x: 305,
          y: 235,
        },
        {
          id: 'flex-thumb',
          label: 'Bend the\nthumb tip',
          name: 'Flexion of the end joint of the thumb',
          x: 305,
          y: 330,
        },
      ],
      edges: [
        { from: 'median', to: 'pronator-teres' },
        { from: 'median', to: 'flexor-carpi-radialis' },
        { from: 'median', to: 'palmaris-longus' },
        { from: 'median', to: 'flexor-digitorum-superficialis' },
        { from: 'median', to: 'anterior-interosseous' },
        { from: 'anterior-interosseous', to: 'flexor-pollicis-longus' },
        { from: 'anterior-interosseous', to: 'flexor-digitorum-profundus' },
        { from: 'anterior-interosseous', to: 'pronator-quadratus' },
        { from: 'ulnar', to: 'flexor-digitorum-profundus' },
        { from: 'ulnar', to: 'flexor-carpi-ulnaris' },
        { from: 'pronator-teres', to: 'pronate' },
        { from: 'pronator-quadratus', to: 'pronate' },
        { from: 'flexor-carpi-radialis', to: 'flex-wrist' },
        { from: 'palmaris-longus', to: 'flex-wrist' },
        { from: 'flexor-carpi-ulnaris', to: 'flex-wrist' },
        { from: 'flexor-digitorum-superficialis', to: 'flex-fingers' },
        { from: 'flexor-digitorum-profundus', to: 'flex-fingers' },
        { from: 'flexor-pollicis-longus', to: 'flex-thumb' },
      ],
    },
    lesions: [
      {
        id: 'median-elbow',
        label: 'Median nerve cut at the elbow',
        nodeIds: ['median', 'anterior-interosseous'],
        explanation:
          'Every muscle here except flexor carpi ulnaris and the medial half of profundus is paralysed. Pronation is lost, the wrist bends towards the ulnar side, and on trying to make a fist the index and middle fingers stay straight while the ring and little fingers bend (the hand of benediction). The thumb tip cannot bend.',
      },
      {
        id: 'anterior-interosseous-palsy',
        label: 'Anterior interosseous nerve palsy',
        nodeIds: ['anterior-interosseous'],
        explanation:
          'Flexor pollicis longus, the lateral half of profundus and pronator quadratus are weak. The student cannot make a round O with the thumb and index finger: the end joints stay straight and the pinch is flat. The nerve carries no skin fibres, so nothing goes numb.',
      },
      {
        id: 'ulnar-elbow',
        label: 'Ulnar nerve injured at the elbow',
        nodeIds: ['ulnar'],
        explanation:
          'Flexor carpi ulnaris and the medial half of profundus are weak, so the wrist pulls to the radial side on flexing and the ring and little finger tips cannot bend. The small hand muscles the nerve also supplies are weak, and the skin of the medial one and a half fingers goes numb.',
      },
    ],
    drill: [
      {
        id: 'superficial',
        title: 'Superficial layer',
        hint: 'Four muscles from the medial epicondyle, lateral to medial.',
        nodeIds: [
          'pronator-teres',
          'flexor-carpi-radialis',
          'palmaris-longus',
          'flexor-carpi-ulnaris',
        ],
      },
      {
        id: 'deeper',
        title: 'Intermediate and deep layers',
        hint: 'One muscle in the middle layer, three deep to it.',
        nodeIds: [
          'flexor-digitorum-superficialis',
          'flexor-pollicis-longus',
          'flexor-digitorum-profundus',
          'pronator-quadratus',
        ],
      },
      {
        id: 'nerves',
        title: 'Nerves',
        hint: 'The median nerve, its deep branch, and the nerve that takes one and a half muscles.',
        nodeIds: ['median', 'anterior-interosseous', 'ulnar'],
      },
      {
        id: 'actions',
        title: 'What they do',
        hint: 'Turning the forearm, bending the wrist, the fingers and the thumb tip.',
        nodeIds: ['pronate', 'flex-wrist', 'flex-fingers', 'flex-thumb'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'pronator-teres',
        'flexor-carpi-radialis',
        'palmaris-longus',
        'flexor-carpi-ulnaris',
        'flexor-digitorum-superficialis',
        'flexor-digitorum-profundus',
        'flexor-pollicis-longus',
        'pronator-quadratus',
        'humerus',
        'radius',
        'ulna',
        ...HAND_BONES,
      ]),
      traces: [
        {
          id: 'median',
          kind: 'nerve',
          paths: [...MEDIAN_FOREARM, ...MEDIAN_RECURRENT_BRANCH],
        },
        { id: 'anterior-interosseous', kind: 'nerve', paths: ANTERIOR_INTEROSSEOUS_NERVE },
        { id: 'ulnar', kind: 'nerve', paths: ULNAR_FOREARM },
      ],
      stops: [
        {
          id: 'front',
          title: 'Front of the forearm',
          description:
            'Four muscles fan out from the medial epicondyle: pronator teres to the radius, then flexor carpi radialis, palmaris longus and flexor carpi ulnaris to the wrist.',
          target: [-235, -105, 870],
          position: [-451, -789, 928],
        },
        {
          id: 'origin',
          title: 'Common flexor origin',
          description:
            'The superficial muscles share a tendon from the front of the medial epicondyle. Pain here after overuse is golfer’s elbow.',
          target: [-195, -80, 1030],
          position: [-62, -434, 1068],
        },
        {
          id: 'wrist',
          title: 'Tendons at the wrist',
          description:
            'Above the wrist the flexor carpi radialis tendon lies laterally, palmaris longus in the middle and flexor carpi ulnaris medially, to the pisiform. The finger tendons lie deeper.',
          target: [-248, -125, 830],
          position: [-324, -495, 868],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'layers',
      title: 'Three layers',
      body: 'The front of the forearm holds eight muscles that bend the wrist and fingers and turn the palm down. They lie in three layers: four superficial, one intermediate and three deep.',
      focus: [],
    },
    {
      id: 'superficial',
      title: 'The superficial four',
      body: 'All four share the common flexor origin on the medial epicondyle. Lay the opposite hand on the forearm with the thumb on pronator teres: the index, middle and ring fingers then lie over flexor carpi radialis, palmaris longus and flexor carpi ulnaris. Pronator teres inserts into the middle of the radius and pronates; the other three bend the wrist.',
      focus: [
        'pronator-teres',
        'flexor-carpi-radialis',
        'palmaris-longus',
        'flexor-carpi-ulnaris',
        'pronate',
        'flex-wrist',
      ],
    },
    {
      id: 'superficialis',
      title: 'Flexor digitorum superficialis',
      body: 'The middle layer. Its humero-ulnar and radial heads are joined by a fibrous arch that the median nerve and ulnar artery pass beneath. Its four tendons split near the base of each finger and insert into the sides of the middle phalanx, so it bends the middle joints.',
      focus: ['flexor-digitorum-superficialis', 'flex-fingers'],
    },
    {
      id: 'deep',
      title: 'The deep three',
      body: 'Flexor digitorum profundus arises from the ulna and interosseous membrane; its tendons pass through the split superficialis tendons to the distal phalanges and bend the end joints. Flexor pollicis longus, from the radius, is the only muscle that bends the tip of the thumb. Pronator quadratus runs across the lower quarter of both bones and is the main pronator.',
      focus: [
        'flexor-digitorum-profundus',
        'flexor-pollicis-longus',
        'pronator-quadratus',
        'flex-thumb',
        'pronate',
      ],
    },
    {
      id: 'nerves',
      title: 'Nerve supply',
      body: 'The median nerve supplies the superficial muscles except flexor carpi ulnaris, and superficialis. Its anterior interosseous branch supplies the three deep muscles, except the medial half of profundus. The ulnar nerve takes the one and a half left over: flexor carpi ulnaris and the medial half of profundus, to the ring and little fingers.',
      focus: ['median', 'anterior-interosseous', 'ulnar'],
    },
    {
      id: 'test',
      title: 'Testing the finger flexors',
      body: 'To test superficialis, hold the other fingers straight and ask the student to bend one finger: only its middle joint bends. To test profundus, hold the middle phalanx still and ask them to bend the tip.',
      focus: ['flexor-digitorum-superficialis', 'flexor-digitorum-profundus'],
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
      id: 'forearm-flexors-ulnar-supply',
      prompt: 'Which forearm flexor is supplied wholly by the ulnar nerve?',
      options: [
        { id: 'fcu', text: 'Flexor carpi ulnaris' },
        { id: 'fds', text: 'Flexor digitorum superficialis' },
        { id: 'palmaris', text: 'Palmaris longus' },
        { id: 'pq', text: 'Pronator quadratus' },
      ],
      answerId: 'fcu',
      explanation:
        'The ulnar nerve supplies flexor carpi ulnaris and the medial half of profundus; the median nerve and its branch supply the rest.',
    },
    {
      id: 'forearm-flexors-thumb-tip',
      prompt: 'Bending the tip of the thumb depends on which nerve?',
      options: [
        { id: 'ain', text: 'Anterior interosseous nerve' },
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'recurrent', text: 'Recurrent branch of the median nerve' },
      ],
      answerId: 'ain',
      explanation:
        'Flexor pollicis longus bends the end joint of the thumb and is supplied by the anterior interosseous branch of the median nerve.',
    },
    {
      id: 'forearm-flexors-superficialis-insertion',
      prompt: 'The tendons of flexor digitorum superficialis insert into the:',
      options: [
        { id: 'middle', text: 'Middle phalanges' },
        { id: 'distal', text: 'Distal phalanges' },
        { id: 'proximal', text: 'Proximal phalanges' },
        { id: 'metacarpals', text: 'Bases of the metacarpals' },
      ],
      answerId: 'middle',
      explanation:
        'Each tendon splits to let the profundus tendon through, then inserts into the sides of the middle phalanx.',
    },
    {
      id: 'forearm-flexors-main-pronator',
      prompt: 'The main pronator of the forearm is:',
      options: [
        { id: 'pq', text: 'Pronator quadratus' },
        { id: 'pt', text: 'Pronator teres' },
        { id: 'br', text: 'Brachioradialis' },
        { id: 'fcr', text: 'Flexor carpi radialis' },
      ],
      answerId: 'pq',
      explanation:
        'Pronator quadratus pronates in every position; pronator teres joins in when speed or force is needed.',
    },
  ],
  cards: [
    {
      id: 'forearm-flexors-superficial',
      front: 'The four superficial forearm flexors, lateral to medial?',
      back: 'Pronator teres, flexor carpi radialis, palmaris longus, flexor carpi ulnaris.',
    },
    {
      id: 'forearm-flexors-deep',
      front: 'The three deep muscles of the front of the forearm?',
      back: 'Flexor digitorum profundus, flexor pollicis longus, pronator quadratus.',
    },
    {
      id: 'forearm-flexors-ulnar',
      front: 'Which front-of-forearm muscles does the ulnar nerve supply?',
      back: 'Flexor carpi ulnaris and the medial half of flexor digitorum profundus.',
    },
    {
      id: 'forearm-flexors-ain',
      front: 'Muscles of the anterior interosseous nerve?',
      back: 'Flexor pollicis longus, the lateral half of flexor digitorum profundus, and pronator quadratus.',
    },
    {
      id: 'forearm-flexors-fds-fdp',
      front: 'How to tell superficialis from profundus at the bedside?',
      back: 'Superficialis: hold the other fingers straight, the middle joint bends. Profundus: hold the middle phalanx, the tip bends.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '115–120' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '766–771' },
  ],
};
