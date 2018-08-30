// Transcrypt'ed from Python, 2018-08-28 20:48:22
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {_array, _bitmask1, _bitmask2, _bitmask3, _fill_array, _index, _random_integer, choice, randint, random, seed, shuffle} from './random.js';
import {Turtle, _allTurtles, _debug, _defaultElement, _defaultTurtle, _height, _ns, _offset, _rightSize, _svg, _timer, _width, back, begin_fill, bgcolor, circle, color, distance, done, down, end_fill, forward, goto, home, left, ontimer, pensize, pos, position, py_clear, reset, right, setDefaultElement, speed, up} from './turtle.js';
var __name__ = '__main__';
speed (0);
export var colors = tuple (['gray', 'green', 'red', 'white', 'blue', 'yellow']);
export var delta = 8;
export var threshold = 100;
color ('black', 'black');
export var maybe = function (bias) {
	if (typeof bias == 'undefined' || (bias != null && bias.hasOwnProperty ("__kwargtrans__"))) {;
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
	if (typeof xMin == 'undefined' || (xMin != null && xMin.hasOwnProperty ("__kwargtrans__"))) {;
		var xMin = -(250);
	};
	if (typeof yMin == 'undefined' || (yMin != null && yMin.hasOwnProperty ("__kwargtrans__"))) {;
		var yMin = -(300);
	};
	if (typeof xMax == 'undefined' || (xMax != null && xMax.hasOwnProperty ("__kwargtrans__"))) {;
		var xMax = 250;
	};
	if (typeof yMax == 'undefined' || (yMax != null && yMax.hasOwnProperty ("__kwargtrans__"))) {;
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