// Transcrypt'ed from Python, 2018-04-09 10:23:44
var math = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_math__ from './math.js';
__nest__ (math, '', __module_math__);
var __name__ = 'fstrings';
export var run = function (autoTester) {
	var aDict = dict ({'one': 1});
	var aSet = new set (['rose']);
	var anArray = list (['hundred', 100, 'pi', 3.14, 'e', 2.74, 'dozen', 12]);
	var anInt = 144;
	var aFloat = 3.14;
	autoTester.check (aDict);
	autoTester.check (str (aDict));
	autoTester.check (repr (aDict));
	autoTester.check ('aDictionary: ({}, {})'.format ('aDict', 'aDict ["one"]'));
	autoTester.check ('aDictionary: ({}, {})'.format (aDict, aDict ['one']));
	autoTester.check ('aSet: ({}, {})'.format (aSet, __in__ ('rose', aSet)));
	autoTester.check ('anArray ({}, {}, {})'.format (anArray, anArray.__getslice__ (1, 4, 1), anArray [5]));
	autoTester.check ('anInt ({}, {})'.format (anInt, int (math.sqrt (anInt))));
	autoTester.check ('aFloat ({}, {})'.format (aFloat, round (math.sin (aFloat + 2.74), 2)));
};
export {};

//# sourceMappingURL=fstrings.map