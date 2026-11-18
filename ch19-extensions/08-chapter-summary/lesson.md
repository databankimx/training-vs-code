# Chapter summary

You can now find an extension, check its publisher and license, turn it off without removing it, keep it up to date, and recommend it to a project.

- Check the publisher before you install an extension.
- Disable keeps an extension's files, and uninstall removes them.
- Disable (Workspace) turns an extension off for one folder only.
- `.vscode/extensions.json` recommends extensions to everyone who opens the project.

```quiz
What is the difference between disabling an extension and uninstalling it?
○ Disabling removes the extension's files, and uninstalling keeps them.
→ It is the other way round. Disabling keeps the files.
○ There is no difference.
→ The two differ in whether the extension's files stay on your computer.
○ Disabling deletes the extension's settings.
→ Disabling keeps the settings. Only the files are affected by uninstalling.
◉ Disabling keeps the files, so the extension can be re-enabled without downloading it again.
→ Uninstalling removes the files, so the extension has to be downloaded again.
```

```quiz
Where does a project store its extension recommendations?
◉ In a file called extensions.json, in the .vscode folder.
→ That is the file VS Code reads when the project is opened.
○ In the README.md file.
→ The README is for people. VS Code reads recommendations from extensions.json.
○ In the user settings file.
→ User settings are for your own computer. Recommendations live in the project.
○ In the Extensions view.
→ The Extensions view shows recommendations, but it does not store them.
```

```quiz
You want an extension to stay installed, but turned off only for one folder. Which option do you choose?
○ Uninstall
→ Uninstall removes the extension from your computer.
◉ Disable (Workspace)
→ That option turns the extension off only for the folder you have open.
○ Disable
→ Plain Disable turns it off everywhere, not just in one folder.
○ Update
→ Update installs a new version. It does not turn the extension off.
```

---
