/* 000001 */ 	(function () {
/* 000005 */ 		var fabric = __init__ (__world__.com.fabricjs).fabric;
/* 000007 */ 		var orthoWidth = 1000;
/* 000008 */ 		var orthoHeight = 750;
/* 000009 */ 		var fieldHeight = 650;
/* 000011 */ 		var __left0__ = tuple ([13, 27, 32]);
/* 000011 */ 		var enter = __left0__ [0];
/* 000011 */ 		var esc = __left0__ [1];
/* 000011 */ 		var space = __left0__ [2];
/* 000013 */ 		var Attribute = __class__ ('Attribute', [object], {
/* 000014 */ 			get __init__ () {return __get__ (this, function (self, game) {
/* 000015 */ 				self.game = game;
/* 000016 */ 				self.game.attributes.append (self);
/* 000017 */ 				self.install ();
/* 000018 */ 				self.reset ();
/* 000018 */ 			});},
/* 000020 */ 			get reset () {return __get__ (this, function (self) {
/* 000021 */ 				self.commit ();
/* 000021 */ 			});},
/* 000023 */ 			get predict () {return __get__ (this, function (self) {
/* 000024 */ 				// pass;
/* 000024 */ 			});},
/* 000026 */ 			get interact () {return __get__ (this, function (self) {
/* 000027 */ 				// pass;
/* 000027 */ 			});},
/* 000029 */ 			get commit () {return __get__ (this, function (self) {
/* 000030 */ 				// pass;
/* 000030 */ 			});}
/* 000030 */ 		});
/* 000032 */ 		var Sprite = __class__ ('Sprite', [Attribute], {
/* 000033 */ 			get __init__ () {return __get__ (this, function (self, game, width, height) {
/* 000034 */ 				self.width = width;
/* 000035 */ 				self.height = height;
/* 000036 */ 				Attribute.__init__ (self, game);
/* 000036 */ 			});},
/* 000038 */ 			get install () {return __get__ (this, function (self) {
/* 000040 */ 				self.image = new fabric.Rect (dict ({'width': self.game.scaleX (self.width), 'height': self.game.scaleY (self.height), 'originX': 'center', 'originY': 'center', 'fill': 'white'}));
/* 000044 */ 			});},
/* 000045 */ 			get reset () {return __get__ (this, function (self, vX, vY, x, y) {
/* 000045 */ 				if (typeof vX == 'undefined' || (vX != null && vX .__class__ == __kwargdict__)) {;
/* 000045 */ 					var vX = 0;
/* 000045 */ 				};
/* 000045 */ 				if (typeof vY == 'undefined' || (vY != null && vY .__class__ == __kwargdict__)) {;
/* 000045 */ 					var vY = 0;
/* 000045 */ 				};
/* 000045 */ 				if (typeof x == 'undefined' || (x != null && x .__class__ == __kwargdict__)) {;
/* 000045 */ 					var x = 0;
/* 000045 */ 				};
/* 000045 */ 				if (typeof y == 'undefined' || (y != null && y .__class__ == __kwargdict__)) {;
/* 000045 */ 					var y = 0;
/* 000045 */ 				};
/* 000045 */ 				if (arguments.length) {
/* 000045 */ 					var __ilastarg0__ = arguments.length - 1;
/* 000045 */ 					if (arguments [__ilastarg0__] && arguments [__ilastarg0__].__class__ == __kwargdict__) {
/* 000045 */ 						var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000045 */ 						for (var __attrib0__ in __allkwargs0__) {
/* 000045 */ 							switch (__attrib0__) {
/* 000045 */ 								case 'self': var self = __allkwargs0__ [__attrib0__]; break;
/* 000045 */ 								case 'vX': var vX = __allkwargs0__ [__attrib0__]; break;
/* 000045 */ 								case 'vY': var vY = __allkwargs0__ [__attrib0__]; break;
/* 000045 */ 								case 'x': var x = __allkwargs0__ [__attrib0__]; break;
/* 000045 */ 								case 'y': var y = __allkwargs0__ [__attrib0__]; break;
/* 000045 */ 							}
/* 000045 */ 						}
/* 000045 */ 					}
/* 000045 */ 				}
/* 000046 */ 				self.vX = vX;
/* 000047 */ 				self.vY = vY;
/* 000049 */ 				self.x = x;
/* 000050 */ 				self.y = y;
/* 000052 */ 				Attribute.reset (self);
/* 000053 */ 			});},
/* 000055 */ 			get predict () {return __get__ (this, function (self) {
/* 000055 */ 				self.x += self.vX * self.game.deltaT;
/* 000055 */ 				self.y += self.vY * self.game.deltaT;
/* 000055 */ 			});},
/* 000059 */ 			get commit () {return __get__ (this, function (self) {
/* 000060 */ 				self.image.left = self.game.orthoX (self.x);
/* 000061 */ 				self.image.top = self.game.orthoY (self.y);
/* 000061 */ 			});},
/* 000063 */ 			get draw () {return __get__ (this, function (self) {
/* 000064 */ 				self.game.canvas.add (self.image);
/* 000064 */ 			});}
/* 000064 */ 		});
/* 000066 */ 		var Paddle = __class__ ('Paddle', [Sprite], {
/* 000072 */ 			get __init__ () {return __get__ (this, function (self, game, index) {
/* 000073 */ 				self.index = index;
/* 000074 */ 				Sprite.__init__ (self, game, self.width, self.height);
/* 000074 */ 			});},
/* 000076 */ 			get reset () {return __get__ (this, function (self) {
/* 000077 */ 				Sprite.reset (self, __kwargdict__ ({x: (self.index ? Math.floor (orthoWidth / 2) - self.margin : Math.floor (-(orthoWidth) / 2) + self.margin), y: 0}));
/* 000077 */ 			});},
/* 000083 */ 			get predict () {return __get__ (this, function (self) {
/* 000084 */ 				self.vY = 0;
/* 000086 */ 				if (self.index) {
/* 000087 */ 					if (__in__ (ord ('K'), self.game.keySet)) {
/* 000088 */ 						self.vY = self.speed;
/* 000088 */ 					}
/* 000088 */ 					else {
/* 000089 */ 						if (__in__ (ord ('M'), self.game.keySet)) {
/* 000090 */ 							self.vY = -(self.speed);
/* 000090 */ 						}
/* 000090 */ 					}
/* 000090 */ 				}
/* 000090 */ 				else {
/* 000092 */ 					if (__in__ (ord ('A'), self.game.keySet)) {
/* 000093 */ 						self.vY = self.speed;
/* 000093 */ 					}
/* 000093 */ 					else {
/* 000094 */ 						if (__in__ (ord ('Z'), self.game.keySet)) {
/* 000095 */ 							self.vY = -(self.speed);
/* 000095 */ 						}
/* 000095 */ 					}
/* 000095 */ 				}
/* 000097 */ 				Sprite.predict (self);
/* 000097 */ 			});},
/* 000099 */ 			get interact () {return __get__ (this, function (self) {
/* 000101 */ 				self.y = Math.max (Math.floor (self.height / 2) - Math.floor (fieldHeight / 2), Math.min (self.y, Math.floor (fieldHeight / 2) - Math.floor (self.height / 2)));
/* 000104 */ 				if ((self.y - Math.floor (self.height / 2) < self.game.ball.y && self.game.ball.y < self.y + Math.floor (self.height / 2)) && (self.index == 0 && self.game.ball.x < self.x || self.index == 1 && self.game.ball.x > self.x)) {
/* 000112 */ 					self.game.ball.x = self.x;
/* 000113 */ 					self.game.ball.vX = -(self.game.ball.vX);
/* 000114 */ 					self.game.ball.speedUp (self);
/* 000114 */ 				}
/* 000114 */ 			});}
/* 000114 */ 		});
/* 000067 */ 		Paddle.margin = 30;
/* 000068 */ 		Paddle.width = 10;
/* 000069 */ 		Paddle.height = 100;
/* 000070 */ 		Paddle.speed = 400;
/* 000116 */ 		var Ball = __class__ ('Ball', [Sprite], {
/* 000120 */ 			get __init__ () {return __get__ (this, function (self, game) {
/* 000121 */ 				Sprite.__init__ (self, game, self.side, self.side);
/* 000121 */ 			});},
/* 000123 */ 			get reset () {return __get__ (this, function (self) {
/* 000127 */ 				var angle = self.game.serviceIndex * Math.PI + ((Math.random () > 0.5 ? 1 : -(1)) * Math.random ()) * Math.atan (fieldHeight / orthoWidth);
/* 000133 */ 				Sprite.reset (self, __kwargdict__ ({vX: self.speed * Math.cos (angle), vY: self.speed * Math.sin (angle)}));
/* 000133 */ 			});},
/* 000136 */ 			get predict () {return __get__ (this, function (self) {
/* 000137 */ 				Sprite.predict (self);
/* 000139 */ 				if (self.x < Math.floor (-(orthoWidth) / 2)) {
/* 000140 */ 					self.game.scored (1);
/* 000140 */ 				}
/* 000140 */ 				else {
/* 000141 */ 					if (self.x > Math.floor (orthoWidth / 2)) {
/* 000142 */ 						self.game.scored (0);
/* 000142 */ 					}
/* 000142 */ 				}
/* 000144 */ 				if (self.y > Math.floor (fieldHeight / 2)) {
/* 000145 */ 					self.y = Math.floor (fieldHeight / 2);
/* 000146 */ 					self.vY = -(self.vY);
/* 000146 */ 				}
/* 000146 */ 				else {
/* 000147 */ 					if (self.y < Math.floor (-(fieldHeight) / 2)) {
/* 000148 */ 						self.y = Math.floor (-(fieldHeight) / 2);
/* 000149 */ 						self.vY = -(self.vY);
/* 000149 */ 					}
/* 000149 */ 				}
/* 000149 */ 			});},
/* 000151 */ 			get speedUp () {return __get__ (this, function (self, bat) {
/* 000152 */ 				var factor = 1 + 0.15 * Math.pow (1 - Math.abs (self.y - bat.y) / (Math.floor (bat.height / 2)), 2);
/* 000154 */ 				if (Math.abs (self.vX) < 3 * self.speed) {
/* 000154 */ 					self.vX *= factor;
/* 000154 */ 					self.vY *= factor;
/* 000154 */ 				}
/* 000154 */ 			});}
/* 000154 */ 		});
/* 000117 */ 		Ball.side = 8;
/* 000118 */ 		Ball.speed = 300;
/* 000158 */ 		var Scoreboard = __class__ ('Scoreboard', [Attribute], {
/* 000162 */ 			get install () {return __get__ (this, function (self) {
/* 000163 */ 				self.playerLabels = function () {
/* 000163 */ 					var __accu0__ = [];
/* 000163 */ 					var __iter0__ = tuple ([tuple (['AZ keys:', -(7) / 16]), tuple (['KM keys:', 1 / 16])]);
/* 000163 */ 					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000166 */ 						var __left0__ = __iter0__ [__index0__];
/* 000166 */ 						var name = __left0__ [0];
/* 000166 */ 						var position = __left0__ [1];
/* 000165 */ 						__accu0__.append (new fabric.Text ('Player {}'.format (name), dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '30', 'left': self.game.orthoX (position * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.nameShift)})));
/* 000165 */ 					}
/* 000165 */ 					return __accu0__;
/* 000165 */ 				} ();
/* 000170 */ 				self.hintLabel = new fabric.Text ('[spacebar] starts game, [enter] resets score', dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '12', 'left': self.game.orthoX ((-(7) / 16) * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.hintShift)}));
/* 000175 */ 				self.image = new fabric.Line (list ([self.game.orthoX (Math.floor (-(orthoWidth) / 2)), self.game.orthoY (Math.floor (fieldHeight / 2)), self.game.orthoX (Math.floor (orthoWidth / 2)), self.game.orthoY (Math.floor (fieldHeight / 2))]), dict ({'stroke': 'white'}));
/* 000175 */ 			});},
/* 000180 */ 			get increment () {return __get__ (this, function (self, playerIndex) {
/* 000180 */ 				self.scores [playerIndex]++;
/* 000180 */ 			});},
/* 000183 */ 			get reset () {return __get__ (this, function (self) {
/* 000184 */ 				self.scores = list ([0, 0]);
/* 000185 */ 				Attribute.reset (self);
/* 000185 */ 			});},
/* 000187 */ 			get commit () {return __get__ (this, function (self) {
/* 000188 */ 				self.scoreLabels = function () {
/* 000188 */ 					var __accu0__ = [];
/* 000191 */ 					var __iter0__ = zip (self.scores, tuple ([-(2) / 16, 6 / 16]));
/* 000191 */ 					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000191 */ 						var __left0__ = __iter0__ [__index0__];
/* 000191 */ 						var score = __left0__ [0];
/* 000191 */ 						var position = __left0__ [1];
/* 000190 */ 						__accu0__.append (new fabric.Text ('{}'.format (score), dict ({'fill': 'white', 'fontFamily': 'arial', 'fontSize': '30', 'left': self.game.orthoX (position * orthoWidth), 'top': self.game.orthoY (Math.floor (fieldHeight / 2) + self.nameShift)})));
/* 000190 */ 					}
/* 000190 */ 					return __accu0__;
/* 000190 */ 				} ();
/* 000190 */ 			});},
/* 000193 */ 			get draw () {return __get__ (this, function (self) {
/* 000194 */ 				var __iter0__ = zip (self.playerLabels, self.scoreLabels);
/* 000194 */ 				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000194 */ 					var __left0__ = __iter0__ [__index0__];
/* 000194 */ 					var playerLabel = __left0__ [0];
/* 000194 */ 					var scoreLabel = __left0__ [1];
/* 000195 */ 					self.game.canvas.add (playerLabel);
/* 000196 */ 					self.game.canvas.add (scoreLabel);
/* 000197 */ 					self.game.canvas.add (self.hintLabel);
/* 000197 */ 				}
/* 000198 */ 				self.game.canvas.add (self.image);
/* 000198 */ 			});}
/* 000198 */ 		});
/* 000159 */ 		Scoreboard.nameShift = 75;
/* 000160 */ 		Scoreboard.hintShift = 25;
/* 000200 */ 		var Game = __class__ ('Game', [object], {
/* 000201 */ 			get __init__ () {return __get__ (this, function (self) {
/* 000202 */ 				self.serviceIndex = (Math.random () > 0.5 ? 1 : 0);
/* 000203 */ 				self.pause = true;
/* 000204 */ 				self.keySet = set ();
/* 000206 */ 				self.canvas = new fabric.Canvas ('canvas', dict ({'backgroundColor': 'black', 'originX': 'center', 'originY': 'center'}));
/* 000207 */ 				self.canvas.onWindowResize = self.resize;
/* 000208 */ 				self.canvas.onWindowDraw = self.draw;
/* 000209 */ 				self.canvas.lineWidth = 2;
/* 000210 */ 				self.canvas.clear ();
/* 000212 */ 				self.attributes = list ([]);
/* 000213 */ 				self.paddles = function () {
/* 000213 */ 					var __accu0__ = [];
/* 000213 */ 					for (var index = 0; index < 2; index++) {
/* 000213 */ 						__accu0__.append (Paddle (self, index));
/* 000213 */ 					}
/* 000213 */ 					return __accu0__;
/* 000213 */ 				} ();
/* 000214 */ 				self.ball = Ball (self);
/* 000215 */ 				self.scoreboard = Scoreboard (self);
/* 000217 */ 				window.setInterval (self.update, 10);
/* 000218 */ 				window.setInterval (self.draw, 20);
/* 000219 */ 				window.addEventListener ('keydown', self.keydown);
/* 000220 */ 				window.addEventListener ('keyup', self.keyup);
/* 000222 */ 				self.time = +(new Date);
/* 000222 */ 			});},
/* 000224 */ 			get update () {return __get__ (this, function (self) {
/* 000225 */ 				var oldTime = self.time;
/* 000226 */ 				self.time = +(new Date);
/* 000227 */ 				self.deltaT = (self.time - oldTime) / 1000.0;
/* 000229 */ 				if (self.pause) {
/* 000230 */ 					if (__in__ (space, self.keySet)) {
/* 000231 */ 						self.pause = false;
/* 000231 */ 					}
/* 000231 */ 					else {
/* 000232 */ 						if (__in__ (enter, self.keySet)) {
/* 000233 */ 							self.scoreboard.reset ();
/* 000233 */ 						}
/* 000233 */ 					}
/* 000233 */ 				}
/* 000233 */ 				else {
/* 000235 */ 					var __iter0__ = self.attributes;
/* 000235 */ 					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000235 */ 						var attribute = __iter0__ [__index0__];
/* 000236 */ 						attribute.predict ();
/* 000236 */ 					}
/* 000238 */ 					var __iter0__ = self.attributes;
/* 000238 */ 					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000238 */ 						var attribute = __iter0__ [__index0__];
/* 000239 */ 						attribute.interact ();
/* 000239 */ 					}
/* 000241 */ 					var __iter0__ = self.attributes;
/* 000241 */ 					for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000241 */ 						var attribute = __iter0__ [__index0__];
/* 000242 */ 						attribute.commit ();
/* 000242 */ 					}
/* 000242 */ 				}
/* 000242 */ 			});},
/* 000244 */ 			get scored () {return __get__ (this, function (self, playerIndex) {
/* 000245 */ 				self.scoreboard.increment (playerIndex);
/* 000246 */ 				self.serviceIndex = 1 - playerIndex;
/* 000248 */ 				var __iter0__ = self.paddles;
/* 000248 */ 				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000248 */ 					var paddle = __iter0__ [__index0__];
/* 000249 */ 					paddle.reset ();
/* 000249 */ 				}
/* 000251 */ 				self.ball.reset ();
/* 000252 */ 				self.pause = true;
/* 000252 */ 			});},
/* 000254 */ 			get draw () {return __get__ (this, function (self) {
/* 000255 */ 				self.canvas.clear ();
/* 000256 */ 				var __iter0__ = self.attributes;
/* 000256 */ 				for (var __index0__ = 0; __index0__ < __iter0__.length; __index0__++) {
/* 000256 */ 					var attribute = __iter0__ [__index0__];
/* 000257 */ 					attribute.draw ();
/* 000257 */ 				}
/* 000257 */ 			});},
/* 000259 */ 			get resize () {return __get__ (this, function (self, width, height) {
/* 000260 */ 				// pass;
/* 000260 */ 			});},
/* 000262 */ 			get scaleX () {return __get__ (this, function (self, x) {
/* 000263 */ 				return x * (self.canvas.width / orthoWidth);
/* 000263 */ 			});},
/* 000265 */ 			get scaleY () {return __get__ (this, function (self, y) {
/* 000266 */ 				return y * (self.canvas.height / orthoHeight);
/* 000266 */ 			});},
/* 000268 */ 			get orthoX () {return __get__ (this, function (self, x) {
/* 000269 */ 				return self.scaleX (x + Math.floor (orthoWidth / 2));
/* 000269 */ 			});},
/* 000271 */ 			get orthoY () {return __get__ (this, function (self, y) {
/* 000272 */ 				return self.scaleY ((orthoHeight - Math.floor (fieldHeight / 2)) - y);
/* 000272 */ 			});},
/* 000274 */ 			get keydown () {return __get__ (this, function (self, event) {
/* 000275 */ 				self.keySet.add (event.keyCode);
/* 000275 */ 			});},
/* 000277 */ 			get keyup () {return __get__ (this, function (self, event) {
/* 000278 */ 				self.keySet.remove (event.keyCode);
/* 000278 */ 			});}
/* 000278 */ 		});
/* 000280 */ 		var game = Game ();
/* 000280 */ 		__pragma__ ('<use>' +
/* 000280 */ 			'com.fabricjs' +
/* 000280 */ 		'</use>')
/* 000280 */ 		__pragma__ ('<all>')
/* 000280 */ 			__all__.Attribute = Attribute;
/* 000280 */ 			__all__.Ball = Ball;
/* 000280 */ 			__all__.Game = Game;
/* 000280 */ 			__all__.Paddle = Paddle;
/* 000280 */ 			__all__.Scoreboard = Scoreboard;
/* 000280 */ 			__all__.Sprite = Sprite;
/* 000280 */ 			__all__.enter = enter;
/* 000280 */ 			__all__.esc = esc;
/* 000280 */ 			__all__.fieldHeight = fieldHeight;
/* 000280 */ 			__all__.game = game;
/* 000280 */ 			__all__.orthoHeight = orthoHeight;
/* 000280 */ 			__all__.orthoWidth = orthoWidth;
/* 000280 */ 			__all__.space = space;
/* 000280 */ 		__pragma__ ('</all>')
/* 000280 */ 	}) ();
/* 000280 */ 