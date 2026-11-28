# Context and commands

By default, Copilot answers about the open file. Sometimes that is not enough. The references and commands in this lesson add context to a question, so the answer is about the code you mean.

## #file: name a file

Type `#file:calculator.py` in a question, for example:

```text
#file:calculator.py Which functions in this file have no docstring?
```

![Figure 19.3 - The context picker](images/ch19-context-picker.png "width=70%")

*Figure 19.3 - Typing # in the chat box opens the list of context items*

Use #file when the question is about a file that is not open.

## @workspace: search the project

`@workspace` asks Copilot to look across the whole project:

```text
@workspace Where is the total function called?
```

The answer lists the files and places it found. Check each one. A search can miss a call that is built in an unusual way, such as one inside a string.

## /explain: explain selected code

Select the `total` function, then type:

```text
/explain
```

The explanation covers the selected code only. It is useful for a function you did not write, because it gives you a starting point to check against the code.

## /tests: write tests

Select the `total` function, then type:

```text
/tests
```

Read the tests before you keep them. A generated test can pass for the wrong reason. Here is a test that passes whatever the function returns, because it never checks the result:

```python
def test_total():
    total([1, 2, 3])
```

A useful test asserts the result. This one assumes `total` takes a list of numbers, so adjust it if your function takes something else:

```python
def test_total_adds_numbers():
    assert total([1, 2, 3]) == 6
```

A test is only as good as the expected value in it. Work out that value yourself, and do not copy it from the function's output.

