import type { Metadata } from 'next';

import { Candidates } from './Candidates';

export const metadata: Metadata = {
  title: 'Study companion | MedLearn OS',
  robots: { index: false, follow: false },
};

/** The study companion's candidate looks, in every mood, to choose from. */
export default function CompanionDesignPage() {
  return <Candidates />;
}
