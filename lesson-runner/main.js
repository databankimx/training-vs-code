// main.js
//
// The Electron main process. It finds the course, renders lessons, shows each step's file to the page, saves progress,
// opens links in the browser, and manages the pop-out lesson window. Nothing here runs the learner's files. The page
// talks to this process only through the preload bridge.

'use strict';

const { app, BrowserWindow, ipcMain, Menu, screen, shell } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const { loadCatalog, flatten, summarize, neighbors, readParts, checkParts, groupByPart } = require('./core/catalog');
const { lessonDocumentFile } = require('./core/documents');
const { createRenderer } = require('./core/markdown');
const { lessonImageUri } = require('./core/images');
const { markdownHighlight } = require('./core/highlight');
const { emptyState, loadState, saveState, markVisited, recordProgress, lessonProgress } = require('./core/state');
const { loadWindowState, saveWindowState, isVisibleOn } = require('./core/window-state');

// The runner lives in lesson-runner/, inside the course folder.
const courseRoot = path.resolve(__dirname, '..');
const rendererDir = path.join(__dirname, 'renderer');
const md = createRenderer({ highlight: markdownHighlight });

// The rendering environment for one lesson: its images are read from the chapter's images/ folder, so a chapter's
// introduction and each of its steps can all refer to images/name.png.
function lessonRenderEnv(item) {
  const folder = path.join(courseRoot, item.chapterId);
  return { resolveImage: (src) => lessonImageUri(folder, src) };
}

let mainWindow = null;
let popoutWindow = null;

function stateFile() {
  return path.join(app.getPath('userData'), 'progress.json');
}

function currentItems() {
  return flatten(loadCatalog(courseRoot));
}

function findItem(id) {
  return currentItems().find((candidate) => candidate.id === id) ?? null;
}

