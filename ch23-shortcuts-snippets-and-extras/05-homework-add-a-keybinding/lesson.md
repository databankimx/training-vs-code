# Homework: add a keybinding

You will add a shortcut for a command you use often, by editing `keybindings.json`. This is a change to a settings file, so it is homework.

## Step 1: choose a command

Pick a command you use at least once a day. Good candidates are `Duplicate Selection`, `Toggle Line Comment`, and `Format Document`. Search the Keyboard Shortcuts editor for its name, and note its command name, which you can see by hovering over the row.

## Step 2: check the key is free

Search the editor for the key you want, such as `ctrl+alt+d`. If the search shows nothing, the key is free. If it shows a command, pick another key.

## Step 3: add the entry

Open the file with `Preferences: Open Keyboard Shortcuts (JSON)`. Add this entry inside the list, after the last entry, and put a comma after the entry before it:

```json
{
  "key": "ctrl+alt+d",
  "command": "editor.action.duplicateSelection",
  "when": "editorTextFocus"
}
```

## Step 4: check the file is valid

Look for red underlines. A missing comma, or an extra one, stops the file from loading.

## Step 5: test the shortcut

Open `calculator.py` in `training-vs-code-practice`. Put the cursor on a line, press your new shortcut, and check the result. Then undo it with {{Ctrl+Z}}.

~~~spoiler
Here is a complete keybindings file with the entry added. If you already have entries, keep them, and add a comma after the one before:

```json
[
  {
    "key": "ctrl+alt+d",
    "command": "editor.action.duplicateSelection",
    "when": "editorTextFocus"
  }
]
```

If the shortcut does nothing, check that the cursor is in the editor. The `when` condition stops it working anywhere else, which is the point of the condition.
~~~

---
