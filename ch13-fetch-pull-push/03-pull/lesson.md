# Pulling

Pull does two things: it fetches, and then it brings the remote's commits into your current branch. Pull changes your branch and your folder, so it can cause merge conflicts, which Chapter 14 covers.

When your branch has no new commits on the remote, pull does nothing except confirm that.

Run `Git: Pull` from the Command Palette, with `main` checked out.

Git can bring the commits in two ways:

- **Merge** joins the two histories with a merge commit, so both lines are kept.
- **Rebase** replays your local commits on top of the remote's commits, so the history is a single line.

Git chooses between them using its own configuration, so Pull does not have a VS Code switch for it. The homework at the end of this chapter uses Sync Changes instead, which does have one. Either way, pull keeps your commits.

Check the result in the terminal:

```
git log --oneline --graph -5
```

The graph shows how the two lines of history joined. If there was nothing to pull, the graph is a straight line of your commits.

> **Pull before you push.** If the remote has commits you do not have, a push is refused. Pull first, then push.

---
