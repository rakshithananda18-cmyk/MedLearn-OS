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
export const thoracicJointsRespiration: Topic = {
  slug: 'thoracic-joints-respiration',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Joints of the thorax and breathing',
  summary:
    'Where the ribs meet the spine and the sternum, and how pump-handle, bucket-handle and piston movements enlarge the chest.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource(
      'bd-chaurasia',
      'Volume 1, Chapter 13 Bones and Joints of Thorax: joints and respiratory movements, pages 232 to 237',
    ),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, regional anatomy: joints, pages 149 to 151'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Cage, intercostal muscles and diaphragm in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'A typical rib head meets two vertebrae and the disc between, in two synovial cavities split by an intra-articular ligament.',
    'Costochondral and first chondrosternal joints are primary cartilaginous; chondrosternal 2–7 and interchondral joints are synovial.',
    'Pump handle (ribs 2–6, sternum forwards): front-to-back diameter.',
    'Bucket handle (ribs 7–10, shafts outwards): side-to-side diameter.',
    'Piston (diaphragm descends about 2 cm): vertical diameter, the largest share of quiet breathing.',
  ],
  visual: {
    kind: 'path',
    // The joints of the cage, then the three movements, what each enlarges and the muscles.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        { id: 'joints', label: 'Joints', name: 'Joints of the thorax', x: 50, y: 30 },
        {
          id: 'costovertebral',
          label: 'Costo-\nvertebral',
          name: 'Costovertebral joints: rib head with two vertebral bodies and the disc',
          x: 145,
          y: 30,
        },
        {
          id: 'costotransverse',
          label: 'Costo-\ntransverse',
          name: 'Costotransverse joints: rib tubercle with its transverse process',
          x: 225,
          y: 30,
        },
        {
          id: 'manubriosternal',
          label: 'Manubrio-\nsternal',
          name: 'Manubriosternal joint, secondary cartilaginous',
          x: 305,
          y: 30,
        },
        {
          id: 'costochondral',
          label: 'Costo-\nchondral',
          name: 'Costochondral joints, primary cartilaginous',
          x: 145,
          y: 102,
        },
        {
          id: 'chondrosternal',
          label: 'Chondro-\nsternal',
          name: 'Chondrosternal joints: the first cartilaginous, 2 to 7 synovial',
          x: 225,
          y: 102,
        },
        {
          id: 'interchondral',
          label: 'Inter-\nchondral',
          name: 'Interchondral joints between cartilages 5 to 9, synovial',
          x: 305,
          y: 102,
        },
        {
          id: 'inspiration',
          label: 'Breathing\nin',
          name: 'Movements of inspiration',
          x: 50,
          y: 188,
        },
        {
          id: 'pump-handle',
          label: 'Pump\nhandle',
          name: 'Pump-handle movement of ribs 2 to 6 and the sternum',
          x: 145,
          y: 188,
        },
        {
          id: 'bucket-handle',
          label: 'Bucket\nhandle',
          name: 'Bucket-handle movement of ribs 7 to 10',
          x: 225,
          y: 188,
        },
        { id: 'piston', label: 'Piston', name: 'Piston movement of the diaphragm', x: 305, y: 188 },
        {
          id: 'ap-diameter',
          label: 'Front to\nback',
          name: 'Anteroposterior diameter',
          x: 145,
          y: 260,
        },
        {
          id: 'transverse-diameter',
          label: 'Side to\nside',
          name: 'Transverse diameter',
          x: 225,
          y: 260,
        },
        {
          id: 'vertical-diameter',
          label: 'Top to\nbottom',
          name: 'Vertical diameter',
          x: 305,
          y: 260,
        },
        { id: 'muscles', label: 'Muscles', name: 'Muscles of breathing', x: 50, y: 346 },
        { id: 'diaphragm', label: 'Diaphragm', name: 'Diaphragm', x: 145, y: 346 },
        {
          id: 'external-intercostal',
          label: 'External\nintercostal',
          name: 'External intercostal muscles',
          x: 225,
          y: 346,
        },
        {
          id: 'accessory-muscles',
          label: 'Accessory',
          name: 'Accessory muscles: scalenes, sternocleidomastoid, pectorals, serratus anterior, erector spinae',
          x: 305,
          y: 346,
        },
      ],
      edges: [
        { from: 'joints', to: 'costovertebral' },
        { from: 'joints', to: 'costotransverse' },
        { from: 'joints', to: 'manubriosternal' },
        { from: 'joints', to: 'costochondral' },
        { from: 'joints', to: 'chondrosternal' },
        { from: 'joints', to: 'interchondral' },
        { from: 'inspiration', to: 'pump-handle' },
        { from: 'inspiration', to: 'bucket-handle' },
        { from: 'inspiration', to: 'piston' },
        { from: 'pump-handle', to: 'ap-diameter' },
        { from: 'bucket-handle', to: 'transverse-diameter' },
        { from: 'piston', to: 'vertical-diameter' },
        { from: 'muscles', to: 'diaphragm' },
        { from: 'muscles', to: 'external-intercostal' },
        { from: 'muscles', to: 'accessory-muscles' },
      ],
    },
    lesions: [
      {
        id: 'dyspnoea',
        label: 'Breathless patient',
        nodeIds: ['accessory-muscles', 'diaphragm'],
        explanation:
          'A breathless patient sits up, leans forwards and grips something. Sitting lets the diaphragm fall lowest, and fixing the arms fixes the scapulae so serratus anterior and pectoralis minor can pull on the ribs. Lying flat pushes the diaphragm highest and makes breathing hardest.',
      },
      {
        id: 'late-pregnancy',
        label: 'Late pregnancy',
        nodeIds: ['piston', 'vertical-diameter'],
        explanation:
          'The enlarged uterus stops the diaphragm descending, so breathing becomes mainly thoracic, by rib movements. Infants breathe the other way, mainly by the diaphragm: their round chest leaves little room for the ribs to widen it.',
      },
    ],
    drill: [
      {
        id: 'joints',
        title: 'Joints of the cage',
        hint: 'Behind, where ribs meet vertebrae; in front, where ribs, cartilages and sternum meet.',
        nodeIds: [
          'costovertebral',
          'costotransverse',
          'manubriosternal',
          'costochondral',
          'chondrosternal',
          'interchondral',
        ],
      },
      {
        id: 'movements',
        title: 'Movements and diameters',
        hint: 'Three movements, each matched to the diameter it enlarges most.',
        nodeIds: [
          'pump-handle',
          'bucket-handle',
          'piston',
          'ap-diameter',
          'transverse-diameter',
          'vertical-diameter',
        ],
      },
    ],
    model3d: {
      src: THORAX_MODEL_SRC,
      credit: THORAX_MODEL_CREDIT,
      parts: thoraxParts([
        ...CAGE_BONES,
        'thoracic-discs',
        'clavicles',
        'external-intercostal',
        'diaphragm',
      ]),
      traces: [],
      stops: [
        FRONT_OF_CAGE,
        {
          id: 'rib-joints',
          title: 'Where ribs meet the spine',
          description:
            'From behind: each head sits against two vertebral bodies and the disc between, and each tubercle against the transverse process. The rib swings about the line through the two.',
          target: [-40, -40, 1220],
          position: [-353, 638, 1285],
        },
        {
          id: 'pump-handle',
          title: 'Pump handle',
          description:
            'From the side: the front ends of ribs 2 to 6 lie lower than their back ends, so raising them pushes the sternum forwards and up and deepens the chest.',
          target: [0, -120, 1220],
          position: [-998, -166, 1251],
        },
        {
          id: 'bucket-handle',
          title: 'Bucket handle',
          description:
            'From the front: the middles of ribs 7 to 10 hang below their ends, so raising them swings the shafts outwards, widening the lower chest and the infrasternal angle.',
          target: [0, -110, 1110],
          position: [0, -1107, 1184],
        },
        {
          id: 'piston',
          title: 'Piston',
          description:
            'The domes of the diaphragm descend about 2 cm in quiet breathing, lengthening the chest from top to bottom.',
          target: [0, -116, 1090],
          position: [-668, -759, 883],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'joints',
      title: 'A cage that moves',
      body: 'The thoracic cage changes shape with every breath. Most of the movement happens where the ribs meet the vertebrae; a little happens at the sternal angle.',
      focus: ['joints'],
    },
    {
      id: 'back',
      title: 'Behind: two joints for each rib',
      body: 'The head of a typical rib meets the body of its own vertebra, the one above and the disc between: two plane synovial cavities, split by an intra-articular ligament from the crest of the head to the disc, held by a radiate ligament. The tubercle meets the transverse process of its own vertebra at a costotransverse joint, held by three costotransverse ligaments.',
      focus: ['costovertebral', 'costotransverse'],
    },
    {
      id: 'axes',
      title: 'Why upper and lower ribs differ',
      body: 'The facets on the tubercles of the upper six ribs are curved and let the neck rotate, so these ribs lift their front ends. Those of ribs 7 to 10 are flat and let the rib glide up and down, so these ribs swing their shafts outwards.',
      focus: ['costotransverse'],
    },
    {
      id: 'front',
      title: 'In front',
      body: 'Each rib joins its cartilage at a primary cartilaginous joint that does not move. The first cartilage joins the manubrium the same way, steadying the shoulder girdle; cartilages 2 to 7 meet the sternum at synovial joints, the second with two cavities. Cartilages 5 to 9 meet each other at synovial interchondral joints; the tenth is joined to the ninth by fibrous tissue. The manubriosternal joint is secondary cartilaginous.',
      focus: ['manubriosternal', 'costochondral', 'chondrosternal', 'interchondral'],
    },
    {
      id: 'pump',
      title: 'Pump handle',
      body: 'Each rib is a lever whose small movement near the spine becomes a large one at its front. The front ends of ribs 2 to 6 lie lower than their back ends, so lifting them pushes the sternum forwards and up, like a pump handle, and increases the front-to-back diameter.',
      focus: ['inspiration', 'pump-handle', 'ap-diameter'],
    },
    {
      id: 'bucket',
      title: 'Bucket handle',
      body: 'The middle of each lower rib hangs below the line joining its ends. Lifting ribs 7 to 10 swings the shafts outwards like the handle of a bucket, widening the chest from side to side and opening the infrasternal angle.',
      focus: ['bucket-handle', 'transverse-diameter'],
    },
    {
      id: 'piston',
      title: 'Piston',
      body: 'The diaphragm contracts and descends about 2 cm, lengthening the chest vertically while the abdominal wall relaxes. It is the chief muscle of quiet breathing. Breathing in women is mainly thoracoabdominal, and in men abdominothoracic.',
      focus: ['piston', 'vertical-diameter'],
    },
    {
      id: 'muscles',
      title: 'Muscles',
      body: 'Quiet inspiration uses the diaphragm and the external intercostals, with the interchondral parts of the internal intercostals. Deep inspiration adds the scalenes and sternocleidomastoid lifting the first rib, the pectorals, serratus anterior and erector spinae. Quiet expiration is passive elastic recoil; forced expiration uses the abdominal muscles.',
      focus: ['muscles', 'diaphragm', 'external-intercostal', 'accessory-muscles'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a movement to see which diameter it changes. Then turn on a breathless patient to see why sitting up helps.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'transverse-diameter',
      prompt: 'The transverse diameter of the thorax increases mainly by:',
      options: [
        { id: 'bucket', text: 'Bucket-handle movement of the ribs' },
        { id: 'pump', text: 'Pump-handle movement of the ribs' },
        { id: 'piston', text: 'Descent of the diaphragm' },
        { id: 'first-rib', text: 'Elevation of the first rib' },
      ],
      answerId: 'bucket',
      explanation:
        'Raising ribs 7 to 10 swings their shafts outwards. Pump-handle movement of ribs 2 to 6 mainly deepens the chest front to back; the diaphragm lengthens it.',
    },
    {
      id: 'primary-cartilaginous',
      prompt: 'Which of these is a primary cartilaginous joint?',
      options: [
        { id: 'first-chondrosternal', text: 'First chondrosternal joint' },
        { id: 'manubriosternal', text: 'Manubriosternal joint' },
        { id: 'costotransverse', text: 'Costotransverse joint' },
        { id: 'third-chondrosternal', text: 'Third chondrosternal joint' },
      ],
      answerId: 'first-chondrosternal',
      explanation:
        'The first cartilage joins the manubrium by cartilage alone, like every costochondral joint. The manubriosternal joint is secondary cartilaginous; the others are synovial.',
    },
    {
      id: 'tubercle-joint',
      prompt: 'The tubercle of a typical rib articulates with the transverse process of:',
      options: [
        { id: 'own', text: 'Its own vertebra' },
        { id: 'above', text: 'The vertebra above' },
        { id: 'below', text: 'The vertebra below' },
        { id: 'both', text: 'Its own vertebra and the one above' },
      ],
      answerId: 'own',
      explanation:
        'The head meets its own vertebra and the one above; the tubercle meets only its own vertebra’s transverse process.',
    },
    {
      id: 'dyspnoea-posture',
      prompt: 'A breathless patient is most comfortable sitting up because sitting:',
      options: [
        { id: 'diaphragm-lowest', text: 'Lets the diaphragm sit at its lowest' },
        { id: 'diaphragm-highest', text: 'Lifts the diaphragm to its highest' },
        { id: 'relaxes-scalenes', text: 'Relaxes the scalene muscles' },
        { id: 'fixes-spine', text: 'Fixes the thoracic spine' },
      ],
      answerId: 'diaphragm-lowest',
      explanation:
        'The diaphragm is lowest sitting and highest lying flat, so sitting needs least effort to breathe in.',
    },
  ],
  cards: [
    {
      id: 'pump-handle',
      front: 'Pump-handle movement: which ribs, which diameter?',
      back: 'Ribs 2–6 lifting the sternum forwards; anteroposterior diameter.',
    },
    {
      id: 'bucket-handle',
      front: 'Bucket-handle movement: which ribs, which diameter?',
      back: 'Ribs 7–10 swinging their shafts outwards; transverse diameter.',
    },
    {
      id: 'piston-movement',
      front: 'Piston movement?',
      back: 'Descent of the diaphragm by about 2 cm; vertical diameter.',
    },
    {
      id: 'costovertebral-joint',
      front: 'Joint between the head of a typical rib and the vertebrae?',
      back: 'Two plane synovial cavities, with its own vertebra and the one above, separated by the intra-articular ligament to the disc.',
    },
    {
      id: 'quiet-breathing-muscles',
      front: 'Muscles of quiet inspiration and expiration?',
      back: 'In: diaphragm, external intercostals (and interchondral internal intercostals). Out: none, elastic recoil.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 13 Bones and Joints of Thorax', pages: '232–237' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '149–151' },
  ],
};
