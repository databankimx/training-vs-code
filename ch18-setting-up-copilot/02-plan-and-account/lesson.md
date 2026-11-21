# The plan and the account

Copilot is a GitHub service, so using it needs a GitHub account with a Copilot plan. This course can involve two accounts, and mixing them up is the most common mistake people make with Copilot.

## Your personal account, on the free tier

A personal GitHub account can use Copilot's free tier. The free tier is for learning. In this course, you use it only on the sample code, such as `calculator.py` in your practice folder.

## The company-provided account

DataBank work uses only the company-provided account, under the AI Acceptable Use Policy. That account is the one tied to DataBank's GitHub Enterprise, and it is the only account that should touch DataBank code.

## Why the difference matters

Suppose you open a DataBank project and ask Copilot to explain a function. If VS Code is signed in with your personal account, the code you send is handled under the free tier's terms, not the company's. That is the mistake the rule exists to prevent. It is easy to make, because both accounts look the same in the editor.

## How to check which account VS Code uses

Look at the Accounts icon in the Activity Bar, at the lower left of the window. Click it. The menu shows the account name VS Code is signed in as. If that is not the account you intend, sign out from the same menu, and sign in with the right one.

![Figure 18.1 - The Accounts menu](images/ch18-accounts-menu.png)

*Figure 18.1 - The Accounts menu, showing the account VS Code is signed in as*

> **Check before you open DataBank code.** Look at the Accounts icon before you open any DataBank project. If it shows the wrong account, sign out first.

---
