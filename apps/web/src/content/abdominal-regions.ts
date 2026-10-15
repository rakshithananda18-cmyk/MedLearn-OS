import type { Topic } from '@medlearn/schemas';

import {
  ABDOMEN_FRONT,
  ABDOMINAL_SKELETON,
  ABDOMINAL_WALL_MODEL_CREDIT,
  ABDOMINAL_WALL_MODEL_SRC,
  abdominalWallParts,
  LUMBAR_SIDE,
  NINE_REGIONS,
  REGION_LINES,
} from './abdominal-wall-3d';
import { bookSource } from './books';

// Abdomen batch 1 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const abdominalRegions: Topic = {
  slug: 'abdominal-regions',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Landmarks, planes and the nine regions of the abdomen',
  summary:
    'The bony and soft landmarks of the abdominal wall, the planes drawn between them with the vertebral level of each, and the nine regions they mark out, each with what lies under it.',
  estimatedMinutes: 11,
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
      'Volume 2, Chapter 16 Anterior Abdominal Wall: surface landmarks, pages 233 to 234; Chapter 18: nine regions, page 270; Chapter 35: planes and regions, page 501',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: four-quadrant and nine-region patterns, pages 273 to 274',
    ),
    {
      title: 'Z-Anatomy',
      detail: 'The nine regions as patches of skin in the 3D view',
      url: 'https://github.com/LluisV/Z-Anatomy',
      licence: 'CC BY-SA 4.0',
    },
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The front wall runs from the xiphoid process (level of T9) to the pubic symphysis; the costal margins (the seventh to tenth cartilages) bound it above at the sides, the iliac crests and inguinal ligaments below.',
    'The transpyloric plane, midway between the suprasternal notch and the pubic symphysis, crosses the tips of the ninth costal cartilages and L1: the pylorus, the hila of the kidneys, the fundus of the gallbladder, the neck of the pancreas and the origins of the coeliac trunk and superior mesenteric artery.',
    'The subcostal plane, through the lowest points of the costal margins (the tenth cartilages), crosses L3; the transtubercular plane, through the tubercles of the iliac crests, crosses L5. The umbilicus lies at the disc between L3 and L4 and the highest points of the iliac crests at L4.',
    'BD divides the abdomen into nine regions with the transpyloric and transtubercular planes and the right and left lateral vertical planes; Gray’s uses the subcostal and intertubercular planes with the midclavicular lines. The middle column is epigastric, umbilical and hypogastric; each side is hypochondriac, lumbar and iliac.',
    'The liver fills the right hypochondrium; stomach and spleen the left; the caecum and appendix lie in the right iliac fossa and the sigmoid colon in the left.',
  ],
  visual: {
    kind: 'path',
    // Top: the horizontal planes and landmarks with their vertebral levels. Below: the nine
    // regions laid out as they lie on the body (the student's right on the left of the grid).
    diagram: {
      width: 360,
      height: 430,
      nodes: [
        {
          id: 'abdominal-landmarks',
          label: 'Planes and\nlandmarks',
          name: 'Planes and landmarks of the abdominal wall',
          x: 180,
          y: 30,
        },
        {
          id: 'transpyloric-plane',
          label: 'Transpyloric:\nL1',
          name: 'Transpyloric plane: tips of the ninth costal cartilages, L1',
          x: 75,
          y: 95,
        },
        {
          id: 'subcostal-plane',
          label: 'Subcostal:\nL3',
          name: 'Subcostal plane: lowest points of the costal margins, L3',
          x: 180,
          y: 95,
        },
        {
          id: 'transtubercular-plane',
          label: 'Trans-\ntubercular: L5',
          name: 'Transtubercular plane: tubercles of the iliac crests, L5',
          x: 285,
          y: 95,
        },
        {
          id: 'xiphoid-level',
          label: 'Xiphoid: T9',
          name: 'Xiphoid process at the level of T9',
          x: 75,
          y: 160,
        },
        {
          id: 'umbilicus-level',
          label: 'Umbilicus:\nL3–L4 disc',
          name: 'Umbilicus at the disc between L3 and L4',
          x: 180,
          y: 160,
        },
        {
          id: 'iliac-crest-level',
          label: 'Crest top: L4',
          name: 'Highest point of the iliac crest at L4',
          x: 285,
          y: 160,
        },
        {
          id: 'lateral-planes',
          label: 'Lateral vertical planes',
          name: 'Right and left lateral vertical planes, through the midinguinal points',
          x: 180,
          y: 200,
        },
        {
          id: 'right-hypochondriac-region',
          label: 'Right hypo-\nchondrium',
          name: 'Right hypochondriac region: liver, gallbladder',
          x: 75,
          y: 240,
        },
        {
          id: 'epigastric-region',
          label: 'Epigastric',
          name: 'Epigastric region: stomach, duodenum, pancreas',
          x: 180,
          y: 240,
        },
        {
          id: 'left-hypochondriac-region',
          label: 'Left hypo-\nchondrium',
          name: 'Left hypochondriac region: stomach, spleen, left colic flexure',
          x: 285,
          y: 240,
        },
        {
          id: 'right-lumbar-region',
          label: 'Right\nlumbar',
          name: 'Right lumbar region: right kidney and ureter, ascending colon',
          x: 75,
          y: 305,
        },
        {
          id: 'umbilical-region',
          label: 'Umbilical',
          name: 'Umbilical region: aorta, inferior vena cava, coils of small intestine',
          x: 180,
          y: 305,
        },
        {
          id: 'left-lumbar-region',
          label: 'Left\nlumbar',
          name: 'Left lumbar region: left kidney and ureter, descending colon',
          x: 285,
          y: 305,
        },
        {
          id: 'right-iliac-region',
          label: 'Right\niliac',
          name: 'Right iliac region: caecum, appendix',
          x: 75,
          y: 370,
        },
        {
          id: 'hypogastric-region',
          label: 'Hypogastric',
          name: 'Hypogastric region: bladder when full, uterus when enlarged',
          x: 180,
          y: 370,
        },
        {
          id: 'left-iliac-region',
          label: 'Left\niliac',
          name: 'Left iliac region: sigmoid colon',
          x: 285,
          y: 370,
        },
      ],
      edges: [
        { from: 'abdominal-landmarks', to: 'transpyloric-plane' },
        { from: 'abdominal-landmarks', to: 'subcostal-plane' },
        { from: 'abdominal-landmarks', to: 'transtubercular-plane' },
        { from: 'transpyloric-plane', to: 'xiphoid-level' },
        { from: 'subcostal-plane', to: 'umbilicus-level' },
        { from: 'transtubercular-plane', to: 'iliac-crest-level' },
        { from: 'lateral-planes', to: 'epigastric-region' },
        { from: 'right-hypochondriac-region', to: 'epigastric-region' },
        { from: 'epigastric-region', to: 'left-hypochondriac-region' },
        { from: 'right-lumbar-region', to: 'umbilical-region' },
        { from: 'umbilical-region', to: 'left-lumbar-region' },
        { from: 'right-iliac-region', to: 'hypogastric-region' },
        { from: 'hypogastric-region', to: 'left-iliac-region' },
        { from: 'epigastric-region', to: 'umbilical-region' },
        { from: 'umbilical-region', to: 'hypogastric-region' },
      ],
    },
    lesions: [
      {
        id: 'gallbladder-point',
        label: 'Gallbladder tenderness',
        nodeIds: ['transpyloric-plane', 'right-hypochondriac-region'],
        explanation:
          'The fundus of the gallbladder lies where the right linea semilunaris meets the costal margin, at the tip of the ninth costal cartilage on the transpyloric plane. An inflamed gallbladder is tender exactly there.',
      },
      {
        id: 'appendix-point',
        label: 'Appendix pain',
        nodeIds: ['right-iliac-region', 'transtubercular-plane'],
        explanation:
          'The ileocaecal orifice lies where the right lateral vertical plane crosses the transtubercular plane, and the base of the appendix (McBurney’s point) 2 cm below it, in the right iliac region: the classic spot of tenderness in appendicitis.',
      },
    ],
    drill: [
      {
        id: 'levels',
        title: 'Planes and levels',
        hint: 'Three planes, then three landmarks, each with its vertebra.',
        nodeIds: [
          'transpyloric-plane',
          'subcostal-plane',
          'transtubercular-plane',
          'xiphoid-level',
          'umbilicus-level',
          'iliac-crest-level',
        ],
      },
      {
        id: 'regions',
        title: 'The nine regions',
        hint: 'Row by row, from the student’s right: hypochondriac, lumbar, iliac at the sides.',
        nodeIds: [
          'right-hypochondriac-region',
          'epigastric-region',
          'left-hypochondriac-region',
          'right-lumbar-region',
          'umbilical-region',
          'left-lumbar-region',
          'right-iliac-region',
          'hypogastric-region',
          'left-iliac-region',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_WALL_MODEL_SRC,
      credit: ABDOMINAL_WALL_MODEL_CREDIT,
      parts: abdominalWallParts([
        ...NINE_REGIONS,
        ...ABDOMINAL_SKELETON,
        'linea-alba',
        'inguinal-ligament',
      ]),
      traces: REGION_LINES,
      stops: [
        {
          ...ABDOMEN_FRONT,
          description:
            'The nine regions over the skeleton: the costal margins and xiphoid above, the iliac crests, inguinal ligaments and pubis below. Pick a region to see what lies under it.',
        },
        {
          ...LUMBAR_SIDE,
          id: 'levels-side',
          title: 'Levels from the side',
          description:
            'Count down the lumbar vertebrae from the side: L1 at the transpyloric plane, L3 at the subcostal plane, L4 at the tops of the iliac crests, L5 at the transtubercular plane.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'landmarks',
      title: 'Landmarks you can feel',
      body: 'The wall runs from the xiphoid process, at T9, down the midline groove of the linea alba to the pubic symphysis. Above at the sides lie the costal margins, the seventh to tenth cartilages, lowest at the tenth in the midaxillary line. Below are the iliac crests, the anterior superior iliac spines, the inguinal ligaments from spine to pubic tubercle, and in the male the spermatic cord, with the firm ductus deferens in its back. A curved groove, the linea semilunaris, marks the edge of rectus from the ninth costal cartilage to the pubic tubercle.',
      focus: ['abdominal-landmarks', 'xiphoid-level'],
    },
    {
      id: 'transpyloric',
      title: 'The transpyloric plane',
      body: 'Midway between the suprasternal notch and the pubic symphysis, about a hand’s breadth below the xiphisternal joint, it crosses the tips of the ninth costal cartilages in front and L1 behind. On it lie the pylorus, the hila of the kidneys, the fundus of the gallbladder, the neck of the pancreas and the origins of the coeliac trunk and superior mesenteric artery.',
      focus: ['transpyloric-plane'],
    },
    {
      id: 'lower-planes',
      title: 'Lower planes and levels',
      body: 'The subcostal plane, through the lowest points of the costal margins, crosses L3. The umbilicus sits at the disc between L3 and L4 (lower in infants and in a sagging abdomen), the highest points of the iliac crests at L4, and the transtubercular plane, through the tubercles of the crests 5 cm behind the anterior superior spines, at L5.',
      focus: ['subcostal-plane', 'umbilicus-level', 'iliac-crest-level', 'transtubercular-plane'],
    },
    {
      id: 'nine',
      title: 'Nine regions',
      body: 'Two horizontal and two vertical planes make a noughts and crosses grid. BD uses the transpyloric and transtubercular planes with the right and left lateral vertical planes; Gray’s uses the subcostal and intertubercular planes with the midclavicular lines. The middle column, from above, is epigastric, umbilical and hypogastric; each side column is hypochondriac, lumbar and iliac.',
      focus: [
        'subcostal-plane',
        'transtubercular-plane',
        'lateral-planes',
        'epigastric-region',
        'umbilical-region',
        'hypogastric-region',
      ],
    },
    {
      id: 'contents',
      title: 'What lies in each',
      body: 'Right hypochondrium: liver and gallbladder. Left hypochondrium: stomach, spleen and the left colic flexure. Epigastric: stomach, duodenum and pancreas. Right and left lumbar: the kidneys and ureters, with the ascending and descending colon. Umbilical: aorta, inferior vena cava and coils of small intestine. Right iliac: caecum and appendix. Left iliac: sigmoid colon. Hypogastric: the bladder when full.',
      focus: [
        'right-hypochondriac-region',
        'left-hypochondriac-region',
        'right-iliac-region',
        'left-iliac-region',
      ],
    },
    {
      id: 'explore',
      title: 'Find them yourself',
      body: 'Pick each region on the model, then count the vertebrae from the side. Turn on a problem to see where two classic tender points lie.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'regions-transpyloric',
      prompt: 'The transpyloric plane lies at the level of:',
      options: [
        { id: 'l1', text: 'L1' },
        { id: 'l3', text: 'L3' },
        { id: 't9', text: 'T9' },
        { id: 'l5', text: 'L5' },
      ],
      answerId: 'l1',
      explanation:
        'It crosses the tips of the ninth costal cartilages and the lower part of the body of L1.',
    },
    {
      id: 'regions-subcostal',
      prompt:
        'The subcostal plane passes through the lowest part of the costal margin, formed by the:',
      options: [
        { id: 'tenth', text: 'Tenth costal cartilage, at L3' },
        { id: 'ninth', text: 'Ninth costal cartilage, at L1' },
        { id: 'twelfth', text: 'Twelfth rib, at L2' },
        { id: 'seventh', text: 'Seventh costal cartilage, at T9' },
      ],
      answerId: 'tenth',
      explanation: 'The margin is lowest at the tenth cartilage in the midaxillary line.',
    },
    {
      id: 'regions-umbilicus',
      prompt: 'In a healthy adult the umbilicus lies at:',
      options: [
        { id: 'l3-l4', text: 'The disc between L3 and L4' },
        { id: 'l1', text: 'L1' },
        { id: 'l5', text: 'L5' },
        { id: 't10', text: 'The body of T10' },
      ],
      answerId: 'l3-l4',
      explanation: 'Its skin is supplied by T10, but it lies at the L3 to L4 disc.',
    },
    {
      id: 'regions-on-plane',
      prompt: 'Which of these does not lie on the transpyloric plane?',
      options: [
        { id: 'appendix', text: 'The base of the appendix' },
        { id: 'pylorus', text: 'The pylorus' },
        { id: 'hila', text: 'The hila of the kidneys' },
        { id: 'pancreas', text: 'The neck of the pancreas' },
      ],
      answerId: 'appendix',
      explanation:
        'The appendix lies low in the right iliac region, 2 cm below the ileocaecal orifice.',
    },
    {
      id: 'regions-spleen',
      prompt: 'The spleen lies mainly in the:',
      options: [
        { id: 'left-hypo', text: 'Left hypochondrium' },
        { id: 'epigastric', text: 'Epigastric region' },
        { id: 'left-lumbar', text: 'Left lumbar region' },
        { id: 'umbilical', text: 'Umbilical region' },
      ],
      answerId: 'left-hypo',
      explanation: 'With the stomach and the left colic flexure.',
    },
  ],
  cards: [
    {
      id: 'regions-planes-levels',
      front: 'Vertebral levels of the transpyloric, subcostal and transtubercular planes?',
      back: 'L1, L3 and L5.',
    },
    {
      id: 'regions-transpyloric-structures',
      front: 'What lies on the transpyloric plane?',
      back: 'Pylorus, hila of the kidneys, fundus of the gallbladder, neck of the pancreas, origins of the coeliac trunk and superior mesenteric artery.',
    },
    {
      id: 'regions-nine',
      front: 'The nine regions, middle column and side columns?',
      back: 'Middle: epigastric, umbilical, hypogastric. Each side: hypochondriac, lumbar, iliac.',
    },
    {
      id: 'regions-bd-grays',
      front: 'Planes that make the nine regions in BD, and in Gray’s?',
      back: 'BD: transpyloric and transtubercular, with right and left lateral vertical planes. Gray’s: subcostal and intertubercular, with the midclavicular lines.',
    },
    {
      id: 'regions-landmark-levels',
      front: 'Levels of the xiphoid, umbilicus and highest point of the iliac crest?',
      back: 'Xiphoid T9; umbilicus at the L3 to L4 disc; iliac crest top at L4.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 16 Anterior Abdominal Wall, and Chapter 18 (nine regions)',
      pages: '233–234, 270',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '273–274' },
  ],
};
