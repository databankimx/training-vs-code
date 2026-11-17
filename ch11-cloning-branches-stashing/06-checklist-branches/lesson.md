# Checklist: cloning, branches, and stashes

Tick each item when you have done it in VS Code.

- [ ] Clone your copy of the practice repository into `C:\Development\training\branches-practice`, using `Git: Clone`.
- [ ] Run `git log --oneline -3` in the clone, and check that the Chapter 10 commit is not there.
- [ ] Create the branch `readme-note` from the status bar.
- [ ] Commit a README change on `readme-note`.
- [ ] Switch back to `main` from the status bar, and check that the README change is gone.
- [ ] Run `git branch` in the terminal, and check that `readme-note` is listed.
- [ ] Delete `readme-note` with `Git: Delete Branch...`, after switching to `main`.
- [ ] Stash an unfinished change with `Git: Stash`, then apply it with `Git: Apply Latest Stash`.
- [ ] Commit a change, then undo it with `Git: Undo Last Commit`, and check that the changes are staged.
