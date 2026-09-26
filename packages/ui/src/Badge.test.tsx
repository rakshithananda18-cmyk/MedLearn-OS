import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';
import { Clock } from './icons';

describe('Badge', () => {
  it('shows its label with the tone colours', () => {
    render(<Badge tone="warning">Due today</Badge>);
    expect(screen.getByText('Due today')).toHaveClass('bg-warning-subtle', 'text-warning');
  });

  it('has no accessibility violations with an icon', async () => {
    const { container } = render(
      <Badge tone="primary" icon={Clock}>
        15 min
      </Badge>,
    );
    await expectNoA11yViolations(container);
  });
});
