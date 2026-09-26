import type { Metadata } from 'next';

import { Gallery } from './Gallery';

export const metadata: Metadata = {
  title: 'Design system | MedLearn OS',
  robots: { index: false, follow: false },
};

/** Living catalogue of the design system: every shared component in both themes. */
export default function DesignPage() {
  return <Gallery />;
}
