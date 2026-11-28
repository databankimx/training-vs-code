# Quickstart

This guide takes you from a fresh Windows computer to the course open in VS Code. Follow the steps in order. Each step says how to check it worked. The last section covers the errors you are most likely to see.

Commands are for Windows PowerShell. Run them in a new PowerShell window, unless a step says otherwise. A window opened before a program was installed can't find that program, so open a new one after each install.

---

## Before you begin

- You need Windows 10 or 11, and an internet connection.
- Some setup steps need an **Administrator** window. The script tells you when it needs one, and stops before it installs anything, so you can reopen the window and run it again.
- Your computer may be managed by an employer or school. If it does not let you install software or run scripts, read Chapter 1 before you go on.
- You do not need a GitHub account yet. Chapter 2 creates it.

---

## Where the course goes

The script puts the course in `C:\Development\training\training-vs-code`. It creates `C:\Development\training` if it isn't there. Keep the course in that folder. Your practice repository is separate. Chapter 2 and Chapter 3 create it, and you keep it in a folder of your own choosing.

---

## Quick setup with the script

### What gets installed

By default, the setup installs:

* Git
* PowerShell 7
* Node.js 24 or newer
* .NET SDK 10
* Microsoft Visual C++ runtime
* VS Code, with the extensions ms-dotnettools.csharp, ms-dotnettools.csdevkit
* Notepad++

The C++ Build Tools aren't installed up front. The script installs them only if Electron's binary can't download.

The setup then runs these steps: npm packages; Course tests. At the end it opens the repository in VS Code and starts the lesson runner window (Electron).

### Getting started

There are three methods available to set up this tutorial. They are currently Windows-only.

#### Full Automation (if you don't have Git currently set up)

This process will install Git and copy the repository to a subfolder of `C:\Development\training` and install all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-vs-code`
2. Open PowerShell using "Run as Administrator"
3. Run the script below

```pwsh
# Obtain the load tutorial script
irm https://raw.githubusercontent.com/databankimx/training-shared-template/main/load-tutorial.ps1 -OutFile "$env:TEMP\load-tutorial.ps1"

# Perform automated setup
powershell -NoProfile -ExecutionPolicy Bypass -File "$env:TEMP\load-tutorial.ps1" -RepoUrl https://github.com/databankimx/training-vs-code.git
```

#### Automated Setup from Local Repo (assumes you already have Git installed and set up)

In this process, you pull the existing repository and then run its setup script, which installs all necessary software and extensions for the tutorial's lesson runner.

1. Obtain the tutorial's GitHub slug name, which is `training-vs-code`
2. Open PowerShell using "Run as Administrator"
3. If you will use the default base directory `C:\Development\training`, run the following:

```pwsh
# Create the base folder if it doesn't exist yet
New-Item -ItemType Directory -Force -Path C:\Development\training | Out-Null
```

4. Clone the repository. If you're using a different base directory, replace `C:\Development\training` with your path:

```pwsh
# Go there and clone the tutorial
cd C:\Development\training
git clone https://github.com/databankimx/training-vs-code.git
cd training-vs-code
```

5. If desired, edit the setup configuration, which determines what software is installed automatically (see "Change what gets installed" below)

```pwsh
# Optional: edit setup.json before installations
notepad setup.json
```

6. Save the configuration if you edited it, then run the setup script

##### If using the default base path, run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

##### If using a different base path, replace `<BASE_DIR>` with your path and run this:

```pwsh
# Run the setup
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -BaseDirectory <BASE_DIR>
```

#### Manual Setup from Local Repo

If you want to do everything manually, you can pull the repository and set up software on your own.

1. Obtain the tutorial's GitHub slug name, which is `training-vs-code`
2. Run the script below

```pwsh
git clone https://github.com/databankimx/training-vs-code.git
```

3. Review README.md and QUICKSTART.md in the repository for instructions for manual setup.

### Switches and notes

* `-SkipInstall` checks what's installed and installs nothing.
* `-NoLaunch` runs the setup but doesn't open VS Code or start the runner.
* `-SkipTests` skips the course tests, which the setup runs by default.
* Installing uses winget. If winget isn't available, install **App Installer** from the Microsoft Store first. Company policy can block installs, in which case the script stops and you'll need IT.
* If an install needs administrator rights, the script stops before installing anything and asks you to run it again from an Administrator PowerShell window.

### Change what gets installed

The settings are in `setup.json`, in the repository folder. Open it in any text editor:

* Set an install's `"install"` to `true` to include it, or `false` to skip it.
* `"pinned"` sets the version. `"extensions"` lists the VS Code extensions to add.
* Save the file, then run `setup.ps1` again. It skips what's already installed.

## 2. Check the result

After the script finishes, the course should be open in VS Code, and the lesson runner should be open in its own window.

If VS Code opens but the runner doesn't, check the summary for the Electron line. If it says `failed`, see "Electron couldn't be downloaded" below.

---

## Where the log is

Every run writes a file called `setup.log` in the course folder. It holds the summary, any stop message, the "Action needed" list, and the last lines of output from any command that failed. The file is replaced on each run, and Git ignores it.

If you ask for help, send the `setup.log` file with your question.

---

## When something goes wrong

**"is not recognized as a name of a cmdlet" or "npm.cmd is not recognized"**
A program was installed in this window, so the window can't see it yet. Close the window, open a new PowerShell window, and run the script again.

**"needs an administrator window"**
The script stopped before it installed anything. Open PowerShell as Administrator, go to the folder that holds `setup.ps1`, and run the script again.

**"Electron couldn't be downloaded"**
The script downloads Electron from GitHub. A proxy, a firewall, or antivirus software that blocks GitHub is the usual cause. Check the error lines just above the message, and the `setup.log` file. Fix the network, then run the script again. The C++ Build Tools do not help with this step.

**"Cannot find native binding" or "The specified module could not be found"**
The lesson runner's extractor needs the Visual C++ runtime. Run the script from an Administrator window, so it can install the runtime, then run it again.

**"winget isn't available on this computer"**
Install **App Installer** from the Microsoft Store, then run the script again.

**"exists, but it isn't a copy of the course"**
A folder with that name is already there, and it isn't the course. Move or rename it, then run the script again.

**"Not opening the course, because setup didn't finish"**
The summary lists the problems. Fix them, then run the script again. The script doesn't open anything until every step succeeds.

**Your computer blocks the script or the installs**
Chapter 1 explains what to do. Ask the person who manages the computer. You can do every step by hand, from the chapters.

---

## Uninstalling

The README explains how to remove what the script installed, including the Explorer entries.
