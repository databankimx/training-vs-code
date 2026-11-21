# Resolving in the editor

Above each conflict, VS Code shows four links. Each one resolves the conflict in a different way:

- **Accept Current Change** keeps the text from the branch you are on, and removes the incoming text and the markers.
- **Accept Incoming Change** keeps the text from the branch you are merging in, and removes the current text and the markers.
- **Accept Both Changes** keeps both texts, one after the other, and removes the markers.
- **Compare Changes** opens the two versions side by side, so you can read them before you choose.

Choose one of the first three when you already know the answer. Choose Compare Changes when you are not sure, because a wrong choice is easy to make on a line you did not write.

Accept Both is often the wrong choice for code. Two versions of the same function, one after the other, usually do not compile. Read the result before you save.

When every conflict in the file is resolved, the markers are gone. Save the file. The file moves to the Merge Changes group in the Source Control view, and it is ready to stage.

> **Compare Changes does not resolve anything.** It only shows the two versions. You still need to click one of the other links, or edit the text yourself.

---
