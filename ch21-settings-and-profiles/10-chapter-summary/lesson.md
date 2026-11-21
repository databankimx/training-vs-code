# Chapter summary

You can now find a setting by its purpose, change it at the right scope, read and edit the file behind it, keep a profile for a kind of work, and think before you sync.

- User settings apply everywhere. Workspace settings apply to one folder.
- Changed settings are stored in `settings.json`. A file with an error may not load at all.
- Search by purpose when you do not know a setting's name.
- Auto save writes your changes to disk after a short pause, which lowers the risk of losing unsaved work. It still saves half-finished code.
- Format on save runs the formatter each time you save.
- Think before you turn on Settings Sync.

```quiz
Which kind of settings apply to one folder only?
○ User settings
→ User settings apply to every project you open on your computer.
◉ Workspace settings
→ Workspace settings are saved in that folder's .vscode directory.
○ Profile settings
→ Profiles group your tools. They are not a folder scope.
○ Default settings
→ Defaults are the values VS Code ships with. You cannot scope them to one folder.
```

```quiz
What happens when settings.json has a syntax error?
○ VS Code repairs the file and keeps every entry.
→ VS Code does not repair the file. You fix it yourself.
○ The error is ignored, and the other entries still take effect.
→ A file that does not load can leave all of its settings without effect.
◉ The file may not load, so its settings do not take effect.
→ That is why you check for red underlines after every edit.
○ The setting moves to the Workspace tab.
→ Errors do not move settings anywhere.
```

```quiz
You are about to turn on Settings Sync. What should you check first?
◉ What it will copy, and whether your team's rules allow that account.
→ Sync copies settings to an account outside your computer, so check both.
○ Whether the font is installed on the computer.
→ Fonts are not what Settings Sync is about.
○ Whether the terminal is open.
→ The terminal has nothing to do with syncing.
○ Nothing. Sync is always safe.
→ Settings can hold paths, names, and sometimes secrets, so check before you sync.
```

---
