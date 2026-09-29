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
export const surfaceMarking: Topic = {
  slug: 'surface-marking',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Upper limb: surface marking and pulses',
  summary:
    'Where the main artery runs under the skin from the clavicle to the palm, and where to feel each pulse.',
  estimatedMinutes: 10,
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
      'Volume 1, Chapter 11 Surface Marking, Radiological Anatomy and Comparison of Upper and Lower Limbs, pages 180 to 185',
    ),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, surface anatomy, pages 810 to 819'),
    {
      title: 'TeachMeAnatomy: Arteries of the Upper Limb',
      url: 'https://teachmeanatomy.info/upper-limb/vessels/arteries/',
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
    'With the arm abducted to a right angle and the palm up, the axillary and brachial arteries follow a line from the middle of the clavicle to the middle of the front of the elbow, a finger breadth below the crease.',
    'The axillary artery becomes the brachial at the lower border of teres major; the brachial divides at the level of the neck of the radius.',
    'The radial artery runs from there to the wrist just lateral to the flexor carpi radialis tendon; the ulnar artery curves medially and runs down to the lateral side of the pisiform.',
    'The superficial palmar arch lies level with the outstretched thumb; the deep arch about a finger breadth nearer the wrist.',
    'Pulses: axillary (against the humerus in the axilla), brachial (medial arm, and medial to the biceps tendon at the elbow, where blood pressure is taken), radial (at the wrist and in the snuffbox), ulnar (at the wrist beside the pisiform).',
  ],
  visual: {
    kind: 'path',
    // Left: the arterial trunk from the neck to the palm. Right: where each part's pulse is felt.
    diagram: {
      width: 360,
      height: 440,
      nodes: [
        {
          id: 'subclavian-artery',
          label: 'Subclavian\nartery',
          name: 'Subclavian artery',
          x: 70,
          y: 40,
        },
        {
          id: 'axillary-artery',
          label: 'Axillary\nartery',
          name: 'Axillary artery',
          x: 70,
          y: 110,
        },
        {
          id: 'brachial-artery',
          label: 'Brachial\nartery',
          name: 'Brachial artery',
          x: 70,
          y: 180,
        },
        { id: 'radial-artery', label: 'Radial\nartery', name: 'Radial artery', x: 40, y: 260 },
        { id: 'ulnar-artery', label: 'Ulnar\nartery', name: 'Ulnar artery', x: 120, y: 330 },
        {
          id: 'deep-palmar-arch',
          label: 'Deep\npalmar arch',
          name: 'Deep palmar arch',
          x: 50,
          y: 400,
        },
        {
          id: 'superficial-palmar-arch',
          label: 'Superficial\npalmar arch',
          name: 'Superficial palmar arch',
          x: 160,
          y: 400,
        },
        {
          id: 'axillary-pulse',
          label: 'Axilla, on\nthe humerus',
          name: 'Axillary pulse',
          x: 270,
          y: 110,
        },
        {
          id: 'brachial-pulse',
          label: 'Medial arm;\nfront of elbow',
          name: 'Brachial pulse and blood pressure',
          x: 270,
          y: 180,
        },
        {
          id: 'radial-pulse',
          label: 'Wrist, lateral\nto FCR',
          name: 'Radial pulse at the wrist',
          x: 270,
          y: 245,
        },
        {
          id: 'snuffbox-pulse',
          label: 'Anatomical\nsnuffbox',
          name: 'Radial pulse in the anatomical snuffbox',
          x: 270,
          y: 300,
        },
        {
          id: 'ulnar-pulse',
          label: 'Wrist, beside\npisiform',
          name: 'Ulnar pulse',
          x: 270,
          y: 360,
        },
      ],
      edges: [
        { from: 'subclavian-artery', to: 'axillary-artery' },
        { from: 'axillary-artery', to: 'brachial-artery' },
        { from: 'brachial-artery', to: 'radial-artery' },
        { from: 'brachial-artery', to: 'ulnar-artery' },
        { from: 'radial-artery', to: 'deep-palmar-arch' },
        { from: 'ulnar-artery', to: 'superficial-palmar-arch' },
        { from: 'axillary-artery', to: 'axillary-pulse' },
        { from: 'brachial-artery', to: 'brachial-pulse' },
        { from: 'radial-artery', to: 'radial-pulse' },
        { from: 'radial-artery', to: 'snuffbox-pulse' },
        { from: 'ulnar-artery', to: 'ulnar-pulse' },
      ],
    },
    lesions: [
      {
        id: 'supracondylar',
        label: 'Absent radial pulse after an elbow fracture',
        nodeIds: ['brachial-artery', 'radial-pulse'],
        explanation:
          'After a supracondylar fracture in a child, the brachial artery can be kinked or torn by the bone end. A missing or weak radial pulse, a cold pale hand and pain on stretching the fingers are an emergency: without blood the forearm muscles die and scar into a Volkmann contracture.',
      },
      {
        id: 'allen-test',
        label: 'Before a radial artery puncture',
        nodeIds: ['radial-artery', 'ulnar-artery', 'superficial-palmar-arch'],
        explanation:
          'The radial artery at the wrist is used for blood gases and arterial lines. First check that the ulnar artery can supply the hand alone (Allen test): press on both arteries while the student clenches the fist, then release the ulnar only. If the palm flushes within a few seconds, the arches are complete and the radial can be used safely.',
      },
    ],
    drill: [
      {
        id: 'trunk',
        title: 'The arterial trunk',
        hint: 'From the neck to the palm, naming each part as it changes.',
        nodeIds: [
          'subclavian-artery',
          'axillary-artery',
          'brachial-artery',
          'radial-artery',
          'ulnar-artery',
          'deep-palmar-arch',
          'superficial-palmar-arch',
        ],
      },
      {
        id: 'pulses',
        title: 'Pulse points',
        hint: 'Where each pulse is felt, with the landmark next to it.',
        nodeIds: [
          'axillary-pulse',
          'brachial-pulse',
          'radial-pulse',
          'snuffbox-pulse',
          'ulnar-pulse',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: SHOULDER_MODEL_CREDIT,
      parts: shoulderParts([
        'subclavian-artery',
        'axillary-artery',
        'brachial-artery',
        'radial-artery',
        'ulnar-artery',
        'superficial-palmar-arch',
        'deep-palmar-arch',
        'clavicle',
        'first-rib',
        'scapula',
        'humerus',
        'radius',
        'ulna',
        ...HAND_BONES,
      ]),
      traces: [],
      stops: [
        {
          id: 'limb',
          title: 'From clavicle to palm',
          description:
            'One continuous trunk: subclavian to the outer border of the first rib, axillary to the lower border of teres major, brachial to the neck of the radius, then radial and ulnar to the palm.',
          target: [-160, -95, 1060],
          position: [-634, -1354, 1168],
        },
        {
          id: 'arm',
          title: 'Axilla and arm',
          description:
            'The axillary pulse is felt high in the armpit by pressing the artery against the humerus; the brachial pulse along the medial side of the arm and at the elbow.',
          target: [-165, -88, 1200],
          position: [-69, -553, 1272],
        },
        {
          id: 'wrist',
          title: 'At the wrist',
          description:
            'The radial pulse lies on the lower radius lateral to the flexor carpi radialis tendon; the ulnar pulse lies just lateral to the pisiform.',
          target: [-255, -125, 800],
          position: [-321, -447, 833],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'why',
      title: 'Why surface marking matters',
      body: 'Surface marking places deep structures on the skin, so a pulse can be found, a pressure point used to stop bleeding, or an incision made without cutting a vessel or nerve. Marking is done with the arm abducted to a right angle and the palm up.',
      focus: [],
    },
    {
      id: 'axillary-brachial',
      title: 'Axillary and brachial arteries',
      body: 'Draw a line from the middle of the clavicle to the middle of the front of the elbow, a finger breadth below the crease. The upper third is the axillary artery, down to the lower border of teres major; the rest is the brachial artery, which ends by dividing at the level of the neck of the radius.',
      focus: ['subclavian-artery', 'axillary-artery', 'brachial-artery'],
    },
    {
      id: 'forearm',
      title: 'Radial and ulnar arteries',
      body: 'The radial artery runs from the end of the brachial to the wrist just lateral to the flexor carpi radialis tendon, then winds through the anatomical snuffbox. The ulnar artery curves medially through the upper third of the forearm, then runs straight down to the lateral side of the pisiform.',
      focus: ['radial-artery', 'ulnar-artery'],
    },
    {
      id: 'arches',
      title: 'Palmar arches',
      body: 'The superficial palmar arch lies level with the distal border of the fully outstretched thumb. The deep palmar arch lies about a finger breadth nearer the wrist.',
      focus: ['superficial-palmar-arch', 'deep-palmar-arch'],
    },
    {
      id: 'pulses',
      title: 'Feeling the pulses',
      body: 'Axillary: high in the axilla against the humerus. Brachial: on the medial side of the arm against the humerus, and in the cubital fossa just medial to the biceps tendon, where blood pressure is measured. Radial: at the wrist lateral to the flexor carpi radialis tendon, and in the anatomical snuffbox. Ulnar: at the wrist just lateral to the pisiform.',
      focus: ['axillary-pulse', 'brachial-pulse', 'radial-pulse', 'snuffbox-pulse', 'ulnar-pulse'],
    },
    {
      id: 'nerves',
      title: 'Nerves on the surface',
      body: 'The median nerve follows the brachial artery, crossing it from lateral to medial in the middle of the arm, then runs down the middle of the front of the forearm. The ulnar nerve runs behind the medial epicondyle, where it can be rolled under the finger, then down to the lateral side of the pisiform. The radial nerve crosses the back of the humerus in the radial groove.',
      focus: ['brachial-artery', 'ulnar-pulse'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each part of the trunk to see where it runs, then turn on a problem to see why the pulses matter.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'surface-bp',
      prompt: 'Blood pressure is measured by listening over the brachial artery:',
      options: [
        { id: 'medial-biceps', text: 'Just medial to the biceps tendon at the elbow' },
        { id: 'lateral-biceps', text: 'Just lateral to the biceps tendon' },
        { id: 'axilla', text: 'High in the axilla' },
        { id: 'wrist', text: 'At the wrist' },
      ],
      answerId: 'medial-biceps',
      explanation:
        'In the cubital fossa the brachial artery lies medial to the biceps tendon, with the median nerve medial to it.',
    },
    {
      id: 'surface-axillary-end',
      prompt: 'The axillary artery becomes the brachial artery at the:',
      options: [
        { id: 'teres-major', text: 'Lower border of teres major' },
        { id: 'first-rib', text: 'Outer border of the first rib' },
        { id: 'pec-minor', text: 'Lower border of pectoralis minor' },
        { id: 'elbow', text: 'Front of the elbow' },
      ],
      answerId: 'teres-major',
      explanation:
        'The subclavian becomes axillary at the outer border of the first rib; the axillary becomes brachial at the lower border of teres major.',
    },
    {
      id: 'surface-superficial-arch',
      prompt: 'The superficial palmar arch lies level with:',
      options: [
        { id: 'thumb', text: 'The distal border of the outstretched thumb' },
        { id: 'wrist-crease', text: 'The distal wrist crease' },
        { id: 'mcp', text: 'The knuckles' },
        { id: 'retinaculum', text: 'The upper border of the flexor retinaculum' },
      ],
      answerId: 'thumb',
      explanation: 'The deep arch lies about a finger breadth closer to the wrist.',
    },
    {
      id: 'surface-ulnar-pulse',
      prompt: 'The ulnar pulse is felt at the wrist:',
      options: [
        { id: 'pisiform', text: 'Just lateral to the pisiform' },
        { id: 'fcr', text: 'Lateral to the flexor carpi radialis tendon' },
        { id: 'snuffbox', text: 'In the anatomical snuffbox' },
        { id: 'dorsum', text: 'On the back of the wrist' },
      ],
      answerId: 'pisiform',
      explanation:
        'The ulnar artery crosses in front of the flexor retinaculum just lateral to the pisiform, with the ulnar nerve medial to it.',
    },
  ],
  cards: [
    {
      id: 'surface-line',
      front: 'Surface line of the axillary and brachial arteries?',
      back: 'Arm abducted, palm up: from the middle of the clavicle to the middle of the front of the elbow, a finger breadth below the crease.',
    },
    {
      id: 'surface-radial',
      front: 'Surface marking of the radial artery?',
      back: 'From the neck of the radius to the wrist just lateral to the flexor carpi radialis tendon, then through the snuffbox.',
    },
    {
      id: 'surface-pulses',
      front: 'Four pulse points of the upper limb?',
      back: 'Axillary, brachial, radial (wrist and snuffbox) and ulnar.',
    },
    {
      id: 'surface-arches',
      front: 'Surface levels of the palmar arches?',
      back: 'Superficial: level with the outstretched thumb. Deep: a finger breadth nearer the wrist.',
    },
    {
      id: 'surface-allen',
      front: 'What does the Allen test check?',
      back: 'That the ulnar artery alone can supply the hand before the radial artery is punctured or cannulated.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter:
        'Chapter 11 Surface Marking, Radiological Anatomy and Comparison of Upper and Lower Limbs',
      pages: '180–185',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '810–819' },
  ],
};
