import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  DUCT_NERVE_CREDIT,
  HEART,
  ORGANS_MODEL_CREDIT,
  ORGANS_MODEL_SRC,
  organsParts,
  SPINE_FRAME,
  THORACIC_DUCT_PATHS,
} from './thoracic-organs-3d';

// Thorax batch 4. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const oesophagus: Topic = {
  slug: 'oesophagus',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Oesophagus',
  summary:
    'The food passage from C6 to the stomach: its four narrowings, what lies round its thoracic part, its supply, and the varices and dents seen on a barium swallow.',
  estimatedMinutes: 13,
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
      'Volume 1, Chapter 20 Trachea, Oesophagus and Thoracic Duct, pages 323 to 326',
    ),
    bookSource('grays-anatomy', 'Chapter 3 Thorax, regional anatomy: esophagus, pages 227 to 230'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Oesophagus, heart, aorta and veins in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'About 25 cm long, from the lower border of the cricoid (C6) to the stomach at T11; it pierces the diaphragm at T10.',
    'Four narrowings, measured from the incisor teeth: cricopharyngeus 15 cm, aortic arch 22.5 cm, left bronchus 27.5 cm, diaphragm 37.5 cm.',
    'In front: trachea, right pulmonary artery, left bronchus, pericardium over the left atrium, diaphragm. Behind: vertebrae, thoracic duct, azygos and hemiazygos, aorta below.',
    'Thoracic part: oesophageal branches of the aorta; veins to the azygos; posterior mediastinal nodes; vagal oesophageal plexus.',
    'The lower end is a portosystemic anastomosis: varices in portal hypertension.',
  ],
  visual: {
    kind: 'path',
    // Extent, the four narrowings, what lies in front and behind, and its supply.
    diagram: {
      width: 360,
      height: 440,
      nodes: [
        { id: 'oesophagus', label: 'Oeso-\nphagus', name: 'Oesophagus', x: 50, y: 30 },
        { id: 'extent', label: 'C6 to T11', name: 'From C6 to the stomach at T11', x: 145, y: 30 },
        {
          id: 'length',
          label: '25 cm',
          name: 'About 25 cm, 20 cm of it in the thorax',
          x: 225,
          y: 30,
        },
        {
          id: 'diaphragm',
          label: 'Diaphragm\nat T10',
          name: 'Through the oesophageal opening of the diaphragm at T10',
          x: 305,
          y: 30,
        },
        {
          id: 'constrictions',
          label: 'Narrow-\nings',
          name: 'Four normal narrowings',
          x: 50,
          y: 110,
        },
        {
          id: 'cricopharyngeus',
          label: 'Cricoid\n15 cm',
          name: 'At its start, crossed by cricopharyngeus, 15 cm from the teeth',
          x: 145,
          y: 110,
        },
        {
          id: 'arch-of-aorta',
          label: 'Arch\n22.5 cm',
          name: 'Where the arch of the aorta crosses it, 22.5 cm',
          x: 225,
          y: 110,
        },
        {
          id: 'left-main-bronchus',
          label: 'Bronchus\n27.5 cm',
          name: 'Where the left bronchus crosses it, 27.5 cm',
          x: 305,
          y: 110,
        },
        {
          id: 'hiatus',
          label: 'Diaphragm\n37.5 cm',
          name: 'Where it pierces the diaphragm, 37.5 cm',
          x: 185,
          y: 170,
        },
        { id: 'in-front', label: 'In front', name: 'Anterior relations', x: 50, y: 250 },
        { id: 'trachea', label: 'Trachea', name: 'Trachea', x: 145, y: 250 },
        {
          id: 'left-atrium',
          label: 'Left\natrium',
          name: 'Pericardium over the left atrium',
          x: 225,
          y: 250,
        },
        {
          id: 'right-pulmonary-artery',
          label: 'Pulmonary\nartery',
          name: 'Right pulmonary artery',
          x: 305,
          y: 250,
        },
        { id: 'behind', label: 'Behind', name: 'Posterior relations', x: 50, y: 330 },
        {
          id: 'descending-aorta',
          label: 'Aorta',
          name: 'Descending thoracic aorta, behind and to the left lower down',
          x: 145,
          y: 330,
        },
        {
          id: 'azygos-vein',
          label: 'Azygos',
          name: 'Azygos vein and the ends of the hemiazygos veins',
          x: 225,
          y: 330,
        },
        { id: 'thoracic-duct', label: 'Thoracic\nduct', name: 'Thoracic duct', x: 305, y: 330 },
        { id: 'supply', label: 'Supply', name: 'Blood and nerve supply', x: 50, y: 410 },
        {
          id: 'right-vagus',
          label: 'Vagal\nplexus',
          name: 'Oesophageal plexus, mainly from the vagi',
          x: 145,
          y: 410,
        },
        {
          id: 'portosystemic',
          label: 'Porto-\nsystemic',
          name: 'Lower end: a portosystemic anastomosis',
          x: 225,
          y: 410,
        },
      ],
      edges: [
        { from: 'oesophagus', to: 'extent' },
        { from: 'oesophagus', to: 'length' },
        { from: 'oesophagus', to: 'diaphragm' },
        { from: 'constrictions', to: 'cricopharyngeus' },
        { from: 'constrictions', to: 'arch-of-aorta' },
        { from: 'constrictions', to: 'left-main-bronchus' },
        { from: 'constrictions', to: 'hiatus' },
        { from: 'in-front', to: 'trachea' },
        { from: 'in-front', to: 'left-atrium' },
        { from: 'in-front', to: 'right-pulmonary-artery' },
        { from: 'behind', to: 'descending-aorta' },
        { from: 'behind', to: 'azygos-vein' },
        { from: 'behind', to: 'thoracic-duct' },
        { from: 'supply', to: 'right-vagus' },
        { from: 'supply', to: 'portosystemic' },
      ],
    },
    lesions: [
      {
        id: 'varices',
        label: 'Oesophageal varices',
        nodeIds: ['portosystemic', 'oesophagus'],
        explanation:
          'At the lower end, veins to the left gastric (portal) and to the azygos (systemic) meet. In portal hypertension they swell into varices, worm-like shadows on a barium swallow, and can burst into a large vomit of blood.',
      },
      {
        id: 'enlarged-left-atrium',
        label: 'Enlarged left atrium',
        nodeIds: ['left-atrium'],
        explanation:
          'In mitral stenosis the left atrium swells and presses a shallow dent into the front of the oesophagus, seen on a barium swallow, and can make swallowing difficult.',
      },
      {
        id: 'achalasia',
        label: 'Achalasia cardia',
        nodeIds: ['hiatus', 'diaphragm'],
        explanation:
          'The lower end fails to open when food arrives, often because nerve cells are missing from its wall, so food collects in a widened oesophagus above.',
      },
      {
        id: 'fistula',
        label: 'Tracheo-oesophageal fistula',
        nodeIds: ['trachea', 'oesophagus'],
        explanation:
          'If the trachea does not separate properly from the foregut in development, an abnormal channel joins it to the oesophagus.',
      },
    ],
    drill: [
      {
        id: 'narrowings',
        title: 'Four narrowings',
        hint: 'Top to bottom, with their distance from the incisor teeth.',
        nodeIds: ['cricopharyngeus', 'arch-of-aorta', 'left-main-bronchus', 'hiatus'],
      },
      {
        id: 'relations',
        title: 'Relations',
        hint: 'What lies in front of the thoracic part, and what lies behind it.',
        nodeIds: [
          'trachea',
          'left-atrium',
          'right-pulmonary-artery',
          'descending-aorta',
          'azygos-vein',
          'thoracic-duct',
        ],
      },
    ],
    model3d: {
      src: ORGANS_MODEL_SRC,
      credit: `${ORGANS_MODEL_CREDIT} ${DUCT_NERVE_CREDIT}`,
      parts: organsParts([
        ...SPINE_FRAME,
        ...HEART,
        'oesophagus',
        'trachea',
        'right-main-bronchus',
        'left-main-bronchus',
        'arch-of-aorta',
        'descending-aorta',
        'ascending-aorta',
        'pulmonary-trunk',
        'right-pulmonary-artery',
        'left-pulmonary-artery',
        'azygos-vein',
        'right-vagus',
        'left-vagus',
      ]),
      traces: [{ id: 'thoracic-duct', kind: 'lymph', paths: THORACIC_DUCT_PATHS }],
      stops: [
        {
          id: 'front',
          title: 'From the front',
          description:
            'The oesophagus runs down behind the trachea, the left bronchus and the heart, and through the diaphragm into the abdomen.',
          target: [7, -95, 1245],
          position: [0, -950, 1265],
        },
        {
          id: 'right',
          title: 'From the right',
          description:
            'The azygos vein runs up beside it and arches forwards over the right lung root; the right vagus runs down onto it.',
          target: [0, -90, 1240],
          position: [-820, -260, 1250],
        },
        {
          id: 'behind-left',
          title: 'From behind and the left',
          description:
            'The arch of the aorta crosses it at T4, and the descending aorta slips from its left side to behind it on the way down.',
          target: [8, -88, 1230],
          position: [620, 560, 1250],
        },
        {
          id: 'lower-end',
          title: 'Lower end',
          description:
            'Behind the left atrium and through the diaphragm at T10, where its veins meet the portal system.',
          target: [10, -100, 1150],
          position: [-320, -700, 1040],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'tube',
      title: 'A collapsed tube',
      body: 'A muscular tube about 25 cm long, flattened front to back and opening only as food passes. It begins at the lower border of the cricoid (C6), runs down in front of the spine through the superior and posterior mediastinum, pierces the diaphragm at T10 and joins the stomach at T11. It curves twice to the left, at the root of the neck and near its lower end.',
      focus: ['oesophagus', 'extent', 'length', 'diaphragm'],
    },
    {
      id: 'narrowings',
      title: 'Four narrowings',
      body: 'Where cricopharyngeus surrounds its start (15 cm from the incisor teeth), where the arch of the aorta crosses it (22.5 cm), where the left bronchus crosses it (27.5 cm), and where it pierces the diaphragm (37.5 cm). Endoscopists keep these distances in mind; swallowed objects lodge there.',
      focus: ['constrictions', 'cricopharyngeus', 'arch-of-aorta', 'left-main-bronchus', 'hiatus'],
    },
    {
      id: 'front',
      title: 'In front',
      body: 'The trachea, the right pulmonary artery, the left bronchus, the pericardium over the left atrium, and the diaphragm.',
      focus: ['in-front', 'trachea', 'right-pulmonary-artery', 'left-atrium'],
    },
    {
      id: 'behind-sides',
      title: 'Behind and beside',
      body: 'Behind: the vertebral column, right posterior intercostal arteries, thoracic duct, azygos vein with the ends of the hemiazygos veins, and lower down the aorta. On the right: the right lung and pleura, azygos vein and right vagus. On the left, in the superior mediastinum: the arch, left subclavian artery, thoracic duct and left recurrent laryngeal nerve; lower down the descending aorta.',
      focus: ['behind', 'descending-aorta', 'azygos-vein', 'thoracic-duct'],
    },
    {
      id: 'supply',
      title: 'Supply',
      body: 'Arteries: inferior thyroid above the arch, oesophageal branches of the aorta in the thorax, left gastric in the abdomen. Veins: brachiocephalic above, azygos in the middle, left gastric and hemiazygos at the lower end. Lymph: deep cervical, posterior mediastinal and left gastric nodes. Nerves: recurrent laryngeal nerves to the upper half, the vagal oesophageal plexus below, sympathetic fibres for the vessels.',
      focus: ['supply', 'right-vagus', 'portosystemic'],
    },
    {
      id: 'muscle',
      title: 'Its wall',
      body: 'Lined by non-keratinised stratified squamous epithelium with mucous glands in the submucosa. The muscle is striated in the upper third, mixed in the middle third and smooth in the lower third.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each narrowing and relation to light it, then follow the oesophagus down through the guided views.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'indentation-not',
      prompt: 'Which of these does not indent the oesophagus?',
      options: [
        { id: 'left-ventricle', text: 'Left ventricle' },
        { id: 'arch', text: 'Arch of the aorta' },
        { id: 'left-bronchus', text: 'Left bronchus' },
        { id: 'left-atrium', text: 'Left atrium' },
      ],
      answerId: 'left-ventricle',
      explanation:
        'The left atrium lies directly in front of it; the left ventricle is further forward and below.',
    },
    {
      id: 'barium-mitral',
      prompt: 'In mitral stenosis, a barium swallow shows the oesophagus pressed by an enlarged:',
      options: [
        { id: 'left-atrium', text: 'Left atrium' },
        { id: 'right-atrium', text: 'Right atrium' },
        { id: 'left-ventricle', text: 'Left ventricle' },
        { id: 'right-ventricle', text: 'Right ventricle' },
      ],
      answerId: 'left-atrium',
      explanation: 'It forms the base of the heart, right in front of the oesophagus.',
    },
    {
      id: 'varices-site',
      prompt: 'Oesophageal varices are found at:',
      options: [
        { id: 'lower', text: 'The lower end' },
        { id: 'upper', text: 'The upper end' },
        { id: 'middle', text: 'The middle part' },
        { id: 'whole', text: 'The whole length' },
      ],
      answerId: 'lower',
      explanation: 'Where the left gastric (portal) and azygos (systemic) veins meet.',
    },
    {
      id: 'right-relation-not',
      prompt: 'Which is not on the right of the thoracic oesophagus?',
      options: [
        { id: 'left-vagus', text: 'Left vagus' },
        { id: 'right-lung', text: 'Right lung and pleura' },
        { id: 'azygos', text: 'Azygos vein' },
        { id: 'right-vagus', text: 'Right vagus' },
      ],
      answerId: 'left-vagus',
      explanation: 'The left vagus runs on its front lower down, in the oesophageal plexus.',
    },
  ],
  cards: [
    {
      id: 'oesophagus-narrowings',
      front: 'Four narrowings of the oesophagus and their distances from the teeth?',
      back: 'Cricopharyngeus 15 cm, arch of aorta 22.5 cm, left bronchus 27.5 cm, diaphragm 37.5 cm.',
    },
    {
      id: 'oesophagus-anterior',
      front: 'Anterior relations of the thoracic oesophagus?',
      back: 'Trachea, right pulmonary artery, left bronchus, pericardium over the left atrium, diaphragm.',
    },
    {
      id: 'oesophagus-arteries',
      front: 'Arteries of the oesophagus?',
      back: 'Inferior thyroid (to the arch), oesophageal branches of the aorta (thorax), left gastric (abdomen).',
    },
    {
      id: 'oesophagus-muscle',
      front: 'Muscle in the wall of the oesophagus?',
      back: 'Striated in the upper third, mixed in the middle third, smooth in the lower third.',
    },
    {
      id: 'oesophagus-levels',
      front: 'Levels of the oesophagus?',
      back: 'Begins at C6, pierces the diaphragm at T10, ends at the stomach at T11.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Chapter 20 Trachea, Oesophagus and Thoracic Duct',
      pages: '323–326',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '227–230' },
  ],
};
