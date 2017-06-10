# ====== Legal notices
#
# Copyright 2014, 2015, 2016, 2017 Jacques de Hooge, GEATEC engineering, www.geatec.com
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import os
import os.path
import sys
import tokenize
import ast
import re
import copy
import datetime
import math
import traceback
import io

from org.transcrypt import __base__, utils, sourcemaps, minify, static_check, type_check

class ModuleMetadata:
    def __init__ (self, program, name):
        self.name = name
        searchedModulePaths = []
        for searchDir in program.moduleSearchDirs:
            relPrepath = self.name.replace ('.', '/')
            prepath = '{}/{}'.format (searchDir, relPrepath)
            self.isDir = os.path.isdir (prepath)

            if self.isDir:
                self.sourceDir = prepath
                self.filePrename = '__init__'
            else:
                self.sourceDir, self.filePrename = prepath.rsplit ('/', 1)

            self.targetDir = '{}/{}'.format (self.sourceDir, __base__.__envir__.target_subdir)
            self.targetPath = '{}/{}.mod.js'.format (self.targetDir, self.filePrename)

            self.sourcePath = '{}/{}.py' .format (self.sourceDir, self.filePrename)
            searchedModulePaths += [self.sourcePath, self.targetPath]

            if not os.path.isfile (self.sourcePath):
                self.sourcePath = self.targetPath   # For a Javascript-only module, source and target are the same and a source map can be faked

            self.extraSubdir = 'extra'
            self.treePath = '{}/{}/{}.mod.tree'.format (self.targetDir, self.extraSubdir, self.filePrename)
            
            if (os.path.isfile (self.sourcePath)):
                break;
        else:
            # If even the target can't be loaded then there's a problem with this module, root or not
            raise utils.Error (
                message = (
                    '\n\tAttempt to import module: {}'.format (self.name) +
                    '\n\tCan\'t find any of:\n\t\t{}\n'.format ('\n\t\t'. join (searchedModulePaths))
                )
            )

    def sourceExists (self):
        return os.path.isfile (self.sourcePath)

    def targetExists (self):
        return os.path.isfile (self.targetPath)

    def exists (self):
        return self.sourceExists () or self.targetExists ()

    def dirty (self):
        # Javascript-only modules are never dirty (so don't try to parse and compile Javascript)
        if self.targetPath == self.sourcePath:
            return False

        # Find youngest of .py and .js files and use that as "original"
        youngestTime = 0
        youngestPath = None
        for path in self.targetPath, self.sourcePath:                   # Order matters
            if os.path.isfile (path):
                pathTime = os.path.getmtime (path)
                if utils.commandArgs.build or pathTime > youngestTime:  # Builds correctly also if some source files are missing
                    youngestTime = pathTime
                    youngestPath = path

        return youngestPath == self.sourcePath

class Program:
    def __init__ (self, moduleSearchDirs, symbols):
        utils.setProgram (self)
    
        self.moduleSearchDirs = moduleSearchDirs
        self.symbols = symbols

        self.pythonVersion = sys.version_info [0] + 0.1 * sys.version_info [1]

        if utils.commandArgs.esv == None:
            self.javaScriptVersion = utils.defaultJavaScriptVersion
        else:
            self.javaScriptVersion = int (utils.commandArgs.esv)

        self.rawModuleCaption = '\n\n// ============ Source: {} ============\n\n' if utils.commandArgs.anno else ''
        self.moduleCaptionSkip = self.rawModuleCaption.count ('\n')

        self.moduleDict = {}
        self.importStack = []   # Enables showing load sequence in case a module cannot be loaded

        # Set paths that don't require the module dict
        self.sourcePath = os.path.abspath (utils.commandArgs.source) .replace ('\\', '/')
        self.sourceDir = '/'.join (self.sourcePath.split ('/') [ : -1])
        self.sourceFileName = self.sourcePath.split ('/') [-1]

        # Define names early, since they are cross-used in module compilation
        prefix = 'org.{}'.format (__base__.__envir__.transpiler_name)
        self.coreModuleName = '{}.{}'.format (prefix, '__core__')
        self.baseModuleName = '{}.{}'.format (prefix, '__base__')
        self.standardModuleName = '{}.{}'.format (prefix, '__standard__')
        self.builtinModuleName = '{}.{}'.format (prefix, '__builtin__')
        self.mainModuleName = self.sourceFileName [ : -3]

        # Compile inline modules
        Module (self, ModuleMetadata (self, self.coreModuleName))
        Module (self, ModuleMetadata (self, self.baseModuleName))
        Module (self, ModuleMetadata (self, self.standardModuleName))
        Module (self, ModuleMetadata (self, self.builtinModuleName))

        # Optionally perfom static typing validation

        if utils.commandArgs.dstat:
            try:
                type_check.run (self.sourcePath)
            except Exception as exception:
                utils.log (True, 'Validating: {} and dependencies\n\tInternal error in static typing validator\n', self.sourcePath)

        # Compile imported modules
        try:
            moduleMetadata = ModuleMetadata (self, self.mainModuleName)
            Module (self, moduleMetadata)   # Compile of main module, will trigger recursive compilation
        except Exception as exception:
            utils.enhanceException (
                exception,
                message = '\n\t{}'.format (str (exception))
            )

        # Set paths that require the module dict
        self.targetPath = '{}/{}.js'.format (self.moduleDict [self.mainModuleName] .metadata.targetDir, self.mainModuleName)
        self.miniTargetPath = '{}/{}.min.js'.format (self.moduleDict [self.mainModuleName] .metadata.targetDir, self.mainModuleName)

        # Set sourcemaps
        if utils.commandArgs.map:
            self.prettyMap = sourcemaps.SourceMap (
                self.moduleDict [self.mainModuleName] .metadata.targetDir,
                '{}.js'.format (self.mainModuleName),
                self.moduleDict [self.mainModuleName] .metadata.extraSubdir,

            )

            if not utils.commandArgs.nomin:
                self.shrinkMap = sourcemaps.SourceMap (
                    self.moduleDict [self.mainModuleName] .metadata.targetDir,
                    '{}.shrink.js'.format (self.mainModuleName),
                    self.moduleDict [self.mainModuleName] .metadata.extraSubdir,
                )

                self.miniMap = sourcemaps.SourceMap (
                    self.moduleDict [self.mainModuleName] .metadata.targetDir,
                    '{}.min.js'.format (self.mainModuleName),
                    self.moduleDict [self.mainModuleName] .metadata.extraSubdir,
                )

        # Round up imported modules
        importedModules = [
            self.moduleDict [moduleName]
            for moduleName in sorted (self.moduleDict)
            if not moduleName in (self.coreModuleName, self.baseModuleName, self.standardModuleName, self.builtinModuleName, self.mainModuleName)
        ]

        # And sandwich them between the in-line modules
        self.allModules = (
            [
                self.moduleDict [self.coreModuleName],
                self.moduleDict [self.baseModuleName],
                self.moduleDict [self.standardModuleName],
                self.moduleDict [self.builtinModuleName]
            ] +
            importedModules +
            [self.moduleDict [self.mainModuleName]]
        )

        # Encapsulate target code for all modules
        header = '"use strict";\n// {}\'ed from Python, {}\n'.format (
            __base__.__envir__.transpiler_name.capitalize (), datetime.datetime.now ().strftime ('%Y-%m-%d %H:%M:%S'),
        )

        if utils.commandArgs.parent == '.none':
            initializer = '{0} ();\n' .format (self.mainModuleName)
        elif utils.commandArgs.parent == '.user':
            initializer = ''
        else:
            if utils.commandArgs.parent == None:
                parent = 'window'
            else:
                parent = utils.commandArgs.parent

            initializer =  '{0} [\'{1}\'] = {1} ();\n' .format (parent, self.mainModuleName)

        targetCode = (
            # BEGIN prologue, be sure to adapt sourcemaps.nrOfPadLines if the nr of prologue lines is changed!
            header +
            'function {} () {{\n'.format (self.mainModuleName) +
            '   var __symbols__ = {};\n'.format (self.symbols) +
            # END prologue
            ''.join ([module.getModuleCaption () + module.targetCode for module in self.allModules]) +
            '   return __all__;\n' +
            '}\n' +
            initializer
        )

        # Write encapsulated target code
        utils.log (True, 'Saving result in: {}\n', self.targetPath)
        with utils.create (self.targetPath) as aFile:
            aFile.write (targetCode)

            if utils.commandArgs.map:
                aFile.write (self.prettyMap.mapRef)

        # Join and save source maps
        if utils.commandArgs.map:
            utils.log (False, 'Saving single-level sourcemap in: {}\n', self.prettyMap.mapPath)
            self.prettyMap.concatenate ([module.modMap for module in self.allModules], self.moduleCaptionSkip)
            self.prettyMap.save ()

        # Minify
        if not utils.commandArgs.nomin:
            utils.log (True, 'Saving minified result in: {}\n', self.miniTargetPath)
            minify.run (self.targetPath, self.miniTargetPath, self.shrinkMap.mapPath if utils.commandArgs.map else None, 6) # Minifier has to accept JavaScript 6 input code, it is there in the autotest, even if not executed.
            if utils.commandArgs.map:
                utils.log (False, 'Saving multi-level sourcemap in: {}\n', self.miniMap.mapPath)
                self.shrinkMap.load ()
                self.prettyMap.cascade (self.shrinkMap, self.miniMap)
                self.miniMap.save ()

                with open (self.miniTargetPath, 'a') as miniFile:
                    miniFile.write (self.miniMap.mapRef)

    def provide (self, moduleName):
        if moduleName == '__main__':
            moduleName = self.mainModuleName

        moduleMetadata = ModuleMetadata (self, moduleName)

        if moduleMetadata.name in self.moduleDict:  # Find out if module is already provided
            return self.moduleDict [moduleMetadata.name]
        else:                                       # If not, provide by loading or compiling
            return Module (self, moduleMetadata)

