# keybindings.json

The changes you make in the Keyboard Shortcuts editor are saved to a file called `keybindings.json`. To open it, press {{Ctrl+Shift+P}}, type `Preferences: Open Keyboard Shortcuts (JSON)`, and press {{Enter}}.

![Figure 23.2 - keybindings.json](images/ch23-keybindings-json.png)

*Figure 23.2 - The keybindings.json file, with the duplicate shortcut entry*

An entry for the duplicate shortcut looks like this:

```json
[
  {
    "key": "ctrl+alt+d",
    "command": "editor.action.duplicateSelection",
    "when": "editorTextFocus"
  }
]
```

## Reading an entry

- **key** is the shortcut, written in lower case with plus signs. `ctrl+alt+d` means Control, Alt, and D pressed together.
- **command** is the internal name of the command. You can find it by searching the Keyboard Shortcuts editor, or by hovering over a command in the Command Palette.
- **when** is the condition under which the shortcut works. `editorTextFocus` means the cursor is in a text editor. Without it, the shortcut might fire in the terminal, or in the search box.

The file holds a list, so the entries sit between square brackets, and each one is separated from the next by a comma. The same rules as `settings.json` apply: text goes in double quotes, and a red underline means the file will not load.

> **Use the editor to write entries.** Typing a command name by hand is easy to get wrong. The Keyboard Shortcuts editor writes a correct entry for you, and you can check the result here.

---
