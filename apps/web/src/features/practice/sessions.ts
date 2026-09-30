import { type LearnerProgress, type PlannableTopic, topicMastery } from '@medlearn/core';

import { type LibraryNode, topicsUnder } from '@/content/library';

/** The ways into practice: a quick mix, weak spots, chosen topics, or a timed test. */
export type SessionKind = 'mix' | 'weak' | 'topics' | 'timed';

export const SESSION_SIZE = 10;
export const TIMED_SIZE = 20;
/** A timed test allows a minute a question, as in university papers. */
export const SECONDS_PER_TIMED_QUESTION = 60;

function shuffled<T>(items: T[], random: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}

/** The topics to draw from: the lessons done, or every topic before any lesson is. */
function studied(topics: PlannableTopic[], progress: LearnerProgress): PlannableTopic[] {
  const done = topics.filter((topic) => progress.completedLessons.includes(topic.slug));
  return done.length > 0 ? done : topics;
}

/** Questions still to get right come first, each group in a random order. */
function openFirst(ids: string[], progress: LearnerProgress, random: () => number): string[] {
  const open = ids.filter((id) => !progress.correctAnswers.includes(id));
  const right = ids.filter((id) => progress.correctAnswers.includes(id));
  return [...shuffled(open, random), ...shuffled(right, random)];
}

/**
 * The question ids for one session. A mix and a timed test draw on the lessons done; weak spots
 * start with the questions missed and go on to the least-mastered topics; chosen topics use just
 * those topics.
 */
export function buildSession(
  kind: SessionKind,
  topics: PlannableTopic[],
  progress: LearnerProgress,
  options: { slugs?: string[]; now?: Date; random?: () => number } = {},
): string[] {
  const random = options.random ?? Math.random;
  const now = options.now ?? new Date();
  const from = (list: PlannableTopic[]) => list.flatMap((topic) => topic.questionIds);
  switch (kind) {
    case 'topics': {
      const chosen = topics.filter((topic) => options.slugs?.includes(topic.slug));
      return openFirst(from(chosen), progress, random).slice(0, TIMED_SIZE);
    }
    case 'mix':
      return openFirst(from(studied(topics, progress)), progress, random).slice(0, SESSION_SIZE);
    case 'timed':
      return shuffled(from(studied(topics, progress)), random).slice(0, TIMED_SIZE);
    case 'weak': {
      const missed = progress.mistakes.filter((id) => !progress.correctAnswers.includes(id));
      const weakest = [...studied(topics, progress)].sort(
        (a, b) => topicMastery(a, progress, now).percent - topicMastery(b, progress, now).percent,
      );
      const rest = weakest
        .flatMap((topic) => openFirst(topic.questionIds, progress, random))
        .filter((id) => !missed.includes(id));
      return [...shuffled(missed, random), ...rest].slice(0, SESSION_SIZE);
    }
  }
}

export type Strength = 'new' | 'weak' | 'building' | 'strong';

export interface SectionStrength {
  id: string;
  label: string;
  slugs: string[];
  strength: Strength;
  /** Average mastery of the section's topics, 0 to 100. */
  percent: number;
  answered: number;
  correct: number;
}

/**
 * How well each book section is going, from its topics' mastery and the questions answered in
 * it: new before anything is done; once questions are answered, weak below 60% right or 40%
 * mastery and strong from 80% right and 75% mastery; building otherwise.
 */
export function sectionStrengths(
  tree: LibraryNode[],
  topics: PlannableTopic[],
  progress: LearnerProgress,
  now: Date,
): SectionStrength[] {
  const sections = tree.flatMap((node) =>
    node.kind === 'branch' && node.children.some((child) => child.kind === 'branch')
      ? node.children
      : [node],
  );
  return sections.map((section) => {
    const slugs = topicsUnder(section).map((topic) => topic.slug);
    const inSection = topics.filter((topic) => slugs.includes(topic.slug));
    const questions = inSection.flatMap((topic) => topic.questionIds);
    const correct = questions.filter((id) => progress.correctAnswers.includes(id)).length;
    const answered = questions.filter(
      (id) => progress.correctAnswers.includes(id) || progress.mistakes.includes(id),
    ).length;
    const percent = Math.round(
      inSection.reduce((sum, topic) => sum + topicMastery(topic, progress, now).percent, 0) /
        Math.max(1, inSection.length),
    );
    const accuracy = answered === 0 ? null : correct / answered;
    let strength: Strength = 'building';
    if (answered === 0 && percent === 0) strength = 'new';
    else if (accuracy !== null && (accuracy < 0.6 || percent < 40)) strength = 'weak';
    else if (accuracy !== null && accuracy >= 0.8 && percent >= 75) strength = 'strong';
    return {
      id: section.kind === 'branch' ? section.id : section.slug,
      label: section.kind === 'branch' ? section.label : section.title,
      slugs,
      strength,
      percent,
      answered,
      correct,
    };
  });
}
