# Comparing two commits

Sometimes you want to know how two commits differ, not what one commit did on its own. You can compare any two commits in the Timeline, and VS Code shows the difference between them.

For the `add` function, the two Chapter 15 commits are a good pair. Find the `Side change to add` commit and the `Main change to add` commit in the Timeline. Right-click the first one and choose Select for Compare. Then right-click the second one and choose Compare with Selected.

VS Code opens a diff with the two versions of `calculator.py` side by side. The tab title shows both commit hashes, in the form `first hash ↔ second hash`, so you can tell which side is which. The lines that differ are highlighted, and each one matches a line from the merge conflict in Chapter 15.

Check the same difference in the terminal, with the two commits' short hashes from the Timeline:

```
git diff <first-hash> <second-hash> -- calculator.py
```

Replace each `<hash>` with a hash from your history. The output shows the lines removed from the first commit and added in the second, with `-` and `+` marking them.

> **Order matters.** The first hash is the "before" side of the diff, and the second is the "after" side. Swap them and every line reverses, so check which commit is which before you read the result.

---
