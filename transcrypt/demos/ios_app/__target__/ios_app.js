// Transcrypt'ed from Python, 2018-04-07 19:09:30
var random = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_random__ from './random.js';
__nest__ (random, '', __module_random__);
var __name__ = '__main__';

export var Dice =  __class__ ('Dice', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		document.body.addEventListener ('touchstart', (function __lambda__ (event) {
			return event.preventDefault ();
		}));
		document.body.addEventListener ('mousedown', (function __lambda__ (event) {
			return event.preventDefault ();
		}));
		document.body.style.margin = 0;
		document.body.style.overflow = 'hidden';
		self.all = document.createElement ('div');
		self.all.style.color = 'white';
		self.all.style.backgroundColor = 'black';
		self.all.style.height = '100%';
		self.all.style.width = '100%';
		self.all.style.padding = 0;
		self.all.style.margin = 0;
		document.body.appendChild (self.all);
		self.dices = list ([]);
		for (var index = 0; index < 6; index++) {
			var dice = document.createElement ('div');
			dice.normalColor = (index < 3 ? '#770000' : '#0000ff');
			dice.style.position = 'absolute';
			dice.style.backgroundColor = dice.normalColor;
			dice.addEventListener ('touchstart', (function __lambda__ (aDice) {
				return (function __lambda__ () {
					return self.roll (aDice);
				});
			}) (dice));
			dice.addEventListener ('mousedown', (function __lambda__ (aDice) {
				return (function __lambda__ () {
					return self.roll (aDice);
				});
			}) (dice));
			self.dices.append (dice);
			self.all.appendChild (dice);
			dice.inner = document.createElement ('div');
			dice.inner.setAttribute ('unselectable', 'on');
			dice.inner.style.fontWeight = 'bold';
			dice.inner.style.textAlign = 'center';
			dice.inner.style.position = 'absolute';
			dice.inner.innerHTML = '?';
			dice.appendChild (dice.inner);
		}
		self.banner = document.createElement ('div');
		self.banner.style.position = 'absolute';
		self.banner.style.cursor = 'pointer';
		self.banner.addEventListener ('touchstart', self.gotoTranscryptSite);
		self.banner.addEventListener ('mousedown', self.gotoTranscryptSite);
		self.banner.style.fontFamily = 'arial';
		self.banner.innerHTML = ((('<span id="bannerLarge"><font color="777777">www.<b><i>' + '<font color="ff4422">T<font color="ffb000">r<font color="228822">a<font color="3366ff">n') + '<font color="ff4422">s<font color="ffb000">c<font color="228822">r<font color="3366ff">y<font color="ffb000">p<font color="228822">t') + '</i></b><font color="777777">.org<font size={}><font color="cccccc"></span>') + '<span id="bannerSmall"><i> Write your apps in Python for free!</i></span>';
		self.all.appendChild (self.banner);
		self.bannerLarge = document.getElementById ('bannerLarge');
		self.bannerSmall = document.getElementById ('bannerSmall');
		self.audio = new Audio ('ios_app.mp3');
		window.onresize = self.rightSize;
		self.rightSize ();
	});},
	get gotoTranscryptSite () {return __get__ (this, function (self) {
		document.location.href = 'http://www.transcrypt.org';
	});},
	get roll () {return __get__ (this, function (self, dice) {
		var frameIndex = 10;
		self.audio.play ();
		var frame = function () {
			frameIndex--;
			dice.inner.innerHTML = random.randint (1, 6);
			if (frameIndex) {
				dice.style.color = random.choice (tuple (['red', 'green', 'blue', 'yellow']));
				setTimeout (frame, 100);
			}
			else {
				dice.style.backgroundColor = dice.normalColor;
				dice.style.color = 'white';
			}
		};
		frame ();
	});},
	get rightSize () {return __get__ (this, function (self) {
		self.pageWidth = window.innerWidth;
		self.pageHeight = window.innerHeight;
		var portrait = self.pageHeight > self.pageWidth;
		for (var [index, dice] of enumerate (self.dices)) {
			if (self.pageHeight > self.pageWidth) {
				dice.style.height = 0.3 * self.pageHeight;
				dice.style.width = 0.4 * self.pageWidth;
				dice.style.top = (0.03 + (index < 3 ? index : index - 3) * 0.32) * self.pageHeight;
				dice.style.left = (index < 3 ? 0.06 : 0.54) * self.pageWidth;
				var charBoxSide = 0.3 * self.pageHeight;
				dice.inner.style.top = 0.15 * self.pageHeight - 0.6 * charBoxSide;
				dice.inner.style.left = 0.2 * self.pageWidth - 0.5 * charBoxSide;
				self.banner.style.top = 0.975 * self.pageHeight;
				self.banner.style.left = 0.06 * self.pageWidth;
				self.bannerLarge.style.fontSize = 0.017 * self.pageHeight;
				self.bannerSmall.style.fontSize = 0.014 * self.pageHeight;
			}
			else {
				dice.style.height = 0.4 * self.pageHeight;
				dice.style.width = 0.3 * self.pageWidth;
				dice.style.top = (index < 3 ? 0.06 : 0.54) * self.pageHeight;
				dice.style.left = (0.03 + (index < 3 ? index : index - 3) * 0.32) * self.pageWidth;
				var charBoxSide = 0.4 * self.pageHeight;
				dice.inner.style.top = 0.2 * self.pageHeight - 0.6 * charBoxSide;
				dice.inner.style.left = 0.15 * self.pageWidth - 0.5 * charBoxSide;
				self.banner.style.top = 0.95 * self.pageHeight;
				self.banner.style.left = 0.03 * self.pageWidth;
				self.bannerLarge.style.fontSize = 0.015 * self.pageWidth;
				self.bannerSmall.style.fontSize = 0.012 * self.pageWidth;
			}
			dice.inner.style.height = charBoxSide;
			dice.inner.style.width = charBoxSide;
			dice.inner.style.fontSize = charBoxSide;
		}
	});}
});
export var dice = Dice ();

//# sourceMappingURL=ios_app.map