# Branch and publish

A pull request needs a branch that is different from `main`. Create one from the status bar, as you did in Chapter 13, and call it `pr-practice`.

Stay on `pr-practice`. In `README.md`, add a line at the end of the file, such as `A change for the pull request.` Save, stage, and commit with the message `Add a line for the pull request`.

The branch exists only on your computer until you publish it. Run `Git: Publish Branch...` from the Command Palette. VS Code uploads the branch to your copy on GitHub and links it to a branch of the same name there.

Check the result in the terminal:

```
git status -sb
```

The first line should show `## pr-practice...origin/pr-practice`, which means the branch is published and linked to GitHub.

> **Publish before you open the pull request.** GitHub can only compare branches that exist on the website. A pull request for a branch that is still local will not be offered.

---
