import {
  dueCardIds,
  type LearnerProgress,
  mistakeCardId,
  type PlannableTopic,
  topicCardIds,
} from './today';

/** How well a topic is learned, for the Progress screen. */
export interface TopicMastery {
  slug: string;
  title: string;
  /** 0–100 once the lesson is done: the lesson, practice and recall count equally. */
  percent: number;
  lessonDone: boolean;
  questionsCorrect: number;
  questionsTotal: number;
  cardsReviewed: number;
  cardsTotal: number;
  dueCards: number;
  /** Missed questions whose recall cards are still waiting to be recalled. */
  weakSpots: number;
}

const ratio = (part: number, whole: number) => (whole === 0 ? 1 : part / whole);

export function topicMastery(
  topic: PlannableTopic,
  progress: LearnerProgress,
  now: Date,
): TopicMastery {
  const lessonDone = progress.completedLessons.includes(topic.slug);
  const questionsCorrect = topic.questionIds.filter((id) =>
    progress.correctAnswers.includes(id),
  ).length;
  const cards = topicCardIds(topic, progress);
  const cardsReviewed = cards.filter((id) => progress.reviews[id] !== undefined).length;
  const due = new Set(dueCardIds([topic], progress, now));
  const weakSpots = topic.questionIds.filter(
    (id) => progress.mistakes.includes(id) && due.has(mistakeCardId(id)),
  ).length;
  const score =
    (lessonDone ? 1 : 0) +
    ratio(questionsCorrect, topic.questionIds.length) +
    ratio(cardsReviewed, cards.length);

  return {
    slug: topic.slug,
    title: topic.title,
    percent: lessonDone ? Math.round((100 * score) / 3) : 0,
    lessonDone,
    questionsCorrect,
    questionsTotal: topic.questionIds.length,
    cardsReviewed,
    cardsTotal: cards.length,
    dueCards: due.size,
    weakSpots,
  };
}
