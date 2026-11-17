# Running the setup script

Chapter 1 mentioned the course's setup script, `setup.ps1`. It checks for Git, installs VS Code if it is missing, and opens the course folder. This step explains how to run it from the terminal, and what to do if Windows refuses.

Windows does not run PowerShell scripts by default. The rule that controls this is called the execution policy. Check the policy for your account with this command in the terminal:

```powershell
Get-ExecutionPolicy -Scope CurrentUser
```

If the answer is `Restricted` or `Undefined`, PowerShell will refuse to run `setup.ps1`. If the answer is `RemoteSigned`, `Unrestricted`, or `Bypass`, you can run it.

To allow scripts you write or download yourself, while still requiring that downloaded scripts are signed, change the policy for your account only:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

If PowerShell asks you to confirm, type `Y`, and press {{Enter}}. This setting applies to your account only, and it does not need administrator rights.

> **Managed computers:** if your IT team sets the execution policy with a group policy, this command will fail or be overridden. Ask your IT team to allow `setup.ps1`, rather than changing the policy yourself.

## Running the script

Move to the course folder, and run the script by name:

```powershell
cd C:\Development\training\training-vs-code
.\setup.ps1
```

The `.\` tells PowerShell to run the script in the current folder. When the script finishes, it prints what it installed, and VS Code opens the course folder.

> **Read the script first:** a script runs with your permissions. The course's script is short, and you can open it in VS Code and read it before you run it. If you are unsure what a script does, ask before you run it.

## Example: checking the result

After the script finishes, run this command, and check that it prints a version number:

```powershell
git --version
```

If it does, Git is installed and on your path. If PowerShell says that `git` is not recognized, open a new terminal, because a new program is only found by a terminal opened after it was installed.

---
