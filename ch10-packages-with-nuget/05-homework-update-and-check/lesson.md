# Homework: update the package, then check it

This exercise has one update and two checks. Work in your practice folder, in the `csharp\Calculator` project. The package should be at 13.0.3, from the last lesson, before you start.

1. Confirm the starting point. In the terminal, from `csharp\Calculator`, run `dotnet package list`. It should show `Newtonsoft.Json` requested at 13.0.3.
2. Update the package with the palette. Press {{Ctrl+Shift+P}}, run **NuGet: Update NuGet Package**, choose the `Calculator` project, choose `Newtonsoft.Json`, and choose version 13.0.4.
3. Confirm the update. Run `dotnet package list` again. It should show 13.0.4, and `Calculator.csproj` should have `Version="13.0.4"`.
4. Check for newer versions. Run `dotnet package list --outdated`. Newtonsoft.Json should not appear, because 13.0.4 is the latest stable version. Pre-release versions are not listed unless you ask for them.
5. Check for known vulnerabilities. Run `dotnet package list --vulnerable`. Read the output. For 13.0.4 it should report no vulnerable packages.
6. Build the project. Run `dotnet build`. It should finish without errors.

## Check your work

Your project file should have `Version="13.0.4"`, the outdated check should not list Newtonsoft.Json, and the vulnerability check should report nothing for it. If the vulnerability output names a package, read the entry before you do anything else. A warning is a reason to look, not a verdict. Look at the package's page, its version, and whether the project really uses the affected code.

~~~spoiler
Here is one correct way to do the update.

Use **NuGet: Update NuGet Package** from the palette, choose `Calculator`, choose `Newtonsoft.Json`, and choose 13.0.4. The terminal can do the same job. From `csharp\Calculator`, run `dotnet package add Newtonsoft.Json --version 13.0.4`. It replaces the requested version in the project file, because the package is already there.

The checks are `dotnet package list --outdated` and `dotnet package list --vulnerable`. Newtonsoft.Json does not appear in the outdated list, because 13.0.4 is the newest stable version. The vulnerable list reports nothing for 13.0.4. If your output differs, check the version in the project file first.
~~~

When you finish, leave the package at 13.0.4. The checklist in the next lesson keeps it there.
