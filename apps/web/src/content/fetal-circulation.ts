import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  CHAMBERS,
  DUCTUS_PATHS,
  GREAT_VESSELS,
  HEART_BACK,
  HEART_FRONT,
  HEART_MODEL_CREDIT,
  HEART_MODEL_SRC,
  heartParts,
  SCHEMATIC_CREDIT,
  WALLS,
} from './heart-3d';

// Thorax batch 3. Facts in our own words; `reviewed: false` until a student checks the topic
// against the book pages.
export const fetalCirculation: Topic = {
  slug: 'fetal-circulation',
  subjectSlug: 'anatomy',
  regions: ['thorax'],
  title: 'Fetal circulation and heart development',
  summary:
    'How blood from the placenta bypasses the liver and lungs through three shunts, what each becomes after birth, and the septal defects and tetralogy of Fallot.',
  estimatedMinutes: 14,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 18 Pericardium and Heart, pages 303 to 307'),
    bookSource(
      'grays-anatomy',
      'Chapter 3 Thorax, regional anatomy: foramen ovale and congenital heart defects, pages 197 to 199 and 206 to 208',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Heart and great vessels in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'One umbilical vein brings oxygenated blood from the placenta; the ductus venosus carries it past the liver to the IVC.',
    'In the right atrium most IVC blood crosses the foramen ovale to the left atrium, bypassing the lungs.',
    'Blood pumped into the pulmonary trunk crosses the ductus arteriosus into the arch of the aorta; two umbilical arteries return it to the placenta.',
    'After birth: umbilical vein → ligamentum teres, ductus venosus → ligamentum venosum, foramen ovale → fossa ovalis, ductus arteriosus → ligamentum arteriosum, umbilical arteries → medial umbilical ligaments.',
    'Tetralogy of Fallot: ventricular septal defect, overriding aorta, pulmonary stenosis, right ventricular hypertrophy.',
  ],
  visual: {
    kind: 'path',
    // The fetal route from placenta back to placenta, then what each shunt becomes after birth.
    diagram: {
      width: 360,
      height: 440,
      nodes: [
        { id: 'placenta', label: 'Placenta', name: 'Placenta', x: 50, y: 30 },
        {
          id: 'umbilical-vein',
          label: 'Umbilical\nvein',
          name: 'Umbilical vein (one)',
          x: 145,
          y: 30,
        },
        {
          id: 'ductus-venosus',
          label: 'Ductus\nvenosus',
          name: 'Ductus venosus, past the liver',
          x: 225,
          y: 30,
        },
        {
          id: 'inferior-vena-cava',
          label: 'Inferior\nvena cava',
          name: 'Inferior vena cava',
          x: 305,
          y: 30,
        },
        { id: 'right-atrium', label: 'Right\natrium', name: 'Right atrium', x: 50, y: 106 },
        {
          id: 'foramen-ovale',
          label: 'Foramen\novale',
          name: 'Foramen ovale, from the right atrium to the left',
          x: 145,
          y: 106,
        },
        { id: 'left-atrium', label: 'Left\natrium', name: 'Left atrium', x: 225, y: 106 },
        {
          id: 'left-ventricle',
          label: 'Left\nventricle',
          name: 'Left ventricle, to the aorta',
          x: 305,
          y: 106,
        },
        {
          id: 'right-ventricle',
          label: 'Right\nventricle',
          name: 'Right ventricle',
          x: 50,
          y: 186,
        },
        {
          id: 'pulmonary-trunk',
          label: 'Pulmonary\ntrunk',
          name: 'Pulmonary trunk and left pulmonary artery',
          x: 145,
          y: 186,
        },
        {
          id: 'ductus-arteriosus',
          label: 'Ductus\narteriosus',
          name: 'Ductus arteriosus, into the arch of the aorta',
          x: 225,
          y: 186,
        },
        {
          id: 'descending-aorta',
          label: 'Descending\naorta',
          name: 'Descending aorta, carrying mixed blood',
          x: 305,
          y: 186,
        },
        {
          id: 'umbilical-arteries',
          label: 'Umbilical\narteries',
          name: 'Two umbilical arteries, from the internal iliacs back to the placenta',
          x: 305,
          y: 256,
        },
        { id: 'at-birth', label: 'At birth', name: 'What each becomes after birth', x: 50, y: 336 },
        {
          id: 'ligamentum-teres',
          label: 'Ligamentum\nteres',
          name: 'Ligamentum teres, from the umbilical vein',
          x: 145,
          y: 336,
        },
        {
          id: 'fossa-ovalis',
          label: 'Fossa\novalis',
          name: 'Fossa ovalis, where the foramen ovale closed',
          x: 225,
          y: 336,
        },
        {
          id: 'ligamentum-arteriosum',
          label: 'Ligamentum\narteriosum',
          name: 'Ligamentum arteriosum, from the ductus arteriosus',
          x: 305,
          y: 336,
        },
        {
          id: 'ligamentum-venosum',
          label: 'Ligamentum\nvenosum',
          name: 'Ligamentum venosum, from the ductus venosus',
          x: 185,
          y: 404,
        },
        {
          id: 'medial-umbilical-ligaments',
          label: 'Medial\numbilical\nligaments',
          name: 'Medial umbilical ligaments, from the umbilical arteries',
          x: 290,
          y: 410,
        },
      ],
      edges: [
        { from: 'placenta', to: 'umbilical-vein' },
        { from: 'umbilical-vein', to: 'ductus-venosus' },
        { from: 'ductus-venosus', to: 'inferior-vena-cava' },
        { from: 'inferior-vena-cava', to: 'right-atrium' },
        { from: 'right-atrium', to: 'foramen-ovale' },
        { from: 'foramen-ovale', to: 'left-atrium' },
        { from: 'left-atrium', to: 'left-ventricle' },
        { from: 'right-atrium', to: 'right-ventricle' },
        { from: 'right-ventricle', to: 'pulmonary-trunk' },
        { from: 'pulmonary-trunk', to: 'ductus-arteriosus' },
        { from: 'ductus-arteriosus', to: 'descending-aorta' },
        { from: 'descending-aorta', to: 'umbilical-arteries' },
        { from: 'at-birth', to: 'ligamentum-teres' },
        { from: 'at-birth', to: 'fossa-ovalis' },
        { from: 'at-birth', to: 'ligamentum-arteriosum' },
        { from: 'at-birth', to: 'ligamentum-venosum' },
        { from: 'at-birth', to: 'medial-umbilical-ligaments' },
      ],
    },
    lesions: [
      {
        id: 'atrial-septal-defect',
        label: 'Atrial septal defect',
        nodeIds: ['foramen-ovale', 'fossa-ovalis'],
        explanation:
          'Normally the septum primum fuses with the septum secundum after birth and closes the foramen ovale. If they do not fuse, a hole stays open between the atria.',
      },
      {
        id: 'patent-ductus',
        label: 'Patent ductus arteriosus',
        nodeIds: ['ductus-arteriosus', 'ligamentum-arteriosum'],
        explanation:
          'If the ductus stays open after birth, blood flows backwards from the high-pressure aorta into the pulmonary artery and floods the lungs.',
      },
      {
        id: 'fallot',
        label: 'Tetralogy of Fallot',
        nodeIds: ['right-ventricle', 'pulmonary-trunk'],
        explanation:
          'Four faults from one misplaced septum: a ventricular septal defect, an aorta overriding it, pulmonary stenosis, and a thick right ventricle. Deoxygenated blood reaches the aorta and the child is blue.',
      },
      {
        id: 'ventricular-septal-defect',
        label: 'Ventricular septal defect',
        nodeIds: ['right-ventricle', 'left-ventricle'],
        explanation:
          'The membranous part of the interventricular septum forms from the bulbar ridges and the endocardial cushion. If they do not meet, a hole lets blood pass from the left ventricle to the right.',
      },
    ],
    drill: [
      {
        id: 'route',
        title: 'Fetal route',
        hint: 'From the placenta, past the liver, across the atria, and round the lungs.',
        nodeIds: [
          'umbilical-vein',
          'ductus-venosus',
          'foramen-ovale',
          'ductus-arteriosus',
          'umbilical-arteries',
        ],
      },
      {
        id: 'remnants',
        title: 'After birth',
        hint: 'What each fetal channel leaves behind.',
        nodeIds: [
          'ligamentum-teres',
          'ligamentum-venosum',
          'fossa-ovalis',
          'ligamentum-arteriosum',
          'medial-umbilical-ligaments',
        ],
      },
    ],
    model3d: {
      src: HEART_MODEL_SRC,
      credit: `${HEART_MODEL_CREDIT} ${SCHEMATIC_CREDIT}`,
      parts: heartParts([...WALLS, ...CHAMBERS, ...GREAT_VESSELS]),
      traces: [
        { id: 'ductus-arteriosus', kind: 'outline', paths: DUCTUS_PATHS },
        {
          id: 'foramen-ovale',
          kind: 'outline',
          paths: [
            [
              [-6, -112, 1226],
              [2, -106, 1230],
              [8, -102, 1233],
            ],
          ],
        },
      ],
      stops: [
        {
          ...HEART_FRONT,
          description:
            'The heart and great vessels as they are after birth. In the fetus the right side pumped harder than the left, and most of its output bypassed the lungs.',
        },
        {
          id: 'ductus',
          title: 'Ductus arteriosus',
          description:
            'From the left and above: the short channel from the left pulmonary artery to the underside of the arch, now the ligamentum arteriosum, with the left recurrent laryngeal nerve hooking round it.',
          target: [28, -100, 1285],
          position: [420, -360, 1440],
        },
        {
          id: 'foramen-ovale',
          title: 'Foramen ovale',
          description:
            'From the right, through the right atrium: the IVC opens towards the interatrial septum, where the foramen ovale carried its blood into the left atrium.',
          target: [0, -110, 1230],
          position: [-470, -330, 1250],
        },
        HEART_BACK,
      ],
    },
  },
  lesson: [
    {
      id: 'why',
      title: 'Why the shunts',
      body: 'Before birth the placenta does the work of the lungs, so the fetal blood needs to skip the lungs and, mostly, the liver. It does it through five temporary channels: one umbilical vein, the ductus venosus, the foramen ovale, the ductus arteriosus and two umbilical arteries.',
      focus: [],
    },
    {
      id: 'in',
      title: 'From the placenta to the heart',
      body: 'Oxygenated blood comes up the umbilical cord in the single umbilical vein to the liver. The ductus venosus carries most of it past the liver into the inferior vena cava, and so to the right atrium.',
      focus: ['placenta', 'umbilical-vein', 'ductus-venosus', 'inferior-vena-cava'],
    },
    {
      id: 'across',
      title: 'Across the atria',
      body: 'The valve of the IVC aims this richer blood at the foramen ovale, so most of it passes into the left atrium, then the left ventricle and aorta, reaching the heart and brain first.',
      focus: ['right-atrium', 'foramen-ovale', 'left-atrium', 'left-ventricle'],
    },
    {
      id: 'round',
      title: 'Round the lungs',
      body: 'Blood from the superior vena cava goes down into the right ventricle and out into the pulmonary trunk. Most of it crosses the ductus arteriosus from the left pulmonary artery into the arch of the aorta, so the descending aorta carries mixed blood. From the internal iliac arteries, two umbilical arteries take it back to the placenta.',
      focus: [
        'right-ventricle',
        'pulmonary-trunk',
        'ductus-arteriosus',
        'descending-aorta',
        'umbilical-arteries',
      ],
    },
    {
      id: 'birth',
      title: 'At birth',
      body: 'The lungs expand and the placenta is lost. The umbilical vein becomes the ligamentum teres, the ductus venosus the ligamentum venosum, the foramen ovale closes to leave the fossa ovalis, the ductus arteriosus becomes the ligamentum arteriosum, and the umbilical arteries become the medial umbilical ligaments.',
      focus: [
        'at-birth',
        'ligamentum-teres',
        'ligamentum-venosum',
        'fossa-ovalis',
        'ligamentum-arteriosum',
        'medial-umbilical-ligaments',
      ],
    },
    {
      id: 'development',
      title: 'Where the chambers come from',
      body: 'The smooth back of the right atrium comes from the right horn of the sinus venosus, the smooth left atrium from absorbed pulmonary veins, and the rough parts of both from the primitive atrium. The rough ventricles come from the primitive ventricle and bulbus cordis, and their smooth outflows from the conus. A spiral septum splits the truncus arteriosus into the aorta and pulmonary trunk. The heart is working by the end of the second month.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select each fetal channel to light it and its path, then turn on the defects to see which step went wrong.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ductus-venosus-bypass',
      prompt: 'The ductus venosus carries blood past:',
      options: [
        { id: 'liver', text: 'The liver' },
        { id: 'lungs', text: 'The lungs' },
        { id: 'right-ventricle', text: 'The right ventricle' },
        { id: 'kidneys', text: 'The kidneys' },
      ],
      answerId: 'liver',
      explanation: 'The foramen ovale and ductus arteriosus are the two shunts past the lungs.',
    },
    {
      id: 'ductus-arteriosus-joins',
      prompt: 'The ductus arteriosus joins:',
      options: [
        { id: 'lpa-arch', text: 'The left pulmonary artery to the arch of the aorta' },
        { id: 'rpa-arch', text: 'The right pulmonary artery to the arch of the aorta' },
        { id: 'trunk-svc', text: 'The pulmonary trunk to the superior vena cava' },
        { id: 'atria', text: 'The right atrium to the left atrium' },
      ],
      answerId: 'lpa-arch',
      explanation:
        'After birth it becomes the ligamentum arteriosum, round which the left recurrent laryngeal nerve hooks.',
    },
    {
      id: 'umbilical-vein-remnant',
      prompt: 'After birth the umbilical vein becomes:',
      options: [
        { id: 'teres', text: 'The ligamentum teres' },
        { id: 'venosum', text: 'The ligamentum venosum' },
        { id: 'medial-umbilical', text: 'The medial umbilical ligament' },
        { id: 'arteriosum', text: 'The ligamentum arteriosum' },
      ],
      answerId: 'teres',
      explanation:
        'The ductus venosus becomes the ligamentum venosum; the umbilical arteries the medial umbilical ligaments.',
    },
    {
      id: 'fallot-not',
      prompt: 'Which is not part of the tetralogy of Fallot?',
      options: [
        { id: 'asd', text: 'Atrial septal defect' },
        { id: 'vsd', text: 'Ventricular septal defect' },
        { id: 'override', text: 'Overriding aorta' },
        { id: 'stenosis', text: 'Pulmonary stenosis' },
      ],
      answerId: 'asd',
      explanation: 'The fourth part is right ventricular hypertrophy.',
    },
  ],
  cards: [
    {
      id: 'fetal-shunts',
      front: 'The five fetal channels?',
      back: 'Umbilical vein, ductus venosus, foramen ovale, ductus arteriosus, two umbilical arteries.',
    },
    {
      id: 'fetal-remnants',
      front: 'What each fetal channel becomes?',
      back: 'Ligamentum teres, ligamentum venosum, fossa ovalis, ligamentum arteriosum, medial umbilical ligaments.',
    },
    {
      id: 'fallot-tetralogy',
      front: 'Four parts of the tetralogy of Fallot?',
      back: 'Ventricular septal defect, overriding aorta, pulmonary stenosis, right ventricular hypertrophy.',
    },
    {
      id: 'interatrial-septum-origin',
      front: 'Origin of the fossa ovalis and its limbus?',
      back: 'Floor: septum primum. Limbus: the lower free edge of the septum secundum.',
    },
    {
      id: 'truncus-arteriosus',
      front: 'What divides the truncus arteriosus?',
      back: 'A spiral septum, into the ascending aorta and pulmonary trunk, which is why they twist round each other.',
    },
  ],
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 18 Pericardium and Heart', pages: '303–307' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 3 Thorax', pages: '197–199, 206–208' },
  ],
};
