# Ask, Edit, and Agent modes

The chat panel has a mode selector. Each mode gives Copilot a different amount of say over your files. Choosing a mode is a safety decision, not just a preference.

## Ask

Ask answers questions and changes nothing.

Example task: "What does `total` return for an empty list?" Ask answers, and your files stay the same. This is the mode for understanding code.

## Edit

Edit proposes changes to the files you name. You review each change before it is applied.

Example task: "Add a docstring to `total`." Edit shows the new docstring as a proposed change. Accept it only after you have read it, and checked that it describes what the function actually does.

## Agent

Agent takes a larger task. It plans several steps, changes files more than once, and can run commands, which you approve before they run.

Example task: "Add a `subtract` function to `calculator.py`, with tests." Agent may change two files and run the tests. Read each step it takes. If it runs a command you do not understand, stop, and ask what it does before you approve it.

## Which mode to start with

For this course, start every question in Ask. Move to Edit when you can review each change. Use Agent only for a task you have planned yourself, so you know what a correct result looks like.

