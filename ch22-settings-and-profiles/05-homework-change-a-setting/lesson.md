# Homework: change a setting in settings.json

You will add a visible ruler at column 79 to your user settings, then confirm it on screen. This is a change to a settings file, so it is homework, and the worked solution is at the end.

## Step 1: open the file

Press {{Ctrl+Shift+P}}, type `Preferences: Open User Settings (JSON)`, and press {{Enter}}.

## Step 2: add the setting

Add this entry to the file. If the file already has entries, add a comma after the last one first:

```json
"editor.rulers": [79]
```

## Step 3: check the file is valid

Look for red underlines. A missing comma, or an extra one, stops the whole file from loading. Fix every underline before you go on.

## Step 4: confirm the change in the editor

Open `calculator.py` in `training-vs-code-practice`. A thin vertical line appears at column 79. Count the columns from the left edge of the text to check that the line sits where the setting says it should.

## Step 5: confirm the change in the Settings editor

Press {{Ctrl+,}}, search for `rulers`, and check that the value shows `79`. The Settings editor and the file are two views of the same setting, so both must agree.

~~~spoiler
Here is a complete user settings file with the change added. Your existing entries stay as they are:

```json
{
  "editor.fontSize": 16,
  "editor.rulers": [79]
}
```

If your file has other entries, add `"editor.rulers": [79]` after the last one, and put a comma after the entry before it. The ruler appears at column 79 in every file you open, because the setting is in user settings.
~~~

---
