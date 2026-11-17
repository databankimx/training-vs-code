# Chapter summary

The terminal runs commands inside VS Code, and a task saves a command so you can run it again with one step. Keep these in mind:

- {{Ctrl+`}} opens the terminal. Make PowerShell 7 the default with Terminal: Select Default Profile.
- {{Ctrl+C}} copies a selection in the terminal. With nothing selected, it stops the running command.
- Tasks are stored in `.vscode/tasks.json`. Run them from Terminal, then Run Task, and the default build or test task runs with {{Ctrl+Shift+B}}.
- Run `setup.ps1` with `.\setup.ps1` from the course folder. If PowerShell refuses, check the execution policy.

```quiz
Which key copies selected text in the terminal?
○ Ctrl+V
→ Ctrl+V pastes text into the terminal.
◉ Ctrl+C
→ With text selected, Ctrl+C copies it. With nothing selected, it stops the running command.
○ Ctrl+Shift+`
→ Ctrl+Shift+` opens a new terminal.
```

```quiz
Where is a task saved?
○ In the Terminal menu
→ The Terminal menu lists tasks, but it does not store them.
○ In a file called tasks.txt in the project folder
→ Tasks are stored in a JSON file, not a text file.
◉ In .vscode/tasks.json, inside the project folder
→ VS Code reads tasks from this file, and creates it when you need one.
```

```quiz
What does the execution policy control?
◉ Whether PowerShell runs scripts such as setup.ps1
→ That is its job. The default blocks scripts, so the course's script needs the policy changed or allowed.
○ Which shell the terminal opens
→ The default profile controls that, not the execution policy.
○ How much text the terminal keeps
→ The terminal's scrollback controls that, not the execution policy.
```
