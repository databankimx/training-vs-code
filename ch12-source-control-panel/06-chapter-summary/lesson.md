# Chapter summary

You can now see what changed in the practice repository, stage the changes you want, and commit them with a message. Keep these in mind:

- {{Ctrl+Shift+G}} opens the Source Control view.
- Staging adds a change to the next commit. Only staged changes are committed.
- {{Ctrl+Enter}} commits from the message box.
- Discarding a change cannot be undone.
- The branch name is in the status bar, at the bottom left.

```quiz
What does staging a change do?
○ It sends the change to GitHub.
→ Pushing sends commits to GitHub. Staging does not send anything.
◉ It marks the change to be included in the next commit.
→ Only staged changes go into a commit.
○ It discards the change.
→ Discarding restores the file. Staging keeps the change.
○ It saves the file to disk.
→ Saving the file writes it to disk. Staging is a Git step.
```

```quiz
Which keys commit the staged changes from the message box?
○ {{Enter}}
→ Enter adds a new line to the message box.
○ {{Ctrl+S}}
→ Ctrl+S saves the file. It does not commit.
◉ {{Ctrl+Enter}}
→ Ctrl+Enter commits the staged changes.
○ {{Shift+Enter}}
→ Shift+Enter does not commit in the message box.
```

```quiz
A file in the Source Control view has a U beside it. What does that mean?
○ The file was updated by another person.
→ U does not mean another person changed the file.
○ The file was unchanged since the last commit.
→ Unchanged files do not appear in the Source Control view.
◉ Git has never seen the file, so it is untracked.
→ U means untracked. Stage the file to start tracking it.
○ The file is ignored by the .gitignore file.
→ Ignored files do not appear in the Source Control view at all.
```
