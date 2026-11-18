# Commit the change

Your fix is ready, and the story needs its record. A commit is a saved step in the history, with a message that says what changed and why. Think of the message as a note to the next person who opens this file, which, given how long the red test lasted, may well be you in six months, wondering what happened. Chapter 10 covered the basics, and this commit is the one the reviewer will read.

## Stage the change

In the Source Control view, check that the Changes list shows only `test_calculator.py`. Click the plus icon beside the file to stage it, so it moves into the Staged Changes list.

## Write the message

Type a message in the box at the top of the Source Control view. Use a short first line that says what the commit does, such as:

```text
Fix expected total in the price test
```

If the change needs explaining, leave a blank line, then write a sentence or two about why. For this change, the reason is that the code returns 6, which is correct, and the test expected 7.

## Commit

Press {{Ctrl+Enter}}, or click the check mark above the message box. The commit moves into the history on `fix-price-test`, and the Changes list empties.

> **Commit only what you checked.** Look at the Staged Changes list before you commit. Anything there goes into the history, and history is harder to edit than a file.

---
