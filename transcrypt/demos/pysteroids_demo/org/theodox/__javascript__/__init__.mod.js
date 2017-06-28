	__nest__ (
		__all__,
		'org.theodox', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var itertools = {};
					var math = {};
					__nest__ (math, '', __init__ (__world__.math));
					__nest__ (itertools, '', __init__ (__world__.itertools));
					var Vector = __class__ ('Vector', [object], {
						get _apply () {return __get__ (this, function (self, op, other) {
							var pairwise = null;
							if (py_typeof (other) === Vector) {
								var pairwise = zip (self.vals, other.vals);
							}
							else {
								var pairwise = zip (self.vals, function () {
									var __accu0__ = [];
									for (var _ of self.vals) {
										__accu0__.append (other);
									}
									return __accu0__;
								} ());
							}
							return Vector (...itertools.starmap (op, pairwise));
						});},
						get __init__ () {return __get__ (this, function (self) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							self.vals = args;
						});},
						get __add__ () {return __get__ (this, function (self, other) {
							return self._apply ((function __lambda__ (a, b) {
								return a + b;
							}), other);
						});},
						get __sub__ () {return __get__ (this, function (self, other) {
							return self._apply ((function __lambda__ (a, b) {
								return a - b;
							}), other);
						});},
						get __mul__ () {return __get__ (this, function (self, other) {
							return self._apply ((function __lambda__ (a, b) {
								return a * b;
							}), other);
						});},
						get __div__ () {return __get__ (this, function (self, other) {
							return self._apply ((function __lambda__ (a, b) {
								return a / b;
							}), other);
						});},
						get length () {return __get__ (this, function (self) {
							var total = sum (map ((function __lambda__ (a) {
								return math.pow (a, 2);
							}), self.vals));
							return math.sqrt (total);
						});},
						get normalized () {return __get__ (this, function (self) {
							var divisor = list ([self.length ()]) * len (self);
							return Vector (...self / divisor);
						});},
						get __iter__ () {return __get__ (this, function (self) {
							return py_iter (self.vals);
						});},
						[Symbol.iterator] () {return this.__iter__ ()},
						get map () {return __get__ (this, function (cls) {
							var args = tuple ([].slice.apply (arguments).slice (1));
							return args [0].map (args.__getslice__ (1, null, 1));
						});},
						get __getitem__ () {return __get__ (this, function (self, item) {
							return self.values [item];
						});},
						get __str__ () {return __get__ (this, function (self) {
							return str (self.vals);
						});},
						get __len__ () {return __get__ (this, function (self) {
							return len (self.vals);
						});},
						get add () {return __get__ (this, function (cls, a, b) {
							return Vector (...a) + Vector (...b);
						});},
						get sub () {return __get__ (this, function (cls, a, b) {
							return Vector (...a) - Vector (...b);
						});},
						get mul () {return __get__ (this, function (cls, a, b) {
							return Vector (...a) * Vector (...b);
						});},
						get div () {return __get__ (this, function (cls, a, b) {
							return Vector (...a) / Vector (...b);
						});},
						get dot () {return __get__ (this, function (cls, left, right) {
							return sum (Vector.mul (left, right));
						});},
						get norm_dot () {return __get__ (this, function (Vector, left, right) {
							var left = Vector (...left).normalized ();
							var right = Vector (...right).normalized ();
							return sum (Vector.mul (left, right));
						});}
					});
					__pragma__ ('<use>' +
						'itertools' +
						'math' +
					'</use>')
					__pragma__ ('<all>')
						__all__.Vector = Vector;
					__pragma__ ('</all>')
				}
			}
		}
	);
