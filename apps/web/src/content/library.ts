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

// Sections of BD Chaurasia Volume 1, by chapter number, named for what they cover. A topic's
// section comes from its BD reference, so the tree follows the order students dissect in.
const BD_SECTIONS: Record<number, string> = {
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
          label: BD_SECTIONS[chapter ?? 0] ?? `Chapter ${chapter}`,
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
