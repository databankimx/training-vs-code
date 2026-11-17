# Setting up Python

Running Python code needs Python installed. Most projects also need their own environment, a folder that holds the packages the project uses, kept apart from the rest of your computer. This step installs Python, creates an environment in the practice folder, and activates it. The next step installs the Python extension and selects the environment.

A virtual environment is a folder with its own copy of Python's package space, separate from the rest of your computer. When you activate it, `python` and `pip` work inside that folder, so packages you install go there and nowhere else. Without one, every project shares one set of packages. Two projects can need different versions of the same library, and an install for one can break the other. A `.venv` folder keeps each project's packages separate, and you can delete it and rebuild it at any time.

## Install Python

Open PowerShell and run:

```
winget install -e --id Python.Python.3.12
```

Close that window, open a new PowerShell window, and run:

```
py --version
```

It should print `Python 3.12`. `py` is the Python Launcher for Windows. It is not a copy of `python.exe`. It finds the Python you installed and runs it, and it can run a specific version, such as `py -3.12`. It exists only on Windows. On macOS and Linux, the command is `python3`, and the rest of this step is the same.

If `py --version` prints a Microsoft Store page, or says it cannot find Python, go to the next section.

## Turn off the Store aliases, if needed

Windows includes a shortcut called an App execution alias for `python.exe`. It opens the Microsoft Store instead of running Python. To turn it off, open Settings, choose Apps, then Advanced app settings, then App execution aliases. Turn off the entries for `python.exe` and `python3.exe`. Open a new PowerShell window and run `py --version` again.

## Create the environment

In VS Code, open the terminal with {{Ctrl+`}}. Check that the terminal is in your practice folder, the folder that holds `calculator.py`. Then run:

```
py -m venv .venv
```

This creates a folder called `.venv` in the practice folder. The Explorer shows it at the top of the file list. The name `.venv` is the standard for this course. You can use another name in your own projects, but the rest of the course, and the interpreter list, assume `.venv`.

## Activate the environment

In the same terminal, run:

```
.\.venv\Scripts\activate
```

The prompt changes to start with `(.venv)`. That means the environment is active, and any package you install goes into it.

> **Scripts disabled?** If PowerShell says that running scripts is disabled, read the execution policy section in Chapter 8, then try again.

## Check which Python is running

Run these two commands while the prompt shows `(.venv)`:

```
python --version
where.exe python
```

The first should print `Python 3.12`. The first path that `where.exe` prints should be inside `.venv`. If it is not, the environment is not active, so run the activate command again.

## Leave the environment

Run `deactivate` to leave the environment. The prompt returns to normal. Activate it again the next time you open a new terminal, or let VS Code do it for you, as the next step explains.

The practice repository uses only the standard library, so you do not need to install any packages into `.venv` yet. Lessons that install packages will say so, and start from an activated environment.
