// Transcrypt'ed from Python, 2018-04-05 23:20:34
import {__envir__, __nest__, __init__, __proxy__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, assert, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, format, __jsUsePyNext__, __pyUseJsNext__, py_iter, py_next, __PyIterator__, __JsIterator__, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, BaseException, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, py_TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, divmod, __Terminal__, __terminal__, print, input} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
import * as fabric from './com.fabricjs.fabric.js';
export var orthoWidth = 1000;
export var orthoHeight = 750;
export var fieldHeight = 650;
var __left0__ = tuple ([13, 27, 32]);
export var enter = __left0__ [0];
export var esc = __left0__ [1];
export var space = __left0__ [2];
window.onkeydown = (function __lambda__ (event) {
	return event.keyCode != space;
});

export var Attribute =  __class__ ('Attribute', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game) {
		self.game = game;
		self.game.attributes.append (self);
		self.install ();
		self.reset ();
	});},
	get reset () {return __get__ (this, function (self) {
		self.commit ();
	});},
	get predict () {return __get__ (this, function (self) {
		// pass;
	});},
	get interact () {return __get__ (this, function (self) {
		// pass;
	});},
	get commit () {return __get__ (this, function (self) {
		// pass;
	});}
});

export var Sprite =  __class__ ('Sprite', [Attribute], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, game, width, height) {
		self.width = width;
		self.height = height;
		Attribute.__init__ (self, game);
	});},
	get install () {return __get__ (this, function (self) {
		self.image = new fabric.Rect (dict ({'width': self.game.scaleX (self.width), 'height': self.game.scaleY (self.height), 'originX': 'center', 'originY': 'center', 'fill': 'white'}));
	});},
	get reset () {return __get__ (this, function (self, vX, vY, x, y) {
		if (typeof vX == 'undefined' || (vX != null && vX .hasOwnProperty ("__kwargtrans__"))) {;
			var vX = 0;
		};
		if (typeof vY == 'undefined' || (vY != null && vY .hasOwnProperty ("__kwargtrans__"))) {;
			var vY = 0;
		};
		if (typeof x == 'undefined' || (x != null && x .hasOwnProperty ("__kwargtrans__"))) {;
			var x = 0;
		};
		if (typeof y == 'undefined' || (y != null && y .hasOwnProperty ("__kwargtrans__"))) {;
			var y = 0;
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'vX': var vX = __allkwargs0__ [__attrib0__]; break;
						case 'vY': var vY = __allkwargs0__ [__attrib0__]; break;
						case 'x': var x = __allkwargs0__ [__attrib0__]; break;
						case 'y': var y = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.vX = vX;
		self.vY = vY;
		self.x = x;
		self.y = y;
		Attribute.reset (self);
	});},
	get predict () {return __get__ (this, function (self) {
		self.x += self.vX * self.game.deltaT;
		self.y += self.vY * self.game.deltaT;
	});},
	get commit () {return __get__ (this, function (self) {
		self.image.left = self.game.orthoX (self.x);
		self.image.top = self.game.orthoY (self.y);
	});},
	get draw () {return __get__ (this, function (self) {
		self.game.canvas.add (self.image);
	});}
});

export var Paddle =  __class__ ('Paddle', [Sprite], {
	__module__: __name__,
	margin: 30,
	width: 10,
	height: 100,
	speed: 400,
	get __init__ () {return __get__ (this, function (self, game, index) {
		self.index = index;
		Sprite.__init__ (self, game, self.width, self.height);
	});},
	get reset () {return __get__ (this, function (self) {
		Sprite.reset (self, __kwargtrans__ ({x: (self.index ? Math.floor (orthoWidth / 2) - self.margin : Math.floor (-(orthoWidth) / 2) + self.margin), y: 0}));
	});},
	get predict () {return __get__ (this, function (self) {
		self.vY = 0;
		if (self.index) {
			if (self.game.keyCode == ord ('K')) {
				self.vY = self.speed;
			}
			else if (self.game.keyCode == ord ('M')) {
				self.vY = -(self.speed);
			}
		}
		else if (self.game.keyCode == ord ('A')) {
			self.vY = self.speed;
		}
		else if (self.game.keyCode == ord ('Z')) {
			self.vY = -(self.speed);
		}
		Sprite.predict (self);
	});},
	get interact () {return __get__ (this, function (self) {
		self.y = Math.max (Math.floor (self.height / 2) - Math.floor (fieldHeight / 2), Math.min (self.y, Math.floor (fieldHeight / 2) - Math.floor (self.height / 2)));
		if ((self.y - Math.floor (self.height / 2) < self.game.ball.y && self.game.ball.y < self.y + Math.floor (self.height / 2)) && (self.index == 0 && self.game.ball.x < self.x || self.index == 1 && self.game.ball.x > self.x)) {
			self.game.ball.x = self.x;
			self.game.ball.vX = -(self.game.ball.vX);
			self.game.ball.speedUp (self);
		}
	});}
});

