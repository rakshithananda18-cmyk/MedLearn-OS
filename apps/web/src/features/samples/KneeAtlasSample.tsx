'use client';

import type { Model3D, PartKind, PathDiagram, Point3 } from '@medlearn/schemas';
import {
  Button,
  cx,
  DEFAULT_THEME_PREFERENCE,
  readThemePreference,
  subscribeToThemePreference,
  ThemeToggle,
} from '@medlearn/ui';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from '@medlearn/ui/icons';
import { PathTracer } from '@medlearn/visuals';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Component,
  type ReactNode,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import { mediaQuery } from '@/features/shell/media';
import { useCan3D, useReducedMotion } from '@/features/studio/viewer';

import styles from './KneeAtlasSample.module.css';

const SampleViewer = dynamic(() => import('@medlearn/visuals/atlas-sample'), { ssr: false });
const useSystemDark = mediaQuery('(prefers-color-scheme: dark)');
const serverTheme = () => DEFAULT_THEME_PREFERENCE;

const EMPTY = new Set<string>();
const NO_KINDS = new Set<PartKind>();
const BONES = new Set(['femur', 'patella', 'tibia', 'fibula']);
const VIEWS = [
  { id: 'knee-front', label: 'Front' },
  { id: 'knee-medial', label: 'Medial' },
  { id: 'knee-back', label: 'Back' },
] as const;
const STEPS = [
  {
    label: 'Orient',
    title: 'Find your bearings.',
    body: 'Start with the right knee from the front. Find the patella, then compare the femur above with the tibia below. Turn the model to see how they meet.',
    view: 'knee-front',
    selected: 'patella',
    parts: ['patella', 'femur', 'tibia', 'fibula'],
    hint: 'One structure selected. The surrounding bones stay visible for context.',
  },
  {
    label: 'Relate',
    title: 'Look along the joint line.',
    body: 'From the medial side, find the broad tibial collateral ligament. Compare the medial and lateral menisci. Fade or hide the bones to make the relationship easier to inspect.',
    view: 'knee-medial',
    selected: 'medial-meniscus',
    parts: ['medial-meniscus', 'lateral-meniscus', 'tibial-collateral-ligament'],
    hint: 'Bone context is faded in this step. You can switch it off without losing your view.',
  },
  {
    label: 'Recall',
    title: 'Recognise it from another view.',
    body: 'The cruciate ligaments cross inside the knee. Change the view, compare their courses, then identify the structure marked with a question mark.',
    view: 'knee-back',
    selected: 'anterior-cruciate-ligament',
    parts: ['anterior-cruciate-ligament', 'posterior-cruciate-ligament'],
    hint: 'Names are hidden for this check. You can reveal them whenever you need to.',
  },
] as const;
const DIAGRAM_STEPS = [
  {
    title: 'Start with the schematic.',
    body: 'Find Knee joint at the top, then select the patellar ligament or a collateral ligament. The boxes show named structures and their connections; their positions do not represent anatomical locations.',
  },
  {
    title: 'Trace the connections.',
    body: 'Find the medial and lateral menisci. Select the tibial collateral ligament to trace its connection to the medial meniscus. Use 3D to inspect their spatial relationship.',
  },
  {
    title: 'Review the relationships.',
    body: 'The diagram includes the names of the structures. Compare the cruciate ligaments here, or use the 3D view for the recognition check.',
  },
] as const;
const NAMES: Record<string, string> = {
  femur: 'Femur',
  patella: 'Patella',
  tibia: 'Tibia',
  fibula: 'Fibula',
  'medial-meniscus': 'Medial meniscus',
  'lateral-meniscus': 'Lateral meniscus',
  'tibial-collateral-ligament': 'Tibial collateral ligament',
  'anterior-cruciate-ligament': 'Anterior cruciate ligament',
  'posterior-cruciate-ligament': 'Posterior cruciate ligament',
};
const SHORT_LABELS: Record<string, string> = {
  'tibial-collateral-ligament': 'Tibial collateral',
  'anterior-cruciate-ligament': 'ACL',
  'posterior-cruciate-ligament': 'PCL',
};

