# The launch.json file

The Testing view started its debug session without asking you for anything. Other debug sessions need a configuration, and VS Code keeps those in a file called `launch.json`, inside the `.vscode` folder. Each configuration names a program to run, the way to run it, and any options.

You do not need to change this file in this lesson. The homework next lesson does that.

## Find the file

Press {{Ctrl+Shift+D}} to open the Run and Debug view. If the practice folder has no `launch.json` yet, the view says so and offers a link called `create a launch.json file`. Choose it, and pick Python if VS Code asks. Once the file exists, the view's dropdown lists its configurations, and {{F5}} starts the one that is selected.

![Figure 9.5 - The Run and Debug view with its configuration dropdown](images/ch09-launch-json.png)

*Figure 9.5 - The Run and Debug view with its configuration dropdown*

## What a Python configuration holds

A typical Python configuration looks like this:

```json
{
  "name": "Python: Run tests",
  "type": "debugpy",
  "request": "launch",
  "module": "unittest",
  "args": ["-v"],
  "console": "integratedTerminal"
}
```

- **name** is the label you see in the dropdown.
- **type** tells VS Code which debugger to use. For Python, that is `debugpy`.
- **request** is `launch` when VS Code starts the program. The other value, `attach`, connects to a program that is already running.
- **module** runs a Python module by name, as `python -m` does in the terminal. `unittest` is the test runner.
- **program** runs a file by its path instead. `${file}` means the file that is open in the editor.
- **args** are extra arguments to the program. `-v` makes the test output more detailed.
- **console** chooses where the output appears. `integratedTerminal` puts it in the terminal panel.

Each part of a configuration matches something you did from the terminal in Chapter 8.

> **Settings are code:** `launch.json` is code. Edit it the way you edit any file in the practice repository, and check your changes in the Problems panel before you run them.
