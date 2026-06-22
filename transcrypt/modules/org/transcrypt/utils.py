import os
import sys
import argparse
import inspect
import tokenize
import re
import time

import traceback

class Any:
    def __init__ (self, **attribs):
        for attrib in attribs:
            setattr (self, attrib, attribs [attrib])

defaultJavaScriptVersion = 5

class CommandArgsError (BaseException):
    pass

class CommandArgsExit (BaseException):
    pass

class ArgumentParser (argparse.ArgumentParser):
    def error (self, message):
        self.print_help (sys.stdout)
        if message:
            log (True, '\nError: {}\n', message)
        raise CommandArgsError ()

    def exit (self, status = 0, message = None):
        if message:
            log (True, 'Exit: {}', message)
        raise CommandArgsExit ()

class CommandArgs:
    def parse (self):
        self.argParser = ArgumentParser ()

        self.argParser.add_argument ('source', nargs='?', help = ".py file containing source code of main module")
        self.argParser.add_argument ('-a', '--anno', help = "annotate target files that were compiled from Python with source file names and source line numbers", action = 'store_true')
        self.argParser.add_argument ('-am', '--alimod', help = "use aliasing for module paths", action = 'store_true')
        self.argParser.add_argument ('-b', '--build', help = "rebuild all target files from scratch", action = 'store_true')
        self.argParser.add_argument ('-c', '--complex', help = "enable complex number support, locally requires operator overloading", action = 'store_true')
        self.argParser.add_argument ('-d', '--docat', help = "enable __doc__ attributes. Apply sparsely, since it will make docstrings part of the generated code", action = 'store_true')
        self.argParser.add_argument ('-da', '--dassert', help = "debug: activate assertions", action = 'store_true')
        self.argParser.add_argument ('-dc', '--dcheck', help = "debug: perform lightweight consistency check", action = 'store_true')
        self.argParser.add_argument ('-de', '--dextex', help = "debug: show extended exception reports", action = 'store_true')
        self.argParser.add_argument ('-dl', '--dlog', help = "debug: log compiler messages to disk", action = 'store_true')
        self.argParser.add_argument ('-dm', '--dmap', help = "debug: dump human readable source map", action = 'store_true')
        self.argParser.add_argument ('-dn', '--dnostrip', help = "debug: no comment stripping of __core__ and __builtin__ in-line modules", action = 'store_true')
        self.argParser.add_argument ('-ds', '--dstat', help = "debug: validate static typing using annotations", action = 'store_true')
        self.argParser.add_argument ('-dt', '--dtree', help = "debug: dump syntax tree", action = 'store_true')
        self.argParser.add_argument ('-e', '--esv', nargs='?', help = "ecma script version of generated code, default = 6. The symbol __esv<versionnr>__ is added to the global symbol list, e.g. __esv7__.")
        self.argParser.add_argument ('-ec', '--ecom', help = "enable executable comments, seen as comments by CPython but as executable statements by Transcrypt", action = 'store_true')
        self.argParser.add_argument ('-f', '--fcall', help = "enable fastcall mechanism by default. You can also use __pragma__ ('fcal') and __pragma__ (\'nofcall\')", action = 'store_true')
        self.argParser.add_argument ('-g', '--gen', help = "enable generators and iterators. Disadvised, since it will result in a function call for each loop iteration. Preferably use __pragma__ ('gen') and __pragma__ ('nogen')", action = 'store_true')
        self.argParser.add_argument ('-i', '--iconv', help = "enable automatic conversion to iterable by default. Disadvised, since it will result in a type check for each for-loop. Preferably use __pragma__ ('iconv') and __pragma__ (\'noiconv\') to enable automatic conversion locally", action = 'store_true')
        self.argParser.add_argument ('-jc', '--jscall', help = "enable native JavaScript calls for Python methods. This is fast, but doesn't support bound method assignment, decorators and non-instance methods. Preferably use __pragma__ ('jscall') and __pragma__ ('nojscall') to enable native JavaScript calls locally", action = 'store_true')
        self.argParser.add_argument ('-jk', '--jskeys', help = "interpret {key: 'value'} as {'key': 'value'} and forbid {key (): 'value'}, as JavaScript does. Disadvised, since it's less flexible than the Python interpretation. Either follow Python semantics by using {'key': 'value'} explicitly if you want literal keys or use __pragma__ ('jskeys') and __pragma__ ('nojskeys') locally instead to make clear local deviation from Python semantics", action = 'store_true')
        self.argParser.add_argument ('-jm', '--jsmod', help = "give %% and %%= JavaScript rather than Python behaviour. Disadvised, since it deviates from the mathematical 'modulo' operator. Either follow Python semantics or use __pragma__ ('jsmod') and __pragma__ ('nojsmod') locally instead to make clear local deviation.", action = 'store_true')
        self.argParser.add_argument ('-k', '--kwargs', help = "enable keyword arguments by default. In general this is disadvised, use __pragma__ ('kwargs') and __pragma__('nokwargs') locally instead to prevent bloated code", action = 'store_true')
        self.argParser.add_argument ('-kc', '--keycheck', help = "enable checking for existence of dictionary keys. In general this is disadvised, use __pragma__ ('keycheck') and __pragma__('nokeycheck') locally instead to prevent bloated code", action = 'store_true')
        self.argParser.add_argument ('-l', '--license', help = "show license", action = 'store_true')
        self.argParser.add_argument ('-m', '--map', help = "generate source map", action = 'store_true')
        self.argParser.add_argument ('-n', '--nomin', help = "no minification", action = 'store_true')
        self.argParser.add_argument ('-o', '--opov', help = "enable operator overloading by default. In general this is disadvised, use __pragma__ ('opov') and __pragma__('noopov') locally instead to prevent slow code", action = 'store_true')
        self.argParser.add_argument ('-od', '--outdir', help = 'override output directory (default = __target__)')
        self.argParser.add_argument ('-p', '--parent', nargs = '?', help = "object that will hold application, default is window. Use -p .none to generate orphan application, e.g. for use in node.js")
        self.argParser.add_argument ('-r', '--run', help = "run source file rather than compiling it", action = 'store_true')
        self.argParser.add_argument ('-s', '--symbols', nargs ='?', help = "names, joined by $, separately passed to main module in __symbols__ variable", action="append")
        self.argParser.add_argument ('-sf', '--sform', help = "enable support for string formatting mini language", action = 'store_true')
        self.argParser.add_argument ('-t', '--tconv', help = "enable automatic conversion to truth value by default. Disadvised, since it will result in a conversion for each boolean. Preferably use __pragma__ ('tconv') and __pragma__ (\'notconv\') to enable automatic conversion locally", action = 'store_true')
        self.argParser.add_argument ('-u', '--unit', nargs='?', help = "compile to units rather than to monolithic application. Use -u .auto to autogenerate dynamically loadable native JavaScript modules, one per Python module. Use -u .run to generate the loader and the staticcally loadable runtime unit. Use -u .com to generate a statically loadable component unit.")
        self.argParser.add_argument ('-v', '--verbose', help = "show all messages", action = 'store_true')
        self.argParser.add_argument ('-x', '--x', help = "reserved for extended options")
        self.argParser.add_argument ('-xr', '--xreex', help = "re-export all imported names", action = 'store_true')
        self.argParser.add_argument ('-xg', '--xglobs', help = "allow use of the 'globals' function", action = 'store_true')
        self.argParser.add_argument ('-xp', '--xpath', nargs = '?', help = "additional module search paths, joined by $, #'s will be replaced by spaces", action="append")
        self.argParser.add_argument ('-xt', '--xtiny', help = "generate tiny version of runtime, a.o. lacking support for implicit and explicit operator overloading. Use only if generated code can be validated, since it will introduce semantic alterations in edge cases", action = 'store_true')
        self.argParser.add_argument ('-*', '--star', help = "Like it? Grow it! Go to GitHub and then click [* Star]", action = 'store_true')

        self.projectOptions = self.argParser.parse_args () .__dict__
        self.__dict__.update (self.projectOptions)

        # Signal invalid switches

        def logAndExit (message):
            log (True, message)
            sys.exit (1)

        invalidCombi = 'Invalid combination of options'

        if not (self.license or self.star or self.source):
            logAndExit (self.argParser.format_usage () .capitalize ())
        elif self.map and self.unit:
            logAndExit ('{}: -m / --map and -u / --unit'.format (invalidCombi))
        elif self.parent and self.unit == '.com':
            logAndExit ('{}: -p / --parent and -u / --unit .com'.format (invalidCombi))
        elif self.parent == '.export' and self.esv and int (self.esv) < 6:
            logAndExit ('{}: -p / --parent .export and -e / --esv < 6'.format (invalidCombi))
        elif self.unit == '.auto' and self.esv and int (self.esv) < 6:
            logAndExit ('{}: -u / --unit .auto and -e / --esv < 6'.format (invalidCombi))

        # Set dependent switches

        # (for future use)

        # Correcting line counts for source map

        global extraLines
        extraLines = [
            # Make identifier __pragma__ known to static checker
            # It was only known in JavaScript from __core__.js, which the checker doesn't see
            # __ pragma__ ('<all>') in JavaScript requires it to remain a function, as it was in the core
            # It can't be skipped, since it has to precede __pragma__ ('skip'), to make the checker accept that
            'def __pragma__ (): pass',

            # Make __include__ known to the static checker
            '__pragma__ (\'skip\')',
            '__new__ = __include__ = 0',
            '__pragma__ (\'noskip\')',
            ''
        ] if commandArgs.dcheck else []
        global nrOfExtraLines
        nrOfExtraLines = max (len (extraLines) - 1, 0)  # Last line only serves to force linefeed
        extraLines = '\n'.join (extraLines)

