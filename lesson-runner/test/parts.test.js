// test/parts.test.js

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { loadCatalog, summarize, readParts, checkParts, groupByPart } = require('../core/catalog');

const courseRoot = path.resolve(__dirname, '..', '..');

test('a course without parts.json has no parts, and every chapter is one untitled group', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'parts-test-'));
  assert.equal(readParts(folder), null);
  assert.equal(checkParts(null, ['ch00-a']), null);
  const grouped = groupByPart([{ id: 'ch00-a' }, { id: 'ch01-b' }], null);
  assert.deepEqual(grouped, [{ title: null, chapters: [{ id: 'ch00-a' }, { id: 'ch01-b' }] }]);
  fs.rmSync(folder, { recursive: true, force: true });
});

test('parts.json is read from the course root', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'parts-test-'));
  fs.writeFileSync(path.join(folder, 'parts.json'), JSON.stringify({ parts: [{ title: 'One', chapters: ['ch00-a'] }] }));
  assert.deepEqual(readParts(folder), [{ title: 'One', chapters: ['ch00-a'] }]);
  fs.rmSync(folder, { recursive: true, force: true });
});

test('a parts file without a parts list is refused', () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'parts-test-'));
  fs.writeFileSync(path.join(folder, 'parts.json'), JSON.stringify({ groups: [] }));
  assert.throws(() => readParts(folder), /"parts" list/);
  fs.rmSync(folder, { recursive: true, force: true });
});

test('a part that names a chapter folder that does not exist is refused', () => {
  const parts = [{ title: 'One', chapters: ['ch99-missing'] }];
  assert.throws(() => checkParts(parts, ['ch00-a']), /ch99-missing, which is not a chapter folder/);
});

test('a chapter that no part lists is refused, so it cannot go missing from the menu', () => {
  const parts = [{ title: 'One', chapters: ['ch00-a'] }];
  assert.throws(() => checkParts(parts, ['ch00-a', 'ch01-b']), /does not list ch01-b/);
});

test('a chapter listed in two parts is refused', () => {
  const parts = [
    { title: 'One', chapters: ['ch00-a'] },
    { title: 'Two', chapters: ['ch00-a'] },
  ];
  assert.throws(() => checkParts(parts, ['ch00-a']), /more than once/);
});

test('a part without a title or chapters list is refused', () => {
  assert.throws(() => checkParts([{ chapters: ['ch00-a'] }], ['ch00-a']), /"title" and a "chapters" list/);
});

test('the chapters of each part are grouped in the order the parts give', () => {
  const summaries = [{ id: 'ch00-a' }, { id: 'ch01-b' }, { id: 'ch02-c' }];
  const parts = [
    { title: 'Second', chapters: ['ch02-c'] },
    { title: 'First', chapters: ['ch00-a', 'ch01-b'] },
  ];
  const grouped = groupByPart(summaries, parts);
  assert.deepEqual(
    grouped.map((part) => [part.title, part.chapters.map((chapter) => chapter.id)]),
    [
      ['Second', ['ch02-c']],
      ['First', ['ch00-a', 'ch01-b']],
    ],
  );
});

test('the real course lists every chapter folder in exactly one part', (t) => {
  if (!fs.existsSync(path.join(courseRoot, 'parts.json'))) {
    t.skip('this course has no parts.json yet');
    return;
  }
  const chapters = loadCatalog(courseRoot);
  const parts = checkParts(readParts(courseRoot), chapters.map((chapter) => chapter.id));
  assert.ok(parts !== null, 'the course has a parts.json');
  const grouped = groupByPart(summarize(chapters), parts);
  assert.equal(grouped.reduce((count, part) => count + part.chapters.length, 0), chapters.length);
});
