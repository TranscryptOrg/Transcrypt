// Transcrypt'ed from Python, 2018-04-07 16:10:28
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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