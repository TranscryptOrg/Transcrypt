	(function () {
		var fabric = __init__ (__world__.com.fabricjs).fabric;
		var orthoWidth = 1000;
		var orthoHeight = 750;
		var fieldHeight = 650;
		var __left0__ = tuple ([13, 27, 32]);
		var enter = __left0__ [0];
		var esc = __left0__ [1];
		var space = __left0__ [2];
		var Attribute = __class__ ('Attribute', [object], {
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
		var Sprite = __class__ ('Sprite', [Attribute], {
			get __init__ () {return __get__ (this, function (self, game, width, height) {
				self.width = width;
				self.height = height;
				Attribute.__init__ (self, game);
			});},
			get install () {return __get__ (this, function (self) {
				self.image = new fabric.Rect (dict ({'width': self.game.scaleX (self.width), 'height': self.game.scaleY (self.height), 'originX': 'center', 'originY': 'center', 'fill': 'white'}));
			});},
			get reset () {return __get__ (this, function (self, vX, vY, x, y) {
				if (typeof vX == 'undefined' || (vX != null && vX .__class__ == __kwargdict__)) {;
					var vX = 0;
				};
				if (typeof vY == 'undefined' || (vY != null && vY .__class__ == __kwargdict__)) {;
					var vY = 0;
				};
				if (typeof x == 'undefined' || (x != null && x .__class__ == __kwargdict__)) {;
					var x = 0;
				};
				if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
					var y = 0;
				};
				if (arguments.length) {
					var __ilastarg0__ = arguments.length - 1;
					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
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
		var Paddle = __class__ ('Paddle', [Sprite], {
			get __init__ () {return __get__ (this, function (self, game, index) {
				self.index = index;
				Sprite.__init__ (self, game, self.width, self.height);
			});},
			get reset () {return __get__ (this, function (self) {
				Sprite.reset (self, __kwargdict__ ({x: (self.index ? Math.floor (orthoWidth / 2) - self.margin : Math.floor (-(orthoWidth) / 2) + self.margin), y: 0}));
			});},
			get predict () {return __get__ (this, function (self) {
				self.vY = 0;
				if (self.index) {
					if (__in__ (ord ('K'), self.game.keySet)) {
						self.vY = self.speed;
					}
					else {
						if (__in__ (ord ('M'), self.game.keySet)) {
							self.vY = -(self.speed);
						}
					}
				}
				else {
					if (__in__ (ord ('A'), self.game.keySet)) {
						self.vY = self.speed;
					}
					else {
						if (__in__ (ord ('Z'), self.game.keySet)) {
							self.vY = -(self.speed);
						}
					}
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
		Paddle.margin = 30;
		Paddle.width = 10;
		Paddle.height = 100;
		Paddle.speed = 400;
		var Ball = __class__ ('Ball', [Sprite], {
			get __init__ () {return __get__ (this, function (self, game) {
				Sprite.__init__ (self, game, self.side, self.side);
			});},
			get reset () {return __get__ (this, function (self) {
				var angle = self.game.serviceIndex * Math.PI + ((Math.random () > 0.5 ? 1 : -(1)) * Math.random ()) * Math.atan (fieldHeight / orthoWidth);
				Sprite.reset (self, __kwargdict__ ({vX: self.speed * Math.cos (angle), vY: self.speed * Math.sin (angle)}));
			});},
			get predict () {return __get__ (this, function (self) {
				Sprite.predict (self);
				if (self.x < Math.floor (-(orthoWidth) / 2)) {
					self.game.scored (1);
				}
				else {
					if (self.x > Math.floor (orthoWidth / 2)) {
						self.game.scored (0);
					}
				}
				if (self.y > Math.floor (fieldHeight / 2)) {
					self.y = Math.floor (fieldHeight / 2);
					self.vY = -(self.vY);
				}
				else {
					if (self.y < Math.floor (-(fieldHeight) / 2)) {
						self.y = Math.floor (-(fieldHeight) / 2);
						self.vY = -(self.vY);
					}
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
		Ball.side = 8;
		Ball.speed = 300;
		var Scoreboard = __class__ ('Scoreboard', [Attribute], {
			get install () {return __get__ (this, function (self) {
				self.playerLabels = function () {
					var __accu0__ = [];
					var __iter0__ = tuple ([tuple (['AZ keys:', -(7) / 16]), tuple (['KM keys:', 1 / 16])]);
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var __left0__ = __iter0__ [__index0__];
						var py_name = __left0__ [0];
						var position = __left0__ [1];
						__accu0__.append (new fabric.Text ('Player {}'.format (py_name), dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '30', 'left': self.game.orthoX (position * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.nameShift)})));
					}
					return __accu0__;
				} ();
				self.hintLabel = new fabric.Text ('[spacebar] starts game, [enter] resets score', dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '12', 'left': self.game.orthoX ((-(7) / 16) * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.hintShift)}));
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
				self.scoreLabels = function () {
					var __accu0__ = [];
					var __iter0__ = zip (self.scores, tuple ([-(2) / 16, 6 / 16]));
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var __left0__ = __iter0__ [__index0__];
						var score = __left0__ [0];
						var position = __left0__ [1];
						__accu0__.append (new fabric.Text ('{}'.format (score), dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '30', 'left': self.game.orthoX (position * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.nameShift)})));
					}
					return __accu0__;
				} ();
			});},
			get draw () {return __get__ (this, function (self) {
				var __iter0__ = zip (self.playerLabels, self.scoreLabels);
				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
					var __left0__ = __iter0__ [__index0__];
					var playerLabel = __left0__ [0];
					var scoreLabel = __left0__ [1];
					self.game.canvas.add (playerLabel);
					self.game.canvas.add (scoreLabel);
					self.game.canvas.add (self.hintLabel);
				}
				self.game.canvas.add (self.image);
			});}
		});
		Scoreboard.nameShift = 75;
		Scoreboard.hintShift = 25;
		var Game = __class__ ('Game', [object], {
			get __init__ () {return __get__ (this, function (self) {
				self.serviceIndex = (Math.random () > 0.5 ? 1 : 0);
				self.pause = true;
				self.keySet = set ();
				self.canvas = new fabric.Canvas ('canvas', dict ({'backgroundColor': 'black', 'originX': 'center', 'originY': 'center'}));
				self.canvas.onWindowResize = self.resize;
				self.canvas.onWindowDraw = self.draw;
				self.canvas.lineWidth = 2;
				self.canvas.clear ();
				self.attributes = list ([]);
				self.paddles = function () {
					var __accu0__ = [];
					for (var index = 0; index < 2; index++) {
						__accu0__.append (Paddle (self, index));
					}
					return __accu0__;
				} ();
				self.ball = Ball (self);
				self.scoreboard = Scoreboard (self);
				window.setInterval (self.update, 10);
				window.setInterval (self.draw, 20);
				window.addEventListener ('keydown', self.keydown);
				window.addEventListener ('keyup', self.keyup);
				self.time = +(new Date);
			});},
			get update () {return __get__ (this, function (self) {
				var oldTime = self.time;
				self.time = +(new Date);
				self.deltaT = (self.time - oldTime) / 1000.0;
				if (self.pause) {
					if (__in__ (space, self.keySet)) {
						self.pause = false;
					}
					else {
						if (__in__ (enter, self.keySet)) {
							self.scoreboard.reset ();
						}
					}
				}
				else {
					var __iter0__ = self.attributes;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var attribute = __iter0__ [__index0__];
						attribute.predict ();
					}
					var __iter0__ = self.attributes;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var attribute = __iter0__ [__index0__];
						attribute.interact ();
					}
					var __iter0__ = self.attributes;
					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
						var attribute = __iter0__ [__index0__];
						attribute.commit ();
					}
				}
			});},
			get scored () {return __get__ (this, function (self, playerIndex) {
				self.scoreboard.increment (playerIndex);
				self.serviceIndex = 1 - playerIndex;
				var __iter0__ = self.paddles;
				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
					var paddle = __iter0__ [__index0__];
					paddle.reset ();
				}
				self.ball.reset ();
				self.pause = true;
			});},
			get draw () {return __get__ (this, function (self) {
				self.canvas.clear ();
				var __iter0__ = self.attributes;
				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
					var attribute = __iter0__ [__index0__];
					attribute.draw ();
				}
			});},
			get resize () {return __get__ (this, function (self, width, height) {
				// pass;
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
				self.keySet.add (event.keyCode);
			});},
			get keyup () {return __get__ (this, function (self, event) {
				self.keySet.remove (event.keyCode);
			});}
		});
		var game = Game ();
		__pragma__ ('<use>' +
			'com.fabricjs' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Attribute = Attribute;
			__all__.Ball = Ball;
			__all__.Game = Game;
			__all__.Paddle = Paddle;
			__all__.Scoreboard = Scoreboard;
			__all__.Sprite = Sprite;
			__all__.enter = enter;
			__all__.esc = esc;
			__all__.fieldHeight = fieldHeight;
			__all__.game = game;
			__all__.orthoHeight = orthoHeight;
			__all__.orthoWidth = orthoWidth;
			__all__.space = space;
		__pragma__ ('</all>')
	}) ();
