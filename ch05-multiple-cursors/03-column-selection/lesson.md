# Column selection

A column selection picks a rectangle of text across several lines, rather than a run of text from one place to another. It is useful for text laid out in columns, such as a table or a list of values lined up under each other.

To make one, hold {{Shift+Alt}}, then drag the mouse across the lines. The selection covers the same columns on each line. Release the mouse, and everything you type or delete applies to every line in the selection.

![Figure 5.5 - A column selection across several lines of text](images/ch05-column-selection.png "width=30%")

*Figure 5.5 - A column selection across several lines of text*

> **Lines of different lengths:** a column selection still works when the lines are not the same length. Lines that are too short for the column have no text there to select, so the edit skips them.

## Example: adding a dollar sign to a column of prices

Here is a short table, with the prices in the second column:

```
apple   1.20
banana  0.50
cherry  3.00
```

Put the cursor just before the `1` in `1.20`. Hold {{Shift+Alt}} and drag straight down, without moving sideways, until the cursor is on the `3` in `3.00`. Nothing is selected, but there is now a cursor on each of the three lines, all in the same column. Type `$`:

```
apple   $1.20
banana  $0.50
cherry  $3.00
```

Dragging straight down with no width gives you one cursor per line in the same column, which is the same as typing with several cursors. If you drag sideways too, you select a block of text, and typing replaces it.

---
