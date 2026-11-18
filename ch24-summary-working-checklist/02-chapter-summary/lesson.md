# Chapter summary

The checklist covers the whole course. The habits behind it are simple: know what state you are in, check what you change, test before you trust, and review before you share.

- Start from a clean state, and know which branch you are on.
- Test before you trust a result, whether it came from you, from a tool, or from Copilot.
- Commit only what you checked, and write the message for the reader who comes after you.
- Publish and open a pull request so a second person can see the change.

```quiz
Why does the checklist start with checking the branch and the Changes list?
○ Because VS Code cannot open a folder without it.
→ VS Code opens folders either way. The check is about your work, not the editor.
◉ Because leftover changes would end up in your commit without you choosing them.
→ A clean start means every change you commit is one you decided on.
○ Because the branch name is used for the tests.
→ The tests do not depend on the branch name.
○ Because the Changes list must always show at least one change.
→ An empty Changes list is the clean state you want.
```

```quiz
A test fails after an edit. What is the right order of steps?
○ Commit the change, then fix the failure later.
→ Commit only what you have checked. A failing test is not checked yet.
○ Delete the test, so the run passes.
→ Deleting a test hides the problem. Read the expected and actual values instead.
◉ Read the expected and actual values, debug with a breakpoint, then fix the cause.
→ Work out which side is wrong, then change that side, and run the tests again.
○ Ask Copilot to make the test pass.
→ Copilot's answer is a claim. The test still has to pass for the right reason.
```

```quiz
What does Copilot's explanation give you in a review?
○ Proof that the code is correct.
→ An explanation is a claim. It needs checking.
○ A replacement for the reviewer.
→ A reviewer still checks the change. Copilot does not replace that step.
○ A commit message for the change.
→ Write the commit message yourself, for the reader who comes after you.
◉ A starting point to read the code, which you check against the code and the tests.
→ Use it to understand the code, then verify it.
```

---
