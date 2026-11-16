# Homework: fix the formatting in calculator.py

In VS Code, open `calculator.py` in your practice folder. Make every change there, not in the runner. The file works, but its spacing is not consistent. Here is the starter, exactly as it appears in the file:

```python
"""A small calculator for the VS Code course."""


def add(a,b):
    return a+b


def total(numbers):
    result = 0
    for n in numbers:
        result = add(result, n)
    return result
```

The `add` function has two problems:

- There is no space after the comma in its parameter list, so `add(a,b)` should be `add(a, b)`.
- The expression `a+b` has no spaces around the plus sign, so it should be `a + b`.

Fix both problems by hand, using the keys from this chapter where they help. Save the file when you are done.

Only the spacing should change. The function `total([1, 2, 3])` should still give 6.

> **Format Document:** {{Shift+Alt+F}} tidies a whole file in one step, but it needs a formatter for the language. Python has none built in, so the key does nothing until you install one. Chapter 7 covers extensions and language support. Try the key after that chapter, and compare its result with your hand-made version.

When you have finished, open the solution from the spoiler below. Compare it with your file in VS Code, line by line, before you move on.

~~~spoiler
Here is the worked solution. Only the two spacing lines change.

```python
"""A small calculator for the VS Code course."""


def add(a, b):
    return a + b


def total(numbers):
    result = 0
    for n in numbers:
        result = add(result, n)
    return result
```
~~~
