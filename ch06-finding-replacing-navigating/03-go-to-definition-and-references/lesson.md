# Going to definitions, references, and lines

Search finds every place a text appears. Often you want something more exact: where a name is defined, or where it is used. VS Code can find both, because it reads the code, not just the text.

Put the cursor on a name, such as `total`, and press {{F12}}. VS Code jumps to the line where `total` is defined. Press {{Alt+Left}} to go back.

{{Alt+F12}} opens the definition in a small box inside the editor, so you can read it without leaving the place you are working. Press {{Esc}} to close the box.

![Figure 6.3 - Peek view showing a definition inside the current file](images/ch06-peek-definition.png "width=100%")

*Figure 6.3 - Peek view showing a definition inside the current file*

{{Shift+F12}} lists every place the name is used, in a panel at the bottom. Select one to open it. This is the list to check before you rename a function, because it includes every call and not only the ones in the open file.

> **Python needs its extension:** Go to Definition works for the languages VS Code understands out of the box, such as JavaScript and TypeScript. For Python, it needs the Python extension, which Chapter 7 installs. Until then, F12 may say that it cannot find a definition, and Find All References may list only the text it can match.

## Going to a line

{{Ctrl+G}} opens a box where you type a line number. Press {{Enter}} to jump there. It is the quickest way to reach an error message that names a line.

## Going to a symbol

A symbol is a named part of the file, such as a function or a variable. {{Ctrl+Shift+O}} lists the symbols in the open file, and you can type part of a name to narrow the list. Press {{Enter}} to jump to it.

## Example: finding the uses of total

Open `totals.js` in your practice folder. Put the cursor on `total` in the `function total(numbers)` line, and press {{Shift+F12}}. The panel lists every place `total` is used, including the line that exports it. Select the export line to open it.

Now put the cursor on `add` in `numbers.reduce(add, 0)`, and press {{F12}}. VS Code jumps to `function add(a, b)`, which is in the same file.

---
