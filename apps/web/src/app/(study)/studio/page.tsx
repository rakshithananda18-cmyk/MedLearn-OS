import type { Metadata } from 'next';

import { BODY_MODEL, BODY_REGIONS } from '@/content/body';
import { studioTopics } from '@/content/studio';
import { Studio } from '@/features/studio/Studio';

export const metadata: Metadata = { title: '3D studio | MedLearn OS' };

interface Props {
  readonly searchParams: Promise<{ topic?: string | string[] }>;
}

/** The 3D studio: the whole body, or one topic's model with its lesson knowledge. */
export default async function StudioPage({ searchParams }: Props) {
  const { topic } = await searchParams;
  return (
    <Studio
      topics={studioTopics()}
      regions={BODY_REGIONS}
      body={BODY_MODEL}
      initialTopic={typeof topic === 'string' ? topic : null}
    />
  );
}
