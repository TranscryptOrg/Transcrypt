	__nest__ (
		__all__,
		'metaclasses', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var UppercaserMeta = __class__ ('UppercaserMeta', [py_metatype], {
						get __new__ () {return __get__ (this, function (meta, py_name, bases, attribs) {
							var upperAttribs = {};
							for (var attribKey in attribs) {
								upperAttribs [(attribKey.startswith ('__') ? attribKey : attribKey.upper ())] = attribs [attribKey];
							}
							return py_metatype.__new__ (meta, py_name, bases, upperAttribs);
						});}
					});
					var Uppercaser = __class__ ('Uppercaser', [object], {
					}, UppercaserMeta);
					var Animal = __class__ ('Animal', [Uppercaser], {
						Thoughts: __class__ ('Thoughts', [object], {
							quantity: 7
						}),
						color: 'Brown',
						state: 'Moving',
						get move () {return __get__ (this, function (self) {
							return 'Move';
						});}
					});
					var Plant = __class__ ('Plant', [Uppercaser], {
						Thoughts: __class__ ('Thoughts', [object], {
							quantity: 6
						}),
						color: 'Green',
						state: 'Growing',
						get grow () {return __get__ (this, function (self) {
							return 'Grow';
						});}
					});
					var Stone = __class__ ('Stone', [object], {
						Thoughts: __class__ ('Thoughts', [object], {
							quantity: 5
						}),
						color: 'Gray',
						get be () {return __get__ (this, function (self) {
							return 'Being';
						});}
					});
					var run = function (autoTester) {
						var animal = Animal ();
						autoTester.check (animal.THOUGHTS.quantity, Animal.COLOR, animal.COLOR, animal.MOVE ());
						var plant = Plant ();
						autoTester.check (plant.THOUGHTS.quantity, Plant.COLOR, plant.COLOR, plant.GROW ());
						var stone = Stone ();
						autoTester.check (stone.Thoughts.quantity, Stone.color, stone.color, stone.be ());
					};
					__pragma__ ('<all>')
						__all__.Animal = Animal;
						__all__.Plant = Plant;
						__all__.Stone = Stone;
						__all__.Uppercaser = Uppercaser;
						__all__.UppercaserMeta = UppercaserMeta;
						__all__.run = run;
					__pragma__ ('</all>')
				}
			}
		}
	);
