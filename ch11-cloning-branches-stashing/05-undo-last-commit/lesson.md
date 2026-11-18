# Undoing the last commit

You committed too early, or with the wrong message, or left out a file. You can undo the last commit and keep its changes, so the work is still in your folder and staged for the next commit.

This only works for a commit you have not pushed. Chapter 12 explains why pushed commits are different.

1. Check the commit to undo with `git log --oneline -1`.
2. Run `Git: Undo Last Commit` from the Command Palette.
3. The changes return to the Staged Changes group in the Source Control view, and the commit message box fills with the old message.

Check the result in the terminal:

```
git log --oneline -1
```

The commit you undid should be gone, and the previous commit should be on top.

> **Terminal alternative.** The same result comes from `git reset --soft HEAD~1`. It moves the branch back one commit, and keeps the changes staged. Use the palette command unless you are running Git in the terminal already.

---
