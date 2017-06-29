#!/usr/bin/env python3

import os
import sys
import yaml
import logging
import logging.config
import traceback

from pathlib import Path

logger = logging.getLogger(__name__)

parent = Path(__file__).resolve().parent
with open(Path(parent, 'transcrypt.yml'), 'r') as config:
    params = yaml.load(config)

    logging.config.dictConfig(params['logging'])

programDir = os.getcwd().replace ('\\', '/')
transpilerDir = os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/')

modulesDir = '{}/modules'.format (transpilerDir)

logger.debug('sys.path: ' + str(sys.path))
logger.debug('programDir: ' + programDir)
logger.debug('transpilerDir: ' + transpilerDir)
logger.debug('modulesDir: ' + modulesDir)

# Both CPython and Transcrypt will use sys.path for module search.
# CPython also searches relatively from each module, while Transcrypt
# only from the main module.

sys.path = [item.replace ('\\', '/') for item in sys.path]
# Used by Transcrypt (*not* CPython), programDir is not always part of
# the path under Linux
compilerPath = [programDir, modulesDir] + sys.path

try:
    # Used by CPython, leave out Transcrypt dir to prevent importing
    # modules root if there's a module by that name
    sys.path.remove(transpilerDir)
except:
    pass

sys.path += [modulesDir]
# Unload org from a packages dir, if it's there.
sys.modules.pop('org', None)

# May reload org from a packages dir (or load it from other location)
from org.transcrypt import __base__
from org.transcrypt import utils
from org.transcrypt import compiler

