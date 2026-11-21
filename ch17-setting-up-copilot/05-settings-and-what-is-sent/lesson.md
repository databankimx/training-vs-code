# Settings and what is sent

Copilot sends some of your code to GitHub's service, so it can make suggestions and answer questions. This lesson covers what is sent, and the settings that control it.

## What is sent

For suggestions, Copilot sends the text near your cursor, and some code around it. For chat, it sends your question, plus any file or selection you included. The connection is encrypted, but encryption does not make something safe to share. Once the text leaves your computer, your team's rules on what you may share still apply.

## An example of what not to share

Imagine a file that contains this line:

```python
API_KEY = "sk-live-4f9a2c71e0b84d12"
```

A key typed into a file is a secret. Do not paste it into a chat question, and do not leave it in a file that Copilot reads. The safer pattern is to read the key from an environment variable, so the real value is never in the file:

```python
import os

API_KEY = os.environ["API_KEY"]
```

## Finding the settings

Open the Settings editor with {{Ctrl+,}}, and search for `Copilot`. You will find switches for suggestions and for chat. Suggestions can be turned on or off for each language. For example, this setting turns suggestions on everywhere except Markdown:

```json
"github.copilot.enable": {
  "*": true,
  "markdown": false
}
```

The status bar menu makes the same change without editing JSON, so use whichever is easier.

> **Company rules come first.** Your team's rules on AI tools come before any setting in this lesson. If you are unsure whether something may be sent, ask before you type it into Copilot.

---
