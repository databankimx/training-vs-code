# Homework: remove the quotes from prices.py

In VS Code, open `prices.py` in your practice folder. Make every change there, not in the runner. Here is the starter, exactly as it appears in the file:

```python
prices = [
    "12.50",
    "8.00",
    "3.75",
    "20.00",
]
```

Each price is written as text, inside quotes. Python would read them as strings, which cannot be added up. You want them as plain numbers.

Use the keys from this chapter to remove every pair of quotes in one edit:

1. Click on the first `"` in the list, and select that one character with {{Shift+Right}}.
2. Press {{Ctrl+Shift+L}} to select every matching `"` in the file.
3. Press {{Delete}}.

Check the result. Each price should now be a plain number, such as `12.50`, with no quotes around it. Save the file.

If Ctrl+Shift+L selects more than the quotes, press {{Ctrl+Z}}, and try again, with the selection made more carefully.

When you have finished, compare your file in VS Code with the solution in the spoiler below.

~~~spoiler
Here is the worked solution. Only the quotes change.

```python
prices = [
    12.50,
    8.00,
    3.75,
    20.00,
]
```
~~~
