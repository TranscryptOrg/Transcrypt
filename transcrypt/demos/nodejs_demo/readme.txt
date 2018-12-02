To use this demo:

- Install node.js from https://nodejs.org
- Install the rollup module bundler: npm install --global rollup
- Compile the demo with transcrypt -b nodejs_demo
- Go to the __target__ directory and type: rollup nodejs_demo.js --o nodejs_demo.bundle.js --f cjs
- Type node nodejs_demo_bundle.js to run the demo
- Quirk in Google Chrome: If you hit refresh, the log shows that a page may actually be loaded twice...

Note that this is a temporary solution, driven by the fact that node.js doesn't support named imports and exports.
If this situation remains unchanged, Transcrypt will eventually generate special purpose import and export code for node modules.
