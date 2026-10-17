import type { CSSProperties, ReactNode } from 'react';

// The study companion: an original character drawn in code, with one face and one set of moods
// shared by every look. Three looks are offered while the founder chooses (vertebra, neuron and
// heart); the others go once one is picked.

export type Mood =
  | 'calm'
  | 'happy'
  | 'proud'
  | 'encouraging'
  | 'thinking'
  | 'curious'
  | 'sleepy'
  | 'worried'
  | 'surprised';

/** Every mood, in the order a student meets them, with what sets it off. */
export const MOODS: readonly { id: Mood; label: string; when: string }[] = [
  { id: 'calm', label: 'Calm', when: 'Nothing happening' },
  { id: 'happy', label: 'Happy', when: 'A right answer, a card remembered' },
  { id: 'proud', label: 'Proud', when: 'A lesson finished, the daily goal met' },
  { id: 'encouraging', label: 'Encouraging', when: 'A wrong answer, a card forgotten' },
  { id: 'thinking', label: 'Thinking', when: 'Waiting on the AI, a plan being made' },
  { id: 'curious', label: 'Curious', when: 'A new topic opened' },
  { id: 'sleepy', label: 'Sleepy', when: 'Late at night, or idle for long' },
  { id: 'worried', label: 'Worried', when: 'A streak at risk, days missed' },
  { id: 'surprised', label: 'Surprised', when: 'A long streak, a badge earned' },
];

export type Species = 'atlas' | 'neura' | 'pulse';

type Point = readonly [number, number];

interface Look {
  /** What it is, for screen readers. */
  kind: string;
  fill: string;
  line: string;
  cheek: string;
  /** Where the face sits. */
  face: Point;
  /** Shoulders, left then right (as seen). */
  shoulders: readonly [Point, Point];
  /** How far the arms stand out at rest, in degrees (the vertebra's transverse processes). */
  rest: number;
  /** The right arm's angle that brings its hand to the cheek, for "thinking". */
  chin: number;
  /** Drawn behind the arms and body. */
  back: ReactNode;
  body: ReactNode;
}

const INK = 'var(--color-mascot-ink)';

/** A tube with an outline: a vessel, a dendrite, an axon. */
function Tube({
  d,
  fill,
  line,
  width,
}: Readonly<{ d: string; fill: string; line: string; width: number }>) {
  return (
    <>
      <path d={d} fill="none" stroke={line} strokeWidth={width + 5} strokeLinecap="round" />
      <path d={d} fill="none" stroke={fill} strokeWidth={width} strokeLinecap="round" />
    </>
  );
}

const PULSE = {
  fill: 'var(--color-mascot-heart)',
  line: 'var(--color-mascot-heart-line)',
  vessel: 'var(--color-mascot-heart-vessel)',
  vein: 'var(--color-mascot-heart-vein)',
};
const NEURA = {
  fill: 'var(--color-mascot-neuron)',
  line: 'var(--color-mascot-neuron-line)',
  myelin: 'var(--color-mascot-neuron-myelin)',
};
const ATLAS = {
  fill: 'var(--color-mascot-vertebra)',
  line: 'var(--color-mascot-vertebra-line)',
  disc: 'var(--color-mascot-disc)',
  discLine: 'var(--color-mascot-disc-line)',
};

