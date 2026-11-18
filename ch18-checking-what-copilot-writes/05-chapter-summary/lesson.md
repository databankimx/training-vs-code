# Chapter summary

You own the code you commit, whoever typed it. Copilot's explanations and tests can be wrong, so check them against code you have run.

- Read, run, test, and then keep. Each step catches a different kind of error.
- A test that Copilot wrote can agree with a bug, so write at least one check yourself.
- Your team's review process still applies to every change.

```quiz
Why is code that looks right the most dangerous kind of suggestion?
○ Because it is always slower than wrong code.
→ Speed is not the risk. Nobody checks code that looks right.
○ Because the review process forbids it.
→ The review process still applies. The risk is that a reviewer might not catch it.
◉ Because nobody thinks to check it, so an error can get committed.
→ Plausible code gets through when no one tests it.
○ Because Copilot only writes code that is wrong.
→ Copilot is often right. The risk is in the wrong parts that look right.
```

```quiz
What is the purpose of running a function with an input you chose yourself?
○ It proves the function is perfect.
→ One input proves very little. It checks only that input.
◉ It shows whether the result matches a value you worked out by hand.
→ A value you worked out by hand is an independent check.
○ It makes Copilot write a better explanation.
→ Running the function does not change Copilot's explanation.
○ It replaces the team's review.
→ Running code is a check. It does not replace review.
```

```quiz
A Copilot explanation says a function does one thing, but the code does another. What should you do?
○ Trust the explanation, because Copilot wrote the code.
→ The explanation is a claim to check, not a fact.
○ Delete the function.
→ Deleting it avoids the question. Check what it does first.
○ Ask Copilot again until it agrees.
→ Asking again can produce a different wrong answer.
◉ Check the code by running it with an input you can verify, and fix it if it is wrong.
→ Test the claim against the code. Copilot's explanation is not evidence.
```

---
