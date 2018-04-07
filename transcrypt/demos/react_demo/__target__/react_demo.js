// Transcrypt'ed from Python, 2018-04-07 16:10:11
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var h = function (elm_type, props) {
	if (typeof props == 'undefined' || (props != null && props .hasOwnProperty ("__kwargtrans__"))) {;
		var props = '';
	};
	var args = tuple ([].slice.apply (arguments).slice (2));
	return React.createElement (elm_type, props, ...args);
};
export var render = function (react_element, destination_id, callback) {
	if (typeof callback == 'undefined' || (callback != null && callback .hasOwnProperty ("__kwargtrans__"))) {;
		var callback = (function __lambda__ () {
			return null;
		});
	};
	var container = document.getElementById (destination_id);
	ReactDOM.render (react_element, container, callback);
};
export var Hello = React.createClass (dict ({'displayName': 'Hello', 'getInitialState': (function __lambda__ () {
	return dict ({'counter': 0});
}), 'updateCounter': (function __lambda__ () {
	return this.setState (dict ({'counter': this.state ['counter'] + 1}));
}), 'componentDidMount': (function __lambda__ () {
	return setInterval (this.updateCounter, 1000);
}), 'render': (function __lambda__ () {
	return h ('div', dict ({'className': 'maindiv'}), h ('h1', null, 'Hello ', this.props ['name']), h ('p', null, 'Lorem ipsum dolor sit ame.'), h ('p', null, 'Counter: ', this.state ['counter']));
})}));
export var element = React.createElement (Hello, dict ({'name': 'React!'}));
render (element, 'container');

//# sourceMappingURL=react_demo.map