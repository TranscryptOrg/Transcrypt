const Asset = require('parcel-bundler/src/Asset');
const babelParser = require('@babel/parser');
const child_process = require('child_process');
const DependencyVisitors = require('parcel-bundler/src/visitors/dependencies');
const walk = require('babylon-walk');
const path = require('path');
const fs = require('fs');

class PythonAsset extends Asset {
    constructor(name, options) {
        super(name, options);
        this.type = 'js';
        this.fileinfo = path.parse(this.name);
        this.relativeDir = path.relative(this.options.rootDir, this.fileinfo.dir);
        if (this.fileinfo.name == '__init__') {
            this.pyModule = this.relativeDir.split(path.sep).join('.');
        } else {
            this.pyModule = path.join(this.relativeDir, this.fileinfo.name).split(path.sep).join('.');
        }
        this.importPath = './' + path.join('__target__', this.relativeDir, this.fileinfo.name) + '.js'
    }

    load() {
        // run transcrypt
        let cmd_parts = [
            'python3 -m transcrypt',
            '--nomin',
            '--map',
            '--build',
            this.pyModule
        ];
        let cmd_options = {
            // we need to call python from the root project dir so the __target__ location
            // stays the same for all .py files in the run.
            'cwd': this.options.rootDir,
        };
        try {
            let stdout = child_process.execSync(cmd_parts.join(' '), cmd_options).toString();
        } catch (err) {
            throw Error(err.stdout.toString() + '\n' + err.stderr.toString());
        } //try

        // we now have a __target__ directory with our .py -> .js, plus all its
        // dependencies. instead of reading it in here, we create an intermediary
        // script to bridge the __target__ files into this location.
        // this is a hack around the difference in the way parcel and transcrypt
        // work. when parcel calls this Asset class, it sees all imports as relative
        // to the source .py file directory, not the __target__ directory. that means
        // all the dependencies transcrypt sends to __target__ are in the wrong directory.
        // i tried doing multiple calls to transcrypt, custom JSAsset classes, moving the
        // files around, and sacrificing copies of windows to the coding gods. after more
        // hours than I want to admit to, i'm doing this intermediary file because it
        // leaves everything where each project expects. please do fix it a better
        // way, but be warned...there be dragons here!   [dragon by Donovan Blake]
        //     .
        //     .>   )\;`a__
        //    (  _ _)/ /-." ~~
        //     `( )_ )/
        //      <_  <_
        this.content = `export * from "${this.importPath}";`;

        // return the transpiled result
        return this.content;
    }

    generate() {
        return [ {
            type: this.type,
            value: this.contents,
            sourceMap: this.sourceMap,
        } ];
    }//generate

} //class

module.exports = PythonAsset;





///////////////////////////////////////
///  Utilities

/* Recursively remove a directory - thanks to SO Question #18052762 */
function remove_dir_deep(dirpath) {
    if (fs.existsSync(dirpath)) {
        fs.readdirSync(dirpath).forEach(function (entry) {
            var entry_path = path.join(dirpath, entry);
            if (fs.lstatSync(entry_path).isDirectory()) {
                remove_dir_deep(entry_path);
            } else {
                fs.unlinkSync(entry_path);
            }
        });
        fs.rmdirSync(dirpath);
    }
}
