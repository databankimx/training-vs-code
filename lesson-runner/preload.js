// preload.js
//
// The only bridge between the lesson page and the main process. It exposes a fixed list of functions and nothing
// else. The page has no Node access, and these functions pass only plain data.

'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('runner', {
  listCatalog: () => ipcRenderer.invoke('catalog:list'),
  listParts: () => ipcRenderer.invoke('catalog:parts'),
  openLesson: (id) => ipcRenderer.invoke('lesson:open', id),
  getState: () => ipcRenderer.invoke('state:get'),
  visit: (id) => ipcRenderer.invoke('state:visit', id),
  recordProgress: (id, kind, index, value) => ipcRenderer.invoke('progress:record', id, kind, index, value),
  resetProgress: () => ipcRenderer.invoke('progress:reset'),
  onProgressReset: (callback) => {
    ipcRenderer.on('progress:reset', () => callback());
  },
  openExternal: (url) => ipcRenderer.invoke('link:open', url),
  openDocument: (id, href) => ipcRenderer.invoke('document:open', id, href),
  popOutLesson: (id) => ipcRenderer.invoke('popout:open', id),
  popoutNavigated: (id) => ipcRenderer.invoke('popout:navigated', id),
  syncPopout: (id) => ipcRenderer.invoke('popout:sync', id),
  closePopout: () => ipcRenderer.invoke('popout:close'),
  popoutState: () => ipcRenderer.invoke('popout:state'),
  onPopoutState: (callback) => {
    ipcRenderer.on('popout:state', (_event, state) => callback(state));
  },
  onShowLesson: (callback) => {
    ipcRenderer.on('page:show', (_event, id) => callback(id));
  },
  onPageNavigated: (callback) => {
    ipcRenderer.on('page:navigated', (_event, id) => callback(id));
  },
  setTheme: (light) => ipcRenderer.invoke('theme:set', Boolean(light)),
  onThemeChange: (callback) => {
    ipcRenderer.on('theme:changed', (_event, light) => callback(light));
  },
});
