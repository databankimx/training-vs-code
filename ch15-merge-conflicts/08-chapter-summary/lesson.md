# Chapter summary

Conflicts happen when two branches change the same lines. Git marks the file and waits for you to choose.

- The current change sits between `<<<<<<<` and `=======`, and the incoming change sits between `=======` and `>>>>>>>`.
- The Accept links above a conflict resolve it in place. Compare Changes only shows the two versions.
- The Merge Editor splits the file into Current, Incoming, and Result, and only the Result is edited.
- A merge is finished when you commit the resolved file.

```quiz
In a conflict, what does the part between <<<<<<< HEAD and ======= contain?
◉ The current change, from the branch you are on.
→ HEAD is the latest commit on the branch you are on.
○ The incoming change, from the branch you are merging in.
→ The incoming change comes after =======.
○ A comment that Git adds for you.
→ Git writes the two versions into the file, not comments.
```

```quiz
What does Compare Changes do?
○ It resolves the conflict by keeping the newer change.
→ Git does not choose the newer change. You choose.
○ It deletes the conflict markers.
→ The markers are removed only when you choose one of the Accept links.
◉ It shows the two versions side by side, without changing the file.
→ Compare Changes only shows the two versions. Use an Accept link or edit the text to resolve.
```

```quiz
Why is a merge not finished when the file is resolved?
○ Because the file still has to be pushed.
→ Pushing is a separate step, and it comes after the commit.
◉ Because the merge is completed by a commit.
→ Resolving the file is not enough. Commit the merge to finish it.
○ Because Git needs a day to check the merge.
→ Git does not wait. The merge completes when you commit it.
```

---
