# Creating a pull request

You can open the pull request on the website or from VS Code. Both create the same pull request on GitHub, so pick one.

## On the website

Open your copy of the practice repository on GitHub, `training-vs-code-practice`. Once a branch is published, GitHub shows a banner for it, with a Compare & pull request button. Click it.

![Figure 16.1 - The banner for a recently pushed branch, with the Compare & pull request button](images/ch16-compare-banner.png "width=100%")

*Figure 16.1 - The banner for a recently pushed branch, with the Compare & pull request button*

If the banner is not there, open the Pull requests tab, choose New pull request, and pick `pr-practice` as the compare branch, with `main` as the base.

## In VS Code

Open the GitHub Pull Requests view from the activity bar, and sign in to GitHub if asked. Choose Create Pull Request. VS Code fills in the title from the commit message, and it uses `pr-practice` as the source and `main` as the target.

![Figure 16.2 - The GitHub Pull Request view, with the changes and the review box](images/ch16-vscode-pr-view.png "width=35%")

*Figure 16.2 - The GitHub Pull Request view, with the changes and the review box*

## Either route

The pull request form asks for a title and a description. Keep the title short, such as `Add a line for the pull request`. The description is covered in the next lesson.

Check that the base branch is `main` and the compare branch is `pr-practice`. Then create the pull request.

> **No shared history.** If GitHub says the two branches have no history in common, the branch started from the wrong commit. Create it again from the current `main`, after you have synced, and publish it again.

> **Base and compare.** The base is the branch the change will go into, and the compare branch is the one with the change. Swapping them shows the wrong diff, so check both before you create the request.

---
