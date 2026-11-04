/* global window */
/* Standalone design proposals only. Uses existing MedLearn teaching content and poster assets. */
(() => {
  const heading = (kicker, title, note = '') => `
    <header class="dp-stack">
      <p class="dp-kicker">${kicker}</p>
      <h1 class="dp-title">${title}</h1>
      ${note ? `<p class="dp-muted">${note}</p>` : ''}
    </header>`;

  const sourceNote = (ui, model = false) => `
    <footer class="dp-row dp-small dp-muted">
      ${ui.status('Anatomy awaiting review')}
      <span>${model ? 'Model poster: BodyParts3D · Z-Anatomy. ' : ''}Teaching text: existing MedLearn topic.</span>
    </footer>`;

  const progress = (text, fraction) => `
    <progress class="dp-progress" value="${fraction}" max="100" aria-label="${text}"></progress>`;

  const page = (title, goal, changes, acceptance, render) => ({
    title,
    section: 'Study',
    nav: 'library',
    goal,
    changes,
    acceptance,
    render,
  });

  window.MEDLEARN_PAGES = Object.assign(window.MEDLEARN_PAGES || {}, {
    topic: page(
      'Topic overview',
      'Know the next useful study action before choosing extra resources.',
      [
        'Put Continue lesson and the saved step before the model and lecture catalogue.',
        'Keep one quiet preview alongside the learning outline on wide screens.',
        'Distinguish lesson completion, practice and recall instead of calling coverage mastery.',
      ],
      'A returning student can find Continue lesson and the saved step on the first phone screen.',
      (ui) => `
        <div class="dp-stack">
          ${heading('Anatomy / Upper limb', 'Brachial plexus', 'How five nerve roots regroup into the nerves of the upper limb.')}
          <section class="dp-card dp-stack">
            <div class="dp-row">${ui.status('Lesson in progress', 'active')}<span class="dp-small dp-muted">About 15 min total</span></div>
            <h2>Pick up at three trunks.</h2>
            <p class="dp-muted">Your place is saved at step 2 of 6.</p>
            <div class="dp-row">${ui.button('Continue lesson', 'primary', 'lesson')}${ui.button('Start again', 'plain', 'lesson')}</div>
          </section>
          <div class="dp-split">
            <section class="dp-card dp-stack">
              <div class="dp-row"><p class="dp-kicker">What you will study</p><span class="dp-small dp-muted">6 short steps</span></div>
              <ol class="dp-list">
                <li class="dp-item"><span class="dp-chip">1</span><div><strong>Five roots</strong><p class="dp-small dp-muted">C5 to T1</p></div>${ui.status('Done')}</li>
                <li class="dp-item"><span class="dp-chip dp-chip-active">2</span><div><strong>Three trunks</strong><p class="dp-small dp-muted">Upper, middle and lower</p></div>${ui.status('Continue', 'active')}</li>
                <li class="dp-item"><span class="dp-chip">3</span><div><strong>Divisions and cords</strong><p class="dp-small dp-muted">Follow the regrouping</p></div></li>
                <li class="dp-item"><span class="dp-chip">4–6</span><div><strong>Branches, then explore</strong><p class="dp-small dp-muted">Trace the route yourself</p></div></li>
              </ol>
              <div class="dp-row">${ui.button('Explore in 3D', 'secondary', 'studio')}${ui.button('Draw the pathway', 'plain', 'drawing')}</div>
            </section>
            <figure class="dp-card-flat dp-stack">
              <div class="dp-stage">${ui.image('brachial-plexus', 'Existing brachial plexus model poster')}</div>
              <figcaption class="dp-small dp-muted">An orientation preview. Open Studio to inspect the model.</figcaption>
            </figure>
          </div>
          <section class="dp-card-flat dp-two">
            <div class="dp-stack"><p class="dp-kicker">After the lesson</p><h3>Make it stick.</h3><div class="dp-row">${ui.button('Practice questions', 'secondary', 'practice')}${ui.button('Recall cards', 'plain', 'recall')}</div></div>
            <div class="dp-stack"><p class="dp-kicker">Read in your book</p><p><strong>BD Chaurasia · Volume 1</strong><br><span class="dp-muted">Chapter 4, Axilla · pp. 59–65</span></p><p class="dp-small dp-muted">Sources and lectures remain available below the main study actions.</p></div>
          </section>
          ${sourceNote(ui)}
        </div>`,
    ),

    lesson: page(
      'Lesson',
      'Compare a small explanation with its visual, then continue without losing your place.',
      [
        'Give the current step a stable heading, a short explanation and one Next action.',
        'Place the visual and explanation side by side on laptops and stack them in task order on phones.',
        'Keep saved-place feedback separate from estimated study time.',
      ],
      'After Next, the new step heading and explanation are revealed and focused; reloading restores the same step.',
      (ui) => `
        <div class="dp-stack">
          <div class="dp-row">${ui.button('Topic overview', 'plain', 'topic')}${ui.status('Place saved', 'active')}</div>
          ${heading('Brachial plexus · Step 2 of 6', 'Three trunks', 'Follow C5 and C6 to where they join the upper trunk.')}
          ${progress('Step 2 of 6', 33)}
          <div class="dp-split">
            <section class="dp-card-flat dp-stack">
              <div class="dp-row"><p class="dp-kicker">Look for the upper trunk</p>${ui.status('Model preview')}</div>
              <div class="dp-stage dp-lesson-stage">${ui.image('brachial-plexus', 'Existing brachial plexus model poster beside the lesson')}</div>
              <div class="dp-row">${ui.button('Back', 'plain', 'lesson')}${ui.button('Next: divisions', 'primary', 'lesson')}</div>
            </section>
            <section class="dp-card dp-stack">
              <p class="dp-kicker">Understand</p>
              <h2>Five roots become three trunks.</h2>
              <p>C5 and C6 join to form the upper trunk. C7 continues as the middle trunk. C8 and T1 join to form the lower trunk.</p>
              <div class="dp-list">
                <div class="dp-item"><span class="dp-chip">C5 + C6</span><strong>Upper trunk</strong></div>
                <div class="dp-item"><span class="dp-chip">C7</span><strong>Middle trunk</strong></div>
                <div class="dp-item"><span class="dp-chip">C8 + T1</span><strong>Lower trunk</strong></div>
              </div>
              <div class="dp-callout"><p class="dp-label">Pause and point</p><p>Which roots join to make the upper trunk?</p><p class="dp-small dp-muted">Find them before continuing.</p></div>
              ${ui.button('Inspect in Studio', 'plain', 'studio')}
              <p class="dp-small dp-muted">Nerve paths are a MedLearn schematic.</p>
              <p class="dp-small dp-muted">Your position saves as you move through the lesson.</p>
            </section>
          </div>
          ${sourceNote(ui)}
        </div>`,
    ),

    studio: page(
      '3D Studio',
      'Use the model to answer one observation, with orientation and controls always clear.',
      [
        'Open with one observation and named camera presets rather than a wall of tools.',
        'Keep bone context, names and reset visible; place occasional tools behind More tools.',
        'Show a stable orientation cue and keep explanatory text outside the model viewport.',
      ],
      'The selected knee and its controls remain visible beside the explanation on phone landscape and tablet.',
      (ui) => `
        <div class="dp-stack">
          <div class="dp-row">${ui.button('Topic overview', 'plain', 'topic')}<span class="dp-small dp-muted">Knee joint · Guided observation 1 of 3</span></div>
          ${heading('Explore / Orient', 'Find the patella.', 'Right knee, from the front. Compare the femur above with the tibia below.')}
          <div class="dp-split">
            <section class="dp-card-flat dp-stack">
              <div class="dp-row"><strong>Right knee</strong>${ui.status('Front view', 'active')}<span class="dp-chip">A · anterior</span></div>
              <figure class="dp-stage dp-studio-stage">${ui.image('knee-joint', 'Existing knee joint poster used to illustrate the proposed Studio layout')}</figure>
              <div class="dp-toolbar" aria-label="View presets"><button class="dp-chip dp-chip-active">Front</button><button class="dp-chip">Medial</button><button class="dp-chip">Back</button>${ui.button('Reset view', 'plain')}</div>
              <div class="dp-row"><button class="dp-chip dp-chip-active">${ui.icon('Check', 16)} Bone context</button><button class="dp-chip dp-chip-active">${ui.icon('Check', 16)} Names</button>${ui.button('More tools', 'plain')}</div>
              <p class="dp-small dp-muted">Poster illustration of the proposed layout; these images do not rotate.</p>
            </section>
            <section class="dp-card dp-stack">
              <p class="dp-kicker">Observe</p><h2>Keep the whole relationship in view.</h2>
              <p>The patella is in front of the knee. Compare the femur above with the tibia below.</p>
              <p class="dp-label">Explore a structure</p>
              <div class="dp-two"><button class="dp-choice dp-active">Patella</button><button class="dp-choice">Femur</button><button class="dp-choice">Tibia</button><button class="dp-choice">Fibula</button></div>
              <div class="dp-detail"><strong>Patella</strong><p class="dp-muted">The largest sesamoid bone, in the tendon of quadriceps femoris.</p></div>
              <p class="dp-small dp-muted">Turning the model should update the orientation cue. Reset returns to this observation.</p>
              ${ui.button('Next: joint line', 'primary', 'studio')}
            </section>
          </div>
          ${sourceNote(ui, true)}
        </div>`,
    ),

    drawing: page(
      'Exam diagram trainer',
      'Build the existing diagram by placing labels one layer at a time, then draw it on paper from memory.',
      [
        'Keep the highlighted blank, current-layer hint and real label bank together in a narrow task column.',
        'Show only the existing roots and current trunk blanks; reveal later diagram layers as they are reached.',
        'Keep Next layer gated by correct labels, then show the paper-drawing instruction and Finish after the last layer.',
      ],
      'On a phone, the selected blank and all three trunk labels can be compared without scrolling; finishing all five layers leads to the paper-drawing instruction.',
      (ui) => `
        <div class="dp-stack dp-width-reading">
          <div class="dp-row">${ui.button('Brachial plexus', 'plain', 'topic')}${ui.status('Layer 2 of 5')}<span class="dp-small dp-muted">Trunks</span></div>
          ${heading('Exam diagram / Label the current layer', 'Build the three trunks.', 'Tap the label for the highlighted blank.')}
          ${progress('Layer 2 of 5; roots complete', 20)}
          <section class="dp-card-flat dp-stack">
            <div class="dp-row"><p class="dp-kicker">Trunks</p><span class="dp-small dp-muted">0 of 3 labelled</span></div>
            <svg viewBox="0 0 360 150" width="100%" height="160" role="img" aria-label="Existing brachial plexus diagram, cropped to the roots and current trunk blanks. Five labelled roots across the top; the first of three trunk blanks is highlighted below.">
              <g fill="var(--surface)" stroke="var(--border)" stroke-width="1.5">
                <rect x="20" y="14" width="40" height="32" rx="16"/><rect x="90" y="14" width="40" height="32" rx="16"/><rect x="160" y="14" width="40" height="32" rx="16"/><rect x="230" y="14" width="40" height="32" rx="16"/><rect x="300" y="14" width="40" height="32" rx="16"/>
              </g>
              <g fill="currentColor" font-size="14" font-weight="600" text-anchor="middle">
                <text x="40" y="35">C5</text><text x="110" y="35">C6</text><text x="180" y="35">C7</text><text x="250" y="35">C8</text><text x="320" y="35">T1</text>
              </g>
              <rect x="51" y="92" width="48" height="36" rx="18" fill="var(--subtle)" stroke="var(--primary)" stroke-width="3"/>
              <g fill="var(--surface)" stroke="var(--border)" stroke-width="1.5" stroke-dasharray="4 3"><rect x="156" y="92" width="48" height="36" rx="18"/><rect x="261" y="92" width="48" height="36" rx="18"/></g>
              <g fill="currentColor" font-size="16" font-weight="600" text-anchor="middle"><text x="75" y="115">?</text><text x="180" y="115">?</text><text x="285" y="115">?</text></g>
            </svg>
            <p class="dp-small dp-muted">Hint: C5 and C6 join, C7 continues alone, C8 and T1 join.</p>
            <div class="dp-row" role="group" aria-label="Labels remaining in the trunks layer"><button class="dp-btn dp-secondary">Upper</button><button class="dp-btn dp-secondary">Lower</button><button class="dp-btn dp-secondary">Middle</button></div>
            <div class="dp-row"><span class="dp-small dp-muted">Label all three trunks to continue.</span><button class="dp-btn" disabled>Next: Divisions</button></div>
          </section>
          <details class="dp-card-flat dp-detail"><summary>After the five layers</summary><div class="dp-stack"><p><strong>Diagram built.</strong> Now draw it on paper from memory, then compare it with the screen.</p><p class="dp-small dp-muted">Roots → trunks → divisions → cords → terminal branches</p>${ui.button('Finish', 'primary', 'today')}</div></details>
          ${sourceNote(ui)}
        </div>`,
    ),

    practice: page(
      'Practice question',
      'Read one question, commit to an answer, then inspect feedback without losing context.',
      [
        'Keep the question, all options and Check answer in one quiet reading column.',
        'Use a distinct selected state without revealing correctness before submission.',
        'After checking, place explanation and source reference beside the next action.',
      ],
      'Keyboard and touch users can choose, check and read the explanation in sequence; the next question heading receives focus.',
      (ui) => `
        <div class="dp-stack dp-width-reading">
          <div class="dp-row">${ui.button('Knee joint', 'plain', 'topic')}${ui.status('Practice')}<span class="dp-small dp-muted">Question 2 of 4</span></div>
          ${progress('Question 2 of 4', 50)}
          <section class="dp-card dp-stack">
            <p class="dp-kicker">Choose one answer</p>
            <h1 class="dp-title">Which muscle unlocks the knee?</h1>
            <p class="dp-muted">Select an answer, then check your reasoning.</p>
            <div class="dp-stack" role="group" aria-label="Answer options">
              <button class="dp-choice dp-active">${ui.icon('Circle', 18)} <span><strong>A.</strong> Popliteus</span></button>
              <button class="dp-choice">${ui.icon('Circle', 18)} <span><strong>B.</strong> Vastus medialis</span></button>
              <button class="dp-choice">${ui.icon('Circle', 18)} <span><strong>C.</strong> Biceps femoris</span></button>
              <button class="dp-choice">${ui.icon('Circle', 18)} <span><strong>D.</strong> Sartorius</span></button>
            </div>
            <div class="dp-row">${ui.button('Check answer', 'primary')}${ui.button('Leave practice', 'plain', 'topic')}</div>
            <p class="dp-small dp-muted">Feedback appears here after checking. Progress records an attempt when you answer.</p>
          </section>
          <div class="dp-card-flat dp-row"><div><p class="dp-kicker">Need to revisit the idea?</p><p class="dp-muted">Knee joint · Locking and unlocking</p></div>${ui.button('Review lesson', 'plain', 'lesson')}</div>
          ${sourceNote(ui)}
        </div>`,
    ),

    recall: page(
      'Recall',
      'Keep the recall prompt, reveal action and honest self-rating together on the smallest screen.',
      [
        'Put Reveal answer directly below the prompt instead of after repeated explanatory cards.',
        'After reveal, place the answer and all four familiar ratings together.',
        'Use plain session progress and honest feedback rather than a mastery claim.',
      ],
      'On a 390 × 844 screen, students can recall, reveal and rate without scrolling away from the card.',
      (ui) => `
        <div class="dp-stack dp-width-reading">
          <div class="dp-row">${ui.button('Brachial plexus', 'plain', 'topic')}${ui.status('Recall')}<span class="dp-small dp-muted">Card 2 of 8</span></div>
          ${progress('Card 2 of 8', 25)}
          <section class="dp-card dp-stack">
            <p class="dp-kicker">Bring it back to mind</p>
            <h1 class="dp-title">Which roots form the upper trunk?</h1>
            <p class="dp-muted">Say the answer to yourself before you reveal it.</p>
            <button class="dp-btn" data-demo="reveal">Reveal answer</button>
            <div class="dp-reveal dp-stack" hidden>
              <div class="dp-callout"><p class="dp-kicker">Answer</p><h2>C5 and C6.</h2><p>The two roots join to form the upper trunk.</p></div>
              <div class="dp-stack"><p class="dp-label">How well did you remember?</p><div class="dp-two"><button class="dp-choice"><strong>Again</strong><span class="dp-small dp-muted">I forgot</span></button><button class="dp-choice"><strong>Hard</strong><span class="dp-small dp-muted">A lot of effort</span></button><button class="dp-choice"><strong>Good</strong><span class="dp-small dp-muted">I remembered</span></button><button class="dp-choice"><strong>Easy</strong><span class="dp-small dp-muted">Straight away</span></button></div></div>
              <p class="dp-small dp-muted">Your rating sets when this card returns.</p>
            </div>
          </section>
          <details class="dp-card-flat dp-detail"><summary>Review this relationship</summary><p>C5 and C6 join to form the upper trunk. C7 continues as the middle trunk. C8 and T1 join to form the lower trunk.</p>${ui.button('Open lesson', 'plain', 'lesson')}</details>
          <div class="dp-row">${ui.button('End this session', 'plain', 'topic')}<span class="dp-small dp-muted">Answers and progress shown here are a design example.</span></div>
          ${sourceNote(ui)}
        </div>`,
    ),
  });
  window.MEDLEARN_PAGES.studio.nav = 'studio';
  window.MEDLEARN_PAGES.practice.nav = 'practice';
  window.MEDLEARN_PAGES.recall.nav = 'practice';
})();
