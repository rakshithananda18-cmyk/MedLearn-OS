'use client';

import { cx, Icon, IconButton } from '@medlearn/ui';
import { ArrowLeft, Check, Play } from '@medlearn/ui/icons';
import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import { type TopicVideo, videoMinutes } from '@/content/videos';
import { clockTime, TopicNotes } from '@/features/notes/TopicNotes';

import { TopicHero } from './TopicParts';

const PLAYER_ORIGIN = 'https://www.youtube-nocookie.com';

/**
 * A lecture from YouTube's privacy-enhanced player. It is asked to report its position (the
 * messages its own JavaScript API uses), so notes can be marked with the time.
 */
function LecturePlayer({
  video,
  onTime,
}: Readonly<{ video: TopicVideo; onTime: (seconds: number) => void }>) {
  const frame = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const listen = (event: MessageEvent) => {
      if (event.origin !== PLAYER_ORIGIN || event.source !== frame.current?.contentWindow) return;
      try {
        const data = JSON.parse(String(event.data)) as {
          event?: string;
          info?: { currentTime?: unknown };
        };
        const time = data.info?.currentTime;
        if (data.event === 'infoDelivery' && typeof time === 'number') onTime(time);
      } catch {
        // Not a player message.
      }
    };
    window.addEventListener('message', listen);
    return () => window.removeEventListener('message', listen);
  }, [onTime]);

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    enablejsapi: '1',
    origin: window.location.origin,
  });
  return (
    <iframe
      ref={frame}
      src={`${PLAYER_ORIGIN}/embed/${video.id}?${params.toString()}`}
      title={video.title}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowFullScreen
      onLoad={() =>
        frame.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'listening', id: video.id, channel: 'widget' }),
          PLAYER_ORIGIN,
        )
      }
      className="size-full"
    />
  );
}

/** A lecture to watch: its still, length, title and channel, all one button. */
function VideoRow({
  video,
  playing = false,
  onPlay,
}: Readonly<{ video: TopicVideo; playing?: boolean; onPlay: () => void }>) {
  return (
    <button
      type="button"
      aria-pressed={playing}
      onClick={onPlay}
      className={cx(
        'group flex w-full items-center gap-3 rounded-lg border p-2 text-left transition-colors duration-150',
        playing ? 'border-gold bg-surface' : 'border-transparent hover:bg-surface',
      )}
    >
      <span className="relative aspect-video w-1/4 shrink-0 overflow-hidden rounded-md bg-ink">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
          alt=""
          width={320}
          height={180}
          unoptimized
          className="size-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-8 items-center justify-center rounded-full bg-surface text-ink shadow-raised transition-transform duration-150 group-hover:scale-110">
            <Icon icon={playing ? Check : Play} size="sm" />
          </span>
        </span>
        <span className="absolute right-1 bottom-1 rounded-sm bg-ink px-1 text-xs text-canvas">
          {clockTime(video.seconds)}
        </span>
      </span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="line-clamp-2 text-sm font-semibold text-ink">{video.title}</span>
        <span className="text-xs text-fg-muted">
          {video.channel} · {videoMinutes(video)} min
        </span>
      </span>
    </button>
  );
}

/** The topic's lectures, above the ways to study it. */
function Lectures({
  videos,
  onPlay,
}: Readonly<{ videos: TopicVideo[]; onPlay: (video: TopicVideo) => void }>) {
  return (
    <section
      aria-labelledby="lectures-title"
      className="flex flex-col gap-1 rounded-xl border border-glass-border bg-glass p-2 shadow-glass"
    >
      <h2
        id="lectures-title"
        className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink px-2 pt-1"
      >
        Watch the lecture
      </h2>
      <ul className="flex flex-col">
        {videos.map((video) => (
          <li key={video.id}>
            <VideoRow video={video} onPlay={() => onPlay(video)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export interface TopicStudyProps {
  slug: string;
  title: string;
  poster: string | null;
  videos: TopicVideo[];
  /** The way back to the library, shown inside the model's card. */
  back: ReactNode;
  /** The eyebrow, title, summary and sources. */
  intro: ReactNode;
  /** Mastery and the ways to study the topic. */
  study: ReactNode;
  /** What to listen for during a lecture. */
  keyFacts: string[];
}

/**
 * A topic's page: its model beside the ways to study it. Playing a lecture turns the page into a
 * lecture room: the video takes the model's place and the larger share of the width, and the other
 * column becomes the notes, with the lecture's time a button away.
 */
export function TopicStudy({
  slug,
  title,
  poster,
  videos,
  back,
  intro,
  study,
  keyFacts,
}: Readonly<TopicStudyProps>) {
  const [watching, setWatching] = useState<TopicVideo | null>(null);
  const time = useRef<number | null>(null);
  const play = (video: TopicVideo | null) => {
    time.current = null;
    setWatching(video);
    window.scrollTo({ top: 0 });
  };

  if (watching) {
    return (
      <div className="grid gap-4 xl:grid-topic xl:grid-lecture xl:items-start">
        <section
          aria-label={`Lecture: ${watching.title}`}
          className="flex animate-rise flex-col gap-3 rounded-xl border border-glass-border bg-glass p-3 shadow-glass xl:sticky xl:top-8"
        >
          <div className="flex items-center gap-3">
            <IconButton
              icon={ArrowLeft}
              label="Back to the topic"
              variant="secondary"
              onClick={() => play(null)}
            />
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-semibold text-ink">{watching.title}</span>
              <span className="text-xs text-fg-muted">
                {watching.channel} · {videoMinutes(watching)} min · {title}
              </span>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-lg bg-ink">
            <LecturePlayer
              key={watching.id}
              video={watching}
              onTime={(seconds) => {
                time.current = seconds;
              }}
            />
          </div>
          {videos.length > 1 ? (
            <ul aria-label="Other lectures" className="flex flex-col">
              {videos.map((video) => (
                <li key={video.id}>
                  <VideoRow
                    video={video}
                    playing={video.id === watching.id}
                    onPlay={() => play(video)}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
        <div className="flex min-w-0 flex-col gap-4">
          <TopicNotes topicSlug={slug} title="Lecture notes" rows={14} time={() => time.current} />
          {keyFacts.length > 0 ? (
            <section
              aria-labelledby="listen-title"
              className="flex flex-col gap-2 rounded-xl border border-glass-border bg-glass p-4 shadow-glass"
            >
              <h2
                id="listen-title"
                className="text-xs font-semibold uppercase tracking-eyebrow text-gold-ink"
              >
                Listen for
              </h2>
              <ul className="flex flex-col gap-2">
                {keyFacts.map((fact) => (
                  <li key={fact} className="flex gap-2 text-sm text-fg">
                    <Icon icon={Check} size="sm" className="mt-px shrink-0 text-primary" />
                    {fact}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
    );
  }

  const column = (
    <div className="flex min-w-0 flex-col gap-4">
      {poster ? null : back}
      {intro}
      {videos.length > 0 ? <Lectures videos={videos} onPlay={play} /> : null}
      {study}
      <TopicNotes topicSlug={slug} />
    </div>
  );
  if (!poster) return <div className="mx-auto w-full max-w-3xl">{column}</div>;
  return (
    <div className="grid gap-4 xl:grid-topic xl:items-start">
      <div className="xl:sticky xl:top-8">
        <TopicHero slug={slug} poster={poster} back={back} />
      </div>
      {column}
    </div>
  );
}
