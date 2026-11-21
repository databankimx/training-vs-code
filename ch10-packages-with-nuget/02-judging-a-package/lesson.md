# Judging a package before you add it

Adding a package is a decision about code that you didn't write. Before you add one, read its nuget.org page and answer a few questions. The page is public, so you can do this without an account.

## What to check

- **Version.** Is the version you want a stable release, without a hyphen? Stable is what the course uses.
- **License.** What does the package allow, and does the license fit how your team uses the code? The page names the license.
- **Owners.** Who publishes and maintains the package? The page lists the owners.
- **Dependencies.** What else does the package bring in? Each dependency is more code to trust.
- **Last update.** When was the version published? A package that hasn't been updated in years may not be maintained.
- **Downloads.** A high download count isn't proof of quality, but a package that almost no one uses deserves a closer look.

Your organization may keep a list of approved packages. If it does, the list decides before the page does.

## Newtonsoft.Json

This course uses Newtonsoft.Json for every example. It is a widely used package for reading and writing JSON in .NET. The version this course pins is 13.0.4, the latest stable release on nuget.org at the time of writing. The package is MIT licensed, and its owners are listed on its page. Pre-release versions are not used.

## Try it

1. Open `https://www.nuget.org/packages/Newtonsoft.Json` in your browser.
2. Find the latest stable version, and confirm it is 13.0.4.
3. Find the license, and write down its name.
4. Find the owners, and write down the first name listed.
5. Look at the dependencies for version 13.0.4. The page lists them under the framework you're using.

Write the four answers in your notes. You'll use the version and the package ID in the next lessons.
