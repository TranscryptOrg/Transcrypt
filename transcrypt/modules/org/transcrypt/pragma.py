import ast
import shlex
import subprocess
import tokenize
import traceback


#########################################
###  Pragma function registry

registry = {}

def pragma_handler(key):
    '''Decorator to add a function to the pragma registry'''
    def inner(f):
        registry[key] = f
        return f
    return inner
    
def lookup_pragma_handler(key):
    return registry.get(key)
    
    
###################################   
###  Built-in pragma functions

@pragma_handler('alias')    
def alias(generator, node):
    generator.aliasers.insert (0, generator.getAliaser (node.args [1] .s, node.args [2].s))
    
@pragma_handler('noalias')    
def noalias(generator, node):
    if len (node.args) == 1:
        generator.aliasers = []
    else:
        for index in reversed (range (len (generator.aliasers))):
            if generator.aliasers [index][0] == node.args [1] .s:
                generator.aliasers.pop (index)

@pragma_handler('noanno')    
def noanno(generator, node):
    generator.allowDebugMap = False

@pragma_handler('fcall')    
def fcall(generator, node):
    generator.allowMemoizeCalls = True

@pragma_handler('nofcall')    
def nofcall(generator, node):
    generator.allowMemoizeCalls = False

@pragma_handler('docat')    
def docat(generator, node):
    generator.allowDocAttribs = True

@pragma_handler('nodocat')    
def nodocat(generator, node):
    generator.allowDocAttribs = False

@pragma_handler('iconv')    
def iconv(generator, node):                 # Automatic conversion to iterable supported
    generator.allowConversionToIterable = True

@pragma_handler('noiconv')    
def noiconv(generator, node):               # Automatic conversion to iterable not supported
    generator.allowConversionToIterable = False

@pragma_handler('jsiter')    
def jsiter(generator, node):                # Translate for ... in ... : ... literally to for (... in ...) {...},
    generator.allowJavaScriptIter = True    # to enable iterating JavaScript objects that are not dicts

@pragma_handler('nojsiter')    
def nojsiter(generator, node):              # Dictionary keys without quotes are identifiers
    generator.allowJavaScriptIter = False

@pragma_handler('jskeys')    
def jskeys(generator, node):                # Dictionary keys without quotes are string literals
    generator.allowJavaScriptKeys = True

@pragma_handler('nojskeys')    
def nojskeys(generator, node):              # Dictionary keys without quotes are identifiers
    generator.allowJavaScriptKeys = False

@pragma_handler('jsmod')    
def jsmod(generator, node):                 # % has JavaScript behaviour
    generator.allowJavaScriptMod = True

@pragma_handler('nojsmod')    
def nojsmod(generator, node):               # % has Python behaviour
    generator.allowJavaScriptMod = False

@pragma_handler('gsend')    
def gsend(generator, node):                 # Replace send by next.value
    generator.replaceSend = True

@pragma_handler('nogsend')    
def nogsend(generator, node):               # Don't replace send by next.value
    generator.replaceSend = False

@pragma_handler('tconv')    
def tconv(generator, node):                 # Automatic conversion to truth value supported
    generator.allowConversionToTruthValue = True

@pragma_handler('notconv')    
def notconv(generator, node):               # Automatic conversion to truth value not supported
    generator.allowConversionToTruthValue = False

@pragma_handler('js')    
def js(generator, node):                    # Include JavaScript code literally in the output
    def include (fileName):
        searchedIncludePaths = []
        for searchDir in self.module.program.moduleSearchDirs:
            filePath = '{}/{}'.format (searchDir, fileName)
            if os.path.isfile (filePath):
                return tokenize.open (filePath) .read ()
            else:
                searchedIncludePaths.append (filePath)
        else:
            raise utils.Error (
                lineNr = self.lineNr,
                message = '\n\tAttempt to include file: {}\n\tCan\'t find any of:\n\t\t{}\n'.format (
                    node.args [0], '\n\t\t'. join (searchedIncludePaths)
                )
            )
    code = node.args [1] .s.format (* [
        eval (
            compile (
                ast.Expression (arg),       # Code to compile (can be AST or source)
                '<string>',                 # Not read from a file
                'eval'                      # Code is an expression, namely __include__  (<fileName>) in most cases
            ),
            {},
            {'__include__': include}
        )
        for arg in node.args [2:]
    ])
    for line in code.split ('\n'):
        generator.emit ('{}\n', line)

