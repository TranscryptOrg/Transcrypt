// Transcrypt'ed from Python, 2018-04-05 23:20:49
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
import {makeDOMDriver, span, input, div} from './snabbdom.js';
export var d = dict;
export var log = function (f) {
	console.log (f);
	return f;
};
export var LabeledSlider = function (sources) {
	var dom_source = sources.DOM;
	var propsS = sources.props;
	var new_valueS = dom_source.select ('.slider').events ('input').map ((function __lambda__ (ev) {
		return ev.target.value;
	}));
	var stateS = propsS.map ((function __lambda__ (props) {
		return new_valueS.map ((function __lambda__ (val) {
			return dict ({'label': props.label, 'unit': props.unit, 'min': props.min, 'max': props.max, 'value': val});
		})).startWith (props);
	})).flatten ().remember ();
	var vdomS = stateS.map ((function __lambda__ (state) {
		return div ('.labeled-slider', list ([span ('.label', ((state.label + ' ') + state.value) + state.unit), input ('.slider', dict ({'attrs': dict ({'type': 'range', 'min': state.min, 'max': state.max, 'value': state.value})}))]));
	}));
	var sinks = d (__kwargtrans__ ({DOM: vdomS, value: stateS.map ((function __lambda__ (state) {
		return state.value;
	}))}));
	return sinks;
};
export var main = function (sources) {
	var xs = xstream ['default'];
	var propsS = xs.of (d (__kwargtrans__ ({label: 'Radius', unit: '', min: 20, value: 50, max: 80})));
	var labeled_slider = LabeledSlider (dict ({'DOM': sources.DOM, 'props': propsS}));
	var child_vdomS = labeled_slider.DOM;
	var child_valueS = labeled_slider.value;
	var render = function (v) {
		var __left0__ = v;
		var value = __left0__ [0];
		var child_vdom = __left0__ [1];
		return div (list ([child_vdom, div (dict ({'style': dict ({'backgroundColor': 'green', 'width': str (value) + 'px', 'height': str (value) + 'px', 'borderRadius': str (value * 0.5) + 'px'})}))]));
	};
	var vdomS = xs.combine (child_valueS, child_vdomS).map (log).map (render);
	return dict ({'DOM': vdomS});
};
Cycle.run (main, dict ({'DOM': makeDOMDriver ('#app')}));

//# sourceMappingURL=labeled_slider.map