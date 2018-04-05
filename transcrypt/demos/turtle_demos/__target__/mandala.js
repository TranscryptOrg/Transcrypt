// Transcrypt'ed from Python, 2018-04-05 23:14:12
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
import {_debug, _ns, _svg, _defaultElement, _width, _height, _offset, _rightSize, bgcolor, setDefaultElement, _allTurtles, Turtle, _defaultTurtle, _timer, reset, py_clear, ontimer, done, pensize, color, home, goto, position, pos, distance, up, down, forward, back, circle, left, right, begin_fill, end_fill, speed} from './turtle.js';
bgcolor ('black');
for (var [a_color, a_pensize, start_radius, stop_radius, radius_step] of tuple ([tuple (['green', 1, 82, 40, -(6)]), tuple (['red', 1, 84, 40, -(6)]), tuple (['white', 2, 98, 50, -(5)]), tuple (['yellow', 2, 70, 50, -(5)]), tuple (['blue', 2, 97, 70, -(5)]), tuple (['orange', 2, 87, 40, -(17)]), tuple (['pink', 3, 102, 60, -(17)])])) {
	pensize (a_pensize);
	color (a_color);
	for (var angle_index = 0; angle_index < 10; angle_index++) {
		for (var radius of range (start_radius, stop_radius, radius_step)) {
			circle (radius);
		}
		right (36);
	}
}
done ();

//# sourceMappingURL=mandala.map