'use client';

import { BookOpen } from '@medlearn/ui/icons';

import { lessonAction, useLessonStep } from '@/features/lesson/checkpoint';
import { useProgress } from '@/features/progress/store';

import { ModeTile } from './TopicParts';

/**
 * The topic's main action, worded from this device's progress: the page around it is rendered
 * once on the server, which cannot know whether the student has started or finished the lesson.
 */
export function LessonModeTile({
  slug,
  steps,
  minutes,
  wide = false,
}: Readonly<{ slug: string; steps: number; minutes: number; wide?: boolean }>) {
  const done = useProgress().completedLessons.includes(slug);
  const step = useLessonStep(slug);
  const at = step === null ? null : Math.min(step, steps - 1);
  return (
    <ModeTile
      href={`/learn/${slug}/lesson`}
      icon={BookOpen}
      title={lessonAction(done, at)}
      meta={at ? `Step ${at + 1} of ${steps} · ${minutes} min` : `${steps} steps · ${minutes} min`}
      primary
      wide={wide}
    />
  );
}
