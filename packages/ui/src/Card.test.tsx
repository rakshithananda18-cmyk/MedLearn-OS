import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders its content on a raised surface', () => {
    render(<Card>Today</Card>);
    expect(screen.getByText('Today')).toHaveClass('bg-surface', 'shadow-raised');
  });

  it('can be a semantic element', () => {
    render(
      <Card as="article" aria-label="Topic">
        x
      </Card>,
    );
    expect(screen.getByRole('article', { name: 'Topic' })).toBeInTheDocument();
  });
});
