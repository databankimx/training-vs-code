# What Copilot is

Think of Copilot as a very fast typist who has read a huge amount of code and guesses what you will type next. It does not understand your project the way you do. It looks at the text around your cursor, predicts what usually comes next, and shows that prediction for you to accept or ignore.

That is the whole mechanism. Keeping it in mind explains both the good results and the bad ones.

## Two parts, two jobs

Copilot in VS Code has two parts:

- **Suggestions** appear as grey text at your cursor. This is called ghost text.
- **Chat** adds a panel where you ask questions about the code.

In the build of VS Code you use for this course, Copilot is already included, so there is nothing to install. You turn it on by signing in.

## A worked example

Suppose you start a new Python file and type this line:

```python
def celsius_to_fahrenheit(celsius):
```

Copilot may show grey text underneath, such as:

```python
    return celsius * 9 / 5 + 32
```

Copilot did not look up a formula. It recognised the pattern, because that line appears in a lot of code. For a common formula, the guess is usually right. For a rare or specific rule, the guess can be wrong, and Copilot shows the wrong guess with the same confidence as the right one.

## What Copilot does not do

Copilot does not run your code. It does not check whether the code is correct, and it does not know what your customers expect. It cannot tell you whether a suggestion passes your tests, because it never runs them.

A suggestion that looks right can still be wrong. Here is a common example, a leap-year check:

```python
def is_leap_year(year):
    return year % 4 == 0
```

This looks correct, and it is right for 2024. It is wrong for 1900, which is not a leap year, but this function says it is, because 1900 is divisible by 4. The real rule also skips years divisible by 100, unless they are divisible by 400. Copilot can produce this version because it is the one it has seen most often. Chapter 20 takes this example further.

> **Read before you accept.** Ghost text looks like something a person wrote. It is a guess, and nothing has checked it.

---
