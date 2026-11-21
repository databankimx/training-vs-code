# Homework: a tasks.json entry for the practice tests

In VS Code, open your practice folder, `training-vs-code-practice`. Make every change there, not in the runner.

Create a file called `tasks.json` in the `.vscode` folder of the practice folder. The folder already exists, because it holds `extensions.json`, so you only need to add the new file beside it. Write one task in it, with these properties:

- **label:** `Run Python tests`
- **type:** `shell`
- **command:** `python`
- **args:** the two values `-m` and `unittest`, in that order
- **group:** a test group, marked as the default

Save the file. Then run the task in one of two ways: choose Terminal, then Run Task, and pick the task; or press {{Ctrl+Shift+P}}, type `Tasks: Run Test Task`, and press {{Enter}}.

The task should run three tests, and one of them fails. That is expected. The test `test_total_of_prices_is_seven` is written to fail, so the output ends with a line that says `FAILED`, followed by a count of the failures. Read that line, and find the failing test in the output. Your task is working when it runs the tests and reports the result. It does not need every test to pass.

When you have finished, open the solution from the spoiler below and compare your file with it, line by line, in VS Code.

~~~spoiler
Here is the worked solution. The file is `.vscode/tasks.json`, and it holds one task.

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Run Python tests",
      "type": "shell",
      "command": "python",
      "args": ["-m", "unittest"],
      "group": { "kind": "test", "isDefault": true }
    }
  ]
}
```
~~~
