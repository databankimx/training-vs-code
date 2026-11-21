# Homework: a second project, published

This exercise has one code change and one publish. Work in your practice folder. Do the first step with the palette, and the rest in the terminal.

1. Press {{Ctrl+Shift+P}}, run `.NET: New Project...`, choose the Console App template, and name the project `PublishDemo`. Put it in the `csharp` folder.
2. In the terminal, from the `csharp` folder, add a reference to the calculator: `dotnet add PublishDemo reference Calculator/Calculator.csproj`.
3. Open `PublishDemo/Program.cs`. Replace its contents with the starter below, which uses the calculator, and save it.
4. Build with `dotnet build PublishDemo`, and run it with `dotnet run --project PublishDemo`. The output should be `2 + 3 = 5`.
5. Publish it as a single file, with the same command as the last lesson, but for `PublishDemo`. Run the executable from the publish folder, and check that the output matches step 4.
6. When you finish, delete the `PublishDemo`, `CommandLineDemo`, and `TerminalDemo` folders. They are for practice, and the next chapters do not use them.

Starter code for `PublishDemo/Program.cs`:

```csharp
Console.WriteLine("Starting the demo.");
```

## Check your work

Your output should match `2 + 3 = 5` in both the run and the published executable. Both checks should pass before you delete the folders.

~~~spoiler
Here is the worked solution for `PublishDemo/Program.cs`:

```csharp
using PracticeCalculator;

Console.WriteLine($"2 + 3 = {Calculator.Add(2, 3)}");
```

The `using` line names the namespace that holds the calculator, and `Calculator.Add` is the method you call. The publish command is the same as in the last lesson, with `PublishDemo` in place of `CommandLineDemo`, and the output folder is `PublishDemo\bin\Release\net10.0\win-x64\publish`.
~~~
