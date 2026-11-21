# Create a branch

The team has a rule that you never fix a problem directly on `main`. So you give your fix its own room, called a branch. Changes on a branch do not touch `main` until someone merges them, which means you can experiment, make mistakes, and throw the branch away if it goes badly. Chapter 13 covered branches, and this is that same action, applied to a real fix.

## Create it

Press {{Ctrl+Shift+P}}, type `Git: Create Branch...`, and press {{Enter}}. Type a name, such as `fix-price-test`, and press {{Enter}}. VS Code creates the branch from the current commit, and switches to it.

## Check it

The branch name in the status bar changes to `fix-price-test`. That is your check. Every change you make from now on belongs to this branch, and not to `main`.

## Naming

Names are short, lower case, and say what the change does. `fix-price-test` tells a reviewer more than `changes` or `test`, and it tells your future self more too. Use hyphens between words, not spaces.

> **Check the name in the status bar.** Before you edit, confirm the branch is the one you created. Working on the wrong branch is easy to miss, and annoying to untangle.

---
