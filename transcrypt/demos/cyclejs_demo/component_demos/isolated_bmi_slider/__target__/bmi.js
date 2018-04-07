// Transcrypt'ed from Python, 2018-04-07 17:30:29
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {ILabeledSlider} from './components.labeled_slider.js';
var __name__ = '__main__';
var __left0__ = tuple ([dict, CycleDOM]);
export var d = __left0__ [0];
export var dom = __left0__ [1];
export var isolate = CycleIsolate ['default'];
export var main = function (sources) {
	var xs = xstream ['default'];
	var weight_propsS = xs.of (d (__kwargtrans__ ({label: 'Weight', unit: 'kg', min: 40, value: 70, max: 150})));
	var height_propsS = xs.of (d (__kwargtrans__ ({label: 'Height', unit: 'cm', min: 140, value: 170, max: 210})));
	var ils = function (propsS) {
		return ILabeledSlider (dict ({'DOM': sources.DOM, 'props': propsS}));
	};
	var weight_slider = ils (weight_propsS);
	var height_slider = ils (height_propsS);
	var weight_vdomS = weight_slider.DOM;
	var height_vdomS = height_slider.DOM;
	var weight_valueS = weight_slider.value;
	var height_valueS = height_slider.value;
	var bmi = function (wh) {
		return round (wh [0] / Math.pow (wh [1] * 0.01, 2), 2);
	};
	var bmiS = xs.combine (weight_valueS, height_valueS).map (bmi);
	var render = function (v) {
		var __left0__ = v;
		var bmi = __left0__ [0];
		var weight_vdom = __left0__ [1];
		var height_vdom = __left0__ [2];
		return dom.div (list ([weight_vdom, height_vdom, dom.h2 ('BMI is ' + bmi)]));
	};
	var vdomS = xs.combine (bmiS, weight_vdomS, height_vdomS).map (render);
	return dict ({'DOM': vdomS});
};
Cycle.run (main, dict ({'DOM': dom.makeDOMDriver ('#app')}));

//# sourceMappingURL=bmi.map