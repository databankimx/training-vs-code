# Homework: recommend the Pylint extension

You will add the Pylint extension to the practice repository's recommendations, so anyone who opens the project is offered it.

## Step 1: open the file

In `training-vs-code-practice`, open `.vscode/extensions.json`. If the file does not exist, create it, and save it in the `.vscode` folder.

## Step 2: add the recommendation

Add `"ms-python.pylint"` to the `recommendations` list. If the list already has entries, add a comma after the last one, and put the new entry on its own line. Save the file.

## Step 3: check the file is valid

VS Code underlines a missing comma or a stray character in red. Fix any underlines before you go on, because an invalid `extensions.json` is ignored.

## Step 4: check the Recommended section

Open the Extensions view, and find the Recommended section. Pylint should be listed there, if you have not installed it yet, or in the Installed list if you have.

## Step 5: commit the change

Stage `.vscode/extensions.json`, and commit it with the message `Recommend the Pylint extension`. This is a change to the project, so it goes through a commit like any other.

~~~spoiler
Here is the full file, with the Pylint recommendation added:

```json
{
  "recommendations": [
    "ms-python.python",
    "ms-python.pylint"
  ]
}
```

If your file had no entries before, the list will hold only `ms-python.pylint`, with no comma after it.
~~~

---
