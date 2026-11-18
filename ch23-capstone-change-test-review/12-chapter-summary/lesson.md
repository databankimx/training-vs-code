# Chapter summary

You have now taken one change through the whole workflow: from a clean repository, through a branch, a debugged failure, a tested fix, a commit, a publish, and a pull request. Each step used a skill from an earlier chapter, and each one is a habit you will use again.

- Check the repository is clean before you branch.
- Read the expected and actual values before you decide which one is wrong.
- Fix the test when the test is wrong, and fix the code when the code is wrong.
- Review the diff before you commit.
- Write a pull request description that a reviewer can use.
- Check what an AI tool says against the code and the tests.

```quiz
The test expects 7, and the code returns 6, for the prices 1, 2, and 3. Which is wrong?
○ The code, because the test is always right.
→ A test can be wrong too. Check the arithmetic by hand.
○ Both, so you must rewrite the whole calculator.
→ Only one side is wrong here, and the arithmetic shows which.
○ Neither, because the test runner is always correct.
→ The runner reports the difference. It cannot tell you which side is right.
◉ The test, because 1 plus 2 plus 3 is 6.
→ Fix the test's expected value, and leave the code alone.
```

```quiz
Why review the diff before you commit?
◉ Because a multi-cursor edit can change lines you did not mean to change.
→ Check every changed line before it goes into the history.
○ Because the diff is the commit message.
→ The message is separate. The diff shows the actual changes.
○ Because the diff makes the tests run faster.
→ Reviewing does not change how the tests run.
○ Because VS Code requires a diff before a pull request.
→ The diff is not a requirement. It is a check you make yourself.
```

```quiz
What does publishing a branch do?
○ It merges the branch into main.
→ Merging is a separate step. Publishing copies the branch to GitHub.
○ It deletes the branch from your computer.
→ Publishing does not delete anything. It copies the branch.
◉ It copies the branch to GitHub, so you can open a pull request from it.
→ The copy on GitHub is what the pull request uses.
○ It runs the tests on the branch.
→ Tests run when you run them. Publishing does not run them.
```

---
