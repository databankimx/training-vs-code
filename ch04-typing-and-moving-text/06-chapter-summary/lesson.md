# Chapter summary

You can undo and redo, move and copy lines, comment and delete them, wrap long lines, and expand Emmet abbreviations. Keep these in mind:

- {{Ctrl+Z}} undoes and {{Ctrl+Y}} redoes.
- {{Alt+Up}} and {{Alt+Down}} move a line. {{Shift+Alt+Up}} and {{Shift+Alt+Down}} copy it.
- {{Ctrl+/}} comments out a line or a selection. {{Ctrl+Shift+K}} deletes a line.
- {{Alt+Z}} turns on word wrap. It changes only how the file is shown, not the file itself.

```quiz
Which key moves the cursor's line down one line?
○ Shift+Alt+Down
→ That copies the line below, and the original stays where it was.
○ Ctrl+Down
→ Ctrl+Down is not a line-moving shortcut in VS Code.
◉ Alt+Down
→ Alt+Down moves the line. Add Shift to copy it instead.
```

```quiz
Does word wrap (Alt+Z) change the saved file?
○ Yes. It adds line breaks to the file at the cursor.
→ Word wrap does not write anything into the file.
○ Yes. It adds a comment marker to each wrapped line.
→ Word wrap does not add comments. Ctrl+/ does that.
◉ No. It changes only how the line is shown on screen.
→ That is right. The file keeps its own line breaks.
```

```quiz
Which key deletes the whole line the cursor is on, without selecting it first?
○ Ctrl+/
→ Ctrl+/ comments the line out. It does not remove it.
○ Ctrl+Z
→ Ctrl+Z undoes the last change. It does not delete a line on its own.
◉ Ctrl+Shift+K
→ That deletes the line the cursor is on, so you do not need to select it first.
```
