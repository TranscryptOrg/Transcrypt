// Transcrypt'ed from Python, 2018-04-07 16:10:29
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
import {span, input, div} from './components.snabbdom.js';
var __name__ = 'components.labeled_slider';
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
	return dict (__kwargtrans__ ({DOM: vdomS, value: stateS.map ((function __lambda__ (state) {
		return state.value;
	}))}));
};
export var isolate = CycleIsolate ['default'];
export var ILabeledSlider = (function __lambda__ (sources) {
	return isolate (LabeledSlider) (sources);
});

//# sourceMappingURL=components.labeled_slider.map