commandArgs = CommandArgs ()

def create (path, binary = False):
    for i in range (10):
        try:
            os.makedirs (os.path.dirname (path), exist_ok = True)

            if binary:
                return open (path, 'wb')
            else:
                return open (path, 'w', encoding = 'utf-8')

            if i > 0:
                log (True, f'Created {path} at attempt {i + 1}')

        except:
            time.sleep (0.5)
    else:
        raise Error (f'Failed to create {path}')


def tryRemove (filePath):
    try:
        os.remove (filePath)
    except:
        pass

def formatted (*args):  # args [0] is string, args [1 : ] are format params
    try:
        return str (args [0]) .format (*args [1 : ])
    except IndexError:  # Tuple index out of range in format tuple
        return ' '.join (args)

logFileName = 'transcrypt.log'  # ... Use envir.transpiler_name

try:
    os.remove (logFileName)
except: # Assume logfile doesn't yet exist
    pass

def log (always, *args):
    if always or commandArgs.verbose:
        print (formatted (*args), end = '')
        try:
            if commandArgs.dlog:
                with open (logFileName, 'a') as logFile:
                    logFile.write (formatted (*args))

        except: # Assume too early, commandArgs not yet set
            pass

program = None
def setProgram (aProgram):
    global program
    program = aProgram

