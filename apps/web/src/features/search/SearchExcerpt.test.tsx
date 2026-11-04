import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SearchExcerpt } from './SearchExcerpt';

describe('search excerpt', () => {
  it('marks matching words while keeping personal text escaped', () => {
    const { container } = render(
      <SearchExcerpt text={'<script>Knee joint</script>'} query="knee (joint)" />,
    );
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelectorAll('mark')).toHaveLength(2);
    expect(screen.getByText('Knee')).toBeVisible();
    expect(container.textContent).toBe('<script>Knee joint</script>');
  });
});
