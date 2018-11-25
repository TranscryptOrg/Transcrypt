
module.exports = function (bundler) {
    // register the plugin
    bundler.addAssetType('py', require.resolve('./asset/index'));
}
