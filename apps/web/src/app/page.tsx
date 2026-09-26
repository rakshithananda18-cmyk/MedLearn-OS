import { Card, Heading, Stack, Text } from '@medlearn/ui';
import { connection } from 'next/server';

import { getSubjectsRepository } from '@/server/db';

export default async function HomePage() {
  await connection();
  const subjects = await getSubjectsRepository().list();

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      <Stack gap={2}>
        <Heading level={1}>MedLearn OS</Heading>
        <Text tone="muted">Foundation build. Subjects loaded from the database:</Text>
      </Stack>
      <Card>
        <Stack as="ul" gap={3} aria-label="Subjects">
          {subjects.map((subject) => (
            <li key={subject.id} className="text-base font-medium text-fg">
              {subject.name}
            </li>
          ))}
        </Stack>
      </Card>
    </main>
  );
}
