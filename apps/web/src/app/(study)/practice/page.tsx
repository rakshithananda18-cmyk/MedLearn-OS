import type { Metadata } from 'next';

import { PracticeView } from '@/features/practice/PracticeView';

export const metadata: Metadata = { title: 'Practice | MedLearn OS' };

export default function PracticePage() {
  return <PracticeView />;
}
