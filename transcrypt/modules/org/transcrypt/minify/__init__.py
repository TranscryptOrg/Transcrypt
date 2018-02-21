import os
import subprocess

from org.transcrypt import utils

closureCompilerPath = '{}/closure_compiler/compiler.jar'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))

# Minifier has to accept JavaScript 6 input code, it is there in the autotest, even if not executed.
def run (sourcePath, targetPath, postMapPath, javaScriptVersion = 8, unitsUsed = False):
    if unitsUsed:
        params = [
            'java', '-jar',
            closureCompilerPath,
            '--language_out=ECMASCRIPT6_STRICT',
            '--compilation_level', 'WHITESPACE_ONLY',
            '--js', sourcePath,
            '--js_output_file', targetPath
        ]
    else:
        params = [
            'java', '-jar',
            closureCompilerPath,
            '--language_in={}'.format ('ES{}'.format (javaScriptVersion) if javaScriptVersion <=6 else 'ECMASCRIPT_NEXT'),
            '--language_out=ECMASCRIPT5_STRICT',
            '--compilation_level', 'SIMPLE_OPTIMIZATIONS',
            '--js', sourcePath,
            '--js_output_file', targetPath
        ]
    
    '''
    print ('========================================')
    for param in params:
        print (param)
    print ('========================================')
    '''
    
    if utils.commandArgs.map:
        params += [
            '--create_source_map', postMapPath,
            '--source_map_format=V3'
        ]

    subprocess.run (params)
