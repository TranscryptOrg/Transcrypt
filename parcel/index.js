

module.exports = function (bundler) {

    // register the plugin
    var pyBundler = require.resolve('./asset/index');
    bundler.addAssetType('py', pyBundler);

}
