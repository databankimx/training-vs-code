// test/documents.test.js

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { isLessonDocumentPath, lessonDocumentFile } = require('../core/documents');

test('a relative PDF or Markdown link is allowed', () => {
  assert.equal(isLessonDocumentPath('../docs/keyboard-shortcuts-windows.pdf'), true);
  assert.equal(isLessonDocumentPath('../docs/clean-day-checklist.md'), true);
});

test('web addresses, absolute paths, and other file types are refused', () => {
  assert.equal(isLessonDocumentPath('https://example.com/a.pdf'), false);
  assert.equal(isLessonDocumentPath('file:///C:/a.pdf'), false);
  assert.equal(isLessonDocumentPath('/etc/a.pdf'), false);
  assert.equal(isLessonDocumentPath('C:\\a.pdf'), false);
  assert.equal(isLessonDocumentPath('../docs/setup.exe'), false);
  assert.equal(isLessonDocumentPath(''), false);
});

test('a document inside the course folder resolves, and one outside is refused', () => {
  const course = fs.mkdtempSync(path.join(os.tmpdir(), 'course-'));
  const lesson = path.join(course, 'ch01', '01-step');
  const docs = path.join(course, 'ch01', 'docs');
  fs.mkdirSync(lesson, { recursive: true });
  fs.mkdirSync(docs, { recursive: true });
  fs.writeFileSync(path.join(docs, 'sheet.pdf'), 'x');
  fs.writeFileSync(path.join(course, 'secret.pdf'), 'x');

  assert.equal(lessonDocumentFile(lesson, course, '../docs/sheet.pdf'), path.join(docs, 'sheet.pdf'));
  assert.equal(lessonDocumentFile(lesson, course, '../docs/missing.pdf'), null);
  assert.equal(lessonDocumentFile(lesson, path.join(course, 'ch01'), '../../secret.pdf'), null);
});
