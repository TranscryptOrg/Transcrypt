// Transcrypt'ed from Python, 2018-04-07 19:09:37
var time = {};
var warnings = {};
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __globals__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __merge__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setProperty__, __setitem__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, format, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import * as __module_warnings__ from './warnings.js';
__nest__ (warnings, '', __module_warnings__);
import * as __module_time__ from './time.js';
__nest__ (time, '', __module_time__);
var __name__ = 'logging';
export var __author__ = 'Vinay Sajip <vinay_sajip@red-dove.com>, Carl Allendorph';
export var __status__ = 'experimental';
export var __version__ = '0.5.1.2';
export var __date__ = '15 November 2016';
export var _startTime = time.time ();
export var raiseExceptions = true;
export var logThreads = true;
export var logMultiprocessing = true;
export var logProcesses = true;
export var CRITICAL = 50;
export var FATAL = CRITICAL;
export var ERROR = 40;
export var WARNING = 30;
export var WARN = WARNING;
export var INFO = 20;
export var DEBUG = 10;
export var NOTSET = 0;
export var _levelToName = dict ([[CRITICAL, 'CRITICAL'], [ERROR, 'ERROR'], [WARNING, 'WARNING'], [INFO, 'INFO'], [DEBUG, 'DEBUG'], [NOTSET, 'NOTSET']]);
export var _nameToLevel = dict ({'CRITICAL': CRITICAL, 'FATAL': FATAL, 'ERROR': ERROR, 'WARN': WARNING, 'WARNING': WARNING, 'INFO': INFO, 'DEBUG': DEBUG, 'NOTSET': NOTSET});
export var getLevelName = function (level) {
	return _levelToName.py_get (level) || _nameToLevel.py_get (level) || 'Level {}'.format (level);
};
export var addLevelName = function (level, levelName) {
	_acquireLock ();
	try {
		_levelToName [level] = levelName;
		_nameToLevel [levelName] = level;
	}
	catch (__except0__) {
		if (isinstance (__except0__, Exception)) {
			var exc = __except0__;
			var __except1__ = exc;
			__except1__.__cause__ = null;
			throw __except1__;
		}
		else {
			throw __except0__;
		}
	}
	finally {
		_releaseLock ();
	}
};
export var currentframe = function () {
	return null;
};
export var _srcfile = null;
export var _checkLevel = function (level) {
	if (isinstance (level, int)) {
		var rv = level;
	}
	else if (str (level) == level) {
		if (!__in__ (level, _nameToLevel)) {
			var __except0__ = ValueError ('Unknown level: {}'.format (level));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		var rv = _nameToLevel [level];
	}
	else {
		var __except0__ = py_TypeError ('Level not an integer or a valid string: {}'.format (level));
		__except0__.__cause__ = null;
		throw __except0__;
	}
	return rv;
};
export var _lock = null;
export var _acquireLock = function () {
	if (_lock) {
		_lock.acquire ();
	}
};
export var _releaseLock = function () {
	if (_lock) {
		_lock.release ();
	}
};

export var LogRecord =  __class__ ('LogRecord', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name, level, pathname, lineno, msg, args, exc_info, func, sinfo) {
		if (typeof func == 'undefined' || (func != null && func .hasOwnProperty ("__kwargtrans__"))) {;
			var func = null;
		};
		if (typeof sinfo == 'undefined' || (sinfo != null && sinfo .hasOwnProperty ("__kwargtrans__"))) {;
			var sinfo = null;
		};
		var ct = time.time ();
		self.py_name = py_name;
		self.msg = msg;
		if (args && len (args) == 1 && isinstance (args [0], collections.Mapping) && args [0]) {
			if (raiseExceptions) {
				var __except0__ = NotImplementedError ('No Dict Args to Log Record');
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		self.args = args;
		self.levelname = getLevelName (level);
		self.levelno = level;
		self.pathname = pathname;
		self.filename = pathname;
		self.module = 'Unknown module';
		self.exc_info = exc_info;
		self.exc_text = null;
		self.stack_info = sinfo;
		self.lineno = lineno;
		self.funcName = func;
		self.created = ct;
		self.msecs = (ct - int (ct)) * 1000;
		self.relativeCreated = (self.created - _startTime) * 1000;
		self.thread = null;
		self.threadName = null;
		self.processName = null;
		self.process = null;
	});},
	get getMessage () {return __get__ (this, function (self) {
		var msg = str (self.msg);
		if (self.args) {
			var msg = msg.format (...self.args);
		}
		return msg;
	});},
	get toDict () {return __get__ (this, function (self) {
		var keysToPick = list (['name', 'msg', 'levelname', 'levelno', 'pathname', 'filename', 'module', 'lineno', 'funcName', 'created', 'asctime', 'msecs', 'relativeCreated', 'thread', 'threadName', 'process']);
		var ret = dict ({});
		for (var k of keysToPick) {
			if (k == 'name') {
				ret [k] = getattr (self, 'py_name', null);
			}
			else {
				ret [k] = getattr (self, k, null);
			}
		}
		ret ['message'] = self.getMessage ();
		return ret;
	});},
	get __str__ () {return __get__ (this, function (self) {
		return '<LogRecord: {}, {}, {}, {}, "{}">'.format (self.py_name, self.levelno, self.pathname, self.lineno, self.msg);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return str (self);
	});}
});
export var _logRecordFactory = LogRecord;
export var setLogRecordFactory = function (factory) {
	_logRecordFactory = factory;
};
export var getLogRecordFactory = function () {
	return _logRecordFactory;
};
export var makeLogRecord = function (dict) {
	var rv = _logRecordFactory (null, null, '', 0, '', tuple ([]), null, null);
	rv.__dict__.py_update (dict);
	return rv;
};

