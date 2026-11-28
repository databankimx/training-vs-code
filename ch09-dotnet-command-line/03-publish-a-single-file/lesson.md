# Publish a single file

`dotnet build` produces files for your own computer, and they need the .NET SDK or runtime to run. `dotnet publish` prepares a program for someone else's computer. Run this from the `csharp` folder:

`dotnet publish TerminalDemo -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true`

Each part of the command does one thing:

- `-c Release` builds the release configuration, not the debug one.
- `-r win-x64` targets 64-bit Windows.
- `--self-contained true` copies the .NET runtime into the output, so the other computer needs no .NET install.
- `-p:PublishSingleFile=true` packs the output into one `.exe` file.

The result is much larger than the program you wrote, because the runtime comes with it. The output folder is `TerminalDemo\bin\Release\net10.0\win-x64\publish`.

![Figure 9.9 - The publish folder, with the single executable](images/ch09-publish-folder.png "width=75%")

*Figure 9.9 - The publish folder, with the single executable*

Run the executable from the terminal to check it:

`.\TerminalDemo\bin\Release\net10.0\win-x64\publish\TerminalDemo.exe`

The output should match the output of `dotnet run`. The build output folders are in `.gitignore`, so the publish output does not appear in Source Control.

## Try it

1. Run the publish command from the `csharp` folder.
2. Open the publish folder in File Explorer, and find `TerminalDemo.exe`.
3. Run the executable from the terminal, and compare its output with `dotnet run`.

---
