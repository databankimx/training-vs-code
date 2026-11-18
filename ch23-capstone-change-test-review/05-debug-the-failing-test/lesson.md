# Debug the failing test

The output says the test expected 7 and got 6. Before you decide who is lying, you want to watch the code run. A debugger is a way to freeze the story at one line and look around, like pausing a film to read the captions.

Open `test_calculator.py`, and click in the gutter, the narrow strip to the left of the line numbers, on the line that calls `total([1, 2, 3])` in the failing test. A red dot appears. That is your breakpoint, the place where the story pauses.

## Run it under the debugger

Open the Testing view from the activity bar, the flask icon. Hover over `test_total_of_prices_is_seven`, and click the debug icon beside it. The test runs under the debugger, and it stops at your breakpoint.

![Figure 23.1 - The debugger stopped at a breakpoint](images/ch23-debugger-stopped-at-breakpoint.png)

*Figure 23.1 - The debugger stopped at the breakpoint, with the Variables panel and debug toolbar*

## Read the values

Look at the Variables panel. Press {{F10}} to step over the line, so the call runs and the next line becomes current. Watch the value that `total` returns. It is 6, not 7.

Press {{F5}} to let the test finish. The failure appears in the Testing view, and its message appears in the editor at the failing line.

## What you know now

The code returns 6, because 1 plus 2 plus 3 is 6. The test expects 7. So the test is the wrong one, and the code is right. Be careful here, though. A debugger shows you what the code does, not what it should do. You decide what it should do, using arithmetic you can check by hand on the back of an envelope.

> **Remove the breakpoint when you finish.** A breakpoint left in the test changes how the next run behaves, and you will not remember it later.

---
