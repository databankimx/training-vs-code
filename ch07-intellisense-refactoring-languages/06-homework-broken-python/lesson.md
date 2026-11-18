# Homework: repair report.py

In VS Code, create a file called `report.py` in your practice folder, using the same steps as the prices step in Chapter 5. Type the starter below into it, and save. Make every change in VS Code, not in the runner.

```python
from calculator import add, totl

numbers = [1, 2, 3]
print(totl(numbers))
print(add(2, 3))
print(math.sqrt(16))
```

The file has three mistakes:

1. The import asks for `totl`, but the calculator's function is named `total`.
2. The call `totl(numbers)` uses the same misspelled name.
3. The line `math.sqrt(16)` uses `math`, which is never imported.

Use the Problems panel with {{Ctrl+Shift+M}} to find the errors. Then fix each one. Fix the name in both the import and the call, by hand. Rename Symbol cannot help with a name that does not exist yet. For the third mistake, put the cursor on `math` and press {{Ctrl+.}}. If Quick Fix offers to add the import, choose that option. Otherwise, add `import math` at the top of the file by hand.

When the Problems panel is empty, save the file. Then open the solution from the spoiler below and compare it with your file, line by line, in VS Code.

~~~spoiler
Here is the worked solution. It has three changes: the import name, the call, and a new import.

```python
import math

from calculator import add, total

numbers = [1, 2, 3]
print(total(numbers))
print(add(2, 3))
print(math.sqrt(16))
```
~~~
