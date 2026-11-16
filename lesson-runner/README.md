# Lesson runner

The lesson runner for the Working With Visual Studio Code tutorial. It shows the chapters, the steps, quizzes, spoiler examples, and language examples. It is a lessons-only reader: it has no code view, no editor, and no Run button, because learners do their homework in Visual Studio Code itself. Nothing in the runner reads or runs a learner's files. See `../resources/roadmap.md` for the design.

## Requirements

- Windows 10 or 11
- Node.js 24 or later

## Running

From this folder:

```powershell
npm install
npm test
npm start
```

`npm test` runs the catalog, Markdown, progress, and parts tests. It also checks every quiz in the course: each one must have exactly one correct choice.

## Layout

| Path | Purpose |
|---|---|
| `main.js` | The Electron main process. Finds the course, renders lessons, saves progress, and manages the pop-out window. |
| `preload.js` | The only bridge to the page. It exposes a fixed list of functions, and nothing else. |
| `core/catalog.js` | Finds chapters and steps, works out the order (including Next across chapters), and reads `parts.json`. |
| `core/markdown.js` | Renders lessons. Raw HTML is off. Handles the `quiz`, `spoiler`, `examples`, and `mermaid` blocks, checklists, and keycaps. |
| `core/state.js` | Saves progress to the user data folder, never to the repository. |
| `core/images.js`, `core/highlight.js`, `core/window-state.js` | Lesson images, code coloring for examples, and the pop-out's saved place. |
| `renderer/` | The page: `index.html` (layout and styles), `icons.js`, `logo.svg`, `renderer.js` (behavior), and `vendor/mermaid.min.js`. |
| `test/` | Node's built-in test runner. |

## Lesson files

Each chapter folder has a `lesson.md`, which is the chapter's introduction. Each step folder has a `lesson.json` (title, objective, and optional minutes) and a `lesson.md`. Homework steps show their starter code as a code block, and their worked solution sits in a `~~~spoiler` block at the end of the lesson.

## Notes

- The runner reads the course from the parent folder, `..`. It never writes into the course.
- Lesson images come from the chapter's `images/` folder, so every lesson in a chapter refers to them as `images/name.png`.
- An image is full width unless its title sets a width: `![Panel](images/ch00-panel.png "width=60%")`. Plain percentages and pixel widths are accepted, and anything else is ignored.
- Progress is saved in the user data folder as `progress.json`. It holds the last step, the steps visited, quiz answers, and spoiler states.
- Keyboard: Ctrl+Right moves to the next step, and Ctrl+Left moves back. Ctrl with the mouse wheel changes the text size. Ctrl+Alt+Shift+Backspace clears saved progress.
- The menu bar is hidden. Links open in the browser, not in the runner.
- The window icon is `renderer/app.png`. The runner runs without it, with Electron's default icon.
- The pop-out window shows one lesson. Its Re-dock button closes it. Light and dark mode is shared by both windows.
- The pop-out remembers its position and size in `window-state.json` (user data folder). If that position is no longer on a connected screen, it opens at the default place.
