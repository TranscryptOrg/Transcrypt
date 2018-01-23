	(function () {
		var __name__ = '__main__';
		var tableNr = 3;
		var tableText = 'Table of {}:<br>'.format (tableNr);
		for (var lineNr = 1; lineNr < 11; lineNr++) {
			tableText += '{} x {} = {}<br>'.format (lineNr, tableNr, lineNr * tableNr);
		}
		document.getElementById ('output').innerHTML = tableText;
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.lineNr = lineNr;
			__all__.tableNr = tableNr;
			__all__.tableText = tableText;
		__pragma__ ('</all>')
	}) ();
