# 10. Packages with NuGet

A package is a library that someone else wrote and published, so your project can use it without copying its code. NuGet is the package system for .NET, and nuget.org is the public place where most packages live. This chapter adds one well-known package, Newtonsoft.Json, to the calculator project in the practice folder, and it shows the two ways to do that: the Command Palette and the terminal.

Most of the work is judgment. Before a package goes into a project, you read its page, check its license and owners, and decide whether it belongs there. The commands are the easy part.

> **Before you start:** the palette commands in this chapter come from C# Dev Kit, which needs the sign-in and license from Chapter 9. The terminal commands need only the .NET SDK, version 10. Every example in this chapter uses packages from nuget.org.

## Your organization's packages

Your organization may run a private NuGet feed, on its own authenticated GitHub Enterprise instance. Reaching a private feed needs a sign-in, and the rules for it, and for which packages are approved, belong to your organization. This course doesn't use a private feed, and it doesn't give any address or credentials for one. If you work for an organization, follow its rules for private feeds and approved packages, and ask your team which ones apply before you add anything.

## What the chapter covers

The chapter has seven lessons, from the basics to the checklist:

1. What a package is, and how a project refers to one.
2. How to judge a package on its nuget.org page before you add it.
3. Adding a package from the Command Palette.
4. The same work in the terminal, including removing and re-adding a package.
5. Homework: updating a package, and checking it for known vulnerabilities.
6. A checklist.
7. A summary with three quizzes.

The practice project is `csharp\Calculator` in your practice folder. It has no packages yet, so you can see exactly what each command adds.

---
