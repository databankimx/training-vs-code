# Deleting a branch

A branch is only a name for a commit, so deleting one does not delete any commits. The commits stay in the history until nothing points to them, and Git can still find them for a while after that. Do not treat a deleted branch as a way to throw work away.

Git does not let you delete the branch you are on. Switch to `main` first.

1. Run the command `Git: Delete Branch...` from the Command Palette, and choose `readme-note`.
2. VS Code deletes the branch. If the branch has commits that are not on any other branch, Git refuses and says so. Delete it anyway only when you are sure you do not need those commits.

Check the result in the terminal:

```
git branch
```

`readme-note` should no longer be listed. Keep `main` in the list.

> **Deleted by mistake?** Git keeps the commits for a while, so you can often recover a deleted branch by name using `git reflog`. Do not rely on it, and do not start deleting branches to tidy up before you know what they hold.

---
