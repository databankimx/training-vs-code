# Checklist: history and blame

Tick each item when you have done it in VS Code. Nothing in this chapter changes a file, so you can run every item again without harm.

- [ ] Open the Timeline view under the Explorer for `calculator.py`, and check its entries with `git log --oneline -- calculator.py`.
- [ ] Open the merge commit from the Timeline, and read its changes in the diff view.
- [ ] Copy the hash of one commit from the commit details, and check it with `git show --stat <hash>`.
- [ ] Put the cursor on a line of `add`, and read its blame information.
- [ ] Check the blame for lines 3 and 4 with `git blame -L 3,4 calculator.py`.
- [ ] Compare the `Side change to add` and `Main change to add` commits with Compare Selected, and check the difference with `git diff`.
