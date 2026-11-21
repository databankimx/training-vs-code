# Recommended extensions

A project can recommend extensions to everyone who opens it. The recommendations live in a file called `extensions.json`, in the project's `.vscode` folder. When someone opens the project, VS Code shows a notice that lists the recommended extensions, with a button to install them.

![Figure 21.3 - The recommendations notice](images/ch21-recommendations-notice.png "width=50%")

*Figure 21.3 - The notice that appears when a project recommends extensions*

The file looks like this:

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.pylint"
  ]
}
```

Each entry is an extension's identifier. The identifier is the publisher, a dot, and the extension's name. The Python extension from Chapter 7 is `ms-python.python`. The second entry, `ms-python.pylint`, is the Pylint extension you installed in the first lesson of this chapter. The example lists both, so a project that recommends the Python extension also recommends the linter that checks its code.

Recommendations are suggestions. Nobody is forced to install them, and the notice can be dismissed. Recommended extensions appear in the Recommended section of the Extensions view, so you can find them later.

The `.vscode` folder in the practice repository belongs to the course, so `extensions.json` is part of the repository, and changes to it go through commits like any other file.

> **Settings and JSON are code.** `extensions.json` is a file the project depends on, so editing it is a change to the project, not just to your editor.

---
