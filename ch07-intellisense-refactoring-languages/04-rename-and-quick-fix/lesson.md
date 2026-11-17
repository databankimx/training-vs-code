# Rename Symbol and Quick Fix

Chapter 6 showed how to replace a name with Find and Replace. Rename Symbol is safer, because it understands the code. It changes a name everywhere the symbol is used, and it does not change text that only looks like the name, such as the same word in a comment.

Put the cursor on a name, such as `total` in `calculator.py`, and press {{F2}}. VS Code opens a box where you type the new name. Type `running_total`, and press {{Enter}}.

Before anything changes, VS Code shows a preview of every edit. The preview lists each file and line that will change, and you can check each one. Choose Apply to make the change, or press {{Esc}} to leave the code as it was.

![Figure 7.3 - The Rename Symbol preview listing each change](images/ch07-rename-preview.png "width=50%")

*Figure 7.3 - The Rename Symbol preview listing each change*

> **Rename is not the same as Replace:** Rename Symbol changes the symbol. Find and Replace changes text. If a comment mentions `total` in plain English, Rename Symbol leaves the comment alone and Replace changes it. Use Rename for code, and check the preview.

## Quick Fix

When VS Code finds a problem, it underlines the code with a wavy line. A red line is an error, and a yellow line is a warning. Put the cursor on the underlined name, and press {{Ctrl+.}} to open the Quick Fix menu. The menu lists the fixes VS Code suggests, and choosing one applies it.

Quick Fix does not always know the right answer. It offers a choice, and you decide. Read each option before you choose it.

## Example: a missing import

Suppose a file uses `math.sqrt` but never imports `math`. The name `math` is underlined in red. Put the cursor on it, press {{Ctrl+.}}, and choose the option to add the import. VS Code adds `import math` at the top of the file, and the underline goes away.

---
