# Cycle JS Demos

These were transcribed from https://cycle.js.org/ examples and should give you
a feel how Transcrypt fits within a cycle js app context.


## CycleJS Sources

You can build cycle using npm like documented in the official docu.

Alternatively, to get around the need for an npm toolchain we used the
`unpkg` service to include the cycle libs as standalone JS.

You can find the URL e.g. for cycle dom simply by browsing
`https://unpkg.com/@cycle/dom/` and browse the redirect target's dist folder.



## Running the Demos

The corresponding python sources you transpile using e.g.

```
transcrypt -n cyclejs_demo.py
```


Then the `.html` files with the same names as the `.py` files should work in
the browser.


For 'hot' re-transpiling with a file system monitor like `entr`:

```
.../demos/cyclejs_demo $ find . -name '*.py' | entr sh -c ' rm -f __javascript/* ; transcrypt -n cyclejs_demo.py'
```



