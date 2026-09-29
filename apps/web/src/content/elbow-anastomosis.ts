import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { SHOULDER_MODEL_CREDIT, SHOULDER_MODEL_SRC, shoulderParts } from './shoulder-3d';

// Upper limb batch 6 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const elbowAnastomosis: Topic = {
  slug: 'elbow-anastomosis',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Anastomosis around the elbow',
  summary:
    'Four pairs of arteries, collaterals from above meeting recurrents from below, that keep the forearm supplied when the brachial artery is blocked at the elbow.',
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
      'Volume 1, Chapter 8 Arm, page 101, and Chapter 12, pages 198 to 199',
    ),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, arm, pages 745 to 747'),
    {
      title: 'TeachMeAnatomy: The Brachial Artery',
      url: 'https://teachmeanatomy.info/upper-limb/vessels/arteries/brachial-artery/',
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
    'Around the elbow, branches from the brachial and profunda brachii arteries above join recurrent branches of the radial and ulnar arteries below.',
    'In front of the lateral epicondyle: the radial collateral branch of the profunda brachii joins the radial recurrent artery.',
    'Behind the lateral epicondyle: the middle collateral branch of the profunda brachii joins the recurrent interosseous artery.',
    'In front of the medial epicondyle: the inferior ulnar collateral artery joins the anterior ulnar recurrent artery.',
    'Behind the medial epicondyle: the superior ulnar collateral artery, running with the ulnar nerve, joins the posterior ulnar recurrent artery.',
  ],
  visual: {
    kind: 'path',
    // Collaterals from above on the top row, recurrents from below on the bottom row, each pair
    // joined where it meets, lateral on the left.
    diagram: {
      width: 360,
      height: 330,
      nodes: [
        {
          id: 'brachial-artery',
          label: 'Brachial\nartery',
          name: 'Brachial artery',
          x: 250,
          y: 35,
        },
        {
          id: 'deep-brachial-artery',
          label: 'Profunda\nbrachii',
          name: 'Profunda brachii artery',
          x: 100,
          y: 35,
        },
        {
          id: 'radial-collateral-artery',
          label: 'Radial\ncollateral',
          name: 'Radial collateral artery',
          x: 45,
          y: 115,
        },
        {
          id: 'middle-collateral-artery',
          label: 'Middle\ncollateral',
          name: 'Middle collateral artery',
          x: 135,
          y: 115,
        },
        {
          id: 'inferior-ulnar-collateral-artery',
          label: 'Inferior ulnar\ncollateral',
          name: 'Inferior ulnar collateral artery',
          x: 230,
          y: 115,
        },
        {
          id: 'superior-ulnar-collateral-artery',
          label: 'Superior ulnar\ncollateral',
          name: 'Superior ulnar collateral artery',
          x: 305,
          y: 175,
        },
        {
          id: 'radial-recurrent-artery',
          label: 'Radial\nrecurrent',
          name: 'Radial recurrent artery',
          x: 45,
          y: 215,
        },
        {
          id: 'recurrent-interosseous-artery',
          label: 'Recurrent\ninterosseous',
          name: 'Recurrent interosseous artery',
          x: 135,
          y: 215,
        },
        {
          id: 'ulnar-recurrent-arteries',
          label: 'Ulnar\nrecurrents',
          name: 'Anterior and posterior ulnar recurrent arteries',
          x: 270,
          y: 250,
        },
        { id: 'radial-artery', label: 'Radial\nartery', name: 'Radial artery', x: 45, y: 295 },
        {
          id: 'common-interosseous-artery',
          label: 'Common\ninterosseous',
          name: 'Common interosseous artery',
          x: 150,
          y: 295,
        },
        { id: 'ulnar-artery', label: 'Ulnar\nartery', name: 'Ulnar artery', x: 270, y: 305 },
      ],
      edges: [
        { from: 'brachial-artery', to: 'deep-brachial-artery' },
        { from: 'deep-brachial-artery', to: 'radial-collateral-artery' },
        { from: 'deep-brachial-artery', to: 'middle-collateral-artery' },
        { from: 'brachial-artery', to: 'inferior-ulnar-collateral-artery' },
        { from: 'brachial-artery', to: 'superior-ulnar-collateral-artery' },
        { from: 'radial-collateral-artery', to: 'radial-recurrent-artery' },
        { from: 'middle-collateral-artery', to: 'recurrent-interosseous-artery' },
        { from: 'inferior-ulnar-collateral-artery', to: 'ulnar-recurrent-arteries' },
        { from: 'superior-ulnar-collateral-artery', to: 'ulnar-recurrent-arteries' },
        { from: 'radial-artery', to: 'radial-recurrent-artery' },
        { from: 'common-interosseous-artery', to: 'recurrent-interosseous-artery' },
        { from: 'ulnar-artery', to: 'ulnar-recurrent-arteries' },
        { from: 'ulnar-artery', to: 'common-interosseous-artery' },
      ],
    },
    lesions: [
      {
        id: 'ligation',
        label: 'Brachial artery tied below its branches',
        nodeIds: ['brachial-artery'],
        explanation:
          'If the brachial artery must be tied or is blocked below the origin of the profunda brachii, the collaterals still carry blood down to the recurrent branches, and so to the radial and ulnar arteries: the forearm survives. Tied above the profunda, there may not be enough.',
      },
      {
        id: 'supracondylar',
        label: 'Supracondylar fracture',
        nodeIds: ['brachial-artery', 'ulnar-recurrent-arteries', 'radial-recurrent-artery'],
        explanation:
          'A sudden block at the elbow, before the anastomosis has had time to enlarge, may still starve the forearm muscles. The anastomosis protects against slow narrowing better than against a sudden tear or a tight cast, so every such fracture needs the radial pulse and the fingers checked.',
      },
    ],
    drill: [
      {
        id: 'collaterals',
        title: 'From above',
        hint: 'Two branches of the profunda brachii and two of the brachial artery.',
        nodeIds: [
          'deep-brachial-artery',
          'radial-collateral-artery',
          'middle-collateral-artery',
          'inferior-ulnar-collateral-artery',
          'superior-ulnar-collateral-artery',
        ],
      },
      {
        id: 'recurrents',
        title: 'From below',
        hint: 'A recurrent from the radial, one from the interosseous trunk, two from the ulnar.',
        nodeIds: [
          'radial-recurrent-artery',
          'recurrent-interosseous-artery',
          'ulnar-recurrent-arteries',
          'radial-artery',
          'common-interosseous-artery',
          'ulnar-artery',
        ],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: SHOULDER_MODEL_CREDIT,
      parts: shoulderParts([
        'brachial-artery',
        'deep-brachial-artery',
        'radial-collateral-artery',
        'middle-collateral-artery',
        'superior-ulnar-collateral-artery',
        'inferior-ulnar-collateral-artery',
        'radial-recurrent-artery',
        'recurrent-interosseous-artery',
        'ulnar-recurrent-arteries',
        'common-interosseous-artery',
        'radial-artery',
        'ulnar-artery',
        'humerus',
        'radius',
        'ulna',
      ]),
      traces: [],
      stops: [
        {
          id: 'front',
          title: 'Around the elbow',
          description:
            'Branches come down from the brachial and profunda brachii arteries and up from the radial and ulnar arteries, meeting beside the two epicondyles.',
          target: [-205, -75, 1060],
          position: [-319, -436, 1098],
        },
        {
          id: 'medial',
          title: 'Medial side',
          description:
            'The inferior ulnar collateral runs in front of the medial epicondyle to meet the anterior ulnar recurrent; the superior ulnar collateral runs behind it with the ulnar nerve to meet the posterior ulnar recurrent.',
          target: [-190, -70, 1060],
          position: [100, -224, 1094],
        },
        {
          id: 'lateral',
          title: 'Lateral side',
          description:
            'The radial collateral runs in front of the lateral epicondyle to meet the radial recurrent; the middle collateral runs behind it to meet the recurrent interosseous.',
          target: [-225, -58, 1060],
          position: [-422, 205, 1093],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'why',
      title: 'Why an anastomosis',
      body: 'Bending the elbow can kink the brachial artery, and injuries often damage it there. A ring of small arteries around the joint links the vessels above the elbow with those below, so blood can go round a block.',
      focus: ['brachial-artery'],
    },
    {
      id: 'above',
      title: 'From above: four collaterals',
      body: 'The profunda brachii ends as the radial collateral (in front) and middle collateral (behind) arteries on the lateral side. The brachial artery gives the superior ulnar collateral, which runs with the ulnar nerve, and the inferior ulnar collateral, just above the elbow, on the medial side.',
      focus: [
        'deep-brachial-artery',
        'radial-collateral-artery',
        'middle-collateral-artery',
        'superior-ulnar-collateral-artery',
        'inferior-ulnar-collateral-artery',
      ],
    },
    {
      id: 'below',
      title: 'From below: four recurrents',
      body: 'Just below the elbow the radial artery gives the radial recurrent; the ulnar artery gives the anterior and posterior ulnar recurrents; and the posterior interosseous artery, from the common interosseous, gives the recurrent interosseous. Each climbs back up towards the epicondyles.',
      focus: [
        'radial-recurrent-artery',
        'ulnar-recurrent-arteries',
        'recurrent-interosseous-artery',
        'common-interosseous-artery',
      ],
    },
    {
      id: 'pairs',
      title: 'Four meeting points',
      body: 'Lateral, in front: radial collateral with radial recurrent. Lateral, behind: middle collateral with recurrent interosseous. Medial, in front: inferior ulnar collateral with anterior ulnar recurrent. Medial, behind: superior ulnar collateral with posterior ulnar recurrent.',
      focus: [
        'radial-collateral-artery',
        'radial-recurrent-artery',
        'middle-collateral-artery',
        'recurrent-interosseous-artery',
        'inferior-ulnar-collateral-artery',
        'superior-ulnar-collateral-artery',
        'ulnar-recurrent-arteries',
      ],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each artery to see it in the model, then turn on a block to see which way the blood goes round.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'elbow-anastomosis-middle',
      prompt: 'The middle collateral artery anastomoses with the:',
      options: [
        { id: 'recurrent-interosseous', text: 'Recurrent interosseous artery' },
        { id: 'radial-recurrent', text: 'Radial recurrent artery' },
        { id: 'anterior-ulnar', text: 'Anterior ulnar recurrent artery' },
        { id: 'posterior-ulnar', text: 'Posterior ulnar recurrent artery' },
      ],
      answerId: 'recurrent-interosseous',
      explanation:
        'Both lie behind the lateral epicondyle. The radial collateral meets the radial recurrent in front of it.',
    },
    {
      id: 'elbow-anastomosis-superior-ulnar',
      prompt: 'The superior ulnar collateral artery runs with the:',
      options: [
        { id: 'ulnar', text: 'Ulnar nerve' },
        { id: 'median', text: 'Median nerve' },
        { id: 'radial', text: 'Radial nerve' },
        { id: 'musculocutaneous', text: 'Musculocutaneous nerve' },
      ],
      answerId: 'ulnar',
      explanation:
        'It follows the ulnar nerve behind the medial epicondyle and joins the posterior ulnar recurrent artery.',
    },
    {
      id: 'elbow-anastomosis-recurrent-interosseous',
      prompt: 'The recurrent interosseous artery is a branch of the:',
      options: [
        { id: 'posterior-interosseous', text: 'Posterior interosseous artery' },
        { id: 'anterior-interosseous', text: 'Anterior interosseous artery' },
        { id: 'radial', text: 'Radial artery' },
        { id: 'brachial', text: 'Brachial artery' },
      ],
      answerId: 'posterior-interosseous',
      explanation:
        'The common interosseous (from the ulnar) divides into anterior and posterior interosseous; the posterior gives the recurrent interosseous.',
    },
    {
      id: 'elbow-anastomosis-front-lateral',
      prompt: 'In front of the lateral epicondyle, the radial recurrent artery meets the:',
      options: [
        { id: 'radial-collateral', text: 'Radial collateral artery' },
        { id: 'middle-collateral', text: 'Middle collateral artery' },
        { id: 'inferior-ulnar', text: 'Inferior ulnar collateral artery' },
        { id: 'superior-ulnar', text: 'Superior ulnar collateral artery' },
      ],
      answerId: 'radial-collateral',
      explanation: 'The radial collateral is the anterior terminal branch of the profunda brachii.',
    },
  ],
  cards: [
    {
      id: 'elbow-anastomosis-lateral',
      front: 'Anastomoses on the lateral side of the elbow?',
      back: 'In front: radial collateral with radial recurrent. Behind: middle collateral with recurrent interosseous.',
    },
    {
      id: 'elbow-anastomosis-medial',
      front: 'Anastomoses on the medial side of the elbow?',
      back: 'In front: inferior ulnar collateral with anterior ulnar recurrent. Behind: superior ulnar collateral with posterior ulnar recurrent.',
    },
    {
      id: 'elbow-anastomosis-profunda',
      front: 'Terminal branches of the profunda brachii artery?',
      back: 'Radial collateral (anterior descending) and middle collateral (posterior descending).',
    },
    {
      id: 'elbow-anastomosis-purpose',
      front: 'Why does the anastomosis around the elbow matter?',
      back: 'It lets blood bypass a block of the brachial artery below the profunda brachii, keeping the forearm alive.',
    },
    {
      id: 'elbow-anastomosis-ulnar-branches',
      front: 'Branches of the ulnar artery near the elbow?',
      back: 'Anterior and posterior ulnar recurrent arteries and the common interosseous artery.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 8 Arm', pages: '101' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '745–747' },
  ],
};
