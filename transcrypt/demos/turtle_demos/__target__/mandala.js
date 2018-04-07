// Transcrypt'ed from Python, 2018-04-07 19:09:44
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {_debug, _ns, _svg, _defaultElement, _width, _height, _offset, _rightSize, bgcolor, setDefaultElement, _allTurtles, Turtle, _defaultTurtle, _timer, reset, py_clear, ontimer, done, pensize, color, home, goto, position, pos, distance, up, down, forward, back, circle, left, right, begin_fill, end_fill, speed} from './turtle.js';
var __name__ = '__main__';
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