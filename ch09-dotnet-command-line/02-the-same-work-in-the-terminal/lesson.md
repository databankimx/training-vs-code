# The same work in the terminal

This lesson uses the commands in the table below. Each one is run in the terminal, from the `csharp` folder unless the table says otherwise.

| Command | What it does |
| --- | --- |
| `dotnet --version` | Prints the version of the .NET SDK that is installed |
| `dotnet --list-sdks` | Lists every .NET SDK installed on the computer |
| `dotnet new console -n TerminalDemo -o TerminalDemo` | Creates a console project named `TerminalDemo` in a folder of the same name |
| `dotnet new list` | Lists the templates by their short names, such as `console` |
| `dotnet build TerminalDemo` | Compiles the project and reports any errors |
| `dotnet run --project TerminalDemo` | Builds the project if needed, then runs it |
| `dotnet add TerminalDemo reference Calculator/Calculator.csproj` | Adds a reference from `TerminalDemo` to the calculator library |
| `dotnet test Calculator.Tests` | Runs the calculator's tests, and reports the counts and the failing test. A failing test ends the command with a build error |

Open the terminal with {{Ctrl+`}}, and check that it is PowerShell 7. Then check the SDK:

`dotnet --version`

This prints the SDK version, which should be 10 or later. To see every SDK installed on the computer, run `dotnet --list-sdks`.

Now start a new project from the terminal. Go to the `csharp` folder, and create a console app named `TerminalDemo`:

`cd csharp`

`dotnet new console -n TerminalDemo -o TerminalDemo`

The command does the four palette steps in one line. `console` names the template, `-n` gives the name, and `-o` gives the folder. Run `dotnet new list` to see the other template short names. `CommandLineDemo` stays as it was, so you can compare the two folders.

Build the new project:

`dotnet build TerminalDemo`

Run it:

`dotnet run --project TerminalDemo`

The output is the same line that the Run button printed. The difference is how it started. `dotnet run` starts the program directly, with no debugger in between.

Now connect the demo to the calculator library. The `dotnet add` command adds a project reference:

`dotnet add TerminalDemo reference Calculator/Calculator.csproj`

Open `TerminalDemo.csproj` and find the new `ProjectReference` line. Finally, run the calculator's tests:

`dotnet test Calculator.Tests`

![Figure 9.8 - The output of dotnet test, with its summary line](images/ch09-dotnet-test-output.png "width=75%")

*Figure 9.8 - The output of dotnet test, with its summary line*

The line that starts with `Test summary` gives the count of tests that passed and failed. One test fails on purpose, `TotalOfPricesIsSeven`. It expects 7 for the list 1, 2, and 3, and the total is 6. Find it in the output, and read the expected and actual values.

The last line says `Build failed with 1 error(s)`. That is expected. `dotnet test` reports a failing test as a build error, so the command ends with an error code. The project itself built, and the error comes only from the failing test.

## Try it

1. Run `dotnet --version` in the terminal, and read the first line of the answer.
2. Create `TerminalDemo` with `dotnet new console`, then build and run it.
3. Add the reference to `Calculator`, and find the `ProjectReference` line in the project file.
4. Run `dotnet test Calculator.Tests`. Find the `Test summary` line and the failing test, and check that the final `Build failed` line is the one that comes from that test.

---
