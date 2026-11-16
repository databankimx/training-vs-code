# First launch

The first time VS Code opens, it shows the Welcome tab. You can use it to open a folder, clone a repository, or start a new file, and it links to short walkthroughs. You do not need any of them today, so you can close the tab and come back to it later.

![Figure 1.1 - Welcome tab](images/ch01-welcome-tab.png)

*Figure 1.1 - Welcome tab*

The Welcome tab is a tab like any other. It opens on the first launch and stays open until you close it. You can open it again from the command palette, which you will meet in Chapter 3.

## Opening a folder

VS Code works on folders. You open the folder that holds your project, and VS Code shows its files in the Explorer on the left. For this course, that folder is the practice repository. Chapter 2 creates it, and the setup script opens the course's own folder for you until then.

To open a folder yourself, choose File, then Open Folder, and pick the folder. You will do this in more detail in Chapter 3.

## Restricted Mode and workspace trust

The first time you open a folder, VS Code opens it in Restricted Mode. You can see the files and edit them, but some features stay off until you tell VS Code you trust the folder. VS Code does not ask as soon as the folder opens. Instead, the button in the lower left corner of the window shows that the folder is in Restricted Mode.

![Figure 1.2 - Restricted Mode button in the lower left corner](images/ch01-restricted-mode.png)

*Figure 1.2 - Restricted Mode button in the lower left corner*

Select that button, and VS Code shows the trust prompt. It asks whether you trust the people who wrote the folder.

![Figure 1.3 - Workspace trust prompt](images/ch01-workspace-trust.png)

*Figure 1.3 - Workspace trust prompt*

Trust matters because a folder can contain settings and tasks that run programs on your computer. In Restricted Mode, some features are turned off, such as running tasks and debugging.

For the practice repository, choose Yes, I trust the authors. You own that folder, and the course needs the features that trust turns on. Choose No, I don't trust the authors for a folder you have downloaded from somewhere you do not know, or that you were sent by someone you do not trust.

> **Changed your mind?** Trust is remembered for each folder. To change it later, open the command palette and run Workspace: Manage Workspace Trust.

---
