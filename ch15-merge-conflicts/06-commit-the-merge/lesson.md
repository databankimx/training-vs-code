# Committing the merge

A merge is not finished until you commit it. Until then, the branch is in a merge-in-progress state, and Git is waiting for the result.

Stage the resolved `calculator.py` from the homework in the previous lesson, unless Complete Merge has already staged it. The message box in the Source Control view fills with a message such as `Merge branch 'side-change'`.

![Figure 15.4 - The staged file and the Continue button, with the merge message filled in](images/ch15-merge-commit-message.png "width=50%")

*Figure 15.4 - The staged file and the Continue button, with the merge message filled in* Keep it, or change it, and click Continue above the message box to commit. The merge is complete when the commit appears.

Check the result in the terminal:

```
git log --oneline --graph -5
```

The graph shows the two lines of history joining in a merge commit. Your `side-change` commit is on one line, and your `main` commit is on the other, with the merge commit where they meet.

## Sync the merge

Click Sync Changes in the Source Control view. This practice repository is in your own GitHub account, so the merge can go straight to `main` on GitHub. Sync pulls first, which brings in nothing new, and then pushes the merge commit and the commits before it.

Check the result in the terminal:

```
git status -sb
```

The first line should show `## main...origin/main` with no ahead count.

> **At work, merges go through a pull request.** Our work repositories block direct merges to `main`, so this step is for your practice copy only. Chapter 17 covers the pull request route.

You can see the same history in the Graph panel at the bottom of the Source Control view. The panel draws each branch as a line, and it marks `main` and the sync state beside the newest commit. The merge commit is the one where the side line joins `main`.

![Figure 15.5 - The Graph panel after the merge, with the merge commit at the top of main](images/ch15-merge-graph.png "width=50%")

*Figure 15.5 - The Graph panel after the merge, with the merge commit at the top of main*

Your commit messages will differ from the ones in this picture. The shape of the graph is what to look for.

Check that nothing is left in a merge-in-progress state:

```
git status
```

It should say the working tree is clean, with no mention of a merge.

> **Cancelling a merge.** If you want to start again before you commit, run `git merge --abort` in the terminal. It stops the merge and returns the files to their state before the merge began.

---
