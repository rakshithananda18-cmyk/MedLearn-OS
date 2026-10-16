import { expectNoA11yViolations } from '@medlearn/test-utils/dom';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';

import { videosOf } from '@/content/videos';
import { clockTime } from '@/features/notes/TopicNotes';
import { readProgress, resetProgress } from '@/features/progress/store';

import { TopicStudy } from './TopicStudy';

afterEach(() => act(() => resetProgress()));

const renderTopic = () =>
  render(
    <TopicStudy
      slug="brachial-plexus"
      title="Brachial plexus"
      poster="/posters/brachial-plexus.webp"
      videos={videosOf('brachial-plexus')}
      back={<a href="/subjects?topic=brachial-plexus">Library</a>}
      intro={<h1>Brachial plexus</h1>}
      study={<p>Ways to study</p>}
      keyFacts={['Roots C5 to T1.']}
    />,
  );

/** What the player posts back once asked to report its position. */
function playerSays(frame: HTMLIFrameElement, currentTime: number) {
  act(() => {
    window.dispatchEvent(
      new MessageEvent('message', {
        origin: 'https://www.youtube-nocookie.com',
        source: frame.contentWindow,
        data: JSON.stringify({ event: 'infoDelivery', info: { currentTime } }),
      }),
    );
  });
}

describe('TopicStudy', () => {
  it('turns into a lecture room: the video beside notes that mark its time', async () => {
    const { container } = renderTopic();
    expect(screen.getByRole('link', { name: 'Library' })).toBeInTheDocument();
    // Checked before the player loads: axe cannot reach inside a cross-origin frame here.
    await expectNoA11yViolations(container);
    await userEvent.click(screen.getByRole('button', { name: /structure and location/ }));

    const lecture = screen.getByRole('region', { name: /^Lecture: Brachial plexus: structure/ });
    const frame = within(lecture).getByTitle('Brachial plexus: structure and location');
    expect(frame).toHaveAttribute(
      'src',
      expect.stringMatching(/^https:\/\/www\.youtube-nocookie\.com\/embed\/hrKesc_XSzo\?/),
    );
    expect(screen.getByRole('heading', { name: 'Lecture notes' })).toBeInTheDocument();
    expect(screen.getByText('Roots C5 to T1.')).toBeInTheDocument();

    playerSays(frame as HTMLIFrameElement, 125.4);
    await userEvent.click(screen.getByRole('button', { name: 'Mark the time' }));
    await userEvent.keyboard('trunks form here');
    await userEvent.tab();
    expect(readProgress().notes['brachial-plexus']?.text).toBe('[2:05] trunks form here');

    await userEvent.click(screen.getByRole('button', { name: 'Back to the topic' }));
    expect(screen.queryByRole('region', { name: /^Lecture/ })).not.toBeInTheDocument();
    expect(screen.getByText('Ways to study')).toBeInTheDocument();
  });

  it('shows two lectures and folds the rest behind "More lectures"', async () => {
    const videos = videosOf('peritoneal-folds');
    expect(videos.length).toBeGreaterThan(2);
    render(
      <TopicStudy
        slug="peritoneal-folds"
        title="Peritoneal folds"
        poster="/posters/peritoneal-folds.webp"
        videos={videos}
        back={<a href="/subjects">Library</a>}
        intro={<h1>Peritoneal folds</h1>}
        study={<p>Ways to study</p>}
        keyFacts={[]}
      />,
    );
    const titles = videos.map((video) => video.title);
    expect(screen.queryByRole('button', { name: new RegExp(titles[2] ?? '') })).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: /More lectures/ }));
    expect(screen.getByRole('button', { name: new RegExp(titles[2] ?? '') })).toBeInTheDocument();
  });

  it('writes clock times as minutes and seconds', () => {
    expect(clockTime(0)).toBe('0:00');
    expect(clockTime(59.9)).toBe('0:59');
    expect(clockTime(3725)).toBe('62:05');
  });

  it('moves keyboard focus into a lecture and restores it to the overview on return', async () => {
    renderTopic();
    const title = 'Brachial plexus: structure and location';
    const button = screen.getByRole('button', { name: new RegExp(title) });
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('heading', { level: 1, name: title })).toHaveFocus();
    await userEvent.click(screen.getByRole('button', { name: 'Back to the topic' }));
    expect(screen.getByRole('button', { name: new RegExp(title) })).toHaveFocus();
  });
});
