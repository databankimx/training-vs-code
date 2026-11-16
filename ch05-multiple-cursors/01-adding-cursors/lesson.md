# Adding cursors

To add a cursor where you click, hold {{Alt}} and click. Each click places another cursor, and whatever you type then goes in every place at once. Use this when the places you need are not in a neat pattern.

To add cursors on the lines above or below, use the keyboard. Press {{Ctrl+Alt+Down}} to add a cursor on the line below the last one, and {{Ctrl+Alt+Up}} to add one above. Each press adds another line. This works well when the same change is needed on several lines in a row.

To remove the extra cursors and return to one, press {{Esc}}.

> **Undoing a cursor:** if you added a cursor by mistake, {{Ctrl+U}} takes the last cursor movement back, which removes the cursor you just added. It is not the same as undoing a text change, which is still {{Ctrl+Z}}.

## Example: commenting out three lines at once

Suppose you want to comment out these three lines in a Python file:

```python
apples = 3
pears = 5
plums = 7
```

Put the cursor at the start of `apples`. Press {{Ctrl+Alt+Down}} twice, so there is a cursor at the start of each of the three lines. Type `# `, and all three lines get the comment marker in one edit:

```python
# apples = 3
# pears = 5
# plums = 7
```

---
