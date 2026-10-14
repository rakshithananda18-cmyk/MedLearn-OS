import type { Topic } from '@medlearn/schemas';

import { BODY_REGIONS } from './body';

/** A topic at the tip of the library tree. */
export interface LibraryTopic {
  kind: 'topic';
  slug: string;
  title: string;
  minutes: number;
}

/** A branch of the library tree: a body region or a section of the book. */
export interface LibraryBranch {
  kind: 'branch';
  id: string;
  label: string;
  children: LibraryNode[];
}

export type LibraryNode = LibraryBranch | LibraryTopic;

// Sections of BD Chaurasia Volume 1, by region and chapter number (the book numbers both the
// upper limb's last chapter and the thorax's first 12), named for what they cover. A topic's
// section comes from its BD reference, so the tree follows the order students dissect in.
const BD_SECTIONS: Record<string, Record<number, string>> = {
  'upper-limb': {
    3: 'Pectoral region',
    4: 'Axilla',
    5: 'Back',
    6: 'Scapular region',
    7: 'Skin nerves, veins and lymph',
    8: 'Arm',
    9: 'Forearm and hand',
    10: 'Joints',
    11: 'Surface marking and X-rays',
    12: 'Nerves, arteries and development',
  },
  thorax: {
    12: 'Landmarks, inlet and outlet',
    13: 'Bones and joints',
    14: 'Walls',
    15: 'Pleura',
    16: 'Lungs',
    17: 'Mediastinum',
    18: 'Heart',
    19: 'Great vessels',
    20: 'Trachea, oesophagus and thoracic duct',
    21: 'Surface marking and X-rays',
  },
  'lower-limb': {
    3: 'Front of thigh',
    4: 'Medial side of thigh',
    5: 'Gluteal region',
    6: 'Popliteal fossa',
    7: 'Back of thigh',
    8: 'Front and sides of leg',
    9: 'Back of leg',
    10: 'Sole of foot',
    11: 'Drainage and innervation',
  },
};

/** The BD Chaurasia chapter a topic is read in, when it has one. */
function bdChapter(topic: Topic): number | null {
  const reference = topic.readIn.find((item) => item.bookId === 'bd-chaurasia');
  const number = /Chapter (\d+)/.exec(reference?.chapter ?? '')?.[1];
  return number ? Number(number) : null;
}

const leaf = (topic: Topic): LibraryTopic => ({
  kind: 'topic',
  slug: topic.slug,
  title: topic.title,
  minutes: topic.estimatedMinutes,
});

/**
 * One subject's topics as a tree: body region, then book section, then topic, for topics read in
 * BD Chaurasia; any other topic sits directly under the subject. Topics keep their teaching order.
 */
export function libraryTree(topics: Topic[]): LibraryNode[] {
  const inBook = topics.filter((topic) => bdChapter(topic) !== null);
  const regions = BODY_REGIONS.flatMap((region): LibraryBranch[] => {
    const inRegion = inBook.filter((topic) => topic.regions[0] === region.id);
    const chapters = [...new Set(inRegion.map(bdChapter))].sort((a, b) => (a ?? 0) - (b ?? 0));
    if (inRegion.length === 0) return [];
    return [
      {
        kind: 'branch',
        id: region.id,
        label: region.name,
        children: chapters.map((chapter) => ({
          kind: 'branch',
          id: `${region.id}-chapter-${chapter}`,
          label: BD_SECTIONS[region.id]?.[chapter ?? 0] ?? `Chapter ${chapter}`,
          children: inRegion.filter((topic) => bdChapter(topic) === chapter).map(leaf),
        })),
      },
    ];
  });
  const loose = topics.filter((topic) => bdChapter(topic) === null).map(leaf);
  return [...regions, ...loose];
}

/** Every topic under a node of the tree. */
export function topicsUnder(node: LibraryNode): LibraryTopic[] {
  return node.kind === 'topic' ? [node] : node.children.flatMap(topicsUnder);
}

/** The branches above each topic, by slug: its region and book section. */
export function topicTrails(nodes: LibraryNode[], trail: string[] = []): Record<string, string[]> {
  return Object.fromEntries(
    nodes.flatMap((node): Array<[string, string[]]> =>
      node.kind === 'topic'
        ? [[node.slug, trail]]
        : Object.entries(topicTrails(node.children, [...trail, node.label])),
    ),
  );
}

/** The branches leading to a topic, by id, from its region down: the trail to unfold for it. */
export function trailTo(nodes: LibraryNode[], slug: string | null): string[] {
  for (const node of nodes) {
    if (node.kind === 'topic') continue;
    if (topicsUnder(node).some((topic) => topic.slug === slug)) {
      return [node.id, ...trailTo(node.children, slug)];
    }
  }
  return [];
}

/**
 * The open trail after a fold at this depth is toggled: one branch open per level, so opening one
 * folds the others beside it (and whatever was open inside them), and the open one folds shut.
 */
export const toggledTrail = (trail: readonly string[], depth: number, id: string): string[] =>
  trail[depth] === id ? trail.slice(0, depth) : [...trail.slice(0, depth), id];
