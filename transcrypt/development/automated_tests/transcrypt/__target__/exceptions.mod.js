"use strict";
import {__nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __Envir__, __envir__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'exceptions';
if (__envir__.executor_name == __envir__.transpiler_name) {
	export var BaseException =  __class__ ('BaseException', [object], {
		__module__: __name__,
	});
}
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