# Edit with multiple cursors

Open `test_calculator.py`, and find the test called `test_total_of_prices_is_seven`. The word "seven" appears in its name and in its expected value, and both of them will need to change later in the story. Rather than hunt for each one, you can use multiple cursors, the tool Chapter 5 covered. It is one of those features you forget about until you need it, and then you wonder how you ever lived without it.

## An example

Put the cursor on the word `seven` in the test name, and press {{Ctrl+D}}. VS Code selects that word and adds a cursor at the next match. The next match may be somewhere else in the file, so press {{Ctrl+D}} again until you reach the other place the word appears. Each press adds one more match.

If you want every match at once, select the word, and press {{Ctrl+Shift+L}}. Every match gets a cursor. Type `six`, and every occurrence changes together.

## Check the result

Read the file after the edit. A name changed in one place and not the other makes the test fail for a reason that has nothing to do with the code, which is the kind of mistake that makes a reviewer sigh. Look for both the name and the expected value in the test, and make sure they agree.

> **Read after every multi-cursor edit.** Multiple cursors change every match, including the ones you did not mean to change.

---
