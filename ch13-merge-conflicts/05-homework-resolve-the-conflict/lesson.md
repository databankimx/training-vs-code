# Homework: resolve the conflict

Your `calculator.py` still has the conflict from the first lesson of this chapter. Resolve it now, using what you learned in the lessons between.

## Step 1: resolve the conflict

Open `calculator.py`. Use the Accept links, or the Merge Editor, to keep one of the two return lines. Then edit the line so it reads `    return a + b`, with no comment. Make sure no marker lines remain.

Save the file.

## Step 2: check the file

Run this in the terminal, in the practice folder:

```
Select-String -Path calculator.py -Pattern "<<<<<<<|=======|>>>>>>>"
```

It should print nothing. If it prints a line, a marker is still in the file.

~~~spoiler
Here is the resolved function, with the markers and the comments removed:

```python
def add(a, b):
    return a + b
```

Once you save and stage the file, it moves from the Merge Changes group to the staged list, ready for the merge commit in the next lesson.
~~~

---
