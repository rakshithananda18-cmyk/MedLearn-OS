'use client';

import type { ReportKind, ReportRecord } from '@medlearn/schemas';
import { Badge, Button, Text } from '@medlearn/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const KIND: Record<ReportKind, string> = {
  'factual-error': 'Factual error',
  unclear: 'Hard to understand',
  typo: 'Spelling or wording',
  visual: 'Picture or 3D',
  other: 'Something else',
};

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

/** What students reported on this topic, open ones first, each resolvable by the reviewer. */
export function ReportList({ reports }: Readonly<{ reports: ReportRecord[] }>) {
  const router = useRouter();
  const [busy, setBusy] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const sorted = [...reports].sort((a, b) => Number(!!a.resolvedAt) - Number(!!b.resolvedAt));

  async function resolve(id: number) {
    setBusy(id);
    setFailed(false);
    try {
      const response = await fetch(`/api/reports/${id}/resolve`, { method: 'POST' });
      if (response.ok) router.refresh();
      else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setBusy(null);
    }
  }

  return (
    <section
      aria-label="Student reports"
      className="flex flex-col gap-2 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
    >
      <h2 className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink">
        Student reports
      </h2>
      {sorted.length === 0 ? <Text tone="muted">No reports.</Text> : null}
      <ul className="flex flex-col">
        {sorted.map((report) => (
          <li
            key={report.id}
            className="flex flex-col gap-1 border-t border-border py-2 first:border-t-0"
          >
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-ink">{KIND[report.kind]}</span>
              <span className="text-xs text-fg-muted">
                Version {report.contentVersion} · {day(report.createdAt)}
              </span>
              {report.resolvedAt ? <Badge tone="success">Resolved</Badge> : null}
            </span>
            {report.note ? <span className="text-sm text-fg">{report.note}</span> : null}
            {report.resolvedAt ? null : (
              <Button
                variant="ghost"
                size="sm"
                className="self-start"
                loading={busy === report.id}
                disabled={busy !== null}
                onClick={() => void resolve(report.id)}
              >
                Mark resolved
              </Button>
            )}
          </li>
        ))}
      </ul>
      {failed ? (
        <Text size="sm" role="status">
          Not saved. Try again.
        </Text>
      ) : null}
    </section>
  );
}
