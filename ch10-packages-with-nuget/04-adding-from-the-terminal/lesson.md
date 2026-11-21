# The same work in the terminal

The terminal does everything the palette does, and scripts and pipelines use the terminal, so this lesson does the work there. It also removes the package you added from the palette, then adds an older version, so you can see both directions.

This lesson uses the commands in the table below. Each one runs in the terminal, in the folder named in the Where column.

| Command | Where | What it does |
| --- | --- | --- |
| `dotnet package add Newtonsoft.Json --version 13.0.3` | `csharp\Calculator` | Adds the package with the version you name |
| `dotnet package list` | `csharp\Calculator` | Lists the packages the project refers to, with the version it requests and the version it resolved |
| `dotnet package remove Newtonsoft.Json` | `csharp\Calculator` | Removes the package reference from the project |
| `dotnet package list --outdated` | `csharp\Calculator` | Lists packages that have a newer version on the source |
| `dotnet package list --vulnerable` | `csharp\Calculator` | Lists packages with known vulnerabilities |

Two notes about the names. In .NET 10, the noun comes first, as in `dotnet package add`. Earlier SDKs use the verb first, as in `dotnet add package`, and older articles use that form. The course uses the .NET 10 form. Also, the `--version` option names the version you want, and it's written in full here.

## Check the package

Open the terminal with {{Ctrl+`}}, and move to the calculator folder:

`cd csharp\Calculator`

Run `dotnet package list`. It should show `Newtonsoft.Json` with the version you added from the palette, 13.0.4.

## Remove it, then add an older version

Remove the package:

`dotnet package remove Newtonsoft.Json`

Run `dotnet package list` again. The package no longer appears.

Now add version 13.0.3:

`dotnet package add Newtonsoft.Json --version 13.0.3`

Run `dotnet package list` once more. It should show 13.0.3 as the requested version. Open `Calculator.csproj`, and find the `PackageReference` line. Its `Version` is 13.0.3.

## Why the terminal matters

A pipeline runs the same commands, and so does a script on another computer. Anything you do in the palette has a terminal form, and the table above is the one to keep. If the palette and the terminal ever disagree, the project file is the record: it's what the build uses.

## Editing the PackageReference by hand

The project file is plain XML, so you can also change a package by editing it. Each package is a `PackageReference` line with two attributes: `Include` names the package, and `Version` names the version the project asks for. This is the line the commands in this lesson write.

```xml
<ItemGroup>
  <PackageReference Include="Newtonsoft.Json" Version="13.0.3" />
</ItemGroup>
```

To change the version by hand, edit the `Version` value, save the file, and then run `dotnet package list`. The list shows the new requested version. Restore runs with the next build, so a version that doesn't exist on the source fails there, with an error that names the package and the version. Read the error before you change anything else.

To remove a package by hand, delete its whole `PackageReference` line. An empty `ItemGroup` can stay or be deleted, and both work. Running `dotnet package remove` does the same job and avoids a typo in the name.

Editing by hand is valid, but the commands are safer. They check the package exists before they write the line, and they keep the file formatted the way the tools expect. Use the hand edit when you want to see or change a single value, and check the result with `dotnet package list` either way.

Some organizations set package versions in one central file, so each project refers to a version that is set elsewhere. If your project has a `Directory.Packages.props` file above it, the `Version` is set there, and the project's line has no `Version` attribute. Check that file before you edit a version in the project.

## Try it

1. In the terminal, run `cd csharp\Calculator`.
2. Remove `Newtonsoft.Json`, and check with `dotnet package list` that it has gone.
3. Add `Newtonsoft.Json` with `--version 13.0.3`, and check with `dotnet package list` that 13.0.3 is requested.
4. Open `Calculator.csproj`, and confirm the `PackageReference` shows `Version="13.0.3"`.
5. Edit the `Version` value by hand to 13.0.4, save the file, and run `dotnet package list`. It should show 13.0.4. Then put the value back to 13.0.3, so the homework starts from the same place.

The next lesson updates the package to 13.0.4 and checks it.
