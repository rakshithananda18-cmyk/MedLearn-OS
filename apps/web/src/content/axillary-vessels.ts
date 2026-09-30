import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  AXILLA_BONES,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 1 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const axillaryVessels: Topic = {
  slug: 'axillary-vessels',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Axillary vessels',
  summary: 'The three parts of the axillary artery, their six branches, and the axillary vein.',
  estimatedMinutes: 12,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 4 Axilla'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, axilla, pages 722 to 726'),
    {
      title: 'TeachMeAnatomy: Arterial Supply to the Upper Limb',
      url: 'https://teachmeanatomy.info/upper-limb/vessels/arteries/',
      licence: 'Cited, not copied',
    },
    {
      title: 'Radiopaedia: Axillary artery',
      url: 'https://radiopaedia.org/articles/axillary-artery',
      licence: 'CC BY-NC-SA 3.0; cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones, muscles and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The axillary artery runs from the outer border of the first rib to the lower border of teres major.',
    'Pectoralis minor divides it into three parts, with one, two and three branches.',
    'The subscapular artery, the largest branch, divides into the circumflex scapular and thoracodorsal arteries.',
    'The scapular anastomosis lets blood bypass a block above the origin of the subscapular artery.',
    'The axillary vein forms from the basilic and brachial veins, receives the cephalic vein and becomes the subclavian vein at the first rib.',
  ],
  visual: {
    kind: 'path',
    // The artery runs down the left; each part's branches fan out to the right.
    diagram: {
      width: 360,
      height: 440,
      nodes: [
        { id: 'subclavian-artery', label: 'Subclavian', name: 'Subclavian artery', x: 50, y: 30 },
        {
          id: 'axillary-artery-1',
          label: '1st part',
          name: 'First part of the axillary artery',
          x: 50,
          y: 90,
        },
        {
          id: 'superior-thoracic',
          label: 'Superior\nthoracic',
          name: 'Superior thoracic artery',
          x: 170,
          y: 90,
        },
        {
          id: 'axillary-artery-2',
          label: '2nd part',
          name: 'Second part of the axillary artery',
          x: 50,
          y: 175,
        },
        {
          id: 'thoracoacromial-artery',
          label: 'Thoraco-\nacromial',
          name: 'Thoracoacromial artery',
          x: 170,
          y: 150,
        },
        {
          id: 'lateral-thoracic-artery',
          label: 'Lateral\nthoracic',
          name: 'Lateral thoracic artery',
          x: 170,
          y: 200,
        },
        {
          id: 'axillary-artery-3',
          label: '3rd part',
          name: 'Third part of the axillary artery',
          x: 50,
          y: 310,
        },
        {
          id: 'subscapular-artery',
          label: 'Subscapular',
          name: 'Subscapular artery',
          x: 170,
          y: 260,
        },
        {
          id: 'circumflex-scapular-artery',
          label: 'Circumflex\nscapular',
          name: 'Circumflex scapular artery',
          x: 290,
          y: 235,
        },
        {
          id: 'thoracodorsal-artery',
          label: 'Thoraco-\ndorsal',
          name: 'Thoracodorsal artery',
          x: 290,
          y: 285,
        },
        {
          id: 'anterior-circumflex-humeral-artery',
          label: 'Anterior\ncircumflex',
          name: 'Anterior circumflex humeral artery',
          x: 170,
          y: 310,
        },
        {
          id: 'posterior-circumflex-humeral-artery',
          label: 'Posterior\ncircumflex',
          name: 'Posterior circumflex humeral artery',
          x: 170,
          y: 360,
        },
        { id: 'brachial-artery', label: 'Brachial', name: 'Brachial artery', x: 50, y: 410 },
      ],
      edges: [
        { from: 'subclavian-artery', to: 'axillary-artery-1' },
        { from: 'axillary-artery-1', to: 'axillary-artery-2' },
        { from: 'axillary-artery-2', to: 'axillary-artery-3' },
        { from: 'axillary-artery-3', to: 'brachial-artery' },
        { from: 'axillary-artery-1', to: 'superior-thoracic' },
        { from: 'axillary-artery-2', to: 'thoracoacromial-artery' },
        { from: 'axillary-artery-2', to: 'lateral-thoracic-artery' },
        { from: 'axillary-artery-3', to: 'subscapular-artery' },
        { from: 'axillary-artery-3', to: 'anterior-circumflex-humeral-artery' },
        { from: 'axillary-artery-3', to: 'posterior-circumflex-humeral-artery' },
        { from: 'subscapular-artery', to: 'circumflex-scapular-artery' },
        { from: 'subscapular-artery', to: 'thoracodorsal-artery' },
      ],
    },
    lesions: [
      {
        id: 'surgical-neck',
        label: 'Fracture of the surgical neck',
        nodeIds: ['posterior-circumflex-humeral-artery'],
        explanation:
          'The posterior circumflex humeral artery winds around the surgical neck of the humerus with the axillary nerve, through the quadrangular space. A fracture here can tear the artery (bleeding around the shoulder) and injure the nerve (a weak deltoid and numb skin over it).',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Three parts',
        hint: 'Subclavian above, brachial below; pectoralis minor divides the axillary artery into three.',
        nodeIds: [
          'subclavian-artery',
          'axillary-artery-1',
          'axillary-artery-2',
          'axillary-artery-3',
          'brachial-artery',
        ],
      },
      {
        id: 'first-second',
        title: 'Branches of parts 1 and 2',
        hint: 'One branch from the first part, two from the second.',
        nodeIds: ['superior-thoracic', 'thoracoacromial-artery', 'lateral-thoracic-artery'],
      },
      {
        id: 'third',
        title: 'Branches of part 3',
        hint: 'Three branches: one large, two that circle the humerus.',
        nodeIds: [
          'subscapular-artery',
          'anterior-circumflex-humeral-artery',
          'posterior-circumflex-humeral-artery',
        ],
      },
      {
        id: 'subscapular-branches',
        title: 'Subscapular artery',
        hint: 'One branch winds around the scapula; one follows its nerve to latissimus dorsi.',
        nodeIds: ['circumflex-scapular-artery', 'thoracodorsal-artery'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} The source model has the thoracoacromial branches but not its short trunk, and no superior thoracic artery.`,
      parts: shoulderParts([
        ...AXILLA_BONES,
        'pec-minor',
        'teres-major',
        'subclavian-artery',
        'axillary-artery-1',
        'axillary-artery-2',
        'axillary-artery-3',
        'brachial-artery',
        'thoracoacromial-artery',
        'lateral-thoracic-artery',
        'subscapular-artery',
        'circumflex-scapular-artery',
        'thoracodorsal-artery',
        'anterior-circumflex-humeral-artery',
        'posterior-circumflex-humeral-artery',
        'subclavian-vein',
        'axillary-vein',
        'cephalic-vein',
        'basilic-vein',
      ]),
      traces: [],
      stops: [
        {
          id: 'overview',
          title: 'The whole artery',
          description:
            'The subclavian artery arches over the first rib, runs through the axilla as the axillary artery and enters the arm as the brachial artery.',
          target: [-120, -80, 1250],
          position: [-300, -620, 1380],
        },
        {
          id: 'first-rib',
          title: 'At the first rib',
          description:
            'At the outer border of the first rib the subclavian artery becomes the axillary artery.',
          target: [-110, -88, 1325],
          position: [-220, -360, 1370],
        },
        {
          id: 'into-arm',
          title: 'Into the arm',
          description:
            'At the lower border of teres major the axillary artery becomes the brachial artery, which runs down beside the humerus.',
          target: [-175, -80, 1190],
          position: [-360, -430, 1240],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'course',
      title: 'First rib to teres major',
      body: 'The axillary artery continues the subclavian artery at the outer border of the first rib and becomes the brachial artery at the lower border of teres major. Pectoralis minor crosses in front of it and divides it into three parts: above, behind and below the muscle.',
      focus: [
        'subclavian-artery',
        'axillary-artery-1',
        'axillary-artery-2',
        'axillary-artery-3',
        'brachial-artery',
      ],
    },
    {
      id: 'first-part',
      title: 'First part: one branch',
      body: 'Above pectoralis minor, the first part gives one branch, the superior thoracic artery, to the upper intercostal spaces. One, two and three: each part has as many branches as its number.',
      focus: ['axillary-artery-1', 'superior-thoracic'],
    },
    {
      id: 'second-part',
      title: 'Second part: two branches',
      body: 'Behind pectoralis minor, the second part gives the thoracoacromial artery, which pierces the clavipectoral fascia and splits into pectoral, deltoid, acromial and clavicular branches, and the lateral thoracic artery, which follows the lower border of pectoralis minor and helps supply the breast. The cords of the brachial plexus are named by their position around this part.',
      focus: ['axillary-artery-2', 'thoracoacromial-artery', 'lateral-thoracic-artery'],
    },
    {
      id: 'third-part',
      title: 'Third part: three branches',
      body: 'Below pectoralis minor, the third part gives the subscapular artery, its largest branch, which divides into the circumflex scapular and thoracodorsal arteries, and the anterior and posterior circumflex humeral arteries, which encircle the surgical neck of the humerus.',
      focus: [
        'axillary-artery-3',
        'subscapular-artery',
        'circumflex-scapular-artery',
        'thoracodorsal-artery',
        'anterior-circumflex-humeral-artery',
        'posterior-circumflex-humeral-artery',
      ],
    },
    {
      id: 'anastomosis',
      title: 'The scapular anastomosis',
      body: 'Around the scapula, the suprascapular and dorsal scapular arteries (from the subclavian) join the circumflex scapular artery. If the axillary artery is blocked or tied above the origin of the subscapular artery, blood still reaches the arm through this loop, flowing backwards into the third part. Below that origin the loop cannot help.',
      focus: ['subscapular-artery', 'circumflex-scapular-artery'],
    },
    {
      id: 'vein',
      title: 'The axillary vein',
      body: 'The basilic vein joins the brachial veins at the lower border of teres major to form the axillary vein. It runs up on the medial side of the artery, receives the cephalic vein after that vein pierces the clavipectoral fascia, and becomes the subclavian vein at the outer border of the first rib.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select any branch to trace it back to its part of the artery. Then turn on the fracture to see which artery is at risk.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'axillary-parts',
      prompt: 'Which muscle divides the axillary artery into three parts?',
      options: [
        { id: 'pec-minor', text: 'Pectoralis minor' },
        { id: 'pec-major', text: 'Pectoralis major' },
        { id: 'subscapularis', text: 'Subscapularis' },
        { id: 'teres-major', text: 'Teres major' },
      ],
      answerId: 'pec-minor',
      explanation:
        'Pectoralis minor crosses in front of the artery: the first part lies above it, the second behind it, the third below it. Teres major marks where the artery ends.',
    },
    {
      id: 'third-part-branch',
      prompt: 'Which artery is a branch of the third part of the axillary artery?',
      options: [
        { id: 'subscapular', text: 'Subscapular artery' },
        { id: 'thoracoacromial', text: 'Thoracoacromial artery' },
        { id: 'lateral-thoracic', text: 'Lateral thoracic artery' },
        { id: 'superior-thoracic', text: 'Superior thoracic artery' },
      ],
      answerId: 'subscapular',
      explanation:
        'The third part gives the subscapular and the two circumflex humeral arteries. Thoracoacromial and lateral thoracic come from the second part, superior thoracic from the first.',
    },
    {
      id: 'surgical-neck-artery',
      prompt:
        'A fracture of the surgical neck of the humerus may injure the axillary nerve and which artery?',
      options: [
        { id: 'posterior-circumflex', text: 'Posterior circumflex humeral artery' },
        { id: 'thoracodorsal', text: 'Thoracodorsal artery' },
        { id: 'lateral-thoracic', text: 'Lateral thoracic artery' },
        { id: 'superior-thoracic', text: 'Superior thoracic artery' },
      ],
      answerId: 'posterior-circumflex',
      explanation:
        'The posterior circumflex humeral artery and the axillary nerve pass together through the quadrangular space and around the surgical neck.',
    },
    {
      id: 'axillary-ligation',
      prompt: 'Where can the axillary artery be tied with the arm still getting blood?',
      options: [
        { id: 'above', text: 'Above the origin of the subscapular artery' },
        { id: 'below', text: 'Below the origin of the subscapular artery' },
        { id: 'nowhere', text: 'Nowhere: the arm always loses its supply' },
      ],
      answerId: 'above',
      explanation:
        'Above the subscapular origin, the scapular anastomosis carries blood from subclavian branches back into the subscapular artery and on into the third part.',
    },
  ],
  cards: [
    {
      id: 'axillary-extent',
      front: 'Where does the axillary artery begin and end?',
      back: 'Outer border of the first rib to the lower border of teres major, where it becomes the brachial artery.',
    },
    {
      id: 'axillary-branches',
      front: 'Branches of the axillary artery, part by part?',
      back: 'First: superior thoracic. Second: thoracoacromial, lateral thoracic. Third: subscapular, anterior and posterior circumflex humeral.',
    },
    {
      id: 'thoracoacromial-branches',
      front: 'Four branches of the thoracoacromial artery?',
      back: 'Pectoral, deltoid, acromial and clavicular.',
    },
    {
      id: 'scapular-anastomosis',
      front: 'Arteries of the scapular anastomosis?',
      back: 'Suprascapular and dorsal scapular (from the subclavian) with the circumflex scapular (from the subscapular).',
    },
    {
      id: 'axillary-vein-formation',
      front: 'How is the axillary vein formed?',
      back: 'Basilic vein plus the brachial veins, at the lower border of teres major.',
    },
  ],
  // Chapter-level until a reviewer adds the pages for this section.
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 4 Axilla' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb', pages: '722–726' },
  ],
};