function openLesson(id) {
  const items = currentItems();
  const item = items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Unknown lesson: ${id}`);

  const markdown = fs.readFileSync(item.markdownPath, 'utf8');
  const { previous, next } = neighbors(items, id);
  const state = loadState(stateFile());
  return {
    id: item.id,
    kind: item.kind,
    title: item.title,
    html: md.render(markdown, lessonRenderEnv(item)),
    markdown,
    previous: previous ? { id: previous.id, title: previous.title } : null,
    next: next ? { id: next.id, title: next.title } : null,
    isLast: next === null,
    progress: lessonProgress(state, id),
  };
}

// Links in a lesson open in the learner's browser. Only web addresses are allowed, so a lesson can't start a program.
function openInBrowser(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
  shell.openExternal(parsed.toString());
  return true;
}

// Keeps a window from navigating away from the lesson page. Every outside link opens in the browser instead.
function guardWindow(window) {
  window.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    openInBrowser(url);
  });
  window.webContents.setWindowOpenHandler(({ url }) => {
    openInBrowser(url);
    return { action: 'deny' };
  });
}

function sendPopoutState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('popout:state', { open: popoutWindow !== null });
  }
}

function windowStateFile() {
  return path.join(app.getPath('userData'), 'window-state.json');
}

// The pop-out reopens where it was last closed, if enough of that place is still on a screen. Otherwise the default
// place is used, so an unplugged monitor can't leave the window off-screen.
function savedPopoutBounds() {
  const saved = loadWindowState(windowStateFile());
  if (!saved) return null;
  const workAreas = screen.getAllDisplays().map((display) => display.workArea);
  return isVisibleOn(saved, workAreas) ? saved : null;
}

// Saves the pop-out's position and size as it moves, resizes, and closes. Moves are saved after a short pause, so a
// drag writes the file once rather than many times.
function rememberPopout(window) {
  let timer = null;
  const save = () => {
    if (window.isDestroyed()) return;
    const maximized = window.isMaximized();
    const bounds = maximized ? window.getNormalBounds() : window.getBounds();
    saveWindowState(windowStateFile(), { ...bounds, maximized });
  };
  const later = () => {
    clearTimeout(timer);
    timer = setTimeout(save, 400);
  };
  window.on('move', later);
  window.on('resize', later);
  window.on('close', save);
}

function openPopout(id) {
  if (popoutWindow !== null) {
    popoutWindow.webContents.send('page:show', id);
    popoutWindow.focus();
    return;
  }
  const saved = savedPopoutBounds();
  popoutWindow = createWindow({ mode: 'lesson', lesson: id, width: 900, height: 700, saved });
  if (saved && saved.maximized) popoutWindow.maximize();
  rememberPopout(popoutWindow);
  popoutWindow.on('closed', () => {
    popoutWindow = null;
    sendPopoutState();
  });
  sendPopoutState();
}

function registerHandlers() {
  ipcMain.handle('catalog:list', () => summarize(loadCatalog(courseRoot)));
  // The menu's parts, each with its chapters. Checked against the chapter folders, so a chapter missing from parts.json
  // is reported rather than hidden.
  ipcMain.handle('catalog:parts', () => {
    const chapters = loadCatalog(courseRoot);
    const parts = checkParts(readParts(courseRoot), chapters.map((chapter) => chapter.id));
    return groupByPart(summarize(chapters), parts);
  });
  ipcMain.handle('lesson:open', (_event, id) => openLesson(String(id)));
  ipcMain.handle('state:get', () => loadState(stateFile()));
  ipcMain.handle('state:visit', (_event, id) => {
    const items = currentItems();
    if (!items.some((item) => item.id === id)) throw new Error(`Unknown lesson: ${id}`);
    const next = markVisited(loadState(stateFile()), id);
    saveState(stateFile(), next);
    return next;
  });
  ipcMain.handle('link:open', (_event, url) => openInBrowser(String(url)));
  // Opens a PDF or Markdown file a lesson links to, in the learner's default app. Only files inside the course folder open.
  ipcMain.handle('document:open', async (_event, id, href) => {
    const item = flatten(loadCatalog(courseRoot)).find((entry) => entry.id === String(id));
    if (!item) return false;
    const file = lessonDocumentFile(item.dir, courseRoot, String(href));
    if (!file) return false;
    const error = await shell.openPath(file);
    return error === '';
  });
  ipcMain.handle('progress:record', (_event, id, kind, index, value) => {
    const lessonId = String(id);
    if (!currentItems().some((item) => item.id === lessonId)) throw new Error(`Unknown lesson: ${lessonId}`);
    if (kind !== 'quiz' && kind !== 'spoiler') throw new Error(`Unknown progress kind: ${kind}`);
    if (!Number.isInteger(index) || index < 0 || index > 999) throw new Error('Progress index out of range');
    const valid = kind === 'quiz' ? Number.isInteger(value) && value >= 0 && value <= 99 : typeof value === 'boolean';
    if (!valid) throw new Error(`Invalid ${kind} value`);
    saveState(stateFile(), recordProgress(loadState(stateFile()), lessonId, kind, index, value));
  });
  // Clears saved progress and tells every open window to redraw its lesson.
  ipcMain.handle('progress:reset', () => {
    saveState(stateFile(), emptyState());
    for (const window of [mainWindow, popoutWindow]) {
      if (window && !window.isDestroyed()) window.webContents.send('progress:reset');
    }
  });
  // The light or dark mode is shared by every window, so a change in one window is sent to all of them.
  ipcMain.handle('theme:set', (_event, light) => {
    for (const window of BrowserWindow.getAllWindows()) {
      if (!window.isDestroyed()) window.webContents.send('theme:changed', Boolean(light));
    }
  });
  ipcMain.handle('popout:open', (_event, id) => {
    openPopout(String(id));
  });
  ipcMain.handle('popout:navigated', (_event, id) => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('page:navigated', String(id));
  });
  ipcMain.handle('popout:sync', (_event, id) => {
    if (popoutWindow !== null) popoutWindow.webContents.send('page:show', String(id));
  });
  ipcMain.handle('popout:close', () => {
    if (popoutWindow !== null) popoutWindow.close();
  });
  ipcMain.handle('popout:state', () => ({ open: popoutWindow !== null }));
}

// A window for the lesson page. The main window shows the whole runner. A pop-out shows the lesson alone.
// A saved place, when given, sets the window's position as well as its size.
function createWindow({ mode, lesson, width = 1280, height = 820, saved = null }) {
  const placement = saved
    ? { x: saved.x, y: saved.y, width: saved.width, height: saved.height }
    : { width, height };
  const window = new BrowserWindow({
    ...placement,
    minWidth: 720,
    minHeight: 520,
    title: 'Working With Visual Studio Code',
    icon: fs.existsSync(path.join(rendererDir, 'app.png')) ? path.join(rendererDir, 'app.png') : undefined,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });
  guardWindow(window);
  const query = mode ? { mode, lesson: lesson ?? '' } : undefined;
  window.loadFile(path.join(rendererDir, 'index.html'), query ? { query } : undefined);
  return window;
}

app.whenReady().then(() => {
  // The File, Edit, View, and Window menus are not used, so the menu bar is removed.
  Menu.setApplicationMenu(null);
  registerHandlers();
  mainWindow = createWindow({});
  mainWindow.on('closed', () => {
    mainWindow = null;
    if (popoutWindow !== null) popoutWindow.close();
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createWindow({});
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
