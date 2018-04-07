// Transcrypt'ed from Python, 2018-04-07 16:30:58
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {makeDOMDriver, span, input, div} from './snabbdom.js';
var __name__ = '__main__';
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