const LOOKS: Record<Species, Look> = {
  // A heart: the aortic arch and its three branches on top, the pulmonary trunk beside it.
  pulse: {
    kind: 'heart',
    fill: PULSE.fill,
    line: PULSE.line,
    cheek: 'var(--color-mascot-heart-cheek)',
    face: [100, 108],
    shoulders: [
      [46, 110],
      [154, 110],
    ],
    rest: 0,
    chin: -80,
    back: (
      <>
        <Tube
          d="M88 66 C84 52 78 44 70 38"
          fill={PULSE.vein}
          line="var(--color-mascot-heart-vein-line)"
          width={13}
        />
        <Tube d="M116 34 L112 20" fill={PULSE.vessel} line={PULSE.line} width={7} />
        <Tube d="M128 30 L128 15" fill={PULSE.vessel} line={PULSE.line} width={7} />
        <Tube d="M140 33 L146 20" fill={PULSE.vessel} line={PULSE.line} width={7} />
        <Tube d="M106 64 C100 30 150 22 150 56" fill={PULSE.vessel} line={PULSE.line} width={15} />
      </>
    ),
    body: (
      <>
        <path
          d="M100 66 C88 46 56 42 44 62 C32 84 38 112 58 134 C72 150 92 164 106 178 C122 162 142 146 154 128 C170 104 168 74 152 58 C136 44 110 48 100 66 Z"
          fill={PULSE.fill}
          stroke={PULSE.line}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <ellipse
          cx={64}
          cy={78}
          rx={11}
          ry={6}
          transform="rotate(-35 64 78)"
          fill="var(--color-mascot-light)"
          opacity={0.4}
        />
      </>
    ),
  },
  // A neuron: dendrites for hair and arms, and an axon with its myelin and end bulbs for a tail.
  neura: {
    kind: 'neuron',
    fill: NEURA.fill,
    line: NEURA.line,
    cheek: 'var(--color-mascot-neuron-cheek)',
    face: [100, 108],
    shoulders: [
      [54, 116],
      [146, 116],
    ],
    rest: 0,
    chin: -80,
    back: (
      <>
        <Tube d="M84 62 C78 46 68 38 56 32 M67 38 C64 29 66 22 71 15" {...NEURA} width={6} />
        <Tube d="M100 56 C100 41 104 31 113 21 M104 33 C96 27 92 20 92 11" {...NEURA} width={6} />
        <Tube
          d="M118 61 C127 47 139 41 150 37 M138 42 C144 34 152 30 161 30"
          {...NEURA}
          width={6}
        />
        <path
          d="M126 148 C138 168 158 174 172 162"
          fill="none"
          stroke={NEURA.line}
          strokeWidth={15}
          strokeLinecap="round"
        />
        <path
          d="M126 148 C138 168 158 174 172 162"
          fill="none"
          stroke={NEURA.myelin}
          strokeWidth={10}
          strokeDasharray="13 6"
          strokeLinecap="butt"
        />
        {(
          [
            [178, 152],
            [183, 163],
            [176, 173],
          ] as const
        ).map(([cx, cy]) => (
          <circle
            key={cx + cy}
            cx={cx}
            cy={cy}
            r={5.5}
            fill={NEURA.fill}
            stroke={NEURA.line}
            strokeWidth={3.5}
          />
        ))}
      </>
    ),
    body: (
      <>
        <path
          d="M100 55 C131 53 152 75 150 105 C148 135 128 155 100 155 C70 155 50 135 50 105 C50 75 70 57 100 55 Z"
          fill={NEURA.fill}
          stroke={NEURA.line}
          strokeWidth={4}
        />
        <ellipse
          cx={72}
          cy={78}
          rx={10}
          ry={6}
          transform="rotate(-35 72 78)"
          fill="var(--color-mascot-light)"
          opacity={0.45}
        />
      </>
    ),
  },
  // A vertebra seen from the front: its body, the superior articular processes for ears, the
  // transverse processes for arms, and the disc beneath it to stand on.
  atlas: {
    kind: 'vertebra',
    fill: ATLAS.fill,
    line: ATLAS.line,
    cheek: 'var(--color-mascot-vertebra-cheek)',
    face: [100, 112],
    shoulders: [
      [58, 104],
      [142, 104],
    ],
    rest: 55,
    chin: -50,
    back: (
      <>
        {[-1, 1].map((side) => (
          <ellipse
            key={side}
            cx={100 + side * 30}
            cy={62}
            rx={9}
            ry={14}
            transform={`rotate(${side * 18} ${100 + side * 30} 62)`}
            fill={ATLAS.fill}
            stroke={ATLAS.line}
            strokeWidth={4}
          />
        ))}
        <ellipse
          cx={100}
          cy={166}
          rx={56}
          ry={12}
          fill={ATLAS.disc}
          stroke={ATLAS.discLine}
          strokeWidth={4}
        />
      </>
    ),
    body: (
      <>
        <path
          d="M52 76 Q52 66 64 66 L136 66 Q148 66 148 76 C146 96 142 104 142 115 C142 126 146 134 148 152 Q148 162 136 162 L64 162 Q52 162 52 152 C54 134 58 126 58 115 C58 104 54 96 52 76 Z"
          fill={ATLAS.fill}
          stroke={ATLAS.line}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <path
          d="M58 76 Q100 83 142 76"
          fill="none"
          stroke={ATLAS.line}
          strokeWidth={2.5}
          opacity={0.35}
        />
        <path
          d="M58 152 Q100 158 142 152"
          fill="none"
          stroke={ATLAS.line}
          strokeWidth={2.5}
          opacity={0.35}
        />
        <ellipse
          cx={70}
          cy={86}
          rx={9}
          ry={5}
          transform="rotate(-25 70 86)"
          fill="var(--color-mascot-light)"
          opacity={0.6}
        />
      </>
    ),
  },
};

