	(function () {
		var __name__ = '__main__';
		try {
			var a = list ([1, 2, 3]);
			print ('a[10]=', __k__ (a, 10));
		}
		catch (__except0__) {
			if (isinstance (__except0__, IndexError)) {
				print ('indexError');
			}
			else if (isinstance (__except0__, KeyError)) {
				print ('KeyError');
			}
			else {
				throw __except0__;
			}
		}
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.a = a;
		__pragma__ ('</all>')
	}) ();
