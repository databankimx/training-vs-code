# Breadcrumbs and moving back and forward

Above the editor, a line of breadcrumbs shows where the cursor is: the folder, the file, and then the symbol the cursor is inside, such as a function. Select any part of it to see the choices at that level, then select one to jump there.

![Figure 6.4 - Breadcrumbs above the editor, showing the file and the function the cursor is in](images/ch06-breadcrumbs.png "width=50%")

*Figure 6.4 - Breadcrumbs above the editor, showing the file and the function the cursor is in*

Breadcrumbs are useful in a long file, because they tell you which function you are in without scrolling to find its name.

## Moving back and forward

VS Code remembers the places you have been: the file, and the line in it, before each jump. {{Alt+Left}} goes back to the previous place, and {{Alt+Right}} goes forward again. This works across files too, so after you jump to a definition in another file, {{Alt+Left}} returns you to where you were.

> **Back is not undo:** {{Alt+Left}} moves the cursor. It does not reverse a change to the text. For a change to the text, use {{Ctrl+Z}}.

## Example: a round trip to a definition

In `totals.js`, put the cursor on `add` in `numbers.reduce(add, 0)`, and press {{F12}}. VS Code jumps to `function add(a, b)`. Press {{Alt+Left}}, and the cursor returns to the `reduce` line. Press {{Alt+Right}}, and it goes back to the definition. The two keys take you through the same jumps you made, in both directions.

---
