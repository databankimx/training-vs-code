# Checks and review comments

Checks are automated tests that run on a pull request. At work, they might run unit tests, a build, or a security scan. Each check shows a green tick when it passes, or a red cross when it fails. A failing check should be fixed before the pull request is merged.

The practice repository has no checks set up, so the Checks section of your pull request will be empty, or say that no checks have run. That is expected.

## Leave a comment on a line

Open the pull request and go to the Files changed tab. Hover over the line you added to `README.md`, and click the plus sign in the margin. Write a comment, such as `Good, the line is at the end.` Submit the review from the review dialog, with Comment selected. The Approve option is greyed out, because GitHub does not let you approve your own pull request.

![Figure 17.3 - The review dialog with Comment selected and Approve unavailable](images/ch17-review-dialog.png "width=60%")

*Figure 17.3 - The review dialog with Comment selected and Approve unavailable*

## Reply to a comment

On the same line, a reply box appears under your comment. Write a reply, such as `Thanks for checking.` and submit it. In a real review, the author replies to each comment, and the reviewer decides when a thread is resolved.

Check the result in the pull request's Conversation tab. Your comment and reply should appear there.

> **Resolving a thread.** After a comment is answered, the thread can be marked Resolve conversation. Resolved threads stay visible, but they are collapsed, so the open questions are easy to find.

---
