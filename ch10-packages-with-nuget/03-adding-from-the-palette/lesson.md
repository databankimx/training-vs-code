# Adding a package from the Command Palette

C# Dev Kit adds three NuGet commands to the Command Palette: **NuGet: Add NuGet Package**, **NuGet: Update NuGet Package**, and **NuGet: Remove NuGet Package**. This lesson uses the first one. The next lesson does the same work in the terminal, so you can compare the two.

> **Sign-in needed:** these commands come from C# Dev Kit, which needs the sign-in from Chapter 9. Without it, the commands are missing or they don't work.

## Add the package

1. Press {{Ctrl+Shift+P}}, and run **NuGet: Add NuGet Package**.
2. Choose the `Calculator` project in your practice folder's `csharp` folder.
3. Search for `Newtonsoft.Json`, and pick the package with that exact name.
4. Choose version 13.0.4.
5. Wait for the command to finish. It restores the package in the background.

The command may ask for each of these in turn, in whatever order it shows them. Choose each one so it matches the steps above.

## Look at the change

Open `csharp\Calculator\Calculator.csproj`. A new `ItemGroup` now holds a `PackageReference` for `Newtonsoft.Json`, with version 13.0.4. The `PropertyGroup` you saw in lesson 1 is unchanged.

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" Version="13.0.4" />
</ItemGroup>
```

The file changed, but the calculator's code did not. Adding a package makes it available, and it doesn't use it until your code does.

## Try it

1. Run **NuGet: Add NuGet Package** and add `Newtonsoft.Json` version 13.0.4 to the `Calculator` project.
2. Open `csharp\Calculator\Calculator.csproj` and find the new `PackageReference` line.
3. Check that the version in that line is 13.0.4, the same version you recorded on the nuget.org page.

If the palette command is missing, check the sign-in from Chapter 9, then try again.
