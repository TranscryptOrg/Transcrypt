import os
import sys

sys.path.append ('Transcrypt/modules/org/transcrypt')
import __base__

from setuptools import setup

def read (*paths):
	with open (os.path.join (*paths), 'r') as aFile:
		return aFile.read()

setup (
	name = 'Transcrypt',
	version = __base__.__envir__.transpilerVersion,
	description = 'SSS (Small Sane Subset) Python to JavaScript transpiler',
	long_description = (
		read ('README.rst') + '\n\n' +
		read ('license_reference.txt')
	),
	keywords = ['python', 'javascript', 'transpiler', 'compiler', 'browser', 'web', 'multiple inheritance'],
	url = 'http://www.transcrypt.org/',	
	license = 'Apache 2.0',
	author = 'Jacques de Hooge',
	author_email = 'jacques.de.hooge@qquick.org',
	packages = ['Transcrypt'],	
	include_package_data = True,
	classifiers = [
		'Development Status :: 2 - Pre-Alpha',
		'Intended Audience :: Developers',
		'Natural Language :: English',
		'License :: Other/Proprietary License',
		'Topic :: Software Development :: Libraries :: Python Modules',
		'Operating System :: OS Independent',
		'Programming Language :: Python :: 3.5',
	],
)
