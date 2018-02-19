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
