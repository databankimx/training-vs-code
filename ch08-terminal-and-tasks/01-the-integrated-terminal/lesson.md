# The integrated terminal

Press {{Ctrl+`}} to open the terminal. The key is the backtick, which sits above Tab on most keyboards. The terminal opens in the panel at the bottom of the window. If the panel is already open, the same key moves the cursor into it.

![Figure 8.1 - The terminal panel with two terminals split side by side](images/ch08-terminal-split.png "width=100%")

*Figure 8.1 - The terminal panel with two terminals split side by side*

## Choosing the shell

A terminal runs a shell, the program that reads the commands you type. Windows includes two: Windows PowerShell, which opens from the Start menu, and PowerShell 7, which you installed in Chapter 1. This course uses PowerShell 7 for its examples, so make it the default.

Press {{Ctrl+Shift+P}}, type `Terminal: Select Default Profile`, and press {{Enter}}. Choose PowerShell 7 from the list. Close the terminal and open a new one with {{Ctrl+`}} to check it. The name shown in the terminal's tab should say PowerShell, and the version in the first lines of output should start with 7.

The dropdown beside the + button in the terminal's tab bar also lets you open any of the shells on your computer, one at a time.

## New and split terminals

Press {{Ctrl+Shift+`}} to open a second terminal, with its own shell. Each terminal has its own history and its own working folder. Press {{Ctrl+Shift+5}} to split the current terminal into two side by side. A split is useful when you want to run a command in one and read its output in the other.

## Clearing and closing

To clear the text in a terminal, open the Command Palette and run `Terminal: Clear`. The shell is still running, and the history is kept.

To close a terminal, type `exit` at its prompt and press {{Enter}}, or select the trash icon in the terminal's tab bar. Closing a terminal does not stop VS Code or the other terminals.

## Copy and paste

Select text in the terminal with the mouse. Press {{Ctrl+C}} to copy it when text is selected, and {{Ctrl+V}} to paste at the prompt. With nothing selected, {{Ctrl+C}} does something different: it stops the running command.

Right-click also copies and pastes, and which one it does depends on whether text is selected:

- **Text selected:** right-click copies the selection.
- **Nothing selected:** right-click pastes whatever is on the clipboard at the prompt.

That matters when a program is still running. If you press {{Ctrl+C}} to copy its output while nothing is selected, you stop the program. Right-click copies the output without stopping it, so use it for copying from a running program, and keep {{Ctrl+C}} for stopping one.

> **Stop a command that is running:** press {{Ctrl+C}} with nothing selected. The command stops, and the prompt returns.

## Shell integration

VS Code marks each command you run in the terminal, and shows a small mark in the margin where each one started and ended. The marks let you jump between commands, and they show whether a command succeeded. Hover over a mark to see the command it belongs to.

---
