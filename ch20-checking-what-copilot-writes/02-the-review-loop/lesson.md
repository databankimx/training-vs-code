# The review loop

Use the same loop for every suggestion, from the smallest to the largest. This lesson walks through it on the leap-year example from the last lesson.

```mermaid
flowchart LR
  A["Copilot suggests"] --> B["Read it"]
  B --> C["Run it"]
  C --> D["Test it"]
  D --> E{Does it do what you intended?}
  E -->|no| F["Reject it, or fix it by hand"]
  E -->|yes| G["Keep it, and commit with review"]
```

## Step 1: read it

Read `return year % 4 == 0`, and ask what the line claims. It says a year is a leap year when it is divisible by 4. Does that match what you know? Partly. Leap years are divisible by 4, but not every year divisible by 4 is a leap year.

## Step 2: run it

Run the function with years whose answers you know:

```python
print(is_leap_year(2024))
print(is_leap_year(1900))
print(is_leap_year(2000))
```

The expected output is True, False, and True. The function prints True for 1900, which is the first sign of the bug.

## Step 3: test it

Write a check yourself, using years you chose, not years Copilot chose:

```python
assert is_leap_year(1900) is False
assert is_leap_year(2000) is True
```

Run it. The first assert fails. A failing test that points at a real bug is the result you want, because it tells you exactly what to fix.

## Step 4: decide

Fix the function by hand:

```python
def is_leap_year(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0
```

Run the checks again, and they pass. Keep the fix and the tests together in the commit, so the next reviewer can see what was checked.

## A claim can be wrong too

Copilot also explains code, and an explanation is a claim you can check. Here is a chat exchange about the `total` function in `prices.py`:

![Figure 20.1 - Copilot says total(prices) returns 44.25, which is the right sum, but the code in the editor does not do that](images/ch20-wrong-claim.png)

*Figure 20.1 - Copilot says total(prices) returns 44.25, which is the right sum, but the code in the editor does not do that*

The function is:

```python
def total(price_list):
    total_price = 0.0
    for price in price_list:
        total_price = float(price)
    return total_price
```

Copilot's answer sounds right, and the sum is right: 12.50 + 8.00 + 3.75 + 20.00 is 44.25. Do not stop there. Run the function on the same list:

```python
print(total(["12.50", "8.00", "3.75", "20.00"]))
```

The output is `20.0`, not `44.25`. The loop itself is fine. The bug is on line 19: `total_price = float(price)` replaces the total on every pass, instead of adding to it, so the function keeps only the last price. The fix is `total_price += float(price)`.

The claim was wrong, and the code was the thing to trust. Check every explanation the same way you check a suggestion.

> **Test with your own examples.** A test Copilot wrote can agree with the suggestion. Write at least one check yourself.

