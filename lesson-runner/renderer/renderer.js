// renderer/renderer.js
//
// The window's UI. It builds the chapter and lesson lists, shows the Lesson tab and the Source tab, handles quiz
// answers and spoiler examples, shows a step's file in the Source pane (editable only where the step allows it), flags
// a JSON file that is not valid, gates homework solutions, opens links in the browser, and moves between lessons with
// the Next and Previous buttons and the keyboard. It talks to the main process only through window.runner (see
// preload.js). This is a classic script: the page's Content Security Policy allows scripts from 'self' only.

(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const isPopout = params.get('mode') === 'lesson';
  const startLesson = params.get('lesson');

  const ui = {
    chapters: document.getElementById('chapters'),
    lessons: document.getElementById('lessons'),
    title: document.getElementById('title'),
    lesson: document.getElementById('lesson'),
    source: document.getElementById('source'),
    sourceName: document.getElementById('source-name'),
    editor: document.getElementById('editor'),
    highlight: document.getElementById('highlight'),
    gutter: document.getElementById('gutter'),
    solutionGutter: document.getElementById('solution-gutter'),
    solutions: document.getElementById('solutions'),
    solutionCode: document.getElementById('solution-code'),
    solutionChanges: document.getElementById('solution-changes'),
    solutionsToggle: document.getElementById('solutions-toggle'),
    resetSource: document.getElementById('reset-source'),
    modified: document.getElementById('modified'),
    jsonStatus: document.getElementById('json-status'),
    noSource: document.getElementById('no-source'),
    previous: document.getElementById('previous'),
    previousHint: document.getElementById('previous-hint'),
    next: document.getElementById('next'),
    nextHint: document.getElementById('next-hint'),
    theme: document.getElementById('theme'),
    toast: document.getElementById('toast'),
    redock: document.getElementById('redock'),
  };

  const state = {
    catalog: [],
    // The menu's parts, each with its chapters, and the one part that is open. Only one part is open at a time.
    parts: [],
    openPart: null,
    current: null,
    chapterId: null,
    previous: null,
    next: null,
    popoutOpen: false,
    lessonSize: 14,
    // The step's file on screen: its name, whether the learner may edit it, the text as shipped (starter), the text
    // now, and the solution gate. Edits last only while the learner is on the step.
    source: null,
  };
  const scrollPositions = new Map();
  // True while saved answers are being put back, so restoring them doesn't save them again.
  let restoring = false;

  // ---- Glyphs, theme, and zoom ----

  function setupGlyphs() {
    document.getElementById('moon').innerHTML = window.icon('moon', 16);
    document.getElementById('sun').innerHTML = window.icon('sun', 16);
    document.getElementById('copy-source').innerHTML = window.icon('copy');
    document.getElementById('popout').innerHTML = window.icon('popout');
    document.getElementById('popout-copy').innerHTML = window.icon('copy');
    document.getElementById('popout-dock').innerHTML = window.icon('dock');
    document.getElementById('previous-icon').innerHTML = window.icon('triangle-left', 16);
    document.getElementById('next-icon').innerHTML = window.icon('triangle-right', 16);
  }

  function applyTheme(light) {
    document.body.classList.toggle('light', light);
    ui.theme.checked = light;
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark');
    } catch {
      // The mode still applies for this window when storage is unavailable.
    }
    if (ui.lesson) renderDiagrams();
  }

  function setupTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      saved = null;
    }
    applyTheme(saved === 'light');
    ui.theme.addEventListener('change', () => {
      applyTheme(ui.theme.checked);
      window.runner.setTheme(ui.theme.checked);
    });
    // Another window, such as the pop-out, changed the mode: follow it.
    window.runner.onThemeChange((light) => applyTheme(light));
  }

  // Ctrl with the mouse wheel changes the lesson's text size. The page itself never zooms.
  function setupZoom() {
    document.addEventListener(
      'wheel',
      (event) => {
        if (!event.ctrlKey) return;
        event.preventDefault();
        if (!ui.lesson.contains(event.target)) return;
        state.lessonSize = Math.min(28, Math.max(10, state.lessonSize + (event.deltaY < 0 ? 1 : -1)));
        document.documentElement.style.setProperty('--lesson-size', `${state.lessonSize}px`);
      },
      { passive: false },
    );
  }

  // ---- Messages ----

  function showToast(message) {
    ui.toast.textContent = message;
    ui.toast.classList.remove('hidden');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => ui.toast.classList.add('hidden'), 2500);
  }

  // Shows a tick in place of a copy glyph for a moment, so the learner knows the copy worked.
  function copyText(text, button) {
    navigator.clipboard.writeText(text).catch(() => showToast('The text could not be copied.'));
    if (!button) return;
    const original = button.innerHTML;
    button.innerHTML = window.icon('checkmark');
    window.setTimeout(() => {
      button.innerHTML = original;
    }, 1200);
  }

  // ---- Examples: one choice of language, shared by the examples blocks in the lesson ----

  function currentLanguage() {
    try {
      return localStorage.getItem('language') || '';
    } catch {
      return '';
    }
  }

  function chooseLanguage(language) {
    try {
      localStorage.setItem('language', language);
    } catch {
      // The choice still applies to this lesson when storage is unavailable.
    }
  }

  // Shows the chosen language's example in every examples block on the page. A block that lacks that language shows its
  // first available one, so a block with only one language still shows something.
  function applyLanguage(language) {
    for (const block of ui.lesson.querySelectorAll('[data-examples]')) {
      const panes = Array.from(block.querySelectorAll('.example-pane'));
      const available = panes.map((pane) => pane.dataset.language);
      const shown = available.includes(language) ? language : available[0];
      for (const tab of block.querySelectorAll('.language-tab')) {
        tab.classList.toggle('active', tab.dataset.language === shown);
      }
      for (const pane of panes) {
        pane.hidden = pane.dataset.language !== shown;
      }
    }
  }

  // ---- Tabs ----

  // The Source tab shows a step's file. The Lesson tab shows the text. Moving between steps keeps the tab the learner
  // is on, unless the step has no file, in which case the Lesson tab shows.
  function showTab(name) {
    for (const button of document.querySelectorAll('.tab')) {
      button.classList.toggle('active', button.dataset.tab === name);
    }
    if (name === 'lesson' && state.current) {
      ui.lesson.scrollTop = scrollPositions.get(state.current.id) || 0;
    }
    refreshPaneVisibility();
  }

  // While the lesson is open in its own window, the Lesson tab shows a Re-dock panel. The Source tab stays usable.
  function refreshPaneVisibility() {
    const tab = activeTab();
    const redock = !isPopout && state.popoutOpen && tab === 'lesson';
    ui.redock.classList.toggle('hidden', !redock);
    ui.lesson.classList.toggle('hidden', redock || tab !== 'lesson');
    ui.source.classList.toggle('hidden', tab !== 'source');
  }

  function activeTab() {
    const active = document.querySelector('.tab.active');
    return active && active.dataset.tab === 'lesson' ? 'lesson' : 'source';
  }

  function setupTabs() {
    for (const button of document.querySelectorAll('.tab')) {
      button.addEventListener('click', () => showTab(button.dataset.tab));
    }
  }

  // ---- Source: a step's file, with Reset, the modified mark, a JSON check, and the homework solution ----

  // Colors the editor's text. Each call supersedes the one before, so a slow result can't overwrite a newer one.
  let highlightSeq = 0;

  // One line number per line of text, from 1 to the last line.
  function lineNumbers(text) {
    return Array.from({ length: text.split('\n').length }, (_item, index) => String(index + 1)).join('\n');
  }

  // The file's extension, which the main process uses to choose the coloring: "json" for settings.json, and so on.
  function extensionOf(name) {
    const dot = name.lastIndexOf('.');
    return dot === -1 ? '' : name.slice(dot + 1);
  }

  async function refreshHighlight() {
    const source = state.source;
    ui.gutter.textContent = source === null ? '' : lineNumbers(ui.editor.value);
    if (source === null) {
      ui.highlight.innerHTML = '';
      return;
    }
    const seq = ++highlightSeq;
    try {
      const html = await window.runner.highlight(ui.editor.value, extensionOf(source.name));
      if (seq === highlightSeq) {
        ui.highlight.innerHTML = html + '\n';
        syncHighlightScroll();
      }
    } catch {
      // Without coloring the text is still shown, so a failed highlight is not reported.
    }
  }

  // The coloring layer follows the editor's scroll position, so the two line up.
  function syncHighlightScroll() {
    ui.highlight.scrollTop = ui.editor.scrollTop;
    ui.highlight.scrollLeft = ui.editor.scrollLeft;
    ui.gutter.scrollTop = ui.editor.scrollTop;
  }

  // Shows the read-only solution, colored the same way, and lists what it changes from the file as shipped.
  async function showSolution(source) {
    showSolutionChanges(source.solutionChanges ?? []);
    ui.solutionGutter.textContent = lineNumbers(source.solutions);
    const seq = ++highlightSeq;
    try {
      const html = await window.runner.highlight(source.solutions, extensionOf(source.name));
      if (seq === highlightSeq) ui.solutionCode.innerHTML = html;
    } catch {
      ui.solutionCode.textContent = source.solutions;
    }
  }

  // Lists what the solution changes from the file as shipped, above the solution. An empty list hides the note.
  function showSolutionChanges(changes) {
    ui.solutionChanges.replaceChildren();
    ui.solutionChanges.hidden = changes.length === 0;
    if (changes.length === 0) return;
    const heading = document.createElement('div');
    heading.textContent = `The solution changes ${changes.length === 1 ? 'one place' : `${changes.length} places`} from the file:`;
    ui.solutionChanges.append(heading);
    for (const change of changes) {
      const label = document.createElement('div');
      label.textContent = `Line ${change.line}`;
      ui.solutionChanges.append(label);
      // A minus sign marks a line the solution replaces, and a plus sign marks a line the solution adds.
      const lines = [
        ...(change.before ? change.before.split('\n').map((line) => `- ${line}`) : []),
        ...(change.after ? change.after.split('\n').map((line) => `+ ${line}`) : []),
      ];
      const block = document.createElement('pre');
      block.textContent = lines.join('\n');
      ui.solutionChanges.append(block);
    }
  }

  // Sets up the Source tab for a lesson. A step with no file shows a note.
  function renderSource(lesson) {
    ui.solutionsToggle.hidden = !lesson.gated;
    if (!lesson.source) {
      state.source = null;
      ui.sourceName.textContent = '';
      ui.editor.hidden = true;
      ui.solutions.hidden = true;
      ui.jsonStatus.hidden = true;
      ui.resetSource.hidden = true;
      ui.modified.hidden = true;
      ui.noSource.hidden = false;
      return;
    }
    state.source = {
      name: lesson.source.name,
      edit: lesson.source.edit,
      starter: lesson.source.text,
      text: lesson.source.text,
      gated: lesson.gated,
      solutionsRevealed: lesson.solutionsRevealed,
      solutions: null,
      solutionChanges: null,
      solutionsOpen: false,
    };
    ui.noSource.hidden = true;
    showCode();
  }

  // Shows the file's editor, or the read-only solution once it is open, and keeps the buttons in step with it.
  function showCode() {
    const source = state.source;
    if (source === null) return;
    ui.sourceName.textContent = source.name;
    const open = source.solutionsOpen;

    ui.solutionsToggle.textContent = open
      ? 'Hide solution'
      : source.solutionsRevealed
        ? 'Show solution'
        : 'Show solution (spoiler)';
    ui.solutionsToggle.setAttribute('aria-expanded', String(open));

    ui.solutions.hidden = !open;
    ui.editor.hidden = open;
    if (open) {
      showSolution(source);
    } else {
      ui.editor.readOnly = source.edit !== 'file';
      ui.editor.value = source.text;
      refreshHighlight();
    }
    // Reset applies only to a file the learner may edit, and only while the solution is not on screen.
    ui.resetSource.hidden = source.edit !== 'file' || open;
    updateDirty();
    updateJsonStatus();
  }

  // The file differs from the file as shipped. A read-only file is never modified.
  function isDirty() {
    const source = state.source;
    if (source === null || source.edit !== 'file') return false;
    return source.text !== source.starter;
  }

  // Shows the "modified" mark and enables Reset only while the file differs from the file as shipped.
  function updateDirty() {
    const dirty = isDirty();
    ui.modified.hidden = !dirty || (state.source !== null && state.source.solutionsOpen);
    ui.resetSource.disabled = !dirty;
  }

  // A JSON file is checked as the learner types. A file that is not valid JSON says where the problem starts, so a
  // missing comma or brace is found without running anything. Other files get no status line.
  function updateJsonStatus() {
    const source = state.source;
    if (source === null || extensionOf(source.name).toLowerCase() !== 'json') {
      ui.jsonStatus.hidden = true;
      return;
    }
    const text = source.solutionsOpen ? source.solutions : source.text;
    ui.jsonStatus.hidden = false;
    try {
      JSON.parse(text);
      ui.jsonStatus.textContent = 'Valid JSON.';
      ui.jsonStatus.className = 'json-status ok';
    } catch (error) {
      const match = /position (\d+)/.exec(error.message);
      const line = match ? text.slice(0, Number(match[1])).split('\n').length : null;
      ui.jsonStatus.textContent = line
        ? `Not valid JSON at line ${line}: ${error.message}`
        : `Not valid JSON: ${error.message}`;
      ui.jsonStatus.className = 'json-status bad';
    }
  }

  // The solution gate. The first press asks the main process for the solution, which also keeps the gate open for
  // later visits. After that, the button hides and shows the solution.
  async function toggleSolutions() {
    const source = state.source;
    if (source === null || !source.gated) return;
    if (!source.solutionsOpen && source.solutions === null) {
      try {
        const result = await window.runner.revealSolutions(state.current.id);
        source.solutions = result.code;
        source.solutionChanges = result.changes;
        source.solutionsRevealed = true;
      } catch (error) {
        showToast(error.message);
        return;
      }
    }
    source.solutionsOpen = !source.solutionsOpen;
    showCode();
  }

  function setupSource() {
    ui.editor.addEventListener('input', () => {
      const source = state.source;
      if (source === null || source.edit !== 'file') return;
      source.text = ui.editor.value;
      refreshHighlight();
      updateDirty();
      updateJsonStatus();
    });
    ui.editor.addEventListener('scroll', syncHighlightScroll);
    ui.resetSource.addEventListener('click', () => {
      const source = state.source;
      if (source === null || source.edit !== 'file') return;
      source.text = source.starter;
      ui.editor.value = source.text;
      refreshHighlight();
      updateDirty();
      updateJsonStatus();
    });
    ui.solutionsToggle.addEventListener('click', () => {
      toggleSolutions();
    });
  }

  // ---- Navigation: the lesson list, and showing a lesson ----

  // Draws the parts. A part is a heading that opens or closes its chapters, and only one part is open at a time. A
  // course without parts has one untitled group, which is drawn as a plain list.
  function drawChapters() {
    ui.chapters.replaceChildren();
    for (const part of state.parts) {
      if (part.title === null) {
        for (const chapter of part.chapters) ui.chapters.append(chapterRow(chapter, false));
        continue;
      }
      const open = state.openPart === part.title;
      const heading = document.createElement('button');
      heading.type = 'button';
      heading.className = 'nav-row part' + (open ? ' open' : '');
      heading.textContent = (open ? '▾ ' : '▸ ') + part.title;
      heading.addEventListener('click', () => {
        state.openPart = open ? null : part.title;
        drawChapters();
      });
      ui.chapters.append(heading);
      if (open) {
        for (const chapter of part.chapters) ui.chapters.append(chapterRow(chapter, true));
      }
    }
  }

  function chapterRow(chapter, inPart) {
    const row = document.createElement('button');
    row.type = 'button';
    row.className = 'nav-row' + (inPart ? ' in-part' : '') + (chapter.id === state.chapterId ? ' selected' : '');
    row.textContent = chapter.label;
    row.addEventListener('click', () => openLesson(chapter.id));
    return row;
  }

  // Draws the parts and the steps of the current chapter. The part that holds the current chapter is opened.
  function renderNavigation() {
    const owner = state.parts.find((part) => part.chapters.some((chapter) => chapter.id === state.chapterId));
    if (owner && owner.title !== null) state.openPart = owner.title;
    drawChapters();

    ui.lessons.replaceChildren();
    const chapter = state.catalog.find((candidate) => candidate.id === state.chapterId);
    if (!chapter) return;
    for (const step of chapter.steps) {
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'nav-row step' + (step.id === (state.current && state.current.id) ? ' selected' : '');
      row.textContent = step.title;
      row.addEventListener('click', () => openLesson(step.id));
      ui.lessons.append(row);
    }
  }

  async function openLesson(id) {
    let lesson;
    try {
      lesson = await window.runner.openLesson(id);
    } catch (error) {
      showToast(error.message);
      return;
    }

    displayLesson(lesson);
    if (isPopout) {
      // The pop-out reports its move, so the main window's lesson list and Next button follow it.
      window.runner.popoutNavigated(lesson.id);
      return;
    }
    try {
      await window.runner.visit(lesson.id);
    } catch (error) {
      showToast(`Progress could not be saved: ${error.message}`);
    }
    window.runner.syncPopout(lesson.id);
  }

  // Mermaid draws the diagrams in the lesson. The bundle is loaded in index.html before this script. Each diagram
  // keeps its source in data-source, so it can be drawn again when the theme changes.
  async function renderDiagrams() {
    const nodes = Array.from(ui.lesson.querySelectorAll('pre.mermaid'));
    if (nodes.length === 0 || !window.mermaid) return;
    nodes.forEach((node) => {
      node.removeAttribute('data-processed');
      node.textContent = node.dataset.source;
    });
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: document.body.classList.contains('light') ? 'default' : 'dark',
    });
    try {
      await window.mermaid.run({ nodes });
    } catch (error) {
      nodes.forEach((node) => {
        if (!node.querySelector('svg')) node.textContent = `Diagram error: ${error.message}`;
      });
    }
  }

  // Shows a lesson that has already been loaded. A normal move uses it, and so does a redraw after a progress reset.
  // The tab the learner is on stays put, so moving between steps doesn't switch them back to the Lesson tab. A step
  // with no file is the exception: it has nothing to show on the Source tab, so the Lesson tab shows.
  function displayLesson(lesson) {
    if (state.current) scrollPositions.set(state.current.id, ui.lesson.scrollTop);
    state.current = lesson;
    state.chapterId = lesson.id.split('/')[0];
    state.previous = lesson.previous;
    state.next = lesson.next;

    ui.title.textContent = lesson.title;
    // The HTML comes from the course's own Markdown, rendered with raw HTML turned off.
    ui.lesson.innerHTML = lesson.html;
    indexLessonParts(ui.lesson);
    decorateCodeBlocks(ui.lesson);
    renderDiagrams();
    applyLanguage(currentLanguage());
    restoreProgress(lesson.progress || { quizzes: {}, spoilers: {} });
    ui.next.disabled = lesson.next === null;
    ui.next.title = lesson.next ? `Next: ${lesson.next.title}` : 'This is the last lesson.';
    ui.nextHint.textContent = lesson.next ? lesson.next.title : '';
    ui.previous.disabled = lesson.previous === null;
    ui.previous.title = lesson.previous ? `Previous: ${lesson.previous.title}` : 'This is the first lesson.';
    ui.previousHint.textContent = lesson.previous ? lesson.previous.title : '';

    renderSource(lesson);
    showTab(lesson.source ? activeTab() : 'lesson');
    ui.lesson.scrollTop = scrollPositions.get(lesson.id) || 0;
    renderNavigation();
  }

  // Redraws the lesson on screen from the saved progress, which has just been cleared.
  async function redrawCurrent() {
    if (!state.current) return;
    try {
      displayLesson(await window.runner.openLesson(state.current.id));
    } catch (error) {
      showToast(error.message);
    }
  }

  // ---- Quizzes and spoilers ----

  // A quiz answer: the chosen answer shows its explanation beneath it, and a wrong answer is marked in red.
  // The listener is added once, to the lesson pane, so it keeps working for every lesson shown in it.
  function wireQuizzes(root) {
    root.addEventListener('change', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== 'radio') return;
      const quiz = input.closest('[data-quiz]');
      if (!quiz) return;

      const choices = Array.from(quiz.querySelectorAll('.quiz-choice'));
      for (const choice of choices) {
        choice.classList.remove('right', 'picked-wrong');
        choice.querySelector('.quiz-explain').hidden = true;
        if (choice.dataset.correct === 'true') choice.classList.add('right');
      }
      const picked = choices.find((choice) => choice.querySelector('input').checked);
      if (!picked) return;
      if (picked.dataset.correct !== 'true') picked.classList.add('picked-wrong');
      picked.querySelector('.quiz-explain').hidden = false;
      if (!restoring) saveProgress('quiz', Number(quiz.dataset.quizIndex), choices.indexOf(picked));
    });
  }

  // Every code block in a lesson gets a copy glyph. It shows on hover, and it copies the block's text, not the button.
  // The glyph is added once per container, so redrawing a lesson doesn't stack buttons.
  function decorateCodeBlocks(root) {
    for (const pre of root.querySelectorAll('pre')) {
      addCopyGlyph(pre, () => (pre.querySelector('code') || pre).textContent);
    }
  }

  function addCopyGlyph(container, textOf) {
    if (container.dataset.copyReady === 'true') return;
    container.dataset.copyReady = 'true';
    container.style.position = 'relative';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.title = 'Copy code';
    button.setAttribute('aria-label', 'Copy code');
    button.innerHTML = window.icon('copy');
    Object.assign(button.style, {
      position: 'absolute',
      top: '6px',
      right: '6px',
      zIndex: '2',
      opacity: '0',
      transition: 'opacity 0.15s',
      border: 'none',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
      padding: '2px',
      lineHeight: '0',
    });
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      copyText(textOf(), button);
    });
    container.append(button);
    container.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
    });
    container.addEventListener('mouseleave', () => {
      button.style.opacity = '0';
    });
  }

  // Each quiz and spoiler in a lesson is numbered from the top, so its saved state can be matched on the next run.
  function indexLessonParts(root) {
    root.querySelectorAll('[data-quiz]').forEach((quiz, index) => {
      quiz.dataset.quizIndex = String(index);
    });
    root.querySelectorAll('[data-spoiler]').forEach((spoiler, index) => {
      spoiler.dataset.spoilerIndex = String(index);
    });
  }

  // Puts back the quiz answers and spoiler states saved for this lesson. Restoring doesn't save again.
  function restoreProgress(progress) {
    restoring = true;
    try {
      for (const quiz of ui.lesson.querySelectorAll('[data-quiz]')) {
        const chosen = progress.quizzes[quiz.dataset.quizIndex];
        if (chosen === undefined) continue;
        const radio = quiz.querySelectorAll('input[type="radio"]')[chosen];
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
      for (const spoiler of ui.lesson.querySelectorAll('[data-spoiler]')) {
        if (progress.spoilers[spoiler.dataset.spoilerIndex] === true) {
          setSpoilerOpen(spoiler, true);
        }
      }
    } finally {
      restoring = false;
    }
  }

  // Saves one answer or spoiler state for the lesson on screen. A failed save is shown as a message.
  function saveProgress(kind, index, value) {
    if (!state.current) return;
    window.runner.recordProgress(state.current.id, kind, index, value).catch((error) => {
      showToast(`Progress could not be saved: ${error.message}`);
    });
  }

  function setSpoilerOpen(spoiler, open) {
    const toggle = spoiler.querySelector('.spoiler-toggle');
    spoiler.querySelector('.spoiler-body').hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Hide example (spoiler)' : 'Show example (spoiler)';
  }

  // Clicks inside the lesson: spoilers, language tabs in examples, and links.
  ui.lesson.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const toggle = target ? target.closest('.spoiler-toggle') : null;
    if (toggle) {
      const spoiler = toggle.closest('[data-spoiler]');
      const opening = spoiler.querySelector('.spoiler-body').hidden;
      setSpoilerOpen(spoiler, opening);
      if (!restoring) saveProgress('spoiler', Number(spoiler.dataset.spoilerIndex), opening);
      return;
    }

    // A language tab shows that language's example in every examples block, and the choice is remembered.
    const language = target ? target.closest('.language-tab') : null;
    if (language) {
      chooseLanguage(language.dataset.language);
      applyLanguage(language.dataset.language);
      return;
    }

    // Links open in the learner's browser, not in the runner.
    const link = target ? target.closest('a[href]') : null;
    if (link) {
      event.preventDefault();
      window.runner.openExternal(link.getAttribute('href'));
    }
  });

  // ---- Next, Previous, the keyboard, and the buttons ----

  ui.next.addEventListener('click', () => {
    if (state.next) openLesson(state.next.id);
  });

  ui.previous.addEventListener('click', () => {
    if (state.previous) openLesson(state.previous.id);
  });

  // Ctrl+Left and Ctrl+Right move the cursor by word inside the editor, so they only change lesson elsewhere.
  document.addEventListener('keydown', (event) => {
    if (!event.ctrlKey || event.altKey || event.shiftKey) return;
    if (event.target === ui.editor) return;
    if (event.key === 'ArrowRight' && state.next) {
      event.preventDefault();
      openLesson(state.next.id);
    } else if (event.key === 'ArrowLeft' && state.previous) {
      event.preventDefault();
      openLesson(state.previous.id);
    }
  });

  function setupButtons() {
    wireQuizzes(ui.lesson);
    // Ctrl+Alt+Shift+Backspace clears saved progress: quiz answers, spoiler states, the last lesson, visited steps,
    // and solution reveals.
    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && event.altKey && event.shiftKey && event.key === 'Backspace') {
        event.preventDefault();
        window.runner.resetProgress();
      }
    });
    if (window.runner) {
      window.runner.onProgressReset(() => {
        redrawCurrent();
        showToast('Progress reset');
      });
    }
    document.getElementById('copy-source').addEventListener('click', (event) => {
      if (activeTab() === 'lesson') {
        copyText(state.current ? state.current.markdown : '', event.currentTarget);
        return;
      }
      const source = state.source;
      const text = source === null ? '' : source.solutionsOpen ? source.solutions : source.text;
      copyText(text, event.currentTarget);
    });
    document.getElementById('popout').addEventListener('click', () => {
      if (state.current) window.runner.popOutLesson(state.current.id);
      // The main pane moves to Source, so the code stays in view while the lesson is in its own window.
      showTab('source');
    });
    document.getElementById('popout-copy').addEventListener('click', (event) => {
      copyText(state.current ? state.current.markdown : '', event.currentTarget);
    });
    document.getElementById('popout-dock').addEventListener('click', () => {
      window.runner.closePopout();
    });
    document.getElementById('redock-button').addEventListener('click', () => {
      window.runner.closePopout();
    });
  }

  function setupPopoutState() {
    if (!window.runner) return;
    window.runner.onPopoutState((popoutState) => {
      state.popoutOpen = popoutState.open;
      refreshPaneVisibility();
    });
    // The pop-out moved to another lesson. Follow it, unless the main window already shows that lesson.
    window.runner.onPageNavigated((id) => {
      if (!state.current || state.current.id !== id) openLesson(id);
    });
  }

  // ---- Startup ----

  async function start() {
    setupGlyphs();
    setupTheme();
    setupZoom();
    setupTabs();
    setupSource();
    setupButtons();
    // The runner starts on the Lesson tab. After that, moving between steps keeps whichever tab the learner is on.
    showTab('lesson');

    if (!window.runner) {
      ui.title.textContent = 'The runner could not connect to its main process.';
      return;
    }

    if (isPopout) {
      document.body.classList.add('popout');
      // The pop-out shows the lesson given in the address, and follows the main window when it's asked to.
      window.runner.onShowLesson((id) => {
        // The main window's sync arrives for the lesson already shown after a pop-out move. Ignore it, so the two
        // windows don't loop.
        if (!state.current || state.current.id !== id) openLesson(id);
      });
      await openLesson(startLesson || (await firstLessonId()));
      return;
    }

    setupPopoutState();
    state.popoutOpen = (await window.runner.popoutState()).open;
    refreshPaneVisibility();

    try {
      state.catalog = await window.runner.listCatalog();
      state.parts = await window.runner.listParts();
      if (state.catalog.length === 0) {
        ui.title.textContent = 'No chapters were found.';
        return;
      }
      const known = new Set(state.catalog.flatMap((chapter) => [chapter.id, ...chapter.steps.map((step) => step.id)]));
      const saved = await window.runner.getState();
      const startId = saved.lastStep && known.has(saved.lastStep) ? saved.lastStep : state.catalog[0].id;
      await openLesson(startId);
    } catch (error) {
      ui.title.textContent = 'The course could not be loaded.';
      showToast(error.message);
    }
  }

  async function firstLessonId() {
    const catalog = await window.runner.listCatalog();
    return catalog.length ? catalog[0].id : '';
  }

  // The pop-out has no chapter list, so its Next button needs the catalog too.
  if (isPopout && window.runner) {
    Promise.all([window.runner.listCatalog(), window.runner.listParts()]).then(([catalog, parts]) => {
      state.catalog = catalog;
      state.parts = parts;
    });
  }

  start();
})();
