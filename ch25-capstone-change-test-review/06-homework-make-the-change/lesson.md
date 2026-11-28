# Homework: make the change

Here is the twist. The code is fine. Someone wrote the expected value as 7 when the arithmetic says 6, and everyone who walked past the red test assumed the code was the culprit. So the fix lives in the test, not in `calculator.py`. This is the one change in the capstone, and it is homework: you edit a test file, and the worked solution is at the end.

Make the change on the `fix-price-test` branch, so the story stays on its own branch.

## Step 1: fix the expected value

Change the expected value in `test_total_of_prices_is_seven` from 7 to 6.

## Step 2: fix the name

Rename the test to `test_total_of_prices_is_six`. Use the multiple cursors from the earlier lesson, so both occurrences of the word change together. Remove the comment above the test, because it says the test is deliberately wrong, and it no longer is.

## Step 3: run the tests

Open the terminal and run `python -m unittest` again. The output should end with `OK`, and all three tests should pass.

## Step 4: check the change by hand

Before you commit, read the test once more. Work out that 1 plus 2 plus 3 is 6, and check that the expected value matches your arithmetic, not the output of the code. A green test that agrees with the code is not proof on its own, which is the lesson Chapter 20 was built around.

## Step 5: review the diff

Open the Source Control view, and click the test file to see the diff. It should show two changed lines in the test, and nothing else.

~~~spoiler
The corrected test looks like this:

```python
def test_total_of_prices_is_six(self):
    self.assertEqual(total([1, 2, 3]), 6)
```

The diff shows the old name and the old expected value removed, and the new ones added. The comment above the test is gone. `calculator.py` is unchanged, because the code was already correct. If your diff shows a change to `calculator.py`, undo it, because the test is the thing that needed fixing.
~~~

---
