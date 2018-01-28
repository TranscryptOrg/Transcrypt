	(function () {
		var __name__ = '__main__';
		var tableText = '';
		for (var tableNr = 1; tableNr < 11; tableNr++) {
			tableText += '<b>Table of {}:</b><br>'.format (tableNr);
			for (var lineNr = 1; lineNr < 11; lineNr++) {
				tableText += '{} x {} = {}<br>'.format (lineNr, tableNr, lineNr * tableNr);
			}
			tableText += '<br>';
		}
		document.getElementById ('output').innerHTML = tableText;
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.lineNr = lineNr;
			__all__.tableNr = tableNr;
			__all__.tableText = tableText;
		__pragma__ ('</all>')
	}) ();
