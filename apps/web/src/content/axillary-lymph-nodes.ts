import type { Topic } from '@medlearn/schemas';

import { bookSource } from './books';
import {
  AXILLA_BONES,
  LYMPH_GROUPS,
  SHOULDER_MODEL_CREDIT,
  SHOULDER_MODEL_SRC,
  shoulderParts,
} from './shoulder-3d';

// Upper limb batch 1 (Blueprint v0.5, Section 34). Facts in our own words; `reviewed: false`
// until a student checks the topic against the book pages.
export const axillaryLymphNodes: Topic = {
  slug: 'axillary-lymph-nodes',
  subjectSlug: 'anatomy',
  regions: ['upper-limb'],
  title: 'Axillary lymph nodes',
  summary: 'Five groups of nodes, what each drains, and why they matter in breast cancer.',
  estimatedMinutes: 10,
  reviewed: false,
  version: '0.1.0',
  sources: [
    {
      title: 'Written by the MedLearn OS content team',
      detail: 'In our own words from the standard books and open references; awaiting review',
      licence: 'All rights reserved',
    },
    bookSource('bd-chaurasia', 'Volume 1, Chapter 4 Axilla'),
    bookSource('grays-anatomy', 'Chapter 7 Upper Limb, axilla'),
    {
      title: 'TeachMeAnatomy: Lymphatic Drainage of the Upper Limb',
      url: 'https://teachmeanatomy.info/upper-limb/vessels/lymphatics/',
      licence: 'Cited, not copied',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail:
        'Bones, muscles and vessels in the 3D view; lymph node groups there are a MedLearn schematic',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'Five groups: pectoral (anterior), lateral (humeral), subscapular (posterior), central and apical.',
    'Pectoral nodes drain most of the breast; lateral nodes most of the upper limb; subscapular nodes the back of the chest and scapula.',
    'All three outer groups drain to the central group, then the apical group, then the subclavian lymph trunk.',
    'Surgical levels I, II and III lie lateral to, behind and medial to pectoralis minor.',
    'Clearing the axillary nodes risks lymphoedema of the arm and injury to the long thoracic and thoracodorsal nerves.',
  ],
  visual: {
    kind: 'path',
    diagram: {
      width: 360,
      height: 400,
      nodes: [
        {
          id: 'breast-chest',
          label: 'Breast and\nchest wall',
          name: 'Breast and front of the chest wall',
          x: 60,
          y: 30,
        },
        { id: 'upper-limb', label: 'Upper limb', name: 'Upper limb', x: 180, y: 30 },
        {
          id: 'scapular-region',
          label: 'Scapular\nregion',
          name: 'Back of the chest wall and scapular region',
          x: 300,
          y: 30,
        },
        {
          id: 'pectoral-group',
          label: 'Pectoral',
          name: 'Pectoral (anterior) group',
          x: 60,
          y: 110,
        },
        { id: 'lateral-group', label: 'Lateral', name: 'Lateral (humeral) group', x: 180, y: 110 },
        {
          id: 'subscapular-group',
          label: 'Subscapular',
          name: 'Subscapular (posterior) group',
          x: 300,
          y: 110,
        },
        { id: 'central-group', label: 'Central', name: 'Central group', x: 180, y: 190 },
        {
          id: 'deltopectoral',
          label: 'Delto-\npectoral',
          name: 'Deltopectoral (infraclavicular) nodes',
          x: 60,
          y: 270,
        },
        { id: 'apical-group', label: 'Apical', name: 'Apical group', x: 180, y: 270 },
        {
          id: 'lymph-trunk',
          label: 'Subclavian\ntrunk',
          name: 'Subclavian lymph trunk',
          x: 180,
          y: 350,
        },
      ],
      edges: [
        { from: 'breast-chest', to: 'pectoral-group' },
        { from: 'upper-limb', to: 'lateral-group' },
        { from: 'scapular-region', to: 'subscapular-group' },
        { from: 'pectoral-group', to: 'central-group' },
        { from: 'lateral-group', to: 'central-group' },
        { from: 'subscapular-group', to: 'central-group' },
        { from: 'central-group', to: 'apical-group' },
        { from: 'deltopectoral', to: 'apical-group' },
        { from: 'apical-group', to: 'lymph-trunk' },
      ],
    },
    lesions: [
      {
        id: 'breast-cancer',
        label: 'Breast cancer spread',
        nodeIds: ['pectoral-group'],
        explanation:
          'Breast cancer usually reaches the pectoral nodes first, then the central and apical groups. Hard or fixed nodes in the axilla suggest spread, and how many nodes are involved is a key guide to prognosis.',
      },
      {
        id: 'clearance',
        label: 'Axillary clearance',
        nodeIds: ['pectoral-group', 'lateral-group', 'subscapular-group', 'central-group'],
        explanation:
          'Removing the axillary nodes cuts the main lymph route from the arm, which can leave it swollen for life (lymphoedema). The long thoracic nerve on the medial wall and the thoracodorsal nerve on the posterior wall run close to the nodes and must be protected.',
      },
    ],
    drill: [
      {
        id: 'regions',
        title: 'Where lymph comes from',
        hint: 'The front of the chest with the breast, the arm, and the back.',
        nodeIds: ['breast-chest', 'upper-limb', 'scapular-region'],
      },
      {
        id: 'outer-groups',
        title: 'Three outer groups',
        hint: 'One group for each region, on the medial, lateral and posterior walls.',
        nodeIds: ['pectoral-group', 'lateral-group', 'subscapular-group'],
      },
      {
        id: 'inner-groups',
        title: 'Central and apical',
        hint: 'The outer groups meet in the middle; everything ends at the apex, joined by nodes along the cephalic vein.',
        nodeIds: ['central-group', 'apical-group', 'deltopectoral'],
      },
      {
        id: 'trunk',
        title: 'Out of the axilla',
        hint: 'The apical nodes form one lymph trunk.',
        nodeIds: ['lymph-trunk'],
      },
    ],
    model3d: {
      src: SHOULDER_MODEL_SRC,
      credit: `${SHOULDER_MODEL_CREDIT} Lymph node groups: MedLearn schematic placed along the vessels they follow, not yet medically reviewed.`,
      parts: shoulderParts([
        ...AXILLA_BONES,
        'pec-minor',
        'axillary-artery',
        'lateral-thoracic-artery',
        'subscapular-artery',
        'thoracodorsal-artery',
        'subclavian-vein',
        'axillary-vein',
        'cephalic-vein',
      ]),
      traces: [
        { id: 'pectoral-group', kind: 'lymph', paths: [LYMPH_GROUPS.pectoral] },
        { id: 'lateral-group', kind: 'lymph', paths: [LYMPH_GROUPS.lateral] },
        { id: 'subscapular-group', kind: 'lymph', paths: [LYMPH_GROUPS.subscapular] },
        { id: 'central-group', kind: 'lymph', paths: [LYMPH_GROUPS.central] },
        { id: 'apical-group', kind: 'lymph', paths: [LYMPH_GROUPS.apical] },
        { id: 'deltopectoral', kind: 'lymph', paths: [LYMPH_GROUPS.deltopectoral] },
        { id: 'lymph-trunk', kind: 'lymph', paths: [LYMPH_GROUPS.trunk] },
      ],
      stops: [
        {
          id: 'overview',
          title: 'The five groups',
          description:
            'Pectoral nodes on the medial wall, lateral nodes by the axillary vein, subscapular nodes on the posterior wall, central nodes in the middle and apical nodes at the apex.',
          target: [-120, -95, 1285],
          position: [-260, -520, 1360],
        },
        {
          id: 'levels',
          title: 'Levels and pectoralis minor',
          description:
            'Pectoralis minor sorts the nodes into surgical levels: level I lateral to it, level II behind it, level III medial to it at the apex.',
          target: [-110, -110, 1280],
          position: [-150, -420, 1300],
        },
        {
          id: 'apex',
          title: 'Out at the apex',
          description:
            'The apical nodes lie beside the axillary vein at the apex; their subclavian trunk runs medially along the subclavian vein.',
          target: [-70, -110, 1335],
          position: [-160, -380, 1440],
        },
      ],
    },
  },
  lesson: [
    {
      id: 'five-groups',
      title: 'Five groups',
      body: 'The axillary lymph nodes lie in the fat of the axilla in five groups: pectoral, lateral, subscapular, central and apical. Each of the three outer groups collects lymph from one region.',
      focus: [
        'pectoral-group',
        'lateral-group',
        'subscapular-group',
        'central-group',
        'apical-group',
      ],
    },
    {
      id: 'pectoral',
      title: 'Pectoral (anterior) group',
      body: 'On the medial wall, along the lower border of pectoralis minor. It drains the front of the chest wall and most of the breast, so it is the first stop for breast cancer.',
      focus: ['breast-chest', 'pectoral-group'],
    },
    {
      id: 'lateral',
      title: 'Lateral (humeral) group',
      body: 'On the lateral wall, behind the axillary vein. It drains most of the upper limb.',
      focus: ['upper-limb', 'lateral-group'],
    },
    {
      id: 'subscapular',
      title: 'Subscapular (posterior) group',
      body: 'On the posterior wall, along the posterior axillary fold and the subscapular vessels. It drains the back of the chest wall and the scapular region.',
      focus: ['scapular-region', 'subscapular-group'],
    },
    {
      id: 'central-apical',
      title: 'Central, then apical',
      body: 'The three outer groups drain to the central group, deep to pectoralis minor near the base of the axilla. The central group drains to the apical group at the apex, which also receives the deltopectoral nodes along the cephalic vein. The apical nodes form the subclavian lymph trunk, which ends in the thoracic duct on the left and the right lymphatic duct on the right.',
      focus: ['central-group', 'apical-group', 'deltopectoral', 'lymph-trunk'],
    },
    {
      id: 'levels',
      title: 'Surgical levels',
      body: 'Surgeons group the nodes by pectoralis minor: level I lateral to it (pectoral, lateral and subscapular groups), level II behind it (central group), level III medial to it (apical group). Breast cancer usually climbs from level I towards level III.',
      focus: [],
    },
    {
      id: 'explore',
      title: 'Trace it yourself',
      body: 'Select any group to see where its lymph comes from and where it goes. Then turn on a condition to see which groups it involves.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'nodes-breast-first',
      prompt: 'Lymph from most of the breast reaches which axillary group first?',
      options: [
        { id: 'pectoral', text: 'Pectoral (anterior) group' },
        { id: 'lateral', text: 'Lateral (humeral) group' },
        { id: 'subscapular', text: 'Subscapular (posterior) group' },
        { id: 'apical', text: 'Apical group' },
      ],
      answerId: 'pectoral',
      explanation:
        'The pectoral group on the medial wall drains the front of the chest wall and most of the breast, so it is the first to enlarge in breast cancer.',
    },
    {
      id: 'nodes-upper-limb',
      prompt: 'Which axillary group drains most of the upper limb?',
      options: [
        { id: 'lateral', text: 'Lateral (humeral) group' },
        { id: 'pectoral', text: 'Pectoral (anterior) group' },
        { id: 'subscapular', text: 'Subscapular (posterior) group' },
        { id: 'central', text: 'Central group' },
      ],
      answerId: 'lateral',
      explanation:
        'The lateral group lies behind the axillary vein on the lateral wall and receives most of the lymph from the arm.',
    },
    {
      id: 'nodes-final-group',
      prompt: 'Lymph from every axillary group finally passes through which group?',
      options: [
        { id: 'apical', text: 'Apical group' },
        { id: 'central', text: 'Central group' },
        { id: 'pectoral', text: 'Pectoral group' },
      ],
      answerId: 'apical',
      explanation:
        'The outer groups drain to the central group and the central group to the apical group, which forms the subclavian lymph trunk.',
    },
    {
      id: 'nodes-level-two',
      prompt: 'Level II axillary nodes lie:',
      options: [
        { id: 'behind', text: 'Behind pectoralis minor' },
        { id: 'lateral', text: 'Lateral to pectoralis minor' },
        { id: 'medial', text: 'Medial to pectoralis minor' },
      ],
      answerId: 'behind',
      explanation:
        'Level I is lateral to pectoralis minor, level II behind it (the central group) and level III medial to it (the apical group).',
    },
  ],
  cards: [
    {
      id: 'axillary-node-groups',
      front: 'Five groups of axillary lymph nodes?',
      back: 'Pectoral (anterior), lateral (humeral), subscapular (posterior), central, apical.',
    },
    {
      id: 'central-nodes-drain',
      front: 'Where do the central axillary nodes drain?',
      back: 'To the apical nodes.',
    },
    {
      id: 'apical-nodes-drain',
      front: 'What do the apical axillary nodes form?',
      back: 'The subclavian lymph trunk: to the thoracic duct on the left, the right lymphatic duct on the right.',
    },
    {
      id: 'axillary-node-levels',
      front: 'Axillary node levels by pectoralis minor?',
      back: 'Level I lateral to it, level II behind it, level III medial to it.',
    },
    {
      id: 'clearance-complication',
      front: 'Main long-term complication of clearing the axillary nodes?',
      back: 'Lymphoedema of the arm.',
    },
  ],
  // Chapter-level until a reviewer adds the pages for this section.
  readIn: [
    { bookId: 'bd-chaurasia', chapter: 'Chapter 4 Axilla' },
    { bookId: 'grays-anatomy', chapter: 'Chapter 7 Upper Limb' },
  ],
};
