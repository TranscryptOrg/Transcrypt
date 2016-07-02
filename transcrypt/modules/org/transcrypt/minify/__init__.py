import os
import subprocess

from org.transcrypt import utils

closureCompilerPath = '{}/closure_compiler/compiler.jar'.format (os.path.dirname (os.path.abspath (__file__)) .replace ('\\', '/'))

def run (sourcePath, targetPath, postMapPath, javaScriptVersion):
	params = [
		'java', '-jar',
		closureCompilerPath,
		'--language_in=ES{}'.format (javaScriptVersion),
		'--language_out=ECMASCRIPT5_STRICT',
		'--compilation_level', 'SIMPLE_OPTIMIZATIONS',
		'--js', sourcePath,
		'--js_output_file', targetPath
	]
	
	if utils.commandArgs.map:
		params += [
			'--create_source_map', postMapPath,
			'--source_map_format=V3'
		]

	subprocess.run (params)
