# Publish the branch

So far, your fix exists only on your computer. A reviewer on the team cannot see it, and GitHub has no idea it is there. Publishing copies the branch to GitHub, so the story can move on to the next chapter, which is the one where other people read it. Chapter 17 covered this step, and it is the same here.

## Publish it

Press {{Ctrl+Shift+P}}, type `Git: Publish Branch...`, and press {{Enter}}. Choose the GitHub account you want, if VS Code asks. The branch name is `fix-price-test`, so it appears on GitHub under that name.

## Check it

In the status bar, the branch name shows that it is now on GitHub, and the sync indicator shows nothing left to send. On GitHub.com, the repository lists the branch in its branch list, and the latest commit carries your message.

## Pushing again later

If you commit more changes, use Sync Changes, or `Git: Push`, to send them. You do not need to publish again, because publishing is only the first push of a new branch.

> **Publish is a copy.** The copy on GitHub is the one the pull request will use. Anything you commit after publishing needs a push before the pull request shows it.

---
