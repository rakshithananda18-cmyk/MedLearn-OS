import type { Topic } from '@medlearn/schemas';

import {
  ABDOMINAL_ORGANS_MODEL_CREDIT,
  ABDOMINAL_ORGANS_MODEL_SRC,
  abdominalOrgansParts,
  MESENTERY_VIEW,
  ORGANS_FRONT,
  ORGANS_SKELETON,
} from './abdominal-organs-3d';
import { bookSource } from './books';

// Abdomen batch 3 (BD Volume 2). Facts in our own words; `reviewed: false` until a student checks
// the topic against the book pages.
export const jejunumIleum: Topic = {
  slug: 'jejunum-ileum',
  subjectSlug: 'anatomy',
  regions: ['abdomen'],
  title: 'Jejunum, ileum and Meckel’s diverticulum',
  summary:
    'The mobile small intestine on its mesentery: how it gains surface for absorption, how to tell the jejunum from the ileum by sight and touch, its supply, and the diverticulum the vitelline duct can leave behind.',
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
      'Volume 2, Chapter 20 Small and Large Intestines: small intestine, jejunum and ileum, Meckel’s diverticulum, pages 303 to 305 and 310 to 312',
    ),
    bookSource(
      'grays-anatomy',
      'Chapter 4 Abdomen: jejunum and ileum, Meckel’s diverticulum, pages 310 to 315',
    ),
    {
      title: 'BodyParts3D (DBCLS)',
      detail: 'Small and large intestine, mesentery, vessels and bones in the 3D view',
      url: 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html',
      licence: 'CC BY 4.0 on the licence page (files marked CC BY-SA 2.1 JP)',
    },
  ],
  keyFacts: [
    'The small intestine runs about 6 m from the pylorus to the ileocaecal junction: the fixed duodenum (25 cm), then the mobile jejunum (upper two-fifths) and ileum (lower three-fifths), hung from the posterior wall by the mesentery.',
    'It gains surface for absorption by its length, by permanent circular folds (plicae circulares, from the second part of the duodenum, crowded in the upper jejunum and almost gone in the lower ileum), by villi and by microvilli.',
    'Jejunum: upper left of the intestinal area; thicker, wider, more vascular, often empty; mesentery with windows of clear peritoneum, little fat, one or two arcades and long, sparse vasa recta; large, close circular folds; no Peyer’s patches.',
    'Ileum: lower right; thinner, narrower, often full; fatty mesentery without windows, three to six arcades and short, many vasa recta; few folds; Peyer’s patches on the antimesenteric border.',
    'Meckel’s diverticulum, the persisting proximal part of the vitellointestinal duct: in about 2% of people, about 5 cm long, about 60 cm from the ileocaecal valve on the antimesenteric border of the ileum, its tip free or tied to the umbilicus by a band.',
  ],
  visual: {
    kind: 'path',
    // Left: the jejunum and what marks it. Right: the ileum and what marks it.
    diagram: {
      width: 360,
      height: 450,
      nodes: [
        {
          id: 'mesentery',
          label: 'On the mesentery:\n6 m in all',
          name: 'Jejunum and ileum on the mesentery; the small intestine is about 6 m long',
          x: 180,
          y: 30,
        },
        {
          id: 'jejunum',
          label: 'Jejunum: upper\ntwo-fifths',
          name: 'Jejunum, the upper two-fifths, in the upper left of the intestinal area',
          x: 85,
          y: 100,
        },
        {
          id: 'jejunal-wall',
          label: 'Thick, wide,\nvascular',
          name: 'Thicker, wider, more vascular wall, often empty',
          x: 85,
          y: 165,
        },
        {
          id: 'jejunal-mesentery',
          label: 'Windows, one or\ntwo arcades',
          name: 'Mesentery with windows and little fat; one or two arterial arcades',
          x: 85,
          y: 230,
        },
        {
          id: 'long-vasa-recta',
          label: 'Long, few vasa\nrecta',
          name: 'Long, sparse vasa recta',
          x: 85,
          y: 295,
        },
        {
          id: 'plicae',
          label: 'Large, close\ncircular folds',
          name: 'Plicae circulares, large and closely set',
          x: 85,
          y: 355,
        },
        {
          id: 'superior-mesenteric-artery',
          label: 'Jejunal and ileal\nbranches of SMA',
          name: 'Twelve to fifteen jejunal and ileal branches of the superior mesenteric artery',
          x: 85,
          y: 415,
        },
        {
          id: 'ileum',
          label: 'Ileum: lower\nthree-fifths',
          name: 'Ileum, the lower three-fifths, in the lower right of the intestinal area',
          x: 275,
          y: 100,
        },
        {
          id: 'ileal-wall',
          label: 'Thin, narrow,\noften full',
          name: 'Thinner, narrower, less vascular wall, often loaded',
          x: 275,
          y: 165,
        },
        {
          id: 'ileal-mesentery',
          label: 'Fatty, three to\nsix arcades',
          name: 'Fatty mesentery without windows; three to six arterial arcades',
          x: 275,
          y: 230,
        },
        {
          id: 'short-vasa-recta',
          label: 'Short, many vasa\nrecta',
          name: 'Short, numerous vasa recta',
          x: 275,
          y: 295,
        },
        {
          id: 'peyers-patches',
          label: 'Peyer’s patches',
          name: 'Peyer’s patches, aggregated lymphoid follicles on the antimesenteric border',
          x: 275,
          y: 355,
        },
        {
          id: 'meckels-diverticulum',
          label: 'Meckel’s\ndiverticulum',
          name: 'Meckel’s diverticulum, on the antimesenteric border of the ileum',
          x: 275,
          y: 415,
        },
      ],
      edges: [
        { from: 'mesentery', to: 'jejunum' },
        { from: 'jejunum', to: 'jejunal-wall' },
        { from: 'jejunal-wall', to: 'jejunal-mesentery' },
        { from: 'jejunal-mesentery', to: 'long-vasa-recta' },
        { from: 'long-vasa-recta', to: 'plicae' },
        { from: 'plicae', to: 'superior-mesenteric-artery' },
        { from: 'mesentery', to: 'ileum' },
        { from: 'ileum', to: 'ileal-wall' },
        { from: 'ileal-wall', to: 'ileal-mesentery' },
        { from: 'ileal-mesentery', to: 'short-vasa-recta' },
        { from: 'short-vasa-recta', to: 'peyers-patches' },
        { from: 'peyers-patches', to: 'meckels-diverticulum' },
      ],
    },
    lesions: [
      {
        id: 'meckel',
        label: 'Meckel’s diverticulum',
        nodeIds: ['meckels-diverticulum', 'ileum'],
        explanation:
          'Usually silent. It may hold gastric or pancreatic tissue whose acid ulcerates the ileum beside it and bleeds; gut can twist round the band from its tip to the umbilicus and obstruct; and when it inflames it mimics appendicitis. The rule of twos: 2% of people, 2 inches long, 2 feet from the ileocaecal valve.',
      },
      {
        id: 'typhoid',
        label: 'Typhoid ulcers',
        nodeIds: ['peyers-patches'],
        explanation:
          'Typhoid ulcerates the Peyer’s patches, so its ulcers lie lengthwise along the antimesenteric border of the ileum, where they can bleed or perforate. Tuberculous ulcers instead run round the gut with its lymphatics, and heal as narrowing strictures.',
      },
      {
        id: 'vasa-recta',
        label: 'End arteries to the wall',
        nodeIds: ['superior-mesenteric-artery', 'long-vasa-recta', 'short-vasa-recta'],
        explanation:
          'The vasa recta run straight to the gut, alternately to each side, and do not join their neighbours. A blocked superior mesenteric artery or vein therefore leaves no way round: the intestine it serves dies quickly.',
      },
    ],
    drill: [
      {
        id: 'jejunum',
        title: 'The jejunum',
        hint: 'Where it lies, its wall, mesentery, vessels and folds, then its artery.',
        nodeIds: [
          'jejunum',
          'jejunal-wall',
          'jejunal-mesentery',
          'long-vasa-recta',
          'plicae',
          'superior-mesenteric-artery',
        ],
      },
      {
        id: 'ileum',
        title: 'The ileum',
        hint: 'The same points for the ileum, then its lymphoid patches and the diverticulum.',
        nodeIds: [
          'ileum',
          'ileal-wall',
          'ileal-mesentery',
          'short-vasa-recta',
          'peyers-patches',
          'meckels-diverticulum',
        ],
      },
    ],
    model3d: {
      src: ABDOMINAL_ORGANS_MODEL_SRC,
      credit: ABDOMINAL_ORGANS_MODEL_CREDIT,
      parts: abdominalOrgansParts([
        ...ORGANS_SKELETON,
        'stomach',
        'duodenum',
        'jejunum',
        'ileum',
        'mesentery',
        'ascending-colon',
        'appendix',
        'transverse-colon',
        'descending-colon',
        'sigmoid-colon',
        'rectum',
        'urinary-bladder',
        'abdominal-aorta',
        'inferior-vena-cava',
        'superior-mesenteric-artery',
        'superior-mesenteric-vein',
      ]),
      traces: [],
      stops: [
        {
          ...ORGANS_FRONT,
          title: 'The coils in place',
          description:
            'The greater omentum lifted away: jejunum in the upper left of the area framed by the colon, ileum in the lower right, ending at the caecum.',
        },
        {
          ...MESENTERY_VIEW,
          description:
            'The coils hang on the mesentery, whose root runs from the duodenojejunal flexure down to the right sacroiliac joint, carrying the superior mesenteric vessels to them.',
        },
      ],
    },
  },
  lesson: [
    {
      id: 'surface',
      title: 'Built for absorption',
      body: 'About 6 m long (longer in men, and longer after death as the muscle relaxes), the small intestine spreads its lining with circular folds, the plicae circulares, which do not flatten as it fills and slow the contents down; with villi, 1 to 2 mm fingers that give the velvety look; and with microvilli on each absorptive cell. Crypts between the villi renew the lining every few days. Each villus carries a lymph capillary, a lacteal, for absorbed fat.',
      focus: ['plicae'],
    },
    {
      id: 'jejunum',
      title: 'The jejunum',
      body: 'The upper two-fifths of the mobile intestine, in the upper left of the area framed by the colon. Its wall is thicker, wider and redder, and it is often empty. Hold it to the light: its mesentery has clear windows between the vessels and little fat, with one or two rows of arcades and long vasa recta. Inside, the circular folds are large and close.',
      focus: ['jejunum', 'jejunal-wall', 'jejunal-mesentery', 'long-vasa-recta'],
    },
    {
      id: 'ileum',
      title: 'The ileum',
      body: 'The lower three-fifths, lower and to the right, ending at the caecum. Thinner, narrower, paler and usually full. Its mesentery is thick with fat, without windows, with three to six rows of arcades and short, crowded vasa recta. Its folds thin out and vanish, and Peyer’s patches, 2 to 10 cm lymphoid patches, sit lengthwise on the side away from the mesentery.',
      focus: ['ileum', 'ileal-wall', 'ileal-mesentery', 'short-vasa-recta', 'peyers-patches'],
    },
    {
      id: 'supply',
      title: 'Vessels, lymph and nerves',
      body: 'Twelve to fifteen jejunal and ileal branches leave the left side of the superior mesenteric artery between the layers of the mesentery, join in arcades and send vasa recta to alternate sides of the gut; the end of the ileum is fed by the ileocolic. Veins follow to the superior mesenteric vein. Lymph passes from the lacteals through the mesenteric nodes to those at the origin of the artery. Sympathetic nerves come from T9 to T11, parasympathetic from the vagus.',
      focus: ['superior-mesenteric-artery'],
    },
    {
      id: 'meckel',
      title: 'Meckel’s diverticulum',
      body: 'The vitellointestinal duct joins the midgut to the yolk sac and should vanish by the sixth week. If its gut end persists, it forms a blind pouch on the side of the ileum away from the mesentery, about 60 cm from the ileocaecal valve and as wide as the ileum, in about 2% of people. Its tip may be free or tied by a band to the umbilicus or elsewhere.',
      focus: ['meckels-diverticulum'],
    },
    {
      id: 'explore',
      title: 'Look for yourself',
      body: 'From the front, find the jejunum high on the left and follow the coils down to the ileum entering the caecum; from below, see them hang on the mesentery. Then turn on a problem.',
      focus: [],
    },
  ],
  questions: [
    {
      id: 'ji-peyers',
      prompt: 'Peyer’s patches are largest and most numerous in the:',
      options: [
        { id: 'ileum', text: 'Ileum' },
        { id: 'jejunum', text: 'Jejunum' },
        { id: 'duodenum', text: 'Duodenum' },
        { id: 'colon', text: 'Transverse colon' },
      ],
      answerId: 'ileum',
      explanation: 'Placed lengthwise along its antimesenteric border.',
    },
    {
      id: 'ji-jejunum',
      prompt: 'Compared with the ileum, the jejunum has:',
      options: [
        { id: 'long-vasa', text: 'Longer and fewer vasa recta' },
        { id: 'more-arcades', text: 'More rows of arterial arcades' },
        { id: 'more-fat', text: 'More fat in its mesentery' },
        { id: 'thinner', text: 'A thinner wall' },
      ],
      answerId: 'long-vasa',
      explanation:
        'With one or two arcades, windows in a less fatty mesentery, and a thicker, more vascular wall.',
    },
    {
      id: 'ji-meckel-site',
      prompt: 'Meckel’s diverticulum is found:',
      options: [
        { id: 'antimesenteric', text: 'On the antimesenteric border of the ileum' },
        { id: 'mesenteric', text: 'On the mesenteric border of the ileum' },
        { id: 'jejunum', text: 'At the duodenojejunal flexure' },
        { id: 'caecum', text: 'On the caecum' },
      ],
      answerId: 'antimesenteric',
      explanation: 'About 60 cm (2 feet) from the ileocaecal valve.',
    },
    {
      id: 'ji-meckel-origin',
      prompt: 'Meckel’s diverticulum is a remnant of the:',
      options: [
        { id: 'vitellointestinal', text: 'Vitellointestinal duct' },
        { id: 'allantois', text: 'Allantois' },
        { id: 'urachus', text: 'Urachus' },
        { id: 'mesonephric', text: 'Mesonephric duct' },
      ],
      answerId: 'vitellointestinal',
      explanation: 'Its proximal part, which normally disappears by the sixth week.',
    },
  ],
  cards: [
    {
      id: 'ji-length',
      front: 'Small intestine: length and parts?',
      back: 'About 6 m: duodenum 25 cm (fixed), then jejunum (upper two-fifths) and ileum (lower three-fifths) on the mesentery.',
    },
    {
      id: 'ji-surface',
      front: 'How does the small intestine gain surface area?',
      back: 'Length, plicae circulares (permanent circular folds), villi and microvilli.',
    },
    {
      id: 'ji-jejunum-signs',
      front: 'Jejunum: how to recognise it?',
      back: 'Upper left; thick, wide, vascular, often empty; windows in the mesentery, little fat, 1 or 2 arcades, long sparse vasa recta; large close folds.',
    },
    {
      id: 'ji-ileum-signs',
      front: 'Ileum: how to recognise it?',
      back: 'Lower right; thin, narrow, often full; fatty mesentery, no windows, 3 to 6 arcades, short many vasa recta; few folds; Peyer’s patches.',
    },
    {
      id: 'ji-meckel',
      front: 'Meckel’s diverticulum: the twos?',
      back: '2% of people, 2 inches (5 cm) long, 2 feet (60 cm) from the ileocaecal valve, on the antimesenteric border; may hold two kinds of stray tissue, gastric or pancreatic.',
    },
  ],
  readIn: [
    {
      bookId: 'bd-chaurasia',
      chapter: 'Volume 2, Chapter 20 Small and Large Intestines',
      pages: '303–305, 310–312',
    },
    { bookId: 'grays-anatomy', chapter: 'Chapter 4 Abdomen', pages: '310–315' },
  ],
};
