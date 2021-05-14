// Transcrypt'ed from Python, 2021-05-14 15:00:25
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get Ex1 () {return Ex1;}, set Ex1 (value) {Ex1 = value;}, get Ex2 () {return Ex2;}, set Ex2 (value) {Ex2 = value;}, get Ex3 () {return Ex3;}, set Ex3 (value) {Ex3 = value;}, get Table () {return Table;}, set Table (value) {Table = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}, get test1 () {return test1;}, set test1 (value) {test1 = value;}, get test2 () {return test2;}, set test2 (value) {test2 = value;}});
var __name__ = 'exceptions';
export var Ex1 =  __class__ ('Ex1', [Exception], {
	__module__: __name__,
});
export var Ex2 =  __class__ ('Ex2', [Ex1], {
	__module__: __name__,
});
export var Ex3 =  __class__ ('Ex3', [Exception], {
	__module__: __name__,
});
export var Table =  __class__ ('Table', [BaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var args = tuple ([].slice.apply (arguments).slice (1));
		self.fields = args;
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return 'Table' + repr (self.fields).py_replace (', ', ',').py_replace ("'", '');
	});}
});
export var test1 = function () {
	var __except0__ = Exception ('mary');
	__except0__.__cause__ = null;
	throw __except0__;
};
export var test2 = function (autoTester) {
	try {
		test1 ();
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex1)) {
			var exception = __except0__;
			autoTester.check (111);
			autoTester.check (exception);
		}
		else if (isinstance (__except0__, Exception)) {
			var exception = __except0__;
			autoTester.check (222);
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
};
export var run = function (autoTester) {
	test2 (autoTester);
	try {
		var __except0__ = Ex2 ('had');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex1)) {
			var exception = __except0__;
			autoTester.check ('a');
		}
		else if (isinstance (__except0__, Exception)) {
			var exception = __except0__;
			autoTester.check ('little');
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	autoTester.check (333);
	try {
		var __except0__ = Ex1 ('lamb');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex2)) {
			var exception = __except0__;
			autoTester.check ('his');
			autoTester.check (exception);
		}
		else if (isinstance (__except0__, Ex1)) {
			var exception = __except0__;
			autoTester.check ('fleece');
			autoTester.check (exception);
		}
		else if (isinstance (__except0__, Exception)) {
			var exception = __except0__;
			autoTester.check ('was');
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	finally {
		autoTester.check ('white');
	}
	autoTester.check (444);
	var test3 = function () {
		var __except0__ = Ex3 ('as');
		__except0__.__cause__ = null;
		throw __except0__;
	};
	autoTester.check (555);
	try {
		test3 ();
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex1)) {
			var exception = __except0__;
			autoTester.check ('snow');
			autoTester.check (exception);
		}
		else if (isinstance (__except0__, Exception)) {
			var exception = __except0__;
			autoTester.check ('and');
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	finally {
		autoTester.check ('everywhere');
	}
	autoTester.check (666);
	try {
		var __except0__ = Ex3 ('that');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex1)) {
			var exception = __except0__;
			autoTester.check ('mary');
			autoTester.check (exception);
		}
		else autoTester.check ('went');
	}
	finally {
		autoTester.check ('the');
	}
	autoTester.check (777);
	try {
		try {
			var __except0__ = Ex3 ('lamb');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		catch (__except0__) {
			if (isinstance (__except0__, Ex1)) {
				var exception = __except0__;
				autoTester.check ('was');
				autoTester.check (exception);
			}
			else {
				throw __except0__;
			}
		}
		finally {
			autoTester.check ('to');
		}
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex3)) {
			var exception = __except0__;
			autoTester.check ('go');
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	try {
		var __except0__ = new Table ('he', 'followed', 'her');
		__except0__.__cause__ = null;
		throw __except0__;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Ex1)) {
			var exception = __except0__;
			autoTester.check ('to');
			autoTester.check (exception);
		}
		else if (isinstance (__except0__, Table)) {
			var exception = __except0__;
			autoTester.check ('school');
			autoTester.check (exception);
		}
		else if (isinstance (__except0__, Ex3)) {
			var exception = __except0__;
			autoTester.check ('one');
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	finally {
		autoTester.check ('day');
	}
	try {
		assert ((2 * 8) / 4 == 2, 'Assert error 1');
	}
	catch (__except0__) {
		if (isinstance (__except0__, AssertionError)) {
			var exception = __except0__;
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	try {
		assert ((2 * 8) / 4 == 4, 'Assert error 2');
	}
	catch (__except0__) {
		if (isinstance (__except0__, AssertionError)) {
			var exception = __except0__;
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	try {
		assert ((2 * 8) / 4 == 2);
	}
	catch (__except0__) {
		if (isinstance (__except0__, AssertionError)) {
			var exception = __except0__;
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	try {
		assert ((2 * 8) / 4 == 4);
	}
	catch (__except0__) {
		if (isinstance (__except0__, AssertionError)) {
			var exception = __except0__;
			autoTester.check (exception);
		}
		else {
			throw __except0__;
		}
	}
	autoTester.check (888);
	try {
		autoTester.check ('hello world 1');
		try {
			autoTester.check ('no error 1');
		}
		catch (__except0__) {
		}
	}
	catch (__except0__) {
		autoTester.check ('error 1');
	}
	var i = 1 + 2;
	try {
		autoTester.check ('hello world 2');
		if (i == 3) {
			var __except0__ = Exception ();
			__except0__.__cause__ = null;
			throw __except0__;
		}
		try {
			autoTester.check ('no error 2');
		}
		catch (__except0__) {
		}
	}
	catch (__except0__) {
		autoTester.check ('error 2');
	}
	for (var raiseIt of tuple ([false, true])) {
		try {
			try {
				if (raiseIt) {
					var __except0__ = Exception ();
					__except0__.__cause__ = null;
					throw __except0__;
				}
				autoTester.check ('no error 3');
			}
			finally {
				autoTester.check ('anyhow 3');
			}
		}
		catch (__except0__) {
			autoTester.check ('error 3');
		}
	}
};

//# sourceMappingURL=exceptions.map