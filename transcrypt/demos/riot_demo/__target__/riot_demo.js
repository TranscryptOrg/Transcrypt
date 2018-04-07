// Transcrypt'ed from Python, 2018-04-07 16:10:12
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
import {RiotTag} from './riot_tag.js';
var __name__ = '__main__';

export var P =  __class__ ('P', [RiotTag], {
	__module__: __name__,
	debug: 1,
	lv: list ([dict ({'name': 'n0'})]),
	counter: 1,
	template: ' <div><h1>Riot Transcrypt Tag Instance {label}</h1>\n                         <div>INNER</div></div> ',
	get count_up () {return __get__ (this, function (self) {
		self.counter = self.counter + 1;
		self.pp ('counter:', self.counter, 'len lv:', len (self.lv), 'adding one lv');
		self.lv.append (dict ({'name': 'n' + self.counter}));
		return self.counter;
	});}
});

export var Sample2 =  __class__ ('Sample2', [P], {
	__module__: __name__,
	template: P.template.py_replace ('INNER', '\n    <div>\n    <h5 each="{lv}">name: {name} - counter: {count_up()}</h5>\n    </div>\n    '),
	style: 'sample2 h5 {color: green}',
	get __init__ () {return __get__ (this, function (self, tag, opts) {
		self.label = opts.label.capitalize ();
		RiotTag.__init__ (self, tag, opts);
		self.pp ('tag init', 'adding 2 lv');
		self.lv.extend (list ([dict ({'name': 'n1'}), dict ({'name': 'n2'})]));
	});},
	get py_update () {return __get__ (this, function (self) {
		self.pp ('update handler in the custom tag, calling super');
		RiotTag.py_update (self);
	});}
});

//# sourceMappingURL=riot_demo.map