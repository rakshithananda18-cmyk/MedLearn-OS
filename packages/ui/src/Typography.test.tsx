import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Display, Eyebrow, Heading, Text } from './Typography';

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

describe('Display and Eyebrow', () => {
  it('set a gold serif title with an italic accent under a small label', () => {
    render(
      <>
        <Eyebrow>Saturday</Eyebrow>
        <Display>
          Small steps, <em>every day</em>
        </Display>
      </>,
    );
    const title = screen.getByRole('heading', { level: 1, name: 'Small steps, every day' });
    expect(title).toHaveClass('font-display', 'text-gold');
    expect(screen.getByText('every day').tagName).toBe('EM');
    expect(screen.getByText('Saturday')).toHaveClass('uppercase', 'tracking-eyebrow');
  });

  it('can be a smaller, non-heading line', () => {
    render(
      <Display as="p" size="lg">
        Quiet
      </Display>,
    );
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.getByText('Quiet')).toHaveClass('text-3xl');
  });
});
