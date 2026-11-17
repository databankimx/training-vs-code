# training-vs-code
Using the Visual Studio Code IDE

## Removing what the setup script installed

The setup script adds a few programs and some Explorer entries. It adds nothing to your PATH. Your practice repository and the course folder are separate, and you can delete them at any time.

**Programs.** Remove the programs with winget, from an administrator or regular PowerShell window:

```
winget uninstall --id Microsoft.VisualStudioCode
winget uninstall --id OpenJS.NodeJS.LTS
winget uninstall --id Git.Git
```

Only uninstall Git and Node.js if no other program on your computer needs them.

**Explorer entries.** The "Open with Code" entries are under your user account, so no administrator window is needed. Remove them with PowerShell:

```
Remove-Item -Path "HKCU:\Software\Classes\*\shell\VSCode" -Recurse -ErrorAction SilentlyContinue
Remove-Item -Path "HKCU:\Software\Classes\Directory\shell\VSCode" -Recurse -ErrorAction SilentlyContinue
Remove-Item -Path "HKCU:\Software\Classes\Directory\Background\shell\VSCode" -Recurse -ErrorAction SilentlyContinue
```

**Folders.** The course folder, `C:\Development\training\training-vs-code`, holds the lesson runner and its `node_modules` folder. Delete it to remove everything it downloaded. Your practice repository is separate, and is in the folder you created in Chapter 2.
