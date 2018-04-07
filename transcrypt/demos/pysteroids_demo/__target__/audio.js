// Transcrypt'ed from Python, 2018-04-07 16:10:19
var logging = {};
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
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