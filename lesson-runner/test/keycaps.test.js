// test/keycaps.test.js
//
// Checks that {{...}} renders each key of a shortcut as a keycap, and that code is left alone.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createRenderer } = require('../core/markdown');

test('a shortcut in double braces renders one keycap per key', () => {
  const html = createRenderer().render('Press {{Ctrl+Shift+P}} to open it.');
  assert.match(html, /<kbd>Ctrl<\/kbd><span class="key-plus">\+<\/span><kbd>Shift<\/kbd><span class="key-plus">\+<\/span><kbd>P<\/kbd>/);
});

test('a key with a symbol in its name keeps the symbol', () => {
  const html = createRenderer().render('Use {{Ctrl+=}} to zoom.');
  assert.match(html, /<kbd>Ctrl<\/kbd><span class="key-plus">\+<\/span><kbd>=<\/kbd>/);
});

test('double braces inside code are not changed', () => {
  const html = createRenderer().render('Write `{{Ctrl+Z}}` literally.');
  assert.doesNotMatch(html, /<kbd>/);
  assert.match(html, /<code>\{\{Ctrl\+Z\}\}<\/code>/);
});

test('an empty pair of braces is left as text', () => {
  const html = createRenderer().render('Nothing here: {{  }}');
  assert.doesNotMatch(html, /<kbd>/);
});
