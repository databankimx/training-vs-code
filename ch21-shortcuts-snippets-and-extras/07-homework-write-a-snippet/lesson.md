# Homework: write a snippet

You will write a snippet in `python.json` for a block of code you type often. This is a change to a snippets file, so it is homework.

## Step 1: choose a block

Pick a short block you write often, such as a `for` loop, a `print` line, or an `if` check. Write it out by hand first, so you know what it should look like.

## Step 2: open python.json

Press {{Ctrl+Shift+P}}, type `Snippets: Configure User Snippets`, press {{Enter}}, and choose `python`.

## Step 3: write the snippet

Add an entry with a `prefix`, a `body`, and a `description`. Put each line of the block in the `body` list, and use `${1:name}` where you want to type something. Remember the rules for quotes and commas: each line is in double quotes, and each line except the last is followed by a comma.

## Step 4: test it

Create a new Python file, type your prefix, choose the snippet from the list, and press Enter. Check that the block appears and that Tab moves between the fill-in places.

~~~spoiler
Here is one example, a for loop over a list:

```json
"For loop over a list": {
  "prefix": "forl",
  "body": [
    "for ${1:item} in ${2:items}:",
    "    ${0:pass}"
  ],
  "description": "A for loop over a list"
}
```

Typing `forl` offers this snippet. Tab moves from `item` to `items`, and the cursor finishes inside the loop.
~~~

---
