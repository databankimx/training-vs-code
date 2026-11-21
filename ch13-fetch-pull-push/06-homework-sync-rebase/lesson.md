# Homework: rebase when syncing

Sync Changes can merge or rebase when it pulls. By default it merges, so when both you and the remote have new commits, Git adds a merge commit to join them. In this homework you turn on `git.rebaseWhenSync`, create the same kind of divergence, and check that the history stays a straight line.

This homework uses two copies of the practice repository: your `training-vs-code-practice` folder, and the `branches-practice` clone from Chapter 12. Both push to your copy on GitHub.

Make every change in VS Code, not in the terminal, except where a step says to check with Git.

## Step 1: change the setting

Open your user settings file. Press {{Ctrl+Shift+P}}, type `Preferences: Open User Settings (JSON)`, and press Enter. Add this line inside the braces, and save the file:

```json
"git.rebaseWhenSync": true
```

Put a comma after the previous setting, if there is one. Your file must stay valid JSON, so VS Code will underline a missing comma.

## Step 2: make a remote commit

Open `branches-practice`, which you cloned in Chapter 12. In `README.md`, add a line at the end of the file, such as `A note from the second copy.` Commit it, and click Sync Changes in the Source Control view. This pushes the commit to GitHub, so your other copy can see it.

## Step 3: make a local commit that does not match

Open `training-vs-code-practice`. In `README.md`, add a line after the first line, which is the title. Use a different line from the one in Step 2, such as `A note from the first copy.` Commit it with any message.

Do not sync yet. Your local commit and the remote's commit now both come after the same point.

## Step 4: sync

Click Sync Changes in the Source Control view for `training-vs-code-practice`. The sync fetches the remote commit, then replays your local commit on top of it, and then pushes.

Check the result in the terminal, in `training-vs-code-practice`:

```
git log --oneline --graph -6
```

The graph should be a straight line, with your commit on top and no merge commit. If you see a merge commit, the setting is not on, or VS Code has not reloaded it. Close and reopen VS Code, then check your settings file again.

Also check the status bar. The arrows should show nothing to sync.

~~~spoiler
Here is the setting in full. If your user settings file has other settings, keep them, and add a comma after the one before this line.

```json
{
    "git.rebaseWhenSync": true
}
```

With the setting on, `git log --oneline --graph -6` shows your commit on top of the remote's commit, with no merge commit. Without the setting, the same sync creates a merge commit, which shows as a branch and a join in the graph.
~~~
