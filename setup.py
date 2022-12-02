import os
import sys
from setuptools import setup

sys.path.append ('transcrypt/modules/org/transcrypt')

def read (*paths):
	with open (os.path.join (*paths), 'r') as aFile:
		return aFile.read()

setup (
	name = 'Transcrypt',
	version = '3.9.0',
	description = 'Python to JavaScript transpiler, supporting multiple inheritance and generating lean, highly readable code',
	long_description = (
		read ('README.rst')
	),
	keywords = ['python', 'javascript', 'transpiler', 'compiler', 'browser', 'web', 'multiple inheritance', 'transcrypt', 'django'],
	url = 'http://www.transcrypt.org',
	license = 'Apache 2.0',
	author = 'Jacques de Hooge',
	author_email = 'jacques.de.hooge@qquick.org',
	packages = ['transcrypt'],
	install_requires = [
		'mypy',
		'ideas',
	],
	entry_points = {
		'console_scripts': [
			'transcrypt = transcrypt.__main__:main'
		]
	},
	include_package_data = True,
	classifiers = [
		'Development Status :: 5 - Production/Stable',
		'Intended Audience :: Developers',
		'Natural Language :: English',
		'License :: OSI Approved :: Apache Software License',
		'Topic :: Software Development :: Libraries :: Python Modules',
		'Operating System :: OS Independent',
		'Programming Language :: Python :: 3.9',
	],
)