export var PercentStyle =  __class__ ('PercentStyle', [object], {
	__module__: __name__,
	default_format: '%(message)s',
	asctime_format: '%(asctime)s',
	asctime_search: '%(asctime)',
	get __init__ () {return __get__ (this, function (self, fmt) {
		self._fmt = fmt || self.default_format;
	});},
	get usesTime () {return __get__ (this, function (self) {
		return self._fmt.find (self.asctime_search) >= 0;
	});},
	get format () {return __get__ (this, function (self, record) {
		return __mod__ (self._fmt, record.__dict__);
	});}
});

export var StrFormatStyle =  __class__ ('StrFormatStyle', [PercentStyle], {
	__module__: __name__,
	default_format: '{message}',
	asctime_format: '{asctime}',
	asctime_search: '{asctime',
	get format () {return __get__ (this, function (self, record) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'record': var record = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._fmt.format (__kwargtrans__ (record.toDict ()));
	});}
});

export var StringTemplateStyle =  __class__ ('StringTemplateStyle', [PercentStyle], {
	__module__: __name__,
	default_format: '${message}',
	asctime_format: '${asctime}',
	asctime_search: '${asctime}',
	get __init__ () {return __get__ (this, function (self, fmt) {
		self._fmt = fmt || self.default_format;
		self._tpl = Template (self._fmt);
	});},
	get usesTime () {return __get__ (this, function (self) {
		var fmt = self._fmt;
		return fmt.find ('$asctime') >= 0 || fmt.find (self.asctime_format) >= 0;
	});},
	get format () {return __get__ (this, function (self, record) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'record': var record = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		return self._tpl.substitute (__kwargtrans__ (record.__dict__));
	});}
});
export var BASIC_FORMAT = '{levelname}:{name}:{message}';
export var _STYLES = dict ({'{': tuple ([StrFormatStyle, BASIC_FORMAT])});

export var Formatter =  __class__ ('Formatter', [object], {
	__module__: __name__,
	converter: time.localtime,
	get __init__ () {return __get__ (this, function (self, format, datefmt, style) {
		if (typeof format == 'undefined' || (format != null && format .hasOwnProperty ("__kwargtrans__"))) {;
			var format = null;
		};
		if (typeof datefmt == 'undefined' || (datefmt != null && datefmt .hasOwnProperty ("__kwargtrans__"))) {;
			var datefmt = null;
		};
		if (typeof style == 'undefined' || (style != null && style .hasOwnProperty ("__kwargtrans__"))) {;
			var style = '{';
		};
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'format': var format = __allkwargs0__ [__attrib0__]; break;
						case 'datefmt': var datefmt = __allkwargs0__ [__attrib0__]; break;
						case 'style': var style = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		if (style != '{') {
			var __except0__ = NotImplementedError ('{} format only');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self._style = _STYLES [style] [0] (format);
		self._fmt = self._style._fmt;
		self.datefmt = datefmt;
	});},
	default_time_format: '%Y-%m-%d %H:%M:%S',
	default_msec_format: '{},{:03d}',
	get formatTime () {return __get__ (this, function (self, record, datefmt) {
		if (typeof datefmt == 'undefined' || (datefmt != null && datefmt .hasOwnProperty ("__kwargtrans__"))) {;
			var datefmt = null;
		};
		var ct = self.converter (record.created);
		if (datefmt) {
			var s = time.strftime (datefmt, ct);
		}
		else {
			var t = time.strftime (self.default_time_format, ct);
			var s = __mod__ (self.default_msec_format, tuple ([t, record.msecs]));
		}
		return s;
	});},
	get formatException () {return __get__ (this, function (self, ei) {
		return str (ei);
	});},
	get usesTime () {return __get__ (this, function (self) {
		return self._style.usesTime ();
	});},
	get formatMessage () {return __get__ (this, function (self, record) {
		return self._style.format (record);
	});},
	get formatStack () {return __get__ (this, function (self, stack_info) {
		return stack_info;
	});},
	get format () {return __get__ (this, function (self, record) {
		record.message = record.getMessage ();
		if (self.usesTime ()) {
			record.asctime = self.formatTime (record, self.datefmt);
		}
		var s = self.formatMessage (record);
		if (record.exc_info) {
			if (!(record.exc_text)) {
				record.exc_text = self.formatException (record.exc_info);
			}
		}
		if (record.exc_text) {
			if (s [len (s) - 1] != '\n') {
				var s = s + '\n';
				var s = s + record.exc_text;
			}
		}
		if (record.stack_info) {
			if (s [len (s) - 1] != '\n') {
				var s = s + '\n';
				var s = s + self.formatStack (record.stack_info);
			}
		}
		return s;
	});}
});
export var _defaultFormatter = Formatter ();

export var BufferingFormatter =  __class__ ('BufferingFormatter', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, linefmt) {
		if (typeof linefmt == 'undefined' || (linefmt != null && linefmt .hasOwnProperty ("__kwargtrans__"))) {;
			var linefmt = null;
		};
		if (linefmt) {
			self.linefmt = linefmt;
		}
		else {
			self.linefmt = _defaultFormatter;
		}
	});},
	get formatHeader () {return __get__ (this, function (self, records) {
		return '';
	});},
	get formatFooter () {return __get__ (this, function (self, records) {
		return '';
	});},
	get format () {return __get__ (this, function (self, records) {
		var rv = '';
		if (len (records) > 0) {
			var rv = rv + self.formatHeader (records);
			for (var record of records) {
				var rv = rv + self.linefmt.format (record);
				var rv = rv + self.formatFooter (records);
			}
		}
		return rv;
	});}
});

