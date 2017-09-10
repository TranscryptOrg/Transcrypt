	(function () {
		var Foo = __class__ ('Foo', [object], {
		});
		alert ('We have a ' + str (Foo ()));
		__pragma__ ('<all>')
			__all__.Foo = Foo;
		__pragma__ ('</all>')
	}) ();
