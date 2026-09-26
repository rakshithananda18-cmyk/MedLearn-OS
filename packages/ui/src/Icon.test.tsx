import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Icon } from './Icon';
import { Brain } from './icons';

describe('Icon', () => {
  it('is hidden from screen readers when decorative', () => {
    const { container } = render(<Icon icon={Brain} />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('is announced as an image when it carries meaning', () => {
    render(<Icon icon={Brain} label="Spaced repetition" />);
    expect(screen.getByRole('img', { name: 'Spaced repetition' })).toBeInTheDocument();
  });

  it('draws outlined strokes at a constant 1.5px width', () => {
    const { container } = render(<Icon icon={Brain} size="lg" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('width', '24');
    expect(Number(svg?.getAttribute('stroke-width'))).toBeLessThanOrEqual(1.5);
  });
});
