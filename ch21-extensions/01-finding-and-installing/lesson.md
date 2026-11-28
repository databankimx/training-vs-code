# Finding and installing

Type a name or a topic into the search box at the top of the Extensions view. Results show each extension's name, its publisher, a short description, and an Install button.

![Figure 21.1 - The Extensions view](images/ch21-extensions-view.png "width=50%")

*Figure 21.1 - The Extensions view with a search for pylint*

Search for `pylint`. The result from Microsoft, with the publisher name Microsoft, is the one to install. Check the publisher before you install anything: a name that looks similar to a well-known extension is not the same extension.

A linter is a tool that reads your code without running it, and reports likely problems: a variable that is never used, a name that does not follow Python's conventions, or a line that would fail when the code runs. Pylint is one of the best-known linters for Python. Its warnings appear in the Problems panel, the same place you saw errors in Chapter 7.

> **You do not install pylint yourself.** The extension brings its own copy of the checker, so after you install it, warnings appear in the editor without any terminal steps.

Click the extension to open its details page, then click Install. The Install button changes to a gear icon when it is done. Some extensions ask you to reload VS Code. If a prompt appears, choose Reload.

Check the result in the Extensions view. Your installed extensions are listed under the Installed filter, and the Pylint extension should be there.

> **Installed is per profile.** Extensions you install apply to all your projects, unless you install them into a workspace on purpose. Keep that in mind, because an extension you add for one project changes how every project looks in your editor.

---