/** How each mood holds the arms, left then right: degrees raised outward from hanging down. */
const ARMS: Record<Mood, readonly [number, number]> = {
  calm: [0, 0],
  happy: [45, 45],
  proud: [115, 115],
  encouraging: [0, 120],
  // The right hand goes to the cheek (each look says how far).
  thinking: [0, 0],
  curious: [25, 0],
  sleepy: [-12, -12],
  worried: [-35, -35],
  surprised: [80, 80],
};

/** How the whole character moves in each mood (see the keyframes below). */
const MOTION: Record<Mood, string> = {
  calm: 'mascot-breathe',
  happy: 'mascot-bounce',
  proud: 'mascot-jump',
  encouraging: 'mascot-nod',
  thinking: 'mascot-ponder',
  curious: 'mascot-lean',
  sleepy: 'mascot-sway',
  worried: 'mascot-shrink',
  surprised: 'mascot-hop',
};

const CSS = `
.mascot-part{transform-box:fill-box;transform-origin:center}
.mascot-arm{transition:rotate .45s cubic-bezier(.34,1.56,.64,1)}
.mascot-blink{animation:mascot-blink 4.6s infinite}
.mascot-wave{animation:mascot-wave .9s ease-in-out infinite alternate}
.mascot-breathe{animation:mascot-breathe 3.4s ease-in-out infinite alternate}
.mascot-bounce{animation:mascot-bounce .55s ease-in-out infinite alternate}
.mascot-jump{animation:mascot-jump .9s cubic-bezier(.3,.7,.4,1) infinite}
.mascot-nod{animation:mascot-nod 1.3s ease-in-out infinite alternate}
.mascot-ponder{animation:mascot-ponder 2.8s ease-in-out infinite alternate}
.mascot-lean{animation:mascot-lean 1.6s ease-out forwards}
.mascot-sway{animation:mascot-sway 4s ease-in-out infinite alternate}
.mascot-shrink{animation:mascot-shrink 2.2s ease-in-out infinite alternate}
.mascot-hop{animation:mascot-hop .5s cubic-bezier(.3,.7,.4,1) 2}
.mascot-float{animation:mascot-float 2.4s ease-in-out infinite alternate}
.mascot-twinkle{animation:mascot-twinkle 1.4s ease-in-out infinite alternate}
@keyframes mascot-blink{0%,93%,100%{scale:1 1}96%{scale:1 .1}}
@keyframes mascot-wave{from{rotate:-14deg}to{rotate:14deg}}
@keyframes mascot-breathe{to{scale:1.015 1.03}}
@keyframes mascot-bounce{to{translate:0 -7px}}
@keyframes mascot-jump{0%,100%{translate:0 0;scale:1.04 .96}45%{translate:0 -16px;scale:.97 1.04}}
@keyframes mascot-nod{to{rotate:3deg}}
@keyframes mascot-ponder{from{rotate:-2deg}to{rotate:4deg}}
@keyframes mascot-lean{to{rotate:-7deg;translate:-4px 0}}
@keyframes mascot-sway{from{rotate:-3deg}to{rotate:3deg}}
@keyframes mascot-shrink{to{scale:.97 .95}}
@keyframes mascot-hop{0%,100%{translate:0 0}40%{translate:0 -12px}}
@keyframes mascot-float{to{translate:4px -8px;opacity:.5}}
@keyframes mascot-twinkle{from{scale:.7;opacity:.6}to{scale:1.1;opacity:1}}
`;

