// Transcrypt'ed from Python, 2018-04-05 23:14:13
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var dom = CycleDOM;
var __left0__ = tuple ([dom.div, dom.input, dom.p]);
export var div = __left0__ [0];
export var input = __left0__ [1];
export var p = __left0__ [2];
export var h1 = __left0__ [3];
export var render = function (toggled) {
	return div (list ([input (dict ({'attrs': dict ({'type': 'checkbox'})})), 'Toggle me', p ((toggled ? 'ON' : 'off'))]));
};
export var main = function (drivers) {
	var xs = xstream ['default'];
	var driver_sinks = dict ({'DOM': drivers ['DOM'].select ('input').events ('change').map ((function __lambda__ (ev) {
		return ev.target.checked;
	})).startWith (false).map (render)});
	return driver_sinks;
};
export var drivers = dict ({'DOM': dom.makeDOMDriver ('#app')});
Cycle.run (main, drivers);

//# sourceMappingURL=cyclejs_demo.map