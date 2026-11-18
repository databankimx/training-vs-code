# You own the code

When you accept a suggestion and commit it, the code is yours. Copilot does not review it, sign it, or answer for it. Your name is on the commit, and your team's review process applies to it exactly as it applies to code you typed yourself.

## An example that goes wrong

Suppose you accept the leap-year suggestion from Chapter 16 without checking it:

```python
def is_leap_year(year):
    return year % 4 == 0
```

You commit it, and a reviewer approves it, because it looks right. Months later, a report says 1900 was a leap year, and the report is wrong. The commit has your name on it, and the review passed. The team relies on you to check the code, and Copilot's involvement does not change that.

## What follows from that

- Read every suggestion before you accept it.
- Run it, and test it with inputs you chose yourself.
- Follow the team's review process, which applies to Copilot's code as it does to yours.

> **Plausible is not correct.** Code that looks right is the most dangerous kind, because nobody thinks to check it.

