// Transcrypt'ed from Python, 2018-04-07 16:10:29
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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