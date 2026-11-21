# Configure the test runner

Before the Testing view can find tests, VS Code needs to know which framework your tests use. The practice repository uses `unittest`, the same framework you ran from the terminal in Chapter 8.

> **Which framework to use:** `unittest` is part of Python, so it is the right choice for this course's practice repository. For real work, the DataBank IMX standard is `pytest`. It runs `unittest`-style tests too, and it is the framework to use for your own projects. The steps here work the same way for `pytest` if you configure it, but the course uses `unittest` throughout.

Open your practice folder, `training-vs-code-practice`, in VS Code. Then do this:

1. Press {{Ctrl+Shift+P}}, type `Python: Configure Tests`, and press {{Enter}}.
2. Choose `unittest` from the list.
3. When VS Code asks for the folder that holds the tests, choose the top of the practice folder, `.`.
4. When it asks for a pattern, choose `test*.py` from the list. The list's default is `*test.py`, which does not match `test_calculator.py`, so don't keep the default. `test*.py` matches any Python file whose name starts with `test`.
5. Choose the Testing view from the activity bar. It has a flask icon. The view lists `test_calculator.py`, with its three tests under it.

![Figure 10.1 - The Testing view with the three practice tests](images/ch10-testing-view.png "width=50%")

*Figure 10.1 - The Testing view with the three practice tests*

VS Code saves your choice in a settings file inside `.vscode`. You do not need to open that file. If you want to change the framework later, run the same command again.

## Run all the tests

At the top of the Testing view, click the play icon, labeled Run Tests. VS Code runs all three tests and marks each one.

![Figure 10.2 - The Testing view after running all three tests, with one failure](images/ch10-test-results.png "width=50%")

*Figure 10.2 - The Testing view after running all three tests, with one failure*

Two of the tests pass. The third, `test_total_of_prices_is_seven`, fails on purpose. Its failure is part of the course, so do not try to fix it here. Click the failing test. The message and the line that failed appear, so you can see what the test expected and what it got.

> **If the Testing view says it found no tests:** run `Python: Configure Tests` again, and check that the folder you chose is the top of the practice folder, and that the pattern is `test*.py`, which matches `test_calculator.py`.
