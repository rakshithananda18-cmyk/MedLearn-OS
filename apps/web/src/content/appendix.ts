import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  ILEOCAECAL_VIEW,
  ORGANS_FRONT,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const appendix: Topic = {
  slug: 'appendix',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'The vermiform appendix',
  summary:
    'Where the appendix starts and the many places its tip can lie, how to find its base on the skin, its mesoappendix, end artery, lymph and nerves, and why appendicitis behaves as it does.',
  estimatedMinutes: 12,
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
      'Volume 2, Chapter 20 Small and Large Intestines: vermiform appendix, pages 316 to 319',
    ),
    bookSource('grays-anatomy', 'Chapter 4 Abdomen: cecum and appendix, pages 316 to 319'),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Appendix, caecum, mesoappendix, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'A narrow, worm-like tube from the back inner wall of the caecum, about 2 cm below the ileocaecal opening: on average 9 cm long (2 to 20 cm), about 5 mm wide, longer in children; its lumen may close off after middle age.',
    'Its base is fixed where the three taeniae coli meet; its tip can lie anywhere, read like a clock face. Retrocaecal or retrocolic (12 o’clock) is commonest, about 65%; pelvic (4 o’clock) next, about 30%; then splenic in front of or behind the ileum (2), promonteric (3), subcaecal (6) and paracolic (11).',
    'Its base lies 2 cm below the point where the transtubercular plane crosses the right lateral plane. McBurney’s point, a third of the way along the line from the right anterior superior iliac spine to the umbilicus, marks it roughly and is the point of greatest tenderness in appendicitis.',
    'The mesoappendix, a small triangle from the back of the lower end of the mesentery, carries the appendicular artery (from the lower division of the ileocolic), which passes behind the ileum and runs in the fold’s free edge to the tip. It is an end artery.',
    'Its pain fibres reach the cord at T10 (sympathetic, through the coeliac plexus), the segment that supplies the skin of the umbilicus, so early appendicitis hurts round the navel; pain moves to the right iliac fossa once the parietal peritoneum is inflamed.',
  ],
  visual: {
    kind: 'path',
    // Left: where it lies and how to find it. Right: its supply and its pain.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'appendix',
          label: 'Vermiform appendix',
          name: 'Vermiform appendix, about 9 cm',
          x: 180,
          y: 30,
        },
        {
          id: 'base',
          label: 'Base: 2 cm below\nileocaecal opening',
          name: 'Base on the back inner wall of the caecum, 2 cm below the ileocaecal opening',
          x: 85,
          y: 100,
        },
        {
          id: 'taeniae-coli',
          label: 'Where the taeniae\nmeet',
          name: 'The three taeniae coli converge on its base',
          x: 85,
          y: 165,
        },
        {
          id: 'retrocaecal',
          label: 'Retrocaecal:\ncommonest, 65%',
          name: 'Retrocaecal or retrocolic, 12 o’clock, about 65%',
          x: 85,
          y: 230,
        },
        {
          id: 'pelvic',
          label: 'Pelvic: next, 30%',
          name: 'Pelvic, 4 o’clock, about 30%',
          x: 85,
          y: 290,
        },
        {
          id: 'other-positions',
          label: 'Splenic, subcaecal,\npromonteric',
          name: 'Splenic (pre- or postileal), promonteric, subcaecal and paracolic',
          x: 85,
          y: 350,
        },
        {
          id: 'mcburneys-point',
          label: 'McBurney’s point',
          name: 'McBurney’s point: lateral third of the line from the right ASIS to the umbilicus',
          x: 85,
          y: 410,
        },
        {
          id: 'mesoappendix',
          label: 'Mesoappendix',
          name: 'Mesoappendix, from the back of the lower end of the mesentery',
          x: 275,
          y: 100,
        },
        {
          id: 'ileocolic-artery',
          label: 'Ileocolic artery,\nlower division',
          name: 'Ileocolic artery, lower division',
          x: 275,
          y: 165,
        },
        {
          id: 'appendicular-artery',
          label: 'Appendicular:\nan end artery',
          name: 'Appendicular artery, an end artery, in the free edge of the mesoappendix',
          x: 275,
          y: 230,
        },
        {
          id: 'ileocolic-nodes',
          label: 'Lymph: ileocolic\nnodes',
          name: 'Lymph to the ileocolic nodes, some through appendicular nodes',
          x: 275,
          y: 290,
        },
        {
          id: 'referred-pain',
          label: 'Early pain at the\numbilicus, T10',
          name: 'Early pain referred to the umbilicus through T10',
          x: 275,
          y: 350,
        },
        {
          id: 'lymphoid-tissue',
          label: 'Lymphoid follicles:\nabdominal tonsil',
          name: 'Lymphoid follicles in the submucosa: the abdominal tonsil',
          x: 275,
          y: 410,
        },
      ],
      edges: [
        { from: 'appendix', to: 'base' },
        { from: 'base', to: 'taeniae-coli' },
        { from: 'taeniae-coli', to: 'retrocaecal' },
        { from: 'retrocaecal', to: 'pelvic' },
        { from: 'pelvic', to: 'other-positions' },
        { from: 'other-positions', to: 'mcburneys-point' },
        { from: 'appendix', to: 'mesoappendix' },
        { from: 'mesoappendix', to: 'ileocolic-artery' },
        { from: 'ileocolic-artery', to: 'appendicular-artery' },
        { from: 'appendicular-artery', to: 'ileocolic-nodes' },
        { from: 'ileocolic-nodes', to: 'referred-pain' },
        { from: 'referred-pain', to: 'lymphoid-tissue' },
      ],
    },
    lesions: [
      {
        id: 'appendicitis',
        label: 'Acute appendicitis',
        nodeIds: ['referred-pain', 'mcburneys-point', 'appendicular-artery', 'lymphoid-tissue'],
        explanation:
          'A faecolith or swollen lymphoid tissue blocks the narrow lumen and infection follows. Pain starts round the umbilicus, then settles in the right iliac fossa, with tenderness at McBurney’s point, guarding and rebound. With an end artery, a clot in it leaves the appendix to turn gangrenous and burst.',
      },
      {
        id: 'position-signs',
        label: 'Signs from its position',
        nodeIds: ['retrocaecal', 'pelvic'],
        explanation:
          'A retrocaecal appendix lies on the psoas: extending the hip stretches the muscle and hurts. A pelvic appendix lies against the obturator internus: flexing and medially rotating the hip hurts. A preileal one is the most dangerous, free to spread infection.',
      },
    ],
    drill: [
      {
        id: 'position',
        title: 'Where it lies',
        hint: 'Its base and how to find it at operation, the positions of its tip, then on the skin.',
        nodeIds: [
          'base',
          'taeniae-coli',
          'retrocaecal',
          'pelvic',
          'other-positions',
          'mcburneys-point',
        ],
      },
      {
        id: 'supply',
        title: 'Supply and pain',
        hint: 'Its fold and artery, lymph, the path of its pain, and its lymphoid wall.',
        nodeIds: [
          'mesoappendix',
          'ileocolic-artery',
          'appendicular-artery',
          'ileocolic-nodes',
          'referred-pain',
          'lymphoid-tissue',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts(
        [
          ...ORGANS_SKELETON,
          'ileum',
          'ascending-colon',
          'appendix',
          'taeniae-coli',
          'mesoappendix',
          'kidneys',
          'ureters',
          'urinary-bladder',
          'rectum',
          'abdominal-aorta',
          'inferior-vena-cava',
          'superior-mesenteric-artery',
          'ileocolic-artery',
          'appendicular-artery',
        ],
        ['ileum'],
      ),
      traces: [],
      stops: [
        {
          ...ILEOCAECAL_VIEW,
          title: 'The appendix in place',
          description:
            'From the back inner side of the caecum, where the taeniae meet, the appendix hangs on its mesoappendix, with the appendicular artery in the fold’s free edge.',
        },
        {
          ...ORGANS_FRONT,
          title: 'In the right iliac fossa',
          description:
            'Low on the right, over the iliacus and psoas, with the pelvic brim just below: its tip may lie behind the caecum, over the brim into the pelvis, or towards the midline.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'shape',
      title: 'A narrow blind tube',
      body: 'The appendix leaves the back inner wall of the caecum about 2 cm below the ileocaecal opening. It averages 9 cm (anything from 2 to 20 cm), is about 5 mm wide, is longer in children, and its narrow lumen may close after middle age. Inside, a faint fold may guard its opening. At operation, follow any taenia down the caecum: all three meet at its base.',
      focus: ['base', 'taeniae-coli'],
    },
    {
      id: 'positions',
      title: 'Where its tip lies',
      body: 'The base is fixed; the tip is not. Read the positions as the hour hand of a clock: behind the caecum or colon (retrocaecal, 12 o’clock), the commonest at about 65%; over the brim into the pelvis (4 o’clock), about 30%; up and left towards the spleen, in front of or behind the ileum (2 o’clock); across towards the sacral promontory (3); below the caecum towards the inguinal ligament (6); up beside the colon (11).',
      focus: ['retrocaecal', 'pelvic', 'other-positions'],
    },
    {
      id: 'surface',
      title: 'On the skin',
      body: 'The base lies 2 cm below where the transtubercular plane crosses the right lateral plane. McBurney’s point lies a third of the way along the line from the right anterior superior iliac spine to the umbilicus (where the lateral third meets the medial two-thirds). It roughly overlies the base and is where an inflamed appendix is most tender.',
      focus: ['mcburneys-point'],
    },
    {
      id: 'supply',
      title: 'Fold, artery and lymph',
      body: 'The mesoappendix is a small triangle from the back of the lower end of the mesentery, passing behind the ileum. The appendicular artery comes from the lower division of the ileocolic, runs behind the end of the ileum into the mesoappendix, gives a recurrent branch to the caecal arteries, and runs to the tip in the fold’s free edge, its last part on the appendix wall. It is an end artery. Veins drain through the ileocolic and superior mesenteric to the portal vein; lymph to the ileocolic nodes, some through small nodes in the mesoappendix.',
      focus: ['mesoappendix', 'ileocolic-artery', 'appendicular-artery', 'ileocolic-nodes'],
    },
    {
      id: 'pain',
      title: 'Its pain',
      body: 'Its sympathetic supply comes through the coeliac plexus from T9 and T10, the parasympathetic from the vagus. Visceral pain fibres from it enter the cord at T10, which also receives touch from the skin of the umbilicus, so early pain is felt round the navel. When the inflamed appendix touches the parietal peritoneum, which feels sharp, localised pain, the pain moves to the right iliac fossa. The submucosa is packed with lymphoid follicles, earning it the name abdominal tonsil.',
      focus: ['referred-pain', 'lymphoid-tissue'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'At the caecum, follow the taeniae to the base, then trace the appendicular artery from the ileocolic behind the ileum to the free edge of the mesoappendix. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ap-position',
      prompt: 'The commonest position of the vermiform appendix is:',
      options: [
        { id: 'retrocaecal', text: 'Retrocaecal' },
        { id: 'pelvic', text: 'Pelvic' },
        { id: 'preileal', text: 'Preileal' },
        { id: 'subcaecal', text: 'Subcaecal' },
      ],
      answerId: 'retrocaecal',
      explanation: 'About 65%; pelvic is next, about 30%.',
    },
    {
      id: 'ap-find-base',
      prompt: 'At operation, the base of the appendix is found by following the:',
      options: [
        { id: 'taeniae', text: 'Taeniae coli' },
        { id: 'ileum', text: 'Terminal ileum backwards' },
        { id: 'mesentery', text: 'Root of the mesentery' },
        { id: 'ureter', text: 'Right ureter' },
      ],
      answerId: 'taeniae',
      explanation: 'All three meet at its base on the caecum.',
    },
    {
      id: 'ap-early-pain',
      prompt: 'Early pain of appendicitis is felt round the umbilicus because both share segment:',
      options: [
        { id: 't10', text: 'T10' },
        { id: 't7', text: 'T7' },
        { id: 'l1', text: 'L1' },
        { id: 't12', text: 'T12' },
      ],
      answerId: 't10',
      explanation:
        'Visceral fibres from the appendix and touch from the umbilical skin both reach T10.',
    },
    {
      id: 'ap-gangrene',
      prompt: 'An inflamed appendix readily turns gangrenous because its artery:',
      options: [
        { id: 'end-artery', text: 'Is an end artery' },
        { id: 'from-ima', text: 'Arises from the inferior mesenteric' },
        { id: 'tortuous', text: 'Is very tortuous' },
        { id: 'double', text: 'Has two sources that compete' },
      ],
      answerId: 'end-artery',
      explanation:
        'The appendicular artery, from the ileocolic, has no useful anastomoses beyond its base.',
    },
  ],
  cards: [
    {
      id: 'ap-size',
      front: 'Appendix: origin and size?',
      back: 'Back inner wall of the caecum, 2 cm below the ileocaecal opening. Average 9 cm (2 to 20), about 5 mm wide; longer in children.',
    },
    {
      id: 'ap-positions',
      front: 'Positions of the appendix?',
      back: 'Retrocaecal or retrocolic (12 o’clock, 65%), pelvic (4, 30%), splenic pre- or postileal (2), promonteric (3), subcaecal (6), paracolic (11).',
    },
    {
      id: 'ap-mcburney',
      front: 'McBurney’s point?',
      back: 'Junction of the lateral third and medial two-thirds of the line from the right anterior superior iliac spine to the umbilicus.',
    },
    {
      id: 'ap-artery',
      front: 'Appendicular artery?',
      back: 'From the lower division of the ileocolic; behind the ileum into the mesoappendix, along its free edge to the tip. An end artery.',
    },
    {
      id: 'ap-pain',
      front: 'Why does appendicitis pain start at the umbilicus and move?',
      back: 'Visceral fibres enter at T10, the segment of the umbilical skin. Once the parietal peritoneum is inflamed, the pain localises to the right iliac fossa.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 20 Small and Large Intestines',
      pages: '316–319',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '316–319' },
  ],
};
