# Shortcut conflicts

A shortcut that suddenly does something else is almost always a conflict. Two commands are bound to the same key, and the one that wins depends on where the cursor is.

## An example

Suppose a key that used to open the terminal now does nothing, or opens a different panel. Open the Keyboard Shortcuts editor with {{Ctrl+K Ctrl+S}}, and type the key into the search box, such as `ctrl+``. Every command bound to that key appears. Look at the When column for each one, because the condition decides which command runs in a given place.

## Fixing it

You have two choices. Reset the shortcut you changed, using the right-click menu on its row, so the default returns. Or give the command you want a different key, as the earlier lessons showed.

## Watch for a chord

A key that starts a chord, such as Ctrl+K, can seem to do nothing when it is waiting for its second press. If a key looks dead, press {{Esc}} to cancel any chord in progress, and try again.

> **Find the owner first.** Before you change a binding, find out which command owns the key now, so you know what you are replacing.

---
