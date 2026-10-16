import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';

import { BodyPartCard } from './BodyPanels';

afterEach(() => vi.unstubAllGlobals());

it('recovers a failed structure lookup without claiming the structure has no topics', async () => {
  vi.stubGlobal(
    'fetch',
    vi
      .fn()
      .mockResolvedValueOnce(Response.json({ error: {} }, { status: 500 }))
      .mockResolvedValueOnce(
        Response.json({
          data: {
            results: [
              {
                kind: 'Topic',
                topicSlug: 'brachial-plexus',
                topicTitle: 'Brachial plexus',
                excerpt: 'Brachial plexus',
                href: '/learn/brachial-plexus',
              },
            ],
          },
        }),
      ),
  );
  render(<BodyPartCard id="nerves/brachial-plexus" onClose={() => undefined} />);
  await userEvent.click(await screen.findByRole('button', { name: 'Retry search' }));
  expect(await screen.findByRole('link', { name: 'Brachial plexus' })).toHaveAttribute(
    'href',
    '/learn/brachial-plexus',
  );
  expect(screen.queryByText(/Not in a topic yet/)).not.toBeInTheDocument();
  expect(screen.queryByText('Looking…')).not.toBeInTheDocument();
});
