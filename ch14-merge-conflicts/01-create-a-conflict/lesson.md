# Homework: create a conflict

You will create a conflict on purpose, so the next lessons have a real one to read. The file is `calculator.py` in your `training-vs-code-practice` folder. Leave the conflict in place when you finish this lesson. You resolve it in the last lesson of the chapter.

Make sure `main` is checked out and clean before you start. Commit or stash anything you have changed.

Here is the `add` function as it should look on `main` before you start:

```python
def add(a, b):
    return a + b
```

## Step 1: make a branch with one change

Create a branch called `side-change` from the status bar, as you did in Chapter 12. Stay on it. In `calculator.py`, change the return line to:

```python
    return a + b  # side change
```

Save, stage, and commit the file with the message `Side change to add`.

## Step 2: change the same line on main

Switch back to `main` from the status bar. Change the same return line to:

```python
    return b + a  # main change
```

Save, stage, and commit the file with the message `Main change to add`.

## Step 3: merge side-change into main

Run `Git: Merge...` from the Command Palette, and choose `side-change`. Git cannot choose between the two changes, so it stops with a conflict in `calculator.py`.

Do not resolve the conflict yet. Leave `calculator.py` as it is, with the conflict in place, and go on to the next lesson.

![Figure 14.1 - The Merge Changes group after the merge stops, with the prefilled merge message](images/ch14-merge-changes-group.png "width=50%")

*Figure 14.1 - The Merge Changes group after the merge stops, with the prefilled merge message*

~~~spoiler
Here is what the conflicted part of `calculator.py` should look like after Step 3:

```python
def add(a, b):
<<<<<<< HEAD
    return b + a  # main change
=======
    return a + b  # side change
>>>>>>> side-change
```

In the Source Control view, `calculator.py` appears in the Merge Changes group.
~~~

---
