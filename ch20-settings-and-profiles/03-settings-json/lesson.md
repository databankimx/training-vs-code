# settings.json

Every setting you change is stored in a JSON file. To open the user settings file, press {{Ctrl+Shift+P}}, type `Preferences: Open User Settings (JSON)`, and press {{Enter}}.

![Figure 20.3 - The settings.json file](images/ch20-settings-json.png "width=70%")

*Figure 20.3 - settings.json open in the editor*

The file holds one entry for each setting you have changed. Each entry is a name and a value:

```json
{
  "editor.fontSize": 16,
  "editor.rulers": [79],
  "files.autoSave": "afterDelay"
}
```

## Reading the file

Each entry is a setting name, a colon, and a value. Text goes in double quotes. Numbers and `true` or `false` do not. Lists go in square brackets. Entries are separated by commas, and the last entry has no comma after it.

VS Code underlines a mistake in red. A file with a mistake may not load, so none of its settings take effect. Check for red underlines every time you edit the file.

## The two ways are the same

Changing a setting in the Settings editor writes the same entry to this file. Use the file when you already know the setting's name, or when you want to copy a group of settings to another computer. Changes take effect when you save the file.

## Auto save

Auto save writes your changes to disk for you, so you do not have to remember to press {{Ctrl+S}}. The setting is `files.autoSave`, and it has four values:

- `off` saves nothing automatically. This is the default in VS Code.
- `afterDelay` saves once you stop typing for a short time. The wait is set by `files.autoSaveDelay`, in milliseconds. The default is 1000, which is one second.
- `onFocusChange` saves when you move to another file or panel.
- `onWindowChange` saves when you leave the VS Code window.

With `afterDelay` on, you type a line, pause, and the file saves itself. The dot on the tab goes away without you pressing anything.

Auto save reduces the chance of losing unsaved work when VS Code closes or crashes. It does not protect you from saving mistakes. It writes whatever is on the screen, including half-finished code that does not run yet. Git commits are still your decision, so check what you are committing.

> **Save the file.** An unsaved change does nothing. A tab with unsaved changes shows a dot where its close button would be.

---
