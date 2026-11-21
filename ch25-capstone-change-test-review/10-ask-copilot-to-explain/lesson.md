# Ask Copilot to explain

Every story needs a helpful stranger, and in this one it is Copilot. Before you close the case, you ask it to explain `total`, then you check its answer against the code and the tests you have just fixed. A good helper tells you what happened. A good detective checks the helper's alibi.

## Ask the question

Open `calculator.py`. Select the `total` function, open the chat panel with {{Ctrl+Alt+I}}, and type `/explain`. Read the explanation.

## Check it

Compare the explanation with the code, line by line. A correct explanation says that `total` adds up each number in the list, starting from zero. Then check it against the test: `total([1, 2, 3])` should return 6, which is the value the corrected test expects. If the explanation says something the code does not do, that is the mismatch to note, and the Chapter 20 approach applies.

## Keep the answer in its place

The explanation is a claim, and the test is the evidence. Your commit already contains the evidence. Do not paste Copilot's explanation into the pull request as proof, because a reviewer needs the test, not the explanation.

> **Explain is not verify.** A good explanation helps you read the code. Only running it, or a test you wrote, shows that it does what you think.

---
