// Transcrypt'ed from Python, 2018-08-28 20:47:58
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {_array, _bitmask1, _bitmask2, _bitmask3, _fill_array, _index, _random_integer, choice, randint, random, seed, shuffle} from './random.js';
var __name__ = '__main__';
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