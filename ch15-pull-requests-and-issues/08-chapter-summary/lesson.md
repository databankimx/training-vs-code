# Chapter summary

You can now take a branch through a pull request: publish it, open the request, describe it, leave review comments, merge it, and link an issue.

- A pull request is a request to merge a published branch into another branch.
- You can create a pull request on the website or in the GitHub Pull Requests view.
- GitHub does not let you approve your own pull request, so you leave a comment review in the practice repository.
- Checks show whether automated tests pass, and a failing check should be fixed before merging.
- Merging brings the pull request's commits into the base branch, and Sync Changes brings them to your computer.
- `Closes #` with an issue number in the pull request description closes the issue when the pull request merges.

```quiz
Why does the practice repository skip the codeowner approval that work repositories require?
○ Because the practice repository has no pull requests.
→ The practice repository does have pull requests. It just doesn't require approval.
○ Because Git does not check approvals.
→ Git itself does not check approvals. GitHub does, through its repository rules.
◉ Because it is in your own GitHub account, so you control its rules.
→ The practice repository is yours, so you can merge your own change.
○ Because pull requests are not used at work.
→ At work, pull requests are required. The practice repository just does not enforce the approval.
```

```quiz
You want to leave a comment on a line in a pull request. Which review type should you choose?
◉ Comment
→ Comment leaves feedback without approving or blocking the merge.
○ Approve
→ GitHub does not let you approve your own pull request.
○ Request changes
→ Requesting changes is for reviewers, not the author.
○ Merge
→ Merge is a separate action. It does not leave a comment.
```

```quiz
Where should you write Closes #1 so that issue #1 closes when the pull request merges?
○ In the commit message.
→ GitHub reads the link from the pull request description, not the commit message.
○ In the branch name.
→ Branch names do not link issues.
○ In a comment on the issue.
→ A comment on the issue does not close it. Put the link in the pull request description.
◉ In the pull request description.
→ GitHub reads Closes #1 in the description and closes the issue when the pull request merges.
```

---
