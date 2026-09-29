import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  between,
  MEDIAN_FOREARM,
  MEDIAN_RECURRENT_BRANCH,
  ULNAR_DEEP_BRANCH,
  ULNAR_DORSAL_BRANCH,
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
export const palmVesselsNerves: Topic = {
  slug: 'palm-vessels-nerves',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Hand: arteries and nerves of the palm',
  summary:
    'The superficial and deep palmar arches, the median and ulnar nerves in the hand, and the claw hand and ape thumb their injuries cause.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 9 Forearm and Hand, pages 134 to 141'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, hand, pages 803 to 810'),
    {
      title: 'TeachMeAnatomy: The Ulnar Nerve',
      url: 'https://teachmeanatomy.info/upper-limb/nerves/ulnar-nerve/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, muscles and arteries in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The superficial palmar arch is mainly the ulnar artery, completed by the superficial palmar branch of the radial artery. It lies under the palmar aponeurosis, level with the outstretched thumb, and gives the palmar digital arteries.',
    'The deep palmar arch is mainly the radial artery, completed by the deep branch of the ulnar artery. It lies on the metacarpal bases about a finger breadth above the superficial arch.',
    'The median nerve in the palm gives the recurrent branch to the thenar muscles and digital branches to the lateral three and a half digits and the first two lumbricals.',
    'The ulnar nerve divides beside the pisiform: the superficial branch supplies palmaris brevis and the skin of the medial one and a half digits; the deep branch supplies most small muscles of the hand.',
    'Ulnar nerve injury at the wrist gives a claw hand of the ring and little fingers; median nerve injury at the wrist gives an ape thumb that cannot oppose.',
  ],
  visual: {
    kind: 'path',
    // Top: the two arches with their sources and branches, radial side on the left. Bottom: the
    // two nerves and their branches in the palm.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        { id: 'radial-artery', label: 'Radial\nartery', name: 'Radial artery', x: 60, y: 30 },
        { id: 'ulnar-artery', label: 'Ulnar\nartery', name: 'Ulnar artery', x: 300, y: 30 },
        {
          id: 'deep-palmar-arch',
          label: 'Deep\npalmar arch',
          name: 'Deep palmar arch',
          x: 90,
          y: 100,
        },
        {
          id: 'superficial-palmar-arch',
          label: 'Superficial\npalmar arch',
          name: 'Superficial palmar arch',
          x: 270,
          y: 100,
        },
        {
          id: 'princeps-pollicis-artery',
          label: 'Princeps\npollicis a.',
          name: 'Princeps pollicis artery',
          x: 45,
          y: 170,
        },
        {
          id: 'palmar-metacarpal-arteries',
          label: 'Palmar\nmetacarpal aa.',
          name: 'Palmar metacarpal arteries',
          x: 150,
          y: 170,
        },
        {
          id: 'palmar-digital-arteries',
          label: 'Palmar\ndigital aa.',
          name: 'Palmar digital arteries',
          x: 270,
          y: 170,
        },
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 90, y: 250 },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 270, y: 250 },
        {
          id: 'recurrent-branch',
          label: 'Recurrent\nbranch',
          name: 'Recurrent (thenar) branch of the median nerve',
          x: 45,
          y: 320,
        },
        {
          id: 'median-digital',
          label: 'Digital\nbranches',
          name: 'Palmar digital branches of the median nerve',
          x: 135,
          y: 320,
        },
        {
          id: 'superficial-ulnar',
          label: 'Superficial\nbranch',
          name: 'Superficial branch of the ulnar nerve',
          x: 225,
          y: 320,
        },
        {
          id: 'deep-ulnar',
          label: 'Deep\nbranch',
          name: 'Deep branch of the ulnar nerve',
          x: 315,
          y: 320,
        },
        {
          id: 'thenar-muscles',
          label: 'Thenar\nmuscles',
          name: 'Thenar muscles',
          x: 45,
          y: 400,
        },
        {
          id: 'lateral-digits',
          label: 'Lateral 3½\ndigits',
          name: 'Skin of the lateral three and a half digits',
          x: 135,
          y: 400,
        },
        {
          id: 'medial-digits',
          label: 'Medial 1½\ndigits',
          name: 'Skin of the medial one and a half digits',
          x: 225,
          y: 400,
        },
        {
          id: 'small-muscles',
          label: 'Most small\nmuscles',
          name: 'Most small muscles of the hand',
          x: 315,
          y: 400,
        },
      ],
      edges: [
        { from: 'radial-artery', to: 'deep-palmar-arch' },
        { from: 'ulnar-artery', to: 'superficial-palmar-arch' },
        { from: 'radial-artery', to: 'superficial-palmar-arch' },
        { from: 'ulnar-artery', to: 'deep-palmar-arch' },
        { from: 'radial-artery', to: 'princeps-pollicis-artery' },
        { from: 'deep-palmar-arch', to: 'palmar-metacarpal-arteries' },
        { from: 'superficial-palmar-arch', to: 'palmar-digital-arteries' },
        { from: 'median', to: 'recurrent-branch' },
        { from: 'median', to: 'median-digital' },
        { from: 'ulnar', to: 'superficial-ulnar' },
        { from: 'ulnar', to: 'deep-ulnar' },
        { from: 'recurrent-branch', to: 'thenar-muscles' },
        { from: 'median-digital', to: 'lateral-digits' },
        { from: 'superficial-ulnar', to: 'medial-digits' },
        { from: 'deep-ulnar', to: 'small-muscles' },
      ],
    },
    lesions: [
      {
        id: 'ulnar-wrist',
        label: 'Ulnar nerve cut at the wrist',
        nodeIds: ['ulnar', 'superficial-ulnar', 'deep-ulnar'],
        explanation:
          'Most small muscles of the hand are paralysed. The ring and little fingers claw: knuckles straightened too far and finger joints bent, because their lumbricals and interossei are lost while the long flexors still pull. The fingers cannot be spread or closed and the palm side of the medial one and a half fingers is numb. The claw is worse than after an injury at the elbow, where the medial half of profundus is lost too (the ulnar paradox).',
      },
      {
        id: 'median-wrist',
        label: 'Median nerve cut at the wrist',
        nodeIds: ['median', 'recurrent-branch', 'median-digital'],
        explanation:
          'The thenar muscles are paralysed and waste, so the thumb lies flat beside the fingers, pulled back by its long extensor: the ape thumb. It cannot be opposed or lifted away from the palm. The skin of the lateral three and a half digits is numb, a serious loss because these are the fingers that feel what the hand holds.',
      },
    ],
    drill: [
      {
        id: 'arches',
        title: 'The arches',
        hint: 'Which artery forms each arch, and what each gives off.',
        nodeIds: [
          'radial-artery',
          'ulnar-artery',
          'deep-palmar-arch',
          'superficial-palmar-arch',
          'princeps-pollicis-artery',
          'palmar-metacarpal-arteries',
          'palmar-digital-arteries',
        ],
      },
      {
        id: 'nerves',
        title: 'Nerves in the palm',
        hint: 'Two branches of each nerve, then what each supplies.',
        nodeIds: [
          'median',
          'ulnar',
          'recurrent-branch',
          'median-digital',
          'superficial-ulnar',
          'deep-ulnar',
          'thenar-muscles',
          'lateral-digits',
          'medial-digits',
          'small-muscles',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'radial-artery',
        'ulnar-artery',
        'superficial-palmar-arch',
        'deep-palmar-arch',
        'princeps-pollicis-artery',
        'radialis-indicis-artery',
        'palmar-metacarpal-arteries',
        'palmar-digital-arteries',
        'thenar-muscles',
        'hypothenar-muscles',
        'flexor-retinaculum',
        ...HAND_BONES,
        'radius',
        'ulna',
      ]),
      traces: [
        { id: 'median', kind: 'nerve', paths: between(MEDIAN_FOREARM, 780, 880) },
        { id: 'recurrent-branch', kind: 'nerve', paths: MEDIAN_RECURRENT_BRANCH },
        { id: 'median-digital', kind: 'nerve', paths: between(MEDIAN_FOREARM, 700, 779) },
        {
          id: 'ulnar',
          kind: 'nerve',
          paths: [...between(ULNAR_FOREARM_MAIN, 780, 880), ...ULNAR_DORSAL_BRANCH],
        },
        { id: 'superficial-ulnar', kind: 'nerve', paths: ULNAR_SUPERFICIAL_BRANCH },
        { id: 'deep-ulnar', kind: 'nerve', paths: ULNAR_DEEP_BRANCH },
      ],
      stops: [
        {
          id: 'arches',
          title: 'Two arches',
          description:
            'The superficial arch curves across the palm nearer the fingers; the deep arch lies a finger breadth closer to the wrist, on the bases of the metacarpals.',
          target: [-260, -138, 770],
          position: [-337, -482, 805],
        },
        {
          id: 'wrist',
          title: 'Entering the palm',
          description:
            'The ulnar nerve and artery cross in front of the retinaculum beside the pisiform; the median nerve comes through the tunnel under it.',
          target: [-248, -136, 795],
          position: [-300, -420, 860],
        },
        {
          id: 'thumb',
          title: 'Thumb side',
          description:
            'The recurrent branch of the median nerve curls into the thenar muscles. The radial artery gives the princeps pollicis to the thumb and the radialis indicis to the index finger.',
          target: [-285, -145, 765],
          position: [-470, -420, 790],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'superficial-arch',
      title: 'Superficial palmar arch',
      body: 'The ulnar artery enters the palm in front of the flexor retinaculum and curves laterally as the superficial palmar arch, completed by the superficial palmar branch of the radial artery. It lies just under the palmar aponeurosis, level with the fully outstretched thumb, and gives common and then proper palmar digital arteries to the fingers.',
      focus: [
        'ulnar-artery',
        'superficial-palmar-arch',
        'palmar-digital-arteries',
        'radial-artery',
      ],
    },
    {
      id: 'deep-arch',
      title: 'Deep palmar arch',
      body: 'The radial artery winds through the anatomical snuffbox to the back of the hand, then enters the palm between the heads of the first dorsal interosseous. There it gives the princeps pollicis and radialis indicis arteries and forms the deep palmar arch, completed by the deep branch of the ulnar artery. The arch lies on the metacarpal bases about a finger breadth above the superficial arch and gives palmar metacarpal arteries.',
      focus: [
        'radial-artery',
        'deep-palmar-arch',
        'princeps-pollicis-artery',
        'palmar-metacarpal-arteries',
        'ulnar-artery',
      ],
    },
    {
      id: 'median',
      title: 'Median nerve in the hand',
      body: 'Leaving the carpal tunnel, the median nerve gives the recurrent branch, which curls back into the thenar muscles, and palmar digital branches to the skin of the thumb, index, middle and lateral half of the ring finger, including their nail beds, and to the first two lumbricals.',
      focus: ['median', 'recurrent-branch', 'thenar-muscles', 'median-digital', 'lateral-digits'],
    },
    {
      id: 'ulnar',
      title: 'Ulnar nerve in the hand',
      body: 'The ulnar nerve crosses in front of the retinaculum lateral to the pisiform and divides. The superficial branch supplies palmaris brevis and the skin of the little finger and the medial half of the ring finger. The deep branch runs round the hook of the hamate and across the palm with the deep arch, supplying the hypothenar muscles, all the interossei, the medial two lumbricals and adductor pollicis. The dorsal branch left above the wrist for the back of the hand.',
      focus: ['ulnar', 'superficial-ulnar', 'deep-ulnar', 'medial-digits', 'small-muscles'],
    },
    {
      id: 'claw',
      title: 'Claw hand and ape thumb',
      body: 'Cut the ulnar nerve at the wrist and the ring and little fingers claw, with their knuckles overextended and finger joints bent. Cut the median nerve at the wrist and the thenar eminence wastes, leaving a flat ape thumb that cannot oppose, and the most useful skin of the hand goes numb.',
      focus: ['ulnar', 'deep-ulnar', 'median', 'recurrent-branch'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each arch and nerve branch to follow it through the palm. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'palm-superficial-arch',
      prompt: 'The superficial palmar arch is formed mainly by the:',
      options: [
        { id: 'ulnar', text: 'Ulnar artery' },
        { id: 'radial', text: 'Radial artery' },
        { id: 'anterior-interosseous', text: 'Anterior interosseous artery' },
        { id: 'princeps', text: 'Princeps pollicis artery' },
      ],
      answerId: 'ulnar',
      explanation:
        'Superficial arch: mainly ulnar. Deep arch: mainly radial. Each is completed by a branch of the other artery.',
    },
    {
      id: 'palm-deep-branch-ulnar',
      prompt: 'The deep branch of the ulnar nerve does not supply:',
      options: [
        { id: 'apb', text: 'Abductor pollicis brevis' },
        { id: 'adductor', text: 'Adductor pollicis' },
        { id: 'interossei', text: 'The dorsal interossei' },
        { id: 'lumbrical-4', text: 'The fourth lumbrical' },
      ],
      answerId: 'apb',
      explanation:
        'Abductor pollicis brevis is a thenar muscle, supplied by the recurrent branch of the median nerve.',
    },
    {
      id: 'palm-ulnar-paradox',
      prompt: 'Why is the claw hand worse after ulnar nerve injury at the wrist than at the elbow?',
      options: [
        {
          id: 'profundus',
          text: 'At the elbow the medial half of profundus is paralysed too, so the fingers bend less',
        },
        { id: 'median', text: 'The median nerve takes over at the elbow' },
        { id: 'radial', text: 'The radial nerve is also cut at the wrist' },
        { id: 'lumbricals', text: 'The lumbricals recover faster after an elbow injury' },
      ],
      answerId: 'profundus',
      explanation:
        'A higher injury also weakens the long flexor that bends the finger joints, so the claw is less marked: the ulnar paradox.',
    },
    {
      id: 'palm-ape-thumb',
      prompt: 'Ape thumb follows injury to the:',
      options: [
        { id: 'median', text: 'Median nerve' },
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'musculocutaneous', text: 'Musculocutaneous nerve' },
      ],
      answerId: 'median',
      explanation:
        'The thenar muscles waste and the thumb lies flat in line with the fingers, unable to oppose.',
    },
  ],
  cards: [
    {
      id: 'palm-arches-level',
      front: 'Surface levels of the two palmar arches?',
      back: 'Superficial: level with the outstretched thumb. Deep: about a finger breadth nearer the wrist, on the metacarpal bases.',
    },
    {
      id: 'palm-radial-entry',
      front: 'How does the radial artery enter the palm?',
      back: 'Through the anatomical snuffbox to the back of the hand, then between the two heads of the first dorsal interosseous.',
    },
    {
      id: 'palm-median-skin',
      front: 'Skin supplied by the median nerve in the hand?',
      back: 'The palm side of the lateral three and a half digits with their nail beds, and the lateral palm (via its palmar cutaneous branch).',
    },
    {
      id: 'palm-ulnar-branches',
      front: 'Branches of the ulnar nerve in the hand?',
      back: 'Superficial: palmaris brevis and skin of the medial one and a half digits. Deep: hypothenar muscles, all interossei, medial two lumbricals, adductor pollicis.',
    },
    {
      id: 'palm-claw',
      front: 'Which fingers claw after ulnar nerve injury, and why?',
      back: 'The ring and little fingers: their lumbricals and interossei are lost, while the lateral two lumbricals (median nerve) protect the index and middle fingers.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '134–141' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '803–810' },
  ],
};
