// Transcrypt'ed from Python, 2021-05-14 15:01:24
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __conj__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, complex, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __all__ = dict ({get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get run () {return run;}, set run (value) {run = value;}});
var __name__ = 'string_format';
export var run = function (autoTester) {
	autoTester.check ('Numbers:');
	autoTester.check ('int: {:06d}'.format (18));
	autoTester.check ('int: {:05}'.format (123));
	autoTester.check ('int: {:2d}'.format (180));
	autoTester.check ('int: {: 4d} {: 4d}'.format (75, -(8)));
	autoTester.check ('int: {:<8d}'.format (55));
	autoTester.check ('int: {:*>8d}'.format (55));
	autoTester.check ('int: {:8,d}'.format (5555555));
	autoTester.check ('bin: {:b}'.format (325));
	autoTester.check ('bin: {:b}'.format (-(15)));
	autoTester.check ('bin: {:010b}'.format (-(15)));
	autoTester.check ('bin: {:#010b}'.format (-(15)));
	autoTester.check ('oct: {:+010o}'.format (234));
	autoTester.check ('oct: {:#o}'.format (234));
	autoTester.check ('hex: {:+010x}'.format (234));
	autoTester.check ('hex: {:X}'.format (-(234)));
	autoTester.check ('hex: {:#10X}'.format (-(234)));
	autoTester.check ('chr: {:010c}'.format (64));
	autoTester.check ('float: {:f}'.format (-(1554.1556565)));
	autoTester.check ('float: {:#f}'.format (-(1553)));
	autoTester.check ('float: {:#.0f}'.format (-(1552)));
	autoTester.check ('float: {:.2f}'.format (105.1528));
	autoTester.check ('float: {:.8f}'.format (0.1528));
	autoTester.check ('float: {:.2f}'.format (float ('-inf')));
	autoTester.check ('float: {:f}'.format (float ('nan')));
	autoTester.check ('pct: {:.4%}'.format (1 / 3));
	autoTester.check ('exp: {:e}'.format (-(17.845265568)));
	autoTester.check ('exp: {:#e}'.format (-(17.0)));
	autoTester.check ('exp: {:015.4e}'.format (17.845265568));
	autoTester.check ('exp: {:E}'.format (165665564654686.12));
	autoTester.check ('gen: {:g}'.format (165665564654686.12));
	autoTester.check ('gen: {:g}'.format (1656));
	autoTester.check ('gen: {:g}'.format (1.123485574));
	autoTester.check ('gen: {:.8g}'.format (148560.123485574));
	autoTester.check ('gen: {:.4}'.format (1485.1));
	autoTester.check ('gen: {}'.format (1485.1));
	autoTester.check ('gen: {:.8}'.format (1485.1));
	autoTester.check ('gen: {:.8g}'.format (1485.1));
	autoTester.check ('Strings:');
	autoTester.check ('str: {:20s}'.format ('abc'));
	autoTester.check ('str: {:*>10}'.format ('abc'));
	autoTester.check ('{1}{0}{1}'.format ('kad', 'abra'));
	autoTester.check ('{1}{0!r}{1}'.format ('kad', 'abra'));
	autoTester.check ('{} and {}'.format ('dog', 'cat'));
	autoTester.check ('{:*^13}'.format ('centered'));
	var a = [15.846, 16.7856, 18.8563];
	var B = __class__ ('B', [object], {
		__module__: __name__,
		get __repr__ () {return __get__ (this, function (self) {
			return self.prop;
		});},
		get __format__ () {return __get__ (this, function (self, fmt_spec) {
			return (fmt_spec + ' ') + self.prop;
		});}
	});
	var b = B ();
	b.prop = 'object attribute';
	var c = dict ({'somekey': 'key value'});
	autoTester.check ('{a[1]:.2f} {d} {b.prop} {c[somekey]}'.format (__kwargtrans__ ({a: a, b: b, c: c, d: 'test'})));
	autoTester.check ('Other:');
	autoTester.check ('{}'.format (true));
	autoTester.check ('{:*>10}'.format (true));
	autoTester.check ('{!r:*^20}'.format (b));
	autoTester.check ('{:custom_format}'.format (b));
	autoTester.check ('{}'.format (a));
	autoTester.check ('{}'.format (c));
};

//# sourceMappingURL=string_format.map