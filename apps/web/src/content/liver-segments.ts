import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  LIVER_BELOW,
  LIVER_FRONT,
  LIVER_SEGMENTS,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 4 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const liverSegments: Topic = {
  slug: 'liver-segments',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The liver: blood, segments and lobules',
  summary:
    'The liver’s two inflows and one outflow, its lymph and nerves, the functional right and left livers and their eight segments, and the lobule and acinus under the microscope.',
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
      'Volume 2, Chapter 23 Spleen, Pancreas and Liver: liver, blood supply, segments and histology, pages 358 to 362',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: liver, segments of the liver, pages 330 to 331 and 339',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'The eight liver segments in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Hepatic veins, portal vein, hepatic artery, bile ducts and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'About 20% of the liver’s blood comes through the hepatic artery and 80% through the portal vein. Both divide into right and left branches before entering, then into segmental and interlobular branches in the portal canals, and their blood mixes in the sinusoids. The arterial branches are end arteries.',
    'Sinusoids drain to central veins, sublobular veins and the hepatic veins: an upper group of three large veins (right, middle and left) and a lower group of small veins from the right and caudate lobes, all opening straight into the IVC. They help hold the liver in place.',
    'The spread of the hepatic artery, portal vein and bile ducts divides functional right and left livers along a plane from the gallbladder fossa to the IVC, not along the falciform ligament. Right: anterior (V, VIII) and posterior (VI, VII) segments. Left: medial (IV, with the caudate lobe, I) and lateral (II, III). The hepatic veins run between segments.',
    'Lymph from the surface runs to the caval, hepatic, paracardial and coeliac nodes, some straight to the thoracic duct; deep lymph to nodes by the end of the IVC and the hepatic nodes. Nerves come from the hepatic plexus (sympathetic and vagal) and along its ligaments.',
    'Under the microscope: the classical lobule is drawn round a central vein with portal triads at its corners; the portal lobule is a triangle round one triad; the acinus is the tissue round a terminal hepatic arteriole between two central veins. Zone I, nearest the arteriole, gets the most oxygen; zone III, by the central vein, the least.',
  ],
  visual: {
    kind: 'path',
    // Left: blood in and out, lymph. Right: the eight segments in order.
    diagram: {
      width: 360,
      height: 540,
      nodes: [
        {
          id: 'liver-blood',
          label: 'Two in, one out',
          name: 'Blood flow through the liver: two inflows, one outflow',
          x: 180,
          y: 30,
        },
        {
          id: 'portal-vein',
          label: 'Portal vein: 80%',
          name: 'Portal vein, about 80% of the liver’s blood',
          x: 85,
          y: 100,
        },
        {
          id: 'hepatic-artery',
          label: 'Hepatic artery: 20%,\nend arteries',
          name: 'Hepatic artery, about 20%; its branches are end arteries',
          x: 85,
          y: 170,
        },
        {
          id: 'sinusoids',
          label: 'Mix in the\nsinusoids',
          name: 'Arterial and portal blood mix in the sinusoids',
          x: 85,
          y: 240,
        },
        {
          id: 'hepatic-veins',
          label: 'Right, middle, left\nhepatic veins',
          name: 'Right, middle and left hepatic veins, between the segments',
          x: 85,
          y: 310,
        },
        {
          id: 'inferior-vena-cava',
          label: 'Straight into\nthe IVC',
          name: 'Hepatic veins open straight into the inferior vena cava',
          x: 85,
          y: 380,
        },
        {
          id: 'functional-plane',
          label: 'Plane: gallbladder\nto IVC',
          name: 'Plane between functional right and left livers, from the gallbladder fossa to the IVC',
          x: 85,
          y: 450,
        },
        {
          id: 'liver-segment-1',
          label: 'I: caudate lobe',
          name: 'Segment I, the caudate lobe',
          x: 270,
          y: 100,
        },
        {
          id: 'liver-segment-2',
          label: 'II: left lateral,\nupper',
          name: 'Segment II, left lateral upper',
          x: 270,
          y: 158,
        },
        {
          id: 'liver-segment-3',
          label: 'III: left lateral,\nlower',
          name: 'Segment III, left lateral lower',
          x: 270,
          y: 216,
        },
        {
          id: 'liver-segment-4',
          label: 'IV: left medial',
          name: 'Segment IV, left medial (including the quadrate lobe)',
          x: 270,
          y: 274,
        },
        {
          id: 'liver-segment-5',
          label: 'V: right anterior,\nlower',
          name: 'Segment V, right anterior lower',
          x: 270,
          y: 332,
        },
        {
          id: 'liver-segment-6',
          label: 'VI: right posterior,\nlower',
          name: 'Segment VI, right posterior lower',
          x: 270,
          y: 390,
        },
        {
          id: 'liver-segment-7',
          label: 'VII: right posterior,\nupper',
          name: 'Segment VII, right posterior upper',
          x: 270,
          y: 448,
        },
        {
          id: 'liver-segment-8',
          label: 'VIII: right anterior,\nupper',
          name: 'Segment VIII, right anterior upper',
          x: 270,
          y: 506,
        },
      ],
      edges: [
        { from: 'liver-blood', to: 'portal-vein' },
        { from: 'portal-vein', to: 'hepatic-artery' },
        { from: 'hepatic-artery', to: 'sinusoids' },
        { from: 'sinusoids', to: 'hepatic-veins' },
        { from: 'hepatic-veins', to: 'inferior-vena-cava' },
        { from: 'inferior-vena-cava', to: 'functional-plane' },
        { from: 'liver-blood', to: 'liver-segment-1' },
        { from: 'liver-segment-1', to: 'liver-segment-2' },
        { from: 'liver-segment-2', to: 'liver-segment-3' },
        { from: 'liver-segment-3', to: 'liver-segment-4' },
        { from: 'liver-segment-4', to: 'liver-segment-5' },
        { from: 'liver-segment-5', to: 'liver-segment-6' },
        { from: 'liver-segment-6', to: 'liver-segment-7' },
        { from: 'liver-segment-7', to: 'liver-segment-8' },
      ],
    },
    lesions: [
      {
        id: 'resection',
        label: 'Removing segments',
        nodeIds: ['functional-plane', 'liver-segment-5', 'liver-segment-8', 'hepatic-veins'],
        explanation:
          'Each segment has its own portal and arterial branch and bile duct, with the hepatic veins between segments, so a surgeon can remove whole segments along these planes. Up to about 80% can be taken and the liver regrows within months; a donor’s right liver (V to VIII) can be transplanted.',
      },
      {
        id: 'secondaries',
        label: 'Secondaries in the liver',
        nodeIds: ['portal-vein', 'sinusoids'],
        explanation:
          'Blood from the gut reaches the liver through the portal vein, so cancers of the gut often seed secondary tumours in it.',
      },
      {
        id: 'tips',
        label: 'Shunt through the liver',
        nodeIds: ['hepatic-veins', 'portal-vein', 'inferior-vena-cava'],
        explanation:
          'For severe portal hypertension, a catheter is passed from the internal jugular vein through the venae cavae into a hepatic vein, then through the liver into a portal branch, and a stent joins them (TIPS).',
      },
    ],
    drill: [
      {
        id: 'blood',
        title: 'Blood in and out',
        hint: 'Two inflows and their shares, where they mix, the way out, then the dividing plane.',
        nodeIds: [
          'portal-vein',
          'hepatic-artery',
          'sinusoids',
          'hepatic-veins',
          'inferior-vena-cava',
          'functional-plane',
        ],
      },
      {
        id: 'segments',
        title: 'The eight segments',
        hint: 'From the caudate lobe, round the left liver, then the right.',
        nodeIds: [
          'liver-segment-1',
          'liver-segment-2',
          'liver-segment-3',
          'liver-segment-4',
          'liver-segment-5',
          'liver-segment-6',
          'liver-segment-7',
          'liver-segment-8',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts([
        ...ORGANS_SKELETON,
        ...LIVER_SEGMENTS,
        'gallbladder',
        'hepatic-ducts',
        'bile-duct',
        'inferior-vena-cava',
        'hepatic-veins',
        'abdominal-aorta',
        'portal-vein',
        'hepatic-artery',
      ]),
      traces: [],
      stops: [
        {
          ...LIVER_FRONT,
          title: 'The eight segments',
          description:
            'From the front: II and III left of the falciform ligament, IV between it and the gallbladder, V and VIII on the right in front, VI and VII behind them.',
        },
        {
          ...LIVER_BELOW,
          title: 'From below',
          description:
            'From below: the caudate lobe (I) behind the porta hepatis, IV with the quadrate lobe in front of it, and the portal vein and hepatic artery entering at the porta.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'inflow',
      title: 'Two inflows',
      body: 'The liver gets about 80% of its blood from the portal vein, full of what the gut has absorbed, and about 20% from the hepatic artery, rich in oxygen. Both divide into right and left branches at the porta, then into segmental branches and interlobular branches that run in the portal canals with the bile ductules. Their blood mixes in the sinusoids. The arterial branches do not join their neighbours: they are end arteries.',
      focus: ['portal-vein', 'hepatic-artery', 'sinusoids'],
    },
    {
      id: 'outflow',
      title: 'One outflow',
      body: 'Sinusoids drain into central veins, then sublobular veins, then the hepatic veins. The upper group, three large veins (right, middle and left), leave the top of the IVC groove and open straight into the IVC; a lower group of small veins from the right and caudate lobes open lower down. With the pressure of the abdomen, they help keep the liver in place.',
      focus: ['hepatic-veins', 'inferior-vena-cava'],
    },
    {
      id: 'segments',
      title: 'Functional right and left livers',
      body: 'Branching of the hepatic artery, portal vein and bile ducts divides the liver into right and left functional halves that do not match the anatomical lobes. The plane runs from the gallbladder fossa (the cystic notch) to the IVC groove, and through the middle of the caudate lobe behind. The right liver has an anterior sector (V below, VIII above) and a posterior sector (VI below, VII above); the left liver a medial part (IV, with the caudate lobe I) and a lateral part (II above, III below). The hepatic veins run between the segments.',
      focus: [
        'functional-plane',
        'liver-segment-1',
        'liver-segment-2',
        'liver-segment-3',
        'liver-segment-4',
        'liver-segment-5',
        'liver-segment-6',
        'liver-segment-7',
        'liver-segment-8',
      ],
    },
    {
      id: 'lymph-nerves',
      title: 'Lymph and nerves',
      body: 'Superficial lymphatics run under the peritoneum to the caval, hepatic, paracardial and coeliac nodes, and some from the coronary ligament go straight to the thoracic duct. Deep lymphatics end in nodes round the end of the IVC and in the hepatic nodes. Nerves come from the hepatic plexus, with sympathetic and vagal fibres, and through its peritoneal ligaments.',
      focus: [],
    },
    {
      id: 'microscopy',
      title: 'Lobule and acinus',
      body: 'The liver is wrapped in Glisson’s capsule. In the classical lobule, plates of liver cells radiate from a central vein, with portal triads (bile ductule, portal venule, hepatic arteriole) at the corners and sinusoids between the plates. The portal lobule is a triangle round one triad, its corners three central veins. The acinus, the working unit, is the tissue round a terminal hepatic arteriole between two central veins: zone I, near the arteriole, gets the most oxygen and the most toxins; zone III, by the central vein, the least oxygen.',
      focus: ['sinusoids'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, name each coloured segment; from below, find the caudate lobe and the vessels at the porta. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'lg-share',
      prompt: 'The portal vein brings the liver about what share of its blood?',
      options: [
        { id: 'eighty', text: '80%' },
        { id: 'twenty', text: '20%' },
        { id: 'half', text: '50%' },
        { id: 'all', text: '100%' },
      ],
      answerId: 'eighty',
      explanation: 'The hepatic artery brings the other 20%.',
    },
    {
      id: 'lg-plane',
      prompt: 'Functional right and left livers are divided by a plane through the:',
      options: [
        { id: 'gallbladder-ivc', text: 'Gallbladder fossa and the IVC groove' },
        { id: 'falciform', text: 'Falciform ligament' },
        { id: 'teres', text: 'Fissure for the ligamentum teres' },
        { id: 'porta', text: 'Porta hepatis only' },
      ],
      answerId: 'gallbladder-ivc',
      explanation:
        'The falciform ligament divides the anatomical lobes, not the functional livers.',
    },
    {
      id: 'lg-caudate',
      prompt: 'The caudate lobe is segment:',
      options: [
        { id: 'one', text: 'I' },
        { id: 'four', text: 'IV' },
        { id: 'seven', text: 'VII' },
        { id: 'two', text: 'II' },
      ],
      answerId: 'one',
      explanation: 'Segment IV includes the quadrate lobe.',
    },
    {
      id: 'lg-hepatic-veins',
      prompt: 'The hepatic veins end in the:',
      options: [
        { id: 'ivc', text: 'Inferior vena cava' },
        { id: 'portal', text: 'Portal vein' },
        { id: 'azygos', text: 'Azygos vein' },
        { id: 'right-atrium', text: 'Right atrium directly' },
      ],
      answerId: 'ivc',
      explanation: 'Three large and several small veins open straight into it behind the liver.',
    },
  ],
  cards: [
    {
      id: 'lg-blood',
      front: 'Blood supply of the liver?',
      back: 'Portal vein about 80%, hepatic artery about 20%; they mix in the sinusoids. Hepatic arterial branches are end arteries.',
    },
    {
      id: 'lg-veins',
      front: 'Hepatic veins?',
      back: 'Upper group: right, middle, left (large). Lower group: small veins from the right and caudate lobes. All open straight into the IVC; they run between segments.',
    },
    {
      id: 'lg-segments',
      front: 'Segments of the liver?',
      back: 'Right anterior V and VIII, right posterior VI and VII, left lateral II and III, left medial IV, and I (caudate lobe).',
    },
    {
      id: 'lg-lymph',
      front: 'Lymphatic drainage of the liver?',
      back: 'Superficial: caval, hepatic, paracardial and coeliac nodes, some straight to the thoracic duct. Deep: nodes at the end of the IVC and hepatic nodes.',
    },
    {
      id: 'lg-acinus',
      front: 'Liver acinus?',
      back: 'Tissue round a terminal hepatic arteriole between two central veins; zone I (near it) best oxygenated, zone III (near the central vein) least.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 23 Spleen, Pancreas and Liver',
      pages: '358–362',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '330–331, 339' },
  ],
};