export var Filter =  __class__ ('Filter', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name) {
		if (typeof py_name == 'undefined' || (py_name != null && py_name .hasOwnProperty ("__kwargtrans__"))) {;
			var py_name = '';
		};
		self.py_name = py_name;
		self.nlen = len (py_name);
	});},
	get filter () {return __get__ (this, function (self, record) {
		if (self.nlen == 0) {
			return true;
		}
		else if (self.py_name == record.py_name) {
			return true;
		}
		else if (record.py_name.find (self.py_name, 0, self.nlen) != 0) {
			return false;
		}
		return record.py_name [self.nlen] == '.';
	});}
});

export var Filterer =  __class__ ('Filterer', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.filters = list ([]);
	});},
	get addFilter () {return __get__ (this, function (self, filt) {
		if (!(__in__ (filt, self.filters))) {
			self.filters.append (filt);
		}
	});},
	get removeFilter () {return __get__ (this, function (self, filt) {
		if (__in__ (filt, self.filters)) {
			self.filters.remove (filt);
		}
	});},
	get filter () {return __get__ (this, function (self, record) {
		var rv = true;
		for (var f of self.filters) {
			if (hasattr (f, 'filter')) {
				var result = f.filter (record);
			}
			else {
				var result = f (record);
			}
			if (!(result)) {
				var rv = false;
				break;
			}
		}
		return rv;
	});}
});

export var ConsoleLogStream =  __class__ ('ConsoleLogStream', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.py_name = 'console';
	});},
	get write () {return __get__ (this, function (self, msg) {
		var msg = msg.rstrip ('\n\r');
		if (len (msg) > 0) {
			console.log (msg);
		}
	});}
});
export var _consoleStream = ConsoleLogStream ();
export var _handlers = dict ({});
export var _handlerList = list ([]);
export var _removeHandlerRef = function (wr) {
	var __left0__ = tuple ([_acquireLock, _releaseLock, _handlerList]);
	var acquire = __left0__ [0];
	var release = __left0__ [1];
	var handlers = __left0__ [2];
	if (acquire && release && handlers) {
		acquire ();
		try {
			if (__in__ (wr, handlers)) {
				handlers.remove (wr);
			}
		}
		finally {
			release ();
		}
	}
};
export var _addHandlerRef = function (handler) {
	_acquireLock ();
	try {
		_handlerList.append (handler);
	}
	finally {
		_releaseLock ();
	}
};