/** One eye: open with a pupil (looking where the mood looks), smiling shut, or drowsy. */
function Eye({ mood, x, lid }: Readonly<{ mood: Mood; x: number; lid: string }>) {
  if (mood === 'happy' || mood === 'proud') {
    return (
      <path
        d={`M${x - 9} 2 Q${x} -10 ${x + 9} 2`}
        fill="none"
        stroke={INK}
        strokeWidth={4}
        strokeLinecap="round"
      />
    );
  }
  const big = mood === 'surprised' ? 2.5 : mood === 'curious' ? 1 : 0;
  const look: Point =
    mood === 'thinking'
      ? [3, -4]
      : mood === 'worried'
        ? [0, 2]
        : mood === 'curious'
          ? [-2, 0]
          : [0, 1];
  return (
    <g className={mood === 'sleepy' ? undefined : 'mascot-part mascot-blink'}>
      <ellipse
        cx={x}
        cy={-4}
        rx={10 + big}
        ry={12 + big}
        fill="var(--color-mascot-light)"
        stroke={INK}
        strokeWidth={2.5}
      />
      <circle cx={x + look[0]} cy={-3 + look[1]} r={mood === 'surprised' ? 5 : 6.5} fill={INK} />
      <circle cx={x + look[0] + 2.4} cy={-6 + look[1]} r={2.2} fill="var(--color-mascot-light)" />
      {mood === 'sleepy' ? (
        // A heavy lid over the top half.
        <path
          d={`M${x - 11.5} -3 A11.5 13.5 0 0 1 ${x + 11.5} -3 Z`}
          fill={lid}
          stroke={INK}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      ) : null}
    </g>
  );
}

/** Brows: [inner end lift, outer end lift] for each side, in pixels. */
const BROWS: Record<Mood, readonly [number, number, number, number]> = {
  calm: [0, 0, 0, 0],
  happy: [3, 3, 3, 3],
  proud: [2, 4, 2, 4],
  encouraging: [3, 1, 3, 1],
  thinking: [0, 0, 5, 6],
  curious: [5, 6, 0, 0],
  sleepy: [-1, -2, -1, -2],
  worried: [6, -1, 6, -1],
  surprised: [7, 7, 7, 7],
};

function Brows({ mood }: Readonly<{ mood: Mood }>) {
  const [leftIn, leftOut, rightIn, rightOut] = BROWS[mood];
  const y = mood === 'surprised' ? -26 : -22;
  return (
    <g fill="none" stroke={INK} strokeWidth={3.5} strokeLinecap="round">
      <path d={`M-27 ${y - leftOut} L-12 ${y - leftIn}`} />
      <path d={`M12 ${y - rightIn} L27 ${y - rightOut}`} />
    </g>
  );
}

