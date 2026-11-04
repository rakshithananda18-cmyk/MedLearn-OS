import type { Metadata } from 'next';

import { assetUrl } from '@/content/asset-url';
import { kneeJoint } from '@/content/knee-joint';
import { KneeAtlasSample } from '@/features/samples/KneeAtlasSample';

export const metadata: Metadata = {
  title: 'Knee atlas · design sample | MedLearn OS',
  robots: { index: false, follow: false },
};

/** An isolated design sample, reviewed before extending it to the study screens. */
export default function KneeAtlasSamplePage() {
  const visual = kneeJoint.visual;
  if (visual.kind !== 'path' || !visual.model3d) return null;

  return (
    <KneeAtlasSample
      model={{ ...visual.model3d, src: assetUrl(visual.model3d.src), traces: [] }}
      diagram={visual.diagram}
    />
  );
}
