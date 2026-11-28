# The Timeline view

The Timeline view lists the commits that touched the file you have open. It sits in the Explorer, under the file tree.

![Figure 16.1 - The Timeline view](images/ch16-timeline-view.png)

*Figure 16.1 - The Timeline section under the file tree in the Explorer*

Open `calculator.py` in `training-vs-code-practice`. In the Explorer, the Timeline section sits under the Outline section, below the file tree. Expand it if it is collapsed.

Each entry shows the commit message, the author, and how long ago the commit was made. The newest commit is at the top. For `calculator.py` you should see the merge from Chapter 15, the two commits that changed the `add` function, and earlier commits from the course.

Check the list in the terminal, in your practice folder:

```
git log --oneline -- calculator.py
```

The commits should match the Timeline entries, in the same order.

> **Timeline shows one file.** It lists the commits that changed the file you have open. To see the history of the whole repository, use the Graph panel in the Source Control view, which Chapter 15 introduced.

---
