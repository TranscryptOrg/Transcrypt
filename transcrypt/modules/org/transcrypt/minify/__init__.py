import os
import subprocess

from org.transcrypt import utils

closureCompilerPath = '{}/closure_compiler/compiler.jar'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))

# Minifier has to accept JavaScript 6 input code, it is there in the autotest, even if not executed.
def run (targetDir, sourceFileName, targetFileName, mapFileName = None, prettify = False):
    params = [
        'java', '-jar',
        closureCompilerPath,
        '--language_out=ECMASCRIPT6_STRICT',
        '--compilation_level', 'WHITESPACE_ONLY',
        '--js', sourceFileName,
        '--js_output_file', targetFileName
    ]
    
    if prettify:
        params += ['--formatting', 'PRETTY_PRINT']
    
    if utils.commandArgs.map and not prettify:
        params += [
            '--create_source_map', mapFileName,
            '--source_map_format=V3'
        ]

    origDir = os.getcwd ()
    os.chdir (targetDir)    # So the map will store sourcePath and targetPath as filenames rather than full paths
    subprocess.run (params)
    os.chdir (origDir)
    