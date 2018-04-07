// Transcrypt'ed from Python, 2018-04-07 19:09:46
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
var __left0__ = tuple ([CycleDOM, CycleHTTPDriver]);
export var dom = __left0__ [0];
export var http = __left0__ [1];
export var render = function (user) {
	return dom.div ('.users', list ([dom.button ('.get-random', 'Get random user'), (!(user) ? null : dom.div ('.user-details', list ([dom.h1 ('.user-name', user.py_name), dom.h4 ('.user-email', user.email), dom.a ('.user-website', dict ({'attrs': dict ({'href': user.website})}), user.website)])))]));
};
export var main = function (sources) {
	var get_url_params = function () {
		var rand = Math.round (Math.random () * 9) + 1;
		var url = dict ({'url': 'http://jsonplaceholder.typicode.com/users/' + str (rand), 'category': 'users', 'method': 'GET'});
		console.log (url);
		return url;
	};
	var get_random_user_s = sources.DOM.select ('.get-random').events ('click').map (get_url_params);
	var user_s = sources.HTTP.select ('users').flatten ().map ((function __lambda__ (res) {
		return res.body;
	})).startWith (null);
	var vdom_s = user_s.map (render);
	return dict ({'DOM': vdom_s, 'HTTP': get_random_user_s});
};
Cycle.run (main, dict ({'DOM': dom.makeDOMDriver ('#app'), 'HTTP': http.makeHTTPDriver ()}));

//# sourceMappingURL=cyclejs_http_demo.map