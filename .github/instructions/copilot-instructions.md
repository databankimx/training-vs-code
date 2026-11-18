---
applyTo: "**/*"
---

# GitHub Copilot Instructions - DataBank Development Standards

## Purpose
This file defines how GitHub Copilot should generate code for DataBank IMX development teams.
All generated code must align with internal standards for quality, maintainability, security, and consistency.

## Scope
This repository is a **Visual Studio Code training course** with a Node.js (Electron) lesson runner in `lesson-runner/`. Follow the **Common Standards** section and the **JavaScript Project Instructions** section for all code generation in this repository.

---

## Common Standards

### General Principles
- Prioritize **readability, maintainability, and clarity** over brevity.
- Follow **DataBank coding standards** at all times.
- Assume code will be **reviewed, tested, and deployed to client environments**.
- Avoid unsafe, experimental, or non-production-ready patterns.
- Do not introduce unnecessary dependencies or frameworks.
- Third-party packages **must** have licenses that allow closed-source commercial use.
- Prefer existing project patterns over introducing new architectural or library choices.

### Architecture and Design
- Prefer clear separation of concerns.
- Avoid tightly coupled designs.
- Design for reuse and extensibility.
- Keep controllers, endpoints, and entry points thin; place business logic in services or domain components.
- Match the structure and conventions already used by the repository unless the user explicitly requests a redesign.

### Error Handling and Security
- Validate all inputs.
- Avoid exposing sensitive information in exceptions, logs, API responses, or console output.
- Follow least-privilege principles.
- Do not generate insecure defaults, hardcoded secrets, or bypass validation/authentication/authorization checks.
- Exception and error messages must be clear, concise, grammatically correct, and end with a period.

### Comments and Documentation
- Write comments only when necessary.
- Use clear, concise US-English.
- Document complex logic, non-obvious decisions, and important operational behavior.
- Avoid comments that merely restate the code.

### Source Control and Workflow
- All code must be tracked in source control.
- Commit early and often.
- Use meaningful commit messages.
- Link commits to tasks, issues, bugs, or enhancements where appropriate.
- Use branches and pull requests for review; do not commit directly to protected mainline branches.

### Code Reviews and Quality Gates
- All code must be reviewed before merge or delivery.
- Address correctness, readability, performance, security, and maintainability.
- Where applicable, code must pass SonarQube or other required quality gates before merge.

### Testing and QA Expectations
- Follow a **test-driven mindset** where practical.
- Ensure new code is testable.
- Include unit tests and integration tests where appropriate.
- Consider edge cases, invalid inputs, failure scenarios, and regression risk.

### Prohibited Practices
- Do NOT generate hardcoded credentials, secrets, tokens, or connection strings.
- Do NOT introduce unapproved third-party libraries.
- Do NOT expose internal implementation details unnecessarily.
- Do NOT produce code that violates DataBank IP, security, or delivery policies.

---

## JavaScript Project Instructions

### General Style
- Write idiomatic, readable modern JavaScript (Node.js 24 or later).
- Prefer explicit, maintainable code over compact or clever code.
- Use descriptive names for modules, functions, variables, and parameters.
- Match the repository's existing layout and conventions.
- Follow the repository's formatting and linting setup when present.

### Structure
- Keep modules focused and cohesive.
- Keep functions small and single-purpose.
- Keep Electron main-process, preload, and renderer code separate. Place reusable logic in `lesson-runner/core`.
- Reuse existing utilities and patterns before introducing new abstractions.

### Electron Security
- Keep `contextIsolation` enabled and `nodeIntegration` disabled in renderer windows.
- Expose only the minimum API from `preload.js`, and validate all IPC input in the main process.
- Never render untrusted HTML without sanitization.

### Error Handling
- Throw `Error` objects (or specific subclasses), never strings.
- Preserve original error context by using the `cause` option when wrapping errors.
- Keep user-facing error messages clear and safe.
- Avoid swallowing errors silently.

### Logging
- Use the repository's existing approved logging pattern.
- Never log secrets, credentials, tokens, or sensitive customer data.

### Documentation
- Add JSDoc comments when the repository uses them consistently or when a function's behavior is not obvious.
- Keep inline comments minimal and purposeful.

### Testing
- Unit tests **must** use the built-in **node:test** runner (`npm test` in `lesson-runner`).
- New test files must be added to the `test` script in `lesson-runner/package.json`.
- Avoid introducing alternate test frameworks unless already required by the repository.
- Include coverage for normal flow, validation failures, edge cases, and error paths as appropriate.

### Training Repository Notes
- This repository contains training content. Chapter lessons, exercises, and screenshots are reference material,
  not production code. Do not apply production hardening standards to lesson sample files.
- Lesson content follows the established conventions in the existing chapters. Match them when editing.

---

## Copilot Behavior Guidelines

When generating code, Copilot should:
- Follow all applicable rules in this document automatically.
- Prefer existing project patterns over new ones.
- Match surrounding code style closely.
- Avoid speculative implementations.
- Ask for clarification through comments or generated TODO notes only when requirements are genuinely unclear.

---

## Definition of Done

Generated code is acceptable only if it:
- Runs successfully without warnings in the target project context.
- Passes required static analysis and quality gates where applicable.
- Follows the JavaScript standards in this file.
- Includes appropriate validation, error handling, and logging.
- Is readable, maintainable, and testable.
