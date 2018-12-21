const Asset = require('parcel-bundler/src/Asset');
const logger = require('parcel-bundler/src/Logger');
const child_process = require('child_process');
const path = require('path');
const fs = require('fs');


// Default configuration for the plugin.
// To customize how transcrypt is run,
// copy this dictionary into your project's
// package.json, then modify as needed.
const DEFAULT_PACKAGE_CONFIG = {
    "parcel-plugin-python": {
        "command": "python3 -m transcrypt",
        "arguments": [
            /*  note that --build should normally not be used because multiple .py entry points         */
            /*  cause transcrypt to delete the first run's __target__ as it starts the second call.     */

            /*  parcel does minifying, so tell transcrypt to back off.                                  */
            "--nomin",
            /*  parcel expects to read these (if production build, it discards them at bundle time).    */
            "--map",
            /*  make transcrypt chatty so error messages are more useful                                */
            "--verbose"
        ]
    }
};

const LOG_PREFIX = '[parcel-plugin-python]'


/** Plugin for Parcel Bundler that uses transcript for .py -> .js */
class PythonAsset extends Asset {

    constructor(name, options) {
        super(name, options);
        logger.setOptions(options)
        this.type = 'js';
        this.fileinfo = path.parse(this.name);
        this.relativeDir = path.relative(this.options.rootDir, this.fileinfo.dir);
        if (this.fileinfo.name == '__init__') {
            this.pyModule = this.relativeDir.split(path.sep).join('.');
        } else {
            this.pyModule = path.join(this.relativeDir, this.fileinfo.name).split(path.sep).join('.');
        }
        this.importPath = './' + path.join('__target__', this.pyModule) + '.js';
        this.runInfoPath = path.join(this.options.rootDir, '__target__', this.relativeDir, this.fileinfo.name) + '.transcrypt.json';
    }

    getTranscryptRunInfo() {
        if (this.options['watch']) {
            if (fs.existsSync(this.runInfoPath)) {
                try {
                    return JSON.parse(fs.readFileSync(this.runInfoPath, 'utf8'));
                }catch (err) {
                    logger.warn(`${LOG_PREFIX} Unable to read transcrypt dependencies for watch mode: ${err}`);
                }
            }
        }
        return {};
    }

    async collectDependencies() {
        let count = 0;
        let runinfo = this.getTranscryptRunInfo();
        if (runinfo && runinfo.modules) {
            for (let mod of runinfo.modules) {
                if (mod.source) {
                    this.addDependency(mod.source, {includedInParent: true});
                    count++;
                }
            }
            if (this.options['watch']) {
                logger.verbose(`${LOG_PREFIX} Added ${count} watch dependencies...`);
            }
        }
    }

    invalidate() {
        if (this.parentBundle) {
            let runinfo = this.getTranscryptRunInfo();
            if (runinfo && runinfo.modules) {
                // make a list of the target files transcrypt created
                let targets = [];
                for (let mod of runinfo.modules) {
                    targets.push(mod.target);
                }
                // invalidate any that are in the bundle
                for (let asset of this.parentBundle.assets) {
                    if (targets.includes(asset.name) && this !== asset) {
                        asset.invalidate();
                    }
                }
            }
        }
        super.invalidate()
    }

    async load() {
        // load custom config (under a special key in package.json)
        const pkgConfig = await this.getConfig([ 'package.json' ]);
        let config = Object.assign({}, DEFAULT_PACKAGE_CONFIG["parcel-plugin-python"], pkgConfig["parcel-plugin-python"]);

        // run transcrypt
        let cmd = [
            config['command'],                              // python3 -m transcrypt
            ...config['arguments'],                         // --map --nomin --build ...
            '"' + this.pyModule.replace('"', '\\"') + '"'   // main file using dotted notation
        ].join(' ');
        let cmd_options = {
            // we need to call python from the root project dir so the __target__ location
            // stays the same for all .py files in the run. This allows them to share the
            // same __runtime__ and thus a common "memory" space.
            'cwd': this.options.rootDir,
            'encoding': 'utf8',
        };
        logger.progress(`${LOG_PREFIX} ${cmd}`);
        try {
            let stdout = child_process.execSync(cmd, cmd_options).toString();
        } catch (err) {
            logger.error(`${LOG_PREFIX} Error compiling ${this.name}\n${err.stdout.toString()}`);
            throw err;
        } //try
        logger.clear();

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



// disabled this because we aren't deleting the __target__ directory (after bundle) right now.

///////////////////////////////////////
///  Utilities

// /* Recursively remove a directory - thanks to SO Question #18052762 */
// function remove_dir_deep(dirpath) {
//     if (fs.existsSync(dirpath)) {
//         fs.readdirSync(dirpath).forEach(function (entry) {
//             var entry_path = path.join(dirpath, entry);
//             if (fs.lstatSync(entry_path).isDirectory()) {
//                 remove_dir_deep(entry_path);
//             } else {
//                 fs.unlinkSync(entry_path);
//             }
//         });
//         fs.rmdirSync(dirpath);
//     }
// }