function Mouth({ mood }: Readonly<{ mood: Mood }>) {
  const stroke = { fill: 'none', stroke: INK, strokeWidth: 3.5, strokeLinecap: 'round' } as const;
  switch (mood) {
    case 'happy':
    case 'proud': {
      const w = mood === 'proud' ? 15 : 12;
      return (
        <g>
          <path
            d={`M${-w} 13 Q0 ${32 + w / 3} ${w} 13 Z`}
            fill="var(--color-mascot-mouth)"
            stroke={INK}
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <path
            d={`M-6 ${22 + w / 6} Q0 ${17 + w / 6} 6 ${22 + w / 6} Q0 ${27 + w / 4} -6 ${22 + w / 6} Z`}
            fill="var(--color-mascot-tongue)"
          />
        </g>
      );
    }
    case 'encouraging':
      return <path d="M-11 14 Q0 24 11 14" {...stroke} />;
    case 'thinking':
      return <path d="M-5 18 Q2 16 8 13" {...stroke} />;
    case 'curious':
      return <ellipse cx={1} cy={17} rx={3.5} ry={4} fill={INK} />;
    case 'sleepy':
      return (
        <ellipse
          cx={0}
          cy={18}
          rx={4.5}
          ry={6}
          fill="var(--color-mascot-mouth)"
          stroke={INK}
          strokeWidth={2.5}
        />
      );
    case 'worried':
      return <path d="M-10 19 Q-5 14 0 18 Q5 22 10 17" {...stroke} />;
    case 'surprised':
      return (
        <ellipse
          cx={0}
          cy={19}
          rx={6}
          ry={8}
          fill="var(--color-mascot-mouth)"
          stroke={INK}
          strokeWidth={3}
        />
      );
    default:
      return <path d="M-8 14 Q0 21 8 14" {...stroke} />;
  }
}

function Face({ mood, look }: Readonly<{ mood: Mood; look: Look }>) {
  const warm = mood === 'happy' || mood === 'proud' ? 0.55 : 0.35;
  return (
    <g transform={`translate(${look.face[0]} ${look.face[1]})`}>
      <ellipse cx={-31} cy={10} rx={8} ry={5} fill={look.cheek} opacity={warm} />
      <ellipse cx={31} cy={10} rx={8} ry={5} fill={look.cheek} opacity={warm} />
      <Eye mood={mood} x={-19} lid={look.fill} />
      <Eye mood={mood} x={19} lid={look.fill} />
      <Brows mood={mood} />
      <Mouth mood={mood} />
    </g>
  );
}

function Arm({
  look,
  side,
  angle,
  waving,
}: Readonly<{ look: Look; side: 0 | 1; angle: number; waving: boolean }>) {
  const [x, y] = look.shoulders[side];
  const mirror = side === 1 ? -1 : 1;
  // Raised arms stand out from the rest pose but never cross over the head; arms held in or to
  // the face ignore it.
  const raised = angle < 0 ? angle : Math.min(look.rest + angle, 130);
  const style: CSSProperties = {
    rotate: `${raised * mirror}deg`,
    transformOrigin: `${x}px ${y}px`,
  };
  const d = `M${x} ${y} L${x - 9 * mirror} ${y + 27}`;
  return (
    <g className="mascot-arm" style={style}>
      <g
        className={waving ? 'mascot-wave' : undefined}
        style={{ transformOrigin: `${x}px ${y}px` }}
      >
        <path d={d} stroke={look.line} strokeWidth={17} strokeLinecap="round" />
        <path d={d} stroke={look.fill} strokeWidth={11.5} strokeLinecap="round" />
      </g>
    </g>
  );
}

/** A four-pointed sparkle. */
const sparkle = (x: number, y: number, r: number) =>
  `M${x} ${y - r} Q${x + r * 0.2} ${y - r * 0.2} ${x + r} ${y} Q${x + r * 0.2} ${y + r * 0.2} ${x} ${y + r} Q${x - r * 0.2} ${y + r * 0.2} ${x - r} ${y} Q${x - r * 0.2} ${y - r * 0.2} ${x} ${y - r} Z`;

