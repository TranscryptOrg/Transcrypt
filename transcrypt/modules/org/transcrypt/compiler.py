# ====== Legal notices
#
#
# Copyright 2014 - 2018 Jacques de Hooge, GEATEC engineering, www.geatec.com
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
import ast
import re
import copy
import datetime
import math
import traceback
import io
import subprocess
import shlex
import shutil
import tokenize
import collections
import json

from org.transcrypt import utils, sourcemaps, minify, static_check, type_check

inIf = False
ecom = True
noecom = False

dataClassDefaultArgTuple = (['init', True], ['repr', True], ['eq', True], ['order', False], ['unsafe_hash', False], ['frozen', False])
'''
All files required for deployment are placed in subdirectory __target__ of the application.
Each module has an unambiguous dotted path, always from one of the module roots, never relative.
Dotted paths are translated to dotted filenames.
The __runtime__ module is just another Python module with lots of JS code inside __pragma__ ('js', '{}', include...) fragments,
namely the __core__ and __builtin__ parts.

Sourcemaps are generated per module.
There's no need for a link with other modules.
Since import paths are static, names of minified JS files simply end on .js just like non-minified files, so not on .min.js.
Sourcemaps are named <module name>.map.
'''

class Program:
    def __init__ (
        self,
        moduleSearchDirs,   # All possible roots of the module path, the latter uniquely denoted by the dotted module name
        symbols,            # Set of symbols either passed on the command line, deduced from command line switches etc.
        envir               # Data about run / compilation environment
    ):
        utils.setProgram (self)

        self.moduleSearchDirs = moduleSearchDirs
        self.symbols = symbols
        self.envir = envir
        self.javascriptVersion = int (utils.commandArgs.esv) if utils.commandArgs.esv else 6

        self.moduleDict = {}    # Administration of all modules that play a role in this program
        self.importStack = []   # Pending imports, enables showing load sequence in case a module cannot be loaded

        # Set paths
        self.sourcePrepath = os.path.abspath (utils.commandArgs.source) .replace ('\\', '/')
        self.sourceDir = '/'.join (self.sourcePrepath.split ('/') [ : -1])
        self.mainModuleName = self.sourcePrepath.split ('/') [-1]
        self.targetDir = f'{self.sourceDir}/__target__'
        self.projectPath = f'{self.targetDir}/{self.mainModuleName}.project'

        # Load the most recent project metadata
        try:
            with open (self.projectPath, 'r') as projectFile:
                project = json.load (projectFile)
        except:
            project = {}

        # Reset everything in case of a build or a command args change
        self.optionsChanged = utils.commandArgs.projectOptions != project.get ('options')
        if utils.commandArgs.build or self.optionsChanged:
            shutil.rmtree (self.targetDir, ignore_errors = True)

        try:
            # Provide runtime module since it's always needed but never imported explicitly
            self.runtimeModuleName = 'org.transcrypt.__runtime__'
            self.searchedModulePaths = []   # Report only failure of searching runtime, so clear any history
            self.provide (self.runtimeModuleName)

            # Provide main module and, with that, all other modules recursively
            self.searchedModulePaths = []   # Report only failure of searching for main, so clear any history
            self.provide (self.mainModuleName, '__main__')
        except Exception as exception:
            utils.enhanceException (    # If it was an Error, don't change it, otherwise make it one (??? Just to be sure?)
                exception,
                message = f'\n\t{exception}'
            )

        # Finally, save the run info
        project = {
            'options': utils.commandArgs.projectOptions,
            'modules': [{'source': module.sourcePath, 'target': module.targetPath} for module in self.moduleDict.values ()],
        }
        with utils.create (self.projectPath) as projectFile:
            json.dump (project, projectFile)

    def provide (self, moduleName, __moduleName__ = None, filter = None):
        # moduleName may contain dots if it's imported, but it'll have the same name in every import

        if moduleName in self.moduleDict:  # Find out if module is already provided
            return self.moduleDict [moduleName]
        else:                              # If not, provide by loading or compiling
            # This may fail legally if filteredModuleName ends on a name of something in a module, rather than of the module itself
            return Module (self, moduleName, __moduleName__, filter)

