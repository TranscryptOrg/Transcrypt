const ParcelBundler = require ('parcel-bundler');
const ParcelPluginTranscrypt = require ('parcel-plugin-transcrypt');

let parcelBundler = new ParcelBundler ('./example/index.html', {
    watch: true,
    cache: false,
    sourcemaps: true,
    detailedReport: true,
    logLevel: 4
});

ParcelPluginTranscrypt (parcelBundler);

parcelBundler.serve (port = process.argv [2]);