export var Handler =  __class__ ('Handler', [Filterer], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, level) {
		if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
			var level = NOTSET;
		};
		Filterer.__init__ (self);
		self._name = null;
		self.level = _checkLevel (level);
		self.formatter = null;
		_addHandlerRef (self);
		self.createLock ();
	});},
	get get_name () {return __get__ (this, function (self) {
		return self._name;
	});},
	get set_name () {return __get__ (this, function (self, py_name) {
		_acquireLock ();
		try {
			if (__in__ (self._name, _handlers)) {
				delete _handlers [self._name];
			}
			self._name = py_name;
			if (py_name) {
				_handlers [py_name] = self;
			}
		}
		finally {
			_releaseLock ();
		}
	});},
	get createLock () {return __get__ (this, function (self) {
		self.lock = null;
	});},
	get acquire () {return __get__ (this, function (self) {
		if (self.lock) {
			self.lock.acquire ();
		}
	});},
	get release () {return __get__ (this, function (self) {
		if (self.lock) {
			self.lock.release ();
		}
	});},
	get setLevel () {return __get__ (this, function (self, level) {
		self.level = _checkLevel (level);
	});},
	get format () {return __get__ (this, function (self, record) {
		if (self.formatter) {
			var fmt = self.formatter;
		}
		else {
			var fmt = _defaultFormatter;
		}
		return fmt.format (record);
	});},
	get emit () {return __get__ (this, function (self, record) {
		var __except0__ = NotImplementedError ('Must be implemented by handler');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get handle () {return __get__ (this, function (self, record) {
		var rv = self.filter (record);
		if (rv) {
			self.acquire ();
			try {
				self.emit (record);
			}
			finally {
				self.release ();
			}
		}
		return rv;
	});},
	get setFormatter () {return __get__ (this, function (self, fmt) {
		self.formatter = fmt;
	});},
	get flush () {return __get__ (this, function (self) {
		// pass;
	});},
	get close () {return __get__ (this, function (self) {
		_acquireLock ();
		try {
			if (self._name && __in__ (self._name, _handlers)) {
				delete _handlers [self._name];
			}
		}
		finally {
			_releaseLock ();
		}
	});},
	get handleError () {return __get__ (this, function (self, record) {
		if (raiseExceptions) {
			var __except0__ = Exception ('Failed to log: {}'.format (record));
			__except0__.__cause__ = null;
			throw __except0__;
		}
		else {
			_consoleStream.write ('--- Logging Error ---\n');
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		var level = getLevelName (self.level);
		return '<{} ({})>'.format (self.__class__.__name__, level);
	});}
});
Object.defineProperty (Handler, 'name', property.call (Handler, Handler.get_name, Handler.set_name));;

export var StreamHandler =  __class__ ('StreamHandler', [Handler], {
	__module__: __name__,
	terminator: '\n',
	get __init__ () {return __get__ (this, function (self, stream, level) {
		if (typeof stream == 'undefined' || (stream != null && stream .hasOwnProperty ("__kwargtrans__"))) {;
			var stream = null;
		};
		if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
			var level = NOTSET;
		};
		Handler.__init__ (self, level);
		if (stream === null) {
			var stream = _consoleStream;
		}
		self.stream = stream;
	});},
	get flush () {return __get__ (this, function (self) {
		self.acquire ();
		try {
			if (self.stream && hasattr (self.stream, 'flush')) {
				self.stream.flush ();
			}
		}
		finally {
			self.release ();
		}
	});},
	get emit () {return __get__ (this, function (self, record) {
		try {
			var msg = self.format (record);
			var stream = self.stream;
			stream.write (msg);
			stream.write (self.terminator);
			self.flush ();
		}
		catch (__except0__) {
			if (isinstance (__except0__, Exception)) {
				self.handleError (record);
			}
			else {
				throw __except0__;
			}
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		var level = getLevelName (self.level);
		var py_name = getattr (self.stream, 'name', '');
		if (py_name) {
			py_name += ' ';
		}
		return '<{} {}({})>'.format (self.__class__.__name__, py_name, level);
	});}
});

export var FileHandler =  __class__ ('FileHandler', [StreamHandler], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, filename, mode, encoding, delay) {
		if (typeof mode == 'undefined' || (mode != null && mode .hasOwnProperty ("__kwargtrans__"))) {;
			var mode = 'a';
		};
		if (typeof encoding == 'undefined' || (encoding != null && encoding .hasOwnProperty ("__kwargtrans__"))) {;
			var encoding = null;
		};
		if (typeof delay == 'undefined' || (delay != null && delay .hasOwnProperty ("__kwargtrans__"))) {;
			var delay = false;
		};
		var __except0__ = NotImplementedError ('No Filesystem for FileHandler');
		__except0__.__cause__ = null;
		throw __except0__;
	});}
});

export var _StderrHandler =  __class__ ('_StderrHandler', [StreamHandler], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, level) {
		if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
			var level = NOTSET;
		};
		StreamHandler.__init__ (self, null, level);
	});},
	get _getStream () {return __get__ (this, function (self) {
		return _consoleStream;
	});}
});
Object.defineProperty (_StderrHandler, 'stream', property.call (_StderrHandler, _StderrHandler._getStream));;
export var _defaultLastResort = _StderrHandler (WARNING);
export var lastResort = _defaultLastResort;

export var PlaceHolder =  __class__ ('PlaceHolder', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, alogger) {
		var n = alogger.py_name;
		self.loggerMap = dict ([[n, alogger]]);
	});},
	get append () {return __get__ (this, function (self, alogger) {
		var n = alogger.py_name;
		if (!__in__ (n, self.loggerMap.py_keys ())) {
			self.loggerMap [n] = alogger;
		}
	});}
});
export var setLoggerClass = function (klass) {
	if (klass != Logger) {
		if (!(issubclass (klass, Logger))) {
			var __except0__ = py_TypeError ('logger not derived from logging.Logger: ' + klass.__name__);
			__except0__.__cause__ = null;
			throw __except0__;
		}
	}
	_loggerClass = klass;
};
export var getLoggerClass = function () {
	return _loggerClass;
};