class Error (Exception):
    # First error encountered counts, for all fields, because it's closest to the cause of trouble
    # One error at a time, just like Python, clear and simple
    # The error object contains the import trail, the error line number and the error message

    def __init__ (self, lineNr = 0, message = ''):
        self.lineNr = lineNr - nrOfExtraLines
        self.message = message
        # The name of the module and of its import trail is known from the import stack, so no need to pass it as a parameter

    def set (self, lineNr = 0, message = ''):
        if not self.lineNr:
            self.lineNr = lineNr - nrOfExtraLines

        if not self.message:
            self.message = message

    def __str__ (self):
        result = 'Error while compiling (offending file last):'

        # Successively report each module in the import trail, "oldest" first, except the one that caused the error
        for importRecord in program.importStack [ : -1]:
            try:
                sourcePath = importRecord [0] .sourcePath
            except:
                sourcePath = '<unknown>'
            result += '\n\tFile \'{}\', line {}, at import of:'.format (sourcePath, importRecord [1])

        # After that, report the module and line that caused the error
#        result += '\n\tFile \'{}\', line {}, namely:'.format (str (program.importStack [-1][0] .sourcePath), self.lineNr)
        result += '\n\tFile \'{}\', line {}, namely:'.format (str (program.importStack [-1][0] .name), self.lineNr)

        # And, lastly, report the error message
        result += '\n\t{}'.format (self.message)
        return result

def enhanceException (exception, **kwargs):
    # If not all required info, such as a line number, is available at the location where the exception was raised,
    # it is enhanced later on by adding this missing info at the earliest occasion

    if isinstance (exception, Error):
        exception.set (**kwargs)
        result = exception
    else:
        result = Error (**kwargs)

    if commandArgs.dextex:
        print ('''
    Exception of class {0} enhanced at:
        file: {1}
        function: {3}
        line: {2}
        context: {4}
        kwargs: {5}
        result: {6}
    '''.format (exception.__class__, *inspect.stack () [1][1:-1], kwargs, result))

    raise result from None

