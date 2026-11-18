# Find and Replace

Press {{Ctrl+F}} to open the Find box in the file you have open. Type the text you want, and VS Code highlights every match and shows how many there are. Press {{Enter}} to move to the next match, and {{Shift+Enter}} to move back. Press {{Esc}} to close the box.

Press {{Ctrl+H}} to open Replace, which has a second box under the first. Type the new text there. {{Enter}} replaces the current match and moves to the next one. To replace every match in the file at once, press {{Ctrl+Alt+Enter}}.

Three toggles sit at the right of the Find box. They change what counts as a match:

- **Match Case** ({{Alt+C}}): only matches the capital letters you typed.
- **Match Whole Word** ({{Alt+W}}): only matches the word on its own. Searching for `add` will then skip `address`.
- **Use Regular Expression** ({{Alt+R}}): reads the search as a pattern rather than plain text. The next section explains why that matters.

![Figure 6.1 - The Find box with the regular expression toggle turned on](images/ch06-find-regex.png "width=50%")

*Figure 6.1 - The Find box with the regular expression toggle turned on*

## Why whole word matters

Without Match Whole Word, the search for `add` also matches the `add` inside a longer name, such as `add_tax` or `address`. Replacing those by accident is a common mistake, and the change is easy to miss when the file is long. Turn the option on whenever you are replacing a name.

## Regular expressions

A regular expression is a pattern. The pattern `\d+` means one or more digits, so it matches `12`, `8`, and `300`, but not the letters around them. Turn on {{Alt+R}} and search for `\d+` in a file that holds prices, and each number is found in turn.

You do not need to learn regular expressions to use this course. Keep the toggle off unless you need a pattern, and when you do need one, check each match before you replace.

> **Check before you replace all:** {{Ctrl+Alt+Enter}} changes every match in the file at once. If the result is wrong, press {{Ctrl+Z}} to undo it, then check your options before you try again.

## Example: finding every use of a name

In `calculator.py`, press {{Ctrl+F}} and type `result`. The Find box shows how many matches there are, and each one is highlighted in the file. Press {{Enter}} to step through them.

Now turn on {{Alt+W}}. The count stays the same, because `result` is the whole word everywhere it appears. Search for `res` instead, and the count changes to zero when Match Whole Word is on, because `res` is never a whole word on its own. That is the difference the toggle makes.

---
