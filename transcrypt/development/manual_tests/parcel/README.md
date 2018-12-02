Tests the parcel bundler plugin. See `transcrypt/bundlers/parcel/` for the actual bundler code.

Running the test
===================

First ensure you can run transcrypt from the command line. The plugin runs transcrypt with: `python3 -m transcrypt`. Open a console and be sure it runs. You can also modify the package.json file in this directory to change the options.

```
cd /path/to/transcrypt/transcrypt/development/manual/tests/parcel/
npm install
npm run test
```

You should see the server startup and build your bundle. Check that the server is able to start up (firewalls can cause issues here). When you see the "Server running at..." line:

-   Take a browser to `http://localhost:8000/`.
-   Open the browser console (right click the page, "Inspect Element", console tab).
-   You should see quite a few lines of output, but if not, try shift-refreshing the page while the console is open.
-   The output lines come from various imported files in the example.

The code startup process (see `transcrypt/parcel/example/` folder):

1.  `index.html` loads in your browser. It links to `index.js`.
1.  `index.js` imports `main.py` and calls `main()`.
1.  `main.py` tests many different ways of importing from sibling and child modules.
