import { Card, Display, Eyebrow, Text } from '@medlearn/ui';
import { BookOpen, PersonStanding } from '@medlearn/ui/icons';
import type { Metadata } from 'next';
import Link from 'next/link';
import { connection } from 'next/server';

import { TOPICS } from '@/content/topics';
import { SearchForm } from '@/features/search/SearchForm';
import { LinkCard } from '@/features/shell/LinkCard';
import { Screen } from '@/features/shell/Screen';
import { getSubjectsRepository } from '@/server/db';

export const metadata: Metadata = { title: 'Subjects | MedLearn OS' };

export default async function SubjectsPage() {
  await connection();
  const subjects = await getSubjectsRepository().list();

  return (
    <Screen width="wide">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between xl:gap-8">
        <div className="flex flex-col gap-3">
          <Eyebrow>First year</Eyebrow>
          <Display>
            Your <em>subjects</em>
          </Display>
        </div>
        <div className="xl:w-full xl:max-w-lg">
          <SearchForm />
        </div>
      </div>
      <div className="grid gap-3 lg:grid-cols-2 lg:items-center">
        <LinkCard
          href="/studio"
          icon={PersonStanding}
          title="Pick from the body"
          meta="Explore the 3D body and open any region's topics"
        />
        <Text size="sm" className="lg:px-4">
          <Link
            href="/books"
            className="font-semibold text-primary-strong underline-offset-4 hover:underline"
          >
            Choose the books you follow
          </Link>{' '}
          and every topic points you to the right chapter.
        </Text>
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
                  <ul className="grid gap-3 lg:grid-cols-2">
                    {topics.map((topic) => (
                      <li key={topic.slug} className="flex">
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
