# Remote work

VS Code can edit code that lives somewhere other than your own computer's own files. This appendix describes the options at a high level. It is read only, so there are no steps to follow here.

![Figure 25.1 - The remote indicator](images/ch25-remote-indicator.png)

*Figure 25.1 - The remote indicator at the lower left of the status bar*

## WSL

Windows Subsystem for Linux runs a Linux environment on your Windows computer. VS Code can open a folder inside that environment, so the tools you run, such as the terminal and the compilers, are the Linux ones. Your files stay in the Linux environment.

## SSH

SSH connects VS Code to another computer over the network. VS Code runs its back end on that machine, and you edit files there from your own window. This is useful when the code, the data, or the tools live on a server.

## Dev containers

A dev container is a container that a project describes in its own files. When you open the project, VS Code starts that container and works inside it, so everyone who opens the project gets the same tools and versions.

## Before you use any of them

These options depend on extensions, and the extensions have their own licences and their own network access. Check with your team before you connect to a machine or a container, especially one that holds company code or data.

> **Read only.** This appendix explains what the options are. The course does not teach their setup, and it does not name the extensions that provide them.

---
