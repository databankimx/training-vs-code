# Line blame

Blame answers a narrower question than the Timeline. For each line in a file, it names the commit that last changed the line, and the author of that commit.

Open `calculator.py`, and put the cursor on the `return` line of `add`. Run `Toggle Git Blame Editor Decoration` from the Command Palette. A blame annotation appears at the end of each line, showing the author, the date, and the commit message.

To see the blame for the current line in the status bar at the bottom of the window, run `Toggle Git Blame Status Bar Item` as well. Run either command again to turn it off.

Hover over the annotation to see a card with the author, the date, the commit message, and how many lines the commit added and removed. At the bottom of the card, the short hash opens the commit when you click it. The card also has an Open on GitHub link, which opens the same commit on the website.

Check the same information in the terminal, for the lines of `add`:

```
git blame -L 3,4 calculator.py
```

The output shows, for lines 3 and 4, the short hash of the commit that last changed each line, the author, the date, and the line itself. The short hash should match the commit that the annotation in VS Code names.

> **Blame does not mean fault.** The commit that last changed a line is often a fix for a problem somewhere else, or a formatting change. Read the commit message and the diff before you draw any conclusion about who did what.

---