@pragma_handler('xtrans')                   # Include code transpiled by external process in the output  
def xtrans(generator, node):
    def include (fileName):                 # same code as include in previous pramga - should probably be refactored
        searchedIncludePaths = []
        for searchDir in self.module.program.moduleSearchDirs:
            filePath = '{}/{}'.format (searchDir, fileName)
            if os.path.isfile (filePath):
                return tokenize.open (filePath) .read ()
            else:
                searchedIncludePaths.append (filePath)
        else:
            raise utils.Error (
                lineNr = self.lineNr,
                message = '\n\tAttempt to include file: {}\n\tCan\'t find any of:\n\t\t{}\n'.format (
                    node.args [0], '\n\t\t'. join (searchedIncludePaths)
                )
            )
    try:
        sourceCode = node.args [2] .s.format (* [
            eval (
                compile (
                    ast.Expression (arg),   # Code to compile (can be AST or source)
                    '<string>',             # Not read from a file
                    'eval'                  # Code is an expression, namely __include__  (<fileName>) in most cases
                ),
                {},
                {'__include__': include}
            )
            for arg in node.args [3:]
        ])
        workDir = '.'
        for keyword in node.keywords:
            if keyword.arg == 'cwd':
                workDir = keyword.value.s
        process = subprocess.Popen (
            shlex.split(node.args [1] .s),
            stdin = subprocess.PIPE,
            stdout = subprocess.PIPE,
            stderr = subprocess.PIPE,
            cwd = workDir
        )
        process.stdin.write ((sourceCode).encode ('utf8'))
        process.stdin.close ()
        while process.returncode is None:
            process.poll ()
        if process.returncode != 0:
            raise Exception(process.stderr.read (). decode ('utf8'))
        targetCode = process.stdout.read (). decode ('utf8'). replace ('\r\n', '\n').strip()
        for line in targetCode.split ('\n'):
            generator.emit ('{}\n', line)
    except Exception as e:
        print (e)
        print (traceback.format_exc ())
    
@pragma_handler('kwargs')    
def kwargs(generator, node):            # Start emitting kwargs code for FunctionDef's
    generator.allowKeywordArgs = True

@pragma_handler('nokwargs')    
def nokwargs(generator, node):            # Stop emitting kwargs code for FunctionDef's
    generator.allowKeywordArgs = False

@pragma_handler('opov')    
def opov(generator, node):            # Overloading of a small sane subset of operators allowed
    generator.allowOperatorOverloading = True

@pragma_handler('noopov')    
def noopov(generator, node):            # Operloading of a small sane subset of operators disallowed
    generator.allowOperatorOverloading = False
    
@pragma_handler('redirect')    
def redirect(generator, node):
    if node.args [1] .s == 'stdout':
        generator.emit ('__stdout__ = \'{}\'', node.args [2])

@pragma_handler('noredirect')    
def noredirect(generator, node):
    if node.args [1] .s == 'stdout':
        generator.emit ('__stdout__ = \'__console__\'')
        
@pragma_handler('skip')    
@pragma_handler('noskip')    
@pragma_handler('ifdef')    
@pragma_handler('ifndef')    
@pragma_handler('else')    
@pragma_handler('endif')    
def no_op(generator, node):
    pass                                # Easier dealth with on statement / expression level in generator.visit
    
@pragma_handler('xpath')    
def xpath(generator, node):
    generator.module.program.moduleSearchDirs [1 : 1] = [elt.s for elt in node.args [1] .elts]
    


    