class Module:
    def __init__ (self, program, name, __name__, filter):
        self.program = program
        self.name = name
        self.__name__ = __name__ if __name__ else self.name

        # Try to find module, exception if fails
        self.findPaths (filter)

        # Remember names of module being under compilation and line nrs of current import
        # Used for error reports
        # Note that JavaScript-only modules will leave lineNr None if they import something
        # This is since there's no explicit import location in such modules
        # Only add a module to the importStack if it's at least found by findPaths, otherwise it has no sourcePath to report
        self.program.importStack.append ([self, None])

        # Register that module is found
        self.program.moduleDict [self.name] = self

        # Create sourcemapper, if only for cleaning dir after previous run
        self.sourceMapper = sourcemaps.SourceMapper (
            self.name,
            self.program.targetDir,
            not utils.commandArgs.nomin,
            utils.commandArgs.dmap
        )

        # Generate, copy or load target code and symbols
        if (
            utils.commandArgs.build or self.program.optionsChanged
            or
            not os.path.isfile (self.targetPath) or os.path.getmtime (self.sourcePath) > os.path.getmtime (self.targetPath)
        ):
            # If it's a build rather than a make, or the target doesn't exist or the target is obsolete

            if self.isJavascriptOnly:
                # Digest source JavaScript and copy to target location
                self.loadJavascript ()

                # JavaScript-only, so annotations are pointless, so it's ok to strip
                javascriptDigest = utils.digestJavascript (self.targetCode, self.program.symbols, not utils.commandArgs.dnostrip, False)

            else:
                # Perform static typecheck on source code
                if utils.commandArgs.dstat:
                    try:
                        type_check.run (self.sourcePath)
                    except Exception as exception:
                        utils.log (True, 'Validating: {} and dependencies\n\tInternal error in static typing validator\n', self.sourcePath)

                # Construct parse tree
                self.parse ()
                if utils.commandArgs.dtree:
                    self.dumpTree ()

                # Perform lightweight static check on parse tree
                if utils.commandArgs.dcheck:
                    try:
                        static_check.run (self.sourcePath, self.parseTree)
                    except Exception as exception:
                        utils.log (True, 'Checking: {}\n\tInternal error in lightweight consistency checker, remainder of module skipped\n', self.sourcePath)

                # Generate JavaScript code and sourcemap from parse tree
                self.generateJavascriptAndPrettyMap ()

                # Generated code, so no comments to strip, may have annotations so don't strip. There won't be any strip pragma's anyhow.
                javascriptDigest = utils.digestJavascript (self.targetCode, self.program.symbols, False, self.generator.allowDebugMap)

            # Write target code
            utils.log (True, 'Saving target code in: {}\n', self.targetPath)
            filePath = self.targetPath if utils.commandArgs.nomin else self.prettyTargetPath
            with utils.create (filePath) as aFile:
                aFile.write (self.targetCode)

            # Minify target code
            if not utils.commandArgs.nomin:
                utils.log (True, 'Saving minified target code in: {}\n', self.targetPath)
                minify.run (
                    self.program.targetDir,
                    self.prettyTargetName,
                    self.targetName,
                    mapFileName = self.shrinkMapName if utils.commandArgs.map else None,
                )

                if utils.commandArgs.map:
                    if self.isJavascriptOnly:
                        if os.path.isfile (self.mapPath):
                            os.remove (self.mapPath)
                        os.rename (self.shrinkMapPath, self.mapPath)
                    else:
                        self.sourceMapper.generateMultilevelMap ()

            # Append map reference to target file, which may be minified or not
            with open (self.targetPath, 'a') as targetFile:
                targetFile.write (self.mapRef)

        else:
            # If it's a make an rather than a build and the target exists, load it, beautify it if needed and run through digestJavascript for obtaining symbols
            self.targetCode = open (self.targetPath, 'r') .read ()
            javascriptDigest = utils.digestJavascript (self.targetCode, self.program.symbols, True, False, refuseIfAppearsMinified = True)

            if not javascriptDigest:
                minify.run (
                    self.program.targetDir,
                    self.targetName,
                    self.prettyTargetName,
                    prettify = True,
                )
                self.prettyTargetCode = open (self.prettyTargetPath, 'r') .read ()
                javascriptDigest = utils.digestJavascript (self.prettyTargetCode, self.program.symbols, True, False)    # Prettified, so doesn't start with '/'!

        self.targetCode = javascriptDigest.digestedCode
        self.importedModuleNames = javascriptDigest.importedModuleNames
        self.exportedNames = javascriptDigest.exportedNames

        for importedModuleName in self.importedModuleNames:

            # Unfiltered hyphens allowed, since we may be in a JavaScript-only part of the module hierarchy
            # Also these imports cannot legally fail, since the digested JavaScript code already has unambiguous imports
            # If the JavaScript module was just generated from a Python module, it will already be in the module dictionary
            self.program.searchedModulePaths = []
            self.program.provide (importedModuleName)

        # Remove eventual intermediate files
        utils.tryRemove (self.prettyTargetPath)
        utils.tryRemove (self.shrinkMapPath)
        utils.tryRemove (self.prettyMapPath)

        # Module not under compilation anymore, so pop it
        self.program.importStack.pop ()

    def findPaths (self, filter):
        # Filter to get hyphens and/or dots in name if a suitable alias is defined
        # The filter function, and with it the active aliases, are passed by the importing module
        rawRelSourceSlug = self.name.replace ('.', '/')
        relSourceSlug = filter (rawRelSourceSlug) if filter and utils.commandArgs.alimod else rawRelSourceSlug

        '''
        # BEGIN DEBUGGING CODE
        print ()
        print ('Raw slug   :', rawRelSourceSlug)
        print ('Cooked slug:', relSourceSlug)
        print ()
        # END DEBUGGING CODE
        '''

        for searchDir in self.program.moduleSearchDirs:
            # Find source slugs
            sourceSlug = f'{searchDir}/{relSourceSlug}'
            if os.path.isdir (sourceSlug):
                self.sourceDir = sourceSlug
                self.sourcePrename = '__init__'
            else:
                self.sourceDir, self.sourcePrename = sourceSlug.rsplit ('/', 1)
            self.sourcePrepath = f'{self.sourceDir}/{self.sourcePrename}'
            self.pythonSourcePath = f'{self.sourcePrepath}.py'
            self.javascriptSourcePath = f'{self.sourcePrepath}.js'

            # Find target slugs
            self.targetPrepath = f'{self.program.targetDir}/{self.name}'
            self.targetName = f'{self.name}.js'
            self.targetPath = f'{self.targetPrepath}.js'
            self.prettyTargetName = f'{self.name}.pretty.js'
            self.prettyTargetPath = f'{self.targetPrepath}.pretty.js'
            self.importRelPath = f'./{self.name}.js'
            self.treePath = f'{self.targetPrepath}.tree'
            self.mapPath =  f'{self.targetPrepath}.map'
            self.prettyMapPath = f'{self.targetPrepath}.shrink.map'
            self.shrinkMapName = f'{self.name}.shrink.map'
            self.shrinkMapPath = f'{self.targetPrepath}.shrink.map'
            self.mapSourcePath = f'{self.targetPrepath}.py'
            self.mapRef = f'\n//# sourceMappingURL={self.name}.map'

            # If module exists
            if os.path.isfile (self.pythonSourcePath) or os.path.isfile (self.javascriptSourcePath):
                # Check if it's a JavaScript-only module
                self.isJavascriptOnly = os.path.isfile (self.javascriptSourcePath) and not os.path.isfile (self.pythonSourcePath)
                # Set more paths (tree, sourcemap, ...)
                # (To do)
                self.sourcePath = self.javascriptSourcePath if self.isJavascriptOnly else self.pythonSourcePath
                break

            # Remember all fruitless paths to give a decent error report if module isn't found
            # Note that this aren't all searched paths for a particular module,
            # since the difference between an module and a facility inside a module isn't always known a priori
            self.program.searchedModulePaths.extend ([self.pythonSourcePath, self.javascriptSourcePath])
        else:
            # If even the target can't be loaded then there's a problem with this module, root or not
            # However, loading a module is allowed to fail (see self.revisit_ImportFrom)
            # In that case this error is swallowed, but searchedModulePath is retained,
            # because searching in the swallowing except branch may also fail and should mention ALL searched paths
            raise utils.Error (
                message = '\n\tImport error, can\'t find any of:\n\t\t{}\n'.format ('\n\t\t'. join (self.program.searchedModulePaths))
            )

    def generateJavascriptAndPrettyMap (self):
        utils.log (False, 'Generating code for module: {}\n', self.targetPath)

        # Generate target fragments
        self.generator = Generator (self)

        # Fabricate target lines from target fragments
        if utils.commandArgs.map or utils.commandArgs.anno:
            # In both cases the generator will have instrumented the target fragments by appending line numbers
            # N.B. __pragma__ ('noanno') will be too late to prevent instrumenting of the main module's first line
            # In that case if no source maps are required either, the appended line numbers simply won't be used

            # Split joined fragments into (instrumented) lines
            instrumentedTargetLines = ''.join (self.generator.targetFragments) .split ('\n')

            # Only remember source line nrs if a map is to be generated (so not if only annotated JavaScript is needed)
            if utils.commandArgs.map:
                self.sourceLineNrs = []

            # Split instrumentedTargetLines in (bare) targetLines and sourceLineNrs, skipping empty statements
            targetLines = []
            for targetLine in instrumentedTargetLines:
                # The actual splitting
                sourceLineNrString = targetLine [-sourcemaps.lineNrLength : ]                           # Take the appended line number, e.g. the string '000014'
                sourceLineNr = int ('1' + sourceLineNrString) - sourcemaps.maxNrOfSourceLinesPerModule  # Turn it into an integer, e.g. 14
                targetLine = targetLine [ : -sourcemaps.lineNrLength]                                   # Obtain non-instrumented line by removing the appended line number

                # Only append non-emptpy statements and their number info
                if targetLine.strip () != ';':                                                          # If the non-instrumented line isn't empty
                    if self.generator.allowDebugMap:                                                         # If annotations comments have to be prepended
                        targetLine = '/* {} */ {}'.format (sourceLineNrString, targetLine)              # Prepend them
                    targetLines.append (targetLine)                                                     # Add the target line, with or without prepended annotation comment

                    # Store line nrs for source map
                    if utils.commandArgs.map:
                        self.sourceLineNrs.append (sourceLineNr)                                        # Remember its line number to be able to generate a sourcemap

            # Generate per module sourcemap and copy sourcefile to target location
            if utils.commandArgs.map:
                utils.log (False, 'Saving source map in: {}\n', self.mapPath)
                self.sourceMapper.generateAndSavePrettyMap (self.sourceLineNrs)
                shutil.copyfile (self.sourcePath, self.mapSourcePath)
        else:
            # No maps or annotations needed, so this 'no stripping' shortcut for speed
            targetLines = [line for line in  ''.join (self.generator.targetFragments) .split ('\n') if line.strip () != ';']

        self.targetCode = '\n'.join (targetLines)

    def loadJavascript (self):
        with tokenize.open (self.sourcePath) as sourceFile:
            self.targetCode = sourceFile.read ()

    def parse (self):
        def pragmasFromComments (sourceCode):
            # This function turns comment-like pragma's into regular ones, both for multi-line and single-line pragma's
            # It changes rather than regenerates the sourcecode, since tokenize/untokenize will mess up formatting
            # Single line pragma's are always comment-like and will be turned into multi-line function-like pragma's
            # Also in this function executable comments are converted to normal code 

            # Tokenize the source code, to be able to recognize comments easily
            tokens = tokenize.tokenize (io.BytesIO (sourceCode.encode ('utf-8')) .readline)

            # Store all line indices of comment-like pragma's, multi-line and single-line in separate lists
            pragmaCommentLineIndices = []
            shortPragmaCommentLineIndices = []
            ecomPragmaLineIndices = []
            noecomPragmaLineIndices = []
            pragmaIndex = -1000
            for tokenIndex, (tokenType, tokenString, startRowColumn, endRowColumn, logicalLine) in enumerate (tokens):
                if tokenType == tokenize.COMMENT:
                    strippedComment = tokenString [1 : ] .lstrip ()
                    if  strippedComment.startswith ('__pragma__'):
                    
                       # Remember line index of multi-line pragma, like: # __pragma__ (...
                        pragmaCommentLineIndices.append (startRowColumn [0] - 1)
                    elif strippedComment.replace (' ', '') .replace ('\t', '') .startswith ('__:'):
                    
                        # Remember line index of single-line pragma, like: <some code> # __: ...
                        shortPragmaCommentLineIndices.append (startRowColumn [0] - 1)
                if tokenType == tokenize.NAME and tokenString == '__pragma__':
                    pragmaIndex = tokenIndex
                    
                if tokenIndex - pragmaIndex == 2:
                    pragmaKind = tokenString [1:-1]
                    if pragmaKind == 'ecom':
                        ecomPragmaLineIndices.append (startRowColumn [0] - 1)
                    elif pragmaKind == 'noecom':
                        noecomPragmaLineIndices.append (startRowColumn [0] - 1)

            # Convert original, non-tokenized sourcecode to a list of lines
            sourceLines = sourceCode.split ('\n')
            
            # Use line indices of multi-line function-like ecom / noecom pragma's to transform these lines into executable comment switches
            for ecomPragmaLineIndex in ecomPragmaLineIndices:
                sourceLines [ecomPragmaLineIndex] = ecom
            for noecomPragmaLineIndex in noecomPragmaLineIndices:
                sourceLines [noecomPragmaLineIndex] = noecom
                        
            # Use line indices of multi-line comment-like pragma singles to transform these into function-like pragma singles (which often turn out te be part of a matching pair)
            allowExecutableComments = utils.commandArgs.ecom
            for pragmaCommentLineIndex in pragmaCommentLineIndices:
                indentation, separator, tail = sourceLines [pragmaCommentLineIndex] .partition ('#')
                pragma, separator, comment = tail.partition ('#')
                pragma = pragma.replace (' ', '') .replace ('\t', '')
                
                # Turn appropriate lines into executable comment switches
                if "('ecom')" in pragma or '("ecom")' in pragma:
                    allowExecutableComments = True
                    sourceLines [pragmaCommentLineIndex] = ecom
                elif "('noecom')" in pragma or '("noecom")' in pragma:
                    allowExecutableComments = False
                    sourceLines [pragmaCommentLineIndex] = noecom
                else:
                    sourceLines [pragmaCommentLineIndex] = indentation + tail.lstrip ()

            # Use line indices of single-line comment-like pragma's to transform these into function-like pragma pairs
            for shortPragmaCommentLineIndex in shortPragmaCommentLineIndices:
                head, tail = sourceLines [shortPragmaCommentLineIndex] .rsplit ('#', 1)
                strippedHead = head.lstrip ()
                indent = head [ : len (head) - len (strippedHead)]
                pragmaName = tail.replace (' ', '') .replace ('\t', '') [3:]
                
                # Turn appropriate lines into executable comment switches
                if pragmaName == 'ecom':
                    sourceLines [pragmaCommentLineIndex] = ecom             
                elif pragmaName == 'noecom':
                    sourceLines [pragmaCommentLineIndex] = noecom                
                elif pragmaName.startswith ('no'):
                    sourceLines [shortPragmaCommentLineIndex] = '{}__pragma__ (\'{}\'); {}; __pragma__ (\'{}\')' .format (indent, pragmaName, head, pragmaName [2:])    # Correct!
                else:
                    sourceLines [shortPragmaCommentLineIndex] = '{}__pragma__ (\'{}\'); {}; __pragma__ (\'no{}\')' .format (indent, pragmaName, head, pragmaName)
                    
            # Switch executable comments on c.q. off and turn executable comments into normal code lines for Transcrypt (as opposed to CPython)
            uncommentedSourceLines = []
            for sourceLine in sourceLines:
                if sourceLine == ecom:
                    allowExecutableComments = True
                elif sourceLine == noecom:
                    allowExecutableComments = False
                elif allowExecutableComments:
                    lStrippedSourceLine = sourceLine.lstrip ()
                    if not lStrippedSourceLine [:4] in {"'''?", "?'''", '"""?', '?"""'}:
                        uncommentedSourceLines.append (sourceLine.replace ('#?', '', 1) if lStrippedSourceLine.startswith ('#?') else sourceLine)
                else:
                    uncommentedSourceLines.append (sourceLine)
                    
            # Return joined lines, to be used for parsing
            return '\n'.join (uncommentedSourceLines)

        try:
            utils.log (False, 'Parsing module: {}\n', self.sourcePath)

            with tokenize.open (self.sourcePath) as sourceFile:
                self.sourceCode = utils.extraLines + sourceFile.read ()
                
            self.parseTree = ast.parse (pragmasFromComments (self.sourceCode))

            for node in ast.walk (self.parseTree):
                for childNode in ast.iter_child_nodes (node):
                    childNode.parentNode = node

        except SyntaxError as syntaxError:
            utils.enhanceException (
                syntaxError,
                lineNr = syntaxError.lineno,
                message = (
                        '\n\t{} [<-SYNTAX FAULT] {}'.format (
                            syntaxError.text [:syntaxError.offset].lstrip (),
                            syntaxError.text [syntaxError.offset:].rstrip ()
                        )
                    if syntaxError.text else
                        syntaxError.args [0]
                )
            )

    def dumpTree (self):
        utils.log (False, 'Dumping syntax tree for module: {}\n', self.sourcePath)

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

        with utils.create (self.treePath) as treeFile:
            treeFile.write (self.textTree)

