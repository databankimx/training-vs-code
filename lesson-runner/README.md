# Lesson runner

The lesson runner for the Working With Visual Studio Code tutorial. It shows the chapters, the steps, quizzes, spoiler examples, and a Source pane that shows one file per step. The learner's file can be edited where the step allows it, and a JSON file is checked as it is typed. Nothing in the runner runs code. See `../resources/roadmap.md` for the design.

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

`npm test` runs the catalog, Markdown, progress, and gating tests. It also checks every quiz in the course: each one must have exactly one correct choice.

## Layout

| Path | Purpose |
|---|---|
| `main.js` | The Electron main process. Finds the course, renders lessons, reads each step's file, and saves progress. |
| `preload.js` | The only bridge to the page. It exposes a fixed list of functions, and nothing else. |
| `core/catalog.js` | Finds chapters and steps, works out the order (including Next across chapters), and checks each step's file exists. |
| `core/gating.js` | Decides which homework solutions sit behind the spoiler gate. |
| `core/markdown.js` | Renders lessons. Raw HTML is off. Handles the `quiz`, `spoiler`, `examples`, and `mermaid` blocks. |
| `core/state.js` | Saves progress to the user data folder, never to the repository. |
| `renderer/` | The page: `index.html` (layout and styles), `icons.js`, `logo.svg`, `renderer.js` (behavior), and `vendor/mermaid.min.js`. |
| `test/` | Node's built-in test runner. |

## Step files

A step's `lesson.json` may name one file in its folder with `"file"`. The Source pane shows it. The file is editable only when `"edit": "file"` is also given. A homework step with `"section": "homework"`, `"spoiler": true`, and a `solution` file (for example `solution.json` beside `settings.json`) gets a spoiler button that shows the solution and lists the changes from the file.

## Notes

- The runner reads the course from the parent folder, `..`. It never writes into the course.
- Lesson images come from the chapter's `images/` folder, so every lesson in a chapter refers to them as `images/name.png`.
- Progress is saved in the user data folder as `progress.json`. Edits in the Source pane last only while the learner is on the step.
- Keyboard: Ctrl+Right moves to the next step, and Ctrl+Left moves back. Ctrl with the mouse wheel changes the text size. Ctrl+Alt+Shift+Backspace clears saved progress: quiz answers, spoiler states, the last lesson, and visited steps.
- The menu bar is hidden. Links open in the browser, not in the runner.
- The window icon is `renderer/app.png`. The runner runs without it, with Electron's default icon.
- The pop-out window shows one lesson. Its Re-dock button closes it. Light and dark mode is shared by both windows.
- The pop-out remembers its position and size in `window-state.json` (user data folder). If that position is no longer on a connected screen, it opens at the default place.
