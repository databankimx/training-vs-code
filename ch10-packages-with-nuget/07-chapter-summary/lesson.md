# Chapter summary

Adding a package is a decision and a command. The decision comes first, and the command records it in the project file. Keep these in mind:

- Read the package's page before you add it: the stable version, the license, the owners, the dependencies, and when it was last updated.
- A package is referenced by a `PackageReference` line in the project file, with an `Include` for the name and a `Version` for the version. Restore downloads it, and the build uses it.
- You can edit a `Version` by hand, or remove the line. The commands are safer, but the file is what the build reads, so check the result with `dotnet package list`.
- C# Dev Kit adds **NuGet: Add NuGet Package**, **NuGet: Update NuGet Package**, and **NuGet: Remove NuGet Package** to the Command Palette, and it needs the sign-in from Chapter 9.
- In .NET 10, the terminal commands are `dotnet package add`, `dotnet package remove`, and `dotnet package list`. Older SDKs and articles use `dotnet add package`.
- `dotnet package list --outdated` shows newer versions, and `dotnet package list --vulnerable` shows known vulnerabilities. A vulnerability is a reason to look, not a verdict.
- NuGet.Config sets where packages come from. Your user file is `%AppData%\NuGet\NuGet.Config`, a closer file wins for single settings, and a malformed file is ignored silently.
- Every example uses nuget.org. A private feed belongs to your organization, and its rules come first.

```quiz
You want to know whether Newtonsoft.Json has a known vulnerability in the version your project uses. Which command answers that?
○ dotnet package list --outdated
→ That command lists newer versions, not vulnerabilities.
◉ dotnet package list --vulnerable
→ Right. It lists packages with known vulnerabilities, and it reads the audit sources the project uses.
○ dotnet package remove Newtonsoft.Json
→ That removes the package. It does not check it.
```

```quiz
Which file records the package your project uses?
○ The NuGet cache, which holds downloaded packages.
→ The cache holds downloads. It isn't where the project records its choice.
◉ The project file, in a PackageReference line.
→ Right. The build reads the PackageReference, and restore downloads the package it names.
○ The solution's .vscode folder.
→ Settings and tasks go in .vscode. The package reference belongs in the project file.
```

```quiz
Why does this course pin a version in every example?
○ Because nuget.org does not allow an unpinned reference.
→ nuget.org allows both. Pinning is a choice the course makes.
◉ So the output stays the same when newer versions are published.
→ Right. A pinned version gives the same result for every reader and every check.
○ Because the newest version never works with .NET 10.
→ There is no such rule. The course pins versions to keep its output steady.
```

---
