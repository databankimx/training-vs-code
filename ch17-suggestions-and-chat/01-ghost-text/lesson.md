# Ghost text suggestions

Ghost text is the grey text Copilot shows at your cursor. It is a suggestion, not something you typed, and nothing in the file changes until you accept it.

## A worked example

Open `calculator.py` in your practice folder. At the end of the file, on a new line, type:

```python
def subtract(a, b):
```

Wait a moment. Copilot may show grey text on the next line, such as:

```python
    return a - b
```

![Figure 17.1 - Ghost text after a function definition](images/ch17-ghost-text.png "width=60%")

*Figure 17.1 - Ghost text: Copilot's suggestion in grey, not yet in the file*

The suggestion is a guess based on the function name and the code above it. If the name were `subtract_with_tax`, the guess would change, because the name points to a different purpose.

## When it appears

Ghost text appears after a short pause, usually when you stop typing. It does not appear on every line. It shows up more often when the code is predictable, such as a function body that repeats a pattern already in the file.

## What it looks like when it is wrong

Suppose Copilot suggests this instead, for the same function:

```python
    return a + b
```

The name says subtract, and the code adds. The suggestion matched the pattern of addition code and ignored the name. Nothing warned you, because ghost text looks exactly like code you wrote. That is why the next lesson covers how to decide what to keep.

