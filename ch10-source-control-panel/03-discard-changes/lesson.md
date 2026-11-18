# Discarding a change

Sometimes a change is a mistake, and you want the file back the way it was. The Source Control view can discard a change, which restores the file to its last committed version.

> **Discarding cannot be undone.** Git does not keep the discarded text. Only use this when you are sure you do not want the change.

Practise on the change to `README.md` you made in the last lesson, because it is easy to make again.

1. In the Source Control view, make sure `README.md` is in the Changes group, not Staged Changes. If it is staged, unstage it first.
2. Hover over `README.md`, and click the discard arrow. VS Code asks you to confirm. Choose the button that discards the change.

![Figure 10.3 - Discarding a change](images/ch10-discard-changes.png)

*Figure 10.3 - The Source Control view, with the discard icon on the README.md row*
3. Open `README.md`. The line you added is gone, and the file no longer appears in the view.

Then add the line again, so there is a change to commit in the next lesson.

Do not discard the changes to `prices.py`, `report.py`, or any other file in this chapter, unless you are sure you no longer need them. They are homework from earlier chapters, and they are not yet committed, so discarding them cannot be undone.
