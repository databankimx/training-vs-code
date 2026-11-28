# Create a project from the Command Palette

Press {{Ctrl+Shift+P}}, type `.NET: New Project`, and press {{Enter}}. This is the command that the C# Dev Kit extension adds, and it walks you through four steps.

![Figure 9.1 - The Command Palette filtered to .NET](images/ch09-command-palette-dotnet.png "width=60%")

*Figure 9.1 - The Command Palette filtered to .NET*

**1. Choose a template.** Type `console`, and choose Console App. Its description says it creates a command-line program that runs on Windows, Linux, and macOS.

![Figure 9.2 - Choosing the Console App template](images/ch09-palette-template.png "width=60%")

*Figure 9.2 - Choosing the Console App template*

**2. Name the project.** Type `CommandLineDemo`, and press {{Enter}}.

![Figure 9.3 - Naming the project](images/ch09-palette-name.png "width=60%")

*Figure 9.3 - Naming the project*

**3. Choose a location.** The default puts the project at the top of the folder you opened. Choose Choose another directory, and pick the `csharp` folder in your practice folder, so the project sits beside `Calculator`. The dialog shows the full path the project will get.

![Figure 9.4 - Choosing the location](images/ch09-palette-location.png "width=60%")

*Figure 9.4 - Choosing the location*

**4. Create the project.** Choose Create project. The other option, Show all template options, opens the template's settings. Accept the defaults for this chapter.

![Figure 9.5 - Creating the project](images/ch09-palette-create.png "width=60%")

*Figure 9.5 - Creating the project*

Explorer now shows a `CommandLineDemo` folder with two files. `CommandLineDemo.csproj` describes the project: its type, the .NET version it targets, and any packages it uses. `Program.cs` holds the code, and it writes one line to the console.

To run it, press the drop-down arrow beside the Run button, at the top right of the editor, and choose Run project associated with this file.

![Figure 9.6 - The Run button's drop-down menu](images/ch09-run-dropdown.png "width=50%")

*Figure 9.6 - The Run button's drop-down menu*

The terminal opens and prints the program's output.

![Figure 9.7 - The output of the new program in the terminal](images/ch09-hello-world-output.png "width=75%")

*Figure 9.7 - The output of the new program in the terminal*

The first line of the terminal output starts with `&`, followed by a path to `vsdbg.exe`. That is the C# debugger's helper, which starts your program. The Run button goes through the debugger, and the terminal commands in the next lesson do not.

Change the text inside the quotes in `Program.cs` to something of your own, save the file, and run it again from the drop-down.

## Try it

1. Create `CommandLineDemo` with the four steps, and put it in the `csharp` folder.
2. Open `CommandLineDemo.csproj`, and find the line that names the target framework. It should say `net10.0`.
3. Change the text in `Program.cs`, then run the project from the Run button's drop-down.

---
