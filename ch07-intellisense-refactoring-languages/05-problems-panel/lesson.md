# The Problems panel

The underlines in the editor show problems one at a time. The Problems panel lists all of them for the open folder, with the file and line of each. Press {{Ctrl+Shift+M}} to open it. Select an entry to jump to its line.

![Figure 7.4 - The Problems panel listing errors in two files](images/ch07-problems-panel.png "width=50%")

*Figure 7.4 - The Problems panel listing errors in two files*

The panel has two counts: errors, marked with a red icon, and warnings, marked with a yellow one. Errors usually stop the code from running. Warnings point at something that might be a mistake but still runs.

The panel can also filter the list. Type in its filter box to show only the entries whose text matches, such as `undefined`.

> **Clear the list before you trust it:** the Problems panel updates as you type, so an entry can linger for a moment after you fix a problem. If an entry stays after the code is correct, save the file and check again.

## Example: finding every problem in a folder

Open the Problems panel with the practice folder open. Each file that has a problem is listed, with a count beside it. Expand a file, select an entry, and VS Code opens the file at that line. Press {{Ctrl+.}} with the cursor on the problem to see whether Quick Fix can repair it.

---
