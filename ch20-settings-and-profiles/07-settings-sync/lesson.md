# Settings Sync

Settings Sync copies your settings, extensions, and keyboard shortcuts to an account, so you can get the same editor on another computer. You turn it on from the profile menu, and it asks which account to sync with.

## Think before you turn it on

Settings are not always harmless. A settings file can hold a path to a folder on your computer, the name of a server, or a choice your team made for a reason. Settings Sync copies all of that to an account outside your computer.

Before you turn it on, check three things:

- **The account.** Your team's rules decide which accounts may hold work settings. A personal account may not be the right place for company settings, and a company account may not be the right place for personal ones.
- **The contents.** Sync lets you choose which items to include, such as settings, extensions, or keyboard shortcuts. Leave out anything you would not want stored elsewhere.
- **Secrets.** A token, key, or password in a settings file is copied too. Keep secrets out of settings entirely.

## An example

A setting like `"python.defaultInterpreterPath": "C:\\Users\\you\\..."` names a folder on one computer. Syncing it to another computer does nothing useful, because the folder does not exist there. It also tells the account a detail about your machine that nobody needed.

> **Ask before you sync at work.** If you are unsure whether a setting may be shared, ask first.

---
