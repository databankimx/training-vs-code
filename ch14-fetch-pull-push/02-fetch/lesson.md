# Fetching

Fetch downloads the commits your remote has and you do not, and updates your copy of the remote's branches. It does not change your branch or your files.

Run `Git: Fetch` from the Command Palette. If the remote has nothing new, VS Code says so, and nothing changes. If it has new commits, the status bar shows an incoming count, as you will see in the last lesson of this chapter.

Check what came down in the terminal:

```
git fetch
git log --oneline --all -5
```

You can also run Fetch from the More Actions button, the three dots at the top right of the Source Control view. The menu lists the same Git actions as the Command Palette, including Pull, Push, Clone, and Fetch. Its last item, Show Git Output, opens the log you check below.

![Figure 14.1 - The More Actions menu in the Source Control view](images/ch14-source-control-more-menu.png "width=35%")

*Figure 14.1 - The More Actions menu in the Source Control view*

`git fetch` in the terminal does the same as `Git: Fetch`. The log shows the most recent commits on every branch, including the remote's `origin/main`. If your copy of the course repository has not changed on GitHub since Chapter 3, the list shows only your own commits.

The Git output log records every Git command VS Code runs, so you can check what happened even when nothing changed. Open it with Show Git Output from the More Actions menu, or with {{Ctrl+Shift+U}} and the Git channel.

![Figure 14.2 - The Git output log after a fetch](images/ch14-git-output-log.png "width=75%")

*Figure 14.2 - The Git output log after a fetch*

Fetch is safe to run at any time. Because it never changes your folder, it cannot cause conflicts. The remote's version of `main` sits next to your version, and you choose what to do with it.

> **Automatic fetch.** VS Code can fetch in the background. It does not pull or push, so it does not change your branch either.

---
