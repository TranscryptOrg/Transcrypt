import os
import sys
import argparse
import inspect

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
        self.argParser.add_argument ('-b', '--build', help = "rebuild all target files from scratch", action = 'store_true')
        self.argParser.add_argument ('-c', '--complex', help = "enable complex number support, locally requires operator overloading", action = 'store_true')
        self.argParser.add_argument ('-d', '--docat', help = "enable __doc__ attributes. Apply sparsely, since it will make docstrings part of the generated code", action = 'store_true')
        self.argParser.add_argument ('-dc', '--dcheck', help = "debug: perform lightweight consistency check", action = 'store_true')
        self.argParser.add_argument ('-da', '--dassert', help = "debug: activate assertions", action = 'store_true')
        self.argParser.add_argument ('-de', '--dextex', help = "debug: show extended exception reports", action = 'store_true')
        self.argParser.add_argument ('-dm', '--dmap', help = "debug: dump human readable source map", action = 'store_true')
        self.argParser.add_argument ('-dt', '--dtree', help = "debug: dump syntax tree", action = 'store_true')
        self.argParser.add_argument ('-ds', '--dstat', help = "debug: validate static typing using annotations", action = 'store_true')
        self.argParser.add_argument ('-e', '--esv', nargs='?', help = "ecma script version of generated code, default = 5. The symbol __esv<versionnr>__ is added to the global symbol list, e.g. __esv6__.")
        self.argParser.add_argument ('-f', '--fcall', help = "enable fastcall mechanism by default. You can also use __pragma__ ('fcal') and __pragma__ (\'nofcall\')", action = 'store_true')
        self.argParser.add_argument ('-g', '--gen', help = "enable generators and iterators. Disadvised, since it will result in a function call for each loop iteration. Preferably use __pragma__ ('gen') and __pragma__ ('nogen')", action = 'store_true')
        self.argParser.add_argument ('-i', '--iconv', help = "enable automatic conversion to iterable by default. Disadvised, since it will result in a type check for each for-loop. Preferably use __pragma__ ('iconv') and __pragma__ (\'noiconv\') to enable automatic conversion locally", action = 'store_true')
        self.argParser.add_argument ('-jk', '--jskeys', help = "interpret {key: 'value'} as {'key': 'value'} and forbid {key (): 'value'}, as JavaScript does. Disadvised, since it's less flexible than the Python interpretation. Either follow Python semantics by using {'key': 'value'} explicitly if you want literal keys or use __pragma__ ('jskeys') and __pragma__ ('nojskeys') locally instead to make clear local deviation from Python semantics", action = 'store_true')
        self.argParser.add_argument ('-jm', '--jsmod', help = "give %% and %%= JavaScript rather than Python behaviour. Disadvised, since it deviates from the mathematical 'modulo' operator. Either follow Python semantics or use __pragma__ ('jskeys') and __pragma__ ('nojskeys') locally instead to make clear local deviation.", action = 'store_true')
        self.argParser.add_argument ('-k', '--kwargs', help = "enable keyword arguments by default. In general this is disadvised, use __pragma__ ('kwargs') and __pragma__('nokwargs') locally instead to prevent bloated code", action = 'store_true')
        self.argParser.add_argument ('-l', '--license', help = "show license", action = 'store_true')
        self.argParser.add_argument ('-m', '--map', help = "generate source map", action = 'store_true')
        self.argParser.add_argument ('-n', '--nomin', help = "no minification", action = 'store_true')
        self.argParser.add_argument ('-o', '--opov', help = "enable operator overloading by default. In general this is disadvised, use __pragma__ ('opov') and __pragma__('noopov') locally instead to prevent slow code", action = 'store_true')
        self.argParser.add_argument ('-p', '--parent', nargs='?', help = "object that will hold module, default is window. Use -p .none to generate orphan module, e.g. for use in node.js. Use -p .user to generate module that has to be explicitly initialized by calling <modulename> (), e.g. after the full page has loaded")
        self.argParser.add_argument ('-r', '--run', help = "run source file rather than compiling it", action = 'store_true')
        self.argParser.add_argument ('-s', '--symbols', nargs='?', help = "names, joined by $, separately passed to main module in __symbols__ variable")
        self.argParser.add_argument ('-t', '--tconv', help = "enable automatic conversion to truth value by default. Disadvised, since it will result in a conversion for each boolean. Preferably use __pragma__ ('tconv') and __pragma__ (\'notconv\') to enable automatic conversion locally", action = 'store_true')
        self.argParser.add_argument ('-v', '--verbose', help = "show all messages", action = 'store_true')
        self.argParser.add_argument ('-x', '--ext', help = "reserved for extended options")
        self.argParser.add_argument ('-*', '--star', help = "Like it? Grow it! Go to GitHub and then click [* Star]", action = 'store_true')
        
        self.__dict__.update (self.argParser.parse_args () .__dict__)
        
        if not (self.license or self.star or self.source):
            log (True,  self.argParser.format_usage () .capitalize ())
            sys.exit (1)

        global extraLines
        extraLines = [
            # Make identifier __pragma__ known to static checker
            # It was only known in JavaScript from __core__.mod.js, which the checker doesn't see
            # __pragma__ ('<all>') in JavaScript requires it to remain a function, as it was in the core
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
    
def create (path):
    os.makedirs (os.path.dirname (path), exist_ok = True)
    return open (path, 'w', encoding = 'utf-8')
    
def formatted (*args):  # args [0] is string, args [1 : ] are format params
    try:
        return str (args [0]) .format (*args [1 : ])
    except IndexError:  # Tuple index out of range in format tuple
        return ' '.join (args)
                
def log (always, *args):
    if always or commandArgs.verbose:
        print (formatted (*args), end = '')
         
program = None
def setProgram (aProgram):
    global program
    program = aProgram
         
class Error (Exception):
    def __init__ (self, lineNr = 0, message = ''):
        self.lineNr = lineNr - nrOfExtraLines
        self.message = message  

    # First one encountered counts, for all fields, because it's closest to the error
    # One error at a time, just like Python, clear and simple
    
    def set (self, lineNr = 0, message = ''):          
        if not self.lineNr:
            self.lineNr = lineNr - nrOfExtraLines
            
        if not self.message:
            self.message = message
            
    def __str__ (self):
        result = 'Error while compiling (offending file last):'
        for importRecord in program.importStack [ : -1]:
            result += '\n\tFile \'{}\', line {}, at import of:'.format (importRecord [0] .sourcePath, importRecord [1])
        result += '\n\tFile \'{}\', line {}, namely:'.format (program.importStack [-1][0] .sourcePath, self.lineNr)
        result += '\n\t{}'.format (self.message)
        return result
        
def enhanceException (exception, **kwargs):
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

    raise result
    