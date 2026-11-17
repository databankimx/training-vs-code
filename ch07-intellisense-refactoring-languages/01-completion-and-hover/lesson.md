# Completion, parameter hints, and hover

As you type a name, VS Code offers the names that fit. The list that appears is called IntelliSense, and it is the quickest way to find a function or a variable without remembering its exact spelling.

Open `totals.js` in your practice folder. Start a new line inside the `total` function, type `num`, and wait. A list appears with `numbers` at the top. Press {{Enter}} to insert it, or press {{Esc}} to close the list. If the list does not appear, press {{Ctrl+Space}} to open it yourself.

![Figure 7.1 - The completion list offering names that start with num](images/ch07-completion-list.png "width=50%")

*Figure 7.1 - The completion list offering names that start with num*

## Parameter hints

When you type the name of a function followed by an open bracket, VS Code shows the names of the parameters it expects, with the one you are on in bold. Type `add(` in `totals.js`, and the hint shows `a` and `b`. Type a comma, and the hint moves to the next one.

To see the hint at any time, put the cursor inside the brackets and press {{Ctrl+Shift+Space}}.

## Hover

Hold the mouse over a name, and VS Code shows a small box with what the name is and what it does, using the comments above its definition. You can also press {{Ctrl+K}}, then {{Ctrl+I}}, with the cursor on the name. Hover is useful when you want to know what a name is without leaving the line you are on.

> **Hover comes from the code:** the box shows the comment above a definition, so a function with no comment shows only its signature.

## Example: completing a function you have just defined

In `totals.js`, type `tot` on a new line below the file's last function, and wait for the list. Choose `total`, and VS Code inserts the name. Type `(`, and the parameter hint shows `numbers`. Type `[1, 2, 3])`, and the line is complete, with no need to remember the spelling.

---
