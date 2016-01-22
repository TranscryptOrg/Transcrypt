	__nest__ (
		__all__,
		'org.transcrypt.__standard__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var Exception = __class__ ('Exception', [object], {
						get __init__ () {return __get__ (this, function (self) {
							var __args__ = [].slice.apply (arguments);
							var __ilastarg__ = __args__.length - 1;
							if (type (__args__ [__ilastarg__]) == __kwargdict__) {
								var __allkwargs__ = __args__ [__ilastarg__--];
								for (var __attrib__ in __allkwargs__) {
									switch (__attrib__) {
										case 'self': var self = __allkwargs__ [__attrib__]; break;
									}
								}
							}
							var args = tuple (__args__.slice (1, __ilastarg__ + 1));
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
