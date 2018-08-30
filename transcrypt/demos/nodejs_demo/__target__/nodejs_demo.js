// Transcrypt'ed from Python, 2018-08-28 20:48:02
var time = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
var __name__ = '__main__';
export var http = require ('http');
export var Demo =  __class__ ('Demo', [object], {
	__module__: __name__,
	texts: tuple (['Welcome to the world of node.js', 'You can have your cake and eat it', "Use node's ecosystem while programming in Python", 'Using node.js from Transcrypt is easy', 'Take a Python ride into the node.js world']),
	get __init__ () {return __get__ (this, function (self, port) {
		print ('Demo server started on port', port);
		self.server = http.createServer (self.serve);
		self.server.listen (port);
		self.oldIndex = 0;
		self.newIndex = 0;
		self.count = 0;
	});},
	get serve () {return __get__ (this, function (self, request, response) {
		time.__adapt__ (request);
		response.writeHead (200);
		print ('Serving page', self.count);
		self.count++;
		while (self.newIndex == self.oldIndex) {
			self.newIndex = int (Math.random () * len (self.texts));
		}
		self.oldIndex = self.newIndex;
		response.end ('<h1>{}</h1><h1>{}</h1>'.format (self.texts [self.newIndex], time.localtime ()));
	});}
});
export var demo = Demo (8090);

//# sourceMappingURL=nodejs_demo.map