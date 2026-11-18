# Changing a binding

A binding is the link between a shortcut and a command. You can change a binding in the Keyboard Shortcuts editor without touching any file.

## An example

Suppose you want to duplicate the current line with a key that is easy to reach. Search the editor for `duplicate selection`. Find `Duplicate Selection` in the Editor group. Its default shortcut is {{Shift+Alt+Down}}.

To give it a new key, double-click the row. A box opens and asks you to press the keys. Press {{Ctrl+Alt+D}}, then press {{Enter}}. The editor now shows the new shortcut in the row, and the change applies at once.

Try it in `calculator.py`. Put the cursor on a line, press {{Ctrl+Alt+D}}, and a copy of the line appears below it.

## Putting it back

Double-click the row again, and press {{Esc}} to cancel, or right-click the row and choose Reset Keybinding to restore the default. Keep the default if you are not sure, because a shortcut you change can clash with one a teammate depends on.

> **A new key can clash.** The editor warns you if the key already belongs to another command. Read the warning before you press Enter.

---
