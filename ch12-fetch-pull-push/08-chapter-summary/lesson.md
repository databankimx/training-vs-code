# Chapter summary

Your practice repository now talks to GitHub, and its `main` branch has been pushed.

- `origin` is your copy on GitHub.
- Fetch downloads commits and changes nothing in your folder.
- Pull fetches and brings the remote's commits into your branch.
- Push uploads your commits. Sign in when asked.
- Publish Branch sends a new branch to the remote for the first time.
- The arrows in the status bar show outgoing and incoming counts.
- Sync Changes pulls, then pushes. The setting `git.rebaseWhenSync` makes its pull rebase instead of merge.

```quiz
What does fetch change in your folder?
○ It updates your branch and its files.
→ That is pull. Fetch only downloads commits.
○ It uploads your commits to GitHub.
→ That is push.
◉ Nothing. Fetch downloads commits and leaves your files alone.
→ Fetch never changes your branch or your files.
```

```quiz
The status bar shows ↑2. What does it mean?
◉ Two commits on your computer are not on the remote yet.
→ Outgoing commits are waiting to be pushed.
○ Two commits on the remote are not on your computer.
→ That is the incoming count, shown with ↓.
○ Two files have changed in your folder.
→ The arrows count commits, not files.
```

```quiz
Git refuses a push. What is the most likely reason?
○ The push is never refused.
→ Git does refuse pushes in some situations, and this is one of them.
○ Your files have unsaved changes.
→ Unsaved files do not affect a push. Only commits are pushed.
◉ The remote has commits you do not have yet.
→ Pull first to bring them in, then push.
○ The branch name is too long.
→ Branch names do not affect whether a push is accepted.
```

---
