// Main file called by the parcel bundler to register our asset
// as the handler for .py files.
//
// How it works: when this plugin is added to a project's package.json
// file using `npm install parcel-plugin-python`, we get:
//
//      "dependencies": {
//          "parcel-plugin-python": "0.1.1"
//      }
//
// When parcel loads, it reads through the dependencies and sees
// that this one is prefixed with `parcel-plugin-`. It automagically
// imports it and calls the default function below. Whenever
// parcel sees a .py file being imported in JS, it calls PythonAsset
// to handle it.

const PythonAsset = require.resolve('./asset.js');

module.exports = function (bundler) {
    bundler.addAssetType('py', PythonAsset);
}
