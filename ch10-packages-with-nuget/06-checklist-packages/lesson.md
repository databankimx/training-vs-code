# Checklist: packages with NuGet

Tick each item when you have done it in VS Code.

- [ ] Found the `PackageReference` line in `Calculator.csproj`, and named the target framework.
- [ ] Read the nuget.org page for Newtonsoft.Json, and wrote down its stable version, license, owners, and dependencies.
- [ ] Added Newtonsoft.Json with **NuGet: Add NuGet Package** from the Command Palette.
- [ ] Removed the package with `dotnet package remove`, and added 13.0.3 with `dotnet package add --version`.
- [ ] Used `dotnet package list` to see the requested version, and read the project file to confirm it.
- [ ] Changed a `Version` value in `Calculator.csproj` by hand, checked it with `dotnet package list`, and put it back.
- [ ] Updated the package to 13.0.4 with **NuGet: Update NuGet Package**.
- [ ] Ran `dotnet package list --outdated` and `dotnet package list --vulnerable`, and read both outputs.
- [ ] Built the project with `dotnet build` after the update.
- [ ] Checked whether your organization has an approved list, and whether it covers this package.
