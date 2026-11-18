# Line blame

Blame answers a narrower question than the Timeline. For each line in a file, it names the commit that last changed the line, and the author of that commit.

Open `calculator.py`, and put the cursor on the `return` line of `add`. Run the Command Palette command that shows blame information for the current line. In VS Code, that is a blame annotation at the end of the line, which shows the author, the date, and the commit message.

Click the annotation to open the commit's details, the same as in the Timeline.

Check the same information in the terminal, for the lines of `add`:

```
git blame -L 3,4 calculator.py
```

The output shows, for lines 3 and 4, the short hash of the commit that last changed each line, the author, the date, and the line itself. The short hash should match the commit that the annotation in VS Code names.

> **Blame does not mean fault.** The commit that last changed a line is often a fix for a problem somewhere else, or a formatting change. Read the commit message and the diff before you draw any conclusion about who did what.

---
