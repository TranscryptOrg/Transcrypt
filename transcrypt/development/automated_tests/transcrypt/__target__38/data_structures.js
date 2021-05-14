// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'data_structures';
export var run = function (autoTester) {
	var aList = [1, 2, 3, 'moon', 'stars'];
	autoTester.check (aList);
	aList.insert (3, 'sun');
	autoTester.check (aList);
	autoTester.check (aList.__getslice__ (2, 4, 1));
	autoTester.check (aList.__getslice__ (0, null, 1));
	autoTester.check (aList.__getslice__ (2, null, 1));
	autoTester.check (len (aList));
	aList.append ('milkyway');
	autoTester.check (aList);
	aList.extend (['m1', 'm31']);
	autoTester.check (aList);
	var anotherList = list (tuple (['a', 'b', 'c']));
	autoTester.check (anotherList);
	autoTester.check (__in__ ('b', anotherList));
	autoTester.check (__in__ ('d', anotherList));
	var aDict = dict ({1: 'plant', 'animal': 2});
	autoTester.check (aDict);
	autoTester.check (aDict [1], aDict ['animal']);
	var p = function () {
		return 3;
	};
	var q = 4;
	autoTester.check (dict ([[p (), 'three'], [q, 'four']]));
	var aTuple = tuple ([1, 2, 3, 4, 5]);
	autoTester.check (aTuple);
	autoTester.check (len (aTuple));
	var anotherTuple = tuple ([1]);
	autoTester.check (anotherTuple);
	var aSet = new set ([1, 2, 2, 3]);
	autoTester.check (aSet);
	autoTester.check (len (aSet));
	autoTester.check (__in__ (2, aSet));
	autoTester.check (__in__ (4, aSet));
	aSet.py_clear ();
	autoTester.check (aSet);
	var anotherSet = set (tuple ([4, 5, 5, 6]));
	autoTester.check (anotherSet);
	var emptySet = set ();
	autoTester.check (emptySet);
	autoTester.check (len (emptySet));
	var aString = 'c_cis_d_dis_e_f_fis_g_gis_a_ais_b_c';
	autoTester.check (__in__ ('cis', aString));
	autoTester.check (__in__ ('g', aString));
	autoTester.check (__in__ ('bes', aString));
	autoTester.check (__in__ ('z', aString));
};

//# sourceMappingURL=data_structures.map