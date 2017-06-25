# Transcrypt Autotester Demo

## Comparisons Versus Assertions

(Just in case you wonder where the test assertions are hidden)

Transcrypt's autotest framework verifies that the generated JavaScript
produces the same output as the original Python code.

Instead of comparing JavaScript output to hardcoded assertions,
Transcrypt's autotest framework *generates* those assertions by
running the testlets with *CPython* (`-r` switch), recording the
results, and then comparing those results in a JavaScript runtime environment
(e.g. your browser) to the output of the JavaScript produced with
Transcrypt (`-b` switch).

## Usage

The autotest framework (`autotest.py` and the testlets) can only run
code which is within the supported transpilable set (by design).

So, an `import sys` (without any exclusion pragmas) will break the
test. For more details, see the chapter [*Autotesting Trancsrypt
code*][1] in the docs.

Thats why you have to add the current working directory to have `autotest.py`
find the testlets *outside* the Python runtime, not within, via `sys.path.insert`.

On POSIX systems this is the standard way: `export PYTHONPATH=".:$PYTHONPATH"`

[1]: http://www.transcrypt.org/docs/html/autotesting_transcrypt.html
