# Homework: rename add to plus

In VS Code, open your practice folder, `training-vs-code-practice`. Make every change there, not in the runner. The folder holds two files that use `add`: `calculator.py` and `test_calculator.py`. Rename the function to `plus` in both, and nothing else.

Your `calculator.py` should match the solution from Chapter 4, so its starter looks like this:

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

The first lines of `test_calculator.py` import `add` and call it:

```python
import unittest

from calculator import add, total


class CalculatorTests(unittest.TestCase):
    def test_add_two_numbers(self):
        self.assertEqual(add(2, 3), 5)
```

Use the Search view to change both files at once:

1. Press {{Ctrl+Shift+H}} to open the Replace box in the Search view.
2. Type `add` in the search box, and `plus` in the replace box.
3. Turn on Match Whole Word with {{Alt+W}}, and Match Case with {{Alt+C}}.
4. Open the Files to include box with the three dots, and type `*.py`.
5. Check the results. You should see 4 matches in 2 files: two in `calculator.py` and two in `test_calculator.py`. The name `test_add_two_numbers` should not appear, because `add` is not a whole word there. If the count is different, check that Match Whole Word is on.
6. Choose Replace All in the Search view, and save both files.

When you have finished, open the solution from the spoiler below and compare it with your files, line by line, in VS Code.

~~~spoiler
Here is the worked solution. Only the name of the function changes, in the definition, the calls, and the import.

In `calculator.py`:

```python
"""A small calculator for the VS Code course."""


def plus(a, b):
    return a + b


def total(numbers):
    result = 0
    for n in numbers:
        result = plus(result, n)
    return result
```

In `test_calculator.py`:

```python
import unittest

from calculator import plus, total


class CalculatorTests(unittest.TestCase):
    def test_add_two_numbers(self):
        self.assertEqual(plus(2, 3), 5)

    def test_total_of_a_list(self):
        self.assertEqual(total([1, 2, 3]), 6)

    def test_total_of_prices_is_seven(self):
        # Deliberately wrong. The Testing chapter uses this failure.
        self.assertEqual(total([1, 2, 3]), 7)


if __name__ == "__main__":
    unittest.main()
```

The test name `test_add_two_numbers` stays the same. It names what the test checks, not the function.
~~~
