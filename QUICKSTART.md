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

## 1. Run the setup script

Open PowerShell. Go to the folder that holds `setup.ps1`, and run:

```
powershell -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
```

The `-ExecutionPolicy Bypass` part lets this one script run. It does not change any setting on your computer.

The script does the following, in order:

1. Checks for Git, and installs it with winget if it is missing.
2. Clones the course into `C:\Development\training\training-vs-code`, if the script isn't already in a copy of it.
3. Installs the Visual C++ runtime, which the lesson runner needs, if it is missing. This step needs an Administrator window.
4. Checks for VS Code and Node.js 24 or later, and installs whichever is missing.
5. Installs the lesson runner's packages, and downloads Electron, the app that displays the lessons.
6. Adds the "Open with Code" entries to the right-click menu for your user account.
7. Opens the course in VS Code, and starts the lesson runner.

It prints a summary at the end. Each line should show a success word, such as `present`, `installed`, `ok`, `downloaded`, or `added`. When every step has succeeded, the last line reads `Setup is complete.`

Useful switches:

- `-SkipInstall` checks what is installed, and installs nothing. It lists what is missing.
- `-NoLaunch` installs everything, but doesn't open VS Code or the lesson runner.
- `-RunTests` runs the lesson runner's tests after the install.

Use `-RepoDir` to put the course somewhere other than `C:\Development\training`.

---

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
