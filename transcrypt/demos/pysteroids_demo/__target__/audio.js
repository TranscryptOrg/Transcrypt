// Transcrypt'ed from Python, 2018-04-07 19:09:37
var logging = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_logging__ from './logging.js';
__nest__ (logging, '', __module_logging__);
var __name__ = 'audio';
export var logger = logging.getLogger ('root');
export var load = function (player_element, sourcefile) {
	try {
		var audio_element = document.getElementById (player_element);
		if (!(len (audio_element))) {
			var __except0__ = Exception ("unable to load audio from element '{}'".format (player_element));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		if (len (sourcefile)) {
			audio_element.src = sourcefile;
		}
		return audio_element;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var e = __except0__;
			logging.exception (e);
		}
		else {
			throw __except0__;
		}
	}
};
export var clip = function (filename) {
	var player = new Audio (filename);
	return player;
};
export var loop = function (filename) {
	var player = new Audio (filename);
	var reset_player = function () {
		player.currentTime = 0;
		player.play ();
	};
	player.addEventListener ('ended', reset_player, false);
	return player;
};

//# sourceMappingURL=audio.map