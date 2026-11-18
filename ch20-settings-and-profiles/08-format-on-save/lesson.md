# Format on save

Formatting changes the layout of code without changing what it does: spacing, line breaks, and indentation. Format on save runs the formatter each time you save a file, so you never have to format by hand.

## An example

In `calculator.py`, a line such as `def add(a,b):` has no spaces after the comma. A formatter changes it to `def add(a, b):`. If format on save is on, that change happens when you press {{Ctrl+S}}. You did not run a separate command.

## The setting

Search the Settings editor for `format on save`. The setting is `editor.formatOnSave`. Turn it on, and the formatter runs each time you save:

```json
"editor.formatOnSave": true
```

## Which formatter runs

The formatter depends on the language of the file. If no formatter is set for that language, format on save does nothing. To check, right-click inside the file and choose Format Document. If VS Code asks you to choose a formatter, the language has no default, and you pick one from the prompt.

> **A formatter changes the file.** Look at what changed before you commit, the same way you check any other change.

---
