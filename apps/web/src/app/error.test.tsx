import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { clientLogger } from '@/lib/client-logger';

import RouteError from './error';

vi.mock('@/lib/client-logger', () => ({ clientLogger: { error: vi.fn() } }));

describe('RouteError', () => {
  const error = Object.assign(new Error('fetch failed'), { digest: 'digest-42' });

  beforeEach(() => vi.mocked(clientLogger.error).mockClear());

  it('shows a friendly message with the error reference', () => {
    render(<RouteError error={error} retry={() => undefined} />);
    expect(screen.getByRole('alert', { name: 'This page could not load' })).toBeInTheDocument();
    expect(screen.getByText('digest-42')).toBeInTheDocument();
  });

  it('logs the failure through the browser logger once', () => {
    render(<RouteError error={error} retry={() => undefined} />);
    expect(clientLogger.error).toHaveBeenCalledOnce();
    expect(clientLogger.error).toHaveBeenCalledWith('Route failed to render', {
      digest: 'digest-42',
      message: 'fetch failed',
    });
  });

  it('retries when asked', async () => {
    const retry = vi.fn();
    render(<RouteError error={error} retry={retry} />);
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
