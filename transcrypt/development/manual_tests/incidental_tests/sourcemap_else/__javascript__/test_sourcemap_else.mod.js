	(function () {
		if (true) {
			var a = 1;
		}
		else {
			var a = 2;
		}
		if (false) {
			var a = 1;
		}
		else if (false) {
			var a = 2;
		}
		else if (false) {
			var a = 3;
		}
		else {
			var a = 4;
		}
		var __break0__ = false;
		for (var i = 0; i < 3; i++) {
			var a = 1;
		}
		if (!__break0__) {
			var a = 2;
		}
		var __break0__ = false;
		while (false) {
			var a = 1;
		}
		if (!__break0__) {
			var a = 2;
		}
		try {
			var a = 1;
			try {
				var a = 3;
			}
			catch (__except0__) {
			}
		}
		catch (__except0__) {
			var a = 2;
		}
		__pragma__ ('<all>')
			__all__.a = a;
			__all__.i = i;
		__pragma__ ('</all>')
	}) ();
