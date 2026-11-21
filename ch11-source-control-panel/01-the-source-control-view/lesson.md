# The Source Control view

VS Code finds the Git repository in the folder you opened, and it shows the repository's changes in the Source Control view. The view has a branch-shaped icon in the activity bar, or you can press {{Ctrl+Shift+G}}.

Open your practice folder, `training-vs-code-practice`, and then open the Source Control view.

![Figure 11.1 - The Source Control view with changes listed](images/ch11-source-control-view.png "width=50%")

*Figure 11.1 - The Source Control view with changes listed*

The view lists changes in two groups. Each change has a letter beside it:

- **M** means the file was modified.
- **U** means the file is untracked. Git has never seen it, such as a new file you created.

You may see `report.py`, or other changes from earlier homework. Leave them alone for now. The `.venv` folder should not appear, because the repository's `.gitignore` tells Git to ignore it. If `.venv` does appear, tell your course contact, because the ignore rule is missing.

> **Not seeing the view?** If the Source Control view says no source control providers are registered, the folder you opened is not the repository. Open the folder that holds the `.git` folder, which is `training-vs-code-practice`, and try again.
