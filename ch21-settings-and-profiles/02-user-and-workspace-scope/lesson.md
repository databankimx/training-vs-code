# User and workspace scope

Settings apply at two levels:

- **User settings** apply to every project you open on your computer.
- **Workspace settings** apply only to the folder you have open, and they are saved in that folder's `.vscode` directory, as `settings.json`.

The Settings editor has two tabs at the top, User and Workspace. Check which one you are on before you change anything.

![Figure 21.2 - The User and Workspace tabs](images/ch21-settings-scope-tabs.png)

*Figure 21.2 - The User and Workspace tabs at the top of the Settings editor*

## An example

Suppose your team's style guide asks for a line at column 79, so long lines are easy to spot. You want that rule in the practice repository, but not in every project on your computer. Set it on the Workspace tab. The rule now applies only to that folder. In any other folder, the setting is absent, so the line does not appear.

When both levels set the same thing, the workspace setting wins in that folder. This is why a shared project can change how your editor looks in it, and why a rule you set once in your user settings can be overridden by a project.

VS Code applies workspace settings from a folder only when you trust that folder. Chapter 23 covers trust.

> **Check the scope first.** A change on the User tab affects everything you open. Make sure you are on the tab you mean.

---
