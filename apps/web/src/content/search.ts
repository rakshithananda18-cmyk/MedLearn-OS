import type { Topic } from '@medlearn/schemas';

import { fold, searchTerms, termScore, wordsOf } from './match';
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
