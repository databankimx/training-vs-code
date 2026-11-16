// test/readonly.test.js
//
// Checks the examples fence flags: "readonly" renders plain code with no editor and no Run button.

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { createRenderer, examplesInfo } = require('../core/markdown');

test('examples fences read their flags in any order, and other fences are not examples', () => {
  assert.deepEqual(examplesInfo('examples'), { source: false, readonly: false });
  assert.deepEqual(examplesInfo('examples readonly'), { source: false, readonly: true });
  assert.deepEqual(examplesInfo('examples source readonly'), { source: true, readonly: true });
  assert.deepEqual(examplesInfo('examples readonly source'), { source: true, readonly: true });
  assert.equal(examplesInfo('examples banana'), null);
  assert.equal(examplesInfo('quiz'), null);
  assert.equal(examplesInfo('shadow'), null);
});

const ALL_LANGUAGES = [
  '```csharp\nConsole.WriteLine(1);\n```',
  '```python\nprint(1)\n```',
  '```javascript\nconsole.log(1);\n```',
].join('\n');

test('a readonly block renders its tabs with no editor and no Run button', () => {
  const html = createRenderer().render(`~~~examples readonly\n${ALL_LANGUAGES}\n~~~\n`, {});
  assert.match(html, /class="example-readonly"/);
  assert.doesNotMatch(html, /data-sample/);
});

test('an examples block without the flag stays editable and runnable', () => {
  const html = createRenderer().render(`~~~examples\n${ALL_LANGUAGES}\n~~~\n`, {});
  assert.match(html, /data-sample/);
  assert.doesNotMatch(html, /class="example-readonly"/);
});

test('read-only examples are colored like the other code blocks', () => {
  const md = createRenderer();
  const html = md.render('~~~examples readonly\n```csharp\nConsole.WriteLine(1);\n```\n```python\nprint("hi")\n```\n```javascript\nconsole.log(1);\n```\n~~~\n');
  assert.match(html, /<pre class="example-readonly"><code class="language-python"><span class="hljs-/);
});
