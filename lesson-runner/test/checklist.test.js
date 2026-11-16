// test/checklist.test.js
//
// Checks that a list item starting with [ ] or [x] renders as a checklist item with a box, and that other list items
// are left alone.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createRenderer } = require('../core/markdown');

test('an unticked item renders with an empty box and no bullet', () => {
  const html = createRenderer().render('- [ ] Open the window\n');
  assert.match(html, /<li class="task-item"><input type="checkbox" class="task-box" disabled> Open the window<\/li>/);
});

test('a ticked item renders with a checked box', () => {
  const html = createRenderer().render('- [x] Done\n');
  assert.match(html, /<input type="checkbox" class="task-box" disabled checked> Done/);
});

test('a normal list item is unchanged', () => {
  const html = createRenderer().render('- Plain item\n');
  assert.doesNotMatch(html, /task-item|checkbox/);
  assert.match(html, /<li>Plain item<\/li>/);
});
