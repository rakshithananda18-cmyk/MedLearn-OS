import { Card, Display, Eyebrow, Text } from '@medlearn/ui';
import { BookOpen } from '@medlearn/ui/icons';
import type { Metadata } from 'next';
import { connection } from 'next/server';

import { TOPICS } from '@/content/topics';
import { LinkCard } from '@/features/shell/LinkCard';
import { Screen } from '@/features/shell/Screen';
import { getSubjectsRepository } from '@/server/db';

export const metadata: Metadata = { title: 'Subjects | MedLearn OS' };

export default async function SubjectsPage() {
  await connection();
  const subjects = await getSubjectsRepository().list();

  return (
    <Screen>
      <div className="flex flex-col gap-3">
        <Eyebrow>First year</Eyebrow>
        <Display>
          Your <em>subjects</em>
        </Display>
      </div>
      <ul aria-label="Subjects" className="flex flex-col gap-8">
        {subjects.map((subject) => {
          const topics = TOPICS.filter((topic) => topic.subjectSlug === subject.slug);
          return (
            <li key={subject.id}>
              <section aria-labelledby={`subject-${subject.slug}`} className="flex flex-col gap-3">
                <h2
                  id={`subject-${subject.slug}`}
                  className="font-display text-2xl tracking-display text-ink"
                >
                  {subject.name}
                </h2>
                {topics.length === 0 ? (
                  <Card tone="glass">
                    <Text size="sm" tone="muted">
                      Topics coming soon.
                    </Text>
                  </Card>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {topics.map((topic) => (
                      <li key={topic.slug}>
                        <LinkCard
                          href={`/learn/${topic.slug}`}
                          icon={BookOpen}
                          title={topic.title}
                          meta={`${topic.estimatedMinutes} min · ${topic.summary}`}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </li>
          );
        })}
      </ul>
    </Screen>
  );
}
