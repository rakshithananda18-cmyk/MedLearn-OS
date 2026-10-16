'use client';

import type { ComponentProps } from 'react';

import type { PracticeQuestion } from '@/content/topics';
import { StudyLoadState } from '@/features/study/StudyLoadState';
import { useStudyContent } from '@/features/study/useStudyContent';

import { PracticeSession } from './PracticeSession';

export function LoadedPracticeSession({
  ids,
  initial,
  ...props
}: Readonly<
  Omit<ComponentProps<typeof PracticeSession>, 'questions'> & {
    ids: string[];
    initial: PracticeQuestion[];
  }
>) {
  const content = useStudyContent('practice', ids, initial);
  if (content.loading || content.error)
    return <StudyLoadState error={content.error} onRetry={content.retry} onExit={props.onExit} />;
  return (
    <PracticeSession {...props} questions={ids.flatMap((id) => content.items.get(id) ?? [])} />
  );
}
