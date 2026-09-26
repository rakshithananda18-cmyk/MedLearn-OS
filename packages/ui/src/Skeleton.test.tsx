import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';
import { Spinner } from './Spinner';

describe('Skeleton', () => {
  it('is hidden from screen readers and takes its shape from tokens', () => {
    const { container } = render(<Skeleton className="h-4 w-full" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstChild).toHaveClass('animate-pulse', 'h-4', 'w-full');
  });
});

describe('Spinner', () => {
  it('announces its label as a status', () => {
    const { getByRole } = render(<Spinner label="Loading lesson" />);
    expect(getByRole('status')).toHaveTextContent('Loading lesson');
  });
});
