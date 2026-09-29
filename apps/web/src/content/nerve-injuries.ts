import type { Point3, Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { plexusNerve } from './brachial-plexus-3d';
import {
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

/** A nerve's path from the plexus to its last branch. */
const whole = (id: string, ...rest: Point3[][][]): Point3[][] => [
  ...plexusNerve(id),
  ...rest.flat(),
];

// Upper limb batch 6 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const nerveInjuries: Topic = {
  slug: 'nerve-injuries',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Upper limb nerve injuries at a glance',
  summary:
    'The five main nerves of the upper limb, where each is injured, and the sign each injury leaves: from wrist drop to claw hand.',
  estimatedMinutes: 14,
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
      'Volume 1, Chapter 12 Nerves, Arteries and Clinical Terms, pages 191 to 197',
    ),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, pages 736, 750 to 752, 774 and 806 to 809'),
    {
      title: 'TeachMeAnatomy: Nerves of the Upper Limb',
      url: 'https://teachmeanatomy.info/upper-limb/nerves/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Axillary nerve (C5, C6), injured at the surgical neck or in a dislocation: flat shoulder, weak abduction, numb regimental badge area.',
    'Radial nerve (C5 to T1): in the axilla (crutch palsy) triceps and the wrist extensors are lost; in the radial groove (shaft fracture) wrist drop with triceps largely spared; the posterior interosseous branch gives finger drop without numbness.',
    'Median nerve (C5 to T1): at the elbow, pronation and the lateral finger flexors are lost, giving the hand of benediction on making a fist; at the wrist, the thenar muscles waste (ape thumb) and the lateral three and a half digits go numb.',
    'Ulnar nerve (C8, T1): at the wrist, claw hand of the ring and little fingers; at the elbow a milder claw, because the medial half of profundus is lost too.',
    'Musculocutaneous nerve (C5 to C7): rarely injured alone; weak elbow flexion and supination, numb lateral forearm.',
  ],
  visual: {
    kind: 'path',
    // Each nerve on the left, where it is injured in the middle, and the sign on the right.
    diagram: {
      width: 360,
      height: 580,
      nodes: [
        {
          id: 'musculocutaneous',
          label: 'Musculo-\ncutaneous n.',
          name: 'Musculocutaneous nerve',
          x: 55,
          y: 40,
        },
        { id: 'axillary', label: 'Axillary\nnerve', name: 'Axillary nerve', x: 55, y: 105 },
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 55, y: 235 },
        { id: 'median', label: 'Median\nnerve', name: 'Median nerve', x: 55, y: 385 },
        { id: 'ulnar', label: 'Ulnar\nnerve', name: 'Ulnar nerve', x: 55, y: 505 },
        { id: 'mc-site', label: 'Axilla\n(rare)', name: 'Injury in the axilla', x: 175, y: 40 },
        {
          id: 'ax-site',
          label: 'Surgical neck,\ndislocation',
          name: 'Fracture of the surgical neck or dislocated shoulder',
          x: 175,
          y: 105,
        },
        {
          id: 'rad-axilla',
          label: 'Axilla\n(crutch)',
          name: 'Radial nerve in the axilla',
          x: 175,
          y: 170,
        },
        {
          id: 'rad-groove',
          label: 'Radial groove\n(shaft)',
          name: 'Radial nerve in the radial groove',
          x: 175,
          y: 235,
        },
        {
          id: 'rad-pin',
          label: 'Posterior\ninterosseous',
          name: 'Posterior interosseous nerve',
          x: 175,
          y: 300,
        },
        { id: 'med-elbow', label: 'Elbow', name: 'Median nerve at the elbow', x: 175, y: 360 },
        { id: 'med-wrist', label: 'Wrist', name: 'Median nerve at the wrist', x: 175, y: 415 },
        { id: 'uln-elbow', label: 'Elbow', name: 'Ulnar nerve at the elbow', x: 175, y: 480 },
        { id: 'uln-wrist', label: 'Wrist', name: 'Ulnar nerve at the wrist', x: 175, y: 535 },
        {
          id: 'mc-sign',
          label: 'Weak flexion\nand supination',
          name: 'Weak elbow flexion and supination',
          x: 300,
          y: 40,
        },
        {
          id: 'ax-sign',
          label: 'Flat shoulder,\nweak abduction',
          name: 'Flat shoulder and weak abduction',
          x: 300,
          y: 105,
        },
        {
          id: 'crutch-sign',
          label: 'Wrist drop,\nweak triceps',
          name: 'Wrist drop with weak triceps',
          x: 300,
          y: 170,
        },
        { id: 'wrist-drop', label: 'Wrist drop', name: 'Wrist drop', x: 300, y: 235 },
        {
          id: 'finger-drop',
          label: 'Finger drop,\nno numbness',
          name: 'Finger drop without sensory loss',
          x: 300,
          y: 300,
        },
        {
          id: 'benediction',
          label: 'Hand of\nbenediction',
          name: 'Hand of benediction',
          x: 300,
          y: 360,
        },
        { id: 'ape-thumb', label: 'Ape thumb', name: 'Ape thumb', x: 300, y: 415 },
        {
          id: 'mild-claw',
          label: 'Milder claw',
          name: 'Milder claw hand (ulnar paradox)',
          x: 300,
          y: 480,
        },
        {
          id: 'claw-hand',
          label: 'Claw of ring,\nlittle fingers',
          name: 'Claw hand of the ring and little fingers',
          x: 300,
          y: 535,
        },
      ],
      edges: [
        { from: 'musculocutaneous', to: 'mc-site' },
        { from: 'mc-site', to: 'mc-sign' },
        { from: 'axillary', to: 'ax-site' },
        { from: 'ax-site', to: 'ax-sign' },
        { from: 'radial', to: 'rad-axilla' },
        { from: 'radial', to: 'rad-groove' },
        { from: 'radial', to: 'rad-pin' },
        { from: 'rad-axilla', to: 'crutch-sign' },
        { from: 'rad-groove', to: 'wrist-drop' },
        { from: 'rad-pin', to: 'finger-drop' },
        { from: 'median', to: 'med-elbow' },
        { from: 'median', to: 'med-wrist' },
        { from: 'med-elbow', to: 'benediction' },
        { from: 'med-wrist', to: 'ape-thumb' },
        { from: 'ulnar', to: 'uln-elbow' },
        { from: 'ulnar', to: 'uln-wrist' },
        { from: 'uln-elbow', to: 'mild-claw' },
        { from: 'uln-wrist', to: 'claw-hand' },
      ],
    },
    lesions: [
      {
        id: 'erb',
        label: 'Upper trunk injury (Erb palsy)',
        nodeIds: ['musculocutaneous', 'axillary', 'mc-sign', 'ax-sign'],
        explanation:
          'A fall on the shoulder or a difficult birth stretches C5 and C6 at Erb point. The axillary, musculocutaneous and suprascapular nerves all lose fibres: the arm hangs by the side, turned in, with the elbow straight and the palm facing back, the waiter taking a tip.',
      },
      {
        id: 'klumpke',
        label: 'Lower trunk injury (Klumpke palsy)',
        nodeIds: ['median', 'ulnar', 'claw-hand'],
        explanation:
          'Pulling the arm up hard, as in grabbing a branch in a fall or a breech delivery, tears T1. Every small muscle of the hand is lost, giving a complete claw hand with numbness along the medial forearm. If the sympathetic fibres to the head are torn too, the eyelid droops and the pupil is small on that side.',
      },
      {
        id: 'saturday-night',
        label: 'Radial nerve pressed in the arm',
        nodeIds: ['radial', 'rad-groove', 'wrist-drop'],
        explanation:
          'Sleeping with the arm hung over a chair back, or a fracture of the shaft of the humerus, presses the nerve in the radial groove. The hand hangs limp (wrist drop) and the back of the thumb web goes numb; triceps is largely spared because its branches leave higher up.',
      },
    ],
    drill: [
      {
        id: 'shoulder-arm',
        title: 'Musculocutaneous and axillary',
        hint: 'Where each is hurt and what the student cannot do.',
        nodeIds: ['musculocutaneous', 'axillary', 'mc-site', 'ax-site', 'mc-sign', 'ax-sign'],
      },
      {
        id: 'radial',
        title: 'Radial nerve',
        hint: 'Three levels, three signs.',
        nodeIds: [
          'radial',
          'rad-axilla',
          'rad-groove',
          'rad-pin',
          'crutch-sign',
          'wrist-drop',
          'finger-drop',
        ],
      },
      {
        id: 'median-ulnar',
        title: 'Median and ulnar nerves',
        hint: 'Elbow and wrist for each, and the hand you see.',
        nodeIds: [
          'median',
          'ulnar',
          'med-elbow',
          'med-wrist',
          'uln-elbow',
          'uln-wrist',
          'benediction',
          'ape-thumb',
          'mild-claw',
          'claw-hand',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'clavicle',
        'scapula',
        'humerus',
        'radius',
        'ulna',
        ...HAND_BONES,
        'first-rib',
      ]),
      traces: [
        { id: 'musculocutaneous', kind: 'nerve', paths: plexusNerve('musculocutaneous') },
        { id: 'axillary', kind: 'nerve', paths: plexusNerve('axillary') },
        {
          id: 'radial',
          kind: 'nerve',
          paths: whole('radial', SUPERFICIAL_RADIAL_NERVE, DEEP_RADIAL_NERVE),
        },
        {
          id: 'median',
          kind: 'nerve',
          paths: whole('median', MEDIAN_FOREARM, MEDIAN_RECURRENT_BRANCH),
        },
        { id: 'ulnar', kind: 'nerve', paths: whole('ulnar', ULNAR_FOREARM) },
      ],
      stops: [
        {
          id: 'limb',
          title: 'Five nerves',
          description:
            'The musculocutaneous and axillary nerves stay in the shoulder and arm; the radial, median and ulnar nerves run on to the hand, each vulnerable where it touches bone.',
          target: [-170, -90, 1060],
          position: [-644, -1349, 1168],
        },
        {
          id: 'elbow',
          title: 'At the elbow',
          description:
            'The ulnar nerve lies against the back of the medial epicondyle, where a knock or a fracture reaches it; the median nerve is in the cubital fossa in front.',
          target: [-190, -68, 1045],
          position: [88, -242, 1080],
        },
        {
          id: 'hand',
          title: 'In the hand',
          description:
            'The median nerve passes through the carpal tunnel to the thenar muscles and lateral fingers; the ulnar nerve passes beside the pisiform to most of the small muscles.',
          target: [-258, -130, 770],
          position: [-330, -481, 806],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'rule',
      title: 'Nerves are hurt where they touch bone',
      body: 'The nerves of the upper limb are injured where they lie against bone or pass through tight places: the axillary at the surgical neck, the radial in the radial groove, the ulnar behind the medial epicondyle, the median in the carpal tunnel. Knowing the level tells you what is lost.',
      focus: ['axillary', 'radial', 'ulnar', 'median'],
    },
    {
      id: 'shoulder',
      title: 'Axillary and musculocutaneous nerves',
      body: 'The axillary nerve (C5, C6) winds round the surgical neck of the humerus: a fracture there or a dislocated shoulder weakens deltoid and teres minor, flattens the shoulder and numbs the skin over the lower deltoid. The musculocutaneous nerve (C5 to C7) lies deep and is rarely hurt alone; its loss weakens elbow flexion and supination and numbs the lateral forearm.',
      focus: ['axillary', 'ax-site', 'ax-sign', 'musculocutaneous', 'mc-site', 'mc-sign'],
    },
    {
      id: 'radial',
      title: 'Radial nerve at three levels',
      body: 'In the axilla, pressure from a crutch paralyses triceps as well as the forearm extensors. In the radial groove, a shaft fracture or pressure gives wrist drop with triceps largely spared. Below the elbow, damage to the posterior interosseous nerve gives finger and thumb drop with the wrist still able to extend, and no numbness.',
      focus: [
        'radial',
        'rad-axilla',
        'rad-groove',
        'rad-pin',
        'crutch-sign',
        'wrist-drop',
        'finger-drop',
      ],
    },
    {
      id: 'median',
      title: 'Median nerve: elbow and wrist',
      body: 'Injured at or above the elbow, the median nerve loses pronation and the flexors of the index and middle fingers: asked to make a fist, those two fingers stay straight (hand of benediction). Injured at the wrist, only the thenar muscles and the lateral two lumbricals are lost: the thumb lies flat and cannot oppose (ape thumb), and the lateral three and a half digits are numb.',
      focus: ['median', 'med-elbow', 'med-wrist', 'benediction', 'ape-thumb'],
    },
    {
      id: 'ulnar',
      title: 'Ulnar nerve: elbow and wrist',
      body: 'Injured at the wrist, the ulnar nerve loses most small muscles of the hand: the ring and little fingers claw because their long flexors still pull. Injured at the elbow, the medial half of flexor digitorum profundus is lost too, so the fingertips do not bend and the claw is milder. This is the ulnar paradox.',
      focus: ['ulnar', 'uln-elbow', 'uln-wrist', 'mild-claw', 'claw-hand'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a nerve to follow it from the plexus to the hand. Then turn on a plexus injury to see which nerves suffer together.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'nerve-injuries-wrist-drop',
      prompt: 'A fracture of the shaft of the humerus followed by wrist drop injures the:',
      options: [
        { id: 'radial', text: 'Radial nerve in the radial groove' },
        { id: 'axillary', text: 'Axillary nerve' },
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'median', text: 'Median nerve' },
      ],
      answerId: 'radial',
      explanation:
        'The radial nerve lies in the radial groove on the back of the shaft; triceps is largely spared because its branches arise higher.',
    },
    {
      id: 'nerve-injuries-benediction',
      prompt: 'Hand of benediction when making a fist follows injury to the:',
      options: [
        { id: 'median-elbow', text: 'Median nerve at the elbow' },
        { id: 'median-wrist', text: 'Median nerve at the wrist' },
        { id: 'ulnar-wrist', text: 'Ulnar nerve at the wrist' },
        { id: 'radial', text: 'Radial nerve' },
      ],
      answerId: 'median-elbow',
      explanation:
        'A high median injury loses the long flexors of the index and middle fingers, so they stay straight while the others bend.',
    },
    {
      id: 'nerve-injuries-no-sensory',
      prompt: 'Which injury causes muscle weakness without any loss of skin sensation?',
      options: [
        { id: 'pin', text: 'Posterior interosseous nerve' },
        { id: 'radial-groove', text: 'Radial nerve in the radial groove' },
        { id: 'median-wrist', text: 'Median nerve at the wrist' },
        { id: 'axillary', text: 'Axillary nerve' },
      ],
      answerId: 'pin',
      explanation:
        'The posterior interosseous nerve carries no skin fibres; the others each numb a patch of skin.',
    },
    {
      id: 'nerve-injuries-erb',
      prompt: 'The waiter taking a tip position follows injury to:',
      options: [
        { id: 'c5c6', text: 'C5 and C6 (upper trunk)' },
        { id: 't1', text: 'T1 (lower trunk)' },
        { id: 'radial', text: 'The radial nerve' },
        { id: 'ulnar', text: 'The ulnar nerve' },
      ],
      answerId: 'c5c6',
      explanation:
        'Erb palsy: the arm hangs by the side, turned in, elbow straight, palm facing back.',
    },
  ],
  cards: [
    {
      id: 'nerve-injuries-radial-levels',
      front: 'Signs of radial nerve injury at three levels?',
      back: 'Axilla: wrist drop and weak triceps. Radial groove: wrist drop, triceps spared. Posterior interosseous: finger drop, no numbness.',
    },
    {
      id: 'nerve-injuries-median-levels',
      front: 'Median nerve injury at the elbow and at the wrist?',
      back: 'Elbow: hand of benediction, loss of pronation. Wrist: ape thumb, numb lateral three and a half digits.',
    },
    {
      id: 'nerve-injuries-ulnar-paradox',
      front: 'What is the ulnar paradox?',
      back: 'An ulnar injury at the elbow gives a milder claw than one at the wrist, because the medial half of profundus is paralysed too.',
    },
    {
      id: 'nerve-injuries-axillary',
      front: 'Signs of axillary nerve injury?',
      back: 'Flat shoulder, weak abduction beyond the first few degrees, numb skin over the lower deltoid (regimental badge).',
    },
    {
      id: 'nerve-injuries-klumpke',
      front: 'Klumpke palsy: root, cause and hand?',
      back: 'T1, from the arm pulled up hard; complete claw hand, numb medial forearm, sometimes a droopy eyelid and small pupil.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 12 Nerves, Arteries and Clinical Terms',
      pages: '191–197',
    },
    {
      bookId: 'grays-anatomy',
      chapter: 'Chapter 7 Upper Limb',
      pages: '736, 750–752, 774, 806–809',
    },
  ],
};
