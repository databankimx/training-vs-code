# Emmet abbreviations in HTML

Emmet is a shorthand for writing HTML. You type a short abbreviation, press {{Tab}}, and VS Code expands it into the full markup. It works in HTML files, and in files that contain HTML, such as templates.

For example, type `ul>li*3` in an HTML file, then press {{Tab}}. The abbreviation expands to a list with three items:

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

The `>` means "inside", and the `*3` means "three times". The cursor lands inside the first item, so you can type straight away.

## Trying it without making a file

You do not need to create a file to try Emmet. Press {{Ctrl+N}} to open a new untitled file. Then press {{Ctrl+K}}, then {{M}}, to change its language mode to HTML, and type the abbreviation. The language mode is shown in the status bar, so check it says HTML before you press {{Tab}}.

> **Other languages:** Emmet only works where the language mode supports it. A Python file will not expand the abbreviation, and {{Tab}} will simply insert spaces.

## Example: a card with two paragraphs

Type `div.note>p*2` in an HTML file, then press {{Tab}}:

```html
<div class="note">
  <p></p>
  <p></p>
</div>
```

The `div.note` part makes a `div` with the class `note`, the `>` puts the paragraphs inside it, and `*2` makes two of them. Fill in the text inside each paragraph, and you have a small block of HTML without typing any of the tags by hand.

---
