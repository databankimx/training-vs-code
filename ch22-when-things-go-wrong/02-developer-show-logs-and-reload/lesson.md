# Developer: Show Logs and Reload Window

When the Output panel does not explain a problem, look at the logs. They record what VS Code itself was doing, including startup, extension loading, and errors that never reached a channel.

## Show the logs

Press {{Ctrl+Shift+P}}, type `Developer: Show Logs`, and press {{Enter}}. A list of log types appears. The list depends on your build, but it usually includes a main log, an extension host log, and one for the renderer, which is the part that draws the window. Open the one that matches the problem. For a feature that does not load, the extension host log is usually the one to check.

## Reload the window

Some problems clear when the window restarts, such as an extension that stopped responding. Press {{Ctrl+Shift+P}}, type `Developer: Reload Window`, and press {{Enter}}.

Reloading does not close your files or lose your work. Save everything first, so you know your latest changes are on disk.

## When to reload

Reload when a feature stops responding, when a setting you changed has not taken effect, or after an extension update. If the problem comes back after a reload, the reload was not the fix, and the logs are the next place to look.

> **Save before you reload.** A reload is safe, but an unsaved file is still an unsaved file. Use {{Ctrl+K}} then {{S}} to save all files, or save each one with {{Ctrl+S}}.

---