export var Manager =  __class__ ('Manager', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, rootnode) {
		self.root = rootnode;
		self.disable = 0;
		self.emittedNoHandlerWarning = false;
		self.loggerDict = dict ({});
		self.loggerClass = null;
		self.logRecordFactory = null;
	});},
	get getLogger () {return __get__ (this, function (self, py_name) {
		var rv = null;
		if (!(isinstance (py_name, str))) {
			var __except0__ = py_TypeError ('A logger name must be a string');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		_acquireLock ();
		try {
			if (__in__ (py_name, self.loggerDict)) {
				var rv = self.loggerDict [py_name];
				if (isinstance (rv, PlaceHolder)) {
					var ph = rv;
					var rv = self.loggerClass || _loggerClass (py_name);
					rv.manager = self;
					self.loggerDict [py_name] = rv;
					self._fixupChildren (ph, rv);
					self._fixupParents (rv);
				}
			}
			else {
				var rv = self.loggerClass || _loggerClass (py_name);
				rv.manager = self;
				self.loggerDict [py_name] = rv;
				self._fixupParents (rv);
			}
		}
		finally {
			_releaseLock ();
		}
		return rv;
	});},
	get setLoggerClass () {return __get__ (this, function (self, klass) {
		if (klass != Logger) {
			if (!(issubclass (klass, Logger))) {
				var __except0__ = py_TypeError ('logger not derived from logging.Logger: ' + klass.__name__);
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
		self.loggerClass = klass;
	});},
	get setLogRecordFactory () {return __get__ (this, function (self, factory) {
		self.logRecordFactory = factory;
	});},
	get _fixupParents () {return __get__ (this, function (self, alogger) {
		var py_name = alogger.py_name;
		var i = py_name.rfind ('.');
		var rv = null;
		while (i > 0 && !(rv)) {
			var substr = py_name.__getslice__ (0, i, 1);
			if (!__in__ (substr, self.loggerDict)) {
				self.loggerDict [substr] = PlaceHolder (alogger);
			}
			else {
				var obj = self.loggerDict [substr];
				if (isinstance (obj, Logger)) {
					var rv = obj;
				}
				else {
					assert (isinstance (obj, PlaceHolder));
					obj.append (alogger);
				}
			}
			var i = py_name.rfind ('.', 0, i - 1);
		}
		if (!(rv)) {
			var rv = self.root;
		}
		alogger.parent = rv;
	});},
	get _fixupChildren () {return __get__ (this, function (self, ph, alogger) {
		var py_name = alogger.py_name;
		var namelen = len (py_name);
		for (var c of ph.loggerMap.py_keys ()) {
			var log = ph.loggerMap [c];
			if (!(log.parent.py_name.startswith (py_name))) {
				alogger.parent = log.parent;
				log.parent = alogger;
			}
		}
	});}
});

export var Logger =  __class__ ('Logger', [Filterer], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, py_name, level) {
		if (typeof level == 'undefined' || (level != null && level .hasOwnProperty ("__kwargtrans__"))) {;
			var level = NOTSET;
		};
		Filterer.__init__ (self);
		self.py_name = py_name;
		self.level = _checkLevel (level);
		self.parent = null;
		self.propagate = true;
		self.handlers = list ([]);
		self.disabled = false;
	});},
	get setLevel () {return __get__ (this, function (self, level) {
		self.level = _checkLevel (level);
	});},
	get debug () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (self.isEnabledFor (DEBUG)) {
			self._log (DEBUG, msg, args, __kwargtrans__ (kwargs));
		}
	});},
	get info () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (self.isEnabledFor (INFO)) {
			self._log (INFO, msg, args, __kwargtrans__ (kwargs));
		}
	});},
	get warning () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (self.isEnabledFor (WARNING)) {
			self._log (WARNING, msg, args, __kwargtrans__ (kwargs));
		}
	});},
	get warn () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		warnings.warn_explicit ('The `warn` method is deprecated - use `warning`', DeprecationWarning, 'logging/__init__.py', 1388, 'logging');
		self.warning (msg, ...args, __kwargtrans__ (kwargs));
	});},
	get error () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (self.isEnabledFor (ERROR)) {
			self._log (ERROR, msg, args, __kwargtrans__ (kwargs));
		}
	});},
	get exception () {return __get__ (this, function (self, msg) {
		var exc_info = true;
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						case 'exc_info': var exc_info = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.error (msg, ...args, __kwargtrans__ (__merge__ ({exc_info: exc_info}, kwargs)));
	});},
	get critical () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (self.isEnabledFor (CRITICAL)) {
			self._log (CRITICAL, msg, args, __kwargtrans__ (kwargs));
		}
		var fatal = critical;
	});},
	get log () {return __get__ (this, function (self, level, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'level': var level = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (!(isinstance (level, int))) {
			if (raiseExceptions) {
				var __except0__ = py_TypeError ('level must be an integer');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			else {
				return ;
			}
		}
		if (self.isEnabledFor (level)) {
			self._log (level, msg, args, __kwargtrans__ (kwargs));
		}
	});},
	get findCaller () {return __get__ (this, function (self, stack_info) {
		if (typeof stack_info == 'undefined' || (stack_info != null && stack_info .hasOwnProperty ("__kwargtrans__"))) {;
			var stack_info = false;
		};
		var f = currentframe ();
		var rv = tuple (['(unknown file)', 0, '(unknown function)', null]);
		return rv;
	});},
	get makeRecord () {return __get__ (this, function (self, py_name, level, fn, lno, msg, args, exc_info, func, extra, sinfo) {
		if (typeof func == 'undefined' || (func != null && func .hasOwnProperty ("__kwargtrans__"))) {;
			var func = null;
		};
		if (typeof extra == 'undefined' || (extra != null && extra .hasOwnProperty ("__kwargtrans__"))) {;
			var extra = null;
		};
		if (typeof sinfo == 'undefined' || (sinfo != null && sinfo .hasOwnProperty ("__kwargtrans__"))) {;
			var sinfo = null;
		};
		var rv = _logRecordFactory (py_name, level, fn, lno, msg, args, exc_info, func, sinfo);
		if (extra !== null) {
			for (var key of extra) {
				if (__in__ (key, list (['message', 'asctime'])) || __in__ (key, rv.__dict__)) {
					var __except0__ = KeyError (__mod__ ('Attempt to overwrite %r in LogRecord', key));
					__except0__.__cause__ = null;
					throw __except0__;
				}
				rv.__dict__ [key] = extra [key];
			}
		}
		return rv;
	});},
	get _log () {return __get__ (this, function (self, level, msg, args, exc_info, extra, stack_info) {
		if (typeof exc_info == 'undefined' || (exc_info != null && exc_info .hasOwnProperty ("__kwargtrans__"))) {;
			var exc_info = null;
		};
		if (typeof extra == 'undefined' || (extra != null && extra .hasOwnProperty ("__kwargtrans__"))) {;
			var extra = null;
		};
		if (typeof stack_info == 'undefined' || (stack_info != null && stack_info .hasOwnProperty ("__kwargtrans__"))) {;
			var stack_info = false;
		};
		var sinfo = null;
		if (_srcfile) {
			try {
				var __left0__ = self.findCaller (stack_info);
				var fn = __left0__ [0];
				var lno = __left0__ [1];
				var func = __left0__ [2];
				var sinfo = __left0__ [3];
			}
			catch (__except0__) {
				if (isinstance (__except0__, ValueError)) {
					var __left0__ = tuple (['(unknown file)', 0, '(unknown function)']);
					var fn = __left0__ [0];
					var lno = __left0__ [1];
					var func = __left0__ [2];
				}
				else {
					throw __except0__;
				}
			}
		}
		else {
			var __left0__ = tuple (['(unknown file)', 0, '(unknown function)']);
			var fn = __left0__ [0];
			var lno = __left0__ [1];
			var func = __left0__ [2];
		}
		var record = self.makeRecord (self.py_name, level, fn, lno, msg, args, exc_info, func, extra, sinfo);
		self.handle (record);
	});},
	get handle () {return __get__ (this, function (self, record) {
		if (!(self.disabled) && self.filter (record)) {
			self.callHandlers (record);
		}
	});},
	get addHandler () {return __get__ (this, function (self, hdlr) {
		_acquireLock ();
		try {
			if (!(__in__ (hdlr, self.handlers))) {
				self.handlers.append (hdlr);
			}
		}
		finally {
			_releaseLock ();
		}
	});},
	get removeHandler () {return __get__ (this, function (self, hdlr) {
		_acquireLock ();
		try {
			if (__in__ (hdlr, self.handlers)) {
				self.handlers.remove (hdlr);
			}
		}
		finally {
			_releaseLock ();
		}
	});},
	get hasHandlers () {return __get__ (this, function (self) {
		var c = self;
		var rv = false;
		while (c) {
			if (len (c.handlers) > 0) {
				var rv = true;
				break;
			}
			if (!(c.propagate)) {
				break;
			}
			else {
				var c = c.parent;
			}
		}
		return rv;
	});},
	get callHandlers () {return __get__ (this, function (self, record) {
		var c = self;
		var found = 0;
		while (c) {
			for (var hdlr of c.handlers) {
				var found = found + 1;
				if (record.levelno >= hdlr.level) {
					hdlr.handle (record);
				}
			}
			if (!(c.propagate)) {
				var c = null;
			}
			else {
				var c = c.parent;
			}
		}
		if (found == 0) {
			if (lastResort) {
				if (record.levelno >= lastResort.level) {
					lastResort.handle (record);
				}
			}
			else if (raiseExceptions && !(self.manager.emittedNoHandlerWarning)) {
				_consoleStream.write ('No handlers could be found for logger "{}"'.format (self.py_name));
				self.manager.emittedNoHandlerWarning = true;
			}
		}
	});},
	get getEffectiveLevel () {return __get__ (this, function (self) {
		var logger = self;
		while (logger) {
			if (logger.level) {
				return logger.level;
			}
			var logger = logger.parent;
		}
		return NOTSET;
	});},
	get isEnabledFor () {return __get__ (this, function (self, level) {
		if (self.manager.disable >= level) {
			return false;
		}
		return level >= self.getEffectiveLevel ();
	});},
	get getChild () {return __get__ (this, function (self, suffix) {
		if (self.root !== self) {
			var suffix = '.'.join (tuple ([self.py_name, suffix]));
		}
		return self.manager.getLogger (suffix);
	});},
	get __repr__ () {return __get__ (this, function (self) {
		var level = getLevelName (self.getEffectiveLevel ());
		return '<{} {} ({})>'.format (self.__class__.__name__, self.py_name, level);
	});}
});

