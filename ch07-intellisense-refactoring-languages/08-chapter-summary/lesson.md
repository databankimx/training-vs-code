# Chapter summary

VS Code reads your code as you type, and it offers help based on what it finds. Keep these in mind:

- {{Ctrl+Space}} opens the completion list. {{Ctrl+Shift+Space}} shows the parameter hints.
- Hover shows what a name is. Language support, such as the Python extension, makes the help work for each language.
- {{F2}} renames a symbol everywhere it is used, with a preview. Find and Replace changes text, which is not the same.
- {{Ctrl+.}} opens Quick Fix on a problem. {{Ctrl+Shift+M}} opens the Problems panel, which lists every problem in the folder.

```quiz
Which key opens the completion list?
○ Ctrl+Shift+Space
→ Ctrl+Shift+Space shows parameter hints, not the completion list.
○ Ctrl+.
→ Ctrl+. opens Quick Fix on a problem.
◉ Ctrl+Space
→ Ctrl+Space opens the completion list at the cursor.
```

```quiz
What does Rename Symbol do that Find and Replace does not?
◉ It changes the name everywhere the symbol is used, and leaves text that only looks like it alone.
→ That is the difference. Rename Symbol understands the code, and Replace only matches text.
○ It changes the name in every file, including files outside the folder.
→ Rename Symbol works on the code in the folder, and does not reach beyond it.
○ It changes comments as well as code.
→ Comments are text, and Rename Symbol leaves them alone.
```

```quiz
Which key opens the Problems panel?
○ Ctrl+K
→ Ctrl+K starts a two-key shortcut. Hover uses Ctrl+K, then Ctrl+I.
○ Ctrl+.
→ Ctrl+. opens Quick Fix on the problem under the cursor.
◉ Ctrl+Shift+M
→ Ctrl+Shift+M opens the Problems panel, which lists every problem.
```
