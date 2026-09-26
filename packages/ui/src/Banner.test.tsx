import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Banner } from './Banner';
import { Button } from './Button';

describe('Banner', () => {
  it('uses a polite status for information and an alert for danger', () => {
    render(
      <>
        <Banner tone="offline" title="You are offline" />
        <Banner tone="danger" title="Sync failed" />
      </>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('You are offline');
    expect(screen.getByRole('alert')).toHaveTextContent('Sync failed');
  });

  it('shows the message and an action', () => {
    render(
      <Banner
        tone="warning"
        title="3 days missed"
        action={<Button size="sm">Plan catch-up</Button>}
      >
        We will spread the backlog over the next week.
      </Banner>,
    );
    expect(screen.getByText('We will spread the backlog over the next week.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Plan catch-up' })).toBeInTheDocument();
  });

  it('has no accessibility violations in every tone', async () => {
    const { container } = render(
      <>
        {(['info', 'success', 'warning', 'danger', 'offline'] as const).map((tone) => (
          <Banner key={tone} tone={tone} title={tone} />
        ))}
      </>,
    );
    await expectNoA11yViolations(container);
  });
});
