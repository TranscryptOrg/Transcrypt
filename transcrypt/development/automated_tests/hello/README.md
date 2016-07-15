# Transcrypt Autotester Demo

## Comparisons Versus Assertions

(Just in case you wonder where the test assertions are hidden)

Transcrypt's autotest framework verifies the JS and Python runtimes generate equal results.

So rather matching JS output against hardcoded assertions, Transcrypt's autotest framework simply *generates* those assertions - by running the testlets within *Python* (-r switch), recording the results, then within a Javascript runtime (e.g. your browser), comparing to the previous Python output.

## Usage

`autotest.py` and the testlets, by design, see above, can only run code which is within the supported transpilable set.

E.g. an `import sys` (without any exclusion pragmas) will break the test.

Thats why you have to add the current working directory to have `autotest.py`
find the testlets *outside* the Python runtime, not within, via `sys.path.insert`.

On POSIX systems this is the standard way: `export PYTHONPATH=".:$PYTHONPATH"`
