# Committing

A commit saves the staged changes to the repository's history, with a message that says what changed. Only staged changes go into a commit.

![Figure 12.4 - The status bar with the branch name](images/ch12-status-bar-branch.png "width=50%")

*Figure 12.4 - The status bar with the branch name*

## Write the message

Make sure `README.md` is staged, and the other files are not. At the top of the Source Control view, click the message box, and type a short message that says what the change does, such as `Add a line to README`. The first line should be a short summary, under about 70 characters. Add more lines below it if you need to explain the change.

## Commit

Press {{Ctrl+Enter}} to commit, or click the check mark above the message box. The staged change moves into the history, the message box empties, and `README.md` disappears from the view. The unstaged files stay where they were.

## Check the branch

Look at the bottom left of the window, in the status bar. It shows the name of the branch you are on. The practice repository's default branch is `main`. VS Code shows the branch name there, and you can click it to switch branches. You will switch branches in Chapter 13.

## Check the history

Run this command in the terminal, in the practice folder:

```
git log --oneline -1
```

It should print the commit's short id and your message. If the message is not the one you typed, check the terminal's output before you go on.
