	__nest__ (
		__all__,
		'anisound', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'anisound';
					print ('I am anisound, the sub module of sub0');
					var sound = function () {
						print ('anisound anisound anisound');
					};
					__pragma__ ('<all>')
						__all__.__name__ = __name__;
						__all__.sound = sound;
					__pragma__ ('</all>')
				}
			}
		}
	);
	(function () {
		var anisound = {};
		var __name__ = '__main__';
		__nest__ (anisound, '', __init__ (__world__.anisound));
		print ('I am anilister, the main module of sub0');
		var aList = function () {
			print ('anilist anilist anilist');
		};
		aList ();
		anisound.sound ();
		__pragma__ ('<use>' +
			'anisound' +
		'</use>')
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.aList = aList;
		__pragma__ ('</all>')
	}) ();