class ModelBoundary extends Component<
  Readonly<{ children: ReactNode; fallback: ReactNode; onError: () => void }>,
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** A review-only teaching composition. It does not record answers or alter study progress. */
export function KneeAtlasSample({
  model,
  diagram,
}: Readonly<{ model: Model3D; diagram: PathDiagram }>) {
  const capable = useCan3D();
  const reducedMotion = useReducedMotion();
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    readThemePreference,
    serverTheme,
  );
  const systemDark = useSystemDark();
  const dark = preference === 'dark' || (preference === 'system' && systemDark);
  const [step, setStep] = useState(0);
  const [view, setView] = useState('knee-front');
  const [customView, setCustomView] = useState(false);
  const [selected, setSelected] = useState<string | null>('patella');
  const [bones, setBones] = useState(true);
  const [names, setNames] = useState(true);
  const [flat, setFlat] = useState(false);
  const [diagramSelected, setDiagramSelected] = useState<string | null>('knee');
  const [reset, setReset] = useState(0);
  const settleInitialView = useCallback(() => setReset((value) => value + 1), []);
  const [answer, setAnswer] = useState<string | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const mobileTask = useRef<HTMLParagraphElement>(null);
  const current = STEPS[step] ?? STEPS[0];
  const diagramCurrent = DIAGRAM_STEPS[step] ?? DIAGRAM_STEPS[0];
  const quiz = step === 2;
  const visibleIds = useMemo(() => new Set<string>(current.parts), [current.parts]);
  const cameraStops = useMemo(
    () =>
      model.stops.map((stop) => ({
        ...stop,
        position: stop.position.map((value, axis) => {
          const target = stop.target[axis] ?? 0;
          return target + (value - target) * (step === 0 ? 0.72 : step === 2 ? 0.3 : 0.42);
        }) as Point3,
      })),
    [model.stops, step],
  );
  const sampleModel = useMemo(
    () => ({
      ...model,
      stops: cameraStops,
      parts: model.parts
        .filter((part) => visibleIds.has(part.id) || (bones && BONES.has(part.id)))
        .map((part) => ({
          ...part,
          // A sample-local material choice: no emissive selection or global token changes.
          colour:
            part.id === selected
              ? dark
                ? '--color-primary'
                : '--color-primary-strong'
              : part.colour,
          opacity: BONES.has(part.id) && step > 0 ? 0.22 : 1,
        })),
    }),
    [model, cameraStops, visibleIds, bones, selected, step, dark],
  );
  const hidden = useMemo(
    () =>
      bones
        ? EMPTY
        : new Set(
            sampleModel.parts
              .filter((part) => BONES.has(part.id) && part.id !== selected)
              .map((part) => part.id),
          ),
    [bones, sampleModel.parts, selected],
  );
  // Full-shaft centres sit outside a knee close-up; pin only the selected joint structure.
  const namedLabels =
    names &&
    selected &&
    !hidden.has(selected) &&
    sampleModel.parts.some((part) => part.id === selected) &&
    (!BONES.has(selected) || selected === 'patella')
      ? [
          {
            id: selected,
            text: SHORT_LABELS[selected] ?? NAMES[selected] ?? selected,
            active: true,
          },
        ]
      : [];
  const labels = quiz && !names ? [{ id: current.selected, text: '?', active: true }] : namedLabels;
  const selectedPart = model.parts.find((part) => part.id === selected);
  const diagramMode = flat || capable === false;

  const go = (index: number) => {
    const next = STEPS[index];
    if (!next) return;
    setStep(index);
    setView(next.view);
    setCustomView(false);
    setSelected(next.selected);
    setBones(index < 2);
    setNames(index < 2);
    setAnswer(null);
    setDiagramSelected(index === 0 ? 'knee' : next.selected);
    setReset((value) => value + 1);
    // Reveal the new task on stacked screens; wide layouts retain their stage position.
    requestAnimationFrame(() => {
      if (matchMedia('(max-width: 899px)').matches) {
        mobileTask.current?.focus({ preventScroll: true });
        mobileTask.current?.scrollIntoView({ block: 'start' });
      } else heading.current?.focus();
    });
  };
  const choose = (id: string | null) => {
    if (quiz) return;
    if (id && sampleModel.parts.some((part) => part.id === id)) setSelected(id);
  };
  const recognition =
    quiz && !diagramMode ? (
      <div className={styles.check}>
        <h3>Choose one answer</h3>
        <div className={styles.answers}>
          {['anterior-cruciate-ligament', 'posterior-cruciate-ligament'].map((id) => (
            <button
              key={id}
              type="button"
              aria-disabled={answer !== null}
              onClick={() => {
                if (answer === null) setAnswer(id);
              }}
              className={cx(answer === id && styles.answerPicked)}
            >
              {NAMES[id]}
            </button>
          ))}
        </div>
        {answer !== null ? (
          <div role="status" className={styles.feedback}>
            <strong>{answer === current.selected ? 'Correct.' : 'Look once more.'}</strong> The
            marked structure is the anterior cruciate ligament.
            <Button
              variant="ghost"
              onClick={() => {
                setAnswer(null);
                setSelected(current.selected);
                setNames(false);
                setView(view === 'knee-back' ? 'knee-front' : 'knee-back');
                setCustomView(false);
              }}
            >
              Try from another view
            </Button>
          </div>
        ) : null}
      </div>
    ) : null;
  const diagramView = (
    <div className={styles.diagram}>
      <div className={styles.diagramGraphic}>
        <PathTracer
          diagram={diagram}
          title="Knee relationship diagram"
          selectedId={diagramSelected}
          onSelect={setDiagramSelected}
        />
      </div>
      <div className={styles.diagramList} role="group" aria-label="Knee schematic structures">
        {diagram.nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            aria-pressed={diagramSelected === node.id}
            onClick={() => setDiagramSelected(node.id)}
          >
            {node.name}
          </button>
        ))}
        <p>
          Connected boxes:{' '}
          {diagram.edges
            .filter((edge) => edge.from === diagramSelected || edge.to === diagramSelected)
            .map(
              (edge) =>
                diagram.nodes.find(
                  (node) => node.id === (edge.from === diagramSelected ? edge.to : edge.from),
                )?.name,
            )
            .filter(Boolean)
            .join(', ') || 'Select a structure.'}
        </p>
      </div>
    </div>
  );
  const fallback = (
    <div className={styles.fallback}>
      <p>The 3D model could not load. The relationship diagram is available below.</p>
      {diagramView}
    </div>
  );

  return (
    <main className={cx('bg-sky', styles.sample)} data-step={step}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/studio?topic=knee-joint" className={styles.back}>
            <ArrowLeft size={18} aria-hidden="true" /> MedLearn OS
          </Link>
          <span className={styles.badge}>Design sample · review first</span>
          <div className={styles.theme}>
            <ThemeToggle />
          </div>
        </header>

        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>A calmer way to explore anatomy</p>
            <h1>
              Knee, <em>in context.</em>
            </h1>
          </div>
          <p className={styles.introNote}>One region. A clear view. A question to take away.</p>
        </div>

        <nav aria-label="Sample learning steps" className={styles.steps}>
          {STEPS.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-current={step === index ? 'step' : undefined}
              onClick={() => go(index)}
            >
              <span>{index + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.workspace}>
          <section className={styles.viewerCard} aria-label="Right knee model">
            <div className={styles.stageHeading}>
              <div>
                <span className={styles.dot} /> Right knee{' '}
                <span className={styles.muted}>
                  · {flat || capable === false ? 'Diagram' : '3D atlas'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFlat(!flat)}
                aria-pressed={diagramMode}
                disabled={capable === false}
              >
                {capable === false ? 'Diagram mode' : flat ? 'Use 3D' : 'Use diagram'}
              </button>
            </div>
            <p ref={mobileTask} tabIndex={-1} className={styles.mobileTask}>
              {diagramMode
                ? diagramCurrent.title
                : quiz
                  ? 'Which cruciate ligament is marked?'
                  : current.title}
            </p>
            <div
              className={styles.stage}
              aria-describedby="sample-model-help"
              onPointerMoveCapture={(event) => {
                if (event.buttons > 0) setCustomView(true);
              }}
            >
              {flat || capable === false ? (
                diagramView
              ) : capable === null ? (
                <p role="status" className={styles.loading}>
                  Preparing the model…
                </p>
              ) : (
                <ModelBoundary fallback={fallback} onError={() => setFlat(true)}>
                  <Suspense
                    fallback={
                      <p role="status" className={styles.loading}>
                        Loading the knee model…
                      </p>
                    }
                  >
                    <SampleViewer
                      model={sampleModel}
                      highlight={EMPTY}
                      onSelect={choose}
                      stopId={view}
                      hiddenKinds={NO_KINDS}
                      hiddenIds={hidden}
                      reducedMotion={reducedMotion}
                      labels={labels}
                      resetToken={reset}
                      onReady={settleInitialView}
                      dpr={[1, 1.5]}
                    />
                  </Suspense>
                </ModelBoundary>
              )}
            </div>
            {recognition}
            <div className={styles.viewbar}>
              <div role="group" aria-label="Anatomical view" className={styles.viewChoices}>
                {VIEWS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={flat || capable === false}
                    aria-pressed={!customView && view === item.id}
                    onClick={() => {
                      setView(item.id);
                      setCustomView(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={styles.reset}
                disabled={flat || capable === false}
                onClick={() => {
                  setReset((value) => value + 1);
                  setCustomView(false);
                }}
              >
                <RotateCcw size={16} aria-hidden="true" /> Reset view
              </button>
            </div>
            <p id="sample-model-help" aria-live="polite" className={styles.modelHelp}>
              {flat || capable === false
                ? 'A relationship diagram; positions are schematic.'
                : customView
                  ? 'Custom angle · Reset view returns to the last preset'
                  : `${VIEWS.find((item) => item.id === view)?.label ?? 'Preset'} preset · Drag to turn · Pinch or scroll to zoom`}
            </p>
          </section>

          <section className={styles.reading} aria-label="Guided observation">
            <p className={styles.eyebrow}>
              Step {step + 1} of 3 · {current.label}
            </p>
            <h2 ref={heading} tabIndex={-1}>
              {diagramMode ? diagramCurrent.title : current.title}
            </h2>
            <p className={styles.body}>{diagramMode ? diagramCurrent.body : current.body}</p>

            <div className={styles.controls}>
              <button
                type="button"
                aria-pressed={bones}
                disabled={diagramMode}
                onClick={() => {
                  if (bones && selected && BONES.has(selected) && !visibleIds.has(selected))
                    setSelected(current.selected);
                  setBones(!bones);
                }}
                className={styles.toggle}
              >
                <span aria-hidden="true">{bones ? <Check size={15} /> : '–'}</span> Bone context
              </button>
              <button
                type="button"
                aria-pressed={names}
                disabled={diagramMode}
                onClick={() => setNames(!names)}
                className={styles.toggle}
              >
                <span aria-hidden="true">{names ? <Check size={15} /> : '–'}</span> Names
              </button>
            </div>

            {!quiz && !diagramMode ? (
              <div className={styles.structures}>
                <h3>Explore a structure</h3>
                <div
                  role="group"
                  aria-label="Structures in this step"
                  className={styles.structureList}
                >
                  {current.parts.map((id) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selected === id}
                      onClick={() => setSelected(id)}
                    >
                      <span aria-hidden="true" className={styles.structureDot} />
                      {NAMES[id]}
                    </button>
                  ))}
                </div>
                {selectedPart ? (
                  <p className={styles.detail}>
                    <strong>{selectedPart.name}.</strong> {selectedPart.about}
                  </p>
                ) : null}
              </div>
            ) : null}

            <p className={styles.hint}>
              {diagramMode
                ? 'Select a labelled box to trace its connections. Diagram positions are schematic.'
                : current.hint}
            </p>
            <div className={styles.next}>
              <Button
                variant="ghost"
                iconStart={ArrowLeft}
                disabled={step === 0}
                onClick={() => go(step - 1)}
              >
                Back
              </Button>
              {step < 2 ? (
                <Button iconEnd={ArrowRight} onClick={() => go(step + 1)}>
                  Next observation
                </Button>
              ) : (
                <Button iconStart={RotateCcw} variant="secondary" onClick={() => go(0)}>
                  Explore again
                </Button>
              )}
            </div>
          </section>
        </div>

        <footer className={styles.review}>
          <div>
            <strong>We’ll check this sample together, then proceed.</strong>
            <p>
              Review the anatomy, colours, labels and controls before we extend this approach to
              other topics.
            </p>
          </div>
          <span className={styles.reviewStatus}>Anatomy awaiting review</span>
        </footer>
        <details className={styles.sources}>
          <summary>Model sources and sample notes</summary>
          <p>{model.credit}</p>
          <p>
            Sample note: the patellar ligament outline described in the shared credit is omitted
            from this 3D sample; the diagram still names that structure.
          </p>
          <p>
            This sample shows selected existing meshes in static views. It makes no new claim about
            movement or clinical accuracy. The source model and teaching text still need anatomy
            review.
          </p>
          <p>
            Teaching references: BD Chaurasia, Volume 2, Chapter 12, pp. 167–175; Gray’s Anatomy,
            Chapter 6, pp. 598–608, as recorded in the existing knee topic.
          </p>
        </details>
      </div>
    </main>
  );
}
