# What a package is

A package is a compiled library that a project can use, published with a name and a version. The project doesn't copy the package's code. It asks NuGet for the package by name, and NuGet downloads it when the project is restored.

## Three words to know

- **Package ID.** The name of the package, such as `Newtonsoft.Json`. Each ID is unique on the feed it comes from.
- **Version.** A number such as `13.0.4`. Versions with a hyphen, such as `14.0.1-beta1`, are previews, and they aren't used in this course.
- **Source.** The place packages come from. By default, a .NET project uses nuget.org, which is public.

## How a project refers to a package

In a modern .NET project, the project file lists each package as a `PackageReference`. Open `csharp\Calculator\Calculator.csproj` in VS Code. Right now it has no `PackageReference` line, because the calculator uses no packages.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```

After you add Newtonsoft.Json in lesson 3, a `<ItemGroup>` with a `PackageReference` line appears in this file. You don't have to write that line by hand, although you may need to read it.

## Where NuGet looks for packages: NuGet.Config

NuGet reads a file named `NuGet.Config` to decide where packages come from. On Windows, your user settings live in `%AppData%\NuGet\NuGet.Config`. A `NuGet.Config` in a project's folder, or in a folder above it, also applies when NuGet runs from there. Open your user file to see the sources. A default file lists nuget.org like this:

```xml
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
</configuration>
```

The `key` is the name NuGet shows, and the `value` is the address the source lives at. A few rules matter when you edit the file:

- **Lists are combined, single settings are not.** Sources from every `NuGet.Config` on the path are merged. For a single setting, the file closest to the project wins.
- **`<clear />` drops the sources above it.** Put it before your own sources if you want only those. It can also hide nuget.org, so use it deliberately.
- **`disabledPackageSources` turns a source off** without deleting its entry, so you can turn it back on later by changing `true` to `false`.
- **Some settings relax NuGet's security checks.** `allowInsecureConnections` lets NuGet use plain HTTP sources. Don't turn it on without your team's approval.
- **A malformed file is ignored without a message.** NuGet skips a file that isn't valid XML, so a missing source can mean a typo. Check the file after you edit it.

A source that needs a token refers to an environment variable, so the secret never appears in the file:

```xml
<packageSourceCredentials>
  <Example_x0020_Feed>
    <add key="Username" value="example-user" />
    <add key="ClearTextPassword" value="%EXAMPLE_FEED_TOKEN%" />
  </Example_x0020_Feed>
</packageSourceCredentials>
```

The element name is the source's name, with each space written as `_x0020_`. NuGet replaces `%EXAMPLE_FEED_TOKEN%` with the value of that environment variable when it runs.

You can add a source from the terminal with `dotnet nuget add source`. The address below is a placeholder, and it never resolves, so don't run this command as an exercise:

`dotnet nuget add source https://example.invalid/nuget/index.json --name example-feed`

Visual Studio's package source settings can edit the same file. This course doesn't add any source, because every example uses nuget.org.

> **Credentials:** a private source may need a token or password. Keep the secret out of every file. Put it in an environment variable, set outside the project, and have `NuGet.Config` refer to the variable's name with `%NAME%`. The file then holds a name, not a secret, so it's safe to keep. Choose variable names with your team. Never commit a secret, paste one into a lesson, or use the `--store-password-in-clear-text` option, which the NuGet docs discourage. Chapter 6 of the Git tutorial covers why secrets stay out of files.

## Restore

Before a project builds, NuGet restores its packages. Restore downloads each package the project asks for, and it puts them in a local cache. When you build a project, restore runs first if it's needed, so you rarely run it by hand. Restore needs network access to nuget.org the first time a package is used.

## Try it

1. Open `csharp\Calculator\Calculator.csproj`, and confirm there is no `PackageReference` line.
2. Find the `TargetFramework` line, and write down the framework it names.
3. Open `csharp\Calculator\Calculator.cs`, and note that it uses no `using` line for a package.

Nothing is changed in this lesson. The next two lessons show how to judge a package before you add it.
