# Selecting every match

Often the places you need are the places where a word or a character appears. VS Code can find them for you.

Select a word, then press {{Ctrl+D}}. VS Code selects that word and adds a cursor to the next match in the file. Press it again to add the match after that. Each press adds one more match, so you can stop when you have the ones you need.

To select every match in the file at once, press {{Ctrl+Shift+L}}. Every match gets a cursor, and whatever you type replaces each match at the same time.

The four frames below show one edit from start to finish. The edit changes every `"` in a short list to nothing, so the values become plain numbers.

![Figure 5.1 - The first quote selected, before any other match is added](images/ch05-frame-1-select.png "width=30%")

*Figure 5.1 - The first quote selected, before any other match is added*

![Figure 5.2 - Ctrl+D has added the next match, and there are two selections](images/ch05-frame-2-next-match.png "width=30%")

*Figure 5.2 - Ctrl+D has added the next match, and there are two selections*

![Figure 5.3 - Ctrl+Shift+L has selected every match in the list](images/ch05-frame-3-all-matches.png "width=30%")

*Figure 5.3 - Ctrl+Shift+L has selected every match in the list*

![Figure 5.4 - After pressing Delete, every quote is gone at once](images/ch05-frame-4-deleted.png "width=30%")

*Figure 5.4 - After pressing Delete, every quote is gone at once*

> **Check before you type:** when you select every match, make sure VS Code selected only the matches you want. Selecting a word such as `the` also selects it inside longer words like `there`, unless you turn on the whole-word option in Find.

## Example: renaming a variable in one function

In `calculator.py`, the `total` function uses the name `result` four times. To rename it to `subtotal`, double-click `result` on line 2 so it is selected, then press {{Ctrl+Shift+L}}. All four occurrences are selected at once. Type `subtotal`:

Before:

```python
def total(numbers):
    result = 0
    for n in numbers:
        result = add(result, n)
    return result
```

After:

```python
def total(numbers):
    subtotal = 0
    for n in numbers:
        subtotal = add(subtotal, n)
    return subtotal
```

The `add` function is untouched, because its parameters are named `a` and `b`, not `result`. Had the file used `result` somewhere else, Ctrl+Shift+L would have selected that too, so check the selection before you type.

---
