import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './Button';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('explains the empty state and offers the next step', () => {
    render(
      <EmptyState
        title="No reviews due"
        description="Cards come back here when it is time to recall them."
        action={<Button>Learn something new</Button>}
      />,
    );
    expect(screen.getByText('No reviews due')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn something new' })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<EmptyState title="Nothing here yet" />);
    await expectNoA11yViolations(container);
  });
});
