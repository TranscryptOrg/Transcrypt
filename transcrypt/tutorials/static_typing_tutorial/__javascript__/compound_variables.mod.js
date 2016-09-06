	__nest__ (
		__all__,
		'compound_variables', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var a = list ([1, 2, 3]);
					var a = list ([11.0, 12, 13.0]);
					var a = tuple ([4, 5, 6]);
					var a = new set ([4, 5, 6]);
					var a = list ([7, 8, 9, 10, 11]);
					var b = list ([1.0, 2, 3]);
					var b = list ([1, 2.0, 3.0]);
					var b = list ([1.0, 2.0, 'three']);
					var c = list ([1.1, 2.2, 3.3]);
					var c = list ([1, 2, 3]);
					var c = list ([4, 5.5, 6]);
					var d = tuple ([1, 2]);
					var d = tuple ([3, 4, 5]);
					var e = list ([]);
					var e = list ([1, 2.5]);
					var e = list ([3, 4, 5]);
					var f = list ([list ([1])]);
					var f = list ([list ([1, 2]), list ([3, 4])]);
					var f = list ([list ([1.5, 2.5]), list ([3.5, 4.5])]);
					__pragma__ ('<use>' +
						'typing' +
					'</use>')
					__pragma__ ('<all>')
						__all__.a = a;
						__all__.b = b;
						__all__.c = c;
						__all__.d = d;
						__all__.e = e;
						__all__.f = f;
					__pragma__ ('</all>')
				}
			}
		}
	);
