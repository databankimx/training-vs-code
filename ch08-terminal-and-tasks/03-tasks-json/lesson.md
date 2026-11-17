# Tasks and tasks.json

A task is a command you save with a name, so you can run it from VS Code without typing it again. Tasks are stored in a file called `tasks.json`, in a folder called `.vscode` at the root of your project. VS Code creates the folder when you need it.

Here is a task that runs a Python file. It is one of the simplest possible.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run calculator",
      "type": "shell",
      "command": "python",
      "args": ["calculator.py"]
    }
  ]
}
```

- **label** is the name shown in the task list.
- **type** is `shell`, which runs the command in a terminal.
- **command** and **args** are the command and its arguments, exactly as you would type them.

## Running a task

Choose Terminal, then Run Task, from the menu bar. A list of tasks opens. Choose the one you want, and VS Code runs it in a terminal. You can also press {{Ctrl+Shift+P}}, type `Tasks: Run Task`, and press {{Enter}}.

![Figure 8.2 - The Run Task list showing a task from tasks.json](images/ch08-run-task-menu.png "width=60%")

*Figure 8.2 - The Run Task list showing a task from tasks.json*

## The default build task

A task can be marked as the build task, the one that runs when you press {{Ctrl+Shift+B}}. A build is a command that prepares or checks your code. Marking a task as the default means you can run it with one key.

To mark a task, add a group to it:

```json
"group": { "kind": "build", "isDefault": true }
```

For a test task, use `"kind": "test"` instead. Then the task is listed as the test task, and you can choose it from the same Run Task list.

> **Problem matchers are optional:** a task's output can be matched against patterns, so that each error appears in the Problems panel. The matchers are an extra, and the homework does not need them. Add one later, when you need the errors to appear in the Problems panel.

## Example: a task that runs the tests

A test task runs a test suite and reports the result. For the practice repository, the Python tests run with `python -m unittest`, from the folder that holds the tests. A task for that looks like this:

```json
{
  "label": "Run Python tests",
  "type": "shell",
  "command": "python",
  "args": ["-m", "unittest"],
  "group": { "kind": "test", "isDefault": true }
}
```

Each part of the entry does one job: the command runs the Python test runner, and the group marks the task as the test task.

---
