# Workspaces with more than one folder

Some projects span more than one folder. You might keep a library in one place and an application in another, and you want both in the Explorer at the same time. VS Code can hold several folders in one window, and it calls that arrangement a workspace.

To add a folder to the window, choose File, then Add Folder to Workspace, and pick the folder. The Explorer now shows each folder as its own top-level item.

![Figure 3.4 - A workspace with two folders in the Explorer](images/ch03-multi-root-workspace.png "width=50%")

*Figure 3.4 - A workspace with two folders in the Explorer*

## Saving the workspace

Once the folders are in place, choose File, then Save Workspace As, and give the file a name. VS Code writes a file that ends in .code-workspace. It records which folders are in the window, so opening that file later brings them all back.

> **Where to save it:** save the .code-workspace file outside the course folder, such as in C:\Development. Otherwise it ends up in the course repository and is shared with everyone who clones it.

Each folder in a workspace has its own trust setting, so you may see the Restricted Mode prompt for each one you add.

---
