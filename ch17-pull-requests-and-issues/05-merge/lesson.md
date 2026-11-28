# Merging the pull request

Once the review is done and any checks pass, the pull request can be merged. Merging brings the commits from `pr-practice` into `main`.

On the website, open the pull request. Once it is ready, the box near the bottom of the page reads Ready to merge, and the Merge pull request button is enabled.

![Figure 17.4 - The Ready to merge box with the Merge pull request button](images/ch17-ready-to-merge.png "width=75%")

*Figure 17.4 - The Ready to merge box with the Merge pull request button*

Click Merge pull request. Keep the default merge method that the repository offers. Confirm the merge, and then click Delete branch, which removes `pr-practice` from GitHub.

Your local `main` does not have the change yet. Bring it up to date:

1. In `training-vs-code-practice`, switch to `main` from the status bar.
2. Run `Sync Changes` from the Source Control view. This fetches the merged commit and brings it into your local `main`.
3. Delete the local `pr-practice` branch with `Git: Delete Branch...`, choosing `pr-practice`.

Check the result in the terminal:

```
git log --oneline -3
git branch
```

The top commit on `main` should be the merge, and `pr-practice` should no longer be in the branch list.

> **At work, the merge needs the approvals first.** A codeowner approval is required before the Merge pull request button is enabled on our work repositories. The practice repository skips that rule, so you can merge your own change.

---
