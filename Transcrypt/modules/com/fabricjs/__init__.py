fabric = __pragma__ (
	'js',
	'''
		(function () {{
			var exports = {{}};
			{}	// Puts fabric in exports and in global window
			delete window.fabric;
			return exports;
		}}) () .fabric;
	''',
	includes = ['com/fabricjs/__javascript__/fabric.js']
)