/** What floats around the character: sparkles, sleep, thought, confetti, surprise. */
function Extras({ mood }: Readonly<{ mood: Mood }>) {
  const gold = 'var(--color-gold)';
  switch (mood) {
    case 'happy':
      return (
        <g fill={gold}>
          <path className="mascot-part mascot-twinkle" d={sparkle(30, 62, 9)} />
          <path
            className="mascot-part mascot-twinkle"
            d={sparkle(172, 74, 7)}
            style={{ animationDelay: '.4s' }}
          />
        </g>
      );
    case 'proud':
      return (
        <g>
          {(
            [
              [30, 40, 'var(--color-primary)', 20],
              [52, 18, gold, -30],
              [150, 16, 'var(--color-mascot-confetti)', 35],
              [174, 44, 'var(--color-primary)', -15],
              [92, 8, gold, 10],
              [18, 86, 'var(--color-mascot-confetti)', 40],
              [182, 92, gold, -40],
            ] as const
          ).map(([x, y, colour, turn], index) => (
            <rect
              key={x}
              className="mascot-part mascot-twinkle"
              x={x - 4}
              y={y - 2}
              width={8}
              height={4}
              rx={1}
              fill={colour}
              transform={`rotate(${turn} ${x} ${y})`}
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          ))}
          <path className="mascot-part mascot-twinkle" d={sparkle(166, 66, 8)} fill={gold} />
        </g>
      );
    case 'thinking':
      return (
        <g fill="var(--color-mascot-muted)">
          <circle className="mascot-part mascot-twinkle" cx={150} cy={58} r={4} />
          <circle
            className="mascot-part mascot-twinkle"
            cx={162}
            cy={44}
            r={5.5}
            style={{ animationDelay: '.3s' }}
          />
          <circle
            className="mascot-part mascot-twinkle"
            cx={176}
            cy={28}
            r={7}
            style={{ animationDelay: '.6s' }}
          />
        </g>
      );
    case 'sleepy':
      return (
        <g
          fill="none"
          stroke="var(--color-mascot-muted)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="mascot-part mascot-float" d="M150 52 h10 l-10 11 h10" />
          <path
            className="mascot-part mascot-float"
            d="M166 30 h7 l-7 8 h7"
            style={{ animationDelay: '.8s' }}
          />
        </g>
      );
    case 'surprised':
      return (
        <g stroke={gold} strokeWidth={4} strokeLinecap="round">
          <path d="M34 50 L24 40" />
          <path d="M28 66 L16 64" />
          <path d="M166 50 L176 40" />
          <path d="M172 66 L184 64" />
        </g>
      );
    default:
      return null;
  }
}

/**
 * The companion in a mood. It breathes and blinks at rest, and moves with each mood; with reduced
 * motion it holds still (the app's base styles shorten every animation).
 */
export function Mascot({
  species,
  mood,
  size = 160,
  name,
}: Readonly<{ species: Species; mood: Mood; size?: number; name?: string }>) {
  const look = LOOKS[species];
  const [left, held] = ARMS[mood];
  const right = mood === 'thinking' ? look.chin : held;
  const label = MOODS.find((item) => item.id === mood)?.label ?? mood;
  return (
    <>
      <style href="medlearn-mascot" precedence="default">
        {CSS}
      </style>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        role="img"
        aria-label={`${name ?? 'The companion'}, a ${look.kind}, ${label.toLowerCase()}`}
        className="overflow-visible"
      >
        <ellipse cx={100} cy={188} rx={50} ry={7} fill="currentColor" opacity={0.12} />
        <g className={MOTION[mood]} style={{ transformOrigin: '100px 184px' }}>
          {look.back}
          {look.body}
          <Face mood={mood} look={look} />
          {/* In front, so a hand can reach the chin. */}
          <Arm look={look} side={0} angle={left} waving={false} />
          <Arm look={look} side={1} angle={right} waving={mood === 'encouraging'} />
        </g>
        <Extras mood={mood} />
      </svg>
    </>
  );
}
