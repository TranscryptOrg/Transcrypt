To simplify integration of Transcrypt modules and native JavaScript modules, a plugin to the zero configuration Parcel bundler was contributed to the Transcrypt ecosystem.
You can try out the Parcel bundler support as follows:


    1. Install Node.js including npm (node package manager) from https://nodejs.org
    2. The Parcel.js bundler and its Transcrypt plugin have been preinstalled locally in ./node_modules
    3. From the directory containing this readme file, type: node test.js 8000
    4. Browse to localhost:8000
    5. Open the browser's Console pane to view the test results
    6. Open the browser's Sources pane and open the folder tree nodes to debug from the Python source using sourcemaps


Note that automatic recompilation and deployment takes place whenever a Transcrypt source file is modified.
In order to make this demo work, some minor patches had to be applied to the npm packages parcel-bundler and parcel-plugin-transcrypt.
For this reason using the ./node_modules directory is currently preferred over using a globally installed version of these npm packages.
This situation is expected to be temporary.

The following files were missing from the parcel-bundler npm package:

- Logger.js
- emoji.js
- prettyError.js

They were grabbed from https://github.com/parcel-bundler/parcel and added to the ./node_modules/parcel-bundler/src directory.

In ./node_modules/parcel-plugin-transcrypt line 46 and 47 of asset.js had to be changed from:

        this.importPath = './' + path.join('__target__', this.pyModule) + '.js';
        this.runInfoPath = path.join(this.options.rootDir, '__target__', this.relativeDir, this.fileinfo.name) + '.transcrypt.json';

to:
        this.importPath = './' + '__target__' + '/' + this.pyModule + '.js';
        this.runInfoPath = this.options.rootDir + '/' + '__target__' + '/' + this.relativeDir + '/' + this.fileinfo.name + '.transcrypt.json';
        
to make things work on Windows.

Some more information on parcel-plugin-transcrypt is given in the .md files in:

        ./node_modules/parcel-plugin-transcrypt
               