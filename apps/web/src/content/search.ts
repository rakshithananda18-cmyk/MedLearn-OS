import type { Topic } from '@medlearn/schemas';

import { TOPICS } from './topics';

export type SearchKind = 'Topic' | 'Key fact' | 'Lesson' | 'Question' | 'Recall card';

export interface SearchResult {
  kind: SearchKind;
  topicTitle: string;
  /** The matching text, shortened around the first word searched for. */
  excerpt: string;
  href: string;
}

// Topics first, then the most condensed material.
const KIND_ORDER: SearchKind[] = ['Topic', 'Key fact', 'Lesson', 'Question', 'Recall card'];
const EXCERPT_LENGTH = 160;

/** Lower case without accents, so “haemoglobin” and “Haemoglobin” match alike. */
const fold = (text: string) => text.normalize('NFD').replaceAll(/\p{M}/gu, '').toLowerCase();

function excerpt(text: string, term: string): string {
  if (text.length <= EXCERPT_LENGTH) return text;
  const at = Math.max(0, fold(text).indexOf(term) - 40);
  const start = text.lastIndexOf(' ', at) + 1;
  const piece = text.slice(start, start + EXCERPT_LENGTH).trimEnd();
  return `${start > 0 ? '…' : ''}${piece}…`;
}

function entries(topic: Topic): [SearchKind, string, string][] {
  const hub = `/learn/${topic.slug}`;
  const lesson = `${hub}/lesson`;
  return [
    ['Topic', `${topic.title}. ${topic.summary}`, hub],
    ...topic.keyFacts.map((fact): [SearchKind, string, string] => ['Key fact', fact, lesson]),
    ...topic.lesson.map((step): [SearchKind, string, string] => [
      'Lesson',
      `${step.title}. ${step.body}`,
      lesson,
    ]),
    ...topic.questions.map((question): [SearchKind, string, string] => [
      'Question',
      question.prompt,
      hub,
    ]),
    ...topic.cards.map((card): [SearchKind, string, string] => [
      'Recall card',
      `${card.front} ${card.back}`,
      hub,
    ]),
  ];
}

/**
 * Finds every piece of content that contains all the words searched for (two letters or more).
 * ponytail: a scan over bundled topics, fine for a few hundred items; a database full-text index
 * when content moves there.
 */
export function searchTopics(query: string, topics: Topic[] = TOPICS, limit = 30): SearchResult[] {
  const terms = fold(query)
    .split(/\s+/)
    .filter((term) => term.length >= 2);
  if (terms.length === 0) return [];

  const [first = ''] = terms;
  const results = topics.flatMap((topic) =>
    entries(topic)
      .filter(([, text]) => terms.every((term) => fold(text).includes(term)))
      .map(([kind, text, href]) => ({
        kind,
        topicTitle: topic.title,
        excerpt: excerpt(text, first),
        href,
      })),
  );
  return results
    .sort((a, b) => KIND_ORDER.indexOf(a.kind) - KIND_ORDER.indexOf(b.kind))
    .slice(0, limit);
}
