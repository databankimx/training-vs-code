# The chat panel

The chat panel is where you ask questions. It opens beside the editor, with a box at the bottom for typing. Open it with {{Ctrl+Alt+I}}.

![Figure 19.2 - The Chat panel](images/ch19-chat-panel.png "width=40%")

*Figure 19.2 - The chat panel open beside the editor*

## A worked example

With `calculator.py` open, type this question in the box:

```text
What does total do?
```

A good answer describes the function in words. It should say what goes in, what comes out, and any special cases, such as an empty input. Read the answer against the code, line by line. If the answer says the function returns the sum of a list, check whether the code really does that.

## Follow-up questions

Chat remembers the conversation, so you can ask a follow-up without repeating the function's name:

```text
What does it return for an empty list?
```

Work out the answer yourself by reading the code, then check it by running the function. Chat's answer is a claim, and you test it the same way you test anything else.

## Where the answer goes wrong

Chat answers sound confident even when they are wrong. A common failure is a description of what the code should do, rather than what it does. If the answer and the code disagree, trust the code you can run, and write down the difference. The difference is the thing to look into.

