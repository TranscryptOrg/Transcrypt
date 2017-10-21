	(function () {
		var org = {};
		__nest__ (org, 'transcrypt.stubs', __init__ (__world__.org.transcrypt.stubs));
		
		var terminal = document.getElementById ('__terminal__');
		
		var screenBuffer = "";
		function write (aString) {
		    screenBuffer = screenBuffer + aString;
		    terminal.innerHTML = screenBuffer;
		}
		
		var keyBuffer = "";
		document.addEventListener('keydown', function (event) {
		    keyBuffer += event.keyCode;
		});
		
		function* readFn () {
		    // keyBuffer = "";
		    var counter = 0;
		    while (! (keyBuffer.length && keyBuffer [keyBuffer.length - 1] == 13)) {
		        yield false;
		    }
		    yield true;;
		}
		
		var read = readFn ();
		
		function* inputFn () {
		    while (!read ()) {
		    }
		    yield keyBuffer;
		}
		
		var input = inputFn ();
		
		function* writeAllFn () {
		    write ("What 's your name? ");
		    yield;
		    var name = input ();
		    yield;
		    write (name);
		    yield;
		}
		
		var writeAll = writeAllFn ();
		
		function repeater () {
		    writeAll.next()
		    setTimeout (repeater, 1000);
		}
		
		repeater ()
		
		
		__pragma__ ('<use>' +
			'org.transcrypt.stubs' +
		'</use>')
	}) ();
