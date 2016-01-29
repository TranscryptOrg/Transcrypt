fabric = __pragma__ (
	'js',
	'''
		(function () {{
			var exports = {{}};
			{}	// Puts fabric in exports and in global window, fabric also refers to global window and document
			delete window.fabric;
			return exports;
		}}) () .fabric;
	''',
	includes = ['org/transcrypt/fabric/__javascript__/fabric.js']
)
