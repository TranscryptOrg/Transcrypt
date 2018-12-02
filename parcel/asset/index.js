const Asset = require('parcel-bundler/src/Asset');
const babelParser = require('@babel/parser');
const child_process = require('child_process');
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
        this.absTargetPath = path.join(this.options.rootDir, '__target__', this.relativeDir, this.fileinfo.name)    // w/o extension
    }

    load() {
        // run transcrypt
        let cmd_parts = [
            'python3 -m transcrypt',
            '--nomin',
            '--map',
            '--imports .bundled',
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

        // read the source and map
        this.content = fs.readFileSync(
            this.absTargetPath + '.js',
            "utf8"
        );
        this.sourceMap = JSON.parse(
            fs.readFileSync(
                this.absTargetPath + '.map',
                "utf8"
            )
        );

        // cleanup
        // remove_dir_deep(path.join(this.fileinfo.dir, '__target__'))

        // return the transpiled result
        return this.content;
    }

    parse(code) {
        let ast = babelParser.parse(code, {
            // filename: path.join(this.fileinfo.dir, this.fileinfo.name + '.js'),
            allowReturnOutsideFunction: true,
            strictMode: false,
            sourceType: 'module',
            plugins: ['exportDefaultFrom', 'exportNamespaceFrom', 'dynamicImport']
        });
        return ast;
    }

    generate() {
        return [ {
            type: this.type,
            value: this.contents,
            sourceMap: this.sourceMap
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
