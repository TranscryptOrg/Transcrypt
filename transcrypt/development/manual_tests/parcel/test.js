// This file is run via `npm run test` (in the parent directory).
// See package.json's scripts for more info.
//

const Bundler = require('parcel-bundler');
const PythonPlugin = require('parcel-plugin-transcrypt');

// manual testing method (runs a server on port 8000)
let bundler = new Bundler('./src/index.html', {
    watch: true,
    cache: false,
    sourcemaps: true,
    detailedReport: true,
    logLevel: 4
});
PythonPlugin(bundler);

bundler.serve(port=8000);
