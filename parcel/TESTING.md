Plugin for transpiling python using the Transcrypt engine that supports writing your browser scripts using the Python language and then transpiling and bundling with Parcel.

See the `transcrypt/parcel/example/` directory for an example.

Installation
==================
See `README.md file` for installation instructions.

Running the example
===================

First ensure you can run transcrypt from the command line. The plugin runs transcrypt with: `python3 -m transcrypt`. Open a console and be sure it runs. See asset.js for the config options if you need to change the command line arguments.

(the path below is the parent of the `example` directory)

```
cd /path/to/transcrypt/parcel/
npm run test
```

You should see the server startup and create your bundle. Check that the server is able to start up (firewalls can cause issues here). When you see the "Server running at..." line:

-   Take a browser to `http://localhost:8000/`.
-   Open the browser console (right click the page, "Inspect Element", console tab).
-   You should see quite a few lines of output, but if not, try shift-refreshing the page while the console is open.
-   The output lines come from various imported files in the example.

The code startup process (see `transcrypt/parcel/example/` folder):

1.  `index.html` loads in your browser. It links to `index.js`.
1.  `index.js` imports `main.py` and calls `main()`.
1.  `main.py` tests many different ways of importing from sibling and child modules.

Publishing to npm
===================
Update the version in `package.json`, then:
```
npm publish
```
