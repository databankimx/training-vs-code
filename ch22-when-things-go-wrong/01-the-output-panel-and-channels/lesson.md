# The Output panel and its channels

When something fails, start with the Output panel. Open it with {{Ctrl+Shift+U}}, and read the channel dropdown on the right.

## An example

Suppose a push to GitHub fails, and the message in the notification is short. Open the Output panel, and choose the Git channel. Scroll to the bottom. You will see the command that was run and the error it returned. The error often says what to fix, such as an authentication problem or a branch that is behind the remote.

## Choosing the right channel

Each channel belongs to one part of VS Code or one extension. If the problem is in the Git feature, use the Git channel. If the problem is in the Python extension, use the channel with the Python name. If you are not sure, choose the channel that matches the feature you were using when the problem started.

## Reading the output

- Read the newest lines first, at the bottom.
- Look for the word `error` or `failed`, and read the lines just above it, because they often hold the cause.
- Copy the error text when you need help, so the exact words are kept.

> **Errors are clues, not verdicts.** An error message describes what failed. The cause is often one line up.

---
