// Transcrypt'ed from Python, 2018-04-05 23:13:58
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = 'riot_tag';
export var __author__ = 'Gunther Klessinger, gk@axiros.com, Germany';
import {colors, cprint as col_print} from './color.js';
export var c = colors;
var __left0__ = tuple ([c ['purple'], c ['orange'], c ['gray'], c ['red'], c ['black']]);
export var M = __left0__ [0];
export var I = __left0__ [1];
export var L = __left0__ [2];
export var R = __left0__ [3];
export var B = __left0__ [4];
export var lifecycle_ev = list (['before-mount', 'mount', 'update', 'unmount']);
export var cur_tag_col = 0;

export var RiotTag =  __class__ ('RiotTag', [object], {
	__module__: __name__,
	debug: null,
	template: '<h1>it worx</h1>',
	style: '',
	node_name: 'unmounted',
	opts: null,
	get __init__ () {return __get__ (this, function (self, tag, opts) {
		self.opts = opts;
		self._setup_tag (tag);
		cur_tag_col = __mod__ (cur_tag_col + 1, len (colors));
		self.my_col = colors.py_items () [cur_tag_col] [1];
	});},
	get _setup_tag () {return __get__ (this, function (self, tag) {
		tag.py_obj = self;
		self.riot_tag = tag;
		var handlers = dict ({});
		for (var ev of lifecycle_ev) {
			var f = getattr (self, ev.py_replace ('-', '_'));
			if (f) {
				tag.on (ev, f);
			}
		}
	});},
	get pp () {return __get__ (this, function (self) {
		var msg = tuple ([].slice.apply (arguments).slice (1));
		col_print (L ('<', self.my_col (self.node_name, self.my_col), '/> '), M (' '.join ((function () {
			var __accu0__ = [];
			for (var s of msg) {
				__accu0__.append (s);
			}
			return __accu0__;
		}) ())));
	});},
	get _lifecycle_ev () {return __get__ (this, function (self, mode) {
		if (self.debug) {
			self.pp (mode + 'ing');
		}
	});},
	get py_update () {return __get__ (this, function (self) {
		self._lifecycle_ev ('update');
	});},
	get mount () {return __get__ (this, function (self) {
		self._lifecycle_ev ('mount');
	});},
	get unmount () {return __get__ (this, function (self) {
		self._lifecycle_ev ('unmount');
	});},
	get before_mount () {return __get__ (this, function (self) {
		self._lifecycle_ev ('before-mount');
		return self.bind_vars ();
	});},
	get bind_vars () {return __get__ (this, function (self) {
		var tag = self.riot_tag;
		self.node_name = tag.root.nodeName.lower ();
		self.debug && self.pp ('binding vars');
		var __left0__ = list ([]);
		tag._immutables = __left0__;
		var im = __left0__;
		var lc = lifecycle_ev;
		for (var k of dir (self)) {
			if (k [0] == '_' || __in__ (k, lifecycle_ev) || k == 'before_mount') {
				continue;
			}
			var v = getattr (self, k);
			
			                  typeof v === "function" || typeof v === "object" ?
			                  tag[k] = self[k] : tag._immutables.push(k)
		}
		
		        var i = tag._immutables, py = self
		        i.forEach(function(k, j, i) {
		            Object.defineProperty(tag, k, {
		                get: function()  { return self[k]},
		                set: function(v) { self[k] = v }
		            })
		        })
	});}
});

//# sourceMappingURL=riot_tag.map