// Transcrypt'ed from Python, 2018-08-28 20:48:29
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var nameElement = document.getElementById ('name');
export var greetingElement = document.getElementById ('greeting');
export var ageElement = document.getElementById ('age');
export var messageElement = document.getElementById ('message');
export var greet = function () {
	greetingElement.innerHTML = 'Hi {}, I am your computer'.format (nameElement.value);
};
export var tell = function () {
	var age = float (ageElement.value);
	if (age < 12) {
		messageElement.innerHTML = 'Sorry, {} is to young to smoke sigars'.format (age);
	}
	else if (age < 16) {
		messageElement.innerHTML = 'If you are {} you do not have a drivers licence yet'.format (age);
	}
	else if (age < 30) {
		messageElement.innerHTML = 'At {} you may already have children'.format (age);
	}
	else {
		messageElement.innerHTML = 'At {} you will probably already have some working experience'.format (age);
	}
};

//# sourceMappingURL=if_else_event.map