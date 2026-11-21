# Chord shortcuts and conflicts

A chord is a shortcut made of two presses, one after the other. VS Code uses many chords, and the first press starts a family of them. Ctrl+K is the most common first press.

## An example

Press {{Ctrl+K}}, and let go. The status bar says that Ctrl+K was pressed and is waiting for the second key. Press {{Ctrl+C}} to comment out the current line. Press {{Ctrl+K}}, then {{Ctrl+U}}, to remove the comment.

![Figure 23.3 - The chord indicator](images/ch23-chord-indicator.png "width=60%")

*Figure 23.3 - VS Code waiting for the second key of a chord*

Another useful chord is {{Ctrl+K}} then {{V}}, which opens a Markdown preview beside the source file. It is the one to use when you edit a README. The Markdown preview lesson covers it in full.

If the second key is not part of the chord, VS Code cancels the chord and nothing happens. That is not an error. Press {{Esc}} to cancel a chord you started by mistake.

## Conflicts

A conflict happens when one key is bound to two commands that could both run in the same place. The editor flags a conflict with a warning, and the shortcut runs only one of them.

To find a conflict, open the Keyboard Shortcuts editor, and type the key into the search box, such as `ctrl+k`. Every command bound to that key appears. If two rows show the same key with overlapping "When" conditions, the key is in conflict.

## What to do

Pick a key that no other command uses, check it in the editor, and then bind your command to it. A quick check beats a shortcut that does nothing when you need it.

> **Chords use up the first key.** Every chord that starts with Ctrl+K takes that key away from a single-press shortcut. Check before you give one away.

---
