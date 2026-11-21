# Run the tests in the terminal

Before you trust the red test, you want to see it for yourself. Run the tests from the terminal, so you see exactly what the test runner reports, without any help from VS Code's windows. Think of it as asking the test directly what went wrong, rather than asking the person who reported it.

Open the terminal with {{Ctrl+`}}, and check that it is in your practice folder, the folder that holds `calculator.py`. Then run the tests:

```text
python -m unittest
```

## Reading the output

The output lists each test, then a summary. A passing test prints a dot. A failing test prints an `F`, and the output shows the expected value and the actual value side by side.

For the practice tests, you will see one failure, in `test_total_of_prices_is_seven`. The message says the test expected 7, but the code returned 6. That message is the most useful line in the whole output, because it tells you what the test wanted and what the code produced.

The last line reads `FAILED (failures=1)`. With all tests passing, it reads `OK`.

## Why the terminal first

The terminal shows you the runner's own words, with nothing in between. Chapter 11 introduced the Testing view, and the next lesson uses it too, but a plain run first makes the evidence clear.

> **Read the expected and the actual values.** The question to ask is which of the two is wrong, the test or the code. Work it out before you change either one.

---