class Generator (ast.NodeVisitor):
    # Terms like parent, child, ancestor and descendant refer to the parse tree here, not to inheritance

    def __init__ (self, module):
        self.module = module

        self.targetFragments = []
        self.fragmentIndex = 0
        self.indentLevel = 0
        self.scopes = []
        self.importHeads = set ()
        self.importHoistMemos = []
        self.allOwnNames = set ()
        self.allImportedNames = set ()
        self.expectingNonOverloadedLhsIndex = False
        self.lineNr = 1
        self.propertyAccessorList = []
        self.mergeList = []

        self.aliases = [
# START predef_aliases

            # Format: ('<Python source identifier>', '<JavaScript target identifier>')

                                                    ('js_and', 'and'),
            ('arguments', 'py_arguments'),          ('js_arguments', 'arguments'),
            ('case', 'py_case'),
            ('clear', 'py_clear'),                  ('js_clear', 'clear'),
                                                    ('js_conjugate', 'conjugate'),
            ('default', 'py_default'),
            ('del', 'py_del'),                      ('js_del', 'del'),
            ('false', 'py_false'),
                                                    ('js_from', 'from'),
            ('get', 'py_get'),                      ('js_get', 'get'),
                                                    ('js_global', 'global'),
            ('Infinity', 'py_Infinity'),            ('js_Infinity', 'Infinity'),
            ('is', 'py_is'),                        ('js_is', 'is'),
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
            ('type', 'py_metatype'),                ('js_type', 'type'),    # Only for the type metaclass, the type operator is dealt with separately in visit_Call
            ('TypeError', 'py_TypeError'),          ('js_TypeError', 'TypeError'),
            ('update', 'py_update'),                ('js_update', 'update'),
            ('values', 'py_values'),                ('js_values', 'values'),
            ('reversed', 'py_reversed'),            ('js_reversed', 'reversed'),
            ('setdefault', 'py_setdefault'),        ('js_setdefault', 'setdefault'),
                                                    ('js_super', 'super'),
            ('true', 'py_true'),
            ('undefined', 'py_undefined'),          ('js_undefined', 'undefined'),

# END predef_aliases
        ]

        self.idFiltering = True

        self.tempIndices = {}
        self.skippedTemps = set ()
        self.stubsName = 'org.{}.stubs.'.format (self.module.program.envir.transpiler_name)

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
        self.allowKeyCheck = utils.commandArgs.keycheck
        self.allowDebugMap = utils.commandArgs.anno and not self.module.sourcePath.endswith ('.js')
        self.allowDocAttribs = utils.commandArgs.docat
        self.allowGlobals = utils.commandArgs.xglobs
        self.allowJavaScriptIter = False
        self.allowJavaScriptCall = utils.commandArgs.jscall
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

    def filterId (self, qualifiedId):   # Convention: only called at emission time or file name fabrication time

        if not self.idFiltering or (qualifiedId.startswith ('__') and qualifiedId.endswith ('__')):
            # Leave system dunder names unchanged
            return qualifiedId
        else:
            # Filter the rest, trying all aliases sucessively
            for alias in self.aliases:

                # Replace non-adjacent and odd adjacent matches, turning __<alias [0]>__ into =<alias [1]>=
                qualifiedId = re.sub (
                    fr'(^|(?P<preDunder>__)|(?<=[./])){alias [0]}((?P<postDunder>__)|(?=[./])|$)',
                    lambda matchObject: (
                        ('=' if matchObject.group ('preDunder') else '') +
                        alias [1] +
                        ('=' if matchObject.group ('postDunder') else '')
                    ),
                    qualifiedId
                )

                # Replace all remaining matches
                qualifiedId = re.sub (
                    fr'(^|(?<=[./=])){alias [0]}((?=[./=])|$)',
                    alias [1],
                    qualifiedId
                )

            # Take out all occurences of temporary =, leave non-matching __ unchanged)
            return qualifiedId.replace ('=', '')

    def tabs (self, indentLevel = None):
        if indentLevel == None:
            indentLevel = self.indentLevel
        return indentLevel * '\t'

    def emit (self, fragment, *formatter):
        if (                                                                                            # If at the start of a new line
            not self.targetFragments or                                                                 # It may be the first line
            (self.targetFragments and self.targetFragments [self.fragmentIndex - 1] .endswith ('\n'))   # It may a new line but not the first line
        ):
            self.targetFragments.insert (self.fragmentIndex, self.tabs ())
            self.fragmentIndex += 1

        fragment = fragment [:-1] .replace ('\n', '\n' + self.tabs ()) + fragment [-1]                  # There may be \n's embedded in the fragment

        self.targetFragments.insert (self.fragmentIndex, fragment.format (*formatter) .replace ('\n', self.lineNrString + '\n'))
        self.fragmentIndex += 1

    def indent (self):
        self.indentLevel += 1

    def dedent (self):
        self.indentLevel -= 1

    def inscope (self, node):
        # Called at visiting modules, classes and functions
        self.scopes.append (utils.Any (
            node = node,
            nonlocals = set (),
            containsYield = False
        ))

    def descope (self):
        self.scopes.pop ()

    def getScope (self, *nodeTypes):
        if nodeTypes:
            for scope in reversed (self.scopes):
                if type (scope.node) in nodeTypes:
                    return scope
        else:
            return self.scopes [-1]

    def getAdjacentClassScopes (self, inMethod = False):
        # Work backward until finding an interruption in the chain
        # Needed to fix destructuring assignment in nested classes and to make super () work
        # The latter needs inMethod, since supported use of super () is directly or indirectly enclosed in a method body
        reversedClassScopes = []
        for scope in reversed (self.scopes):
            if inMethod:
                if type (scope.node) in (ast.FunctionDef, ast.AsyncFunctionDef):
                    continue
                else:
                    inMethod = False

            if type (scope.node) != ast.ClassDef:
                break
            reversedClassScopes.append (scope)
        return reversed (reversedClassScopes)

    def emitComma (self, index, blank = True):
        if self.noskipCodeGeneration and self.conditionalCodeGeneration and index:
            self.emit (', ' if blank else ',')

    def emitBeginTruthy (self):
        if self.allowConversionToTruthValue:
            self.emit ('__t__ (')

    def emitEndTruthy (self):
        if self.allowConversionToTruthValue:
            self.emit (')')

    def adaptLineNrString (self, node = None, offset = 0):
        if utils.commandArgs.map or utils.commandArgs.anno: # Under these conditions, appended line numbers will be stripped later, so they have to be there
            if node:
                if hasattr (node, 'lineno'):
                    lineNr = node.lineno + offset   # Use new line number
                else:
                    lineNr = self.lineNr + offset   # Use 'cached' line nubmer
            else:
                lineNr = 1 + offset

            self.lineNrString = str (sourcemaps.maxNrOfSourceLinesPerModule + lineNr) [1 : ]
        else:                                               # __pragma__ ('noanno') isn't enough to perform this else-clause and to later on take the 'no stripping' shortcut
                                                            # This is in the main module the first line will already have been instrumented
                                                            # So in that case each line is instrumented and instrumentation will be stripped later on
            self.lineNrString = ''

    def isCommentString (self, statement):
        return isinstance (statement, ast.Expr) and isinstance (statement.value, ast.Str)

    def emitBody (self, body):
        for statement in body:
            if self.isCommentString (statement):
                pass
            else:
                self.visit (statement)
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
            elif self.allowOperatorOverloading:     # Possibly overloaded LHS index dealt with here, is special case
                self.emit ('__setitem__ (')         # Free function tries .__setitem__ (overload) and [] (native)
                self.visit (target.value)
                self.emit (', ')
                self.visit (target.slice.value)
                self.emit (', ')
                self.visit (value)
                emitPathIndices ()
                self.emit (')')
            else:                                   # Non-overloaded LHS index just dealt with by visit_Subscript
                                                    # which is called indirectly here
                self.expectingNonOverloadedLhsIndex = True
                self.visit (target)
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
        self.module.program.importStack [-1][1] = self.lineNr               # Remember line nr of import statement for the error report
        return self.module.program.provide (name, filter = self.filterId)   # Must be done first because it can generate a healthy exception

    def isCall (self, node, name):
        return type (node) == ast.Call and type (node.func) == ast.Name and node.func.id == name

    def getPragmaFromExpr (self, node):
        return node.value.args if type (node) == ast.Expr and self.isCall (node.value, '__pragma__') else None

    def getPragmaFromIf (self, node):
        return node.test.args if type (node) == ast.If and self.isCall (node.test, '__pragma__') else None

    def visit (self, node):             # Overrides visit () method of parent ast.NodeVisitor
        try:
            # Adapt self.lineNr to each visited node
            # The lineNr is used in line number annotations and in error reports
            # In case of hoisting the line number of the source code will have to be remembered until the hoist is dealt with

            self.lineNr = node.lineno
        except:
            pass

        pragmaInIf = self.getPragmaFromIf (node)
        pragmaInExpr = self.getPragmaFromExpr (node)

        if pragmaInIf:
            if pragmaInIf [0] .s == 'defined':
                for symbol in pragmaInIf [1:]:
                    if symbol.s in self.module.program.symbols:
                        definedInIf = True
                        break
                else:
                    definedInIf = False
        elif pragmaInExpr:
            if pragmaInExpr [0] .s == 'skip':
                self.noskipCodeGeneration = False
            elif pragmaInExpr [0] .s == 'noskip':
                self.noskipCodeGeneration = True

            if pragmaInExpr [0] .s in ('ifdef', 'ifndef'):
                definedInExpr = eval (    # Explained with __pragma__ ('js', ...)
                    compile (
                        ast.Expression (pragmaInExpr [1]),
                        '<string>',
                        'eval'
                    ),
                    {},
                    {'__envir__': self.module.program.envir}
                ) in self.module.program.symbols

            if pragmaInExpr [0] .s == 'ifdef':
                self.conditionalCodeGeneration = definedInExpr
            elif pragmaInExpr [0] .s == 'ifndef':
                self.conditionalCodeGeneration = not definedInExpr
            elif pragmaInExpr [0] .s == 'else':
                self.conditionalCodeGeneration = not self.conditionalCodeGeneration
            elif pragmaInExpr [0] .s == 'endif':
                self.conditionalCodeGeneration = True

        if self.noskipCodeGeneration and self.conditionalCodeGeneration:
            if pragmaInIf:
                if definedInIf:
                    self.emitBody (node.body)
            else:
                super () .visit (node)

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
                # If a default expr is given for this arg

                # Condition for using that default expr:
                # - no actual param value has been passed for this formal param in the call
                # or
                # - the actual param has property __kwargtrans__ (is marked a __kwargtrans__ object)
                # The latter is because the __kwargtrans__ object isn't a 'regular' actual param, so shouldn't be assigned to any formal param
                # Since the formal param "who's turn it was" does not get an actual value, it'll have to be satisfied with its default expr
                self.emit ('if (typeof {0} == \'undefined\' || ({0} != null && {0}.hasOwnProperty ("__kwargtrans__"))) {{;\n', self.filterId (arg.arg))

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
            # It's only known at call time if there are keyword arguments, unless there are no arguments at all, so always have to generate this code
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

    def visit_AnnAssign (self, node):
        if node.value != None:  # Rather than node.value is a NameConstant with value None
            self.visit (
                ast.Assign (
                    [node.target],
                    node.value
                )
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
                    self.emit (')')
                else:
                    if type (target) == ast.Name:
                        if type (self.getScope () .node) == ast.ClassDef and target.id != self.getTemp ('left'):
                            self.emit ('{}.'.format ('.'.join ([scope.node.name for scope in self.getAdjacentClassScopes ()]))) # The target is a class attribute
                        elif target.id in self.getScope () .nonlocals:
                            pass
                        else:
                            if type (self.getScope () .node) == ast.Module: # Redundant but regular
                                if hasattr (node, 'parentNode') and type (node.parentNode) == ast.Module and not target.id in self.allOwnNames:
                                    self.emit ('export ')
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

    def visit_Await (self, node):
        self.emit ('await ')
        self.visit (node.value)

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
            self.expectingNonOverloadedLhsIndex = True
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
            if self.allowOperatorOverloading:
                self.emit ('__floordiv__ (')
                self.visitSubExpr (node, node.left)
                self.emit (', ')
                self.visitSubExpr (node, node.right)
                self.emit (')')
            else:
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
                ('__floordiv__' if self.allowOperatorOverloading else 'Math.floor') if type (node.op) == ast.FloorDiv else
                ('__pow__' if self.allowOperatorOverloading else 'Math.pow') if type (node.op) == ast.Pow else
                '__matmul__' if type (node.op) == ast.MatMult else
                ('__jsmod__' if self.allowJavaScriptMod else '__mod__') if type (node.op) == ast.Mod else

                # Overloaded arithmetic
                '__mul__' if type (node.op) == ast.Mult else
                '__truediv__' if type (node.op) == ast.Div else
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

    def visit_Bytes (self, node):
        self.emit ('bytes (\'{}\')', node.s.decode ('ASCII'))

    def visit_Call (self, node, dataClassArgDict = None):
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
                    self.emit ('__mergekwargtrans__ (')
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
            try:
                searchedIncludePaths = []
                for searchDir in self.module.program.moduleSearchDirs:
                    filePath = '{}/{}'.format (searchDir, fileName)
                    if os.path.isfile (filePath):
                        includedCode = tokenize.open (filePath) .read ()
                        if fileName.endswith ('.js'):
                            # Only leave comments in in case of a dnostrip and not anno, the latter to prevent nested comments
                            includedCode = utils.digestJavascript (includedCode, self.module.program.symbols, not utils.commandArgs.dnostrip or utils.commandArgs.anno, self.allowDebugMap) .digestedCode
                        return includedCode
                    else:
                        searchedIncludePaths.append (filePath)
                else:
                    raise utils.Error (
                        lineNr = self.lineNr,
                        message = '\n\tAttempt to include file: {}\n\tCan\'t find any of:\n\t\t{}\n'.format (
                            node.args [0], '\n\t\t'. join (searchedIncludePaths)
                        )
                    )
            except:
                print (traceback.format_exc ())

        # For a start, some special cases of calls to follow
        if type (node.func) == ast.Name:

            # type () function
            if node.func.id == 'type':
                self.emit ('py_typeof (')   # Don't use general alias, since this is the type operator, not the type metaclass
                self.visit (node.args [0])
                self.emit (')')
                return

            #property () factory function
            elif node.func.id == 'property':
                self.emit ('{0}.call ({1}, {1}.{2}'.format (node.func.id, self.getScope (ast.ClassDef) .node.name, self.filterId (node.args [0].id)))
                if len (node.args) > 1:
                    self.emit (', {}.{}'.format (self.getScope (ast.ClassDef) .node.name, node.args [1].id))
                self.emit (')')
                return

            # globals () function
            elif node.func.id == 'globals':
                # self.emit ('__globals__ (__all__)') # ??? Is __globals__ (__all__) needed or does __all___ suffice?
                self.emit ('__all__') # y18m08d23 Variable __all__ created as a dict itself
                return
            # __pragma__'s in many varieties, syntactically calls, but semantically compile time directives
            elif node.func.id == '__pragma__':
                if node.args [0] .s == 'alias':
                    self.aliases.insert (0, (node.args [1] .s, node.args [2] .s))
                elif node.args [0] .s == 'noalias':
                    if len (node.args) == 1:
                        self.aliases = []
                    else:
                        for index in reversed (range (len (self.aliases))):
                            if self.aliases [index][0] == node.args [1] .s:
                                self.aliases.pop (index)

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

                elif node.args [0] .s == 'jscall':      # Python calls get compiled to direct JavaScript calls
                    self.allowJavaScriptCall = True
                elif node.args [0] .s == 'nojscall':    # Python calls get compiled to calls via a JavaScript property, allowing bound method assignment
                    self.allowJavaScriptCall = False

                elif node.args [0] .s == 'jskeys':      # Dictionary keys without quotes are string literals
                    self.allowJavaScriptKeys = True
                elif node.args [0] .s == 'nojskeys':    # Dictionary keys without quotes are identifiers
                    self.allowJavaScriptKeys = False

                elif node.args [0] .s == 'keycheck':    # Nonexistent dict keys or list indices generate an exception
                    self.allowKeyCheck = True
                elif node.args [0] .s == 'nokeycheck':  # Nonexistent dict keys or list indices produce undefined values
                    self.allowKeyCheck = False

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

                elif node.args [0] .s == 'run':
                    pass
                elif node.args [0] .s == 'norun':
                    pass

                elif node.args [0] .s == 'js':          # Include JavaScript code literally in the output
                    try:
                        try:
                            code = node.args [1] .s.format (* [
                                eval (
                                    compile (
                                        ast.Expression (arg),   # Code to compile (can be AST or source)
                                        '<string>',             # Not read from a file
                                        'eval'                  # Code is an expression, namely __include__  (<fileName>) in most cases
                                    ),
                                    {},
                                    {'__include__': include}
                                )
                                for arg in node.args [2:]
                            ])
                        except: # ??? If this is dealt with the regular way, a missing lineno is reported. Why?
                            code = node.args [2] .s
                        for line in code.split ('\n'):
                            self.emit ('{}\n', line)
                    except:
                        print (traceback.format_exc ())

                elif node.args [0] .s == 'xtrans':       # Include code transpiled by external process in the output
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
                            cwd = workDir
                        )
                        process.stdin.write ((sourceCode).encode ('utf8'))
                        process.stdin.close ()
                        while process.returncode is None:
                            process.poll ()
                        targetCode = process.stdout.read (). decode ('utf8'). replace ('\r\n', '\n')
                        for line in targetCode.split ('\n'):
                            self.emit ('{}\n', line)
                    except:
                        print (traceback.format_exc ())

                elif node.args [0] .s == 'xglobs':      # Allow use of the 'globals' function for this whole module
                    self.allowGlobals = True
                elif node.args [0] .s == 'noxglobs':    # Disallow use of the 'globals' funciton for this whole module
                    self.allowGlobals = False

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

                elif node.args [0] .s in ('skip', 'noskip', 'defined', 'ifdef', 'ifndef', 'else', 'endif'):
                    pass                                # Easier dealt with on statement / expression level in self.visit

                elif node.args [0] .s == 'xpath':
                    self.module.program.moduleSearchDirs [1 : 1] = [elt.s for elt in node.args [1] .elts]

                else:
                    raise utils.Error (
                        lineNr = self.lineNr,
                        message = '\n\tUnknown pragma: {}'.format (
                            node.args [0] .s if type (node.args [0]) == ast.Str else node.args [0]
                        )
                    )
                return
            # __new__ () 'call' to generate JavaScript's new operator
            elif node.func.id == '__new__':
                self.emit ('new ')
                self.visit (node.args [0])
                return
            # __typeof__ () 'call' will generate JavaScript's typeof operator
            elif node.func.id == '__typeof__':
                self.emit ('typeof ')
                self.visit (node.args [0])
                return

            # __preinc__ () will emit ++<operand>, for speed, e.g. in NumScrypt
            elif node.func.id == '__preinc__':
                self.emit ('++')
                self.visit (node.args [0])
                return

            # __postinc__ () will emit <operand>++,
            elif node.func.id == '__postinc__':
                self.visit (node.args [0])
                self.emit ('++')
                return
            # __predec__ () will emit --<operand>
            elif node.func.id == '__predec__':
                self.emit ('--')
                self.visit (node.args [0])
                return
            # __postdec__ () will emit <operand>
            elif node.func.id == '__postdec__':
                self.visit (node.args [0])
                self.emit ('--')
                return

        # conjugate () call, for complex numbers, will generate __conj__ () call to runtime
        elif (
            type (node.func) == ast.Attribute and
            node.func.attr == 'conjugate'
        ):
            try:
                self.visit (
                    ast.Call (
                        func = ast.Name (
                            id = '__conj__',
                            ctx = ast.Load
                        ),
                        args = [node.func.value],
                        keywords = []
                    )
                )
                return
            except:
                print (traceback.format_exc ())
        # send () call
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


        # super () call
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



        # Generate call to __call__ rather than direct call, to facilitate operator overloading, if that is allowed
        if (
            self.allowOperatorOverloading and       # If operator overloading and
            not (                                   # whe're not already in the __call__ that we generated on the fly,
                type (node.func) == ast.Name and
                node.func.id == '__call__'
            )
        ):
            if type (node.func) == ast.Attribute:
                # in case of an attribute call, save the object/call? value first into an accumulator variable, then call the attribute function on it
                self.emit ('(function () {{\n')
                self.inscope (ast.FunctionDef ())
                self.indent ()

                self.emit ('var {} = ', self.nextTemp ('accu'))
                self.visit(node.func.value)
                self.emit (';\n')

                self.emit ('return ')
                self.visit(ast.Call (
                    func = ast.Name(
                        id = '__call__',
                        ctx = ast.Load
                        # Don't use node.func.ctx since callable object decorators don't have a ctx, and they too use the overloading mechanism
                    ),
                    args = ([
                        ast.Attribute (
                            value = ast.Name (
                                id = self.getTemp ('accu'),
                                ctx = ast.Load
                            ),
                            attr = node.func.attr,
                            ctx = ast.Load
                        ),
                        ast.Name(
                            id = self.getTemp ('accu'),
                            ctx = ast.Load
                        )
                    ] + node.args),
                    keywords = node.keywords
                 ))
                self.emit(';\n')

                self.prevTemp('accu')

                self.dedent()
                self.descope()
                self.emit('}}) ()')
            else:
                # generate __call__ node on the fly and visit it
                self.visit (ast.Call (
                    func = ast.Name (
                        id = '__call__',
                        ctx = ast.Load
                    ),
                    args = ([
                          node.func,
                          ast.NameConstant (
                              value = None)
                    ] + node.args),
                    keywords = node.keywords
                ))
            return  # The newly created node was visited by a recursive call to visit_Call. This replaces the current visit.
        # We're in a parametrized dataclass decorator, switch some data class code generation options

        if dataClassArgDict != None:
            # Start out with the defaults
            dataClassArgTuple = copy.deepcopy (dataClassDefaultArgTuple)

            # Adapt positional args)
            for index, expr in enumerate (node.args):
                value = None
                if expr == ast.NameConstant:
                    value = True if expr.value == 'True' else False if expr.value == 'False' else None
                if value != None:
                    dataClassArgTuple [index][1] = value
                else:
                    raise utils.Error (message = 'Arguments to @dataclass can only be constants True or False')

            # Adapt keyword args
            dataClassArgDict.update (dict (dataClassArgTuple))

            for keyword in node.keywords:
                dataClassArgDict [keyword.arg] = keyword.value
            return

        # If we end up here, finally we're in an ordinary function call
        self.visit (node.func)
        self.emit (' (')

        # Emit positional args
        for index, expr in enumerate (node.args):
            self.emitComma (index)

            if type (expr) == ast.Starred:
                self.emit ('...')

            self.visit (expr)

        # Emit keyword args
        if node.keywords:
            self.emitComma (len (node.args))
            emitKwargTrans ()

        self.emit (')')

    def visit_ClassDef (self, node):
        self.adaptLineNrString (node)

        if type (self.getScope () .node) == ast.Module:
            self.emit ('export var {} = '.format (self.filterId (node.name)))
            self.allOwnNames.add (node.name)
        elif type (self.getScope () .node) == ast.ClassDef:
            self.emit ('\n{}:'.format (self.filterId (node.name)))
        else:
            self.emit ('var {} ='.format (self.filterId (node.name)))

        # If it's a dataclass (must currently be last decorator)
        # Remember this fact, to later insert def __init__ into parse tree
        # Pop dataclass decorator from decorator list
        isDataClass = False
        if node.decorator_list:
            if type (node.decorator_list [-1]) == ast.Name and node.decorator_list [-1] .id == 'dataclass':
                isDataClass = True
                dataClassArgDict = dict (dataClassDefaultArgTuple)              # Use default decorator args (or rather there are no args)
                node.decorator_list.pop ()
            elif type (node.decorator_list [-1]) == ast.Call and node.decorator_list [-1] .func.id == 'dataclass':
                isDataClass = True
                dataClassArgDict = {}
                self.visit_Call (node.decorator_list.pop (), dataClassArgDict)   # Adapt dataClassArgDict to decorator args

        decoratorsUsed = 0
        if node.decorator_list:
            self.emit (' ')
            if self.allowOperatorOverloading:
                self.emit ('__call__ (')    # The decorator is called, it may be a ast.Name (paramless) of a function or the result of an ast.Call (with params)

            for decorator in node.decorator_list:
                if decoratorsUsed > 0:
                    self.emit (' (')
                self.visit (decorator)      # This can either be a ast.Name (paramless dec) or and ast.Call (dec with params)
                decoratorsUsed += 1

            if self.allowOperatorOverloading:
                self.emit (', null, ')
            else:
                self.emit (' (')

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
        self.emit ('\n__module__: __name__,')

        # LHS plays a role in a.o. __repr__ in a dataclass
        inlineAssigns = []      # LHS is simple name, class var assignment generates initialisation of field in object literal
        propertyAssigns = []    # LHS is simple name, RHS is property constructor call
        initAssigns = []        # Dataclass instance var assignment, these are also the params to the generated __init__

        # LHS plays no role in a.o. __repr__ in a dataclass
        delayedAssigns = []     # LHS is array element, attribute or compound destructuring target, class var assignement generates statement after class object literal

        # Assignments whose LHS name is used in __repr__, have to be in ordere encountered, so can't be computed by concatenation of <other>VarAssigns
        reprAssigns = []       # Representation consists of instance vars, class vars and properties, in the order encountered

        # Assignments whose LHS names is used in comparisons, have to be in ordere encountered, so can't be computed by concatenation of <other>VarAssigns
        # Class vars shouln't be included, as only objects of the same class can be compared
        compareAssigns = []     # Comparing is done by instance vars and properties, in the order encountered

        index = 0

        if isDataClass:
            initHoistFragmentIndex = self.fragmentIndex
            initHoistIndentLevel = self.indentLevel

        for statement in node.body:
            if self.isCommentString (statement):
                pass
            elif type (statement) in (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef):
                self.emitComma (index, False)
                self.visit (statement)
                index += 1

            elif type (statement) == ast.Assign:
                if len (statement.targets) == 1 and type (statement.targets [0]) == ast.Name:
                    # LHS is simply a name
                    if type (statement.value) == ast.Call and type (statement.value.func) == ast.Name and statement.value.func.id == 'property':
                        # Property construction, should be generated after the class
                        propertyAssigns.append (statement)
                    else:
                        # Simple class var assignment, can be generated in-line as initialisation field of a JavaScript object literal
                        inlineAssigns.append (statement)
                        self.emitComma (index, False)
                        self.emit ('\n{}: ', self.filterId (statement.targets [0] .id))
                        self.visit (statement.value)
                        self.adaptLineNrString (statement)
                        index += 1
                else:
                    # LHS is attribute, array element or compound destructuring target
                    # Has to be generated after the class because it requires the use of an algorithm and can't be initialisation of field of an object literal
                    # Limitation: Can't properly deal with line number in this case
                    delayedAssigns.append (statement)

            elif type (statement) == ast.AnnAssign:
                # An annotated assignment is never a destructuring assignment
                if type (statement.value) == ast.Call and type (statement.value.func) == ast.Name and statement.value.func.id == 'property':
                    # Property construction, should be generated after the class
                    propertyAssigns.append (statement)
                    if isDataClass:
                        reprAssigns.append (statement)
                        compareAssigns.append (statement)
                elif isDataClass and type (statement.annotation) == ast.Name and statement.annotation.id != 'ClassVar':
                    # Possible data class assignment
                    inlineAssigns.append (statement)    # For defaults a class var will do
                    initAssigns.append (statement)
                    reprAssigns.append (statement)
                    compareAssigns.append (statement)
                    self.emitComma (index, False)
                    self.emit ('\n{}: ', self.filterId (statement.target.id))
                    self.visit (statement.value)
                    self.adaptLineNrString (statement)
                    index += 1
                elif type (statement.target) == ast.Name:
                    try:
                        # Simple class var assignment
                        inlineAssigns.append (statement)
                        self.emitComma (index, False)
                        self.emit ('\n{}: ', self.filterId (statement.target.id))
                        self.visit (statement.value)
                        self.adaptLineNrString (statement)
                        index += 1
                    except:
                        print (traceback.format_exc ())
                else:
                    # LHS is attribute or array element, we can't use it for representation or comparison
                    delayedAssigns.append (statement)

            elif self.getPragmaFromExpr (statement):
                # It's a pragma
                self.visit (statement)
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

        # Close brackets of decorator param lists
        if decoratorsUsed:
            self.emit (')' * decoratorsUsed)

        # Emit docstring attribute assignment
        if self.allowDocAttribs:
            docString = ast.get_docstring (node)
            if docString:
               self.emit (' .__setdoc__ (\'{}\')', docString.replace ('\n', '\\n '))

        # Deal with data class var assigns, a flavor of special class var assigns
        if isDataClass: # Constructor + params have to be generated, no real class vars, just syntactically
            nrOfFragmentsToJump = self.fragmentIndex - initHoistFragmentIndex
            self.fragmentIndex = initHoistFragmentIndex

            originalIndentLevel = self.indentLevel
            self.indentLevel = initHoistIndentLevel

            initArgs = [(
                (
                        initAssign.targets [0]
                    if type (initAssign) == ast.Assign else
                        initAssign.target
                ) .id,
                initAssign.value
             ) for initAssign in initAssigns]

            reprNames = [
            (
                reprAssign.targets [0]
            if type (reprAssign) == ast.Assign else
                reprAssign.target
            ) .id
            for reprAssign in reprAssigns]

            compareNames = [
            (
                    compareAssign.targets [0]
                if type (compareAssign) == ast.Assign else
                    compareAssign.target
            ) .id
            for compareAssign in compareAssigns]

            # Generate __init__
            if dataClassArgDict ['repr']:
                originalAllowKeywordArgs = self.allowKeywordArgs
                self.allowKeywordArgs = True
                self.visit (ast.FunctionDef (
                    name = '__init__',
                    args = ast.arguments (
                        args = [ast.arg (arg = 'self', annotation = None)],
                        vararg = ast.arg (arg = 'args', annotation = None),
                        kwonlyargs = [],
                        kw_defaults = [],
                        kwarg = ast.arg (arg = 'kwargs', annotation = None),
                        defaults = []
                    ),
                    body = [
                        ast.Expr (
							value = ast.Call (
								func = ast.Name (
									id = '__pragma__',
									ctx = ast.Load
                                ),
								args = [
									ast.Str (
                                        s = 'js'
                                    ),
									ast.Str (
										s = '{}'
                                    ),
									ast.Str (
										s = '''
let names = self.__initfields__.values ();
for (let arg of args) {
    self [names.next () .value] = arg;
}
for (let name of kwargs.py_keys ()) {
    self [name] = kwargs [name];
}
                                        '''.strip ()
                                    )
                                ],
								keywords = []
                            )
                        )
                    ],
                    decorator_list = [],
                    returns = None,
                    docstring = None
                ))
                self.emit (',')
                self.allowKeywordArgs = originalAllowKeywordArgs

            # Generate __repr__
            if dataClassArgDict ['repr']:
                self.visit (ast.FunctionDef (
                    name = '__repr__',
                    args = ast.arguments (
                        args = [ast.arg (arg = 'self', annotation = None)],
                        vararg = None,
                        kwonlyargs = [],
                        kw_defaults = [],
                        kwarg = None,
                        defaults = []
                    ),
                    body = [
                        ast.Expr (
							value = ast.Call (
								func = ast.Name (
									id = '__pragma__',
									ctx = ast.Load
                                ),
								args = [
									ast.Str (
                                        s = 'js'
                                    ),
									ast.Str (
										s = '{}'
                                    ),
									ast.Str (
										s = '''
let names = self.__reprfields__.values ();
let fields = [];
for (let name of names) {{
    fields.push (name + '=' + repr (self [name]));
}}
return  self.__name__ + '(' + ', '.join (fields) + ')'
                                        '''.strip ()
                                    )
                                ],
								keywords = []
                            )
                        )
                    ],
                    decorator_list = [],
                    returns = None,
                    docstring = None
                ))
                self.emit (',')

             # Generate comparators   !!! TODO: Add check that self and other are of same class
            comparatorNames = []
            if 'eq' in dataClassArgDict:
                comparatorNames += ['__eq__', '__ne__']
            if 'order' in dataClassArgDict:
                comparatorNames += ['__lt__', '__le__', '__gt__', '__ge__']
            for comparatorName in comparatorNames:
                self.visit (ast.FunctionDef (
                    name = comparatorName,
                    args = ast.arguments (
                        args = [
                            ast.arg (arg = 'self', annotation = None),
                            ast.arg (arg = 'other', annotation = None)
                        ],
                        vararg = None,
                        kwonlyargs = [],
                        kw_defaults = [],
                        kwarg = None,
                        defaults = []
                    ),
                    body = [
                        ast.Expr (
							value = ast.Call (
								func = ast.Name (
									id = '__pragma__',
									ctx = ast.Load
                                ),
								args = [
									ast.Str (
                                        s = 'js'
                                    ),
									ast.Str (
										s = '{}'
                                    ),
									ast.Str (
										s = ('''
let names = self.__comparefields__.values ();
let selfFields = [];
let otherFields = [];
for (let name of names) {
    selfFields.push (self [name]);
    otherFields.push (other [name]);
}
return list (selfFields).''' + comparatorName + '''(list (otherFields));
                                        ''').strip ()   # ... Adding is ugly, repair __pragma__
                                    )
                                ],
								keywords = []
                            )
                        )
                     ],
                    decorator_list = []
                ))
                returns = None,
                self.emit (',')

            # After inserting at init hoist location, jump forward as much as we jumped back
            # Simply going back to the original fragment index won't work, since fragments were prepended
            self.fragmentIndex += nrOfFragmentsToJump

            # And restore indent level to where we were
            self.indentLevel = originalIndentLevel

        # Deal with delayed assigns and property assigns
        # Property assigns will be pushed onto a stack
        # They will eventually be dealt with if this class isn't directly local to another class
        for assign in delayedAssigns + propertyAssigns:
            self.emit (';\n')
            self.visit (assign)

        self.mergeList.append (utils.Any (
            className = '.'.join ([scope.node.name for scope in self.getAdjacentClassScopes ()]),
            isDataClass = isDataClass,
            reprAssigns = reprAssigns,
            compareAssigns = compareAssigns,
            initAssigns = initAssigns
        ))

        self.descope () # No earlier, class vars need it

        def emitMerges ():
            def emitMerge (merge):
                # Merge dataclass fields for any class, since parents or descendants may be dataclasses
                # ??? Should __bases__ hold complete dotted classnames in case of local classes?
                if merge.isDataClass:
                    self.emit ('\nfor (let aClass of {}.__bases__) {{\n', self.filterId (merge.className))
                    self.indent ()
                    self.emit ('__mergefields__ ({}, aClass);\n', self.filterId (merge.className))
                    self.dedent ()
                    self.emit ('}}')

                    # Merge dataclass fields for current class
                    self.emit (';\n__mergefields__ ({}, {{', self.filterId (merge.className))
                    self.emit ('__reprfields__: new Set ([{}]), ', ', '.join ('\'{}\''.format (reprAssign.target.id) for reprAssign in merge.reprAssigns))
                    self.emit ('__comparefields__: new Set ([{}]), ', ', '.join ('\'{}\''.format (compareAssign.target.id) for compareAssign in merge.compareAssigns))
                    self.emit ('__initfields__: new Set ([{}])', ', '.join ('\'{}\''.format (initAssign.target.id) for initAssign in merge.initAssigns))
                    self.emit ('}})')

            for merge in self.mergeList:
                emitMerge (merge)

            self.mergeList = []

        def emitProperties ():
            def emitProperty (className, propertyName, getterName, setterName = None):
                self.emit ('\nObject.defineProperty ({}, \'{}\', '.format (className, propertyName))
                if setterName:
                    self.emit ('property.call ({0}, {0}.{1}, {0}.{2})'.format (className, getterName, setterName))
                else:
                    self.emit ('property.call ({0}, {0}.{1})'.format (className, getterName))
                self.emit (');')

            if self.propertyAccessorList:
                self.emit (';')
            while self.propertyAccessorList:
                propertyAccessor = self.propertyAccessorList.pop ()
                className = propertyAccessor.className
                functionName = propertyAccessor.functionName
                propertyName = functionName [5:]
                isGetter = functionName [:5] == '_get_'

                # Find a pair
                for propertyAccessor2 in self.propertyAccessorList:
                    className2 = propertyAccessor2.className
                    functionName2 = propertyAccessor2.functionName
                    propertyName2 = functionName2 [5:]
                    isGetter2 = functionName2 [:5] == '_get_'

                    if className == className2 and propertyName == propertyName2 and isGetter != isGetter2:
                        # Remove pair
                        self.propertyAccessorList.remove (propertyAccessor2)
                        if isGetter:
                            emitProperty (className, propertyName, functionName, functionName2)
                        else:
                            emitProperty (className, propertyName, functionName2, functionName)
                        break
                else:
                    if isGetter:
                        emitProperty (className, propertyName, functionName)
                    else:
                        raise utils.Error(
                            message='\n\tProperty setter declared without getter\n'
                        )

        if type (self.getScope ().node) != ast.ClassDef:  # Emit properties if this class isn't directly local to another class
            emitProperties ()
            emitMerges ()

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
            self.idFiltering = False                            # The key may be a string or an identifier, the latter normally would be filtered, which we don't want
            self.visit (key)                                    # In a JavaScript object literal, an identifier isn't evaluated but literally taken to be a key.
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

        elif not self.allowOperatorOverloading:     # No overloaded __len__ c.q. __getitem__
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

        else:
            self.emit ('var {} = ', self.nextTemp ('iterable'))
            self.visit (node.iter)
            self.emit (';\n')

            if self.allowConversionToIterable:
                self.emit ('{0} = __i__ ({0});\n', self.getTemp ('iterable'))

            self.emit ('for (var {0} = 0; {0} < len ({1}); {0}++) {{\n', self.nextTemp ('index'), self.getTemp ('iterable'))
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
            if self.allowOperatorOverloading:  # Possibly overloaded __len__ c.q. __getitem__
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

    def visit_AsyncFunctionDef (self, node):
        self.visit_FunctionDef (node, anAsync = True)

    def visit_FunctionDef (self, node, anAsync = False):
        def emitScopedBody ():
            self.inscope (node)
            self.emitBody (node.body)
            self.dedent ()
            if self.getScope (ast.AsyncFunctionDef if anAsync else ast.FunctionDef) .containsYield:
                # !!! Check: yield forbidden in AsyncFunctionDef
                self.targetFragments.insert (yieldStarIndex, '*')
            self.descope ()

        def pushPropertyAccessor(functionName):
            self.propertyAccessorList.append (utils.Any (
                functionName = functionName,
                className = '.'.join ([scope.node.name for scope in self.getAdjacentClassScopes ()])
            ))

        nodeName = node.name

        if not nodeName == '__pragma__':    # Don't generate code for the dummy pragma definition starting the extraLines in utils
                                            # Pragma should never be defined, except once directly in JavaScript to support __pragma__ ('<all>')
                                            # The rest of its use is only at compile time

            isGlobal = type (self.getScope () .node) == ast.Module

            isMethod = not (isGlobal or type (self.getScope () .node) in (ast.FunctionDef, ast.AsyncFunctionDef))  # Global or function scope, so it's no method

            if isMethod:
                self.emit ('\n')
            self.adaptLineNrString (node)

            decorate = False
            isClassMethod = False
            isStaticMethod = False
            isProperty = False
            getter = '__get__'

            if node.decorator_list:
                for decorator in node.decorator_list:
                    decoratorNode = decorator
                    decoratorType = type (decoratorNode)
                    nameCheck = ''
                    while decoratorType != ast.Name:
                        if decoratorType == ast.Call:
                            decoratorNode = decoratorNode.func
                        elif decoratorType == ast.Attribute:
                            nameCheck = '.' + decoratorNode.attr + nameCheck
                            decoratorNode = decoratorNode.value
                        decoratorType = type (decoratorNode)

                    nameCheck = decoratorNode.id + nameCheck

                    if nameCheck == 'classmethod':
                        isClassMethod = True
                        getter = '__getcm__'
                    elif nameCheck == 'staticmethod':
                        isStaticMethod = True
                        getter = '__getsm__'
                    elif nameCheck == 'property':
                        isProperty = True
                        nodeName = '_get_' + node.name
                        pushPropertyAccessor (nodeName)
                    elif re.match ('[a-zA-Z0-9_]+\.setter', nameCheck):
                        isProperty = True
                        nodeName = '_set_' + re.match ('([a-zA-Z0-9_]+)\.setter', nameCheck).group (1)
                        pushPropertyAccessor (nodeName)
                    else:
                        decorate = True

            if sum ([isClassMethod, isStaticMethod, isProperty]) > 1:
                raise utils.Error (
                    lineNr = self.lineNr,
                    message = '\n\tstaticmethod, classmethod and property decorators can\'t be mixed\n'
                )

            jsCall = self.allowJavaScriptCall and nodeName != '__init__'

            decoratorsUsed = 0
            if decorate:
                if isMethod:
                    if jsCall:
                        # Decorators are not supported until we resolve, how to pass self or cls
                        raise utils.Error (
                            lineNr=self.lineNr,
                            message='\n\tdecorators are not supported with jscall\n'
                        )

                        self.emit ('{}: ', self.filterId (nodeName))
                    else:
                        self.emit ('get {} () {{return {} (this, ', self.filterId (nodeName), getter)
                elif isGlobal:
                    if type (node.parentNode) == ast.Module and not nodeName in self.allOwnNames:
                        self.emit ('export ')
                    self.emit ('var {} = ', self.filterId (nodeName))
                else:
                    self.emit ('var {} = ', self.filterId (nodeName))

                if self.allowOperatorOverloading:
                    self.emit ('__call__ (')

                for decorator in node.decorator_list:
                    if not (type (decorator) == ast.Name and decorator.id in ('classmethod', 'staticmethod')):
                        if decoratorsUsed > 0:
                            self.emit (' (')
                        self.visit (decorator)
                        decoratorsUsed += 1

                if self.allowOperatorOverloading:
                    self.emit (', null, ')
                else:
                    self.emit (' (')

                self.emit ('{}function', 'async ' if anAsync else '')

            else:
                if isMethod:
                    if jsCall:
                        self.emit ('{}: function', self.filterId (nodeName), 'async ' if anAsync else '')
                    else:
                        if isStaticMethod:
                            self.emit ('get {} () {{return {}function', self.filterId (nodeName), 'async ' if anAsync else '')
                        else:
                            self.emit ('get {} () {{return {} (this, {}function', self.filterId (nodeName), getter, 'async ' if anAsync else '')
                elif isGlobal:
                    if type (node.parentNode) == ast.Module and not nodeName in self.allOwnNames:
                        self.emit ('export ')
                    self.emit ('var {} = {}function', self.filterId (nodeName), 'async ' if anAsync else '')
                else:
                    self.emit ('var {} = {}function', self.filterId (nodeName), 'async ' if anAsync else '')

            yieldStarIndex = self.fragmentIndex

            self.emit (' ')

            skipFirstArg = jsCall and not (not isMethod or isStaticMethod or isProperty)

            if skipFirstArg:
                # Remove first argument from methods when jscall enabled
                # Exceptions:
                #   1. staticmethods - don't have "self" or "cls" as first parameter
                #   2. properties - "self" is passed from property getters, setters
                #   3. __init__ methods don't work with jscall
                firstArg = node.args.args [0].arg
                node.args.args = node.args.args [1:]

            self.visit (node.args)

            if skipFirstArg:
                # Assign first removed parameter when jscall enabled
                # Exceptions:
                #   1. classmethods - need to resolve who is the caller, class or instance
                if isClassMethod:
                    self.emit ('var {} = \'__class__\' in this ? this.__class__ : this;\n', firstArg)
                else:
                    self.emit ('var {} = this;\n', firstArg)

            emitScopedBody ()
            self.emit ('}}')

            if self.allowDocAttribs:
                docString = ast.get_docstring (node)
                if docString:
                    self.emit (' .__setdoc__ (\'{}\')', docString.replace ('\n', '\\n '))


            if decorate:
                self.emit (')' * decoratorsUsed)

            if isMethod:
                if not jsCall:
                    if isStaticMethod:
                        self.emit (';}}')
                    else:
                        if self.allowMemoizeCalls:
                            self.emit (', \'{}\'', nodeName)  # Name will be used as attribute name to add bound function to instance

                        self.emit (');}}')

                if nodeName == '__iter__':
                    self.emit (',\n[Symbol.iterator] () {{return this.__iter__ ()}}')

                if nodeName == '__next__':
                    self.emit (',\nnext: __jsUsePyNext__')  # ??? Shouldn't this be a property, to allow bound method pointers

            if isGlobal:
                self.allOwnNames.add (nodeName)

    def visit_GeneratorExp (self, node):
        # Currently generator expressions are just iterators on lists.
        # It's important that they aren't just lists,
        # because the each for ... in ... would create a fresh iterator from it, prevening exhaustion.
        # Since a list comp is an iterator itself, just copies will be created,
        # which will exhaust together.
        self.visit_ListComp (node, isGenExp = True)

    def visit_Global (self, node):
        self.getScope (ast.FunctionDef, ast.AsyncFunctionDef) .nonlocals.update (node.names)

        # raise utils.Error (
            # lineNr = self.lineNr,
            # message = '\n\tKeyword \'global\' not supported, use \'nonlocal\' instead, or make variable attribute of \'window\'\n'
        # )

    def visit_If (self, node):
        self.adaptLineNrString (node)

        self.emit ('if (')
        self.emitBeginTruthy ()
        global inIf
        inIf = True
        self.visit (node.test)
        inIf = False
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

    def visit_Import (self, node):
        # Since clashes with own names have to be avoided, the node is stored to revisit it after the own names are known
        self.importHoistMemos.append (utils.Any (node = node, lineNr = self.lineNr))

    def revisit_Import (self, importHoistMemo):     # Import ... can only import modules
        self.lineNr = importHoistMemo.lineNr        # This is the lineNr from the original visit, which may be obtained from the node at that time or "cached" earlier
        node = importHoistMemo.node
        self.adaptLineNrString (node)               # If it isn't (again) obtained from the node, the memoed version will be used

        names = [alias for alias in node.names if not alias.name.startswith (self.stubsName)]

        if not names:
            return

        '''
        Possibilities:

        (1) import a.b.d, d.e.f as g        --> import
        '''

        for index, alias in enumerate (names):
            try:
                module = self.useModule (alias.name)
            except Exception as exception:
                utils.enhanceException (
                    exception,
                    lineNr = self.lineNr,
                    message = '\n\tCan\'t import module \'{}\''.format (alias.name)
                )

            if alias.asname and not alias.asname in (self.allOwnNames | self.allImportedNames):
                # Import 'as' a non-dotted name, so no need to nest
                # Clashes with own names or already imported names are avoided

                self.allImportedNames.add (alias.asname)
                self.emit ('import * as {} from \'{}\';\n', self.filterId (alias.asname), module.importRelPath)
            else:
                # Import dotted name, requires import under constructed unique name and then nesting,
                # including transfer of imported names from immutable module to mutable object
                # This mutable module representation object may come to hold other mutable module represention objects

                self.emit ('import * as __module_{}__ from \'{}\';\n', self.filterId (module.name) .replace ('.', '_'), module.importRelPath)
                aliasSplit = alias.name.split ('.', 1)
                head = aliasSplit [0]
                tail = aliasSplit [1] if len (aliasSplit) > 1 else ''

                self.importHeads.add (head)
                self.emit ('__nest__ ({}, \'{}\', __module_{}__);\n', self.filterId (head), self.filterId (tail), self.filterId (module.name .replace ('.', '_')))

            if index < len (names) - 1:
                self.emit (';\n')

    def visit_ImportFrom (self, node):
        # Just as with visit_Import, postpone imports until own names are known, to prevent clashes
        self.importHoistMemos.append (utils.Any (node = node, lineNr = self.lineNr))

    def revisit_ImportFrom (self, importHoistMemo): # From ... import ... can import modules or facitities offered by modules
        self.lineNr = importHoistMemo.lineNr        # This is the lineNr from the original visit, which may be obtained from the node at that time or "cached" earlier
        node = importHoistMemo.node
        self.adaptLineNrString (node)               # If it isn't (again) obtained from the node, the memoed version will be used

        if node.module.startswith (self.stubsName):
            return

        '''
        Possibilities with modules a, b, c and (non-module) facilities: p, q, r, s:

        (1) from a.b.c import *                             --> import {p, q, r, s} from 'a.b.c.'               Use facilities, generate afterward

        (2) from a.b.c import p as P, q, r as R, s          --> import {p as P, q, r as R, s} from 'a.b.c.'     Use facilities, generate afterward

        (3) from a.b import c0, c1 as C1, c2, c3 as C3      --> import * as c0 from 'a.b.c0'                    Don't use facilities, generate directly
                                                                import * as C1 from 'a.b.c1'
                                                                import * as c2 from 'a.b.c2'
                                                                import * as C3 from 'a.b.C3'

        (1) can happen only in isolation, (2) and (3) can be combined in one Python import statement
        '''

        try:
            # Import modules or facilities offered by them
            self.module.program.searchedModulePaths = []                                    # If none of the possibilities below succeeds, report all searched paths
            namePairs = []
            facilityImported = False
            for index, alias in enumerate (node.names):
                if alias.name == '*':                                                       # * Never refers to modules, only to facilities in modules
                    if len (node.names) > 1:
                        raise utils.Error (
                            lineNr = self.lineNr,
                            message = '\n\tCan\'t import module \'{}\''.format (alias.name)
                        )
                    module = self.useModule (node.module)
                    for aName in module.exportedNames:
                        namePairs.append (utils.Any (name = aName, asName = None))
                else:
                    try:                                                                    # Try if alias denotes a module, in that case don't do the 'if namepairs' part
                        module = self.useModule ('{}.{}'.format (node.module, alias.name))  # So, attempt to use alias as a module
                        self.emit ('import * as {} from \'{}\';\n', self.filterId (alias.asname) if alias.asname else self.filterId (alias.name), module.importRelPath) # Modules too can have asName
                        self.allImportedNames.add (alias.asname or alias.name)              # Add import to allImportedNames of this module
                    except:                                                                 # It's a facility rather than a module
                        module = self.useModule (node.module)
                        namePairs.append (utils.Any (name = alias.name, asName = alias.asname))
                        facilityImported = True

            if facilityImported:                                                        # At least one alias denoted a facility rather than a module
                module = self.useModule (node.module)                                   # Use module that contains it
                namePairs.append (utils.Any (name = alias.name, asName = alias.asname))

            # This part should only be done for facilities inside modules, and indeed they are the only ones adding namePairs
            if namePairs:
                try:
                    # Still, when here, the 'decimated' import list become empty in rare cases, but JavaScript should swallow that
                    self.emit ('import {{')
                    for index, namePair in enumerate (sorted (namePairs, key = lambda namePair: namePair.asName if namePair.asName else namePair.name)):
                        if not (namePair.asName if namePair.asName else namePair.name) in (self.allOwnNames | self.allImportedNames):
                            self.emitComma (index)
                            self.emit (self.filterId (namePair.name))
                            if namePair.asName:
                                self.emit (' as {}', self.filterId (namePair.asName))
                                self.allImportedNames.add (namePair.asName)
                            else:
                                self.allImportedNames.add (namePair.name)
                    self.emit ('}} from \'{}\';\n', module.importRelPath)
                except:
                    print ('Unexpected import error:', traceback.format_exc ())  # Should never be here

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
        self.emit ('[')
        for index, elt in enumerate (node.elts):
            self.emitComma (index)
            self.visit (elt)
        self.emit (']')

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

        self.emit ('(function () {{\n')
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
        self.emit ('}}) ()')

    def visit_Module (self, node):
        # Adapt self.lineNrString to whatever self.lineNr happens to be
        self.adaptLineNrString ()

        # Emit module collophon comment
        self.emit ('// {}\'ed from Python, {}\n',
            self.module.program.envir.transpiler_name.capitalize (), datetime.datetime.now ().strftime ('%Y-%m-%d %H:%M:%S'),
        )

        # Adapt self.lineNrString to the line number that the node stems from
        self.adaptLineNrString (node)

        # Enter module scope
        self.inscope (node)

        # Remember where hoists have to be inserted in the fragments list
        self.importHoistFragmentIndex = self.fragmentIndex

        # Let the module know its __name__
        self.emit ('var __name__ = \'{}\';\n', self.module.__name__)    # ??? Needs filterId ?
        self.allOwnNames.add ('__name__')

        # Generate code for the module body
        for statement in node.body:
            if self.isCommentString (statement):
                pass
            else:
                self.visit (statement)
                self.emit (';\n')

        # Store docstring if allowed, can only be done 'late'
        # since __pragma__ ('docat') or __pragma__ ('nodocat') should precede it
        if self.allowDocAttribs:
            docString = ast.get_docstring (node)
            if docString:
                self.allOwnNames.add ('__doc__')    # Should be done before generation of exported names

        # Prepair to generate hoisted fragments near start of fragments
        self.fragmentIndex = self.importHoistFragmentIndex    # Subsequent emits will also hoist self.lineNr, subsequent revisits will even adapt self.lineNrString

        # Insert docstring at hoist location, further hoists are PRE(!)pended
        if self.allowDocAttribs and docString:
            self.emit ('export var __doc__ = \'{}\';\n', docString.replace ('\n', '\\n'))

        '''
        Make the globals () function work as well as possible in conjunction with JavaScript 6 modules rather than closures

        JavaScript 6 module-level variables normally cannot be accessed directly by their name as a string
        They aren't attributes of any global object, certainly not in strict mode, which is the default for modules
        By making getters and setters by the same name members of __all__, we can approach globals () as a dictionary

        Limitations:
        - We can access (read/write) but not create module-level globals this way
        - If there are a lot of globals (bad style) this mechanism becomes expensive, so it must be under a pragma

        It's possible that future versions of JavaScript facilitate better solutions to this minor problem
        '''
        if self.allowGlobals:
            self.emit (
                'var __all__ = dict ({{' # Has nothing to do with emitting an export list, just another importable (so exported) module level variable __all__
                +
                ', '.join ([
                    f'get {name} () {{{{return {name};}}}}, set {name} (value) {{{{{name} = value;}}}}' for name in sorted (self.allOwnNames)
                ])
                +
                '}});\n'
            )   # ??? Needs filterid?

        # Import other modules (generatable only late, but hoisted) and nest them into the import heads
        # The import head definitions are generated later but inserted before the imports
        self.fragmentIndex = self.importHoistFragmentIndex
        for importHoistMemo in reversed (self.importHoistMemos):
            if type (importHoistMemo.node) == ast.Import:
                self.revisit_Import (importHoistMemo)
            else:
                self.revisit_ImportFrom (importHoistMemo)

        # Transit export of imported facilities (so no facilities that weren't imported and no modules)
        if utils.commandArgs.xreex or self.module.sourcePrename == '__init__':
            if self.allImportedNames:
                self.emit ('export {{{}}};\n', ', '.join ([self.filterId (importedName) for importedName in self.allImportedNames]))     # This emits an export list

        # Import runtime module (generatable only late, but hoisted)
        # Place it first, but decimate its imported names last, since they should appear to be overriden by later imports
        self.fragmentIndex = self.importHoistFragmentIndex
        if self.module.name != self.module.program.runtimeModuleName:
            runtimeModule = self.module.program.moduleDict [self.module.program.runtimeModuleName]

            # Avoid double declarations since imports are immutable (hoisted)
            importedNamesFromRuntime = ', '.join (sorted ([
                exportedNameFromRuntime
                for exportedNameFromRuntime in runtimeModule.exportedNames
                if not exportedNameFromRuntime in (self.allOwnNames | self.allImportedNames)
            ]))

            self.emit ('import {{{}}} from \'{}\';\n', importedNamesFromRuntime, runtimeModule.importRelPath)

        # Emit empty import head objects, each as the leftmost part of the dotted name that can be used to access the imported module
        # Note that the required importheads are only known after importing modules, but must be inserted in the target code before that,
        # since they must be filled by the imports
        # Place definition of import heads before actual import that includes nesting, even though they are known only after the imports
        self.fragmentIndex = self.importHoistFragmentIndex
        for importHead in sorted (self.importHeads):
            self.emit ('var {} = {{}};\n', self.filterId (importHead))

        # Exit module scope
        self.descope ()

    def visit_Name (self, node):
        if node.id == '__file__':
            self.visit (ast.Str (s = self.module.sourcePath))
            return

        elif node.id == '__filename__':
            path = os.path.split (self.module.sourcePath)
            fileName = path [1]

            if fileName.startswith ('__init__'):
                subDir = os.path.split (path [0])
                fileName = os.path.join (subDir [1], fileName)

            self.visit (ast.Str (s = fileName))
            return

        elif node.id == '__line__':
            self.visit (ast.Num (n = self.lineNr))
            return

        elif type (node.ctx) == ast.Store:
            if type (self.getScope () .node) == ast.Module:
                self.allOwnNames.add (node.id)

        self.emit (self.filterId (node.id))

    def visit_NameConstant (self, node):
        self.emit (self.nameConsts [node.value])

    def visit_Nonlocal (self, node):
        self.getScope (ast.FunctionDef, ast.AsyncFunctionDef) .nonlocals.update (node.names)

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
    # LHS slice and overloaded LHS index are dealt with directy in visit_Assign, since the RHS is needed for them also
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
                try:
                    isRhsIndex = not self.expectingNonOverloadedLhsIndex
                    self.expectingNonOverloadedLhsIndex = False
                    if isRhsIndex and self.allowKeyCheck:
                        self.emit ('__k__ (')
                        self.visit (node.value)
                        self.emit (', ')
                        self.visit (node.slice.value)
                        self.emit (')')
                    else:
                        self.visit (node.value)
                        self.emit (' [')
                        self.visit (node.slice.value)
                        self.emit (']')
                except:
                    print (traceback.format_exc ())
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

            for index, exceptionHandler in enumerate (node.handlers):
                if index:
                    self.emit ('else ')             # Never here after a catch all

                if exceptionHandler.type:
                    self.emit ('if (isinstance ({}, ', self.getTemp ('except'))
                    self.visit (exceptionHandler.type)
                    self.emit (')) {{\n')
                    self.indent ()

                    if exceptionHandler.name:
                        self.emit ('var {} = {};\n', exceptionHandler.name, self.getTemp ('except'))

                    self.emitBody (exceptionHandler.body)

                    self.dedent ()
                    self.emit ('}}\n')
                else:                               # Catch all, swallowing no problem
                    self.emitBody (exceptionHandler.body)
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

        for item in node.items:
            self.emit ('var ')                      # Should be in surrounding scope but may be overwritten, so use var rather than let
            if (item.optional_vars):
                self.visit (item.optional_vars)
                withId = item.optional_vars.id
            else:
                withId = self.nextTemp ('withid')
                self.emit (withId)

            self.emit (' = ')
            self.visit (item.context_expr)
            self.emit (';\n')

            self.emit ('try {{\n')
            self.indent ()
            self.emit ('{}.__enter__ ();\n', withId)
            self.emitBody (node.body)
            self.emit ('{}.__exit__ ();\n', withId)
            self.dedent ()
            self.emit ('}}\n')
            self.emit ('catch ({}) {{\n', self.nextTemp ('except'))
            self.indent ()
            self.emit ('if (! ({0}.__exit__ ({1}.name, {1}, {1}.stack))) {{\n', withId, self.getTemp ('except'))
            self.indent ()
            self.emit ('throw {};\n', self.getTemp ('except'))
            self.dedent ()
            self.emit ('}}\n')
            self.dedent ()
            self.emit ('}}\n')
            self.prevTemp ('except')

            if withId == self.getTemp ('withid'):
                self.prevTemp ('withid')

    def visit_Yield (self, node):
        self.getScope (ast.FunctionDef, ast.AsyncFunctionDef) .containsYield = True
        self.emit ('yield')
        if (node.value != None):
            self.emit (' ')
            self.visit (node.value)

    def visit_YieldFrom (self, node):
        self.getScope (ast.FunctionDef, ast.AsyncFunctionDef) .containsYield = True
        self.emit ('yield* ')
        self.visit (node.value)
