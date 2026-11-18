// renderer/renderer.js
//
// The window's UI. It builds the chapter and lesson lists, shows the lesson, handles quiz answers, spoiler examples, and
// the language examples, opens links in the browser, and moves between lessons with the Next and Previous buttons and the
// keyboard. The runner shows lessons only. Learners do their work in Visual Studio Code. It talks to the main process
// only through window.runner (see preload.js). This is a classic script: the page's Content Security Policy allows
// scripts from 'self' only.

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
    copyLesson: document.getElementById('copy-lesson'),
    popout: document.getElementById('popout'),
    popoutDock: document.getElementById('popout-dock'),
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
  };
  const scrollPositions = new Map();
  // True while saved answers are being put back, so restoring them doesn't save them again.
  let restoring = false;

  // ---- Glyphs, theme, and zoom ----

  function setupGlyphs() {
    document.getElementById('moon').innerHTML = window.icon('moon', 16);
    document.getElementById('sun').innerHTML = window.icon('sun', 16);
    ui.copyLesson.innerHTML = window.icon('copy');
    ui.popout.innerHTML = window.icon('popout');
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

  // ---- Showing the lesson or the re-dock panel ----

  // While the lesson is open in its own window, the main window shows a Re-dock panel in place of the lesson.
  function refreshPaneVisibility() {
    const redock = !isPopout && state.popoutOpen;
    ui.redock.classList.toggle('hidden', !redock);
    ui.lesson.classList.toggle('hidden', redock);
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

  // Draws the parts and the lessons of the current chapter. The chapter's introduction comes first in the chapter list,
  // and each step follows it. The part that holds the current chapter is opened.
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

    refreshPaneVisibility();
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
      const href = link.getAttribute('href');
      // A relative link to a PDF or Markdown file in the course opens in the default app; everything else goes to the browser.
      if (state.current && !/^[a-z][a-z0-9+.-]*:/i.test(href) && /\.(pdf|md)$/i.test(href)) {
        window.runner.openDocument(state.current.id, href);
      } else {
        window.runner.openExternal(href);
      }
    }
  });

  // ---- Next, Previous, the keyboard, and the buttons ----

  ui.next.addEventListener('click', () => {
    if (state.next) openLesson(state.next.id);
  });

  ui.previous.addEventListener('click', () => {
    if (state.previous) openLesson(state.previous.id);
  });

  // Ctrl+Left and Ctrl+Right move to the previous and next lesson.
  document.addEventListener('keydown', (event) => {
    if (!event.ctrlKey || event.altKey || event.shiftKey) return;
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
    // Ctrl+Alt+Shift+Backspace clears saved progress: quiz answers, spoiler states, the last lesson, and visited steps.
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
    ui.copyLesson.addEventListener('click', (event) => {
      copyText(state.current ? state.current.markdown : '', event.currentTarget);
    });
    ui.popout.addEventListener('click', () => {
      if (state.current) window.runner.popOutLesson(state.current.id);
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
    setupButtons();

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
