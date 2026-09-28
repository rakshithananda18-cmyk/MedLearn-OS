'use client';

import {
  Badge,
  Banner,
  BottomSheet,
  Button,
  Card,
  Checkbox,
  Dialog,
  EmptyState,
  ErrorState,
  Heading,
  Icon,
  IconButton,
  ModalClose,
  ProgressBar,
  ProgressRing,
  Skeleton,
  Spinner,
  Stack,
  Switch,
  Text,
  TextField,
  ThemeToggle,
  Tooltip,
} from '@medlearn/ui';
import * as icons from '@medlearn/ui/icons';
import type { ReactNode } from 'react';

// Swatch classes are written out in full so Tailwind generates them.
const INTERFACE_COLOURS = [
  ['canvas', 'bg-canvas'],
  ['surface', 'bg-surface'],
  ['surface-muted', 'bg-surface-muted'],
  ['fg', 'bg-fg'],
  ['fg-muted', 'bg-fg-muted'],
  ['ink', 'bg-ink'],
  ['border', 'bg-border'],
  ['border-strong', 'bg-border-strong'],
  ['primary', 'bg-primary'],
  ['primary-subtle', 'bg-primary-subtle'],
  ['success', 'bg-success'],
  ['warning', 'bg-warning'],
  ['danger', 'bg-danger'],
] as const;

const ANATOMY_COLOURS = [
  ['artery', 'bg-anat-artery'],
  ['vein', 'bg-anat-vein'],
  ['nerve', 'bg-anat-nerve'],
  ['lymphatic', 'bg-anat-lymph'],
  ['muscle', 'bg-anat-muscle'],
  ['bone', 'bg-anat-bone'],
  ['skin', 'bg-anat-skin'],
] as const;

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title} className="flex flex-col gap-4">
      <Heading level={2}>{title}</Heading>
      <Card>{children}</Card>
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <li className="flex flex-col items-center gap-1">
      <span className={`size-12 rounded-md border border-border ${className}`} />
      <span className="text-xs text-fg-muted">{name}</span>
    </li>
  );
}

