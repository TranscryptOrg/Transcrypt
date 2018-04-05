// Transcrypt'ed from Python, 2018-04-05 23:14:10
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
import {_debug, _ns, _svg, _defaultElement, _width, _height, _offset, _rightSize, bgcolor, setDefaultElement, _allTurtles, Turtle, _defaultTurtle, _timer, reset, py_clear, ontimer, done, pensize, color, home, goto, position, pos, distance, up, down, forward, back, circle, left, right, begin_fill, end_fill, speed} from './turtle.js';
import {_array, _index, _bitmask1, _bitmask2, _bitmask3, _fill_array, _random_integer, seed, randint, choice, random, shuffle} from './random.js';
speed (0);
export var colors = tuple (['gray', 'green', 'red', 'white', 'blue', 'yellow']);
export var delta = 8;
export var threshold = 100;
color ('black', 'black');
export var maybe = function (bias) {
	if (typeof bias == 'undefined' || (bias != null && bias .hasOwnProperty ("__kwargtrans__"))) {;
		var bias = null;
	};
	return choice ((bias != null ? list ([false, true, bias, bias]) : list ([false, true])));
};
export var between = function (a, b) {
	return a + (0.2 + 0.3 * random ()) * (b - a);
};
export var recentColors = list (['black', 'black']);
export var originalColor = function () {
	while (true) {
		var result = choice (colors);
		if (result == 'white' || !(__in__ (result, recentColors))) {
			recentColors = list ([result, recentColors [0]]);
			print (result, __kwargtrans__ ({end: ' '}));
			return result;
		}
	}
};
export var rect = function (xMin, yMin, xMax, yMax) {
	for (var aColor of tuple (['black', originalColor ()])) {
		color (aColor, aColor);
		up ();
		goto (xMin, yMin);
		down ();
		begin_fill ();
		goto (xMax, yMin);
		goto (xMax, yMax);
		goto (xMin, yMax);
		goto (xMin, yMin);
		end_fill ();
		xMin += delta;
		yMin += delta;
		xMax -= delta;
		yMax -= delta;
	}
};
export var draw = function (xMin, yMin, xMax, yMax) {
	if (typeof xMin == 'undefined' || (xMin != null && xMin .hasOwnProperty ("__kwargtrans__"))) {;
		var xMin = -(250);
	};
	if (typeof yMin == 'undefined' || (yMin != null && yMin .hasOwnProperty ("__kwargtrans__"))) {;
		var yMin = -(300);
	};
	if (typeof xMax == 'undefined' || (xMax != null && xMax .hasOwnProperty ("__kwargtrans__"))) {;
		var xMax = 250;
	};
	if (typeof yMax == 'undefined' || (yMax != null && yMax .hasOwnProperty ("__kwargtrans__"))) {;
		var yMax = 300;
	};
	if (xMax - xMin > threshold && yMax - yMin > threshold) {
		if (maybe (xMax - xMin > yMax - yMin)) {
			var xMid = between (xMin, xMax);
			if (maybe ()) {
				draw (xMin, yMin, xMid, yMax);
				rect (xMid, yMin, xMax, yMax);
			}
			else {
				rect (xMin, yMin, xMid, yMax);
				draw (xMid, yMin, xMax, yMax);
			}
		}
		else {
			var yMid = between (yMin, yMax);
			if (maybe ()) {
				draw (xMin, yMin, xMax, yMid);
				rect (xMin, yMid, xMax, yMax);
			}
			else {
				rect (xMin, yMin, xMax, yMid);
				draw (xMin, yMid, xMax, yMax);
			}
		}
	}
	else {
		rect (xMin, yMin, xMax, yMax);
		ontimer ((function __lambda__ () {
			return tuple ([print (), py_clear (), draw ()]);
		}), 2000);
	}
};
draw ();
done ();

//# sourceMappingURL=mondrian.map