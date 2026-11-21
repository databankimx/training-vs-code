# The Output panel

The Output panel shows messages from VS Code and its extensions. It is where you look when something happens and you want to know why. Open it from the View menu, or with {{Ctrl+Shift+U}}.

## Channels

The panel has a dropdown on the right, which lists the channels. Each channel is one source of messages. The Git channel shows the Git commands VS Code has run, which you saw in the source control chapters. Other channels belong to extensions, such as the Python one.

![Figure 23.7 - The Output panel](images/ch23-output-panel.png)

*Figure 23.7 - The Output panel with the Git channel selected*

## An example

Open `calculator.py` in a Git repository. Open the Output panel, and choose the Git channel from the dropdown. Each sync or commit you made earlier appears as a line, with the command it ran. If a push failed, the reason is often written here.

## Why look here

When a feature stops working, the Output panel is the first place to check. It tells you whether the problem came from VS Code itself, or from one extension. Chapter 24 shows the next steps when the Output panel does not explain the problem.

> **Read the newest lines first.** The panel keeps a history, and the problem is usually at the bottom.

---