export var Ball =  __class__ ('Ball', [Sprite], {
	__module__: __name__,
	side: 8,
	speed: 300,
	get __init__ () {return __get__ (this, function (self, game) {
		Sprite.__init__ (self, game, self.side, self.side);
	});},
	get reset () {return __get__ (this, function (self) {
		var angle = self.game.serviceIndex * Math.PI + ((Math.random () > 0.5 ? 1 : -(1)) * Math.random ()) * Math.atan (fieldHeight / orthoWidth);
		Sprite.reset (self, __kwargtrans__ ({vX: self.speed * Math.cos (angle), vY: self.speed * Math.sin (angle)}));
	});},
	get predict () {return __get__ (this, function (self) {
		Sprite.predict (self);
		if (self.x < Math.floor (-(orthoWidth) / 2)) {
			self.game.scored (1);
		}
		else if (self.x > Math.floor (orthoWidth / 2)) {
			self.game.scored (0);
		}
		if (self.y > Math.floor (fieldHeight / 2)) {
			self.y = Math.floor (fieldHeight / 2);
			self.vY = -(self.vY);
		}
		else if (self.y < Math.floor (-(fieldHeight) / 2)) {
			self.y = Math.floor (-(fieldHeight) / 2);
			self.vY = -(self.vY);
		}
	});},
	get speedUp () {return __get__ (this, function (self, bat) {
		var factor = 1 + 0.15 * Math.pow (1 - Math.abs (self.y - bat.y) / (Math.floor (bat.height / 2)), 2);
		if (Math.abs (self.vX) < 3 * self.speed) {
			self.vX *= factor;
			self.vY *= factor;
		}
	});}
});

export var Scoreboard =  __class__ ('Scoreboard', [Attribute], {
	__module__: __name__,
	nameShift: 75,
	hintShift: 25,
	get install () {return __get__ (this, function (self) {
		self.playerLabels = (function () {
			var __accu0__ = [];
			for (var [py_name, position] of tuple ([tuple (['AZ keys:', -(7) / 16]), tuple (['KM keys:', 1 / 16])])) {
				__accu0__.append (new fabric.Text ('Player {}'.format (py_name), dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '{}'.format (self.game.canvas.width / 30), 'left': self.game.orthoX (position * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.nameShift)})));
			}
			return __accu0__;
		}) ();
		self.hintLabel = new fabric.Text ('[spacebar] starts game, [enter] resets score', dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '{}'.format (self.game.canvas.width / 70), 'left': self.game.orthoX ((-(7) / 16) * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.hintShift)}));
		self.image = new fabric.Line (list ([self.game.orthoX (Math.floor (-(orthoWidth) / 2)), self.game.orthoY (Math.floor (fieldHeight / 2)), self.game.orthoX (Math.floor (orthoWidth / 2)), self.game.orthoY (Math.floor (fieldHeight / 2))]), dict ({'stroke': 'white'}));
	});},
	get increment () {return __get__ (this, function (self, playerIndex) {
		self.scores [playerIndex]++;
	});},
	get reset () {return __get__ (this, function (self) {
		self.scores = list ([0, 0]);
		Attribute.reset (self);
	});},
	get commit () {return __get__ (this, function (self) {
		self.scoreLabels = (function () {
			var __accu0__ = [];
			for (var [score, position] of zip (self.scores, tuple ([-(2) / 16, 6 / 16]))) {
				__accu0__.append (new fabric.Text ('{}'.format (score), dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '{}'.format (self.game.canvas.width / 30), 'left': self.game.orthoX (position * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.nameShift)})));
			}
			return __accu0__;
		}) ();
	});},
	get draw () {return __get__ (this, function (self) {
		for (var [playerLabel, scoreLabel] of zip (self.playerLabels, self.scoreLabels)) {
			self.game.canvas.add (playerLabel);
			self.game.canvas.add (scoreLabel);
			self.game.canvas.add (self.hintLabel);
		}
		self.game.canvas.add (self.image);
	});}
});

