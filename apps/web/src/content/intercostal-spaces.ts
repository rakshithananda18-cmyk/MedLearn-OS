import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CAGE_BONES,
  FRONT_OF_CAGE,
  THORAX_MODEL_CREDIT,
  THORAX_MODEL_SRC,
  thoraxParts,
} from './thorax-3d';

// Thorax batch 1. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const intercostalSpaces: Topic = {
  slug: 'intercostal-spaces',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Intercostal spaces: muscles, nerves and vessels',
  summary:
    'The three muscle layers between the ribs, the vein, artery and nerve in the costal groove, and where each comes from.',
  estimatedMinutes: 16,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 14 Walls of Thorax, pages 240 to 248'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: intercostal spaces, pages 151 to 159',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Cage, intercostal muscles and vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
    {
      title: 'Z-Anatomy',
      detail: 'Intercostal nerves in the 3D view',
      url: 'https://www.z-anatomy.com/',
      licence: 'CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Three layers: external (down and forwards), internal (down and backwards), innermost; all supplied by the intercostal nerve of the space.',
    'In the costal groove, from above down: vein, artery, nerve (VAN), between the internal and innermost intercostals.',
    'Posterior intercostal arteries: spaces 1–2 from the superior intercostal artery, 3–11 from the descending aorta.',
    'Anterior intercostal arteries: two per space, from the internal thoracic (spaces 1–6) and musculophrenic (7–9).',
    'Typical intercostal nerves are T3–T6; T7–T11 go on to the abdominal wall.',
  ],
  visual: {
    kind: 'path',
    // The muscle layers, the bundle in the groove, where the arteries come from and the nerve's branches.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        {
          id: 'layers',
          label: 'Three\nlayers',
          name: 'Three layers of intercostal muscle',
          x: 50,
          y: 30,
        },
        {
          id: 'external-intercostal',
          label: 'External',
          name: 'External intercostal: lower border of the rib above to the rib below, down and forwards',
          x: 145,
          y: 30,
        },
        {
          id: 'internal-intercostal',
          label: 'Internal',
          name: 'Internal intercostal: floor of the costal groove to the rib below, down and backwards',
          x: 225,
          y: 30,
        },
        {
          id: 'innermost-intercostal',
          label: 'Innermost',
          name: 'Innermost intercostal (intercostalis intimi), middle of each space',
          x: 305,
          y: 30,
        },
        {
          id: 'transversus-thoracis',
          label: 'Transversus\nthoracis',
          name: 'Transversus thoracis group: sternocostalis, intercostalis intimi, subcostalis',
          x: 305,
          y: 96,
        },
        {
          id: 'costal-groove',
          label: 'Costal\ngroove',
          name: 'Costal groove of the rib above',
          x: 50,
          y: 176,
        },
        {
          id: 'vein',
          label: 'Vein\n(above)',
          name: 'Posterior intercostal vein, highest',
          x: 145,
          y: 176,
        },
        {
          id: 'artery',
          label: 'Artery',
          name: 'Posterior intercostal artery, in the middle',
          x: 225,
          y: 176,
        },
        { id: 'nerve', label: 'Nerve\n(below)', name: 'Intercostal nerve, lowest', x: 305, y: 176 },
        {
          id: 'posterior-intercostal-arteries',
          label: 'Posterior\narteries',
          name: 'Posterior intercostal arteries',
          x: 50,
          y: 262,
        },
        {
          id: 'superior-intercostal',
          label: 'Superior\nintercostal',
          name: 'Superior intercostal artery (costocervical trunk): spaces 1 and 2',
          x: 145,
          y: 262,
        },
        {
          id: 'descending-aorta',
          label: 'Aorta',
          name: 'Descending thoracic aorta: spaces 3 to 11',
          x: 225,
          y: 262,
        },
        {
          id: 'subcostal-arteries',
          label: 'Subcostal',
          name: 'Subcostal artery, below the twelfth rib',
          x: 305,
          y: 262,
        },
        {
          id: 'intercostal-nerves',
          label: 'Intercostal\nnerves',
          name: 'Intercostal nerves, ventral rami of T1 to T11',
          x: 50,
          y: 346,
        },
        {
          id: 'collateral-branch',
          label: 'Collateral',
          name: 'Collateral branch, along the upper border of the rib below',
          x: 145,
          y: 346,
        },
        {
          id: 'lateral-cutaneous',
          label: 'Lateral\ncutaneous',
          name: 'Lateral cutaneous branch, at the midaxillary line',
          x: 225,
          y: 346,
        },
        {
          id: 'anterior-cutaneous',
          label: 'Anterior\ncutaneous',
          name: 'Anterior cutaneous branch, beside the sternum',
          x: 305,
          y: 346,
        },
      ],
      edges: [
        { from: 'layers', to: 'external-intercostal' },
        { from: 'layers', to: 'internal-intercostal' },
        { from: 'layers', to: 'innermost-intercostal' },
        { from: 'innermost-intercostal', to: 'transversus-thoracis' },
        { from: 'costal-groove', to: 'vein' },
        { from: 'costal-groove', to: 'artery' },
        { from: 'costal-groove', to: 'nerve' },
        { from: 'posterior-intercostal-arteries', to: 'superior-intercostal' },
        { from: 'posterior-intercostal-arteries', to: 'descending-aorta' },
        { from: 'posterior-intercostal-arteries', to: 'subcostal-arteries' },
        { from: 'intercostal-nerves', to: 'collateral-branch' },
        { from: 'intercostal-nerves', to: 'lateral-cutaneous' },
        { from: 'intercostal-nerves', to: 'anterior-cutaneous' },
      ],
    },
    lesions: [
      {
        id: 'coarctation',
        label: 'Coarctation',
        nodeIds: ['posterior-intercostal-arteries', 'descending-aorta'],
        explanation:
          'When the aorta is narrowed beyond the left subclavian, blood reaches the lower body through the internal thoracic and anterior intercostal arteries into the posterior intercostals, running backwards into the aorta. The posterior intercostal arteries enlarge and wind, and erode notches on the lower borders of the ribs, seen on X-ray.',
      },
      {
        id: 'herpes-zoster',
        label: 'Shingles',
        nodeIds: ['intercostal-nerves', 'lateral-cutaneous', 'anterior-cutaneous'],
        explanation:
          'Herpes zoster in a thoracic dorsal root ganglion gives a painful band of blisters around half the chest, along the skin of one intercostal nerve. Irritation of these nerves causes pain referred round to the front of the chest or abdomen, girdle pain.',
      },
      {
        id: 'chest-needle',
        label: 'Needle in a space',
        nodeIds: ['costal-groove', 'vein', 'artery', 'nerve'],
        explanation:
          'Fluid or air is drained through a space with the needle passed just above the upper border of the rib below, away from the vein, artery and nerve sheltered under the rib above.',
      },
    ],
    drill: [
      {
        id: 'layers',
        title: 'Muscle layers',
        hint: 'Outside to inside, and the group the deepest layer belongs to.',
        nodeIds: [
          'external-intercostal',
          'internal-intercostal',
          'innermost-intercostal',
          'transversus-thoracis',
        ],
      },
      {
        id: 'groove',
        title: 'In the costal groove',
        hint: 'From above down.',
        nodeIds: ['vein', 'artery', 'nerve'],
      },
      {
        id: 'supply',
        title: 'Arteries and nerve branches',
        hint: 'Where the posterior arteries arise, and the three branches the nerve gives on its way round.',
        nodeIds: [
          'superior-intercostal',
          'descending-aorta',
          'subcostal-arteries',
          'collateral-branch',
          'lateral-cutaneous',
          'anterior-cutaneous',
        ],
      },
    ],
    model3d: {
      src: THORAX_MODEL_SRC,
      credit: THORAX_MODEL_CREDIT,
      parts: thoraxParts([
        ...CAGE_BONES,
        'external-intercostal',
        'internal-intercostal',
        'innermost-intercostal',
        'transversus-thoracis',
        'descending-aorta',
        'posterior-intercostal-arteries',
        'subcostal-arteries',
        'internal-thoracic-artery',
        'anterior-intercostal-veins',
        'intercostal-nerves',
      ]),
      traces: [],
      stops: [
        {
          id: 'side',
          title: 'The side wall',
          description:
            'The external intercostals fill each space from the tubercle round to the costochondral junction, their fibres running down and forwards.',
          target: [-120, -110, 1190],
          position: [-1101, -290, 1255],
        },
        FRONT_OF_CAGE,
        {
          id: 'back',
          title: 'From behind',
          description:
            'The posterior intercostal arteries leave the back of the aorta, those on the right crossing in front of the vertebrae, and run out along the lower border of each rib.',
          target: [0, -60, 1190],
          position: [-263, 903, 1248],
        },
        {
          id: 'lower-spaces',
          title: 'Lower spaces',
          description:
            'The lower intercostal nerves and vessels leave the spaces at the costal margin and carry on into the abdominal wall.',
          target: [-60, -120, 1060],
          position: [-773, -662, 974],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'spaces',
      title: 'Spaces between ribs',
      body: 'There are eleven spaces behind and nine in front, where only ten ribs reach. Each holds three layers of muscle, two sets of intercostal vessels and an intercostal nerve.',
      focus: [],
    },
    {
      id: 'external',
      title: 'External intercostal',
      body: 'From the lower border of the rib above to the outer lip of the rib below, running down, forwards and medially. It reaches from the tubercle to the costochondral junction; between the cartilages it becomes the external intercostal membrane.',
      focus: ['layers', 'external-intercostal'],
    },
    {
      id: 'internal',
      title: 'Internal intercostal',
      body: 'From the floor of the costal groove to the inner lip of the rib below, at right angles to the external, running down and backwards. It reaches from the sternum to the angle, then becomes the internal intercostal membrane.',
      focus: ['internal-intercostal'],
    },
    {
      id: 'innermost',
      title: 'The deepest layer',
      body: 'Three incomplete sheets: the intercostalis intimi in the middle two-fourths of each space, the subcostalis behind in the lower spaces, and the sternocostalis from the back of the lower sternum to cartilages 2 to 6. Together they are the transversus thoracis group. All the intercostal muscles mainly keep the spaces from sucking in and bulging out with breathing.',
      focus: ['innermost-intercostal', 'transversus-thoracis'],
    },
    {
      id: 'groove',
      title: 'The bundle in the groove',
      body: 'The posterior intercostal vein, artery and nerve run forwards under the rib above, in that order from above down. Behind, they lie between the pleura and the internal intercostal membrane; across most of the space, between the internal and innermost intercostals.',
      focus: ['costal-groove', 'vein', 'artery', 'nerve'],
    },
    {
      id: 'posterior-arteries',
      title: 'Posterior intercostal arteries',
      body: 'One in each space. The first two come from the superior intercostal artery of the costocervical trunk; the third to eleventh from the descending aorta, the right ones longer because the aorta lies to the left. Each gives a dorsal branch to the back, a collateral branch along the rib below, and ends near the costochondral junction by joining an anterior intercostal artery. The subcostal artery runs below the twelfth rib.',
      focus: [
        'posterior-intercostal-arteries',
        'superior-intercostal',
        'descending-aorta',
        'subcostal-arteries',
      ],
    },
    {
      id: 'anterior',
      title: 'Anterior intercostal vessels',
      body: 'Two small arteries in each of the upper nine spaces, one above and one below: from the internal thoracic artery in spaces 1 to 6 and the musculophrenic in 7 to 9. Their veins drain to the internal thoracic and musculophrenic veins. The posterior veins drain to the azygos system behind.',
      focus: ['artery'],
    },
    {
      id: 'nerve',
      title: 'Intercostal nerves',
      body: 'The ventral rami of T1 to T11; T12 is the subcostal nerve. Each gives a collateral branch near the angle, a lateral cutaneous branch at the midaxillary line, and ends as an anterior cutaneous branch beside the sternum. It joins its sympathetic ganglion by white and grey rami. Nerves 3 to 6 stay in the chest wall; 7 to 11 go on to the abdominal wall; the lateral branch of the second is the intercostobrachial nerve to the arm.',
      focus: ['intercostal-nerves', 'collateral-branch', 'lateral-cutaneous', 'anterior-cutaneous'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a layer or a vessel to light it in the model. Then turn on coarctation to see how the arteries become a bypass.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'van-order',
      prompt: 'From above down, the structures in the costal groove are:',
      options: [
        { id: 'van', text: 'Vein, artery, nerve' },
        { id: 'avn', text: 'Artery, vein, nerve' },
        { id: 'vna', text: 'Vein, nerve, artery' },
        { id: 'nav', text: 'Nerve, artery, vein' },
      ],
      answerId: 'van',
      explanation:
        'The posterior intercostal vein is highest, then the artery, then the nerve: VAN.',
    },
    {
      id: 'transversus-parts',
      prompt: 'Which is not part of the transversus thoracis group?',
      options: [
        { id: 'serratus-posterior', text: 'Serratus posterior superior' },
        { id: 'subcostalis', text: 'Subcostalis' },
        { id: 'intimi', text: 'Intercostalis intimi' },
        { id: 'sternocostalis', text: 'Sternocostalis' },
      ],
      answerId: 'serratus-posterior',
      explanation:
        'The deepest layer is the subcostalis, intercostalis intimi and sternocostalis. Serratus posterior superior is a back muscle.',
    },
    {
      id: 'coarctation-arteries',
      prompt: 'In coarctation of the aorta, the arteries that enlarge and notch the ribs are:',
      options: [
        { id: 'posterior', text: 'Posterior intercostal arteries' },
        { id: 'anterior', text: 'Anterior intercostal arteries' },
        { id: 'subclavian', text: 'Subclavian arteries' },
        { id: 'bronchial', text: 'Bronchial arteries' },
      ],
      answerId: 'posterior',
      explanation:
        'They carry blood backwards from the anterior intercostals into the aorta beyond the narrowing, and erode the lower borders of the ribs.',
    },
    {
      id: 'first-posterior-intercostal',
      prompt: 'The first and second posterior intercostal arteries arise from:',
      options: [
        { id: 'superior-intercostal', text: 'The superior intercostal artery' },
        { id: 'aorta', text: 'The descending thoracic aorta' },
        { id: 'internal-thoracic', text: 'The internal thoracic artery' },
        { id: 'thyrocervical', text: 'The thyrocervical trunk' },
      ],
      answerId: 'superior-intercostal',
      explanation:
        'The superior intercostal artery comes from the costocervical trunk of the subclavian. Spaces 3 to 11 are supplied from the aorta.',
    },
  ],
  cards: [
    {
      id: 'intercostal-fibres',
      front: 'Direction of fibres of the external and internal intercostals?',
      back: 'External: down, forwards and medially. Internal: down, backwards and laterally, at right angles to it.',
    },
    {
      id: 'neurovascular-plane',
      front: 'Between which muscles does the intercostal bundle run?',
      back: 'Between the internal intercostal and the intercostalis intimi (innermost).',
    },
    {
      id: 'typical-intercostal-nerves',
      front: 'Which intercostal nerves are typical?',
      back: 'Third to sixth: they supply only the chest wall.',
    },
    {
      id: 'anterior-intercostal-arteries',
      front: 'Source of the anterior intercostal arteries?',
      back: 'Internal thoracic in spaces 1–6, musculophrenic in spaces 7–9; two in each space.',
    },
    {
      id: 'intercostal-spaces-count',
      front: 'How many intercostal spaces in front and behind?',
      back: 'Nine in front, eleven behind.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 14 Walls of Thorax', pages: '240–248' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '151–159' },
  ],
};