class Module:
    def __init__ (self, program, moduleMetadata):
        self.program = program
        self.metadata = moduleMetadata  # May contain dots if it's imported
        self.program.moduleDict [self.metadata.name] = self

        # Names of module being under compilation and line nrs of current import
        # Used for error reports
        # Note that JavaScript-only modules will leave lineNr None if they import something
        # This is since there's no explicit import location in such modules
        self.program.importStack.append ([self.metadata, None])
                
        # Set sourcemap
        if utils.commandArgs.map:
            self.modMap = sourcemaps.SourceMap (
                self.metadata.targetDir,
                '{}.mod.js'.format (self.metadata.name),
                self.metadata.extraSubdir
            )

        if self.metadata.dirty ():
            self.parse ()
            if utils.commandArgs.dcheck:
                try:
                    static_check.run (self.metadata.sourcePath, self.parseTree)
                except Exception as exception:
                    utils.log (True, 'Checking: {}\n\tInternal error in lightweight consistency checker, remainder of module skipped\n', self.metadata.sourcePath)

            if utils.commandArgs.dtree:
                self.dumpTree ()

            self.generateJavascriptAndMap ()
            self.extractPropertiesFromJavascript ()
        else:
            self.loadJavascript ()
            self.extractPropertiesFromJavascript ()

            if utils.commandArgs.map:
                self.modMap.loadOrFake (self.metadata.sourcePath, self.nrOfTargetLines)
                
        self.program.importStack.pop ()

    def getModuleCaption (self):
        return self.program.rawModuleCaption.format (self.metadata.sourcePath) if utils.commandArgs.anno else ''

    def parse (self):
        def pragmasFromComments (sourceCode):
            # This function changes rather than regenerates the sourcecode, since tokenize/untokenize will mess up formatting
        
            tokens = tokenize.tokenize (io.BytesIO (sourceCode.encode ('utf-8')) .readline)
            pragmaCommentLineIndices = []
            for tokenType, tokenString, startRowColumn, endRowColumn, logicalLine in tokens:
                if tokenType == tokenize.COMMENT and tokenString [1 : ] .lstrip () .startswith ('__pragma__'):
                    pragmaCommentLineIndices.append (startRowColumn [0] - 1)
                    
            sourceLines = sourceCode.split ('\n') 
            for pragmaCommentLineIndex in pragmaCommentLineIndices:
                head, separator, tail = sourceLines [pragmaCommentLineIndex] .partition ('#')
                sourceLines [pragmaCommentLineIndex] = head + tail.lstrip ()

            return '\n'.join (sourceLines)
            
        try:
            utils.log (False, 'Parsing module: {}\n', self.metadata.sourcePath)

            with tokenize.open (self.metadata.sourcePath) as sourceFile:
                self.sourceCode = utils.extraLines + sourceFile.read ()
                
            self.parseTree = ast.parse (pragmasFromComments (self.sourceCode))
        except SyntaxError as syntaxError:
            utils.enhanceException (
                syntaxError,
                lineNr = syntaxError.lineno,
                message = (
                        '\n\t{} <SYNTAX FAULT] {}'.format (
                            syntaxError.text [:syntaxError.offset].lstrip (),
                            syntaxError.text [syntaxError.offset:].rstrip ()
                        )
                    if syntaxError.text else
                        syntaxError.args [0]
                )
            )

    def dumpTree (self):
        utils.log (False, 'Dumping syntax tree for module: {}\n', self.metadata.sourcePath)

        def walk (name, value, tabLevel):
            self.treeFragments .append ('\n{0}{1}: {2} '.format (tabLevel * '\t', name, type (value).__name__ ))
            if isinstance (value, ast.AST):
                for field in ast.iter_fields (value):
                    walk (field [0], field [1], tabLevel + 1)
            elif isinstance (value, list):
                for element in value:
                    walk ('element', element, tabLevel + 1)
            else:
                self.treeFragments.append ('= {0}'.format (value))

        self.treeFragments = []
        walk ('file', self.parseTree, 0)
        self.textTree = ''.join (self.treeFragments) [1:]

        with utils.create (self.metadata.treePath) as treeFile:
            treeFile.write (self.textTree)

    def loadJavascript (self):
        def strip (code, symbols):
            loading = True

            def loadable (targetLine):
                nonlocal loading

                def __pragma__ (name, *args):
                    nonlocal loading

                    if name == 'ifdef':
                        loading = args [0] in symbols
                    elif name == 'ifndef':
                        loading = not args [0] in symbols
                    elif name == 'else':
                        loading = not loading
                    elif name == 'endif':
                        loading = True

                strippedLine = targetLine.lstrip ()
                if strippedLine.startswith ('__pragma__') and (
                    'ifdef' in strippedLine or
                    'ifndef' in strippedLine or
                    'else' in strippedLine or
                    'endif' in strippedLine
                ):
                    exec (strippedLine)
                    return False    # Skip line anyhow
                else:
                    return loading  # Skip line only if not in loading state

            loadableLines = [line for line in code.split ('\n') if loadable (line)]
            return '\n'.join (loadableLines)

        with open (self.metadata.targetPath) as targetFile:
            self.targetCode = strip (targetFile.read (), self.program.symbols)

    def generateJavascriptAndMap (self):
        utils.log (False, 'Generating code for module: {}\n', self.metadata.targetPath)

        generator = Generator (self)

        if utils.commandArgs.map or utils.commandArgs.anno:             # In both cases the generator will have instrumented the target fragments by appending line numbers
                                                                        # N.B. __pragma__ ('noanno') will be too late to prevent instrumenting of the main module's first line
                                                                        # In that case if no source maps are required either, the appended line numbers simply won't be used
            instrumentedTargetLines = ''.join (generator.targetFragments) .split ('\n')                 # Split joined fragments into lines

            # Split instrumentedTargetLines in (bare) targetLines and sourceLineNrs, skipping empty statements
            targetLines = []

            if utils.commandArgs.map:
                self.sourceLineNrs = []                                                                 # Only needed for source maps, not for annotations

            for targetLine in instrumentedTargetLines:
                sourceLineNrString = targetLine [-sourcemaps.lineNrLength : ]                           # Take the appended line number, e.g. the string '000014'
                sourceLineNr = int ('1' + sourceLineNrString) - sourcemaps.maxNrOfSourceLinesPerModule  # Turn it into an integer, e.g. 14

                targetLine = targetLine [ : -sourcemaps.lineNrLength]                                   # Obtain non-instrumented line by removing the appended line number

                # Only append non-emptpy statements and their number info
                if targetLine.strip () != ';':                                                          # If the non-instrumented line isn't empty
                    if generator.allowDebugMap:                                                         # If annotations comments have to be prepended
                        targetLine = '/* {} */ {}'.format (sourceLineNrString, targetLine)              # Prepend them

                    targetLines.append (targetLine)                                                     # Add the target line, with or without prepended annotation commend

                    if utils.commandArgs.map:
                        self.sourceLineNrs.append (sourceLineNr)                                        # Remember its line number to be able to generate a sourcemap

            # Generate per module sourcemap and copy sourcefile
            if utils.commandArgs.map:
                utils.log (False, 'Generating source map for module: {}\n', self.metadata.sourcePath)
                self.modMap.generate (self.metadata.sourcePath, self.sourceLineNrs)
                self.modMap.save ()
        else:                                                           # No maps needed, so this 'no stripping' shortcut for speed
            targetLines = [line for line in  ''.join (generator.targetFragments) .split ('\n') if line.strip () != ';']

        # Join and save module code
        self.targetCode = '\n'.join (targetLines)
        with utils.create (self.metadata.targetPath) as aFile:
            aFile.write (self.targetCode)

    def extractPropertiesFromJavascript (self):
        def removeLineNrs (clause):
            if utils.commandArgs.anno:
                return re.sub ('/\* {} \*/'.format (sourcemaps.lineNrLength * '\d'), '', clause)
            else:
                return clause

        utils.log (False, 'Extracting module properties from: {}\n', self.metadata.targetPath)

        useClause = removeLineNrs (self.targetCode [self.targetCode.rfind ('<use>') : self.targetCode.rfind ('</use>')])
        self.use = sorted (set ([
            word
            for word in useClause.replace ('__pragma__', ' ') .replace ('(', ' ') .replace (')', ' ') .replace ('\'', ' ') .replace ('+', ' ') .split ()
            if not word.startswith ('<')
        ]))
        for moduleName in self.use:
            self.program.provide (moduleName)

        allClause = removeLineNrs (self.targetCode [self.targetCode.rfind ('<all>') : self.targetCode.rfind ('</all>')])
        self.all = sorted (set ([
            word [1 : ]
            for word in allClause.replace ('__all__', ' ') .replace ('=', ' ') .split ()
            if word.startswith ('.')
        ]))

        if utils.commandArgs.map:
            self.nrOfTargetLines = self.targetCode.count ('\n') + 1

class Scope:
    def __init__ (self, node):
        self.node = node
        self.nonlocals = set ()
        self.containsYield = False

