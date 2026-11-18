# User snippets

A snippet is a short piece of code that VS Code types for you when you type its prefix. A snippet can hold a whole function, with the places you need to fill in marked for you.

## Opening the snippets file

Press {{Ctrl+Shift+P}}, type `Snippets: Configure User Snippets`, and press {{Enter}}. Choose `python` from the list. VS Code opens a file called `python.json`, which holds the Python snippets you add.

## Reading a snippet

Here is a snippet that types a function with a docstring:

```json
"Function with docstring": {
  "prefix": "fdoc",
  "body": [
    "def ${1:name}(${2:args}):",
    "    \"\"\"${3:Describe the function.}\"\"\"",
    "    ${0:pass}"
  ],
  "description": "A function with a docstring"
}
```

The name in quotes is just a label. The `prefix` is what you type to trigger it. The `body` is the code, one line per item in the list. `${1:name}` is the first place you can type, and Tab moves you to the next one. `${0:pass}` is where the cursor ends up.

## Using it

Create a new Python file, type `fdoc`, and choose the snippet from the suggestion list. Press Enter. The function appears with the cursor on its name, ready for you to type.

> **Snippets live in files.** Like settings, a snippets file is code. Check what you add to it, and keep secrets out of it.

---
