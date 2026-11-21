# Cloning the practice repository

Your practice repository lives on GitHub, under your account. Before you can work on it, you need a copy on your computer. This step makes that copy with Git, from PowerShell. Chapter 12 shows how to copy a repository from inside VS Code.

Open PowerShell, and move to the folder where you keep your projects. This course uses C:\Development:

```
cd C:\Development
git clone https://github.com/YOUR-USERNAME/training-vs-code-practice.git training-vs-code-practice
```

Replace YOUR-USERNAME with your GitHub username.

If you named your repository something other than training-vs-code-practice in Chapter 2, change the name in the web address to match, so it reads `https://github.com/YOUR-USERNAME/your-repository-name.git`. The name after the address is the folder Git creates on your computer. You can keep training-vs-code-practice for that folder, or use your repository's name. If you change it, use the same folder name in the next steps, in place of training-vs-code-practice.

If Git asks you to sign in, a browser window opens. Sign in with your personal account, and allow the access it asks for. Git remembers the sign-in for the later steps.

When the command finishes, check the copy with this command:

```
git status
```

It should say that you are on the main branch, and that there is nothing to commit.

Now open the copy in VS Code. Choose File, then Open Folder, and pick the folder you just created, such as C:\Development\training-vs-code-practice. When the trust prompt appears, choose Yes, I trust the authors, as Chapter 1 explained.

> **Keep the copy tidy:** the practice repository is yours to change, but the course folder you opened earlier is not. Do your work in training-vs-code-practice, and leave training-vs-code alone.

---
