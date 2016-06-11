	(function () {
		var http = require ('http');
		var Demo = __class__ ('Demo', [object], {
			get __init__ () {return __get__ (this, function (self, port) {
				print ('Demo server started on port', port);
				self.server = http.createServer (self.serve);
				self.server.listen (port);
				self.oldIndex = 0;
				self.newIndex = 0;
				self.count = 0;
			});},
			get serve () {return __get__ (this, function (self, request, response) {
				response.writeHead (200);
				print ('Serving page', self.count);
				self.count++;
				while (self.newIndex == self.oldIndex) {
					self.newIndex = int (Math.random () * len (self.texts));
				}
				self.oldIndex = self.newIndex;
				response.end ('<h1>{}</h1>'.format (self.texts [self.newIndex]));
			});}
		});
		Demo.texts = tuple (['Welcome to the world of node.js', 'You can have your cake and eat it', "Use node's ecosystem while programming in Python", 'Using node.js from Transcrypt is easy', 'Take a Python ride into the node.js world']);
		var demo = Demo (8080);
		__pragma__ ('<all>')
			__all__.Demo = Demo;
			__all__.demo = demo;
			__all__.http = http;
		__pragma__ ('</all>')
	}) ();
