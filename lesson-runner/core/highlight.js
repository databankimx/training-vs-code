// core/highlight.js
//
// Colors code for the lesson text and the editor. The course's languages are colored, and so are the data formats the
// lessons show, such as JSON. Anything else is shown as plain text. The output is HTML with highlight.js class names,
// which the page styles. The text is escaped, so code can't inject markup.

'use strict';

const hljs = require('highlight.js/lib/core');

hljs.registerLanguage('csharp', require('highlight.js/lib/languages/csharp'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

const ALIASES = {
  csharp: 'csharp',
  cs: 'csharp',
  python: 'python',
  py: 'python',
  javascript: 'javascript',
  js: 'javascript',
  markdown: 'markdown',
  md: 'markdown',
  json: 'json',
  jsonl: 'json',
  xml: 'xml',
};

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Returns the highlighted HTML for the code, without a <pre> around it.
function highlightCode(code, language) {
  const name = ALIASES[String(language || '').toLowerCase()];
  if (!name) return escapeHtml(code);
  return hljs.highlight(code, { language: name, ignoreIllegals: true }).value;
}

// The form markdown-it expects from its highlight option: a complete <pre> block.
function markdownHighlight(code, language) {
  return `<pre><code class="hljs">${highlightCode(code, language)}</code></pre>\n`;
}

module.exports = { highlightCode, markdownHighlight };