export var RootLogger =  __class__ ('RootLogger', [Logger], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, level) {
		Logger.__init__ (self, 'root', level);
	});}
});
export var _loggerClass = Logger;

export var LoggerAdapter =  __class__ ('LoggerAdapter', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, logger, extra) {
		self.logger = logger;
		self.extra = extra;
	});},
	get process () {return __get__ (this, function (self, msg, kwargs) {
		kwargs ['extra'] = self.extra;
		return tuple ([msg, kwargs]);
	});},
	get debug () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.log (DEBUG, msg, ...args, __kwargtrans__ (kwargs));
	});},
	get info () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.log (INFO, msg, ...args, __kwargtrans__ (kwargs));
	});},
	get warning () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.log (WARNING, msg, ...args, __kwargtrans__ (kwargs));
	});},
	get warn () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		warnings.warn_explicit ('The `warn` method is deprecated - use `warning`', DeprecationWarning, 'logging/__init__.py', 1719, 'logging');
		self.warning (msg, ...args, __kwargtrans__ (kwargs));
	});},
	get error () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.log (ERROR, msg, ...args, __kwargtrans__ (kwargs));
	});},
	get exception () {return __get__ (this, function (self, msg) {
		var exc_info = true;
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						case 'exc_info': var exc_info = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.log (ERROR, msg, ...args, __kwargtrans__ (__merge__ ({exc_info: exc_info}, kwargs)));
	});},
	get critical () {return __get__ (this, function (self, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.log (CRITICAL, msg, ...args, __kwargtrans__ (kwargs));
	});},
	get log () {return __get__ (this, function (self, level, msg) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'level': var level = __allkwargs0__ [__attrib0__]; break;
						case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (3, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		if (self.isEnabledFor (level)) {
			var __left0__ = self.process (msg, kwargs);
			var msg = __left0__ [0];
			var kwargs = __left0__ [1];
			self.logger._log (level, msg, args, __kwargtrans__ (kwargs));
		}
	});},
	get isEnabledFor () {return __get__ (this, function (self, level) {
		if (self.logger.manager.disable >= level) {
			return false;
		}
		return level >= self.getEffectiveLevel ();
	});},
	get setLevel () {return __get__ (this, function (self, level) {
		self.logger.setLevel (level);
	});},
	get getEffectiveLevel () {return __get__ (this, function (self) {
		return self.logger.getEffectiveLevel ();
	});},
	get hasHandlers () {return __get__ (this, function (self) {
		return self.logger.hasHandlers ();
	});},
	get __repr__ () {return __get__ (this, function (self) {
		var logger = self.logger;
		var level = getLevelName (logger.getEffectiveLevel ());
		return '<{} {} ({})>'.format (self.__class__.__name__, logger.py_name, level);
	});}
});
export var root = RootLogger (WARNING);
Logger.root = root;
Logger.manager = Manager (Logger.root);
root.manager = Logger.manager;
export var _resetLogging = function () {
	var _handlerList = list ([]);
	var _handlers = dict ({});
	root = RootLogger (WARNING);
	Logger.root = root;
	Logger.manager = Manager (Logger.root);
	root.manager = Logger.manager;
};
export var basicConfig = function () {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
	}
	else {
	}
	_acquireLock ();
	try {
		if (len (root.handlers) == 0) {
			var handlers = kwargs.py_pop ('handlers', null);
			if (handlers !== null) {
				if (__in__ ('stream', kwargs)) {
					var __except0__ = ValueError ("'stream' should not be specified together with 'handlers'");
					__except0__.__cause__ = null;
					throw __except0__;
				}
			}
			if (handlers === null) {
				var stream = kwargs.py_pop ('stream', null);
				var h = StreamHandler (stream);
				var handlers = list ([h]);
			}
			var dfs = kwargs.py_pop ('datefmt', null);
			var style = kwargs.py_pop ('style', '{');
			if (!__in__ (style, _STYLES)) {
				var __except0__ = ValueError ('Style must be one of: {}'.format (','.join (_STYLES.py_keys ())));
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var fs = kwargs.py_pop ('format', _STYLES [style] [1]);
			var fmt = Formatter (fs, dfs, style);
			for (var h of handlers) {
				if (h.formatter === null) {
					h.setFormatter (fmt);
				}
				root.addHandler (h);
			}
			var level = kwargs.py_pop ('level', null);
			if (level !== null) {
				root.setLevel (level);
			}
			if (len (kwargs) > 0) {
				var py_keys = ', '.join (kwargs.py_keys ());
				var __except0__ = ValueError ('Unrecognised argument(s): {}'.format (py_keys));
				__except0__.__cause__ = null;
				throw __except0__;
			}
		}
	}
	finally {
		_releaseLock ();
	}
};
export var getLogger = function (py_name) {
	if (typeof py_name == 'undefined' || (py_name != null && py_name .hasOwnProperty ("__kwargtrans__"))) {;
		var py_name = null;
	};
	if (py_name) {
		return Logger.manager.getLogger (py_name);
	}
	else {
		return root;
	}
};
export var critical = function (msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	if (len (root.handlers) == 0) {
		basicConfig ();
	}
	root.critical (msg, ...args, __kwargtrans__ (kwargs));
};
export var fatal = critical;
export var error = function (msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	if (len (root.handlers) == 0) {
		basicConfig ();
	}
	root.error (msg, ...args, __kwargtrans__ (kwargs));
};
export var exception = function (msg) {
	var exc_info = true;
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					case 'exc_info': var exc_info = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	error (msg, ...args, __kwargtrans__ (__merge__ ({exc_info: exc_info}, kwargs)));
};
export var warning = function (msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	if (len (root.handlers) == 0) {
		basicConfig ();
	}
	root.warning (msg, ...args, __kwargtrans__ (kwargs));
};
export var warn = function (msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	warnings.warn_explicit ('The `warn` method is deprecated - use `warning`', DeprecationWarning, 'logging/__init__.py', 1944, 'logging');
	warning (msg, ...args, __kwargtrans__ (kwargs));
};
export var info = function (msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	if (len (root.handlers) == 0) {
		basicConfig ();
	}
	root.info (msg, ...args, __kwargtrans__ (kwargs));
};
export var debug = function (msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	if (len (root.handlers) == 0) {
		basicConfig ();
	}
	root.debug (msg, ...args, __kwargtrans__ (kwargs));
};
export var log = function (level, msg) {
	var kwargs = dict ();
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'level': var level = __allkwargs0__ [__attrib0__]; break;
					case 'msg': var msg = __allkwargs0__ [__attrib0__]; break;
					default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
				}
			}
			delete kwargs.__kwargtrans__;
		}
		var args = tuple ([].slice.apply (arguments).slice (2, __ilastarg0__ + 1));
	}
	else {
		var args = tuple ();
	}
	if (len (root.handlers) == 0) {
		basicConfig ();
	}
	root.log (level, msg, ...args, __kwargtrans__ (kwargs));
};
export var disable = function (level) {
	root.manager.disable = level;
};
export var shutdown = function (handlerList) {
	if (typeof handlerList == 'undefined' || (handlerList != null && handlerList .hasOwnProperty ("__kwargtrans__"))) {;
		var handlerList = _handlerList;
	};
	for (var wr of py_reversed (handlerList.__getslice__ (0, null, 1))) {
		try {
			var h = wr ();
			if (h) {
				try {
					h.acquire ();
					h.flush ();
					h.close ();
				}
				catch (__except0__) {
					if (isinstance (__except0__, tuple ([OSError, ValueError]))) {
						// pass;
					}
					else {
						throw __except0__;
					}
				}
				finally {
					h.release ();
				}
			}
		}
		catch (__except0__) {
			if (isinstance (__except0__, Exception)) {
				var exc = __except0__;
				if (raiseExceptions) {
					var __except1__ = exc;
					__except1__.__cause__ = null;
					throw __except1__;
				}
			}
			else {
				throw __except0__;
			}
		}
	}
};

