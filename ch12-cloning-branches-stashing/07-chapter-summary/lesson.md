# Chapter summary

You can now clone from inside VS Code, work on a branch, shelve unfinished changes, and undo a commit you did not mean to make.

- `Git: Clone` copies a repository into a folder you choose.
- The branch name in the status bar is where you create and switch branches.
- Deleting a branch does not delete its commits, and Git will not delete the branch you are on.
- A stash keeps changes Git tracks. Include untracked files when you need them too.
- `Git: Undo Last Commit` keeps the changes, staged, for a commit you have not pushed.

```quiz
Which command shelves your unfinished changes so the folder returns to the last commit?
○ Git: Clone
→ Clone copies a repository. It does not shelve changes.
○ Git: Create Branch...
→ A branch does not hold changes. It only names a commit.
◉ Git: Stash
→ Stash puts the changes on a shelf and leaves the folder at its last commit.
○ Git: Undo Last Commit
→ Undo changes a commit. It does not shelve uncommitted changes.
```

```quiz
You try to delete the branch you are on. What happens?
○ Git deletes it, and switches you to main.
→ Git does not switch branches for you when you delete one.
◉ Git refuses, because you cannot delete the branch you are on.
→ Switch to main first, then delete the branch.
○ Git deletes the branch and all its commits.
→ Deleting a branch removes only its name. The commits stay in the history.
```

```quiz
You undo your last commit with Git: Undo Last Commit. Where do its changes go?
○ They are discarded.
→ Undo keeps the changes, so you can commit them again.
○ They go to the stash.
→ Undo does not stash the changes. It keeps them staged.
◉ They stay in your folder as staged changes.
→ Undo keeps the work and stages it, ready for another commit.
○ They are pushed to GitHub.
→ Undo never pushes anything. Chapter 13 covers pushing.
```

---
