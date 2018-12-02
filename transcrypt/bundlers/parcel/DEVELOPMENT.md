
Notes for Developing the Loader
===============================================

The loader is programmed in Node-style JS, so it can be uploaded directly to npm without a build process.

    I would rather have programmed it as a transcrypt .py file (like its sibling webpack loader), but transcrypt doesn't extend JS classes very well yet. Parcel requires the plugin to be an Asset subclass.


Testing
--------------------------------------

First build the ES5-syntax version of the loader (see above). The testing files are in `transcrypt/development/manual_tests/webpack`.


Publishing to NPM
-------------------------

1. Ensure you are logged into npm (npm adduser)
2. Update the version in `package.json`
3. Run `npm publish`
