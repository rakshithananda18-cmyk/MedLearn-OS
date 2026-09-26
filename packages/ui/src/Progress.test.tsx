import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressBar, ProgressRing } from './Progress';

describe('ProgressBar', () => {
  it('exposes the percentage to assistive technology', () => {
    render(<ProgressBar label="Upper limb" value={12} max={40} showValue />);
    const bar = screen.getByRole('progressbar', { name: 'Upper limb' });
    expect(bar).toHaveAttribute('aria-valuenow', '30');
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it.each([
    [150, 100, '100'],
    [-5, 100, '0'],
    [3, 0, '0'],
  ])('clamps value %i of %i to %s%%', (value, max, expected) => {
    render(<ProgressBar label="x" value={value} max={max} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', expected);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProgressBar label="Today" value={2} max={5} showValue />);
    await expectNoA11yViolations(container);
  });
});

describe('ProgressRing', () => {
  it('shows and exposes the percentage', () => {
    render(<ProgressRing label="Anatomy mastery" value={45} />);
    expect(screen.getByRole('progressbar', { name: 'Anatomy mastery' })).toHaveAttribute(
      'aria-valuenow',
      '45',
    );
    expect(screen.getByText('45%')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ProgressRing label="Mastery" value={70} size="lg" />);
    await expectNoA11yViolations(container);
  });
});
