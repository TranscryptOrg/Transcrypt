import org.transcrypt.stubs

__pragma__ ('js', '{}', '''
var terminal = document.getElementById ('__terminal__');

var buffer = "";

function write (aString) {
    buffer = buffer + aString;
    terminal.innerHTML = buffer;
}

function* writeAllFn () {
    for (var i = 0; i < 10; i += 1) {
        write ("hello " + i + "<br>");
        yield;
    }
}

var writeAll = writeAllFn ()

function repeater () {
    writeAll.next()
    setTimeout (repeater, 2000);
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
        write (' left ');
    }
    else if(event.keyCode == 39) {
        write (' right ');
    }
});

repeater ()

''')
