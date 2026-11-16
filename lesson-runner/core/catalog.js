// core/catalog.js
//
// Finds the course's chapters and steps on disk, and works out the order a learner moves through them.
// Chapters are folders named chNN-name at the course root. Each chapter has lesson.md (its introduction)
// and step folders named NN-name, each with lesson.json and lesson.md. The runner shows lessons only.

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const CHAPTER_FOLDER = /^ch\d\d-/;
const STEP_FOLDER = /^\d\d-/;

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`Could not read ${file}: ${error.message}`);
  }
}

function firstHeading(markdown, fallback) {
  const match = /^#\s+(.+)$/m.exec(markdown);
  return match ? match[1].trim() : fallback;
}

function listFolders(dir, pattern) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && pattern.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

// Returns the chapters in folder-name order. Each chapter lists its introduction and its steps.
function loadCatalog(courseRoot) {
  const chapters = [];

  for (const chapterFolder of listFolders(courseRoot, CHAPTER_FOLDER)) {
    const chapterDir = path.join(courseRoot, chapterFolder);
    const introPath = path.join(chapterDir, 'lesson.md');
    if (!fs.existsSync(introPath)) {
      throw new Error(`Chapter ${chapterFolder} has no lesson.md`);
    }

    const introMarkdown = fs.readFileSync(introPath, 'utf8');
    const steps = listFolders(chapterDir, STEP_FOLDER).map((stepFolder) => {
      const stepDir = path.join(chapterDir, stepFolder);
      const meta = readJson(path.join(stepDir, 'lesson.json'));
      return {
        id: `${chapterFolder}/${stepFolder}`,
        kind: 'step',
        title: meta.title,
        minutes: meta.minutes ?? null,
        objective: meta.objective ?? '',
        dir: stepDir,
        markdownPath: path.join(stepDir, 'lesson.md'),
      };
    });

    chapters.push({
      id: chapterFolder,
      number: Number(chapterFolder.slice(2, 4)),
      title: firstHeading(introMarkdown, chapterFolder),
      introPath,
      steps,
    });
  }

  return chapters;
}

// Flattens the chapters into one list in the order a learner moves through them:
// each chapter's introduction, then its steps, then the next chapter.
function flatten(chapters) {
  const items = [];
  for (const chapter of chapters) {
    items.push({
      id: chapter.id,
      kind: 'chapter',
      title: chapter.title,
      chapterId: chapter.id,
      markdownPath: chapter.introPath,
    });
    for (const step of chapter.steps) {
      items.push({ ...step, chapterId: chapter.id });
    }
  }
  return items;
}

// The sidebar needs chapters with their steps, but not file paths. A chapter's label includes its number once, as in
// "Ch00 - Introduction". The heading already carries the number, so it is removed from the label.
function summarize(chapters) {
  return chapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    label: `Ch${String(chapter.number).padStart(2, '0')} - ${chapter.title.replace(/^\d+\.\s*/, '')}`,
    steps: chapter.steps.map((step) => ({
      id: step.id,
      title: step.title,
    })),
  }));
}

// Returns the items before and after the given id, or null at either end.
function neighbors(items, id) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}

// Reads parts.json from the course root. Returns null when the file is missing, so a course without parts shows a flat list.
function readParts(courseRoot) {
  const file = path.join(courseRoot, 'parts.json');
  if (!fs.existsSync(file)) return null;
  const parsed = readJson(file);
  if (!parsed || !Array.isArray(parsed.parts)) throw new Error('parts.json must have a "parts" list');
  return parsed.parts;
}

// Checks that the parts name each chapter folder exactly once, and that no name is unknown. Every chapter must be in
// a part, so a new chapter is never left out of the menu by accident. Returns the parts, or null when there are none.
function checkParts(parts, chapterIds) {
  if (parts === null) return null;
  const listed = new Set();
  for (const part of parts) {
    if (typeof part.title !== 'string' || !Array.isArray(part.chapters)) {
      throw new Error('Each part in parts.json needs a "title" and a "chapters" list');
    }
    for (const id of part.chapters) {
      if (!chapterIds.includes(id)) throw new Error(`parts.json names ${id}, which is not a chapter folder`);
      if (listed.has(id)) throw new Error(`parts.json lists ${id} more than once`);
      listed.add(id);
    }
  }
  const unlisted = chapterIds.filter((id) => !listed.has(id));
  if (unlisted.length > 0) throw new Error(`parts.json does not list ${unlisted.join(', ')}`);
  return parts;
}

// Groups the chapter summaries under their parts, in the order parts.json gives. With no parts, one untitled group holds
// every chapter, and the menu draws them without headings.
function groupByPart(summaries, parts) {
  if (parts === null) return [{ title: null, chapters: summaries }];
  return parts.map((part) => ({
    title: part.title,
    chapters: part.chapters.map((id) => summaries.find((chapter) => chapter.id === id)),
  }));
}

module.exports = { loadCatalog, flatten, summarize, neighbors, readParts, checkParts, groupByPart };
