// test/image-size.test.js
//
// An image can set its own width in its title, as in ![alt](images/x.png "width=50%"). Only plain widths are used.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createRenderer } = require('../core/markdown');

const env = { resolveImage: () => 'data:image/png;base64,AAAA' };

test('a width in the title sets the image width', () => {
  const html = createRenderer().render('![Window](images/a.png "width=50%")', env);
  assert.match(html, /<img src="data:image\/png;base64,AAAA" alt="Window" style="width: 50%;">/);
});

test('a pixel width is accepted', () => {
  const html = createRenderer().render('![Panel](images/a.png "width=320px")', env);
  assert.match(html, /style="width: 320px;"/);
});

test('any other title adds no style', () => {
  const html = createRenderer().render('![Panel](images/a.png "width: 10px; position: fixed")', env);
  assert.doesNotMatch(html, /style=/);
});

test('a width that is not a plain number is refused', () => {
  const html = createRenderer().render('![Panel](images/a.png "width=calc(100%)")', env);
  assert.doesNotMatch(html, /style=/);
});

test('an image with no title renders as before', () => {
  const html = createRenderer().render('![Panel](images/a.png)', env);
  assert.equal(html.trim(), '<p><img src="data:image/png;base64,AAAA" alt="Panel"></p>');
});
