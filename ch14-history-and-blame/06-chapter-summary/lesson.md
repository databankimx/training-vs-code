# Chapter summary

You can now read a file's history, open any commit in it, find the commit behind a line, and compare two commits. None of it changed your repository.

- The Timeline view lists the commits that changed the file you have open.
- The commit details show the message, author, date, and full hash.
- Blame names the commit and author behind each line.
- Compare Selected shows the difference between two commits. The order of the hashes sets which side is "before."

```quiz
Which view lists the commits that changed the file you have open?
◉ The Timeline view in the Explorer.
→ The Timeline lists the commits that changed the open file.
○ The Graph panel in the Source Control view.
→ The Graph shows the whole repository, not one file.
○ The status bar.
→ The status bar shows the branch and the sync counts.
```

```quiz
What does git blame tell you about a line?
○ Whether the line has a bug.
→ Blame does not judge code. It names the commit that last changed the line.
○ Every commit that has ever changed the file.
→ That is the Timeline. Blame names only the last commit for each line.
◉ The commit and author that last changed the line.
→ Blame gives the commit, author, and date for each line.
```

```quiz
You run git diff with two hashes. What happens if you swap them?
◉ Every line reverses, because the first hash becomes the "before" side.
→ The first hash is the before side, so swapping the hashes reverses the diff.
○ Nothing. The diff is the same.
→ The order changes the diff, so check which commit is which.
○ Git refuses to compare them.
→ Git accepts both orders and shows the reversed diff.
```

---
