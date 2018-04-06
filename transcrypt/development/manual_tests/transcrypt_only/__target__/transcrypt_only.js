// Transcrypt'ed from Python, 2018-04-05 23:20:08
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
import {_array, _index, _bitmask1, _bitmask2, _bitmask3, _fill_array, _random_integer, seed, randint, choice, random, shuffle} from './random.js';
export var result = '';
export var output = function () {
	var any = tuple ([].slice.apply (arguments).slice (0));
	for (var item of any) {
		result += str (item);
		result += ' ';
	}
	result += '<br>\n';
};
output ('Issue 96');

export var Tolerant =  __class__ ('Tolerant', [object], {
	__module__: __name__,
	a: 3,
	get f () {return __getcm__ (this, function (cls) {
		// pass;
	});},
	get __init__ () {return __get__ (this, function (self) {
		self.b = 4;
	});},
	get g () {return __get__ (this, function (self) {
		// pass;
	});}
});
export var tolerant = Tolerant ();
output ('T', __in__ ('a', Tolerant));
output ('T', __in__ ('f', Tolerant));
output ('F', __in__ ('b', Tolerant));
output ('T', __in__ ('g', Tolerant));
output ('F', __in__ ('h', Tolerant));
output ('F', __in__ ('a', tolerant));
output ('F', __in__ ('f', tolerant));
output ('T', __in__ ('b', tolerant));
output ('F', __in__ ('g', tolerant));
output ('F', __in__ ('h', tolerant));
output ('<br>Issue 102');

        function Example () {};
        Example.prototype.foo = function () {output (this, arguments);};

        var example = new Example();
        example.foo(1, 2, 3);
        // Works as expected:
        // Object {  } Arguments { , 5 more… }
        

export var args = list ([1, 2, 3]);
export var example = new Example ();
example.foo (1, 2, 3);
example.foo (...args);
output ('[object Object] rather than null in previous line');
output ('<br>Issue 130');
export var x = __mod__ (-(3), 8);

    var y = -3 % 8

export var z = -(3) % 8;
output (x, ' != ', y, '==', z);
document.getElementById ('output').innerHTML = result;

//# sourceMappingURL=transcrypt_only.map