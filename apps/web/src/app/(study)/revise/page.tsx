import type { Metadata } from 'next';

import { ReviseView } from '@/features/revise/ReviseView';

export const metadata: Metadata = { title: 'Revise | MedLearn OS' };

export default function RevisePage() {
  return <ReviseView />;
}
