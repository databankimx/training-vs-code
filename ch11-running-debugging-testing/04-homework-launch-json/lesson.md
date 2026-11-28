# Homework: a launch configuration for the practice tests

In VS Code, open your practice folder, `training-vs-code-practice`. Make every change there, not in the runner.

Create a file called `launch.json` in the `.vscode` folder, beside `tasks.json` and `extensions.json`. Use the Run and Debug view, as the last lesson showed, or create the file by hand. Write one configuration in it, with these properties:

- **name:** `Python: Run tests`
- **type:** `debugpy`
- **request:** `launch`
- **module:** `unittest`
- **args:** the one value `-v`
- **console:** `integratedTerminal`

Save the file. Then open `calculator.py`, and set a breakpoint on a line inside `total`. In the Run and Debug view, make sure `Python: Run tests` is selected, and press {{F5}}.

The debugger should pause at your breakpoint, while the tests run. Step over one line with {{F10}}, and read the values in the Variables panel. Then press {{Shift+F5}} to stop the session. Stopping early is fine. The goal is a configuration that starts the tests under the debugger, and pauses where you asked.

When you have finished, open the solution from the spoiler below and compare your file with it, line by line, in VS Code.

~~~spoiler
Here is the worked solution. The file is `.vscode/launch.json`, and it holds one configuration.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Python: Run tests",
      "type": "debugpy",
      "request": "launch",
      "module": "unittest",
      "args": ["-v"],
      "console": "integratedTerminal"
    }
  ]
}
```

The `version` property is the format version of the file. VS Code writes `0.2.0` for every launch file.
~~~
