# 24. Summary: A Working Checklist

This chapter is the course in one page. It is a checklist for a clean day in the editor: open, check the branch, edit, test, commit, push, and review. Use it the first few times with the list in front of you, and you will stop needing it.

```mermaid
flowchart TD
  A["Open the folder"] --> B["Check the branch and the Changes list"]
  B --> C["Create a branch for the change"]
  C --> D["Edit the code"]
  D --> E["Run the tests"]
  E -->|a test fails| F["Read the expected and actual values, then debug"]
  F --> D
  E -->|all pass| G["Review the diff"]
  G --> H["Commit with a clear message"]
  H --> I["Push or sync"]
  I --> J["Open a pull request, and review it"]
```

---
