import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  LATERAL_CUTANEOUS_FOREARM,
  LYMPH_FOREARM,
  MEDIAL_CUTANEOUS_FOREARM,
  POSTERIOR_CUTANEOUS_FOREARM,
} from './forearm-3d';
import {
  HAND_BONES,
  LYMPH_GROUPS,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 3 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const skinVeinsLymph: Topic = {
  slug: 'skin-veins-lymph',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Skin nerves, superficial veins and lymph',
  summary:
    'The cephalic, basilic and median cubital veins, the skin nerves of the forearm, and where the lymph of the upper limb drains.',
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
      'Volume 1, Chapter 7 Cutaneous Nerves, Superficial Veins and Lymphatic Drainage, pages 83 to 93',
    ),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, regional anatomy, pages 684 to 688'),
    {
      title: 'TeachMeAnatomy: Venous Drainage of the Upper Limb',
      url: 'https://teachmeanatomy.info/upper-limb/vessels/venous-drainage/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones and veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Both main superficial veins start from the dorsal venous arch on the back of the hand: the cephalic from its lateral end, the basilic from its medial end.',
    'The cephalic vein runs up the lateral side, through the deltopectoral groove, and pierces the clavipectoral fascia to join the axillary vein.',
    'The basilic vein runs up the medial side, pierces the deep fascia in the middle of the arm, and becomes the axillary vein at the lower border of teres major.',
    'The median cubital vein joins the cephalic to the basilic in front of the elbow; it is the usual vein for taking blood.',
    'Skin of the forearm: lateral cutaneous nerve (musculocutaneous), medial cutaneous nerve (medial cord) and posterior cutaneous nerve (radial).',
    'Superficial lymph vessels follow the veins: the medial ones through the cubital (supratrochlear) nodes to the lateral axillary nodes, some lateral ones to the deltopectoral nodes.',
  ],
  visual: {
    kind: 'path',
    // Top: the superficial veins from the hand to the axilla. Middle: the skin nerves of the
    // forearm under their parent nerves. Bottom: the superficial lymph and its nodes.
    diagram: {
      width: 360,
      height: 590,
      nodes: [
        {
          id: 'dorsal-arch',
          label: 'Dorsal\nvenous arch',
          name: 'Dorsal venous arch of the hand',
          x: 180,
          y: 30,
        },
        { id: 'cephalic-vein', label: 'Cephalic\nvein', name: 'Cephalic vein', x: 60, y: 95 },
        {
          id: 'median-antebrachial-vein',
          label: 'Median v.\nforearm',
          name: 'Median vein of the forearm',
          x: 180,
          y: 95,
        },
        { id: 'basilic-vein', label: 'Basilic\nvein', name: 'Basilic vein', x: 300, y: 95 },
        {
          id: 'median-cubital-vein',
          label: 'Median\ncubital v.',
          name: 'Median cubital vein',
          x: 180,
          y: 155,
        },
        { id: 'axillary-vein', label: 'Axillary\nvein', name: 'Axillary vein', x: 180, y: 220 },
        {
          id: 'musculocutaneous',
          label: 'Musculo-\ncutaneous n.',
          name: 'Musculocutaneous nerve',
          x: 60,
          y: 290,
        },
        { id: 'radial', label: 'Radial\nnerve', name: 'Radial nerve', x: 180, y: 290 },
        { id: 'medial-cord', label: 'Medial\ncord', name: 'Medial cord', x: 300, y: 290 },
        {
          id: 'lateral-cutaneous',
          label: 'Lateral cut.\nn. forearm',
          name: 'Lateral cutaneous nerve of the forearm',
          x: 60,
          y: 350,
        },
        {
          id: 'posterior-cutaneous',
          label: 'Posterior cut.\nn. forearm',
          name: 'Posterior cutaneous nerve of the forearm',
          x: 180,
          y: 350,
        },
        {
          id: 'medial-cutaneous',
          label: 'Medial cut.\nn. forearm',
          name: 'Medial cutaneous nerve of the forearm',
          x: 300,
          y: 350,
        },
        {
          id: 'lateral-vessels',
          label: 'Lateral\nvessels',
          name: 'Lymph vessels of the lateral side',
          x: 60,
          y: 420,
        },
        {
          id: 'medial-vessels',
          label: 'Medial\nvessels',
          name: 'Lymph vessels of the medial side',
          x: 180,
          y: 420,
        },
        {
          id: 'supratrochlear',
          label: 'Cubital\nnodes',
          name: 'Supratrochlear (cubital) lymph nodes',
          x: 300,
          y: 420,
        },
        {
          id: 'deltopectoral',
          label: 'Delto-\npectoral nodes',
          name: 'Deltopectoral (infraclavicular) lymph nodes',
          x: 60,
          y: 490,
        },
        {
          id: 'lateral-axillary',
          label: 'Lateral\naxillary nodes',
          name: 'Lateral axillary lymph nodes',
          x: 300,
          y: 490,
        },
        {
          id: 'apical',
          label: 'Apical\nnodes',
          name: 'Apical axillary lymph nodes',
          x: 180,
          y: 550,
        },
      ],
      edges: [
        { from: 'dorsal-arch', to: 'cephalic-vein' },
        { from: 'dorsal-arch', to: 'basilic-vein' },
        { from: 'cephalic-vein', to: 'median-cubital-vein' },
        { from: 'median-cubital-vein', to: 'basilic-vein' },
        { from: 'median-antebrachial-vein', to: 'median-cubital-vein' },
        { from: 'cephalic-vein', to: 'axillary-vein' },
        { from: 'basilic-vein', to: 'axillary-vein' },
        { from: 'musculocutaneous', to: 'lateral-cutaneous' },
        { from: 'radial', to: 'posterior-cutaneous' },
        { from: 'medial-cord', to: 'medial-cutaneous' },
        { from: 'lateral-vessels', to: 'deltopectoral' },
        { from: 'lateral-vessels', to: 'lateral-axillary' },
        { from: 'medial-vessels', to: 'supratrochlear' },
        { from: 'supratrochlear', to: 'lateral-axillary' },
        { from: 'deltopectoral', to: 'apical' },
        { from: 'lateral-axillary', to: 'apical' },
      ],
    },
    lesions: [
      {
        id: 'needle-nerve',
        label: 'Nerve hit during venepuncture',
        nodeIds: ['lateral-cutaneous', 'medial-cutaneous'],
        explanation:
          'The cutaneous nerves of the forearm run close under the veins at the elbow: the lateral one under the cephalic and median cubital veins, the medial one beside the basilic. A needle can strike them, giving a sharp electric pain and later numbness or tingling along the side of the forearm.',
      },
      {
        id: 'lymphangitis',
        label: 'Infected finger',
        nodeIds: ['medial-vessels', 'supratrochlear', 'lateral-axillary'],
        explanation:
          'An infection of the little or ring finger spreads along the medial lymph vessels, seen as red streaks up the forearm. The cubital nodes above the medial epicondyle swell and become tender, then the lateral axillary nodes.',
      },
    ],
    drill: [
      {
        id: 'veins',
        title: 'Superficial veins',
        hint: 'From the back of the hand, up each side, the join at the elbow, and where they end.',
        nodeIds: [
          'dorsal-arch',
          'cephalic-vein',
          'basilic-vein',
          'median-antebrachial-vein',
          'median-cubital-vein',
          'axillary-vein',
        ],
      },
      {
        id: 'nerves',
        title: 'Skin nerves of the forearm',
        hint: 'One on each side and one on the back, each under the nerve it comes from.',
        nodeIds: [
          'musculocutaneous',
          'radial',
          'medial-cord',
          'lateral-cutaneous',
          'posterior-cutaneous',
          'medial-cutaneous',
        ],
      },
      {
        id: 'lymph',
        title: 'Lymph',
        hint: 'Two sets of vessels, the node at the elbow, and the nodes in and near the axilla.',
        nodeIds: [
          'lateral-vessels',
          'medial-vessels',
          'supratrochlear',
          'deltopectoral',
          'lateral-axillary',
          'apical',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Nerve paths and lymph nodes: MedLearn schematic, not yet medically reviewed.`,
      parts: shoulderParts([
        'cephalic-vein',
        'basilic-vein',
        'median-cubital-vein',
        'median-antebrachial-vein',
        'axillary-vein',
        'clavicle',
        'scapula',
        'humerus',
        'radius',
        'ulna',
        ...HAND_BONES,
      ]),
      traces: [
        { id: 'lateral-cutaneous', kind: 'nerve', paths: LATERAL_CUTANEOUS_FOREARM },
        { id: 'medial-cutaneous', kind: 'nerve', paths: MEDIAL_CUTANEOUS_FOREARM },
        { id: 'posterior-cutaneous', kind: 'nerve', paths: POSTERIOR_CUTANEOUS_FOREARM },
        { id: 'supratrochlear', kind: 'lymph', paths: [LYMPH_FOREARM.supratrochlear] },
        { id: 'lateral-axillary', kind: 'lymph', paths: [LYMPH_FOREARM.lateralAxillary] },
        { id: 'deltopectoral', kind: 'lymph', paths: [LYMPH_FOREARM.deltopectoral] },
        { id: 'apical', kind: 'lymph', paths: [LYMPH_GROUPS.apical] },
      ],
      stops: [
        {
          id: 'limb',
          title: 'The whole limb',
          description:
            'The cephalic vein climbs the lateral side and the basilic vein the medial side, joined in front of the elbow by the median cubital vein.',
          target: [-190, -100, 1000],
          position: [-664, -1359, 1108],
        },
        {
          id: 'elbow',
          title: 'In front of the elbow',
          description:
            'The median cubital vein runs up and medially from the cephalic to the basilic vein. The skin nerves of the forearm pass close under the veins here.',
          target: [-208, -92, 1040],
          position: [-334, -491, 1082],
        },
        {
          id: 'nodes',
          title: 'Where the lymph goes',
          description:
            'The cubital nodes sit above the medial epicondyle beside the basilic vein. Lymph then reaches the lateral axillary nodes, and some from the lateral side reaches the deltopectoral nodes by the cephalic vein.',
          target: [-160, -95, 1200],
          position: [-356, -616, 1256],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'dorsal-arch',
      title: 'Where the veins begin',
      body: 'Blood from the fingers drains to a network on the back of the hand, the dorsal venous arch. The main superficial veins start from its two ends: the cephalic from the lateral (thumb) end, the basilic from the medial (little finger) end.',
      focus: ['dorsal-arch', 'cephalic-vein', 'basilic-vein'],
    },
    {
      id: 'cephalic',
      title: 'Cephalic vein',
      body: 'It crosses the roof of the anatomical snuffbox, winds round to the front of the forearm, passes in front of the elbow, and climbs along the lateral side of biceps. In the deltopectoral groove it pierces the clavipectoral fascia and ends in the axillary vein.',
      focus: ['cephalic-vein', 'axillary-vein'],
    },
    {
      id: 'basilic',
      title: 'Basilic vein',
      body: 'It runs up the back of the medial forearm, comes to the front below the elbow, and climbs along the medial side of biceps. In the middle of the arm it pierces the deep fascia, runs beside the brachial artery, and at the lower border of teres major becomes the axillary vein.',
      focus: ['basilic-vein', 'axillary-vein'],
    },
    {
      id: 'median-veins',
      title: 'Median cubital and median forearm veins',
      body: 'In front of the elbow the median cubital vein runs upwards and medially from the cephalic to the basilic vein, lying on the bicipital aponeurosis. A deep branch ties it to the deep veins, so it does not roll under a needle. The median vein of the forearm drains the palm and ends in it or in the basilic vein.',
      focus: ['median-cubital-vein', 'median-antebrachial-vein'],
    },
    {
      id: 'skin-nerves',
      title: 'Skin nerves of the forearm',
      body: 'Three nerves share the skin of the forearm. The lateral cutaneous nerve is the end of the musculocutaneous nerve (C5, C6). The medial cutaneous nerve comes straight from the medial cord (C8, T1) and runs down with the basilic vein. The posterior cutaneous nerve is a branch of the radial nerve.',
      focus: [
        'musculocutaneous',
        'lateral-cutaneous',
        'medial-cord',
        'medial-cutaneous',
        'radial',
        'posterior-cutaneous',
      ],
    },
    {
      id: 'dermatomes',
      title: 'Dermatomes in brief',
      body: 'Each spinal nerve supplies a strip of skin. Down the lateral side of the limb run C5 (arm), C6 (forearm and thumb) and C7 (middle finger); up the medial side run C8 (little finger and forearm), T1 (arm) and T2 (axilla). Test them in that order when checking roots.',
      focus: [],
    },
    {
      id: 'lymph',
      title: 'Lymph',
      body: 'Superficial lymph vessels follow the veins. Those of the medial side run with the basilic vein through one or two cubital (supratrochlear) nodes above the medial epicondyle to the lateral axillary nodes. Most lateral vessels reach the lateral axillary nodes too; a few follow the cephalic vein to the deltopectoral nodes and on to the apical nodes. Deep vessels follow the deep arteries.',
      focus: [
        'lateral-vessels',
        'medial-vessels',
        'supratrochlear',
        'deltopectoral',
        'lateral-axillary',
        'apical',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a vein or a nerve to see its course, then turn on an injury to see what happens.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'skin-veins-cephalic-end',
      prompt: 'The cephalic vein ends by:',
      options: [
        { id: 'axillary', text: 'Piercing the clavipectoral fascia to join the axillary vein' },
        { id: 'basilic', text: 'Joining the basilic vein at the elbow' },
        { id: 'brachial', text: 'Joining the brachial veins in the middle of the arm' },
        { id: 'subclavian', text: 'Joining the internal jugular vein' },
      ],
      answerId: 'axillary',
      explanation:
        'It runs in the deltopectoral groove and pierces the clavipectoral fascia to drain into the axillary vein.',
    },
    {
      id: 'skin-veins-basilic-axillary',
      prompt: 'The basilic vein becomes the axillary vein at the:',
      options: [
        { id: 'teres-major', text: 'Lower border of teres major' },
        { id: 'first-rib', text: 'Outer border of the first rib' },
        { id: 'pec-minor', text: 'Upper border of pectoralis minor' },
        { id: 'elbow', text: 'Front of the elbow' },
      ],
      answerId: 'teres-major',
      explanation:
        'The axillary vein begins at the lower border of teres major as the continuation of the basilic vein, and ends at the outer border of the first rib.',
    },
    {
      id: 'skin-veins-medial-cutaneous',
      prompt: 'The medial cutaneous nerve of the forearm is a branch of the:',
      options: [
        { id: 'medial-cord', text: 'Medial cord' },
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'median', text: 'Median nerve' },
        { id: 'radial', text: 'Radial nerve' },
      ],
      answerId: 'medial-cord',
      explanation:
        'It comes straight from the medial cord (C8, T1). The lateral one is the end of the musculocutaneous nerve and the posterior one comes from the radial nerve.',
    },
    {
      id: 'skin-veins-cubital-nodes',
      prompt: 'An infected little finger makes which nodes swell first?',
      options: [
        { id: 'cubital', text: 'Cubital (supratrochlear) nodes' },
        { id: 'deltopectoral', text: 'Deltopectoral nodes' },
        { id: 'apical', text: 'Apical axillary nodes' },
        { id: 'pectoral', text: 'Pectoral (anterior) axillary nodes' },
      ],
      answerId: 'cubital',
      explanation:
        'Lymph from the medial side of the hand follows the basilic vein through the cubital nodes above the medial epicondyle, then to the lateral axillary nodes.',
    },
  ],
  cards: [
    {
      id: 'skin-veins-origins',
      front: 'Where do the cephalic and basilic veins begin?',
      back: 'At the lateral and medial ends of the dorsal venous arch of the hand.',
    },
    {
      id: 'skin-veins-median-cubital',
      front: 'Course of the median cubital vein and why it is used for taking blood?',
      back: 'Upwards and medially from cephalic to basilic across the front of the elbow; tethered by a deep branch so it does not roll, and the bicipital aponeurosis shields the artery below.',
    },
    {
      id: 'skin-veins-forearm-nerves',
      front: 'Skin nerves of the forearm and their sources?',
      back: 'Lateral: musculocutaneous. Medial: medial cord. Posterior: radial.',
    },
    {
      id: 'skin-veins-dermatomes',
      front: 'Dermatomes of the thumb, middle finger and little finger?',
      back: 'Thumb C6, middle finger C7, little finger C8.',
    },
    {
      id: 'skin-veins-lymph-routes',
      front: 'Two routes of superficial lymph from the upper limb?',
      back: 'Medial: with the basilic vein via the cubital nodes to the lateral axillary nodes. Lateral: mostly to the lateral axillary nodes, some with the cephalic vein to the deltopectoral nodes.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 7 Cutaneous Nerves, Superficial Veins and Lymphatic Drainage',
      pages: '83–93',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '684–688' },
  ],
};
