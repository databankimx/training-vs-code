// test/images.test.js

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { isLessonImagePath, lessonImageUri } = require('../core/images');

test('a relative path to an image inside the lesson is allowed', () => {
  assert.equal(isLessonImagePath('images/customers-xlsx.png'), true);
  assert.equal(isLessonImagePath('diagram.JPG'), true);
});

test('web addresses, file addresses, absolute paths, and parent folders are refused', () => {
  assert.equal(isLessonImagePath('https://example.invalid/a.png'), false);
  assert.equal(isLessonImagePath('file:///C:/secret.png'), false);
  assert.equal(isLessonImagePath('data:image/png;base64,AAAA'), false);
  assert.equal(isLessonImagePath('/etc/a.png'), false);
  assert.equal(isLessonImagePath('C:\\data\\a.png'), false);
  assert.equal(isLessonImagePath('../other/a.png'), false);
  assert.equal(isLessonImagePath('images\\..\\..\\a.png'), false);
});

test('only image types are allowed', () => {
  assert.equal(isLessonImagePath('notes.txt'), false);
  assert.equal(isLessonImagePath('script.svg'), false);
  assert.equal(isLessonImagePath('images/readme'), false);
});

test('the Markdown renderer shows a found image inline and a missing one as text', () => {
  const { createRenderer } = require('../core/markdown');
  const md = createRenderer();
  const env = { resolveImage: (src) => (src === 'images/a.png' ? 'data:image/png;base64,AAAA' : null) };
  const found = md.render('![Chart](images/a.png)', env);
  const missing = md.render('![Chart](images/b.png)', env);
  assert.match(found, /<img src="data:image\/png;base64,AAAA" alt="Chart">/);
  assert.match(missing, /class="missing-image">Image not found: images\/b.png</);
});

test('a lesson image is returned as a data URI with its type', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'images-test-'));
  fs.mkdirSync(path.join(folder, 'images'));
  const bytes = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  fs.writeFileSync(path.join(folder, 'images', 'a.png'), bytes);
  assert.equal(lessonImageUri(folder, 'images/a.png'), `data:image/png;base64,${bytes.toString('base64')}`);
  assert.equal(lessonImageUri(folder, 'images/missing.png'), null);
  assert.equal(lessonImageUri(folder, '../a.png'), null);
  fs.rmSync(folder, { recursive: true, force: true });
});
