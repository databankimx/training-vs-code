# Chapter summary

You can now change a shortcut, read and edit the file behind it, use a chord, write a snippet, and use the editor features that make long files easier to read.

- The Keyboard Shortcuts editor is the friendly view of `keybindings.json`.
- A conflict happens when one key is bound to two commands in the same place.
- A snippet types a block of code from its prefix, and Tab moves between the fill-in places.
- The Markdown preview shows a document as a reader will see it.
- The Output panel shows what VS Code and its extensions have done.

```quiz
What does the `when` part of a keybinding entry control?
○ The time of day the shortcut works.
→ The condition is about where the shortcut works, not when.
◉ The place where the shortcut works, such as the editor.
→ For example, editorTextFocus means the cursor is in a text editor.
○ How many times the shortcut must be pressed.
→ A chord needs two presses. The when part does not count presses.
○ Whether the shortcut is saved to the cloud.
→ Shortcuts are saved in keybindings.json on your computer.
```

```quiz
You press Ctrl+K, and nothing happens after the second key. What is the likely cause?
○ The file has a red underline, so VS Code is broken.
→ A red underline stops a file from loading, but it does not cause this.
◉ The chord is cancelled, because the second key is not part of a chord.
→ That is not an error. Press Escape, and try again.
○ The Output panel is open, so the shortcut is blocked.
→ The Output panel does not block shortcuts. Check the second key instead.
○ The snippet file is open.
→ Snippets do not change how chords work.
```

```quiz
What must a snippet's body hold?
○ One long line with no quotes.
→ Each line of the body is a separate item in a list, inside double quotes.
○ Only the name of the snippet.
→ The name is a label. The body holds the code.
◉ The lines of code, each in double quotes, in a list.
→ That is the body, with the fill-in places marked by ${1:name}.
○ A link to a file on the internet.
→ Snippets hold the code itself, so they work offline.
```

---
