# Workspace trust

When you open a folder, VS Code asks whether you trust the people who wrote the files in it. The question matters because a folder can contain settings, tasks, and extensions that run code on your computer.

## What Restricted Mode does

If you do not trust a folder, VS Code opens it in Restricted Mode. Some features are off: workspace settings are ignored, tasks and debugging may not run, and some extensions are limited. The files still open and you can read and edit them.

## An example

You download a sample project from someone else, and open it. A `.vscode/tasks.json` in the folder could run a command when you press a shortcut. Restricted Mode stops that until you decide. You can look at the files first, and trust the folder only if you know where it came from.

## A folder you made

The practice repository you created in your own GitHub account is yours. Trust it, and the tasks and debugging in the course will work. If a task or the debugger does nothing, and the window shows a Restricted Mode notice, that is the cause.

## Changing trust

Press {{Ctrl+Shift+P}}, type `Workspaces: Manage Workspace Trust`, and choose the folder. You can trust it there, or remove trust if you change your mind.

> **Trust is a decision.** Trust a folder when you know what is in it. When you are not sure, leave it restricted, read the files, and ask.

---
