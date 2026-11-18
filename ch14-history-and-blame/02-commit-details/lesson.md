# File history and commit details

Click an entry in the Timeline and VS Code opens the changes that commit made to the file. The diff view shows the file before and after the commit, the same way it showed your unstaged changes in Chapter 10.

Click the merge commit at the top of the Timeline. The diff shows the lines that changed in that commit, with the earlier version on the left and the later version on the right.

The commit details show the full commit message, the author, the date, and the commit's full hash, which is the long string of letters and numbers that identifies the commit. You can copy the hash from there, and you will need it for the terminal checks in the next lessons.

Check the details in the terminal, with the short hash from the Timeline, or the full hash if you copied it:

```
git show --stat <hash>
```

Replace `<hash>` with the hash you copied. The output lists the files the commit changed, with a count of lines added and removed for each one.

> **Hashes are not the same on every computer.** The hash comes from the commit's content and its history, so your commits have different hashes from the ones in the course screenshots. Always copy the hash from your own history.

---
