import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading, Text } from './Typography';

describe('Heading', () => {
  it.each([1, 2, 3] as const)('renders level %i as the matching heading', (level) => {
    render(<Heading level={level}>Brachial plexus</Heading>);
    expect(screen.getByRole('heading', { level, name: 'Brachial plexus' })).toBeInTheDocument();
  });
});

describe('Text', () => {
  it('renders a paragraph by default and a span on request', () => {
    const { container } = render(
      <>
        <Text>Body</Text>
        <Text as="span" tone="muted" size="sm">
          Caption
        </Text>
      </>,
    );
    expect(container.querySelector('p')).toHaveTextContent('Body');
    expect(screen.getByText('Caption').tagName).toBe('SPAN');
    expect(screen.getByText('Caption')).toHaveClass('text-fg-muted', 'text-sm');
  });
});
