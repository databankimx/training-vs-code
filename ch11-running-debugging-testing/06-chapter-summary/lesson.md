# Chapter summary

You can now stop a program on a line, step through it, and read its values, and you can run the practice tests from the Testing view. Keep these in mind:

- {{F9}} toggles a breakpoint, and {{F5}} continues.
- {{F10}} steps over a line, and {{F11}} steps into a function. {{Shift+F11}} steps out.
- The Testing view runs and debugs a single test with its debug icon.
- `launch.json` holds the debug configurations, and it lives in `.vscode`.

```quiz
Which key toggles a breakpoint on the current line?
○ F5
→ F5 continues a paused program. It does not set a breakpoint.
◉ F9
→ F9 toggles a breakpoint on the line with the cursor.
○ F10
→ F10 steps over a line while paused.
○ F11
→ F11 steps into a function while paused.
```

```quiz
You are paused on a line that calls a function, and you want to stop inside that function. Which key do you press?
○ F10
→ F10 runs the line, including the function call, and pauses on the next line.
○ Shift+F11
→ Shift+F11 steps out of the current function. It does not go in.
○ F5
→ F5 continues until the next breakpoint.
◉ F11
→ F11 steps into the function call.
```

```quiz
Where does VS Code keep the debug configurations for a project?
○ In the Testing view
→ The Testing view lists tests. It does not hold configurations.
○ In a file called tasks.json
→ tasks.json holds terminal tasks, from Chapter 8.
◉ In a file called launch.json, inside the .vscode folder
→ That is the file the Run and Debug view reads.
○ In the Debug Console
→ The Debug Console shows output and takes expressions. It stores nothing.
```
