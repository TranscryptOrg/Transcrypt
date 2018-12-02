path = require('path')
child_process = require('child_process')
loader_utils = require("loader-utils");


#########################################
###  Default loader configuration

DEFAULT_PACKAGE_CONFIG = {
    "command": "python3 -m transcrypt",
    "arguments": [
        # note that --build should normally not be used because multiple .py entry points
        # cause transcrypt to delete the first run's __target__ as it starts the second call

        # webpack does minifying, so tell transcrypt to back off
        "--nomin",
        # parcel expects to read these (if production build, it discards them at bundle time)
        "--map",
        # make transcrypt chatty so error messages are more useful
        "--verbose"
    ]
}


#########################################
###  Main function called by webpack

def main(src):
    # load custom config (under a special key in package.json)
    config = {}
    config.update(DEFAULT_PACKAGE_CONFIG)
    config.update(loader_utils.getOptions(this))

    # calculate filenames
    fileinfo = path.parse(this.resource)
    relative_dir = path.relative(this.rootContext, fileinfo.dir)
    if fileinfo.js_name == '__init__':
        py_module = relative_dir.split(path.sep).join('.')
    else:
        py_module = path.join(relative_dir, fileinfo.js_name).split(path.sep).join('.')
    target_path = path.join(this.rootContext, '__target__', py_module) + '.js'
    import_path = './' + path.relative(fileinfo.dir, target_path)
    runinfo_path = path.join(this.rootContext, '__target__', relative_dir, fileinfo.js_name) + '.transcrypt.json'

    # run transcrypt
    cmd = []
    cmd.append(config['command'])
    cmd.extend(config['arguments'])
    cmd.append('"{}"'.format(py_module.replace('"', '\\"')))
    cmd_options = {
        # we need to call python from the root project dir so the __target__ location
        # stays the same for all .py files in the run. This allows them to share the
        # same __runtime__ and thus a common "memory" space.
        'cwd': this.rootContext,
        'encoding': 'utf8',
    }
    try:
        stdout = str(child_process.execSync(' '.join(cmd), cmd_options))
    except object as err:
        console.log('Error compiling {}: {}'.format(this.resource, err.stdout))
        raise

    # we now have a __target__ directory with our .py -> .js, plus all its
    # dependencies.
    #
    # instead of reading it in here, I'm creating an intermediary
    # script to bridge the __target__ files into this location.
    # this is a hack around the difference in the way the bundler and transcrypt
    # work. when the bundler calls this Asset class, it sees all imports as relative
    # to the source .py file directory, not the __target__ directory. that means
    # all the dependencies transcrypt sends to __target__ are in the wrong directory.
    # i tried several methods of handling this more directly, but after more hours
    # than I'll admit to, I'm using this intermediary file because it
    # leaves everything where each project expects. be warned...there be dragons here!
    # [dragon by Donovan Blake]
    #     .
    #     .>   )\;`a__
    #    (  _ _)/ /-." ~~
    #     `( )_ )/
    #      <_  <_
    return 'export * from "{}";'.format(import_path)


#########################################
###  Exports

module.exports = main
