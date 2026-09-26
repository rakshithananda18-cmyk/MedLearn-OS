import type { PathDiagram } from '@medlearn/schemas';

type Edges = PathDiagram['edges'];

function walk(start: string[], next: (id: string) => string[]): Set<string> {
  const seen = new Set<string>();
  const queue = [...start];
  while (queue.length > 0) {
    const id = queue.shift() as string;
    for (const neighbour of next(id)) {
      if (!seen.has(neighbour)) {
        seen.add(neighbour);
        queue.push(neighbour);
      }
    }
  }
  return seen;
}

export function descendants(edges: Edges, ids: string[]): Set<string> {
  return walk(ids, (id) => edges.filter((edge) => edge.from === id).map((edge) => edge.to));
}

export function ancestors(edges: Edges, ids: string[]): Set<string> {
  return walk(ids, (id) => edges.filter((edge) => edge.to === id).map((edge) => edge.from));
}

/** Everything upstream and downstream of a node, including the node: its full path. */
export function pathThrough(edges: Edges, id: string): Set<string> {
  return new Set([id, ...ancestors(edges, [id]), ...descendants(edges, [id])]);
}

/** Lesioned nodes plus everything that carries fibres from them. */
export function affectedBy(edges: Edges, lesionIds: string[]): Set<string> {
  return new Set([...lesionIds, ...descendants(edges, lesionIds)]);
}

/** An edge is on a path when both of its ends are. */
export function edgeInSet(edge: Edges[number], ids: Set<string>): boolean {
  return ids.has(edge.from) && ids.has(edge.to);
}
