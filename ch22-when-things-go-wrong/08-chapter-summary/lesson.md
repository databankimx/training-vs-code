# Chapter summary

When something goes wrong, you now have an order of checks: read the Output panel, check the logs, reload, test without extensions, reset a setting, look for a conflict, and check trust.

- The Output panel shows what each feature reported. Read the newest lines first.
- The logs show what VS Code itself was doing.
- `code --disable-extensions .` tests whether an extension is the cause.
- A changed setting can be reset in the editor or in the file.
- A shortcut that does the wrong thing is usually a conflict.
- Restricted Mode protects you until you trust a folder.

```quiz
A feature stopped working after you installed an extension. What is the best first test?
○ Delete the whole profile.
→ That throws away your settings too. Test first, then decide.
◉ Start VS Code with extensions disabled, and see whether the problem goes away.
→ If it does, one of your extensions is the cause.
○ Reinstall VS Code.
→ Reinstalling is a large step. The test tells you whether it is needed.
○ Change the font size.
→ A font size has nothing to do with a feature that stopped working.
```

```quiz
What does Restricted Mode do?
◉ It limits features such as tasks, debugging, and workspace settings until you trust the folder.
→ Trust is your decision, and you can change it with Workspaces: Manage Workspace Trust.
○ It deletes the files in the folder.
→ Restricted Mode does not change or delete your files.
○ It stops you from opening the folder at all.
→ The folder still opens, and you can read and edit the files.
○ It turns on every extension in the folder.
→ Restricted Mode does the opposite. It holds back what the folder could run.
```

```quiz
A key you use every day now opens a different panel. What is the first thing to check?
○ Whether the file has a red underline.
→ A red underline is about a settings or JSON file, not a key press.
○ Whether the window needs a reboot of your computer.
→ A reboot is not needed for a shortcut conflict.
○ Whether the snippet file has been saved.
→ Snippets do not bind keys to panels.
◉ Which commands are bound to that key, in the Keyboard Shortcuts editor.
→ Search the key there, and read the When column to see which command wins.
```

---