class Generator (ast.NodeVisitor):
# Terms like parent, child, ancestor and descendant refer to the parse tree here, not to inheritance

    def __init__ (self, module):
        self.module = module

        self.targetFragments = []
        self.indentLevel = 0
        self.scopes = []
        self.use = set ()
        self.all = set ()
        self.importHeads = set ()
        self.docString = None
        self.docStringEmitted = False
        self.lineNr = 1

        self.aliasers = [self.getAliaser (*alias) for alias in (
# START predef_aliases

            # Format: ('<Python source identifier>', '<JavaScript target identifier>')

                                                    ('js_and', 'and'),
            ('arguments', 'py_arguments'),          ('js_arguments', 'arguments'),
            ('case', 'py_case'),
            ('clear', 'py_clear'),                  ('js_clear', 'clear'),
            ('default', 'py_default'),
            ('del', 'py_del'),                      ('js_del', 'del'),
            ('false', 'py_false'),
                                                    ('js_from', 'from'),
            ('get', 'py_get'),                      ('js_get', 'get'),
                                                    ('js_global', 'global'),
            ('Infinity', 'py_Infinity'),            ('js_Infinity', 'Infinity'),
            ('isNaN', 'py_isNaN'),                  ('js_isNaN', 'isNaN'),
            ('iter', 'py_iter'),                    ('js_iter', 'iter'),
            ('items', 'py_items'),                  ('js_items', 'items'),
            ('keys', 'py_keys'),                    ('js_keys', 'keys'),
            ('name', 'py_name'),                    ('js_name', 'name'),
            ('NaN', 'py_NaN'),                      ('js_NaN', 'NaN'),
            ('new', 'py_new'),
            ('next', 'py_next'),                    ('js_next', 'next'),
                                                    ('js_not', 'not'),
                                                    ('js_or', 'or'),
            ('pop', 'py_pop'),                      ('js_pop', 'pop'),
            ('popitem', 'py_popitem'),              ('js_popitem', 'popitem'),
            ('replace', 'py_replace'),              ('js_replace', 'replace'),
            ('selector', 'py_selector'),            ('js_selector', 'selector'),
            ('sort', 'py_sort'),                    ('js_sort', 'sort'),
            ('split', 'py_split'),                  ('js_split', 'split'),
            ('switch', 'py_switch'),
            ('type', 'py_metatype'),                ('js_type', 'type'),    # Only for the type metaclass, the type operator is dealth with separately in visit_Call
            ('TypeError', 'py_TypeError'),          ('js_TypeError', 'TypeError'),
            ('update', 'py_update'),                ('js_update', 'update'),
            ('values', 'py_values'),                ('js_values', 'values'),
            ('reversed', 'py_reversed'),            ('js_reversed', 'reversed'),
            ('setdefault', 'py_setdefault'),        ('js_setdefault', 'setdefault'),
                                                    ('js_super', 'super'),
            ('true', 'py_true'),
            ('undefined', 'py_undefined'),          ('js_undefined', 'undefined'),

# END predef_aliases
        )]

        self.idFiltering = True

        self.tempIndices = {}
        self.skippedTemps = set ()
        self.stubsName = 'org.{}.stubs.'.format (__base__.__envir__.transpiler_name)

        self.nameConsts = {
            None: 'null',
            True: 'true',
            False: 'false'
        }

        '''
        The precendences explicitly given as integers in the list below are JavaScript precedences as specified by:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence .

        Python precedences are implicitly present in branch ordering of the AST generated by CPython's parser.
        '''

        self.operators = {
            # Highest precendence

            ast.Not: ('!', 16),
            ast.Invert: ('~', 16),
            ast.UAdd: ('+', 16),
            ast.USub: ('-', 16),

            ast.Pow: (None, 15),        # Dealt with separately

            ast.Mult: ('*', 14),
            ast.MatMult: (None, 14),    # Dealt with separately
            ast.Div: ('/', 14),
            ast.FloorDiv: (None, 14),   # Dealt with separately
            ast.Mod: ('%', 14),         # Used only for JavaScript %, which differs from Python %

            ast.Add: ('+', 13),
            ast.Sub: ('-', 13),

            ast.LShift: ('<<', 12),
            ast.RShift: ('>>', 12),

            ast.Lt: ('<', 11),
            ast.LtE: ('<=', 11),
            ast.Gt: ('>', 11),
            ast.GtE: ('>=', 11),
            ast.In: (None, 11),         # Dealt with separately
            ast.NotIn: (None, 11),      # Dealt with separately

            ast.Eq: ('==', 10),
            ast.NotEq: ('!=', 10),
            ast.Is: ('===', 10),        # Not really, but closest for now
            ast.IsNot: ('!==', 10),     # Not really, but closest for now

            ast.BitAnd: ('&', 9),
            ast.BitOr: ('|', 8),
            ast.BitXor: ('^', 7),
            ast.And: ('&&', 6),
            ast.Or: ('||', 5)

            # Lowest precedence
        }

        self.allowKeywordArgs = utils.commandArgs.kwargs
        self.allowOperatorOverloading = utils.commandArgs.opov
        self.allowConversionToIterable = utils.commandArgs.iconv
        self.allowConversionToTruthValue = utils.commandArgs.tconv
        self.allowDebugMap = utils.commandArgs.anno and not self.module.metadata.sourcePath.endswith ('.js')
        self.allowDocAttribs = utils.commandArgs.docat
        self.allowJavaScriptIter = False
        self.allowJavaScriptKeys = utils.commandArgs.jskeys
        self.allowJavaScriptMod = utils.commandArgs.jsmod
        self.allowMemoizeCalls = utils.commandArgs.fcall

        self.noskipCodeGeneration = True
        self.conditionalCodeGeneration = True
        self.stripTuple = False     # For speed, tuples are translated to bare JavaScript arrays if they're just indices. Will autoreset.
        self.stripTuples = False    # For correctness, tuples are translated to bare JavaScript arrays if they are assignment target in a JavaScript 6 for-loop. Will not autoreset.
        self.replaceSend = False

        try:
            self.visit (module.parseTree)
            self.targetFragments.append (self.lineNrString) # Last target fragment doesn't have a '\n' to replace in the emit method

        except Exception as exception:
            utils.enhanceException (
                exception,
                lineNr = self.lineNr
            )

        if self.tempIndices:
            raise utils.Error (
                message = '\n\tTemporary variables leak in code generator: {}'.format (self.tempIndices)
            )

    def visitSubExpr (self, node, child):
        def getPriority (exprNode):
            if type (exprNode) in (ast.BinOp, ast.BoolOp):
                return self.operators [type (exprNode.op)][1]
            elif type (exprNode) == ast.Compare:
                return self.operators [type (exprNode.ops [0])][1]  # All ops have same priority
            elif type (exprNode) == ast.Yield:
                return -1000000
            else:
                return 1000000  # No need for parenthesis

        if getPriority (child) <= getPriority (node):
            self.emit ('(')
            self.visit (child)
            self.emit (')')
        else:
            self.visit (child)

    def getAliaser (self, pyFragment, jsFragment):
        return (pyFragment, re.compile ('''
            (^{0}$)|            # Whole word
            (.+__{0}__.+)|      # Truly contains __<pyFragment>__ (Truly, so spare e.g. __name__)
            (^{0}__)|           # Starts with <pyFragment>__
            (__{0}$)|           # Ends with __<pyFragment>
            ((?<=\.){0}__)|     # Starts with '.<pyFragment>__'
            (__{0}(?=\.))       # Ends with '__<pyFragment>.'
        '''.format (pyFragment), re.VERBOSE), jsFragment)

    def filterId (self, qualifiedId):   # Convention: only called at emission time
        if self.idFiltering:
            for aliaser in self.aliasers:
                qualifiedId = re.sub (aliaser [1], aliaser [2], qualifiedId)
        return qualifiedId

    def tabs (self, indentLevel = None):
        if indentLevel == None:
            indentLevel = self.indentLevel
        return indentLevel * '\t'

    def emit (self, fragment, *formatter):
        if (    # At the start of a new line
            not self.targetFragments or
            (self.targetFragments and self.targetFragments [-1] .endswith ('\n'))
        ):
            self.targetFragments.append (self.tabs ())

        fragment = fragment [:-1] .replace ('\n', '\n' + self.tabs ()) + fragment [-1]
        self.targetFragments.append (fragment.format (*formatter) .replace ('\n', self.lineNrString + '\n'))

    def indent (self):
        self.indentLevel += 1

    def dedent (self):
        self.indentLevel -= 1

    def inscope (self, node):
        self.scopes.append (Scope (node))

    def descope (self):
        self.scopes.pop ()

    def getScope (self, nodeType = None):
        if nodeType:
            for scope in reversed (self.scopes):
                if type (scope.node) == nodeType:
                    return scope
        else:
            return self.scopes [-1]

    def getAdjacentClassScopes (self, inMethod = False):
        # Work backward until finding an interruption in the chain
        # Needed to fix destructuring assignment in nested classes and to make super () work
        # The latter needs inMethod, since suported use of super () is directly or indirectly enclosed in a method body
        reversedClassScopes = []
        for scope in reversed (self.scopes):
            if inMethod:
                if type (scope.node) == ast.FunctionDef:
                    continue
                else:
                    inMethod = False
                    
            if type (scope.node) != ast.ClassDef:
                break;
            reversedClassScopes.append (scope)
        return reversed (reversedClassScopes)

    def emitComma (self, index, blank = True):
        if index:
            self.emit (', ' if blank else ',')

    def emitBeginTruthy (self):
        if self.allowConversionToTruthValue:
            self.emit ('__t__ (')

    def emitEndTruthy (self):
        if self.allowConversionToTruthValue:
            self.emit (')')

    def adaptLineNrString (self, node, offset = 0):
        if utils.commandArgs.map or utils.commandArgs.anno: # Under these conditions, appended line numbers will be stripped later, so they have to be there
            if hasattr (node, 'lineno'):
                lineNr = node.lineno + offset   # Use new line number
            else:
                lineNr = self.lineNr + offset   # Use 'cached' line nubmer

            self.lineNrString = str (sourcemaps.maxNrOfSourceLinesPerModule + lineNr) [1 : ]
        else:                                               # __pragma__ ('noanno') isn't enough to perform this else-clause and to later on take the 'no stripping' shortcut
                                                            # This is in the main module the first line will already have been instrumented
                                                            # So in that case each line is instrumented and instrumentation will be stripped later on
            self.lineNrString = ''

    def isDocString (self, stmt):
        return isinstance (stmt, ast.Expr) and isinstance (stmt.value, ast.Str)

    def emitSetDoc (self, stmt):
        self.emit (' .__setdoc__ (')
        self.visit (stmt)
        self.emit (')')

    def emitBody (self, body):  # First docstring already removed
        for stmt in body:
            if self.isDocString (stmt): # Further docstrings ignored
                pass
            else:
                self.visit (stmt)
                self.emit (';\n')
                
    def emitSubscriptAssign (self, target, value, emitPathIndices = lambda: None):              
        if type (target.slice) == ast.Index:        # Always overloaded
            if type (target.slice.value) == ast.Tuple:
                self.visit (target.value)
                self.emit ('.__setitem__ (')        # Free function tries .__setitem__ (overload) and [] (native)
                self.stripTuple = True
                self.visit (target.slice.value)
                self.emit (', ')
                self.visit (value)
                emitPathIndices ()
                self.emit (')')
            elif self.allowOperatorOverloading:     # Possibly overloaded LHS index dealth with here, is special case
                self.emit ('__setitem__ (')         # Free function tries .__setitem__ (overload) and [] (native)
                self.visit (target.value)
                self.emit (', ')
                self.visit (target.slice.value)
                self.emit (', ')
                self.visit (value)
                emitPathIndices ()
                self.emit (')')
            else:                                   # Non-overloaded LHS index just dealth with by visit_Subscript
                self.visit (target)                 # which is called indirectly here
                self.emit (' = ')
                self.visit (value)
                emitPathIndices ()
        elif type (target.slice) == ast.Slice:
            if self.allowOperatorOverloading:
                self.emit ('__setslice__ (')        # Free function tries .__setitem__ (overload) and .__setslice__ (native)
                self.visit (target.value)
                self.emit (', ')
            else:
                self.visit (target.value)
                self.emit ('.__setslice__ (')

            if target.slice.lower == None:
                self.emit ('0')
            else:
                self.visit (target.slice.lower)
            self.emit (', ')

            if target.slice.upper == None:
                self.emit ('null')
            else:
                self.visit (target.slice.upper)
            self.emit (', ')

            if target.slice.step:
                self.visit (target.slice.step)
            else:
                self.emit ('null')                  # Must be null rather than 1, see Array.prototype.__setslice__
            self.emit (', ')

            self.visit (value)

            self.emit (')')
        elif type (target.slice) == ast.ExtSlice:   # Always overloaded
            self.visit (target.value)
            self.emit ('.__setitem__ (')            # Method, since extended slice access is always overloaded
            self.emit ('[')
            for index, dim in enumerate (target.slice.dims):
                self.emitComma (index)
                self.visit (dim)
            self.emit (']')
            self.emit (', ')
            self.visit (value)
            self.emit (')')
            
    def emitDecorators (self, callable):
        for decorator in reversed (callable.decorator_list):
            self.emit ('\n')
            self.visit (
                ast.Assign (
                    targets = [ast.Name (
                        id = callable.name,         # Rename to original callable
                        ctx = ast.Store
                    )],
                    value = (
                            # Simple decorator
                            ast.Call (                              # Call to decorating callable
                                func = ast.Name (                   # supplied literally by the name of the decorator
                                    id = decorator.id,
                                    ctx = ast.Load
                                ),
                                args = [ast.Name (                  # Original callable as parameter, supplied by name
                                    id = callable.name,
                                    ctx = ast.Load
                                )],
                                keywords = []
                            )
                        if type (decorator) == ast.Name else
                            # Decorator factory
                            ast.Call (                              # Call to decorating callable
                                func = decorator,                   # Supplied to call by factory callable which is the decorator
                                args = [ast.Name (                  # Original callable as parameter, supplied by name
                                    id = callable.name,
                                    ctx = ast.Load
                                )],
                                keywords = []
                            )
                    )
                )
            )

    def nextTemp (self, name):
        if name in self.tempIndices:
            self.tempIndices [name] += 1
        else:
            self.tempIndices [name] = 0
        return self.getTemp (name)

    def skipTemp (self, name):
        self.skippedTemps.add (self.nextTemp (name))

    def skippedTemp (self, name):
        return self.getTemp (name) in self.skippedTemps

    def getTemp (self, name):
        if name in self.tempIndices:
            return '__{}{}__'.format (name, self.tempIndices [name])
        else:
            return None

    def prevTemp (self, name):
        if self.getTemp (name) in self.skippedTemps:
            self.skippedTemps.remove (self.getTemp (name))

        self.tempIndices [name] -= 1
        if self.tempIndices [name] < 0:
            del self.tempIndices [name]

    def useModule (self, name):
        self.module.program.importStack [-1][1] = self.lineNr   # Remember line nr of import statement for the error report
        result = self.module.program.provide (name)             # Must be done first because it can generate a healthy exception
        self.use.add (name)                                     # Must not be done if the healthy exception occurs
        return result

    def isCall (self, node, name):
        return type (node) == ast.Call and type (node.func) == ast.Name and node.func.id == name

    def getPragmaFromExpr (self, node):
        return (
            node.value.args
            if type (node) == ast.Expr and self.isCall (node.value, '__pragma__') else
            None
        )

    def visit (self, node):
        try:
            self.lineNr = node.lineno
        except:
            pass

        pragma = self.getPragmaFromExpr (node)

        if pragma:
            if pragma [0] .s == 'skip':
                self.noskipCodeGeneration = False
            elif pragma [0] .s == 'noskip':
                self.noskipCodeGeneration = True

            if pragma [0] .s in ('ifdef', 'ifndef'):
                defined = eval (    # Explained with __pragma__ ('js', ...)
                    compile (
                        ast.Expression (pragma [1]),
                        '<string>',
                        'eval'
                    ),
                    {},
                    {'__envir__': __base__.__envir__}
                ) in self.module.program.symbols

                if pragma [0] .s == 'ifdef':
                    self.conditionalCodeGeneration = defined
                else:
                    self.conditionalCodeGeneration = not defined
            elif pragma [0] .s == 'else':
                self.conditionalCodeGeneration = not self.conditionalCodeGeneration
            elif pragma [0] .s == 'endif':
                self.conditionalCodeGeneration = True

        if self.noskipCodeGeneration and self.conditionalCodeGeneration:
            ast.NodeVisitor.visit (self, node)

    def visit_arg (self, node):
        self.emit (self.filterId (node.arg))

    def visit_arguments (self, node):   # Visited for def's, not for calls
        self.emit ('(')

        for index, arg in enumerate (node.args):
            self.emitComma (index)
            self.visit (arg)

        # If there's a vararg or a kwarg, no formal parameter is emitted for it, it's just retrieved in the body
        # so def f (a, b=3, *x, c, d=4, **y, e, f = 5) generates function f (a, b, c, d, e, f), since x and y are never passed in positionally

        self.emit (') {{\n')

        self.indent ()  # Start of function body, the end is not in visit_arguments

        # Defaults for positional args (before *), only if not passed normally before this point
        # They can also be passed in as keyword args
        # If so, the keywords are filled in starting with the last positional arg
        # So after a keyword positional arg cannot follow a non-keyword positional arg
        # The kwarg transfer object may be the last of the actual params
        # It should not initialize a formal param, so it's overwritten by the default as well.
        for arg, expr in reversed (list (zip (reversed (node.args), reversed (node.defaults)))):
            if expr:
                self.emit ('if (typeof {0} == \'undefined\' || ({0} != null && {0} .hasOwnProperty ("__kwargtrans__"))) {{;\n', self.filterId (arg.arg))
                self.indent ()
                self.emit ('var {} = ', self.filterId (arg.arg))
                self.visit (expr)
                self.emit (';\n')
                self.dedent ()
                self.emit ('}};\n')

        # Defaults for kwonly args (after *), unconditionally, since they will be passed only after this point
        for arg, expr in zip (node.kwonlyargs, node.kw_defaults):
            if expr:
                self.emit ('var {} = ', self.filterId (arg.arg))
                self.visit (expr)
                self.emit (';\n')

        if self.allowKeywordArgs:
            # If there is a **kwargs arg, make a local to hold its calltime contents
            # This local is needed even if arguments.length == 0, it's just empty then but may be read or passed on
            if node.kwarg:
                self.emit ('var {} = dict ();\n', self.filterId (node.kwarg.arg))

            self.emit ('if (arguments.length) {{\n')
            self.indent ()

            # Store index of last actual param
            self.emit ('var {} = arguments.length - 1;\n', self.nextTemp ('ilastarg'))

            # Any calltime keyword args are passed in a special JavaScript-only kwarg transfer object, recognizable by attribute __kwargtrans__
            # If it's there, copy this special object into local var __allkwargs__
            # And lower __ilastarg__ by 1, since the last calltime arg wasn't a normal (Python) one
            # It's only known at call time if there are keyword arguments, unless there are no arguments at all, so allways have to generate this code
            self.emit ('if (arguments [{0}] && arguments [{0}].hasOwnProperty ("__kwargtrans__")) {{\n', self.getTemp ('ilastarg'))
            self.indent ()
            self.emit ('var {} = arguments [{}--];\n', self.nextTemp ('allkwargs'), self.getTemp ('ilastarg'))

            # kwarg transfer object may contain deftime defined keyword args, but also keyword args that are absorbed by **kwargs
            self.emit ('for (var {} in {}) {{\n', self.nextTemp ('attrib'), self.getTemp ('allkwargs'))
            self.indent ()

            # We'll make the distinction between normal keyword args and **kwargs keyword args in a switch
            if node.args + node.kwonlyargs or node.kwarg:
                self.emit ('switch ({}) {{\n', self.getTemp ('attrib'))
                self.indent ()

                # First generate a case for each normal keyword arg, generating a local for it
                for arg in node.args + node.kwonlyargs:
                    self.emit ('case \'{0}\': var {0} = {1} [{2}]; break;\n', self.filterId (arg.arg), self.getTemp ('allkwargs'), self.getTemp ('attrib'))

                # Then put the rest into the **kwargs local
                if node.kwarg:
                    self.emit ('default: {0} [{1}] = {2} [{1}];\n', self.filterId (node.kwarg.arg), self.getTemp ('attrib'), self.getTemp ('allkwargs'))

                self.dedent ()
                self.emit ('}}\n')  # switch..

            self.prevTemp ('allkwargs')
            self.prevTemp ('attrib')

            self.dedent ()
            self.emit ('}}\n')  # for (__attrib__..

            # Take out the __kwargstrans__ marker, to prevent it from being passed in to another call, leading to confusion there
            # So after being used once, the kwarg transfer object becomes an ordinary object
            if node.kwarg:
                self.emit ('delete {}.__kwargtrans__;\n', self.filterId (node.kwarg.arg))

            self.dedent ()
            self.emit ('}}\n')  # if (arguments [{0}]..

            # If there's a vararg, assign an array containing the remainder of the actual non keyword only params, except for the kwarg transfer object
            if node.vararg:
                # Slice starts at end of formal positional params, ends with last actual param, all actual keyword args are taken out into the kwarg transfer object
                self.emit (
                    'var {} = tuple ([].slice.apply (arguments).slice ({}, {} + 1));\n',
                    self.filterId (node.vararg.arg),
                    len (node.args),
                    self.getTemp ('ilastarg')
                )

            self.prevTemp ('ilastarg')

            self.dedent ()
            self.emit ('}}\n')  # if (arguments.length..
            self.emit ('else {{\n')
            self.indent ()
            if node.vararg:     # if there's a formal vararg param, even if there isn't an actual one
                self.emit ('var {} = tuple ();\n', self.filterId (node.vararg.arg))
            self.dedent ()
            self.emit ('}}\n')
        else:
            if node.vararg: # See above
                self.emit (
                    'var {} = tuple ([].slice.apply (arguments).slice ({}));\n',
                    self.filterId (node.vararg.arg),
                    len (node.args),
                )

    def visit_Assert (self, node):
        if utils.commandArgs.dassert:
            self.emit ('assert (')
            self.visit (node.test)
            if node.msg:
                self.emit (', ')
                self.visit (node.msg)
            self.emit (');\n')

    def visit_Assign (self, node):       
        self.adaptLineNrString (node)

        targetLeafs = (ast.Attribute, ast.Subscript, ast.Name)

        def assignTarget (target, value, pathIndices = []):
            def emitPathIndices ():
                if pathIndices:
                    self.emit (' ')
                    for pathIndex in pathIndices:
                        self.emit ('[{}]'.format (pathIndex))
                else:   # Most frequent and simple case, only one atomary LHS
                    pass

            if type (target) == ast.Subscript:              # Only non-overloaded LHS index can be left to visit_Subscript
                self.emitSubscriptAssign (target, value, emitPathIndices)
            else:
                if isPropertyAssign and target.id != self.getTemp ('left'):
                    self.emit ('Object.defineProperty ({}, \'{}\', '.format (self.getScope () .node.name, target.id))
                    self.visit (value)
                    emitPathIndices ()
                    self.emit (');')
                else:
                    if type (target) == ast.Name:
                        if type (self.getScope () .node) == ast.ClassDef and target.id != self.getTemp ('left'):
                            self.emit ('{}.'.format ('.'.join ([scope.node.name for scope in self.getAdjacentClassScopes ()]))) # The target is a class attribute
                        elif target.id in self.getScope () .nonlocals:
                            pass
                        else:
                            self.emit ('var ')

                    self.visit (target)
                    self.emit (' = ')
                    self.visit (value)
                    emitPathIndices ()

        # Tuple assignment LHS tree walker
        # The target (LHS) guides the walk, so it determines the source indices
        # However if a target leaf is an LHS slice,
        # the actual assignment will involve iterating through an extra index level,
        # as [1, 2][1:1] = [2, 3] should give [1, 2, 3, 4] rather than [1, [2, 3], 4]
        # This extra target level is walked in the slice
        def walkTarget (expr, pathIndices):
            if type (expr) in targetLeafs:          # It's an LValue, matching an RHS leaf source
                self.emit (';\n')

                # Create and visit RHS node on the fly, to benefit from assignTarget
                assignTarget (expr, ast.Name (
                    id = self.getTemp ('left'),
                    ctx = ast.Load
                ), pathIndices)
            else:                                   # It's a sequence
                pathIndices.append (None)           # Add indexing level for that sequence
                for index, elt in enumerate (expr.elts):
                    pathIndices [-1] = index
                    walkTarget (elt, pathIndices)   # Walk deeper until finally pathIndices is used in emitting an RHS leaf
                pathIndices.pop ()                  # Remove the indexing level since we're done with that sequence

        def getIsPropertyAssign (value):
            if self.isCall (value, 'property'):
                return True
            else:
                try:    # Assume it's a tuple or a list of properties (and so recursively)
                    return getIsPropertyAssign (value.elts [0])

                except: # At this point it wasn't a property and also not a tuple or a list of properties
                    return False

        isPropertyAssign = type (self.getScope () .node) == ast.ClassDef and getIsPropertyAssign (node.value)
        # In transpiling to efficient JavaScript, we need a special, simplified case for properties
        # In JavaScript generating '=' for properties won't do, it has to be 'Object.defineProperty'
        # We can't look out for property installation at runtime, that would make all assignments slow
        # So we introduce the restriction that an assignment involves no properties at all or only properties
        # Also these properties have to use the 'property' function 'literally'
        # With these restrictions we can recognize property installation at compile time
        
        if len (node.targets) == 1 and type (node.targets [0]) in targetLeafs:
            # Fast shortcut for the most frequent and simple case
            assignTarget (node.targets [0], node.value)
        else:
            # Multiple RHS or tuple assignment, we need __tmp__, create assignment node on the fly and visit it
            self.visit (ast.Assign (
                targets = [ast.Name (
                    id = self.nextTemp ('left'),
                    ctx = ast.Store
                )],
                value = node.value
            ))

            for expr in node.targets:
                walkTarget (expr, [])

            self.prevTemp ('left')

    def visit_Attribute (self, node):
        if type (node.value) in (ast.BinOp, ast.BoolOp, ast.Compare):
            self.emit ('(')

        self.visit (node.value)

        if type (node.value) in (ast.BinOp, ast.BoolOp, ast.Compare):
            self.emit (')')

        self.emit ('.{}', self.filterId (node.attr))

    def visit_AnnAssign (self, node):
        if node.value != None:  # Rather than a node.value is a NameConstant with value None
            self.visit (
                ast.Assign (
                    [node.target],
                    node.value
                )
            )
        
    def visit_AugAssign (self, node):
        if self.allowOperatorOverloading:
            rhsFunctionName = self.filterId (
                # Non-overloaded
                '__ipow__' if type (node.op) == ast.Pow else
                '__imatmul__' if type (node.op) == ast.MatMult else
                ('__ijsmod__' if self.allowJavaScriptMod else '__imod__') if type (node.op) == ast.Mod else
                
                # Overloaded arithmetic
                '__imul__' if type (node.op) == ast.Mult else
                '__idiv__' if type (node.op) == ast.Div else
                '__iadd__' if type (node.op) == ast.Add else
                '__isub__' if type (node.op) == ast.Sub else
                
                # Overloaded bitwise
                '__ilshift__' if type (node.op) == ast.LShift else
                '__irshift__' if type (node.op) == ast.RShift else
                '__ior__' if type (node.op) == ast.BitOr else
                '__ixor__' if type (node.op) == ast.BitXor else
                '__iand__' if type (node.op) == ast.BitAnd else
                
                'Never here'
            )
                
            rhsCall = ast.Call (
                func = ast.Name (
                    id = rhsFunctionName,
                    ctx = ast.Load
                ),
                args = [
                    node.target,
                    node.value
                ],
                keywords = []
            )
        
            if type (node.target) == ast.Subscript:              # Only non-overloaded LHS index can be left to visit_Subscript
                self.emitSubscriptAssign (node.target, rhsCall)
            else:
                if type (node.target) == ast.Name and not node.target.id in self.getScope () .nonlocals:
                    self.emit ('var ')

                self.visit (node.target)
                self.emit (' = ')
                self.visit (rhsCall)       
        elif (
            # Python //, @ and ** have no operator symbol in JavaScript, so <operator>= won't work
            type (node.op) in (ast.FloorDiv, ast.MatMult, ast.Pow)
            or
            # Python % (as opposed to JavaScript %) has no operator symbol in JavaScript, so <operator>= won't work
            (type (node.op) == ast.Mod and not self.allowJavaScriptMod)
            or
            # LHS is a call to __getitem__ or __getslice__, so <operator>= won't work
            (                         
                type (node.target) == ast.Subscript and (
                    type (node.target.slice) != ast.Index or
                    type (node.target.slice.value) == ast.Tuple
                )
            )
        ):
            # Just translate to binary operator node
            self.visit (ast.Assign (
                targets = [node.target],
                value = ast.BinOp (left = node.target, op = node.op, right = node.value)
            ))         
        else:   # No overloading in this branch                           
            self.visit (node.target)        # No need to emit var first, it has to exist already

            # Optimize for ++ and --
            if type (node.value) == ast.Num and node.value.n == 1:
                if type (node.op) == ast.Add:
                    self.emit ('++')
                    return
                elif type (node.op) == ast.Sub:
                    self.emit ('--')
                    return
            elif type (node.value) == ast.UnaryOp and type (node.value.operand) == ast.Num and node.value.operand.n == 1:
                if type (node.op) == ast.Add:
                    if type (node.value.op) == ast.UAdd:
                        self.emit ('++')
                        return
                    elif type (node.value.op) == ast.USub:
                        self.emit ('--')
                        return
                elif type (node.op) == ast.Sub:
                    if type (node.value.op) == ast.UAdd:
                        self.emit ('--')
                        return
                    elif type (node.value.op) == ast.USub:
                        self.emit ('++')
                        return

            self.emit (' {}= ', self.operators [type (node.op)][0])
            self.visit (node.value)

    def visit_BinOp (self, node):
        if type (node.op) == ast.FloorDiv:
            self.emit ('Math.floor (')
            self.visitSubExpr (node, node.left)
            self.emit (' / ')
            self.visitSubExpr (node, node.right)
            self.emit (')')
        elif (
            type (node.op) in (ast.Pow, ast.MatMult) or
            (type (node.op) == ast.Mod and (self.allowOperatorOverloading or not self.allowJavaScriptMod)) or
            (type (node.op) in (
                ast.Mult, ast.Div, ast.Add, ast.Sub,
                ast.LShift, ast.RShift, ast.BitOr, ast.BitXor, ast.BitAnd
            ) and self.allowOperatorOverloading)
        ):
            self.emit ('{} ('.format (self.filterId (
                # Non-overloaded
                ('__pow__' if self.allowOperatorOverloading else 'Math.pow') if type (node.op) == ast.Pow else
                '__matmul__' if type (node.op) == ast.MatMult else
                ('__jsmod__' if self.allowJavaScriptMod else '__mod__') if type (node.op) == ast.Mod else
                
                # Overloaded arithmetic
                '__mul__' if type (node.op) == ast.Mult else
                '__div__' if type (node.op) == ast.Div else
                '__add__' if type (node.op) == ast.Add else
                '__sub__' if type (node.op) == ast.Sub else
                
                # Overloaded bitwise
                '__lshift__' if type (node.op) == ast.LShift else
                '__rshift__' if type (node.op) == ast.RShift else
                '__or__' if type (node.op) == ast.BitOr else
                '__xor__' if type (node.op) == ast.BitXor else
                '__and__' if type (node.op) == ast.BitAnd else
                
                'Never here'
            )))
            self.visit (node.left)
            self.emit (', ')
            self.visit (node.right)
            self.emit (')')
        else:
            self.visitSubExpr (node, node.left)
            self.emit (' {} '.format (self.operators [type (node.op)][0]))
            self.visitSubExpr (node, node.right)

    def visit_BoolOp (self, node):
        for index, value in enumerate (node.values):
            if index:
                self.emit (' {} '.format (self.operators [type (node.op)][0]))

            if index < len (node.values) - 1:
                self.emitBeginTruthy ()

            self.visitSubExpr (node, value)

            if index < len (node.values) - 1:
                self.emitEndTruthy ()

    def visit_Break (self, node):
        if not self.skippedTemp ('break'):
            self.emit ('{} = true;\n', self.getTemp ('break'))
        self.emit ('break')

    def visit_Call (self, node):
        self.adaptLineNrString (node)

        def emitKwargTrans ():
            self.emit ('__kwargtrans__ (')

            hasSeparateKeyArgs = False
            hasKwargs = False
            for keyword in node.keywords:
                if keyword.arg:
                    hasSeparateKeyArgs = True
                else:
                    hasKwargs = True
                    break   # **kwargs is always the last arg

            if hasSeparateKeyArgs:
                if hasKwargs:
                    self.emit ('__merge__ (')
                self.emit ('{{')    # Allways if hasSeparateKeyArgs

            for keywordIndex, keyword in enumerate (node.keywords):
                if keyword.arg:
                    self.emitComma (keywordIndex)
                    self.emit ('{}: ', self.filterId (keyword.arg))
                    self.visit (keyword.value)
                else:
                    # It's the **kwargs arg, so the last arg
                    # In JavaScript this must be an expression denoting an Object
                    # The keyword args in there have to be added to the kwargs transfer object as well
                    if hasSeparateKeyArgs:
                        self.emit ('}}, ')
                    self.visit (keyword.value)

            if hasSeparateKeyArgs:
                if hasKwargs:
                    self.emit (')')     # Terminate merge
                else:
                    self.emit ('}}')    # Only if not terminated already because hasKwargs

            self.emit (')')

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

        if type (node.func) == ast.Name:
            if node.func.id == 'type':
                self.emit ('py_typeof (')   # Don't use general alias, since this is the type operator, not the type metaclass
                self.visit (node.args [0])
                self.emit (')')
                return
            elif node.func.id == 'property':
                self.emit ('{0}.call ({1}, {1}.{2}'.format (node.func.id, self.getScope (ast.ClassDef) .node.name, self.filterId (node.args [0].id)))
                if len (node.args) > 1:
                    self.emit (', {}.{}'.format (self.getScope (ast.ClassDef) .node.name, node.args [1].id))
                self.emit (')')
                return
            elif node.func.id == 'globals':
                self.emit ('__globals__ (__all__)')
                return
            elif node.func.id == '__pragma__':
                if node.args [0] .s == 'alias':
                    self.aliasers.insert (0, self.getAliaser (node.args [1] .s, node.args [2].s))
                elif node.args [0] .s == 'noalias':
                    if len (node.args) == 1:
                        self.aliasers = []
                    else:
                        for index in reversed (range (len (self.aliasers))):
                            if self.aliasers [index][0] == node.args [1] .s:
                                self.aliasers.pop (index)

                elif node.args [0] .s == 'noanno':
                    self.allowDebugMap = False

                elif node.args [0] .s == 'fcall':
                    self.allowMemoizeCalls = True
                elif node.args [0] .s == 'nofcall':
                    self.allowMemoizeCalls = False

                elif node.args [0] .s == 'docat':
                    self.allowDocAttribs = True
                elif node.args [0] .s == 'nodocat':
                    self.allowDocAttribs = False

                elif node.args [0] .s == 'iconv':       # Automatic conversion to iterable supported
                    self.allowConversionToIterable = True
                elif node.args [0] .s == 'noiconv':     # Automatic conversion to iterable not supported
                    self.allowConversionToIterable = False

                elif node.args [0] .s == 'jsiter':      # Translate for ... in ... : ... literally to for (... in ...) {...},
                    self.allowJavaScriptIter = True     # to enable iterating JavaScript objects that are not dicts
                elif node.args [0] .s == 'nojsiter':    # Dictionary keys without quotes are identifiers
                    self.allowJavaScriptIter = False

                elif node.args [0] .s == 'jskeys':      # Dictionary keys without quotes are string literals
                    self.allowJavaScriptKeys = True
                elif node.args [0] .s == 'nojskeys':    # Dictionary keys without quotes are identifiers
                    self.allowJavaScriptKeys = False

                elif node.args [0] .s == 'jsmod':       # % has JavaScript behaviour
                    self.allowJavaScriptMod = True
                elif node.args [0] .s == 'nojsmod':     # % has Python behaviour
                    self.allowJavaScriptMod = False

                elif node.args [0] .s == 'gsend':       # Replace send by next.value
                    self.replaceSend = True
                elif node.args [0] .s == 'nogsend':     # Don't replace send by next.value
                    self.replaceSend = False

                elif node.args [0] .s == 'tconv':       # Automatic conversion to truth value supported
                    self.allowConversionToTruthValue = True
                elif node.args [0] .s == 'notconv':     # Automatic conversion to truth value not supported
                    self.allowConversionToTruthValue = False

                elif node.args [0] .s == 'js':          # Include JavaScript code literally in the output
                    code = node.args [1] .s.format (* [
                        eval (
                            compile (
                                ast.Expression (arg),   # Code to compile (can be AST or source)
                                '<string>',             # Not read from a file
                                'eval'                  # Code is an expression
                            ),
                            {},
                            {'__include__': include}
                        )
                        for arg in node.args [2:]
                    ])
                    for line in code.split ('\n'):
                        self.emit ('{}\n', line)

                elif node.args [0] .s == 'kwargs':      # Start emitting kwargs code for FunctionDef's
                    self.allowKeywordArgs = True
                elif node.args [0] .s == 'nokwargs':    # Stop emitting kwargs code for FunctionDef's
                    self.allowKeywordArgs = False

                elif node.args [0] .s == 'opov':        # Overloading of a small sane subset of operators allowed
                    self.allowOperatorOverloading = True
                elif node.args [0] .s == 'noopov':      # Operloading of a small sane subset of operators disallowed
                    self.allowOperatorOverloading = False

                elif node.args [0] .s == 'redirect':
                    if node.args [1] .s == 'stdout':
                        self.emit ('__stdout__ = \'{}\'', node.args [2])
                elif node.args [0] .s == 'noredirect':
                    if node.args [1] .s == 'stdout':
                        self.emit ('__stdout__ = \'__console__\'')

                elif node.args [0] .s in ('skip', 'noskip', 'ifdef', 'ifndef', 'else', 'endif'):
                    pass                                # Easier dealth with on statement / expression level in self.visit
                else:
                    raise utils.Error (
                        lineNr = self.lineNr,
                        message = '\n\tUnknown pragma: {}'.format (
                            node.args [0] .s if type (node.args [0]) == ast.Str else node.args [0]
                        )
                    )
                return
            elif node.func.id == '__new__':
                self.emit ('new ')
                self.visit (node.args [0])
                return
            elif node.func.id == '__typeof__':
                self.emit ('typeof ')
                self.visit (node.args [0])
                return
            elif node.func.id == '__preinc__':
                self.emit ('++')
                self.visit (node.args [0])
                return
            elif node.func.id == '__postinc__':
                self.visit (node.args [0])
                self.emit ('++')
                return
            elif node.func.id == '__predec__':
                self.emit ('--')
                self.visit (node.args [0])
                return
            elif node.func.id == '__postdec__':
                self.visit (node.args [0])
                self.emit ('--')
                return

        elif (
            type (node.func) == ast.Attribute and 
            self.replaceSend and
            node.func.attr == 'send'                # Construct Attribute instead of bare Call node on the fly and visit it
        ):
            self.emit ('(function () {{return ')    # Encapsulate in function to prevent minifier complaining if value isn't used
            self.visit (ast.Attribute (
                value = ast.Call (
                    func = ast.Attribute (
                        value = ast.Name (
                            id = node.func.value.id,
                            ctx = ast.Load
                        ),
                        attr = 'js_next',
                        ctx = ast.Load
                    ),
                    args = node.args,
                    keywords = node.keywords
                ),
                attr = 'value',
                ctx = ast.Load
            ))
            self.emit ('}}) ()')
            return  # The newly created node was visited by a recursive call to visit_Call. This replaces the current visit.
            
        elif (
            type (node.func) == ast.Attribute and
            type (node.func.value) == ast.Call and
            type (node.func.value.func) == ast.Name and
            node.func.value.func.id == 'super'
        ):
            if node.func.value.args or node.func.value.keywords:
                raise utils.Error (
                    lineNr = self.lineNr,
                    message = '\n\tBuilt in function \'super\' with arguments not supported'
                )
                
            else:   # Construct node for __super__ (self, '<methodName>')(self, <params>) and visit it
                self.visit (
                    ast.Call (
                        func = ast.Call (
                            func = ast.Name (
                                id = '__super__',
                                ctx = ast.Load
                            ),
                            args = [
                                ast.Name (
                                    id = '.'.join ([scope.node.name for scope in self.getAdjacentClassScopes (True)]),
                                    ctx = ast.Load
                                ),
                                ast.Str (
                                    s = node.func.attr  # <methodName>
                                )
                            ],
                            keywords = []
                        ),
                        args = (
                            [
                                ast.Name (
                                    id = 'self',
                                    ctx = ast.Load
                                )
                            ] +
                            node.args                   # <normal part of params>
                        ),
                        keywords = node.keywords        # <keyword part of params>
                    )
                )
                return
        
        if (
            self.allowOperatorOverloading and       # If operator overloading and 
            not (                                   # whe're not already in the __call__ that we generated on the fly,
                type (node.func) == ast.Name and
                node.func.id == '__call__'
            )
        ):
            self.visit (ast.Call (                  # generate __call__ node on the fly and visit it                                                            
                func = ast.Name (
                    id = '__call__',
                    ctx = ast.Load  # Don't use node.func.ctx since callable object decorators don't have a ctx, and they too the overloading mechanism
                ),
                args = (
                        [node.func, node.func.value] + node.args
                    if type (node.func) == ast.Attribute else
                        [
                            node.func,
                            ast.NameConstant (
                                value = None
                            )
                        ] + node.args
                ),
                keywords = node.keywords
            ))
            return  # The newly created node was visited by a recursive call to visit_Call. This replaces the current visit.

        self.visit (node.func)

        if self.module.program.javaScriptVersion >= 6:
            self.emit (' (')

            for index, expr in enumerate (node.args):
                self.emitComma (index)

                if type (expr) == ast.Starred:
                    self.emit ('...')

                self.visit (expr)

            if node.keywords:
                self.emitComma (len (node.args))
                emitKwargTrans ()

            self.emit (')')
        else:
            for index, expr in enumerate (node.args):
                if type (expr) == ast.Starred:
                    self.emit ('.apply (null, ')    # Note that in generated a.b.f (), a.b.f is a bound function already

                    for index, expr in enumerate (node.args):
                        if index:
                            self.emit ('.concat (')
                        if type (expr) == ast.Starred:
                            self.visit (expr)
                        else:
                            self.emit ('[')
                            self.visit (expr)
                            self.emit (']')
                        if index:
                            self.emit (')')

                    if node.keywords:
                        self.emit ('.concat ([')    # At least *args was present before this point
                        emitKwargTrans ()
                        self.emit ('])')

                    self.emit (')')
                    break;
            else:
                self.emit (' (')

                for index, expr in enumerate (node.args):
                    self.emitComma (index)
                    self.visit (expr)

                if node.keywords:
                    self.emitComma (len (node.args))
                    emitKwargTrans ()

                self.emit (')')

    def visit_ClassDef (self, node):
        self.adaptLineNrString (node)

        if type (self.getScope () .node) == ast.Module:
            self.all.add (node.name)

        if type (self.getScope () .node) == ast.ClassDef:
            self.emit (self.filterId ('\n{}:'.format (node.name)))
        else:
            self.emit ('var {} ='.format (self.filterId (node.name)))

        self.emit (' __class__ (\'{}\', [', self.filterId (node.name))
        if node.bases:
            for index, expr in enumerate (node.bases):
                try:
                    self.emitComma (index)
                    self.visit (expr)
                except Exception as exception:
                    utils.enhanceException (
                        exception,
                        lineNr = self.lineNr,
                        message = '\n\tInvalid base class'
                    )
        else:
            self.emit ('object')
        self.emit ('], {{')
        self.inscope (node)

        self.indent ()
        classVarAssigns = []
        index = 0
        for stmt in node.body:
            if self.isDocString (stmt):
                pass
            elif type (stmt) in (ast.FunctionDef, ast.ClassDef):
                self.emitComma (index, False)
                self.visit (stmt)
                index += 1
            elif type (stmt) == ast.Assign:
                if (
                    len (stmt.targets) == 1 and type (stmt.targets [0]) == ast.Name and
                    not (type (stmt.value) == ast.Call and type (stmt.value.func) == ast.Name and stmt.value.func.id == 'property')
                ):
                    self.emitComma (index, False)
                    self.emit ('\n{}: ', self.filterId (stmt.targets [0] .id), stmt.targets)
                    self.visit (stmt.value)
                    self.adaptLineNrString (stmt)
                    index += 1
                else:
                    # Limitation: Can't properly deal with line number in this case
                    classVarAssigns.append (stmt)   # Has to be done after the class because tuple assignment requires the use of an algorithm.
                                                    # May also be a property assign
            elif self.getPragmaFromExpr (stmt):
                self.visit (stmt)               # If it's a pragma, just visit it
        self.dedent ()

        self.emit ('\n}}')

        if node.keywords:
            if node.keywords [0] .arg == 'metaclass':
                self.emit (', ')
                self.visit (node.keywords [0] .value)
            else:
                raise utils.Error (
                    lineNr = self.lineNr,
                    message = '\n\tUnknown keyword argument {} definition of class {}'.format (node.keywords [0] .arg, node.name)
                )

        self.emit (')')

        if self.allowDocAttribs and self.isDocString (node.body [0]):
            self.emitSetDoc (node.body [0])

        for index, classVarAssign in enumerate (classVarAssigns):
            self.emit (';\n')
            self.visit (classVarAssign)

        self.descope () # No earlier, class vars need it

        self.emitDecorators (node)

    def visit_Compare (self, node):
        if len (node.comparators) > 1:
            self.emit ('(')

        left = node.left
        for index, (op, right) in enumerate (zip (node.ops, node.comparators)):
            if index:
                self.emit (' && ')

            if type (op) in (ast.In, ast.NotIn) or (self.allowOperatorOverloading and type (op) in (
                ast.Eq, ast.NotEq, ast.Lt, ast.LtE, ast.Gt, ast.GtE
            )):
                self.emit ('{} ('.format (self.filterId (
                
                    # Non-overloaded
                    '__in__' if type (op) == ast.In else
                    '!__in__' if type (op) == ast.NotIn else
                    
                    # Overloaded
                    '__eq__' if type (op) == ast.Eq else
                    '__ne__' if type (op) == ast.NotEq else
                    '__lt__' if type (op) == ast.Lt else
                    '__le__' if type (op) == ast.LtE else
                    '__gt__' if type (op) == ast.Gt else
                    '__ge__' if type (op) == ast.GtE else
                    
                    'Never here'
                )))
                self.visitSubExpr (node, left)
                self.emit (', ')
                self.visitSubExpr (node, right)
                self.emit (')')
            else:
                self.visitSubExpr (node, left)
                self.emit (' {0} '.format (self.operators [type (op)][0]))
                self.visitSubExpr (node, right)

            left = right

        if len (node.comparators) > 1:
            self.emit(')')

    def visit_Continue (self, node):
        self.emit ('continue')

    def visit_Delete (self, node):  # Currently dict element only, rest can be done with empty slice assignment
        for expr in node.targets:
            if type (expr) != ast.Name:
                self.emit ('delete ')
                self.visit (expr)
                self.emit (';\n')

    def visit_Dict (self, node):
        if not self.allowJavaScriptKeys:                    # If we don't want JavaScript treatment of keys, for literal keys it doesn't make a difference
            for key in node.keys:
                if not type (key) in (ast.Str, ast.Num):    # but if there's only one non-literal key there's a difference, and all keys are treated the Python way
                    self.emit ('dict ([')
                    for index, (key, value) in enumerate (zip (node.keys, node.values)):
                        self.emitComma (index)
                        self.emit ('[')
                        self.visit (key)                    # In a JavaScript list, name is evaluated as variable or function call to produce a key
                        self.emit (', ')
                        self.visit (value)
                        self.emit (']')
                    self.emit ('])')
                    return

        if self.allowJavaScriptIter:
            self.emit ('{{')
        else:
            self.emit ('dict ({{')                              # Since we didn't return, we want identifier keys to be treated as string literals
        for index, (key, value) in enumerate (zip (node.keys, node.values)):
            self.emitComma (index)
            self.idFiltering = False                        # The key may be a string or an identifier, the latter normally would be filtered, which we don't want
            self.visit (key)                                # In a JavaScript object literal, an identifier isn't evaluated but literally taken to be a key.
            self.idFiltering = True
            self.emit (': ')
            self.visit (value)

        if self.allowJavaScriptIter:
            self.emit ('}}')
        else:
            self.emit ('}})')

    def visit_DictComp (self, node):
        self.visit_ListComp (node, isDict = True)

    def visit_Expr (self, node):
        self.visit (node.value)

    def visit_For (self, node):
        self.adaptLineNrString (node)

        if node.orelse and not self.allowJavaScriptIter:
            self.emit ('var {} = false;\n', self.nextTemp ('break'))
        else:
            self.skipTemp ('break')

        # Special case optimization: iterating through range with constant literal step, start and stop can be expressions
        # Starred args not allowed, since what's 'behind' the star is only known at runtime, so there's no saying wether there's a constant literal step
        optimize = (
            type (node.target) == ast.Name and  # Since 'var' is emitted, target must not yet exist, so e.g. not be element of array
            self.isCall (node.iter, 'range') and
                type (node.iter.args [0]) != ast.Starred and (
                len (node.iter.args) < 3 or                         # Constant step of 1
                type (node.iter.args [2]) == ast.Num or (           # Positive constant step
                    type (node.iter.args [2]) == ast.UnaryOp and    # Negative constant step
                    type (node.iter.args [2] .operand) == ast.Num
                )
            )
        )

        if self.allowJavaScriptIter:
            self.emit ('for (var ')
            self.visit (node.target)
            self.emit (' in ')
            self.visit (node.iter)
            self.emit (') {{\n')
            self.indent ()
        elif optimize:
            step = (
                    1
                if len (node.iter.args) <= 2 else
                    node.iter.args [2] .n
                if type (node.iter.args [2]) == ast.Num else
                    node.iter.args [2] .operand .n
                if type (node.iter.args [2] .op) == ast.UAdd else
                    -node.iter.args [2] .operand .n
            )

            self.emit ('for (var ')
            self.visit (node.target)
            self.emit (' = ')
            self.visit (node.iter.args [0] if len (node.iter.args) > 1 else ast.Num (0))
            self.emit ('; ')
            self.visit (node.target)
            self.emit (' < ' if step > 0 else ' > ')
            self.visit (node.iter.args [1] if len (node.iter.args) > 1 else node.iter.args [0])
            self.emit ('; ')
            self.visit (node.target)
            if step == 1:
                self.emit ('++')
            elif step == -1:
                self.emit ('--')
            elif step >= 0:
                self.emit ( ' += {}', step)
            else:
                self.emit ( ' -= {}', -step)

            self.emit (') {{\n')
            self.indent ()

        elif self.module.program.javaScriptVersion >= 6:
            self.emit ('for (var ')
            self.stripTuples = True
            self.visit (node.target)
            self.stripTuples = False
            self.emit (' of ')

            if self.allowConversionToIterable:
                self.emit ('__i__ (')

            self.visit (node.iter)

            if self.allowConversionToIterable:
                self.emit (')')

            self.emit (') {{\n')
            self.indent ()

            ''' (1)
            # In the code below, destructuring assignment is done explicitly rather than left to JavaScript
            # It is left here as a comment until it becomes more clear that JavaScript destructuring suffices in all cases

            # Produce universal iterator (something with a Python '__next__' and a JavaScript 'next') from iterable by calling py_iter from __builtin__
            self.emit ('var {} = {} (', self.nextTemp ('iterator'), self.filterId ('iter'))
            self.visit (node.iter)
            self.emit (');\n')

            self.emit ('while (true) {{\n')
            self.indent ()

            # Create and visit Assign node on the fly to benefit from tupple assignment
            self.emit ('try {{')
            self.indent ()
            self.visit (ast.Assign (
                targets = [node.target],        # As in Python: for <target> in ...
                value = ast.Call (              # Result of calling 'next' on the just produced universal iterator
                    func = ast.Name (
                        id = 'next',
                        ctx = ast.Load
                    ),
                    args = [ast.Name (
                        id = self.getTemp ('iterator'),
                        ctx = ast.Load
                    )],
                    keywords = []
                )
            ))
            self.emit (';')
            self.dedent ()
            self.emit ('}} ')
            self.emit ('catch (exception) {{')  # Assume 'StopIteration' thrown, iterator exhausted
            self.indent ()
            self.emit ('break;')
            self.dedent ()
            self.emit ('}}\n')
            '''

        else:
            self.emit ('var {} = ', self.nextTemp ('iterable'))
            self.visit (node.iter)
            self.emit (';\n')

            if self.allowConversionToIterable:
                self.emit ('{0} = __i__ ({0});\n', self.getTemp ('iterable'))

            self.emit ('for (var {0} = 0; {0} < {1}.length; {0}++) {{\n', self.nextTemp ('index'), self.getTemp ('iterable'))
            self.indent ()

            # Create and visit Assign node on the fly to benefit from tupple assignment
            self.visit (ast.Assign (
                targets = [node.target],
                value = ast.Subscript (
                    value = ast.Name (
                        id = self.getTemp ('iterable'),
                        ctx = ast.Load
                    ),
                    slice = ast.Index (
                        value = ast.Num (
                            n = self.getTemp ('index')
                        )
                    ),
                    ctx = ast.Load
                )
            ))
            self.emit (';\n')


        self.emitBody (node.body)
        self.dedent ()
        self.emit ('}}\n')

        if not (self.allowJavaScriptIter or optimize):
            if self.module.program.javaScriptVersion >= 6:
                pass
                # self.prevTemp ('iterator')    # Leave in for now, see outcommented fragment (1) above
            else:
                self.prevTemp ('index')
                self.prevTemp ('iterable')

        if node.orelse:
            self.adaptLineNrString (node.orelse, 1) # One off, since 'else' doesn't have it's own node and line nr

            self.emit ('if (!{}) {{\n', self.getTemp ('break'))
            self.prevTemp ('break')

            self.indent ()
            self.emitBody (node.orelse)
            self.dedent ()

            self.emit ('}}\n')
        else:
            self.prevTemp ('break')

    def visit_FormattedValue (self, node):
        self.visit (node.value)

    def visit_FunctionDef (self, node):
        def emitScopedBody ():
            self.inscope (node)

            self.emitBody (node.body)
            self.dedent ()

            if self.getScope (ast.FunctionDef) .containsYield:
                self.targetFragments.insert (yieldStarIndex, '*')

            self.descope ()

        if not node.name == '__pragma__':   # Don't generate code for the dummy pragma definition starting the extraLines in utils
                                            # Pragma should never be defined, except once directly in JavaScript to support __pragma__ ('<all>')
                                            # The rest of its use is only at compile time

            if type (self.getScope () .node) in (ast.Module, ast.FunctionDef):  # Global or function scope, so it's no method
                if type (self.getScope () .node) == ast.Module:
                    self.all.add (node.name)

                self.adaptLineNrString (node)
                self.emit ('var {} = function', self.filterId (node.name))

                yieldStarIndex = len (self.targetFragments)
                yieldStarLevel = self.indentLevel

                self.emit (' ')
                self.visit (node.args)
                emitScopedBody ()
                self.emit ('}}')

                if self.allowDocAttribs and self.isDocString (node.body [0]):
                    self.emitSetDoc (node.body [0])

                self.emitDecorators (node)
            else:                                                           # Class scope, so it's a method and needs the currying mechanism
                self.emit ('\n')
                self.adaptLineNrString (node)
                self.emit ('get {} () {{return __get__ (this, function', self.filterId (node.name))

                yieldStarIndex = len (self.targetFragments)
                yieldStarLevel = self.indentLevel

                self.emit (' ')
                self.visit (node.args)
                emitScopedBody ()
                self.emit ('}}')

                if self.allowDocAttribs and self.isDocString (node.body [0]):
                    self.emitSetDoc (node.body [0])

                if self.allowMemoizeCalls:
                    self.emit (', \'{}\'', node.name)   # Name will be used as attribute name to add bound function to instance

                self.emit (');}}')

                # Method decorators ignored, but @classmethod trivially works, since the class is the prototype of the object
                # So the object is an extension of the class, and anything you can do with a class, you can do with an object

                if node.name == '__iter__':
                    self.emit (',\n[Symbol.iterator] () {{return this.__iter__ ()}}')

                if node.name == '__next__':
                    self.emit (',\nnext: __jsUsePyNext__')  # ??? Shouldn't this be a property, to allow bound method pointers

    def visit_GeneratorExp (self, node):
        # Currently generator expressions are just iterators on lists.
        # It's important that they aren't just lists,
        # because the each for ... in ... would create a fresh iterator from it, prevening exhaustion.
        # Since a list comp is an iterator itself, just copies will be created,
        # which will exhaust together.
        self.visit_ListComp (node, isGenExp = True)

    def visit_Global (self, node):
        self.getScope (ast.FunctionDef) .nonlocals.update (node.names)

        # raise utils.Error (
            # lineNr = self.lineNr,
            # message = '\n\tKeyword \'global\' not supported, use \'nonlocal\' instead, or make variable attribute of \'window\'\n'
        # )

    def visit_If (self, node):
        self.adaptLineNrString (node)

        self.emit ('if (')
        self.emitBeginTruthy ()
        self.visit (node.test)
        self.emitEndTruthy ()
        self.emit (') {{\n')

        self.indent ()
        self.emitBody (node.body)
        self.dedent ()

        self.emit ('}}\n')

        if node.orelse:
            if len (node.orelse) == 1 and node.orelse [0].__class__.__name__ == 'If':
                # elif statement, we stay on the same line, no need to call adaptLineNrString
                self.emit ('else ')
                self.visit (node.orelse [0])
            else:
                self.adaptLineNrString (node.orelse, 1) # One off, since 'else' doesn't have it's own node and line nr
                
                self.emit ('else {{\n')
                self.indent ()
                self.emitBody (node.orelse)
                self.dedent ()
                self.emit ('}}\n')

    def visit_IfExp (self, node):
        self.emit ('(')
        self.emitBeginTruthy ()
        self.visit (node.test)
        self.emitEndTruthy ()
        self.emit (' ? ')
        self.visit (node.body)
        self.emit (' : ')
        self.visit (node.orelse)
        self.emit (')')

    def visit_Import (self, node):  # Import .. can only import modules
        self.adaptLineNrString (node)

        names = [alias for alias in node.names if not alias.name.startswith (self.stubsName)]

        if not names:
            return

        for index, alias in enumerate (names):
            try:
                self.useModule (alias.name)
            except Exception as exception:
                utils.enhanceException (
                    exception,
                    lineNr = self.lineNr,
                    message = '\n\tCan\'t import module \'{}\''.format (alias.name)
                )

            if alias.asname:
                self.emit ('var {} =  __init__ (__world__.{})', self.filterId (alias.asname), self.filterId (alias.name))
            else:
                aliasSplit = alias.name.split ('.', 1)
                head = aliasSplit [0]
                tail = aliasSplit [1] if len (aliasSplit) > 1 else ''

                self.importHeads.add (head)
                self.emit ('__nest__ ({}, \'{}\', __init__ (__world__.{}))', self.filterId (head), self.filterId (tail), self.filterId (alias.name))

            if index < len (names) - 1:
                self.emit (';\n')

    def visit_ImportFrom (self, node):  # From .. import can import modules or entities in modules
        self.adaptLineNrString (node)

        if node.module.startswith (self.stubsName):
            return

        try:
            # N.B. It's ok to call a modules __init__ multiple times, see __core__.mod.js
            for index, alias in enumerate (node.names):
                if alias.name == '*':                                           # * Never refers to modules, only to entities in modules
                    if len (node.names) > 1:
                        raise Error (
                            lineNr = node.lineno,
                            message = '\n\tCan\'t import module \'{}\''.format (alias.name)
                        )

                    module = self.useModule (node.module)

                    # Import everything
                    for index, name in enumerate (module.all):
                        self.emit ('var {0} = __init__ (__world__.{1}).{0}', self.filterId (name), self.filterId (node.module))
                        if index < len (module.all) - 1:
                            self.emit (';\n')

                    if type (self.getScope ().node) == ast.Module:
                        # And export everything imported, if we are not importing inside of a function.
                        self.all.update (module.all)
                else:
                    # Import something
                    # N.B. The emits in the try and except clauses have different placement of brackets
                    try:                                                        # Try if alias.name denotes a module
                        self.useModule ('{}.{}'.format (node.module, alias.name))

                        if alias.asname:
                            self.emit ('var {} = __init__ (__world__.{}.{})', self.filterId (alias.asname), self.filterId (node.module), self.filterId (alias.name))
                        else:
                            self.emit ('var {0} = __init__ (__world__.{1}.{0})', self.filterId (alias.name), self.filterId (node.module))
                    except:                                                     # If it doesn't it denotes an entity inside a module
                        self.useModule (node.module)

                        if alias.asname:
                            self.emit ('var {} = __init__ (__world__.{}).{}', self.filterId (alias.asname), self.filterId (node.module), self.filterId (alias.name))
                        else:
                            self.emit ('var {0} = __init__ (__world__.{1}).{0}', self.filterId (alias.name), self.filterId (node.module))

                    if type (self.getScope ().node) == ast.Module:
                        # And export that something imported
                        if alias.asname:
                            self.all.add (alias.asname)
                        else:
                            self.all.add (alias.name)

                    if index < len (node.names) - 1:
                        self.emit (';\n')
        except Exception as exception:
            utils.enhanceException (
                exception,
                lineNr = self.lineNr,
                message = '\n\tCan\'t import from module \'{}\''.format (node.module)
            )

    def visit_JoinedStr (self, node):
        self.emit (repr (''.join ([value.s if type (value) == ast.Str else '{{}}' for value in node.values])))
        self.emit ('.format (')
        index = 0
        for value in node.values:
            if type (value) == ast.FormattedValue:
                self.emitComma (index)
                self.visit (value)
                index += 1
        self.emit (')')

    def visit_Lambda (self, node):
        self.emit ('(function __lambda__ ',)    # Extra () needed to make it callable at definition time
        self.visit (node.args)
        self.emit ('return ')
        self.visit (node.body)
        self.dedent ()
        self.emit (';\n}})')

    def visit_List (self, node):
        self.emit ('list ([')
        for index, elt in enumerate (node.elts):
            self.emitComma (index)
            self.visit (elt)
        self.emit ('])')

    def visit_ListComp (self, node, isSet = False, isDict = False, isGenExp = False):
        elts = []
        bodies = [[]]

        # Create and visit For node on the fly to benefit from tupple assignment
        # The For node creates an Assign node on the fly, to get this done
        def nestLoops (generators):
            for comprehension in generators:
                target = comprehension.target
                iter = comprehension.iter

                # Make room for body of this for
                bodies.append ([])
                # Append this for to previous body
                bodies [-2].append (ast.For (target, iter, bodies [-1], []))

                for expr in comprehension.ifs:
                    test = expr

                    # Make room for body of this if
                    bodies.append ([])
                    # Append this if to previous body
                    bodies [-2].append (ast.If (
                        test = test,
                        body = bodies [-1],
                        orelse = []
                    ))

            bodies [-1].append (
                # Nodes to generate __accu<i>__.append (<elt>)
                ast.Call (
                    func = ast.Attribute (
                        value = ast.Name (
                            id = self.getTemp ('accu'),
                            ctx = ast.Load),
                        attr = 'append',
                        ctx = ast.Load
                    ),
                    args = [
                            ast.List (
                                elts = [node.key, node.value],
                                ctx = ast.Load
                            )
                        if isDict else
                            node.elt
                    ],
                    keywords = []
                )
            )

            self.visit (
                bodies [0][0]
            )

        self.emit ('function () {{\n')
        self.inscope (ast.FunctionDef ())
        self.indent ()
        self.emit ('var {} = [];\n', self.nextTemp ('accu'))
        nestLoops (node.generators [:]) # Leave original in intact, just for neatness
        self.emit (
            'return {}{}{};\n',
            'set (' if isSet else 'dict (' if isDict else '{} ('.format (self.filterId ('iter')) if isGenExp else '' ,
            self.getTemp ('accu'),
            ')' if isSet or isDict or isGenExp else ''
        )
        self.prevTemp ('accu')
        self.dedent ()
        self.descope ()
        self.emit ('}} ()')

    def visit_Module (self, node):
        self.adaptLineNrString (node)

        self.inscope (node)
        self.indent ()
        if self.module.metadata.name == self.module.program.mainModuleName:
            self.emit ('(function () {{\n')
            self.indent ()
        else:
            self.emit ('__nest__ (\n')
            self.indent ()
            self.emit ('__all__,\n')
            self.emit ('\'{}\', {{\n', self.filterId (self.module.metadata.name))
            self.indent ()
            self.emit ('__all__: {{\n')
            self.indent ()
            self.emit ('__inited__: false,\n')
            self.emit ('__init__: function (__all__) {{\n')
            self.indent ()

        importHeadsIndex = len (self.targetFragments)
        importHeadsLevel = self.indentLevel

        for stmt in node.body:
            if self.isDocString (stmt):
                if not self.docString:  # Remember first docstring seen (may not be first statement, because of a.o. __pragma__ ('docat')
                    self.docString = stmt
            else:
                self.visit (stmt)
                self.emit (';\n')

            # As soon as doc attribs are allowed, emit only once the first one ever seen, to match CPython behaviour
            if not self.docStringEmitted and self.allowDocAttribs and self.docString:
                self.emit ('var __doc__ = ')
                self.visit (self.docString)
                self.emit (';\n')
                self.all.add ('__doc__')
                self.docStringEmitted = True

        if self.use:
            self.use = sorted (self.use)
            self.emit ('__pragma__ (\'<use>\' +\n') # Only the last occurence of <use> and </use> are special.
            self.indent ()
            for name in self.use:
                self.emit ('\'{}\' +\n', name)
            self.dedent ()
            self.emit ('\'</use>\')\n')

        if self.all:
            self.all = sorted (self.all)
            self.emit ('__pragma__ (\'<all>\')\n')  # Only the last occurence of <all> and </all> are special.
            self.indent ()
            for name in self.all:
                self.emit ('__all__.{0} = {0};\n', self.filterId (name))
            self.dedent ()
            self.emit ('__pragma__ (\'</all>\')\n')

        self.dedent ()

        if self.module.metadata.name == self.module.program.mainModuleName:
            self.emit ('}}) ();\n')
        else:
            self.emit ('}}\n')
            self.dedent ()
            self.emit ('}}\n')
            self.dedent ()
            self.emit ('}}\n')
            self.dedent ()
            self.emit (');\n')
            self.dedent ()

        self.targetFragments.insert (importHeadsIndex, ''.join ([
            '{}var {} = {{}};{}\n'.format (self.tabs (importHeadsLevel), self.filterId (head), self.lineNrString)
            for head in sorted (self.importHeads)
        ]))
        self.descope ()

    def visit_Name (self, node):
        if node.id == '__file__':
            self.visit (ast.Str (s = self.module.metadata.sourcePath))
            return

        elif node.id == '__filename__':
            path = os.path.split (self.module.metadata.sourcePath)
            fileName = path [1]
            
            if fileName.startswith ('__init__'):
                subDir = os.path.split (path [0])
                fileName = os.path.join (subDir [1], fileName)
                
            self.visit (ast.Str (s = fileName))
            return

        elif node.id == '__line__':
            self.visit (ast.Num (n = self.lineNr))
            return

        elif node.id == '__name__':
            self.visit (ast.Str (s = self.module.metadata.name))
            return

        elif type (node.ctx) == ast.Store:
            if type (self.getScope () .node) == ast.Module:
                self.all.add (node.id)

        self.emit (self.filterId (node.id))

    def visit_NameConstant (self, node):
        self.emit (self.nameConsts [node.value])

    def visit_Nonlocal (self, node):
        self.getScope (ast.FunctionDef) .nonlocals.update (node.names)

    def visit_Num (self, node):
        self.emit ('complex (0, {})'.format (node.n.imag) if type (node.n) == complex else '{}'.format (node.n))

    def visit_Pass (self, node):
        self.adaptLineNrString (node)

        self.emit ('// pass')

    def visit_Raise (self, node):
        self.adaptLineNrString (node)

        if node.exc:
            # Create an exception object with a temporary name
            self.emit ('var {} = ', self.nextTemp ('except'))
            self.visit (node.exc)
            self.emit (';\n')
        else:
            # We want to rethrow, so we must be in a catch block, so the 'current exception' with name self.getTemp ('except') will exist already
            pass

        # Optionally add a __cause__ attribute to it
        self.emit ('{}.__cause__ = ', self.getTemp ('except'))
        if node.cause:
            self.visit (node.cause)
        else:
            self.emit ('null')

        self.emit (';\n')

        # Throw the exception
        self.emit ('throw {}', self.getTemp ('except'))

        # Relinquish the temporary name if we own it
        if node.exc:
            self.prevTemp ('except')

    def visit_Return (self, node):
        self.adaptLineNrString (node)

        self.emit ('return ')
        if node.value:
            self.visit (node.value)

    def visit_Set (self, node):
        self.emit ('new set ([')
        for index, elt in enumerate (node.elts):
            self.emitComma (index)
            self.visit (elt)
        self.emit ('])')

    def visit_SetComp (self, node):
        self.visit_ListComp (node, isSet = True)

    def visit_Slice (self, node):   # Only visited for dims as part of ExtSlice
        self.emit ('tuple ([')

        if node.lower == None:
            self.emit ('0')
        else:
            self.visit (node.lower)

        self.emit (', ')

        if node.upper == None:
            self.emit ('null')
        else:
            self.visit (node.upper)

        self.emit (', ')

        if node.step == None:
            self.emit ('1')
        else:
            self.visit (node.step)

        self.emit ('])')

    def visit_Str (self, node):
        self.emit ('{}', repr (node.s)) # Use repr (node.s) as second, rather than first parameter, since node.s may contain {}

    # Visited for RHS index, non-overloaded LHS index, RHS slice and RHS extended slice
    # LHS slice and overloaded LHS index are dealth with directy in visit_Assign, since the RHS is needed for them also
    def visit_Subscript (self, node):
        if type (node.slice) == ast.Index:
            if type (node.slice.value) == ast.Tuple:    # Always overloaded, it must be an RHS index
                self.visit (node.value)
                self.emit ('.__getitem__ (')
                self.stripTuple = True
                self.visit (node.slice.value)
                self.emit (')')
            elif self.allowOperatorOverloading:         # It must be an RHS index
                self.emit ('__getitem__ (')             # Free function tries .__getitem__ (overload) and [] (native)
                self.visit (node.value)
                self.emit (', ')
                self.visit (node.slice.value)
                self.emit (')')
            else:                                       # It may be an LHS or RHS index
                self.visit (node.value)
                self.emit (' [')
                self.visit (node.slice.value)
                self.emit (']')
        elif type (node.slice) == ast.Slice:
            if self.allowOperatorOverloading:
                self.emit ('__getslice__ (')            # Free function, tries .__getitem__ (overload) and .__getslice__ (native)
                self.visit (node.value)
                self.emit (', ')
            else:
                self.visit (node.value)
                self.emit ('.__getslice__ (')

            if node.slice.lower == None:
                self.emit ('0')
            else:
                self.visit (node.slice.lower)
            self.emit (', ')

            if node.slice.upper == None:
                self.emit ('null')
            else:
                self.visit (node.slice.upper)
            self.emit (', ')

            if node.slice.step == None:
                self.emit ('1')
            else:
                self.visit (node.slice.step)

            self.emit (')')
        elif type (node.slice) == ast.ExtSlice:         # Always overloaded
            self.visit (node.value)
            self.emit ('.__getitem__ (')                # Method, since extended slice access is always overloaded
            self.emit ('[')
            for index, dim in enumerate (node.slice.dims):
                self.emitComma (index)
                self.visit (dim)
            self.emit (']')
            self.emit (')')

    def visit_Try (self, node):
        self.adaptLineNrString (node)

        self.emit ('try {{\n')
        self.indent ()
        self.emitBody (node.body)

        if node.orelse:
            self.emit ('try {{\n')
            self.indent ()
            self.emitBody (node.orelse)
            self.dedent ()
            self.emit ('}}\n')
            self.emit ('catch ({}) {{\n', self.nextTemp ('except'))
            self.emit ('}}\n')
            self.prevTemp ('except')

        self.dedent ()
        self.emit ('}}\n')

        if node.handlers:                           # try ... finally (without any catch) is also valid Python
            self.emit ('catch ({}) {{\n', self.nextTemp ('except'))
            self.indent ()

            for index, excepthandler in enumerate (node.handlers):
                if index:
                    self.emit ('else ')             # Never here after a catch all

                if excepthandler.type:
                    self.emit ('if (isinstance ({}, ', self.getTemp ('except'))
                    self.visit (excepthandler.type)
                    self.emit (')) {{\n')
                    self.indent ()

                    if excepthandler.name:
                        self.emit ('var {} = {};\n', excepthandler.name, self.getTemp ('except'))

                    self.emitBody (excepthandler.body)

                    self.dedent ()
                    self.emit ('}}\n')
                else:                               # Catch all, swallowing no problem
                    self.emitBody (excepthandler.body)
                    break
            else:                                   # No catch all, avoid swallowing exception
                self.emit ('else {{\n')
                self.indent ()
                self.emit ('throw {};\n', self.getTemp ('except'))
                self.dedent ()
                self.emit ('}}\n')

            self.dedent ()
            self.prevTemp ('except')
            self.emit ('}}\n')

        if node.finalbody:
            self.emit ('finally {{\n')
            self.indent ()
            self.emitBody (node.finalbody)
            self.dedent ()
            self.emit ('}}\n')

    def visit_Tuple (self, node):
        keepTuple = not (self.stripTuple or self.stripTuples)       # Tuples used as indices are stripped for speed
        self.stripTuple = False             # Tuples used as indices are stripped for speed, only strip first tuple encountered
                                            # Tuples used as assignment target in a JavaScript 6 for-loop are stripped for correctness, not only first
        if keepTuple:
            self.emit ('tuple (')

        self.emit ('[')
        for index, elt in enumerate (node.elts):
            self.emitComma (index)
            self.visit (elt)

        self.emit (']')

        if keepTuple:
            self.emit (')')

    def visit_UnaryOp (self, node):
        if self.allowOperatorOverloading and type (node.op) == ast.USub:
            self.emit ('{} ('.format (self.filterId ('__neg__' )))
            self.visit (node.operand)
            self.emit (')')
        else:
            self.emit (self.operators [type (node.op)][0])
            self.emitBeginTruthy ()
            self.visitSubExpr (node, node.operand)
            self.emitEndTruthy ()

    def visit_While (self, node):
        self.adaptLineNrString (node)

        if node.orelse:
            self.emit ('var {} = false;\n', self.nextTemp ('break'))
        else:
            self.skipTemp ('break')

        self.emit ('while (')
        self.emitBeginTruthy ()
        self.visit (node.test)
        self.emitEndTruthy ()
        self.emit (') {{\n')

        self.indent ()
        self.emitBody (node.body)
        self.dedent ()

        self.emit ('}}\n')

        if node.orelse:
            self.adaptLineNrString (node.orelse, 1) # One off, since 'else' doesn't have it's own node and line nr

            self.emit ('if (!{}) {{\n', self.getTemp ('break'))
            self.prevTemp ('break')

            self.indent ()
            self.emitBody (node.orelse)
            self.dedent ()

            self.emit ('}}\n')
        else:
            self.prevTemp ('break')

    def visit_With (self, node):
        self.adaptLineNrString (node)

        for withitem in node.items:
            self.visit (withitem.optional_vars)
            self.emit (' = ')
            self.visit (withitem.context_expr)
            self.emit (';\n')

        self.emitBody (node.body)

        for withitem in node.items:
            self.visit (withitem.optional_vars)
            self.emit ('.close ()')

    def visit_Yield (self, node):
        self.getScope (ast.FunctionDef) .containsYield = True
        self.emit ('yield')
        if (node.value != None):
            self.emit (' ')
            self.visit (node.value)

    def visit_YieldFrom (self, node):
        self.getScope (ast.FunctionDef) .containsYield = True
        self.emit ('yield* ')
        self.visit (node.value)
