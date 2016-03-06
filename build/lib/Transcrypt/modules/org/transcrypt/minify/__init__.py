import os
import subprocess

closureCompilerPath = '{}/closure_compiler/compiler.jar'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))

def run (sourcePath, targetPath):
	subprocess.run (['java', '-jar', closureCompilerPath, '--language_in=ES5', '--language_out=ECMASCRIPT5_STRICT', '--compilation_level', 'SIMPLE_OPTIMIZATIONS', '--js', sourcePath, '--js_output_file', targetPath])
	