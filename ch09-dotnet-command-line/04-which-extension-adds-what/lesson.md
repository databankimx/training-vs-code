# The palette and the terminal side by side

Every step of the palette wizard in lesson 1 has a terminal equivalent. The table shows them side by side.

| Palette | Terminal | What the terminal shows |
| --- | --- | --- |
| Choose the Console App template | `dotnet new console` | `dotnet new list` shows every template |
| Name the project | `-n TerminalDemo` | The name is in the command |
| Choose the location | `-o TerminalDemo`, run from `csharp` | The folder is in the command |
| Create project | The command runs | There is no dialog |
| Run from the Run button | `dotnet run --project TerminalDemo` | The program starts directly, with no debugger |
| Publish | `dotnet publish` | Every option is written out |

The palette also has one step with no terminal equivalent, `.NET: Generate Assets for Build and Debug`, which sets up files for the editor. The terminal commands build and run the project without them.

Now press {{Ctrl+Shift+P}}, and type `.NET`. The list shows two groups of commands, and each group comes from a different extension.

The three commands at the top come from the C# extension (`ms-dotnettools.csharp`). They manage the .NET SDK itself:

- `.NET Install Tool: Install the .NET SDK System-Wide.`
- `.NET Install Tool: Report an issue with the .NET Install Tool.`
- `.NET Install Tool: Uninstall .NET.`

The rest come from C# Dev Kit, which needs the C# extension to work. They are project-based actions, such as `.NET: New Project...`, `.NET: Add Project Reference`, and `.NET: Publish`. Others help with project settings and logs, such as `.NET: Manage User Secrets` and `.NET: Collect C# Dev Kit Logs`.

![Figure 9.10 - The .NET commands in the Command Palette, with both extensions installed](images/ch09-dotnet-palette-commands.png "width=75%")

*Figure 9.10 - The .NET commands in the Command Palette, with both extensions installed*

Every project command in the palette runs the same SDK commands you ran in the terminal. The palette saves typing and shows menus. The terminal shows every option, works in a script, and works in a pipeline that has no editor at all. Use the palette while you learn, and use the terminal when you need a result you can repeat.

> **Sign-in and license:** C# Dev Kit checks its license when you sign in with a Microsoft account. The license does not allow an Enterprise to develop or test applications without a paid entitlement, such as a paid subscription. Open source and education are exempt. For this course, learning is the use. Work development for DataBank requires a paid, company Microsoft account.

## Try it

1. Open the Command Palette, type `.NET`, and find the three Install Tool commands. Do not run any of them.
2. Find `.NET: Publish` and `.NET: Add Project Reference`. Note which extension each one comes from, by its position in the list.
3. Run `dotnet --help` in the terminal, and compare how much the terminal lists with what the palette shows.

---
