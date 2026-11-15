// core/diff.js
//
// Lists the places where a solution changes its starter, so the learner can see what to look at. Lines are matched
// with a longest-common-subsequence comparison, so one added line does not make every line below it look changed.
// Consecutive changed lines are grouped into one place. Pure functions only.

'use strict';

// Splits text into lines, with line endings normalised and trailing spaces removed. Leading spaces stay, because
// indentation is part of the code.
function splitLines(text) {
  return String(text ?? '').replace(/\r\n/g, '\n').split('\n').map((line) => line.replace(/\s+$/, ''));
}

// The places where the solution differs from the starter, as { line, before, after }. line is the first line of the
// place in the solution, numbered from 1. before and after are the starter's and the solution's lines, joined with
// newlines. A place with no starter lines has an empty before; a place with no solution lines has an empty after.
function changedLines(starter, solution) {
  const before = splitLines(starter);
  const after = splitLines(solution);
  const n = before.length;
  const m = after.length;

  // table[i][j] is the length of the longest common subsequence of before[i..] and after[j..].
  const table = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      table[i][j] = before[i] === after[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const places = [];
  let place = null;
  const close = () => {
    if (place) places.push(place);
    place = null;
  };
  const open = (line) => {
    if (!place) place = { line, before: [], after: [] };
  };

  let i = 0;
  let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && before[i] === after[j]) {
      close();
      i += 1;
      j += 1;
    } else if (j < m && (i >= n || table[i][j + 1] >= table[i + 1][j])) {
      open(j + 1);
      place.after.push(after[j]);
      j += 1;
    } else {
      open(j + 1);
      place.before.push(before[i]);
      i += 1;
    }
  }
  close();

  return places.map((item) => ({ line: item.line, before: item.before.join('\n'), after: item.after.join('\n') }));
}

module.exports = { changedLines };
