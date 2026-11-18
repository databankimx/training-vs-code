# Starting with extensions disabled

Extensions are the most common cause of a problem that appears out of nowhere. You can test for that by starting VS Code with every extension turned off for one session. Your extensions stay installed, and they come back the next time you start normally.

## Starting the test

Close VS Code. Open a terminal, such as PowerShell, in your practice folder, and run:

```text
code --disable-extensions .
```

The `code` command works if VS Code added itself to your PATH during installation. The final `.` opens the current folder. A new window opens with no extensions running.

## Reading the result

- **The problem is gone.** One of your extensions caused it. Turn extensions back on one at a time, using the Extensions view, and reload after each one, until the problem returns. The last one you turned on is the cause.
- **The problem is still there.** It is not an extension. Check the settings you changed, and the logs from the previous lesson.

## Put it back

Close the test window, and open VS Code normally. Your extensions come back as they were. Nothing was uninstalled.

> **This is a test, not a fix.** Once you know which extension is the cause, decide what to do about it, such as updating it, or turning it off for the folder.

---
