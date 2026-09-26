import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { OfflineBanner } from './Offline';

afterEach(() => vi.restoreAllMocks());

describe('OfflineBanner', () => {
  it('appears when the phone loses its network and goes when it is back', async () => {
    const online = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const { container } = render(<OfflineBanner />);
    expect(screen.queryByText('You are offline')).not.toBeInTheDocument();

    online.mockReturnValue(false);
    act(() => {
      globalThis.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByText('You are offline')).toBeInTheDocument();
    expect(screen.getByText(/Pages you have opened still work/)).toBeInTheDocument();
    await expectNoA11yViolations(container);

    online.mockReturnValue(true);
    act(() => {
      globalThis.dispatchEvent(new Event('online'));
    });
    expect(screen.queryByText('You are offline')).not.toBeInTheDocument();
  });
});
