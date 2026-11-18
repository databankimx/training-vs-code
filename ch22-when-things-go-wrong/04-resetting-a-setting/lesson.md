# Resetting a setting

Sometimes a setting you changed causes the trouble, and the fastest fix is to put it back. You can do that in two places.

## In the Settings editor

Open the Settings editor with {{Ctrl+,}}, and search for the setting, using `@modified` to list every change you have made. Click the gear icon beside the setting, and choose Reset Setting. The value returns to its default, and the setting leaves the modified list.

## In the file

Open the user settings file with `Preferences: Open User Settings (JSON)`. Find the entry for the setting, and delete the whole line. Remember the comma rules: if you delete the last entry, the one before it must not end with a comma. Save the file.

## An example

You changed the font size to 16, and now a file looks wrong. Reset it in the editor, then open the file and check that the `editor.fontSize` line has gone. The two views should agree.

> **Reset one setting at a time.** If you change several and the problem goes away, you do not know which one caused it. Undo them one at a time, and test after each one.

---
