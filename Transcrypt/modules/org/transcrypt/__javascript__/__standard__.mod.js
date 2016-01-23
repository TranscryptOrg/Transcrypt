	__nest__ (
		__all__,
		'org.transcrypt.__standard__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Exception = __class__ ('Exception', [object], {
						get __init__ () {return __get__ (this, function (self) {
							var __args0__ = [].slice.apply (arguments);
							var __ilastarg0__ = __args0__.length - 1;
							if (type (__args0__ [__ilastarg0__]) == __kwargdict__) {
								var __allkwargs0__ = __args0__ [__ilastarg0__--];
								for (var __attrib0__ in __allkwargs0__) {
									switch (__attrib0__) {
										case 'self': var self = __allkwargs0__ [__attrib0__]; break;
									}
								}
							}
							var args = tuple (__args0__.slice (1, __ilastarg0__ + 1));
							self.args = args;
						});},
						get __repr__ () {return __get__ (this, function (self) {
							if (len (self.args)) {
								return '{}{}'.format (self.__class__.__name__, repr (tuple (self.args)));
							}
							else {
								return '???';
							}
						});},
						get __str__ () {return __get__ (this, function (self) {
							if (len (self.args) > 1) {
								return str (tuple (self.args));
							}
							else {
								if (len (self.args)) {
									return str (self.args [0] );
								}
								else {
									return '???';
								}
							}
						});}
					});
					//<all>
					__all__.Exception = Exception;
					//</all>
				}
			}
		}
	);
