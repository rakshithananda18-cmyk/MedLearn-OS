import { Card, Heading, Stack, Text } from '@medlearn/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { connection } from 'next/server';

import { TOPICS } from '@/content/topics';
import { getSubjectsRepository } from '@/server/db';

export const metadata: Metadata = { title: 'Subjects | MedLearn OS' };

export default async function SubjectsPage() {
  await connection();
  const subjects = await getSubjectsRepository().list();

  return (
    <>
      <Heading level={1}>Subjects</Heading>
      <ul aria-label="Subjects" className="flex flex-col gap-3">
        {subjects.map((subject) => {
          const topics = TOPICS.filter((topic) => topic.subjectSlug === subject.slug);
          return (
            <li key={subject.id}>
              <Card as="section" aria-labelledby={`subject-${subject.slug}`}>
                <Stack gap={2}>
                  <h2 id={`subject-${subject.slug}`} className="text-lg font-semibold text-ink">
                    {subject.name}
                  </h2>
                  {topics.length === 0 ? (
                    <Text size="sm" tone="muted">
                      Topics coming soon.
                    </Text>
                  ) : (
                    <ul className="flex flex-col gap-1">
                      {topics.map((topic) => (
                        <li key={topic.slug}>
                          <Link
                            href={`/learn/${topic.slug}`}
                            className="font-medium text-primary-strong underline-offset-4 hover:underline"
                          >
                            {topic.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </Stack>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}