export function Gallery() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
      <Stack direction="row" justify="between" align="center" wrap gap={4}>
        <div className="flex flex-col gap-1">
          <Heading level={1}>Design system</Heading>
          <Text tone="muted">Every shared component, in the current theme.</Text>
        </div>
        <ThemeToggle />
      </Stack>

      <Section title="Colour tokens">
        <Stack gap={4}>
          <Text size="sm" tone="muted">
            Interface colours switch with the theme.
          </Text>
          <Stack as="ul" direction="row" wrap gap={4}>
            {INTERFACE_COLOURS.map(([name, className]) => (
              <Swatch key={name} name={name} className={className} />
            ))}
          </Stack>
          <Text size="sm" tone="muted">
            Anatomical colours are reserved for diagrams and always paired with a label.
          </Text>
          <Stack as="ul" direction="row" wrap gap={4}>
            {ANATOMY_COLOURS.map(([name, className]) => (
              <Swatch key={name} name={name} className={className} />
            ))}
          </Stack>
        </Stack>
      </Section>

      <Section title="Typography">
        <Stack gap={2}>
          <Heading level={1}>Heading 1: Today</Heading>
          <Heading level={2}>Heading 2: Brachial plexus</Heading>
          <Heading level={3}>Heading 3: Roots and trunks</Heading>
          <Text>Body text reads at 16px with a 1.5 line height for long study sessions.</Text>
          <Text size="sm" tone="muted">
            Small muted text for captions and hints.
          </Text>
        </Stack>
      </Section>

      <Section title="Buttons">
        <Stack direction="row" wrap gap={3}>
          <Button iconEnd={icons.ArrowRight}>Start lesson</Button>
          <Button variant="secondary">Review later</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="danger">Delete note</Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm">Small</Button>
        </Stack>
      </Section>

      <Section title="Icon buttons and tooltips">
        <Stack direction="row" gap={3} align="center">
          <Tooltip content="Search topics">
            <IconButton icon={icons.Search} label="Search" />
          </Tooltip>
          <Tooltip content="Where this fact comes from">
            <IconButton icon={icons.FileText} label="Source" variant="secondary" />
          </Tooltip>
          <IconButton icon={icons.Flag} label="Report an issue" variant="primary" />
        </Stack>
      </Section>

      <Section title="Badges">
        <Stack direction="row" wrap gap={2}>
          <Badge>Neutral</Badge>
          <Badge tone="primary" icon={icons.Clock}>
            15 min
          </Badge>
          <Badge tone="success">Mastered</Badge>
          <Badge tone="warning">Due today</Badge>
          <Badge tone="danger">Overdue</Badge>
        </Stack>
      </Section>

      <Section title="Form controls">
        <Stack gap={4} className="max-w-md">
          <TextField label="College" hint="As printed on your ID card" />
          <TextField label="Exam date" error="Enter a date in the future" required />
          <Checkbox label="Remind me to revise every day" defaultChecked />
          <Switch label="Download lessons for offline use" />
        </Stack>
      </Section>

      <Section title="Progress">
        <Stack gap={6}>
          <ProgressBar label="Today's plan" value={3} max={5} showValue />
          <Stack direction="row" gap={6} align="center">
            <ProgressRing label="Anatomy mastery" value={45} />
            <ProgressRing label="Physiology mastery" value={80} size="lg" />
          </Stack>
        </Stack>
      </Section>

      <Section title="Banners">
        <Stack gap={3}>
          <Banner tone="info" title="New topic unlocked">
            Brachial plexus is ready in your plan.
          </Banner>
          <Banner tone="success" title="Saved" />
          <Banner
            tone="warning"
            title="3 days missed"
            action={
              <Button size="sm" variant="secondary">
                Plan catch-up
              </Button>
            }
          >
            We will spread the backlog over the next week.
          </Banner>
          <Banner tone="danger" title="Sync failed">
            Your answers are safe on this device and will sync later.
          </Banner>
          <Banner tone="offline" title="You are offline">
            Downloaded lessons still work.
          </Banner>
        </Stack>
      </Section>

      <Section title="Empty and error states">
        <Stack direction="row" wrap gap={6} justify="center">
          <EmptyState
            icon={icons.CircleCheck}
            title="No reviews due"
            description="Cards come back here when it is time to recall them."
            action={<Button variant="secondary">Learn something new</Button>}
          />
          <ErrorState
            title="This page could not load"
            description="Your progress is safe. Check your connection and try again."
            reference="req-3f9a2c"
            onRetry={() => undefined}
          />
        </Stack>
      </Section>

      <Section title="Loading">
        <Stack gap={3}>
          <Spinner label="Loading lesson" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Stack direction="row" gap={3} align="center">
            <Skeleton className="size-12 rounded-full" />
            <Skeleton className="h-4 w-1/2" />
          </Stack>
        </Stack>
      </Section>

      <Section title="Dialog and bottom sheet">
        <Stack direction="row" wrap gap={3}>
          <Dialog
            title="Reset today's plan?"
            description="Completed cards stay completed."
            trigger={<Button variant="secondary">Open dialog</Button>}
            footer={
              <>
                <ModalClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </ModalClose>
                <ModalClose asChild>
                  <Button>Reset plan</Button>
                </ModalClose>
              </>
            }
          />
          <BottomSheet
            title="Source"
            description="Where this fact comes from and who reviewed it."
            trigger={<Button variant="secondary">Open bottom sheet</Button>}
          >
            <Text size="sm">
              Reviewed by a medical reviewer, sample content for the design gallery.
            </Text>
          </BottomSheet>
        </Stack>
      </Section>

      <Section title="Icons">
        <Stack as="ul" direction="row" wrap gap={4}>
          {Object.entries(icons).map(([name, glyph]) => (
            <li key={name} className="flex w-16 flex-col items-center gap-1 text-fg">
              <Icon icon={glyph} size="lg" />
              <span className="text-xs text-fg-muted">{name}</span>
            </li>
          ))}
        </Stack>
      </Section>
    </main>
  );
}
