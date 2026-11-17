# Checklist: fetch, pull, and push

Tick each item when you have done it in VS Code.

- [ ] Run `git remote -v` in the terminal, and check that `origin` points to your copy on GitHub.
- [ ] Run `git status -sb`, and check that `main` tracks `origin/main`.
- [ ] Run `Git: Fetch` from the Command Palette, with nothing new on the remote, and check that nothing changed.
- [ ] Run `Git: Pull` with `main` checked out, and check the result with `git log --oneline --graph -5`.
- [ ] Run `Git: Push`, sign in if asked, and check that `git status -sb` shows no ahead count.
- [ ] Find the outgoing and incoming counts in the status bar, and read them with the arrows.
- [ ] Use Sync Changes from the Source Control view, with nothing to pull or push, and check that nothing changes.
