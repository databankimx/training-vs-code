// core/images.js
//
// Lesson images. A lesson refers to an image by a relative path, such as images/customers-xlsx.png, and the image is
// read from inside the lesson's own folder. The page can't read files itself, so the image is sent as a data URI.
// Only image types a lesson can reasonably need are allowed, and a path that leaves the lesson's folder, or names a
// web address, is refused.

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

// True for a relative path to an allowed image type, inside the lesson's folder. Anything with a scheme (http:, file:,
// data:), an absolute path, or a parent-folder step is refused.
function isLessonImagePath(src) {
  if (typeof src !== 'string' || src === '') return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(src)) return false;
  if (src.startsWith('/') || src.startsWith('\\') || path.isAbsolute(src)) return false;
  if (src.split(/[\\/]/).includes('..')) return false;
  return MIME_TYPES[path.extname(src).toLowerCase()] !== undefined;
}

// Reads the image and returns it as a data URI, or null when the path is refused or the file is missing or too large.
function lessonImageUri(baseDir, src) {
  if (!isLessonImagePath(src)) return null;
  const file = path.resolve(baseDir, src);
  const base = path.resolve(baseDir) + path.sep;
  if (!file.startsWith(base)) return null;
  if (!fs.existsSync(file)) return null;
  const stat = fs.statSync(file);
  if (!stat.isFile() || stat.size > MAX_IMAGE_BYTES) return null;
  const mime = MIME_TYPES[path.extname(file).toLowerCase()];
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

module.exports = { isLessonImagePath, lessonImageUri, MIME_TYPES, MAX_IMAGE_BYTES };
