/* global window */
(function () {
  const heading = (eyebrow, title, description) => `
    <header class="dp-stack" style="gap:8px;margin-bottom:24px">
      <div class="dp-kicker">${eyebrow}</div>
      <h1 class="dp-title">${title}</h1>
      <p class="dp-muted" style="max-width:64ch;margin:0">${description}</p>
    </header>`;
  const progress = (percent, label) => `
    <div class="dp-stack" style="gap:8px">
      <div class="dp-row" style="justify-content:space-between"><span class="dp-small">${label}</span><span class="dp-small dp-muted">${percent}%</span></div>
      <div class="dp-progress" role="img" aria-label="${label}: ${percent} percent"><span style="width:${percent}%"></span></div>
    </div>`;
  const topicRow = (ui, title, description, icon, trailing, active = false) => `
    <div class="dp-item ${active ? 'dp-active' : ''}">
      <span class="dp-chip" aria-hidden="true" style="padding:10px;flex-shrink:0">${ui.icon(icon, 20)}</span>
      <div style="flex:1;min-width:0"><strong>${title}</strong><div class="dp-small dp-muted" style="margin-top:4px">${description}</div></div>
      ${trailing || ui.icon('ChevronRight', 18)}
    </div>`;
  const day = (name, date, state = '', kind = '') => `
    <div class="dp-card-flat dp-stack" style="gap:6px;text-align:center;padding:14px 10px;${kind === 'today' ? 'border:1px solid var(--teal);background:var(--teal-soft)' : ''}">
      <span class="dp-small dp-muted">${name}</span><strong style="font-size:22px">${date}</strong><span class="dp-small">${state || '—'}</span>
    </div>`;

  window.MEDLEARN_PAGES = Object.assign(window.MEDLEARN_PAGES || {}, {
    today: {
      title: 'Today',
      section: 'Plan your study',
      nav: 'today',
      goal: 'A returning student knows what to do next, why it is here and when they can stop.',
      changes: [
        'Replace the oversized recall hero with one compact next-task card: topic, exact activity, estimated minutes, plan context and one Continue button. Preserve the saved lesson step.',
        'Separate the daily goal from estimated work completed. Keep recall-card counts, topic coverage and streaks out of the main action; never imply that tapping through proves mastery.',
        'Use a short ordered queue under the current task. On phones the current task and action precede statistics and optional book setup; on laptops a quiet daily-goal panel sits alongside.',
        'Provide explicit first-visit, rest-day, daily-goal-met and offline states. Let students stop after the goal; explain what is available offline without promising unsaved progress has synced.',
      ],
      acceptance: 'Ask a returning student to resume the saved lesson and explain today’s stopping point. The correct activity and plan must open from one primary action on 390px phone and laptop; estimated time must be understood as an estimate.',
      render: (ui) => `
        ${heading('SUNDAY, 18 OCTOBER · YOUR STUDY', 'A little progress, <em>clearly.</em>', 'Your next step is ready. One topic at a time.')}
        <div class="dp-split">
          <section class="dp-card dp-stack" style="padding:clamp(20px,4vw,36px);gap:20px" aria-label="Next study task">
            <div class="dp-row" style="justify-content:space-between">${ui.status('Continue learning', 'teal')}<span class="dp-small dp-muted">About 12 min left</span></div>
            <div class="dp-row" style="align-items:center;gap:24px">
              <div class="dp-stack" style="flex:1;min-width:180px;gap:10px"><div class="dp-kicker">LOWER LIMB · KNEE REVISION</div><h2 style="font-size:clamp(24px,3vw,34px);margin:0">Knee joint</h2><p class="dp-muted" style="margin:0">Continue at <strong>Outer ligaments</strong>. Learn the relationship, then try one recall check.</p></div>
              ${ui.image('knee-joint', 'Existing knee joint study illustration', 'dp-task-image')}
            </div>
            ${progress(29, 'Lesson · 2 of 7 sections explored')}
            <div class="dp-row">${ui.button('Continue lesson ' + ui.icon('ArrowRight', 18), 'primary', 'lesson')}<span class="dp-small dp-muted">Your place is saved on this device</span></div>
          </section>
          <aside class="dp-card-flat dp-stack" style="align-self:start;gap:18px">
            <div class="dp-row">${ui.icon('Sun', 21)}<h2 style="font-size:18px;margin:0">A manageable day</h2></div>
            <div><strong style="font-size:32px;line-height:1.2">20 <span style="font-size:16px;font-weight:500">/ 45 min</span></strong><p class="dp-small dp-muted" style="margin:7px 0 0">Estimated activity completed · daily goal</p></div>
            ${progress(44, 'Today’s estimated activity')}
            <p class="dp-small dp-muted" style="margin:0">Finish the lesson and recall. Then this is a good place to stop.</p>
            ${ui.button('Adjust daily goal', 'plain', 'profile')}
          </aside>
        </div>
        <section class="dp-stack" style="margin-top:30px;gap:14px">
          <div class="dp-row" style="justify-content:space-between"><h2 style="font-size:20px;margin:0">Then, if you have time</h2><span class="dp-small dp-muted">About 10 min together</span></div>
          <div class="dp-card-flat dp-list" style="padding:0 16px">
            ${topicRow(ui, 'Recall · Brachial plexus', '4 cards due · about 5 min', 'RotateCcw', ui.button('Start recall', 'secondary', 'recall'))}
            ${topicRow(ui, 'Practice · Pectoral region', '4 questions · about 5 min', 'ClipboardCheck', ui.button('Practise', 'secondary', 'practice'))}
          </div>
        </section>`,
    },
    plans: {
      title: 'Plans',
      section: 'Plan your study',
      nav: 'plan',
      goal: 'A student sees which plan needs attention and reaches the actual scheduled activity.',
      changes: [
        'Keep today’s scheduled task above plan statistics. Use a clear Continue lesson or Practise action that preserves the topic and plan identifier, rather than silently opening an overview.',
        'Distinguish Active, Completed and Deadline passed. An unfinished expired plan must say how many topics remain, with Extend date or Reschedule, instead of “Every topic is done”.',
        'Reduce each plan to its title, purpose, topic count, next date and one next action. Use quiet coverage bars rather than dense achievement tiles; let details live inside the calendar.',
        'On phones use one readable column and full-width task actions. Explain rest days, empty plans and locally saved/offline schedules; a first-time student gets a small Make a plan prompt.',
      ],
      acceptance: 'Test active, future-start, rest-day, completed and expired-incomplete fixtures. Students must correctly identify which plans are finished and which still need work; scheduled actions must retain their plan context.',
      render: (ui) => `
        ${heading('YOUR PLANS', 'Make room <em>to learn.</em>', 'See what is next. Adjust the pace when life changes.')}
        <section class="dp-card dp-stack" style="gap:16px">
          <div class="dp-row" style="justify-content:space-between">${ui.status('Today from your plan', 'teal')}<span class="dp-small dp-muted">About 12 min</span></div>
          <div class="dp-row" style="align-items:center;justify-content:space-between;gap:18px"><div><h2 style="margin:0 0 6px;font-size:24px">Continue · Knee joint</h2><p class="dp-muted dp-small" style="margin:0">Knee revision · Learn · Outer ligaments</p></div>${ui.button('Continue lesson ' + ui.icon('ArrowRight', 18), 'primary', 'lesson')}</div>
        </section>
        <div class="dp-row" style="justify-content:space-between;margin:26px 0 14px"><div class="dp-row"><button class="dp-chip dp-chip-active" type="button">Active · 2</button><button class="dp-chip" type="button">Completed · 1</button><button class="dp-chip" type="button">Needs attention · 1</button></div>${ui.button(ui.icon('Plus', 18) + ' New plan', 'secondary', 'builder')}</div>
        <div class="dp-two">
          <article class="dp-card-flat dp-stack" style="gap:18px"><div class="dp-row" style="justify-content:space-between"><span class="dp-kicker">LEARN</span>${ui.status('On schedule', 'teal')}</div><div><h2 style="font-size:23px;margin:0 0 8px">Knee revision</h2><p class="dp-small dp-muted" style="margin:0">Finish by 23 October · Mon–Fri</p></div>${progress(33, '2 of 6 topics completed')}<div class="dp-row" style="justify-content:space-between"><span class="dp-small dp-muted">Next: Knee joint</span>${ui.button('Open calendar', 'secondary', 'calendar')}</div></article>
          <article class="dp-card-flat dp-stack" style="gap:18px"><div class="dp-row" style="justify-content:space-between"><span class="dp-kicker">PRACTISE</span>${ui.status('Starts 20 October')}</div><div><h2 style="font-size:23px;margin:0 0 8px">Upper limb questions</h2><p class="dp-small dp-muted" style="margin:0">Finish by 30 October · 8 topics</p></div>${progress(0, '0 of 8 topics completed')}<div class="dp-row" style="justify-content:space-between"><span class="dp-small dp-muted">Nothing scheduled today</span>${ui.button('View plan', 'secondary', 'calendar')}</div></article>
        </div>
        <section class="dp-callout dp-row" style="margin-top:20px;align-items:center;justify-content:space-between"><div class="dp-row" style="align-items:flex-start">${ui.icon('CalendarClock', 22)}<div><strong>Shoulder revision · deadline passed</strong><p class="dp-small" style="margin:6px 0 0">2 topics left. Your progress is kept; choose when to continue.</p></div></div>${ui.button('Reschedule', 'secondary', 'calendar')}</section>`,
    },
    calendar: {
      title: 'Plan calendar',
      section: 'Plan your study',
      nav: 'plan',
      goal: 'The calendar makes a realistic promise and offers recovery when that promise no longer fits.',
      changes: [
        'Move today’s next task above the week grid and statistics at every size. Distinguish a topic-overview link from the scheduled Start lesson or Practise action and retain the plan ID.',
        'Use a weekly list of dated tasks with explicit Today, Studied and Day off text. Keep the seven-day strip as orientation; phones can read the task list without a cramped month grid.',
        'Label completed-duration totals “Estimated work completed”, because the current data adds topic estimates. Show goal deadline separately from projected finish and avoid a false “Done” when no future task exists.',
        'Collect weekday, date and topic edits in one quiet details area. Preview the rescheduled workload before saving; expired plans show topics left, and heavy days offer extension rather than blame.',
      ],
      acceptance: 'Change a weekday and a deadline, then compare the preview with the saved schedule. Validate rest-day and expired-incomplete cases and verify a scheduled practice action opens the correct topic, plan and activity.',
      render: (ui) => `
        ${heading('PLANS / KNEE REVISION', 'A week <em>you can manage.</em>', 'Learn · 6 topics · 19–23 October. Every duration here is an estimate.')}
        <div class="dp-split">
          <div class="dp-stack" style="gap:22px">
            <section class="dp-card dp-stack" style="gap:16px"><div class="dp-row" style="justify-content:space-between">${ui.status('Next scheduled · Monday', 'teal')}<span class="dp-small dp-muted">About 12 min left</span></div><h2 style="margin:0;font-size:25px">Knee joint</h2><p class="dp-muted dp-small" style="margin:0">Resume your lesson at Outer ligaments.</p><div class="dp-row">${ui.button('Continue lesson ' + ui.icon('ArrowRight', 18), 'primary', 'lesson')}${ui.button('Topic overview', 'plain', 'topic')}</div></section>
            <section class="dp-stack" style="gap:14px"><div class="dp-row" style="justify-content:space-between"><h2 style="font-size:20px;margin:0">19–25 October</h2><div class="dp-row">${ui.button(ui.icon('ChevronLeft', 18) + ' Previous', 'secondary')}${ui.button('Next ' + ui.icon('ChevronRight', 18), 'secondary')}</div></div><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px">${day('Mon', '19', 'Next', 'today')}${day('Tue', '20', '1 topic')}${day('Wed', '21', '1 topic')}${day('Thu', '22', '1 topic')}${day('Fri', '23', '1 topic')}${day('Sat', '24', 'Off')}${day('Sun', '25', 'Off')}</div><div class="dp-card-flat dp-list" style="padding:0 16px">${topicRow(ui, 'Monday · Knee joint', 'Continue lesson · about 12 min left', 'BookOpen', ui.status('Next', 'teal'), true)}${topicRow(ui, 'Tuesday · Popliteal fossa', 'Learn · about 20 min', 'BookOpen')}${topicRow(ui, 'Wednesday · Knee anastomoses', 'Learn · about 15 min', 'BookOpen')}</div></section>
          </div>
          <aside class="dp-card-flat dp-stack" style="align-self:start;gap:20px"><h2 style="font-size:18px;margin:0">Plan details</h2>${progress(33, '2 of 6 topics completed')}<div class="dp-stack dp-small"><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">Estimated work completed</span><strong>35 min</strong></div><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">Deadline</span><strong>23 October</strong></div><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">Study days</span><strong>Mon–Fri</strong></div><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">Days off</span><strong>Sat, Sun</strong></div></div><p class="dp-small dp-muted" style="margin:0">Need a lighter week? Adjust the date or take a day off. Review the new schedule before saving.</p>${ui.button('Adjust this plan', 'secondary', 'builder')}</aside>
        </div>`,
    },
    builder: {
      title: 'New plan',
      section: 'Plan your study',
      nav: 'plan',
      goal: 'A student sets a realistic schedule without losing their place or earlier choices in the existing four-step wizard.',
      changes: [
        'Preserve the existing What → Topics → When → Check sequence. Make the current step explicit and move focus to its heading, keeping the student’s previous choices when they go back.',
        'On When, replace the long repeated topic picker with a concise three-topic summary. Keep dates, study weekdays and the Review plan action in the same compact reading flow, especially on phones.',
        'Retain the existing Learn, Revisit and Class test purposes. For a Class test use Test date, preserve the selected weekdays, and explain the busiest day using estimated activity rather than measured study time.',
        'Use Check to preview the dated tasks and name the plan before saving. Preserve the draft after errors; explain impossible dates or an empty weekday selection beside the relevant control and in a focused error summary.',
      ],
      acceptance: 'Complete What, choose three Topics, set weekday-only dates in When, then inspect Check and save. Going back must retain the draft; the saved purpose, topics, dates and weekdays must match. Verify heading focus and readable navigation with keyboard and enlarged text.',
      render: (ui) => `
        ${heading('NEW PLAN · STEP 3 OF 4', 'Make a little <em>room.</em>', 'Choose your study days. You will review the plan before saving it.')}
        <ol aria-label="Plan steps" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;list-style:none;padding:0;margin:0 0 22px">${['What', 'Topics', 'When', 'Check'].map((name, index) => `<li class="dp-card-flat dp-stack ${index === 2 ? 'dp-active' : ''}" ${index === 2 ? 'aria-current="step"' : ''} style="padding:12px 8px;gap:6px;text-align:center"><span class="dp-small dp-muted">${index < 2 ? '✓' : index + 1}</span><strong class="dp-small">${name}</strong></li>`).join('')}</ol>
        <div class="dp-split">
          <section class="dp-card dp-stack" style="gap:18px" aria-label="When to study">
            <div class="dp-row" style="justify-content:space-between;gap:10px"><h2 style="margin:0;font-size:23px">When will you study?</h2>${ui.status('Class test', 'teal')}</div>
            <p class="dp-small dp-muted" style="margin:0"><strong>3 topics selected:</strong> Knee joint, Popliteal fossa and Knee anastomoses.</p>
            <div class="dp-two"><label class="dp-label">Start date<input class="dp-input" type="date" value="2026-10-19"></label><label class="dp-label">Test date<input class="dp-input" type="date" value="2026-10-23"></label></div>
            <fieldset style="border:0;margin:0;padding:0;min-width:0"><legend class="dp-label" style="margin-bottom:10px">Study on</legend><div class="dp-row" aria-label="Proposed study weekdays">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((n, i) => `<button type="button" aria-label="${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]}" aria-pressed="${i < 5}" class="dp-chip ${i < 5 ? 'dp-chip-active' : ''}">${n}</button>`).join('')}</div></fieldset>
            <p class="dp-small dp-muted" style="margin:0">Monday–Friday selected. Saturday and Sunday stay free.</p>
            <div class="dp-row" style="justify-content:space-between;gap:14px">${ui.button(ui.icon('ArrowLeft', 18) + ' Back to topics', 'plain')}${ui.button('Review plan ' + ui.icon('ArrowRight', 18), 'primary')}</div>
            <span class="dp-small dp-muted">Nothing is saved yet.</span>
          </section>
          <aside class="dp-card-flat dp-stack" style="gap:16px;align-self:start"><div class="dp-row">${ui.icon('CalendarCheck', 21)}<h2 style="margin:0;font-size:19px">Your choices so far</h2></div><div class="dp-stack dp-small"><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">What</span><strong>Class test</strong></div><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">Topics</span><strong>3 selected</strong></div><div class="dp-row" style="justify-content:space-between"><span class="dp-muted">Dates</span><strong>19–23 October</strong></div></div><p class="dp-small dp-muted" style="margin:0">Next, check the dated tasks and estimated daily load. You can return here to make the week lighter.</p>${ui.button('Cancel draft', 'plain', 'plans')}</aside>
        </div>`,
    },
    ai: {
      title: 'AI plan proposal',
      section: 'Plan your study',
      nav: 'plan',
      goal: 'AI offers an inspectable draft whose saved schedule matches the student’s actual preferences.',
      changes: [
        'Show the request and applied constraints alongside the draft: exam date, estimated daily allowance, included topics, study weekdays and days off. Clearly label proposed versus saved values.',
        'Carry supported weekday preferences through request validation, proposal schema, acceptance and the saved calendar. Until that contract exists, remove “weekends off” promises and explain the manual alternative.',
        'Preview the dated tasks before acceptance and let students edit individual goals. Explain changes to their profile separately from creating a plan; do not silently overwrite exam date or daily goal.',
        'Use restrained AI styling with the same reading surfaces and teal action as manual planning. Provide useful unavailable, signed-out, rate-limited and offline paths; preserve the request and offer Make it myself.',
      ],
      acceptance: 'Compare accepted dates, topics and profile changes with the preview using fixture responses. A request for unsupported weekday constraints must not silently promise compliance; provide the manual calendar route. Test service failure without a live AI call.',
      render: (ui) => `
        ${heading('PLAN WITH AI · DRAFT', 'A useful draft. <em>Your decision.</em>', 'Review the choices and the schedule before anything is saved.')}
        <div class="dp-split">
          <section class="dp-card-flat dp-stack" style="gap:18px;align-self:start"><h2 style="margin:0;font-size:21px">Your request</h2><label class="dp-label">What would help?<textarea class="dp-input" rows="4">Help me revise the knee and upper limb before my anatomy exam.</textarea></label><div class="dp-two"><label class="dp-label">Exam date<input type="date" class="dp-input" value="2026-11-06"></label><label class="dp-label">Daily allowance<input class="dp-input" value="45 minutes"></label></div><div class="dp-stack" style="gap:10px"><strong class="dp-small">Your study preferences</strong><div class="dp-row">${ui.status('Exam · 6 November', 'teal')}${ui.status('45 minutes a day', 'teal')}${ui.status('Keep current progress')}</div></div>${ui.button('Revise draft', 'secondary')}<span class="dp-small dp-muted">Review any suggested profile changes before saving.</span></section>
          <section class="dp-card dp-stack" style="gap:20px"><div class="dp-row" style="justify-content:space-between">${ui.status('Proposed · not saved', 'teal')}${ui.icon('Sparkles', 20)}</div><div><h2 style="margin:0 0 9px;font-size:25px">Learn, then revisit</h2><p class="dp-muted dp-small" style="margin:0">An editable example for your exam date.</p></div><div class="dp-list"><div class="dp-item"><div style="flex:1"><strong>19–23 Oct · Knee revision</strong><p class="dp-small dp-muted" style="margin:6px 0 0">Learn · 3 topics · about 60 min total</p></div>${ui.button('Edit', 'plain', 'builder')}</div><div class="dp-item"><div style="flex:1"><strong>26–30 Oct · Upper limb revision</strong><p class="dp-small dp-muted" style="margin:6px 0 0">Revisit · 5 topics</p></div>${ui.button('Edit', 'plain', 'builder')}</div><div class="dp-item"><div style="flex:1"><strong>2–5 Nov · Recall and practice</strong><p class="dp-small dp-muted" style="margin:6px 0 0">Short checks before the 6 Nov exam</p></div>${ui.button('Edit', 'plain', 'builder')}</div></div><div class="dp-card-flat dp-stack" style="gap:8px"><strong class="dp-small">Before you accept</strong><span class="dp-small dp-muted">Exam date 6 Nov · daily goal 45 min · existing progress retained</span><span class="dp-small dp-muted">Need particular days off? Adjust them in the plan calendar.</span></div><div class="dp-row">${ui.button('Review dated schedule', 'primary', 'calendar')}${ui.button('Make it myself', 'plain', 'builder')}</div></section>
        </div>`,
    },
    library: {
      title: 'Library',
      section: 'Find your next topic',
      nav: 'library',
      goal: 'A student can scan familiar topic names, preview one and start the appropriate study activity.',
      changes: [
        'Keep the subject → region → topic hierarchy and readable topic rows. Make the topic name the dominant line; show estimated duration and activity status in one quieter supporting line.',
        'Show the selected preview beside the list on laptops. On compact screens put the dismissible selected-topic preview before the catalogue, with a visible close control and prominent Start/Continue lesson action; preserve selection and list scroll when returning.',
        'Use small previews only where they clarify the selected anatomy. Avoid making every row a large image card; keep coverage labels honest and separate lesson completion from retention or mastery.',
        'Fix nonshrinking subject chips and narrow preview constraints at enlarged text. Label subjects without content “Coming later”; provide a search-empty path, and distinguish downloadable content from what is actually available offline.',
      ],
      acceptance: 'Find Knee joint by browsing and Brachial plexus by search; preview, start and return without losing context. At 320 CSS px and enlarged text, subject controls and topic actions must reflow without horizontal document scrolling.',
      render: (ui) => `
        ${heading('YOUR LIBRARY', 'Find a topic. <em>Stay with it.</em>', 'Browse the course or search for a structure, topic or clinical term.')}
        <div class="dp-row" style="margin-bottom:20px;gap:12px"><label class="dp-row dp-input" style="display:flex;flex-wrap:nowrap;align-items:center;flex:1;min-width:220px;gap:12px">${ui.icon('Search', 20)}<input aria-label="Search library" style="flex:1;background:transparent;border:0;outline:none;font:inherit;min-width:0;width:100%" placeholder="Search anatomy"></label>${ui.button('Open body atlas', 'secondary', 'atlas')}</div>
        <div class="dp-row" style="margin-bottom:24px"><button class="dp-chip dp-chip-active" type="button">${ui.icon('PersonStanding', 18)} Anatomy</button><button class="dp-chip" type="button">Physiology · coming later</button><button class="dp-chip" type="button">Biochemistry · coming later</button></div>
        <div class="dp-split dp-library-layout">
          <div class="dp-stack" style="gap:18px"><section class="dp-card-flat dp-stack" style="padding:20px;gap:14px"><div class="dp-row" style="justify-content:space-between"><h2 style="margin:0;font-size:20px">Lower limb</h2><span class="dp-small dp-muted">2 topics completed</span></div><details class="dp-detail" open><summary style="padding:10px 0;cursor:pointer;font-weight:600">Joints and movement</summary><div class="dp-list">${topicRow(ui, 'Hip joint', 'Lesson completed · revisit available', 'Check', ui.status('Completed'))}${topicRow(ui, 'Knee joint', 'Continue lesson · about 12 min left', 'BookOpen', ui.icon('ChevronRight', 18), true)}${topicRow(ui, 'Ankle and tibiofibular joints', 'Start lesson · about 25 min', 'BookOpen')}</div></details><details class="dp-detail"><summary style="padding:12px 0;cursor:pointer;font-weight:600">Thigh and popliteal fossa</summary><p class="dp-small dp-muted">Popliteal fossa · Femoral triangle · Sciatic nerve</p></details></section><section class="dp-card-flat dp-stack" style="padding:20px;gap:12px"><h2 style="margin:0;font-size:20px">Upper limb</h2><details class="dp-detail"><summary style="padding:10px 0;cursor:pointer;font-weight:600">Shoulder, axilla and brachial plexus</summary><div class="dp-list">${topicRow(ui, 'Pectoral region', 'Lesson completed', 'Check')}${topicRow(ui, 'Brachial plexus', '4 recall cards due', 'RotateCcw')}</div></details></section></div>
          <aside class="dp-card dp-stack dp-library-preview" style="gap:16px;align-self:start"><div class="dp-row" style="justify-content:space-between"><span class="dp-kicker">SELECTED TOPIC</span>${ui.button(ui.icon('X', 18) + ' Close preview', 'plain')}</div><div><p class="dp-small dp-muted" style="margin:0 0 7px">Anatomy / Lower limb / Joints</p><h2 style="margin:0;font-size:27px">Knee joint</h2></div><p class="dp-small dp-muted" style="margin:0">Articular surfaces, ligaments and relationships. Continue where you left off.</p>${progress(29, 'Lesson · 2 of 7 sections explored')}${ui.button('Continue lesson ' + ui.icon('ArrowRight', 18), 'primary', 'lesson')}<div class="dp-stage dp-preview-stage">${ui.image('knee-joint', 'Existing knee joint study illustration')}</div>${ui.button('Open topic overview', 'plain', 'topic')}</aside>
        </div>`,
    },
    search: {
      title: 'Search',
      section: 'Find your next topic',
      nav: 'library',
      goal: 'Results identify the thing being found before asking the student to read its explanation.',
      changes: [
        'Use a stable topic or structure name as every result title, with content type and topic trail beneath it. Put a short matching excerpt third; the current excerpt-first hierarchy makes similar results hard to distinguish.',
        'Carry the live suggestions’ Topics and Structures grouping into the full result page. Add Lessons, Key facts and Questions only when present; show counts and preserve typo-tolerant matching.',
        'Keep the query visible and provide a clear edit/clear action. Use concise excerpts with matching terms emphasised and predictable destinations, including the matched lesson section or structure when supported.',
        'On phones keep one column and large text targets. Use helpful zero-result suggestions, an honest offline-index message and keyboard selection/focus; do not make horizontal filter scrolling the only way to find a result type.',
      ],
      acceptance: 'Find a named joint, a nerve and a clinical fact using both exact and misspelled queries. Students must predict the result destination from its title/type and reach the matching content without scanning entire excerpts.',
      render: (ui) => `
        ${heading('SEARCH THE LIBRARY', 'Find the thing <em>you mean.</em>', 'Topic names first. The matching detail, right underneath.')}
        <div class="dp-row" style="margin-bottom:14px"><label class="dp-row dp-input" style="flex:1;min-width:200px;gap:12px">${ui.icon('Search', 20)}<input style="background:transparent;border:0;outline:none;font:inherit;min-width:0;width:100%" aria-label="Search query" value="knee"></label>${ui.button('Search', 'primary')}</div><div class="dp-row" style="margin-bottom:28px"><button type="button" class="dp-chip dp-chip-active">All · 5</button><button type="button" class="dp-chip">Topics · 2</button><button type="button" class="dp-chip">Structures · 2</button><button type="button" class="dp-chip">Key facts · 1</button></div>
        <div class="dp-stack" style="gap:28px;max-width:900px"><section class="dp-stack" style="gap:12px"><h2 style="font-size:18px;margin:0">Topics <span class="dp-small dp-muted">2 matches</span></h2><div class="dp-card-flat dp-list" style="padding:0 20px"><div class="dp-item" style="align-items:flex-start"><span class="dp-chip" style="padding:10px">${ui.icon('BookOpen', 20)}</span><div style="flex:1;min-width:0"><h3 style="font-size:20px;margin:0 0 6px"><mark>Knee</mark> joint</h3><div class="dp-small dp-muted">Topic · Anatomy / Lower limb / Joints</div><p class="dp-small" style="margin:10px 0 0">Articular surfaces, menisci, cruciate ligaments and joint relationships.</p></div>${ui.button('View topic', 'secondary', 'topic')}</div><div class="dp-item" style="align-items:flex-start"><span class="dp-chip" style="padding:10px">${ui.icon('BookOpen', 20)}</span><div style="flex:1;min-width:0"><h3 style="font-size:20px;margin:0 0 6px"><mark>Knee</mark> anastomoses</h3><div class="dp-small dp-muted">Topic · Anatomy / Lower limb / Vessels</div><p class="dp-small" style="margin:10px 0 0">The arterial network around the <mark>knee</mark>.</p></div>${ui.icon('ChevronRight', 20)}</div></div></section><section class="dp-stack" style="gap:12px"><h2 style="font-size:18px;margin:0">Structures <span class="dp-small dp-muted">2 matches</span></h2><div class="dp-card-flat dp-list" style="padding:0 20px">${topicRow(ui, 'Anterior cruciate ligament', 'Structure · Knee joint · Open in the atlas', 'Box', ui.button('Locate structure', 'secondary', 'studio'))}${topicRow(ui, 'Medial meniscus', 'Structure · Knee joint · Open in the atlas', 'Box', ui.icon('ChevronRight', 18))}</div></section><section class="dp-stack" style="gap:12px"><h2 style="font-size:18px;margin:0">Key facts <span class="dp-small dp-muted">1 match</span></h2><div class="dp-card-flat dp-stack"><strong>Cruciate ligament relationships</strong><span class="dp-small dp-muted">Key fact · Knee joint</span><p class="dp-small" style="margin:0">The cruciates are named by their tibial ends. Open the source lesson to compare their directions.</p>${ui.button('Read in lesson', 'plain', 'lesson')}</div></section></div>`,
    },
  });
})();



