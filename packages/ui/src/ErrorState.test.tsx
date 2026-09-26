import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  it('announces the title and description as an alert', () => {
    render(<ErrorState title="Could not load" description="Try again soon." />);
    const alert = screen.getByRole('alert', { name: 'Could not load' });
    expect(alert).toHaveTextContent('Try again soon.');
  });

  it('shows a reference when provided', () => {
    render(<ErrorState title="Could not load" description="x" reference="abc123" />);
    expect(screen.getByText('abc123')).toBeInTheDocument();
  });

  it('calls onRetry when the retry button is pressed', async () => {
    const onRetry = vi.fn();
    render(<ErrorState title="Could not load" description="x" onRetry={onRetry} />);
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('renders no button without onRetry', () => {
    render(<ErrorState title="Could not load" description="x" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ErrorState
        title="Could not load"
        description="x"
        reference="r1"
        onRetry={() => undefined}
      />,
    );
    await expectNoA11yViolations(container);
  });
});
