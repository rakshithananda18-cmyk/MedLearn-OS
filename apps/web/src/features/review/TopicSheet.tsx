import type { Topic } from '@medlearn/schemas';
import type { ReactNode } from 'react';

import { getBook } from '@/content/books';

/** A titled block of the sheet. */
function Part({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section
      aria-label={title}
      className="flex flex-col gap-2 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
    >
      <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">{title}</h2>
      {children}
    </section>
  );
}

/**
 * Everything in a topic a reviewer checks against the book, in reading order: where to read it,
 * the key facts, the lesson, the diagram and its cases, the questions with their answers, the
 * cards, and the labels and views of the 3D model.
 */
export function TopicSheet({ topic }: Readonly<{ topic: Topic }>) {
  const visual = topic.visual.kind === 'path' ? topic.visual : null;
  const model = visual?.model3d;
  return (
    <div className="flex flex-col gap-4">
      <Part title="Check against">
        <ul className="flex flex-col gap-1 text-sm text-ink">
          {topic.readIn.map((ref) => (
            <li key={`${ref.bookId}-${ref.pages}`}>
              <span className="font-semibold">{getBook(ref.bookId)?.title ?? ref.bookId}</span>,{' '}
              {ref.chapter}, pages {ref.pages}
            </li>
          ))}
        </ul>
      </Part>

      <Part title="Key facts">
        <ol className="flex list-decimal flex-col gap-2 pl-4 text-sm text-ink">
          {topic.keyFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ol>
      </Part>

      <Part title="Lesson">
        <ol className="flex flex-col gap-3">
          {topic.lesson.map((step) => (
            <li key={step.id} className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">{step.title}</span>
              <span className="text-sm text-fg">{step.body}</span>
            </li>
          ))}
        </ol>
      </Part>

      {visual ? (
        <Part title="Diagram and cases">
          <ul className="grid gap-1 text-sm text-fg md:grid-cols-2">
            {visual.diagram.nodes.map((node) => (
              <li key={node.id}>
                <span className="font-semibold text-ink">{node.label.replaceAll('\n', ' ')}</span>
                {node.name !== node.label ? ` · ${node.name}` : ''}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-2 pt-2">
            {visual.lesions.map((lesion) => (
              <li key={lesion.id} className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-ink">{lesion.label}</span>
                <span className="text-sm text-fg">{lesion.explanation}</span>
              </li>
            ))}
          </ul>
        </Part>
      ) : null}

      <Part title="Questions">
        <ol className="flex flex-col gap-3">
          {topic.questions.map((question) => (
            <li key={question.id} className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink">{question.prompt}</span>
              <ul className="flex flex-col pl-3 text-sm">
                {question.options.map((option) => (
                  <li
                    key={option.id}
                    className={
                      option.id === question.answerId
                        ? 'font-semibold text-success'
                        : 'text-fg-muted'
                    }
                  >
                    {option.id === question.answerId ? 'Answer: ' : ''}
                    {option.text}
                  </li>
                ))}
              </ul>
              <span className="text-sm text-fg">{question.explanation}</span>
            </li>
          ))}
        </ol>
      </Part>

      <Part title="Recall cards">
        <dl className="flex flex-col gap-2 text-sm">
          {topic.cards.map((card) => (
            <div key={card.id} className="flex flex-col">
              <dt className="font-semibold text-ink">{card.front}</dt>
              <dd className="text-fg">{card.back}</dd>
            </div>
          ))}
        </dl>
      </Part>

      {model ? (
        <Part title="3D labels and views">
          <ul className="flex flex-col gap-1 text-sm text-fg">
            {model.parts.map((part) => (
              <li key={part.id}>
                <span className="font-semibold text-ink">{part.name}</span>
                {part.about ? ` · ${part.about}` : ''}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-1 pt-2 text-sm text-fg">
            {model.stops.map((stop) => (
              <li key={stop.id}>
                <span className="font-semibold text-ink">View: {stop.title}</span> ·{' '}
                {stop.description}
              </li>
            ))}
          </ul>
        </Part>
      ) : null}
    </div>
  );
}
