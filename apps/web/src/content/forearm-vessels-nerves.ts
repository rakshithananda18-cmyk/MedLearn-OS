import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  ANTERIOR_INTEROSSEOUS_NERVE,
  DEEP_RADIAL_NERVE,
  MEDIAN_FOREARM,
  MEDIAN_RECURRENT_BRANCH,
  SUPERFICIAL_RADIAL_NERVE,
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
export const forearmVesselsNerves: Topic = {
  slug: 'forearm-vessels-nerves',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Forearm: arteries and nerves of the front',
  summary:
    'The radial and ulnar arteries and their branches, and the courses of the median, ulnar and radial nerves from the elbow to the wrist.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 9 Forearm and Hand, pages 120 to 125'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, forearm, pages 772 to 775'),
    {
      title: 'TeachMeAnatomy: The Median Nerve',
      url: 'https://teachmeanatomy.info/upper-limb/nerves/median-nerve/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and arteries in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The brachial artery divides in the cubital fossa, at the level of the neck of the radius, into the smaller radial and the larger ulnar artery.',
    'The radial artery runs under brachioradialis, then on the lower radius lateral to the flexor carpi radialis tendon, where the radial pulse is felt; it ends mainly as the deep palmar arch.',
    'The ulnar artery passes deep to pronator teres and superficialis, gives the common interosseous artery, runs with the ulnar nerve on its medial side, and ends mainly as the superficial palmar arch.',
    'The median nerve enters between the heads of pronator teres, runs stuck to the deep surface of superficialis, and gives the anterior interosseous nerve.',
    'The ulnar nerve enters between the heads of flexor carpi ulnaris and runs under it; its dorsal branch leaves above the wrist for the back of the hand.',
    'The superficial branch of the radial nerve runs under brachioradialis lateral to the radial artery, then winds back to the back of the hand.',
  ],
  visual: {
    kind: 'path',
    // Top: the arteries from the brachial artery to the palmar arches, radial side on the left.
    // Bottom: the nerves and their branches in the forearm.
    diagram: {
      width: 360,
      height: 470,
      nodes: [
        {
          id: 'brachial-artery',
          label: 'Brachial\nartery',
          name: 'Brachial artery',
          x: 180,
          y: 30,
        },
        { id: 'radial-artery', label: 'Radial\nartery', name: 'Radial artery', x: 60, y: 95 },
        { id: 'ulnar-artery', label: 'Ulnar\nartery', name: 'Ulnar artery', x: 300, y: 95 },
        {
          id: 'radial-recurrent-artery',
          label: 'Radial\nrecurrent a.',
          name: 'Radial recurrent artery',
          x: 60,
          y: 165,
        },
        {
          id: 'common-interosseous-artery',
          label: 'Common\ninterosseous',
          name: 'Common interosseous artery',
          x: 180,
          y: 165,
        },
        {
          id: 'ulnar-recurrent-arteries',
          label: 'Ulnar\nrecurrent aa.',
          name: 'Ulnar recurrent arteries',
          x: 300,
          y: 165,
        },
        {
          id: 'deep-palmar-arch',
          label: 'Deep\npalmar arch',
          name: 'Deep palmar arch',
          x: 60,
          y: 235,
        },
        {
          id: 'anterior-interosseous-artery',
          label: 'Anterior\ninteross. a.',
          name: 'Anterior interosseous artery',
          x: 180,
          y: 235,
        },
        {
          id: 'superficial-palmar-arch',
          label: 'Superficial\npalmar arch',
          name: 'Superficial palmar arch',
          x: 300,
          y: 235,
        },
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 60, y: 315 },
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 180, y: 315 },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 300, y: 315 },
        {
          id: 'superficial-radial',
          label: 'Superficial\nbranch',
          name: 'Superficial branch of the radial nerve',
          x: 50,
          y: 380,
        },
        {
          id: 'deep-radial',
          label: 'Deep\nbranch',
          name: 'Deep branch of the radial nerve (posterior interosseous)',
          x: 50,
          y: 435,
        },
        {
          id: 'anterior-interosseous',
          label: 'Anterior\ninterosseous',
          name: 'Anterior interosseous nerve',
          x: 180,
          y: 380,
        },
        {
          id: 'palmar-cutaneous',
          label: 'Palmar cut.\nbranch',
          name: 'Palmar cutaneous branch of the median nerve',
          x: 180,
          y: 435,
        },
        {
          id: 'dorsal-ulnar',
          label: 'Dorsal\nbranch',
          name: 'Dorsal branch of the ulnar nerve',
          x: 300,
          y: 380,
        },
      ],
      edges: [
        { from: 'brachial-artery', to: 'radial-artery' },
        { from: 'brachial-artery', to: 'ulnar-artery' },
        { from: 'radial-artery', to: 'radial-recurrent-artery' },
        { from: 'radial-artery', to: 'deep-palmar-arch' },
        { from: 'ulnar-artery', to: 'ulnar-recurrent-arteries' },
        { from: 'ulnar-artery', to: 'common-interosseous-artery' },
        { from: 'common-interosseous-artery', to: 'anterior-interosseous-artery' },
        { from: 'ulnar-artery', to: 'superficial-palmar-arch' },
        { from: 'radial', to: 'superficial-radial' },
        { from: 'radial', to: 'deep-radial' },
        { from: 'median', to: 'anterior-interosseous' },
        { from: 'median', to: 'palmar-cutaneous' },
        { from: 'ulnar', to: 'dorsal-ulnar' },
      ],
    },
    lesions: [
      {
        id: 'wrist-cut-medial',
        label: 'Cut on the medial side of the wrist',
        nodeIds: ['ulnar-artery', 'ulnar'],
        explanation:
          'A cut across the front of the wrist on the little finger side opens the ulnar artery, which bleeds briskly, and can divide the ulnar nerve. The dorsal branch has already left, so the back of the hand keeps its feeling, but the palm side of the medial one and a half fingers goes numb and the small muscles of the hand are weak.',
      },
      {
        id: 'superficial-radial',
        label: 'Superficial radial nerve pressed at the wrist',
        nodeIds: ['superficial-radial'],
        explanation:
          'A tight watch strap, cast or handcuffs can press the branch where it winds round the lower radius. The back of the thumb and the web between thumb and index finger tingle or go numb. No muscle is weak: the branch carries only skin fibres.',
      },
    ],
    drill: [
      {
        id: 'radial-side',
        title: 'Radial artery',
        hint: 'Its branch back to the elbow, and the arch it ends in.',
        nodeIds: ['radial-artery', 'radial-recurrent-artery', 'deep-palmar-arch'],
      },
      {
        id: 'ulnar-side',
        title: 'Ulnar artery',
        hint: 'Its branches back to the elbow, the short trunk and its front branch, and its arch.',
        nodeIds: [
          'ulnar-artery',
          'ulnar-recurrent-arteries',
          'common-interosseous-artery',
          'anterior-interosseous-artery',
          'superficial-palmar-arch',
        ],
      },
      {
        id: 'nerves',
        title: 'Nerves and their branches',
        hint: 'Two branches of the radial, two of the median above the wrist, one of the ulnar.',
        nodeIds: [
          'radial',
          'median',
          'ulnar',
          'superficial-radial',
          'deep-radial',
          'anterior-interosseous',
          'palmar-cutaneous',
          'dorsal-ulnar',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'brachial-artery',
        'radial-artery',
        'ulnar-artery',
        'radial-recurrent-artery',
        'ulnar-recurrent-arteries',
        'common-interosseous-artery',
        'anterior-interosseous-artery',
        'superficial-palmar-arch',
        'deep-palmar-arch',
        'brachioradialis',
        'pronator-teres',
        'flexor-carpi-ulnaris',
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
        { id: 'superficial-radial', kind: 'nerve', paths: SUPERFICIAL_RADIAL_NERVE },
        { id: 'deep-radial', kind: 'nerve', paths: DEEP_RADIAL_NERVE },
      ],
      stops: [
        {
          id: 'arteries',
          title: 'Two arteries',
          description:
            'The brachial artery divides below the elbow. The radial artery runs down the lateral side under brachioradialis; the ulnar artery curves medially under pronator teres, then runs straight down under flexor carpi ulnaris.',
          target: [-235, -105, 870],
          position: [-451, -789, 928],
        },
        {
          id: 'elbow',
          title: 'Below the elbow',
          description:
            'The median nerve slips between the heads of pronator teres; the ulnar artery gives the common interosseous artery and recurrent branches that climb to the elbow.',
          target: [-215, -85, 1000],
          position: [-291, -455, 1038],
        },
        {
          id: 'wrist',
          title: 'At the wrist',
          description:
            'The radial pulse lies on the lower radius. The ulnar artery and nerve cross in front of the wrist beside the pisiform into the palm, where the arteries form two arches.',
          target: [-252, -128, 790],
          position: [-333, -519, 810],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'division',
      title: 'Two arteries from one',
      body: 'In the cubital fossa, at the level of the neck of the radius, the brachial artery divides into the radial and ulnar arteries. The ulnar is the larger. Recurrent branches of both climb back to the elbow and join the collateral branches from the arm, so blood can bypass a block at the elbow.',
      focus: [
        'brachial-artery',
        'radial-artery',
        'ulnar-artery',
        'radial-recurrent-artery',
        'ulnar-recurrent-arteries',
      ],
    },
    {
      id: 'radial-artery',
      title: 'Radial artery',
      body: 'It runs down the lateral side of the forearm, under brachioradialis above and between the tendons of brachioradialis and flexor carpi radialis below. There, on the lower end of the radius, its pulse is felt. It then winds round the wrist through the anatomical snuffbox to the back of the hand and enters the palm to form the deep palmar arch.',
      focus: ['radial-artery', 'deep-palmar-arch'],
    },
    {
      id: 'ulnar-artery',
      title: 'Ulnar artery',
      body: 'It runs obliquely down and medially, deep to pronator teres and the superficialis arch, then straight down under flexor carpi ulnaris with the ulnar nerve on its medial side. Near its start it gives the common interosseous artery, which splits into anterior and posterior interosseous arteries. It crosses in front of the flexor retinaculum beside the pisiform and ends as the superficial palmar arch.',
      focus: [
        'ulnar-artery',
        'common-interosseous-artery',
        'anterior-interosseous-artery',
        'superficial-palmar-arch',
      ],
    },
    {
      id: 'median',
      title: 'Median nerve',
      body: 'It leaves the cubital fossa between the two heads of pronator teres, passes under the superficialis arch, and runs down stuck to the deep surface of that muscle. About 5 cm above the wrist it comes out lateral to the superficialis tendons, behind palmaris longus. It gives the anterior interosseous nerve below the elbow and the palmar cutaneous branch, which crosses in front of the flexor retinaculum, above the wrist.',
      focus: ['median', 'anterior-interosseous', 'palmar-cutaneous'],
    },
    {
      id: 'ulnar',
      title: 'Ulnar nerve',
      body: 'After passing behind the medial epicondyle it enters the forearm between the two heads of flexor carpi ulnaris and runs down on profundus under that muscle, with the ulnar artery on its lateral side in the lower two thirds. Its dorsal branch leaves about 5 cm above the wrist and winds back to the medial half of the back of the hand. The nerve then crosses in front of the retinaculum beside the pisiform.',
      focus: ['ulnar', 'dorsal-ulnar', 'ulnar-artery'],
    },
    {
      id: 'radial',
      title: 'Radial nerve',
      body: 'In front of the lateral epicondyle it divides. The deep branch (posterior interosseous nerve) winds through supinator to the back of the forearm to supply the extensors. The superficial branch carries only skin fibres: it runs under brachioradialis lateral to the radial artery, then turns back under its tendon above the wrist to the back of the hand.',
      focus: ['radial', 'superficial-radial', 'deep-radial', 'radial-artery'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each artery and nerve to follow it from the elbow to the hand. Then turn on an injury to see what is lost.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'forearm-vessels-radial-pulse',
      prompt: 'The radial pulse is felt just lateral to the tendon of:',
      options: [
        { id: 'fcr', text: 'Flexor carpi radialis' },
        { id: 'palmaris', text: 'Palmaris longus' },
        { id: 'fcu', text: 'Flexor carpi ulnaris' },
        { id: 'fpl', text: 'Flexor pollicis longus' },
      ],
      answerId: 'fcr',
      explanation:
        'Above the wrist the radial artery lies on the lower radius between the tendons of brachioradialis and flexor carpi radialis.',
    },
    {
      id: 'forearm-vessels-common-interosseous',
      prompt: 'The common interosseous artery is a branch of the:',
      options: [
        { id: 'ulnar', text: 'Ulnar artery' },
        { id: 'radial', text: 'Radial artery' },
        { id: 'brachial', text: 'Brachial artery' },
        { id: 'profunda', text: 'Profunda brachii artery' },
      ],
      answerId: 'ulnar',
      explanation:
        'It arises from the ulnar artery just below the elbow and splits into the anterior and posterior interosseous arteries.',
    },
    {
      id: 'forearm-vessels-median-entry',
      prompt: 'The median nerve enters the forearm:',
      options: [
        { id: 'pt', text: 'Between the two heads of pronator teres' },
        { id: 'fcu', text: 'Between the two heads of flexor carpi ulnaris' },
        { id: 'supinator', text: 'Through supinator' },
        { id: 'epicondyle', text: 'Behind the medial epicondyle' },
      ],
      answerId: 'pt',
      explanation:
        'The median nerve passes between the heads of pronator teres; the ulnar nerve between the heads of flexor carpi ulnaris; the deep radial nerve through supinator.',
    },
    {
      id: 'forearm-vessels-ulnar-relation',
      prompt: 'In the lower forearm, the ulnar nerve lies on which side of the ulnar artery?',
      options: [
        { id: 'medial', text: 'Medial' },
        { id: 'lateral', text: 'Lateral' },
        { id: 'front', text: 'In front' },
        { id: 'behind', text: 'Directly behind, deep to the interosseous membrane' },
      ],
      answerId: 'medial',
      explanation: 'Nerve medial, artery lateral, both under flexor carpi ulnaris.',
    },
  ],
  cards: [
    {
      id: 'forearm-vessels-radial-end',
      front: 'How does the radial artery end?',
      back: 'Through the anatomical snuffbox to the back of the hand, then into the palm as the deep palmar arch.',
    },
    {
      id: 'forearm-vessels-ulnar-end',
      front: 'How does the ulnar artery end?',
      back: 'In front of the flexor retinaculum beside the pisiform, then as the superficial palmar arch.',
    },
    {
      id: 'forearm-vessels-entries',
      front: 'Where do the median, ulnar and deep radial nerves enter the forearm?',
      back: 'Median between the heads of pronator teres; ulnar between the heads of flexor carpi ulnaris; deep radial through supinator.',
    },
    {
      id: 'forearm-vessels-palmar-cutaneous',
      front: 'Why does carpal tunnel syndrome spare the skin of the central palm?',
      back: 'The palmar cutaneous branch of the median nerve leaves above the wrist and crosses in front of the retinaculum, not through the tunnel.',
    },
    {
      id: 'forearm-vessels-superficial-radial',
      front: 'Course of the superficial branch of the radial nerve?',
      back: 'Under brachioradialis lateral to the radial artery, then back under its tendon above the wrist to the back of the hand. Skin only.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 9 Forearm and Hand', pages: '120–125' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '772–775' },
  ],
};
