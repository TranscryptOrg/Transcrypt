
Notes for Developing the Loader
===============================================

The loader is programmed as a Transcrypt .py file, so it needs to be built manually before it can be used in webpack:

```
cd transcrypt/bundlers/webpack/
npm install
npm run build
```

When the "build" command is run, the following occurs:

1. Transcrypt is run on `index.py` to create `__target__/index.js`.
2. Babel is run on `__target__/*.js` to backport to ES5 syntax (since node/webpack don't do ES6). The result is placed in `__target_es5__/*`.

If you look in `package.json`, you'll see the main script is `__target_es5__/index.js`. This is what webpack uses when it runs our loader.


Testing
--------------------------------------

First build the ES5-syntax version of the loader (see above). The testing files are in `transcrypt/development/manual_tests/parcel`.


Publishing to NPM
-------------------------

1. Ensure you are logged into npm (npm adduser)
2. Update the version in `package.json`
3. Change to webpack directory: `cd transcrypt/bundlers/webpack/`
4. Rebuild: `npm run build`
5. Run `npm publish`
