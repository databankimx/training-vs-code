# Searching across files

Find works on the file you have open. To search the whole folder, press {{Ctrl+Shift+F}}. The Search view opens in the side bar, and it lists every match, grouped by file.

Type the text in the search box and press {{Enter}}. Each file with a match is shown with its name, and the matching lines appear beneath it. Select a line to open that file at the match.

![Figure 6.2 - Search results grouped by file in the Search view](images/ch06-search-results.png "width=50%")

*Figure 6.2 - Search results grouped by file in the Search view*

## Narrowing the search

Select the three dots beside the search box to show the two include and exclude boxes.

- **Files to include** limits the search to some files. Type `*.py` to search only the Python files.
- **Files to exclude** leaves some files out. Use it for folders you do not want searched, such as build output.

The toggles for Match Case, Match Whole Word, and regular expressions sit at the right of the search box, as they do in Find.

> **Check the count:** before you replace anything across files, read the results list. It shows which files will change, and a match in a file you did not expect is a sign that the search needs a whole-word match or an include pattern.

## Replacing across files

The Search view also replaces text. Press {{Ctrl+Shift+H}} to show the Replace box, type the new text, and then choose Replace All for the results you want. Each file in the list changes, so read the list before you press the button. You can also remove a single match from the list with its button, so the change skips that line.

## Example: finding every function call

In the practice folder, search for `add(`. The results list the two files that call `add`, `calculator.py` and `test_calculator.py`, with the line numbers. Select a result to open it at the call. Searching for the bracket is more exact than searching for the word alone. It matches the definition and the calls, and skips any use of the word that has no bracket after it.

---
