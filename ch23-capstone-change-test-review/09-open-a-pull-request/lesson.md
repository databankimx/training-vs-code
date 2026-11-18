# Open a pull request

This is the bit of the story where you hand the fix to someone else. A pull request asks for your change to be merged into `main`, and it is where the change is reviewed, checked, and discussed before it lands. Chapter 15 covered pull requests in full, and the steps here follow the same path. The difference is that you now have something to explain, and the description is how you explain it.

## Open it

Go to your repository on GitHub.com. A banner near the top offers to compare and open a pull request for `fix-price-test`. Select it. You can also open the pull request from VS Code, if the GitHub Pull Requests view is available in your build. Either way, the pull request compares `fix-price-test` with `main`.

![Figure 23.1 - The pull request view](images/ch23-pull-request-view.png "width=40%")

*Figure 23.1 - The pull request open in VS Code, with its title and description*

## Write the description

Use a short title that matches the commit message. In the description, say what changed and why, in two or three sentences:

```text
The test expected 7 for the prices 1, 2, and 3. The correct total is 6, and calculator.py already returns 6. This change fixes the expected value and renames the test to match.
```

A reviewer should be able to read the description and know what to check, without opening the code first. Think of it as the one paragraph the reviewer reads before deciding how much attention the rest deserves.

## Check the result

The pull request shows the changed files, and the checks that ran on it. If there are no checks, that is fine for the practice repository, because there is no pipeline yet. The Files changed tab shows the same two-line change you reviewed in the homework.

> **In your own practice repository, you can merge your own pull request.** At work, a pull request needs a reviewer's approval before it can merge into `main`. That is how the policy works, and this practice step does not change it.

---
