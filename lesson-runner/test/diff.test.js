// test/diff.test.js
//
// The places a solution changes from its starter.

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { changedLines } = require('../core/diff');

test('a changed line is listed with its number and both versions', () => {
  const starter = 'expected = 207\nprint(expected)';
  const solution = 'expected = 206\nprint(expected)';
  assert.deepEqual(changedLines(starter, solution), [{ line: 1, before: 'expected = 207', after: 'expected = 206' }]);
});

test('identical text has no changes, and line endings do not count', () => {
  assert.deepEqual(changedLines('a\r\nb', 'a\nb'), []);
});

test('a line added by the solution is listed with an empty before', () => {
  assert.deepEqual(changedLines('a', 'a\nb'), [{ line: 2, before: '', after: 'b' }]);
});

test('consecutive changed lines are one place, numbered from its first line', () => {
  const starter = 'top\nreturn 0;\nbottom';
  const solution = 'top\nif (late) return 0;\nvar fee = 5;\nreturn fee;\nbottom';
  assert.deepEqual(changedLines(starter, solution), [
    { line: 2, before: 'return 0;', after: 'if (late) return 0;\nvar fee = 5;\nreturn fee;' },
  ]);
});

test('an added line does not make the lines below it look changed', () => {
  const starter = 'a\nb\nc\nd';
  const solution = 'a\nnew\nb\nc\nd';
  assert.deepEqual(changedLines(starter, solution), [{ line: 2, before: '', after: 'new' }]);
});

test('separate changes stay separate places', () => {
  const starter = 'a\nb\nc\nd';
  const solution = 'A\nb\nc\nD';
  assert.deepEqual(changedLines(starter, solution), [
    { line: 1, before: 'a', after: 'A' },
    { line: 4, before: 'd', after: 'D' },
  ]);
});

test('indentation is kept, trailing spaces are not counted', () => {
  assert.deepEqual(changedLines('x\n    y  ', 'x\n        y'), [{ line: 2, before: '    y', after: '        y' }]);
});
