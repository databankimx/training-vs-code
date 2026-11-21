# Homework: find the bug Copilot explains wrongly

This homework uses a file with a bug in it. Copilot's explanation of the file is wrong. Your job is to find the bug yourself, and fix it, without trusting the explanation.

## Step 1: create the file

In `training-vs-code-practice`, create a file called `average.py`, and type this in. Save it.

```python
def average(numbers):
    total = 0
    for n in numbers[1:]:
        total += n
    return total / len(numbers)
```

## Step 2: ask Copilot to explain it

Select the whole function. In the chat panel, ask `/explain`. Read the explanation. It will likely say the function adds up every number in the list and divides by the count. Write that claim down, because you are going to test it.

## Step 3: check the explanation

Run the function in the terminal, with a list whose average you can work out by hand:

```text
python -c "from average import average; print(average([2, 4, 6]))"
```

The average of 2, 4, and 6 is 4. Compare the result with the explanation. If they disagree, you have found the first sign of the problem.

If Copilot's explanation happens to be right this time, the check still matters. Run the function with a second list, such as `[10, 20, 30, 40]`, and work out the average by hand before you look at the output. A correct explanation is a claim you have now checked, which is all the homework asks for.

## Step 4: find the bug

Look at the loop. Work out which numbers it adds, and which it skips. Write down the bug in one sentence, in your own words.

## Step 5: fix it

Change the loop so it adds every number. Run the check from Step 3 again. The result should now be 4. Then test an empty list, and decide what the function should do with it. An empty list currently raises a division by zero error.

Stage and commit `average.py` with the message `Fix average to include every number`.

~~~spoiler
The bug is in the loop: `numbers[1:]` skips the first number in the list. So `average([2, 4, 6])` adds 4 and 6, and divides by three, which gives 3.33 instead of 4. Copilot's explanation said the function adds every number, which is wrong. That mismatch is the reason this homework exists.

The fix is to loop over every number:

```python
def average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers)
```

An empty list still raises a division by zero error. Decide whether that is what you want, and either document it in a comment or raise a clearer error.
~~~