export var NullHandler =  __class__ ('NullHandler', [Handler], {
	__module__: __name__,
	get handle () {return __get__ (this, function (self, record) {
	});},
	get emit () {return __get__ (this, function (self, record) {
	});},
	get createLock () {return __get__ (this, function (self) {
		self.lock = null;
	});}
});
export var _warnings_showwarning = null;
export var _showwarning = function (message, category, filename, lineno, file, line) {
	if (typeof file == 'undefined' || (file != null && file .hasOwnProperty ("__kwargtrans__"))) {;
		var file = null;
	};
	if (typeof line == 'undefined' || (line != null && line .hasOwnProperty ("__kwargtrans__"))) {;
		var line = null;
	};
	if (file !== null) {
		if (_warnings_showwarning !== null) {
			_warnings_showwarning (message, category, filename, lineno, file, line);
		}
	}
	else {
		var s = warnings.formatwarning (message, category, filename, lineno, line);
		var logger = getLogger ('py.warnings');
		if (!(logger.handlers)) {
			logger.addHandler (NullHandler ());
		}
		logger.warning (s);
	}
};
export var captureWarnings = function (capture) {
	if (capture) {
		if (_warnings_showwarning === null) {
			_warnings_showwarning = warnings.showwarning;
			warnings.setShowWarning (_showwarning);
		}
	}
	else if (_warnings_showwarning !== null) {
		warnings.setShowWarnings (_warnings_showwarning);
		_warnings_showwarning = null;
	}
};
export {};

//# sourceMappingURL=logging.map