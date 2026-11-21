# Pushing and publishing

Push uploads your local commits to the remote. Your `main` has one commit the remote does not have yet, the README commit from Chapter 11, so pushing it is the first real push of this course.

Run `Git: Push` from the Command Palette, with `main` checked out. The next lesson shows a faster way that combines the commit and the push in one step, and most of the time that is the one you want.

If Git asks you to sign in, sign in to GitHub with the account that owns your copy. VS Code stores the sign-in, so you should not be asked again for later pushes on this computer. Cloning a public repository by URL does not need a sign-in, but pushing always does.

Check the result in the terminal:

```
git status -sb
```

The first line should now read `## main...origin/main` with no ahead count. Your commit is on GitHub.

## Publish Branch

A new branch exists only on your computer until you publish it. If you create a branch and try to push it, VS Code offers to publish the branch, which uploads it and links it to a branch of the same name on the remote. Publishing is the first push for a new branch. You will use it in Chapter 16, when you open a pull request.

> **Push is not undo.** Once a commit is on GitHub, undoing it takes a new commit that reverses it. The Undo Last Commit command from Chapter 12 only works before you push.

---
