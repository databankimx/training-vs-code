# The Merge Editor

The conflict you created in the first lesson is small. For a conflict with more than a line or two, the Merge Editor is easier to read than the markers. It splits the file into three panes:

- **Incoming** on the left shows the branch you are merging in.
- **Current** on the right shows the branch you are on.
- **Result** at the bottom is the file that will be saved, and it is the one you edit.

![Figure 15.3 - The Merge Editor with Incoming, Current, and Result panes](images/ch15-merge-editor.png "width=75%")

*Figure 15.3 - The Merge Editor with Incoming, Current, and Result panes*

Each change in the Incoming and Current panes has links above it. Accept Incoming and Accept Current copy that version into the Result, and Ignore leaves it out. The Result pane's header shows how many conflicts remain, and it counts down as you resolve each one. You can also edit the Result by hand, so a line from each side can go into one combined version.

To open the Merge Editor, click the conflicted file in the Source Control view, in the Merge Changes group, and choose Resolve in Merge Editor. Alternatively, use the Resolve in Merge Editor button that appears over the conflicted file in the editor.

When every change is handled, the Result pane has no conflicts left. Click Complete Merge. VS Code saves the file and stages it, and the Continue button in the Source Control view becomes available. Continue makes the merge commit, which the next lesson covers. If you resolved in the editor instead, save and stage the file yourself, and Continue becomes available in the same way.

> **The Merge Editor only edits the Result.** The panes on either side are read-only, so you cannot accidentally change the branch you are merging from.

---
