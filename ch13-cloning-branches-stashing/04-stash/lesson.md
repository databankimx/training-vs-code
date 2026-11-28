# Stashing changes

Sometimes you have half-finished work and need to switch branches or pull changes first. Git will not switch if your changes would be overwritten. A stash puts your unfinished changes on a shelf, leaves your folder at its last commit, and lets you bring them back later.

Make a change to `README.md` and save it, so there is something to stash.

1. Run `Git: Stash` from the Command Palette. VS Code asks for an optional message, which you can type as `Note for later`, and press Enter.
2. Check that the change has gone. `README.md` no longer appears in the Source Control view.
3. Run `Git: Apply Latest Stash` from the Command Palette. The change returns to `README.md`, and the stash stays on the shelf.
4. Run `Git: Pop Latest Stash` when you are sure you want the change back and want the stash removed.

Stash only applies to changes Git already tracks. A new file such as `report.py` is untracked, and a plain stash leaves it where it is. To stash untracked files too, run `Git: Stash (Include Untracked)`.

Check the shelf in the terminal:

```
git stash list
```

After a pop, the list should be empty.

> **Apply or pop?** Apply keeps the stash, so you can apply it again. Pop applies it and deletes the stash. If you are not sure, apply first.

---