export var Game =  __class__ ('Game', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.serviceIndex = (Math.random () > 0.5 ? 1 : 0);
		self.pause = true;
		self.keyCode = null;
		self.textFrame = document.getElementById ('text_frame');
		self.canvasFrame = document.getElementById ('canvas_frame');
		self.buttonsFrame = document.getElementById ('buttons_frame');
		self.canvas = new fabric.Canvas ('canvas', dict ({'backgroundColor': 'black', 'originX': 'center', 'originY': 'center'}));
		self.canvas.onWindowDraw = self.draw;
		self.canvas.lineWidth = 2;
		self.canvas.clear ();
		self.attributes = list ([]);
		self.paddles = (function () {
			var __accu0__ = [];
			for (var index = 0; index < 2; index++) {
				__accu0__.append (Paddle (self, index));
			}
			return __accu0__;
		}) ();
		self.ball = Ball (self);
		self.scoreboard = Scoreboard (self);
		window.setInterval (self.py_update, 10);
		window.setInterval (self.draw, 20);
		window.addEventListener ('keydown', self.keydown);
		window.addEventListener ('keyup', self.keyup);
		self.buttons = list ([]);
		for (var key of tuple (['A', 'Z', 'K', 'M', 'space', 'enter'])) {
			var button = document.getElementById (key);
			button.addEventListener ('mousedown', (function __lambda__ (aKey) {
				return (function __lambda__ () {
					return self.mouseOrTouch (aKey, true);
				});
			}) (key));
			button.addEventListener ('touchstart', (function __lambda__ (aKey) {
				return (function __lambda__ () {
					return self.mouseOrTouch (aKey, true);
				});
			}) (key));
			button.addEventListener ('mouseup', (function __lambda__ (aKey) {
				return (function __lambda__ () {
					return self.mouseOrTouch (aKey, false);
				});
			}) (key));
			button.addEventListener ('touchend', (function __lambda__ (aKey) {
				return (function __lambda__ () {
					return self.mouseOrTouch (aKey, false);
				});
			}) (key));
			button.style.cursor = 'pointer';
			button.style.userSelect = 'none';
			self.buttons.append (button);
		}
		self.time = +(new Date);
		window.onresize = self.resize;
		self.resize ();
	});},
	get install () {return __get__ (this, function (self) {
		for (var attribute of self.attributes) {
			attribute.install ();
		}
	});},
	get mouseOrTouch () {return __get__ (this, function (self, key, down) {
		if (down) {
			if (key == 'space') {
				self.keyCode = space;
			}
			else if (key == 'enter') {
				self.keyCode = enter;
			}
			else {
				self.keyCode = ord (key);
			}
		}
		else {
			self.keyCode = null;
		}
	});},
	get py_update () {return __get__ (this, function (self) {
		var oldTime = self.time;
		self.time = +(new Date);
		self.deltaT = (self.time - oldTime) / 1000.0;
		if (self.pause) {
			if (self.keyCode == space) {
				self.pause = false;
			}
			else if (self.keyCode == enter) {
				self.scoreboard.reset ();
			}
		}
		else {
			for (var attribute of self.attributes) {
				attribute.predict ();
			}
			for (var attribute of self.attributes) {
				attribute.interact ();
			}
			for (var attribute of self.attributes) {
				attribute.commit ();
			}
		}
	});},
	get scored () {return __get__ (this, function (self, playerIndex) {
		self.scoreboard.increment (playerIndex);
		self.serviceIndex = 1 - playerIndex;
		for (var paddle of self.paddles) {
			paddle.reset ();
		}
		self.ball.reset ();
		self.pause = true;
	});},
	get commit () {return __get__ (this, function (self) {
		for (var attribute of self.attributes) {
			attribute.commit ();
		}
	});},
	get draw () {return __get__ (this, function (self) {
		self.canvas.clear ();
		for (var attribute of self.attributes) {
			attribute.draw ();
		}
	});},
	get resize () {return __get__ (this, function (self) {
		self.pageWidth = window.innerWidth;
		self.pageHeight = window.innerHeight;
		self.textTop = 0;
		if (self.pageHeight > 1.2 * self.pageWidth) {
			self.canvasWidth = self.pageWidth;
			self.canvasTop = self.textTop + 300;
		}
		else {
			self.canvasWidth = 0.6 * self.pageWidth;
			self.canvasTop = self.textTop + 200;
		}
		self.canvasLeft = 0.5 * (self.pageWidth - self.canvasWidth);
		self.canvasHeight = 0.6 * self.canvasWidth;
		self.buttonsTop = (self.canvasTop + self.canvasHeight) + 50;
		self.buttonsWidth = 500;
		self.textFrame.style.top = self.textTop;
		self.textFrame.style.left = self.canvasLeft + 0.05 * self.canvasWidth;
		self.textFrame.style.width = 0.9 * self.canvasWidth;
		self.canvasFrame.style.top = self.canvasTop;
		self.canvasFrame.style.left = self.canvasLeft;
		self.canvas.setDimensions (dict ({'width': self.canvasWidth, 'height': self.canvasHeight}));
		self.buttonsFrame.style.top = self.buttonsTop;
		self.buttonsFrame.style.left = 0.5 * (self.pageWidth - self.buttonsWidth);
		self.buttonsFrame.style.width = self.canvasWidth;
		self.install ();
		self.commit ();
		self.draw ();
	});},
	get scaleX () {return __get__ (this, function (self, x) {
		return x * (self.canvas.width / orthoWidth);
	});},
	get scaleY () {return __get__ (this, function (self, y) {
		return y * (self.canvas.height / orthoHeight);
	});},
	get orthoX () {return __get__ (this, function (self, x) {
		return self.scaleX (x + Math.floor (orthoWidth / 2));
	});},
	get orthoY () {return __get__ (this, function (self, y) {
		return self.scaleY ((orthoHeight - Math.floor (fieldHeight / 2)) - y);
	});},
	get keydown () {return __get__ (this, function (self, event) {
		self.keyCode = event.keyCode;
	});},
	get keyup () {return __get__ (this, function (self, event) {
		self.keyCode = null;
	});}
});
export var game = Game ();

//# sourceMappingURL=pong.map