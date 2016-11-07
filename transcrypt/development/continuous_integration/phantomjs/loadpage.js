phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};

var page = require('webpage').create();
var system = require('system');
var poly = require('phantomjs-polyfill');
page.open(system.args[1], function(status) {
  console.log("Status: " + status);
  if(status === "success") {
  	var result= page.evaluate(function() {
		//return document.title;
		return document.body.innerHTML;
	});
	console.log('browser result ' + result);
  }
  phantom.exit();
});
