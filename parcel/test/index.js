const Bundler = require('parcel-bundler');
const PythonPlugin = require('../index');

// manual testing method (runs a server on port 8000)
let bundler = new Bundler('./example/index.html', {
    watch: true,
    cache: false,
    sourcemaps: true,
    detailedReport: true,
    logLevel: 4
});
PythonPlugin(bundler);

bundler.serve(port=8000);
