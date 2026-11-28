# Chapter summary

The palette and the terminal both drive the .NET SDK. Keep these in mind:

- The C# extension adds the three `.NET Install Tool` commands. C# Dev Kit adds the project commands, and it needs a sign-in that checks your license.
- The palette's four steps (template, name, location, create) match `dotnet new console` with `-n` and `-o`.
- `dotnet --version` checks the SDK. `dotnet build`, `dotnet run`, and `dotnet test` work on a project in the terminal.
- `dotnet add reference` connects one project to another.
- `dotnet publish` with `--self-contained true` and `-p:PublishSingleFile=true` creates one executable that runs without a .NET install.

```quiz
Which extension adds the three .NET Install Tool commands?
○ C# Dev Kit
→ C# Dev Kit adds the project commands, such as New Project and Publish.
◉ The C# extension
→ Yes. The C# extension adds the three .NET Install Tool commands.
○ The .NET SDK
→ The SDK provides the dotnet commands in the terminal. The palette commands come from the extensions.
```

```quiz
Which command publishes a single-file executable?
○ dotnet build CommandLineDemo
→ dotnet build compiles the project. It does not package it for another computer.
○ dotnet new console -n CommandLineDemo
→ dotnet new creates a project. It does not publish one.
◉ dotnet publish with -p:PublishSingleFile=true
→ Yes. Add --self-contained true to include the runtime in the file.
```

```quiz
Why do scripts and CI jobs use the terminal commands rather than the palette?
◉ The terminal commands run without an editor, and the palette calls the same SDK commands.
→ Yes. A pipeline has no palette, so it needs the commands that the palette runs underneath.
○ The palette cannot create a project.
→ The palette can create a project. Scripts need a command they can run without an editor.
○ The terminal commands work only in Visual Studio.
→ The terminal commands are the same in VS Code, in Visual Studio's Developer PowerShell, and in a pipeline.
```
