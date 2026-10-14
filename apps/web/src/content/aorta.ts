import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import { DUCTUS_PATHS } from './heart-3d';
import {
  DUCT_NERVE_CREDIT,
  HEART,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  RECURRENT_LARYNGEAL_PATHS,
  SPINE_FRAME,
} from './thoracic-organs-3d';

// Thorax batch 4. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const aorta: Topic = {
  slug: 'aorta',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Aorta in the thorax',
  summary:
    'The ascending aorta, the arch and its three branches, and the descending thoracic aorta: where each runs, what lies round it, and what goes wrong.',
  estimatedMinutes: 15,
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
      'Volume 1, Chapter 19 Superior Vena Cava, Aorta and Pulmonary Trunk, pages 311 to 318',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: arch of aorta and thoracic aorta, pages 220 to 222 and 230 to 231',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Aorta, its branches and the heart in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Ascending aorta: about 5 cm, inside the pericardium, from the left ventricle up to the second right costal cartilage; branches: the two coronary arteries.',
    'Arch: behind the lower half of the manubrium, from the second right sternochondral joint over the left lung root to the lower border of T4; begins and ends at the same level.',
    'Arch branches: brachiocephalic trunk, left common carotid, left subclavian.',
    'Under the arch: the bifurcation of the pulmonary trunk, the left bronchus, the ligamentum arteriosum and the left recurrent laryngeal nerve.',
    'Descending thoracic aorta: T4 to T12 in the posterior mediastinum; nine pairs of posterior intercostals, subcostals, two left bronchial, oesophageal and superior phrenic branches.',
  ],
  visual: {
    kind: 'path',
    // Each part of the aorta with its branches and the structures hooked under the arch.
    diagram: {
      width: 360,
      height: 370,
      nodes: [
        { id: 'ascending-aorta', label: 'Ascending', name: 'Ascending aorta', x: 50, y: 30 },
        {
          id: 'aortic-sinuses',
          label: 'Aortic\nsinuses',
          name: 'Three aortic sinuses: anterior, left posterior, right posterior',
          x: 145,
          y: 30,
        },
        {
          id: 'coronary-arteries',
          label: 'Coronary\narteries',
          name: 'Right and left coronary arteries, its only branches',
          x: 225,
          y: 30,
        },
        { id: 'arch-of-aorta', label: 'Arch', name: 'Arch of the aorta', x: 50, y: 110 },
        {
          id: 'brachiocephalic-trunk',
          label: 'Brachio-\ncephalic',
          name: 'Brachiocephalic trunk',
          x: 145,
          y: 110,
        },
        {
          id: 'left-common-carotid',
          label: 'Left\ncarotid',
          name: 'Left common carotid artery',
          x: 225,
          y: 110,
        },
        {
          id: 'left-subclavian-artery',
          label: 'Left\nsubclavian',
          name: 'Left subclavian artery',
          x: 305,
          y: 110,
        },
        {
          id: 'left-recurrent-laryngeal',
          label: 'Recurrent\nlaryngeal',
          name: 'Left recurrent laryngeal nerve, hooking under the arch',
          x: 185,
          y: 176,
        },
        {
          id: 'ligamentum-arteriosum',
          label: 'Ligamentum\narteriosum',
          name: 'Ligamentum arteriosum, from the left pulmonary artery to the arch',
          x: 285,
          y: 176,
        },
        {
          id: 'descending-aorta',
          label: 'Descending',
          name: 'Descending thoracic aorta',
          x: 50,
          y: 256,
        },
        {
          id: 'posterior-intercostals',
          label: 'Posterior\nintercostals',
          name: 'Nine pairs of posterior intercostal arteries and the subcostals',
          x: 145,
          y: 256,
        },
        {
          id: 'bronchial-arteries',
          label: 'Bronchial',
          name: 'Two left bronchial arteries',
          x: 235,
          y: 256,
        },
        {
          id: 'oesophageal-branches',
          label: 'Oeso-\nphageal',
          name: 'Oesophageal branches, to the middle third of the oesophagus',
          x: 310,
          y: 256,
        },
        {
          id: 'aortic-opening',
          label: 'Aortic\nopening T12',
          name: 'Aortic opening of the diaphragm, at T12',
          x: 185,
          y: 336,
        },
      ],
      edges: [
        { from: 'ascending-aorta', to: 'aortic-sinuses' },
        { from: 'aortic-sinuses', to: 'coronary-arteries' },
        { from: 'arch-of-aorta', to: 'brachiocephalic-trunk' },
        { from: 'arch-of-aorta', to: 'left-common-carotid' },
        { from: 'arch-of-aorta', to: 'left-subclavian-artery' },
        { from: 'arch-of-aorta', to: 'left-recurrent-laryngeal' },
        { from: 'arch-of-aorta', to: 'ligamentum-arteriosum' },
        { from: 'descending-aorta', to: 'posterior-intercostals' },
        { from: 'descending-aorta', to: 'bronchial-arteries' },
        { from: 'descending-aorta', to: 'oesophageal-branches' },
        { from: 'descending-aorta', to: 'aortic-opening' },
      ],
    },
    lesions: [
      {
        id: 'coarctation',
        label: 'Coarctation',
        nodeIds: ['arch-of-aorta', 'descending-aorta', 'posterior-intercostals'],
        explanation:
          'A narrowing of the aorta opposite or just beyond the ductus. Blood reaches the lower body round it, from branches of the subclavian arteries through the anterior intercostals into the posterior intercostals, which swell and notch the lower borders of the ribs.',
      },
      {
        id: 'arch-aneurysm',
        label: 'Aneurysm of the arch',
        nodeIds: ['arch-of-aorta', 'left-recurrent-laryngeal'],
        explanation:
          'A bulging arch presses on what lies round it: the left recurrent laryngeal nerve under it (a paralysed left vocal cord and hoarse voice), the trachea (breathlessness, a tracheal tug) and the oesophagus (difficulty swallowing).',
      },
      {
        id: 'aortic-knuckle',
        label: 'Aortic knuckle',
        nodeIds: ['arch-of-aorta'],
        explanation:
          'On a PA chest X-ray the arch shows as a bump beyond the left edge of the mediastinal shadow, the aortic knuckle, more prominent in old age as the aorta unfolds.',
      },
    ],
    drill: [
      {
        id: 'parts',
        title: 'Ascending aorta and arch',
        hint: 'The ascending aorta’s only branches, then the arch’s three, left to right across the top.',
        nodeIds: [
          'aortic-sinuses',
          'coronary-arteries',
          'brachiocephalic-trunk',
          'left-common-carotid',
          'left-subclavian-artery',
        ],
      },
      {
        id: 'under-arch',
        title: 'Under the arch and below',
        hint: 'What hooks under the arch, then the branches and exit of the descending aorta.',
        nodeIds: [
          'left-recurrent-laryngeal',
          'ligamentum-arteriosum',
          'posterior-intercostals',
          'bronchial-arteries',
          'oesophageal-branches',
          'aortic-opening',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${DUCT_NERVE_CREDIT}`,
      parts: organsParts([
        ...SPINE_FRAME,
        ...HEART,
        'ascending-aorta',
        'arch-of-aorta',
        'descending-aorta',
        'brachiocephalic-trunk',
        'left-common-carotid',
        'left-subclavian-artery',
        'pulmonary-trunk',
        'right-pulmonary-artery',
        'left-pulmonary-artery',
        'trachea',
        'right-main-bronchus',
        'left-main-bronchus',
        'oesophagus',
        'superior-vena-cava',
        'brachiocephalic-veins',
        'azygos-vein',
        'right-vagus',
        'left-vagus',
      ]),
      traces: [
        { id: 'left-recurrent-laryngeal', kind: 'nerve', paths: RECURRENT_LARYNGEAL_PATHS },
        { id: 'ligamentum-arteriosum', kind: 'outline', paths: DUCTUS_PATHS },
      ],
      stops: [
        {
          id: 'front',
          title: 'The aorta from the front',
          description:
            'The ascending aorta rises from the heart behind the pulmonary trunk, arches back over the left lung root and runs down in front of the vertebrae.',
          target: [10, -110, 1265],
          position: [10, -900, 1300],
        },
        {
          id: 'arch-above',
          title: 'Arch from above',
          description:
            'Its three branches leave in a row: the brachiocephalic trunk, left common carotid and left subclavian, crossed near their origins by the left brachiocephalic vein.',
          target: [10, -100, 1300],
          position: [-150, -520, 1660],
        },
        {
          id: 'arch-left',
          title: 'Arch from the left',
          description:
            'The left phrenic and vagus cross its left side; the left recurrent laryngeal nerve hooks under it round the ligamentum arteriosum.',
          target: [20, -100, 1290],
          position: [720, -360, 1360],
        },
        {
          id: 'descending',
          title: 'Descending thoracic aorta',
          description:
            'From behind and the left: it runs down from T4 on the left of the vertebrae, drifting towards the midline, to leave through the aortic opening at T12.',
          target: [16, -77, 1210],
          position: [700, 360, 1230],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'parts',
      title: 'Three parts',
      body: 'The aorta takes oxygenated blood from the left ventricle to the whole body except the lungs. In the thorax it has three parts: ascending, arch and descending thoracic.',
      focus: [],
    },
    {
      id: 'ascending',
      title: 'Ascending aorta',
      body: 'About 5 cm long and inside the pericardium, sharing a sleeve with the pulmonary trunk. It starts behind the left half of the sternum at the third costal cartilage and runs up, forwards and right to the second right costal cartilage. At its root are three aortic sinuses; the right coronary artery leaves the anterior one, the left coronary the left posterior.',
      focus: ['ascending-aorta', 'aortic-sinuses', 'coronary-arteries'],
    },
    {
      id: 'ascending-relations',
      title: 'Round the ascending aorta',
      body: 'In front: the sternum, right lung and pleura, the infundibulum and root of the pulmonary trunk, the right auricle. Behind: the transverse sinus, left atrium, right pulmonary artery and right bronchus. To its right the superior vena cava and right atrium; to its left the pulmonary trunk.',
      focus: ['ascending-aorta'],
    },
    {
      id: 'arch',
      title: 'Arch of the aorta',
      body: 'In the superior mediastinum behind the lower half of the manubrium. It starts at the second right sternochondral joint, runs up, back and left across the left side of the tracheal bifurcation, then down beside T4 behind the left bronchus, arching over the left lung root. It ends at the lower border of T4, the level it began at.',
      focus: ['arch-of-aorta'],
    },
    {
      id: 'arch-relations',
      title: 'Round the arch',
      body: 'On its front and left: the left phrenic nerve, the cardiac branches of the left vagus and sympathetic, and the left vagus, with the left superior intercostal vein between, then the left lung. Behind and right: the trachea with the deep cardiac plexus, the oesophagus, the left recurrent laryngeal nerve and the thoracic duct. Above: its three branches, crossed by the left brachiocephalic vein. Below: the pulmonary bifurcation, the left bronchus, the ligamentum arteriosum and the recurrent laryngeal nerve.',
      focus: [
        'brachiocephalic-trunk',
        'left-common-carotid',
        'left-subclavian-artery',
        'left-recurrent-laryngeal',
        'ligamentum-arteriosum',
      ],
    },
    {
      id: 'descending',
      title: 'Descending thoracic aorta',
      body: 'In the posterior mediastinum from the lower border of T4 on the left, inclining towards the midline, to the aortic opening at T12. In front: the left lung root, pericardium and heart, the oesophagus low down, the diaphragm. Behind: the vertebrae and hemiazygos veins. To its right the oesophagus above, the azygos vein and the thoracic duct.',
      focus: ['descending-aorta', 'aortic-opening'],
    },
    {
      id: 'descending-branches',
      title: 'Its branches',
      body: 'Nine pairs of posterior intercostal arteries for spaces 3 to 11 and a subcostal pair; two left bronchial arteries (the right comes from the third right posterior intercostal); oesophageal branches to the middle third of the oesophagus; pericardial and mediastinal twigs; and superior phrenic arteries to the back of the diaphragm.',
      focus: ['posterior-intercostals', 'bronchial-arteries', 'oesophageal-branches'],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each part and branch to light it, and follow the recurrent laryngeal nerve under the arch from the left.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'arch-not-branch',
      prompt: 'Which is not a branch of the arch of the aorta?',
      options: [
        { id: 'vertebral', text: 'Vertebral artery' },
        { id: 'brachiocephalic', text: 'Brachiocephalic trunk' },
        { id: 'carotid', text: 'Left common carotid artery' },
        { id: 'subclavian', text: 'Left subclavian artery' },
      ],
      answerId: 'vertebral',
      explanation:
        'The vertebral artery comes from the first part of the subclavian artery in the neck.',
    },
    {
      id: 'posterior-intercostal-pairs',
      prompt:
        'How many pairs of posterior intercostal arteries arise from the descending thoracic aorta?',
      options: [
        { id: 'nine', text: 'Nine' },
        { id: 'eleven', text: 'Eleven' },
        { id: 'ten', text: 'Ten' },
        { id: 'twelve', text: 'Twelve' },
      ],
      answerId: 'nine',
      explanation:
        'Spaces 3 to 11; the first two come from the superior intercostal artery, and the subcostal pair runs below the twelfth rib.',
    },
    {
      id: 'ascending-not-behind',
      prompt: 'Which does not lie behind the ascending aorta?',
      options: [
        { id: 'right-atrium', text: 'Right atrium' },
        { id: 'transverse-sinus', text: 'Transverse sinus' },
        { id: 'right-pa', text: 'Right pulmonary artery' },
        { id: 'right-bronchus', text: 'Right bronchus' },
      ],
      answerId: 'right-atrium',
      explanation: 'The right atrium lies to its right, with the superior vena cava.',
    },
    {
      id: 'arch-end-level',
      prompt: 'The arch of the aorta ends at:',
      options: [
        { id: 't4', text: 'The lower border of T4' },
        { id: 't2', text: 'The lower border of T2' },
        { id: 't6', text: 'The upper border of T6' },
        { id: 't12', text: 'The lower border of T12' },
      ],
      answerId: 't4',
      explanation: 'It starts and ends at the level of the sternal angle, in front and behind.',
    },
  ],
  cards: [
    {
      id: 'aorta-parts',
      front: 'Parts of the aorta in the thorax and where each runs?',
      back: 'Ascending: left ventricle to the second right costal cartilage. Arch: from there over the left lung root to the lower border of T4. Descending: T4 to the aortic opening at T12.',
    },
    {
      id: 'arch-left-nerves',
      front: 'Nerves crossing the left side of the arch, front to back?',
      back: 'Left phrenic, inferior cervical cardiac branch of the left vagus, superior cervical cardiac branch of the left sympathetic, left vagus.',
    },
    {
      id: 'descending-aorta-branches',
      front: 'Branches of the descending thoracic aorta?',
      back: 'Nine pairs of posterior intercostals, subcostals, two left bronchial, oesophageal, pericardial, mediastinal and superior phrenic.',
    },
    {
      id: 'below-arch',
      front: 'What lies below (in the concavity of) the arch?',
      back: 'Bifurcation of the pulmonary trunk, left bronchus, ligamentum arteriosum with the superficial cardiac plexus, left recurrent laryngeal nerve.',
    },
    {
      id: 'coarctation-collaterals',
      front: 'Collateral route in coarctation of the aorta?',
      back: 'Subclavian branches → internal thoracic → anterior intercostals → posterior intercostals → descending aorta, notching the ribs.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 19 Superior Vena Cava, Aorta and Pulmonary Trunk',
      pages: '311–318',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '220–222, 230–231' },
  ],
};
