# Comments, deleting lines, and word wrap

## Commenting out code

{{Ctrl+/}} comments out the line the cursor is on, or every line in the selection. Press it again on a commented line to remove the comment. VS Code uses the comment marker for the language of the file, so in a Python file it adds a # at the start of each line.

Commenting out is useful when you want to keep a line for later, or to see what happens without it. Remove the comment once you are finished, so the code does not stay hidden.

## Deleting a line

{{Ctrl+Shift+K}} deletes the whole line the cursor is on. You do not need to select the line first, which makes it quicker than selecting and pressing Delete.

## Word wrap

Long lines run off the right side of the window by default. {{Alt+Z}} turns on word wrap, so each line breaks to fit the window. Press it again to turn wrapping off.

Word wrap changes only how the text is shown. The file itself is not changed, so the line breaks you see are not saved into it.

## Example: commenting out a function

Select the two lines of the `add` function in `calculator.py`, from `def add(a,b):` to `return a+b`, then press {{Ctrl+/}}:

```python
# def add(a,b):
#     return a+b
```

The `#` marks each line as a comment, so Python skips them. Press {{Ctrl+/}} again on the same lines, with them still selected, and the comments come off.

## Example: deleting a line you do not need

With the cursor anywhere on a line, press {{Ctrl+Shift+K}}. For example, if the cursor is on a blank line between two functions, the whole blank line disappears. You do not need to select it first.

## Example: wrapping a long line

A long string, such as this one, runs off the right side of the window:

```python
message = "This sentence is long enough that it keeps going past the edge of the window, so you would need to scroll sideways to read it."
```

Press {{Alt+Z}}, and the line breaks to fit the window, as the text below shows. The file still holds one line, so the breaks are only on screen:

```python
message = "This sentence is long enough that it keeps going past the edge
of the window, so you would need to scroll sideways to read it."
```

---
