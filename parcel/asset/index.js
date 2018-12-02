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
    }

    load() {
        // run transcrypt
        let cmd_parts = [
            'python3 -m transcrypt',
            '--build',
            '--nomin',
            '--map',
//            '--noimports',
            '--npm',
            this.name
        ];
        try {
            let stdout = child_process.execSync(cmd_parts.join(' ')).toString();
        } catch (err) {
            throw Error(err.stdout.toString() + '\n' + err.stderr.toString());
        } //try

        // read the source and map
        this.content = fs.readFileSync(
            path.join(this.fileinfo.dir, '__target__', this.fileinfo.name + '.js'),
            "utf8"
        );
        this.sourceMap = JSON.parse(
            fs.readFileSync(
                path.join(this.fileinfo.dir, '__target__', this.fileinfo.name + '.map'),
                "utf8"
            )
        );

        console.log(this.content)

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
