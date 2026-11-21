# Working With Visual Studio Code

A guided tour of the editor, from the first launch to the daily work of a developer: editing, finding things, running and debugging, the integrated terminal, source control on GitHub, pull requests, and GitHub Copilot. One practice repository runs through the course, so each chapter builds on the last.

Visual Studio, the full IDE, is the next tutorial in this series. It is not covered here.

---

## License and Support

This repository is provided under the [MIT License](LICENSE). You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell the materials in this repository, subject to the terms of that license.

This repository is provided for training and reference purposes only. DataBank IMX does not provide warranties, guarantees, maintenance, troubleshooting, implementation assistance, or technical support for this code or its use. Use it in any way permitted by the MIT License, but you are responsible for evaluating, adapting, testing, and supporting any use of it in your own environment.

## DataBank Responsibilities for Custom Code

All DataBank employees - including those working with AI-assisted tools - are bound by the [Development Rules of Engagement](development-rules-of-engagement.md). That document defines the rules for quoting, approving, developing, reviewing, scanning, storing, and delivering custom code for client work.

Key obligations that apply to everyone on every custom code engagement:

- **You own the code you deliver.** This applies equally to hand-written code, AI-assisted code, and AI-generated code. "The AI wrote it" is not an acceptable explanation for a production issue, a failed review, a security finding, or a support problem.
- **Code must be reviewed before delivery.** Review is interactive and must confirm that the code works, meets DataBank standards, is maintainable, and that the developer understands it well enough to explain, debug, and maintain it. Polished or well-formatted output - including AI-generated output - is not evidence of correctness.
- **Code must be in source control before delivery.** All custom code must be committed to the appropriate DataBank GitHub Enterprise repository before it is delivered to a client, regardless of whether the client receives source code, compiled binaries, or deployed functionality.
- **CI scanning must pass before delivery.** Required checks are the standards policy scan, SonarQube, and Snyk. A passing local build is not a substitute.
- **All third-party dependencies must be license-vetted.** The license must permit closed-source commercial use. Copyleft or unclear licensing must be escalated before use. Dependencies must not be added simply because an AI tool suggested them.
- **Only approved AI tools may be used.** Use only IT-approved tools through company accounts. All data entered into AI systems is subject to the [DataBank AI Acceptable Use Policy](https://workforcenow.adp.com/mascsr/wfncontenttools/file-management/file/JTJGc3RhdGljJTJGY2xpZW50cyUyRmNvbnRlbnQlMkZBSStBY2NlcHRhYmxlK1VzZStQb2xpY3kucGRmJTNGMTc3MTM0NzA4NjE4MQ==) and must be treated as confidential by default.
- **Custom code is billable work.** Code must be tied to an approved quote or engagement before commitment or delivery. Development quotes require approval from the Development Director or delegated development leadership before being sent externally.
- **Exceptions require explicit approval.** Time pressure alone is not a reason to bypass quote approval, source control, review, or CI scanning.

See the [Development Rules of Engagement](development-rules-of-engagement.md) for the full policy, including billing and quoting rules, source-code delivery rules, the delivery readiness checklist, and the exception process.

---

## Who it is for

- People who are new to VS Code, or who use it every day and want to work faster
- Learners on Windows 10 or 11
- Learners who may know nothing about Git or GitHub. The source control chapters start from the first commit.

You need a GitHub.com account of your own for the practice repository. Chapter 2 walks you through creating it.

---

## What you need

- Windows 10 or 11
- A GitHub.com account, created in Chapter 2
- An Administrator window for a few setup steps. QUICKSTART.md says which ones.

If your computer is managed by an employer or school, and does not let you install software or run scripts, Chapter 1 explains what to do.

---

## Getting started

Read [QUICKSTART.md](QUICKSTART.md) first. It takes you from a fresh computer to the course open in VS Code, and it covers the errors you are most likely to see.

Then start Chapter 0 in the course.

---

## A note on editors

This course uses Visual Studio Code throughout. The lesson runner is separate from the editor. It only shows the lessons, and it does not read or check any file you work on.

---

## The lesson runner

The lessons are displayed by a small Electron app in `lesson-runner`. It needs Node.js 24 or later.

To run it by hand:

```
cd lesson-runner
npm ci
npm start
```

The setup script does these steps for you.

---

## Repository layout

- `ch00-introduction` to `ch10-running-debugging-testing`: the chapters. Each chapter folder holds a `lesson.md` introduction, and one folder for each step.
- `parts.json`: groups the chapters into parts. Every chapter must be listed exactly once.
- `lesson-runner`: the app that displays the lessons, with its tests.
- `setup.ps1` and `setup.json`: the setup script and the manifest it reads.

---

## Versions

- VS Code version: 1.146.0 (Help > About on the screenshot build).
  - Commit: 69047191fc427f2f92828279aae1d90d8eeda7ab, dated 2026-11-10
  - Electron 43.8.6, Chromium 150.0.7871.250, Node.js 24.22.1, V8 15.0.245.31-electron.0
  - GitHub Copilot 1.0.108-0, Copilot SDK 1.0.30-preview.0
  - OS: Windows_NT x64 10.0.26300
  - The screenshots are taken on this version.
- Mac shortcuts: the Mac column in Chapter 26 has not been verified on a Mac. Entries marked "verify" are unchecked.
- Course status: Chapters 0 to 26 are drafted. Screenshots are still to be captured for most chapters.

---

## About

- **Author:** Scott McLean, DataBank IMX
- **Purpose:** Internal developer training for DataBank IMX

---

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
