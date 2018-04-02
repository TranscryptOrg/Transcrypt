import subprocess

params = [
    'java', '-jar',
    'compiler.jar',
    '--language_out=ECMASCRIPT6_STRICT',
    '--compilation_level', 'WHITESPACE_ONLY',
    '--js', 'hello.js', 'itertools.js', 'org.transcrypt.__runtime__.js',
    '--js_output_file', 'hello_bundle.js',
    # '--formatting', 'PRETTY_PRINT'
    '--create_source_map', 'hello_bundle.map',
    '--source_map_format=V3'
]

subprocess.run (params)


    