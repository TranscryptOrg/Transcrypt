	(function () {
		var __name__ = '__main__';
		var tafelNr = 3;
		var tafel = '';
		for (var regelNr = 1; regelNr < 11; regelNr++) {
			tafel += '<br>{} x {} = {}'.format (regelNr, tafelNr, regelNr * tafelNr);
		}
		document.getElementById ('output').innerHTML = tafel;
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.regelNr = regelNr;
			__all__.tafel = tafel;
			__all__.tafelNr = tafelNr;
		__pragma__ ('</all>')
	}) ();
