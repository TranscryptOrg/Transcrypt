	(function () {
		var __name__ = '__main__';
		var Cat = __class__ ('Cat', [Animal], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, py_name) {
				__super__ (Cat, '__init__') (self, py_name, 'fish', 'mraaaw');
			});}
		});
		__pragma__ ('<all>')
			__all__.Cat = Cat;
			__all__.__name__ = __name__;
		__pragma__ ('</all>')
	}) ();
