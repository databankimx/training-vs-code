# Reading conflict markers

When Git hits a conflict, it writes both versions into the file, separated by markers. The markers look like this:

```python
def add(a, b):
<<<<<<< HEAD
    return b + a
=======
    return a + b
>>>>>>> side-change
```

Each part means something:

- `<<<<<<< HEAD` starts the **current** change. It is the version on the branch you are on, and `HEAD` is Git's name for the latest commit on that branch.
- `=======` separates the two versions.
- `>>>>>>> side-change` ends the **incoming** change. It is the version from the branch you are merging in, here `side-change`.

The markers are not valid Python, so the file will not run until you remove them. The conflict you created in the first lesson looks like this in VS Code:

![Figure 15.2 - A conflict in calculator.py, with the links above it](images/ch15-conflict-codelens.png "width=75%")

*Figure 15.2 - A conflict in calculator.py, with the links above it* Resolving a conflict means choosing the text you want, and deleting all three marker lines.

VS Code also shows each conflict with a colour band, and it adds a few links above the conflict. Those links are the quick way to resolve it, and the next lesson covers them.

> **Do not leave markers in a commit.** If you commit a file that still has markers, the broken text goes into the history. Search for `<<<<<<<` before you commit, to check the file is clean.

---
