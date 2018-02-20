		var dsm =  __init__ (__world__.dogs_submodule);
		var Dog = __class__ ('Dog', [Animal], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, py_name) {
				self.species = dsm.getTaxoTag ();
				__super__ (Dog, '__init__') (self, py_name, 'meat', 'wooof');
			});}
		});
		__pragma__ ('<use>' +
			'dogs_submodule' +
		'</use>')
		__pragma__ ('<all>')
			__all__.Dog = Dog;
		__pragma__ ('</all>')
