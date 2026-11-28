# Languages, extensions, and the Python interpreter

VS Code decides what kind of file you are editing from its extension, such as `.py` for Python or `.js` for JavaScript. The status bar at the bottom right shows that choice, as a language mode. Select it to change the mode, which you do when a file is not recognized.

![Figure 7.2 - The language mode shown in the status bar](images/ch07-language-mode.png "width=50%")

*Figure 7.2 - The language mode shown in the status bar*

Language support comes from extensions. The features in this chapter need these:

- **JavaScript:** built in. The editor reads JavaScript files without an extra install.
- **Python:** the Python extension, from Microsoft. It adds completion, error checking, and navigation for Python files. It needs the Python you installed in the previous step.
- **C#:** the C# extension, and the .NET SDK, which holds the compiler. The practice repository's C# project targets .NET 10. Download the SDK from dot.net, and use the default options.

## Installing the Python extension

Press {{Ctrl+Shift+X}} to open the Extensions view. Type `Python` in the search box, and choose the one published by Microsoft. Select Install. The install takes a moment, and the extension is then ready for every Python file.

Chapter 21 explains the Extensions view in full, including how to disable an extension without removing it.

## Choosing the interpreter

Python code runs with an interpreter, the program that reads your `.py` file. The Python extension needs to know which one to use, so that completion and error checking match the version you run. Press {{Ctrl+Shift+P}}, type `Python: Select Interpreter`, and press {{Enter}}. Choose the `.venv` entry, which is the environment you created in the previous step.

Check the status bar after you choose. It shows the name of the interpreter, so you can confirm that it is the `.venv` one. VS Code usually activates the selected environment in new terminals too, so the `(.venv)` prompt appears there without the activate command.

> **No `.venv` in the list?** Check that the environment is in the practice folder, the folder VS Code has open, and that it is named `.venv`. Then close the list and open it again. Completion and error checking for Python need an interpreter, so this step is needed before the homework.

> **uv prompt:** when you install the Python extension, VS Code may offer to install uv and a Python for you. uv is a fast tool for managing Python packages. This course does not need it, because the environment from the previous step already works. Choose not to install uv for this course.

## Example: checking that Python is set up

Open `calculator.py` in your practice folder, and look at the status bar. It should show Python as the language mode. Hover over `add` in the `total` function. The box shows the function's signature, so you know the extension is reading the file.

---
