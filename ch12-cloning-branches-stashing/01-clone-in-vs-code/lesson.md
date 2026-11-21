# Cloning in VS Code

Cloning copies a repository, with its full history, to your computer. VS Code gives you three ways to start a clone, and they all end in the same place. Pick whichever is closest to where you are.

## Three ways to start

**From the welcome page.** When VS Code opens with no folder open, the welcome page shows a Start list. Click Clone Git Repository.

![Figure 12.1 - The welcome page with Clone Git Repository in the Start list](images/ch12-welcome-clone.png "width=50%")

*Figure 12.1 - The welcome page with Clone Git Repository in the Start list*

**From the Source Control view.** When no folder is open, the Source Control view shows a Clone Repository button. Click it.

![Figure 12.2 - The Source Control view with the Clone Repository button](images/ch12-source-control-clone-button.png "width=50%")

*Figure 12.2 - The Source Control view with the Clone Repository button*

**From the Command Palette.** Press {{Ctrl+Shift+P}}, type `Git: Clone`, and press Enter. This works at any time, even when a folder is already open. The two buttons above are quicker when they are on screen.

The More Actions menu in the Source Control view, the three dots at the top right, also lists Clone. Use it when the view is already open and you want the menu's other Git actions next to it.

![Figure 12.3 - The More Actions menu in the Source Control view](images/ch12-source-control-more-menu.png "width=35%")

*Figure 12.3 - The More Actions menu in the Source Control view*

## Choose a source

Whichever way you start, VS Code asks where the repository is. You can paste a URL into the box. You can also choose Clone from GitHub, which lists the repositories your GitHub account can reach, including the ones in every GitHub organization you belong to.

![Figure 12.4 - The clone box, with Clone from GitHub as a source](images/ch12-clone-from-github-prompt.png "width=75%")

*Figure 12.4 - The clone box, with Clone from GitHub as a source*

Type the name of a repository to filter the list. Each entry shows the owner, the name, and the URL, so you can tell apart two repositories with similar names.

![Figure 12.5 - The list of repositories from Clone from GitHub](images/ch12-clone-from-github-repos.png "width=75%")

*Figure 12.5 - The list of repositories from Clone from GitHub*

For this chapter, paste your copy's address, which is the one you used in Chapter 3:

```
https://github.com/YOUR-USERNAME/training-practice.git
```

Replace `YOUR-USERNAME` with your GitHub user name. If you choose Clone from GitHub instead, pick your copy from the list.

## Choose a folder

VS Code asks where to put the new folder. Choose `C:\Development\training`, and name the folder `branches-practice`, so the clone lands in `C:\Development\training\branches-practice`.

When the clone finishes, VS Code offers to open the new folder. Choose Open. If VS Code asks you to sign in to GitHub, sign in with the account that owns your copy.

Check the result in the terminal, in the new folder:

```
git log --oneline -3
```

The top commit should be the one from Chapter 3, or the first commit of your copy. It should not show the README commit from Chapter 11, because that commit was never pushed.

> **Clone is not copy.** The clone is a separate repository with its own history. Changes you make in `branches-practice` do not appear in `training-practice`, and the other way round.

---
