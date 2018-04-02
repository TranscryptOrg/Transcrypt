In addition to creation of separate JavaScript modules, it's possible to use the rollup.js bundler under node.js to create monoliths.

For this example, after running Transcrypt, go to the __target__ directory and type:

rollup hello.js --o hello_bundle.js --f iife --name 'hello'

It will create a standalone browser application of only 27 kB.
Run this application loading hello_bundle.html into your browser.