def digestJavascript (code, symbols, mayStripComments, mayRemoveAnnotations, refuseIfAppearsMinified = False):
    '''
    - Honor ifdefs
    - Strip comments if allowed by command line switch AND indicated by pragma
    - Harvest import and export info
    '''

    if refuseIfAppearsMinified and code [0] != '/':
        return None

    stripComments = False

    def stripSingleLineComments (line):
        pos = line.find ('//')
        return (line if pos < 0 else line [ : pos]) .rstrip ()

    passStack = []

    def passable (targetLine):
        # Has to count, since comments may be inside ifdefs

        nonlocal stripComments

        def __pragma__ (name, *args):   # Will be called below by executing the stripped line of source code

            nonlocal stripComments

            if name == 'stripcomments':
                stripComments = mayStripComments
            if name == 'ifdef':
                passStack.append (args [0] in symbols)
            elif name == 'ifndef':
                passStack.append (not args [0] in symbols)
            elif name == 'else':
                passStack [-1] = not passStack [-1]
            elif name == 'endif':
                passStack.pop ()

        strippedLine = targetLine.lstrip ()
        if stripComments and strippedLine.startswith ('/*'):
            passStack.append (False)
            return all (passStack)      # So skip this line
        elif stripComments and strippedLine.endswith ('*/'):
            passStack.pop ()            # Possibly pass next line
        elif strippedLine.startswith ('__pragma__') and (
            'stripcomments' in strippedLine or
            'ifdef' in strippedLine or
            'ifndef' in strippedLine or
            'else' in strippedLine or
            'endif' in strippedLine
        ):
            exec (strippedLine)         # Executes local function __pragma__ above during compilation
            return False                # Skip line anyhow, independent of passStack
        else:
            return all (passStack)      # Skip line only if not in passing state according to passStack

    passableLines = [line for line in code.split ('\n') if passable (line)]

    if stripComments:
        passableLines = [commentlessLine for commentlessLine in [stripSingleLineComments (line) for line in passableLines] if commentlessLine]

    result = Any (
        digestedCode = '\n'.join (passableLines),
        nrOfLines = len (passableLines),
        exportedNames = [],
        importedModuleNames = []
    )

    namesPattern = re.compile ('({.*})')
    pathPattern = re.compile ('([\'|\"].*[\'|\"])')
    wordPattern = re.compile (r'[\w/*$]+')  # /S matches too much, e.g. { and }  ??? Is this OK in all cases? Scrutinize code below...
    for line in passableLines:
        words = wordPattern.findall (line)

        if words:
            if mayRemoveAnnotations and words [0] == '/*':  # If line starts with an annotation
                words = words [3 : ]                        # Remove the annotation before looking for export / import keywords

            if words:
                if words [0] == 'export':
                    # Deducing exported names from JavaScript is needed to facilitate * import by other modules

                    if words [1] in {'var', 'function'}:
                        # Export prefix:    "export var ... or export function ..."

                        result.exportedNames.append (words [2])
                    else:
                        # Transit export:   "export {p, q, r, s};"

                        # Find exported names as "{p, q, r, s}"
                        match = namesPattern.search (line)

                        # Substitute to become "{'p', 'q', 'r', 's'}" and use that set to extend the exported names list
                        if match:
                            result.exportedNames.extend (eval (wordPattern.sub (lambda nameMatch: f'\'{nameMatch.group ()}\'', match.group (1))))

                elif words [0] == 'import':
                    # Deducing imported modules from JavaScript is needed to provide the right modules to JavaScript-only modules
                    # They may have an explicit import list for unqualified access or an import * for qualified access
                    # In both cases only the path of the imported module is needed, to be able to provide that module
                    # It can be a path without extension, allowing both .py and .js files as imported modules
                    #
                    # - Unqualified import:   "import {p, q as Q, r, s as S} from '<relative module path>'"
                    # - Qualified import:     "import * from '<relative module path>'"

                    match = pathPattern.search (line)
                    if match:
                        result.importedModuleNames.append (eval (match.group (1)) [2:-3])

    return result
