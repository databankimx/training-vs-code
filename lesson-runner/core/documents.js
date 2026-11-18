// core/documents.js
//
// Lesson documents. A lesson can link to a PDF or Markdown file kept inside the course folder, such as the official
// shortcut sheet or a checklist to save. The file opens in the learner's default app for that type. Only those two
// types are allowed, the path must stay inside the course folder, and a web address or an absolute path is refused.
// Web links are still handled by the browser route in main.js.

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const DOCUMENT_TYPES = new Set(['.pdf', '.md']);
const MAX_DOCUMENT_BYTES = 20 * 1024 * 1024;

// True for a relative link to an allowed document type. A scheme, an absolute path, or another file type is refused.
function isLessonDocumentPath(href) {
  if (typeof href !== 'string' || href === '') return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return false;
  if (href.startsWith('/') || href.startsWith('\\') || path.isAbsolute(href)) return false;
  return DOCUMENT_TYPES.has(path.extname(href).toLowerCase());
}

// Resolves a link from a lesson's folder to a file inside the course folder, or returns null when it is refused.
function lessonDocumentFile(lessonDir, courseRoot, href) {
  if (!isLessonDocumentPath(href)) return null;
  const file = path.resolve(lessonDir, href);
  const base = path.resolve(courseRoot) + path.sep;
  if (!file.startsWith(base)) return null;
  if (!fs.existsSync(file)) return null;
  const stat = fs.statSync(file);
  if (!stat.isFile() || stat.size > MAX_DOCUMENT_BYTES) return null;
  return file;
}

module.exports = { isLessonDocumentPath, lessonDocumentFile, DOCUMENT_TYPES, MAX_DOCUMENT_BYTES };