if __name__ == '__main__':
    from argparse import ArgumentParser

    transpiler = params['transpiler']
    name, version = transpiler['name'], transpiler['version']

    description = name + ': Python to JavaScript Small Sane Subset Transpiler'

    parser = ArgumentParser(
        prog=name, description=description,
        epilog='Copyright (C) Geatec Engineering. License: Apache 2.0',
    )
    parser.add_argument('--version', action='version', version=version)

    parser.add_argument(
        'source', nargs=1, help='.py file with source code of main module'
    )
    parser.add_argument(
        '-a', '--annotate', action='store_true',
        help='annotate javascript target files with python source file names and source line numbers'
    )
    parser.add_argument(
        '-b', '--build', action='store_true',
        help='(re)build all target files from scratch'
    )
    parser.add_argument(
        '-c', '--complex', action='store_true',
        help='enable complex number support (requires operator overloading)'
    )
    parser.add_argument(
        '-d', '--docat', action='store_true',
        help='enable __doc__ attributes. Apply sparsely, since it will make docstrings part of the generated code'
    )
    parser.add_argument(
        '-dc', '--dcheck', action='store_true',
        help='debug: perform lightweight consistency check'
    )
    parser.add_argument(
        '-da', '--dassert', action = 'store_true',
        help='debug: activate assertions'
    )
    parser.add_argument(
        '-de', '--dextex', action = 'store_true',
        help='debug: show extended exception reports'
    )
    parser.add_argument(
        '-dm', '--dmap', action = 'store_true',
        help='debug: dump human readable source map'
    )
    parser.add_argument(
        '-dt', '--dtree', action = 'store_true',
        help='debug: dump syntax tree'
    )
    parser.add_argument(
        '-ds', '--dstat', action = 'store_true',
        help='debug: validate static typing using annotations'
    )
    parser.add_argument(
        '-e', '--esv', nargs='?',
        help='ecma script version of produced code, default = 5. The symbol __esv<versionnr>__ is added to the global symbol list, e.g. __esv6__.'
    )
    parser.add_argument(
        '-f', '--fcall', action = 'store_true',
        help="enable fastcall mechanism everywhere. You can also use __pragma__('fcal') and __pragma__('nofcall')"
    )
    parser.add_argument(
        '-g', '--gen', action = 'store_true',
        help="enable generators and iterators everywhere. Discouraged. It will result in a function call for each loop iteration. Preferably use __pragma__('gen') and __pragma__('nogen')"
    )
    parser.add_argument(
        '-i', '--iconv', action = 'store_true',
        help="enable automatic conversion to iterable by default. Discouraged. It will result in a type check for each for-loop. Preferably use __pragma__('iconv') and __pragma__('noiconv') to enable automatic conversion locally"
    )
    parser.add_argument(
        '-jk', '--jskeys', action = 'store_true',
        help="interpret {key: 'value'} as {'key': 'value'} and forbid {key (): 'value'}, as JavaScript does. Discouraged. It is less flexible than in Python. Either follow Python semantics by using {'key': 'value'} explicitly if you want literal keys or use __pragma__('jskeys') and __pragma__('nojskeys') locally to make the deviation from Python semantics very clear"
    )
    parser.add_argument(
        '-jm', '--jsmod', action = 'store_true',
        help="give %% and %%= JavaScript rather than Python behaviour. Discouraged. It deviates from the mathematical 'modulo' operator. Either follow Python semantics or use __pragma__('jskeys') and __pragma__('nojskeys') locally to make the deviation very clear."
    )
    parser.add_argument(
        '-k', '--kwargs', action = 'store_true',
        help="enable keyword arguments by default. Discouraged. Use __pragma__('kwargs') and __pragma__('nokwargs') locally to prevent bloated code"
    )
    parser.add_argument(
        '-l', '--license', action = 'store_true', help='show license'
    )
    parser.add_argument(
        '-m', '--map', action = 'store_true', help='generate source map'
    )
    parser.add_argument(
        '-n', '--nomin', action = 'store_true', help='no minification'
    )
    parser.add_argument(
        '-o', '--opov', action = 'store_true',
        help="enable operator overloading by default. Discouraged. Use __pragma__('opov') and __pragma__('noopov') locally instead to avoid slow code"
    )
    parser.add_argument(
        '-p', '--parent', nargs='?',
        help="object that will hold module, default is window. Use -p .none to generate orphan module, e.g. for use in node.js. Use -p .user to generate module that has to be explicitly initialized by calling <modulename> (), e.g. after the full page has loaded"
    )
    parser.add_argument(
        '-r', '--run', action = 'store_true',
        help='run source file rather than compiling it'
    )
    parser.add_argument(
        '-s', '--symbols', nargs='?',
        help='names, joined by $, separately passed to main module in __symbols__ variable'
    )
    parser.add_argument(
        '-t', '--tconv', action = 'store_true',
        help="enable automatic conversion to truth value by default. Discouraged. it will result in a conversion for each boolean. Preferably use __pragma__('tconv') and __pragma__('notconv') to enable automatic conversion locally"
    )
    parser.add_argument(
        '-v', '--verbose', action = 'count', help='be more verbose'
    )
    parser.add_argument(
        '-xp', '--xpath', nargs = '?',
        help="additional module search paths, joined by $, #'s will be replaced by spaces"
    )

    commandArgs = parser.parse_args()

    global extraLines

    extraLines = [
        # Make identifier __pragma__ known to static checker
        # It was only known in JavaScript from __core__.mod.js, which the checker doesn't see
        # __pragma__('<all>') in JavaScript requires it to remain a function, as it was in the core
        # It can't be skipped, since it has to precede __pragma__('skip'), to make the checker accept that
        'def __pragma__(): pass',

        # Make __include__ known to the static checker
        '__pragma__(\'skip\')',
        '__new__ = __include__ = 0',
        '__pragma__(\'noskip\')',
        ''
    ] if commandArgs.dcheck else []
    global nrOfExtraLines
    nrOfExtraLines = max (len (extraLines) - 1, 0)  # Last line only serves to force linefeed
    extraLines = '\n'.join (extraLines)

    logger.info(
        '{} (TM) Python to JavaScript Small Sane Subset Transpiler Version {}'
        .format(name, version)
    )
    logger.info('Copyright (C) Geatec Engineering. License: Apache 2.0')

    if commandArgs.xpath:
        compilerPath += commandArgs.xpath.replace ('#', ' ').split('$')
    logger.debug('compilerPath: ' + str(compilerPath))

    __symbols__ = commandArgs.symbols.split ('$') if commandArgs.symbols else []

    if commandArgs.complex:
        __symbols__.append ('__complex__')

    __symbols__.append ('__py{}.{}__'.format (* sys.version_info [:2]))

    if commandArgs.esv:
        __symbols__.append('__esv{}__'.format(utils.commandArgs.esv))
    else:
        __symbols__.append('__esv{}__'.format(transpiler['produce_js_version']))

    # Import (ignored when transpiling) late, commandArgs must be set already
    from org.transcrypt.stubs.browser import __set_stubsymbols__
    # Make symbols available to CPython, seems that exec can't do that directly
    __set_stubsymbols__ (__symbols__)

    if commandArgs.run:
        try:
            with open (commandArgs.source) as sourceFile:
                exec (sourceFile.read ())
                os.exit(exitSuccess)
        except Exception as exception:
            logger.exception('cannot run {} using CPython: {}'.format(commandArgs.source))
            os.exit(exitCannotRunSource)
    else:
        try:
            compiler.Program(compilerPath, __symbols__)
            os.exit(exitSuccess)
        except utils.Error as error:
            logger.exception(error)

            # Don't log anything else, even in verbose mode, since this would only be confusing
            if commandArgs.dextex:
                utils.log(True, '{}\n', traceback.format_exc ())

            os.exit(exitSpecificCompileError)
        except Exception as exception:
            logger.exception(exception)

            os.exit(exitGeneralCompileError)
