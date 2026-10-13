import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { CAGE_BONES, THORAX_MODEL_CREDIT, THORAX_MODEL_SRC, thoraxParts } from './thorax-3d';

// Thorax batch 1. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const internalThoracicAzygos: Topic = {
  slug: 'internal-thoracic-azygos',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Internal thoracic artery, azygos veins and sympathetic trunk',
  summary:
    'The artery down the front wall, the veins draining the back wall, and the sympathetic chain over the rib heads.',
  estimatedMinutes: 16,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 14 Walls of Thorax, pages 248 to 253'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax: internal thoracic vessels, azygos system and sympathetic trunks, pages 152 to 158 and 231 to 235',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Cage, arteries and veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
    {
      title: 'Z-Anatomy',
      detail: 'Sympathetic trunks and intercostal nerves in the 3D view',
      url: 'https://www.z-anatomy.com/',
      licence: 'CC BY-SA 4.0',
    },
  ],
  keyFacts: [
    'Internal thoracic artery: from the first part of the subclavian, about 2 cm from the sternal edge, ends in the sixth space as superior epigastric and musculophrenic.',
    'Azygos vein: enters by the aortic opening, rises on the right to T4, arches over the right lung root into the superior vena cava.',
    'Left posterior intercostal veins: 5–8 to the accessory hemiazygos, 9–11 to the hemiazygos; both cross to the azygos at T8.',
    'Sympathetic trunk lies over the rib heads; each ganglion has a white and a grey ramus to its nerve.',
    'Splanchnic nerves: greater T5–T9, lesser T10–T11, least T12; preganglionic, to the coeliac and renal ganglia.',
  ],
  visual: {
    kind: 'path',
    // The artery's branches, the azygos system and its drainage, and the splanchnic nerves.
    diagram: {
      width: 360,
      height: 380,
      nodes: [
        {
          id: 'internal-thoracic-artery',
          label: 'Internal\nthoracic',
          name: 'Internal thoracic artery',
          x: 50,
          y: 30,
        },
        {
          id: 'anterior-intercostal',
          label: 'Anterior\nintercostal',
          name: 'Anterior intercostal arteries, spaces 1 to 6',
          x: 145,
          y: 30,
        },
        {
          id: 'perforating',
          label: 'Perfor-\nating',
          name: 'Perforating branches, large in spaces 2 to 4 in women, to the breast',
          x: 225,
          y: 30,
        },
        {
          id: 'pericardiacophrenic',
          label: 'Peri-\ncardiaco-\nphrenic',
          name: 'Pericardiacophrenic artery, with the phrenic nerve',
          x: 305,
          y: 40,
        },
        {
          id: 'superior-epigastric',
          label: 'Superior\nepigastric',
          name: 'Superior epigastric artery, into the rectus sheath',
          x: 145,
          y: 110,
        },
        {
          id: 'musculophrenic',
          label: 'Musculo-\nphrenic',
          name: 'Musculophrenic artery, along the costal margin, spaces 7 to 9',
          x: 225,
          y: 110,
        },
        { id: 'azygos-vein', label: 'Azygos', name: 'Azygos vein', x: 50, y: 196 },
        {
          id: 'right-spaces',
          label: 'Right\nspaces',
          name: 'Right posterior intercostal veins 2 to 11',
          x: 145,
          y: 196,
        },
        {
          id: 'hemiazygos-vein',
          label: 'Hemi-\nazygos',
          name: 'Hemiazygos vein, crossing at T8',
          x: 225,
          y: 196,
        },
        {
          id: 'accessory-hemiazygos-vein',
          label: 'Accessory\nhemiazygos',
          name: 'Accessory hemiazygos vein, crossing at T8',
          x: 305,
          y: 196,
        },
        {
          id: 'superior-vena-cava',
          label: 'Superior\nvena cava',
          name: 'Superior vena cava, which the azygos joins',
          x: 50,
          y: 262,
        },
        {
          id: 'left-lower-spaces',
          label: 'Left\n9–11',
          name: 'Left posterior intercostal veins 9 to 11',
          x: 225,
          y: 262,
        },
        {
          id: 'left-middle-spaces',
          label: 'Left\n5–8',
          name: 'Left posterior intercostal veins 5 to 8',
          x: 305,
          y: 262,
        },
        {
          id: 'sympathetic-trunks',
          label: 'Sympa-\nthetic trunk',
          name: 'Thoracic sympathetic trunk',
          x: 50,
          y: 346,
        },
        {
          id: 'greater-splanchnic',
          label: 'Greater\nsplanchnic',
          name: 'Greater splanchnic nerve, from ganglia 5 to 9',
          x: 145,
          y: 346,
        },
        {
          id: 'lesser-splanchnic',
          label: 'Lesser\nsplanchnic',
          name: 'Lesser splanchnic nerve, from ganglia 10 and 11',
          x: 225,
          y: 346,
        },
        {
          id: 'least-splanchnic',
          label: 'Least\nsplanchnic',
          name: 'Least splanchnic nerve, from ganglion 12',
          x: 305,
          y: 346,
        },
      ],
      edges: [
        { from: 'internal-thoracic-artery', to: 'anterior-intercostal' },
        { from: 'internal-thoracic-artery', to: 'perforating' },
        { from: 'internal-thoracic-artery', to: 'pericardiacophrenic' },
        { from: 'internal-thoracic-artery', to: 'superior-epigastric' },
        { from: 'internal-thoracic-artery', to: 'musculophrenic' },
        { from: 'azygos-vein', to: 'right-spaces' },
        { from: 'azygos-vein', to: 'hemiazygos-vein' },
        { from: 'azygos-vein', to: 'accessory-hemiazygos-vein' },
        { from: 'azygos-vein', to: 'superior-vena-cava' },
        { from: 'hemiazygos-vein', to: 'left-lower-spaces' },
        { from: 'accessory-hemiazygos-vein', to: 'left-middle-spaces' },
        { from: 'sympathetic-trunks', to: 'greater-splanchnic' },
        { from: 'sympathetic-trunks', to: 'lesser-splanchnic' },
        { from: 'sympathetic-trunks', to: 'least-splanchnic' },
      ],
    },
    lesions: [
      {
        id: 'bypass-graft',
        label: 'Bypass graft',
        nodeIds: ['internal-thoracic-artery'],
        explanation:
          'For coronary bypass, the internal thoracic artery is freed from the chest wall and its cut lower end joined to the coronary artery beyond the narrowing. It stays open longer than vein grafts.',
      },
      {
        id: 'svc-obstruction',
        label: 'Superior vena cava blocked',
        nodeIds: ['superior-vena-cava', 'azygos-vein'],
        explanation:
          'Blocked above the azygos, blood from the upper body flows down the intercostal veins into the azygos and on into the cava below the block. Blocked below the azygos, it has to reach the inferior vena cava through veins of the body wall, which swell over the chest and abdomen.',
      },
      {
        id: 'cardiac-pain',
        label: 'Heart pain',
        nodeIds: ['sympathetic-trunks'],
        explanation:
          'Pain fibres from the heart travel with the sympathetic cardiac nerves to spinal segments T1 to T5, mostly on the left. These segments also take in skin of the chest wall and the inner arm, so angina is felt there, and sometimes in the jaw, epigastrium or back.',
      },
    ],
    drill: [
      {
        id: 'artery',
        title: 'Internal thoracic artery',
        hint: 'Branches along the way, then the two it ends in.',
        nodeIds: [
          'anterior-intercostal',
          'perforating',
          'pericardiacophrenic',
          'superior-epigastric',
          'musculophrenic',
        ],
      },
      {
        id: 'azygos',
        title: 'Azygos system',
        hint: 'What drains into the azygos, which spaces each left vein takes, and where the azygos ends.',
        nodeIds: [
          'right-spaces',
          'hemiazygos-vein',
          'accessory-hemiazygos-vein',
          'left-lower-spaces',
          'left-middle-spaces',
          'superior-vena-cava',
        ],
      },
      {
        id: 'splanchnics',
        title: 'Splanchnic nerves',
        hint: 'Three nerves from the lower ganglia, largest first.',
        nodeIds: ['greater-splanchnic', 'lesser-splanchnic', 'least-splanchnic'],
      },
    ],
    model3d: {
      src: THORAX_MODEL_SRC,
      credit: THORAX_MODEL_CREDIT,
      parts: thoraxParts([
        ...CAGE_BONES,
        'ascending-aorta',
        'arch-of-aorta',
        'descending-aorta',
        'internal-thoracic-artery',
        'internal-thoracic-vein',
        'superior-vena-cava',
        'brachiocephalic-veins',
        'azygos-vein',
        'hemiazygos-vein',
        'accessory-hemiazygos-vein',
        'subcostal-veins',
        'sympathetic-trunks',
        'intercostal-nerves',
      ]),
      traces: [],
      stops: [
        {
          id: 'internal-thoracic',
          title: 'Internal thoracic artery',
          description:
            'Running down behind the costal cartilages about 2 cm from the edge of the sternum, with its vein beside it, to divide in the sixth space.',
          target: [0, -165, 1260],
          position: [-279, -966, 1316],
        },
        {
          id: 'azygos',
          title: 'Azygos vein',
          description:
            'From the right: the azygos climbs beside the vertebral bodies, then arches forwards over the root of the right lung at T4 into the superior vena cava.',
          target: [-12, -90, 1210],
          position: [-767, -351, 1260],
        },
        {
          id: 'left-side',
          title: 'Hemiazygos veins',
          description:
            'From the left: the hemiazygos below and the accessory hemiazygos above run beside the aorta, and both cross behind it at T8 to reach the azygos.',
          target: [8, -75, 1190],
          position: [766, -329, 1227],
        },
        {
          id: 'trunk',
          title: 'Sympathetic trunk',
          description:
            'A beaded chain over the heads of the ribs on each side, each ganglion joined to its intercostal nerve.',
          target: [0, -65, 1220],
          position: [-499, -688, 1272],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'origin',
      title: 'Internal thoracic artery',
      body: 'It arises from the underside of the first part of the subclavian artery, about 2 cm above the sternal end of the clavicle, and passes down behind the clavicle and first cartilage. Then it runs straight down about 2 cm from the edge of the sternum, behind the cartilages and internal intercostals, in front of the pleura and, below the third cartilage, of the sternocostalis.',
      focus: ['internal-thoracic-artery'],
    },
    {
      id: 'branches',
      title: 'Its branches',
      body: 'Along the way: the pericardiacophrenic artery with the phrenic nerve, small mediastinal and thymic branches, two anterior intercostal arteries to each of the upper six spaces, and perforating branches beside the sternum, large in spaces 2 to 4 in women for the breast. Its two veins join and drain into the brachiocephalic vein.',
      focus: ['anterior-intercostal', 'perforating', 'pericardiacophrenic'],
    },
    {
      id: 'end',
      title: 'Where it ends',
      body: 'In the sixth space it divides. The superior epigastric artery enters the rectus sheath between the sternal and costal slips of the diaphragm. The musculophrenic runs along the costal margin, giving the anterior intercostals of spaces 7 to 9. Together they supply the front wall from the clavicle to the umbilicus.',
      focus: ['superior-epigastric', 'musculophrenic'],
    },
    {
      id: 'azygos',
      title: 'Azygos vein',
      body: 'An unpaired vein formed below by the right subcostal and ascending lumbar veins. It enters through the aortic opening, climbs on the right of the vertebral bodies to T4, arches forwards over the root of the right lung and joins the back of the superior vena cava. It links the two venae cavae.',
      focus: ['azygos-vein', 'superior-vena-cava'],
    },
    {
      id: 'right',
      title: 'Right side drainage',
      body: 'On the right, the first posterior intercostal vein joins the brachiocephalic vein; veins 2 to 4 form the right superior intercostal vein into the azygos; veins 5 to 11 open into the azygos directly.',
      focus: ['right-spaces'],
    },
    {
      id: 'left',
      title: 'Left side drainage',
      body: 'On the left, the first vein joins the left brachiocephalic, and veins 2 to 4 form the left superior intercostal vein, also into the left brachiocephalic. Veins 5 to 8 drain into the accessory hemiazygos and 9 to 11 into the hemiazygos; both cross behind the aorta at T8 to join the azygos.',
      focus: [
        'hemiazygos-vein',
        'accessory-hemiazygos-vein',
        'left-lower-spaces',
        'left-middle-spaces',
      ],
    },
    {
      id: 'trunk',
      title: 'Sympathetic trunk',
      body: 'A chain of ganglia on each side, crossing the neck of the first rib, the heads of ribs 2 to 10 and the bodies of T11 and T12, then passing behind the medial arcuate ligament into the abdomen. The first ganglion often fuses with the inferior cervical to form the stellate ganglion. Each ganglion joins its nerve by a white ramus (outflow from the cord, T1 to L2) and a grey ramus back to the nerve.',
      focus: ['sympathetic-trunks'],
    },
    {
      id: 'splanchnics',
      title: 'Splanchnic nerves',
      body: 'The upper five ganglia send postganglionic fibres to the heart, lungs, aorta and oesophagus. The lower seven send preganglionic fibres to the abdomen as splanchnic nerves: greater from ganglia 5 to 9 and lesser from 10 and 11, both to the coeliac ganglion; least from 12 to the renal plexus. They pierce the crura of the diaphragm.',
      focus: ['greater-splanchnic', 'lesser-splanchnic', 'least-splanchnic'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select a vessel to light its path in the model. Then turn on a blocked superior vena cava to see where blood goes.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'internal-thoracic-not-branch',
      prompt: 'Which is not a branch of the internal thoracic artery?',
      options: [
        { id: 'posterior-intercostal', text: 'Posterior intercostal artery' },
        { id: 'superior-epigastric', text: 'Superior epigastric artery' },
        { id: 'musculophrenic', text: 'Musculophrenic artery' },
        { id: 'anterior-intercostal', text: 'Anterior intercostal artery' },
      ],
      answerId: 'posterior-intercostal',
      explanation:
        'Posterior intercostals come from the superior intercostal artery and the aorta. The internal thoracic gives the anterior intercostals and ends as the superior epigastric and musculophrenic.',
    },
    {
      id: 'accessory-hemiazygos-spaces',
      prompt: 'Which left posterior intercostal veins drain into the accessory hemiazygos vein?',
      options: [
        { id: 'five-to-eight', text: '5th to 8th' },
        { id: 'two-to-four', text: '2nd to 4th' },
        { id: 'nine-to-eleven', text: '9th to 11th' },
        { id: 'first', text: '1st only' },
      ],
      answerId: 'five-to-eight',
      explanation:
        'Veins 9 to 11 go to the hemiazygos; 2 to 4 form the left superior intercostal vein to the left brachiocephalic.',
    },
    {
      id: 'azygos-ends',
      prompt: 'The azygos vein ends by joining:',
      options: [
        { id: 'svc', text: 'The superior vena cava' },
        { id: 'right-brachiocephalic', text: 'The right brachiocephalic vein' },
        { id: 'ivc', text: 'The inferior vena cava' },
        { id: 'right-atrium', text: 'The right atrium directly' },
      ],
      answerId: 'svc',
      explanation:
        'It arches over the root of the right lung at T4 and joins the back of the superior vena cava before it enters the pericardium.',
    },
    {
      id: 'greater-splanchnic-roots',
      prompt: 'The greater splanchnic nerve arises from thoracic sympathetic ganglia:',
      options: [
        { id: 'five-to-nine', text: '5 to 9' },
        { id: 'one-to-five', text: '1 to 5' },
        { id: 'ten-eleven', text: '10 and 11' },
        { id: 'twelve', text: '12' },
      ],
      answerId: 'five-to-nine',
      explanation:
        'Greater from 5 to 9, lesser from 10 and 11, least from 12. Ganglia 1 to 5 send postganglionic branches to the thoracic organs.',
    },
  ],
  cards: [
    {
      id: 'internal-thoracic-termination',
      front: 'Where and how does the internal thoracic artery end?',
      back: 'In the sixth intercostal space, dividing into the superior epigastric and musculophrenic arteries.',
    },
    {
      id: 'azygos-course',
      front: 'Course of the azygos vein?',
      back: 'Through the aortic opening, up the right of the vertebral bodies to T4, over the right lung root into the superior vena cava.',
    },
    {
      id: 'left-intercostal-veins',
      front: 'Drainage of the left posterior intercostal veins?',
      back: '1st: left brachiocephalic. 2–4: left superior intercostal vein to the left brachiocephalic. 5–8: accessory hemiazygos. 9–11: hemiazygos.',
    },
    {
      id: 'splanchnic-nerves',
      front: 'Roots of the three thoracic splanchnic nerves?',
      back: 'Greater T5–T9, lesser T10–T11, least T12.',
    },
    {
      id: 'cardiac-referred-pain',
      front: 'Why is heart pain felt in the left arm?',
      back: 'Cardiac pain fibres enter cord segments T1–T5, which also receive the skin of the chest wall and the medial arm.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 14 Walls of Thorax', pages: '248–253' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '152–158, 231–235' },
  ],
};
