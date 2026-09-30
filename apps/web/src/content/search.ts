import type { Topic } from '@medlearn/schemas';

import { TOPICS } from './topics';

export type SearchKind = 'Topic' | 'Structure' | 'Key fact' | 'Lesson' | 'Question' | 'Recall card';

export interface SearchResult {
  kind: SearchKind;
  topicSlug: string;
  topicTitle: string;
  /** The matching text, shortened around the first word searched for. */
  excerpt: string;
  href: string;
}

// Topics and structures first, then the most condensed material.
const KIND_ORDER: SearchKind[] = [
  'Topic',
  'Structure',
  'Key fact',
  'Lesson',
  'Question',
  'Recall card',
];
const EXCERPT_LENGTH = 160;
/** Words this long or longer may be misspelt by one letter and still match. */
const TYPO_FROM = 5;

/** Lower case without accents, so “haemoglobin” and “Haemoglobin” match alike. */
const fold = (text: string) => text.normalize('NFD').replaceAll(/\p{M}/gu, '').toLowerCase();

const wordsOf = (text: string) =>
  fold(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);

/** Whether two words differ by at most one letter added, dropped or changed. */
function oneEditApart(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (a.length > b.length) i += 1;
    else if (b.length > a.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/**
 * How well one searched word matches a text's words: 3 for the whole word, 2 for the start of a
 * word (typing is under way), 1 for inside a word or a word one letter off; 0 for no match.
 */
function termScore(term: string, words: string[]): number {
  let best = 0;
  for (const word of words) {
    if (word === term) return 3;
    if (word.startsWith(term)) best = Math.max(best, 2);
    else if (word.includes(term)) best = Math.max(best, 1);
    else if (best === 0 && term.length >= TYPO_FROM && oneEditApart(term, word)) best = 1;
  }
  return best;
}

type Entry = [SearchKind, string, string];

function excerpt(text: string, term: string): string {
  if (text.length <= EXCERPT_LENGTH) return text;
  const at = Math.max(0, fold(text).indexOf(term) - 40);
  const start = text.lastIndexOf(' ', at) + 1;
  const piece = text.slice(start, start + EXCERPT_LENGTH).trimEnd();
  return `${start > 0 ? '…' : ''}${piece}…`;
}

/** The names of the structures a topic shows: its diagram and its 3D model, each once. */
function structuresOf(topic: Topic): string[] {
  if (topic.visual.kind !== 'path') return [];
  const names = [
    ...topic.visual.diagram.nodes.map((node) => node.name),
    ...(topic.visual.model3d?.parts.map((part) => part.name) ?? []),
  ];
  return [...new Set(names)];
}

function entries(topic: Topic): Entry[] {
  const hub = `/learn/${topic.slug}`;
  const lesson = `${hub}/lesson`;
  const inStudio =
    topic.visual.kind === 'path' && topic.visual.model3d ? `/studio?topic=${topic.slug}` : hub;
  return [
    ['Topic', `${topic.title}. ${topic.summary}`, hub],
    ...structuresOf(topic).map((name): Entry => ['Structure', name, inStudio]),
    ...topic.keyFacts.map((fact): Entry => ['Key fact', fact, lesson]),
    ...topic.lesson.map((step): Entry => ['Lesson', `${step.title}. ${step.body}`, lesson]),
    ...topic.questions.map((question): Entry => ['Question', question.prompt, hub]),
    ...topic.cards.map((card): Entry => ['Recall card', `${card.front} ${card.back}`, hub]),
  ];
}

/** The searched words (two letters or more), folded. */
export const searchTerms = (query: string) =>
  wordsOf(query.slice(0, 100)).filter((term) => term.length >= 2);

/**
 * Finds content matching every word searched for, as a whole word, the start of a word (so results
 * come while typing), inside a word, or a longer word with one letter wrong. Topics whose titles
 * match lead, then structures, facts, lessons, questions and cards, best matches first.
 * ponytail: a scan over bundled topics, fine for a few hundred items; a database full-text index
 * when content moves there.
 */
export function searchTopics(query: string, topics: Topic[] = TOPICS, limit = 30): SearchResult[] {
  const terms = searchTerms(query);
  if (terms.length === 0) return [];
  const [first = ''] = terms;

  const scored = topics.flatMap((topic) => {
    const titleWords = wordsOf(topic.title);
    return entries(topic).flatMap(([kind, text, href]) => {
      const words = wordsOf(text);
      let score = 0;
      for (const term of terms) {
        const match = termScore(term, words);
        if (match === 0) return [];
        score += match;
      }
      // A topic found by its own name comes before one that only mentions the words.
      if (kind === 'Topic' && terms.every((term) => termScore(term, titleWords) > 0)) score += 10;
      return [
        {
          score,
          result: {
            kind,
            topicSlug: topic.slug,
            topicTitle: topic.title,
            excerpt: excerpt(text, first),
            href,
          },
        },
      ];
    });
  });

  // The same structure in many topics is listed once per topic, best-matching names first.
  return scored
    .toSorted(
      (a, b) =>
        KIND_ORDER.indexOf(a.result.kind) - KIND_ORDER.indexOf(b.result.kind) || b.score - a.score,
    )
    .slice(0, limit)
    .map(({ result }) => result);
}
