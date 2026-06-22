__pragma__ ('stripcomments')

// Needed for __base__ and __standard__ if global 'opov' switch is on
export function __call__ (/* <callee>, <this>, <params>* */) {
    var args = [] .slice.apply (arguments);
    if (typeof args [0] == 'object' && '__call__' in args [0]) {        // Overloaded
        return args [0] .__call__ .apply (args [1], args.slice (2));
    }
    else {                                                              // Native
        return args [0] .apply (args [1], args.slice (2));
    }
};

// Complete __envir__, that was created in __base__, for non-stub mode
__envir__.executor_name = __envir__.transpiler_name;

// Make make __main__ available in browser
var __main__ = {__file__: ''};

// Define current exception, there's at most one exception in the air at any time
var __except__ = null;

 // Creator of a marked dictionary, used to pass **kwargs parameter
export function __kwargtrans__ (anObject) {
    anObject.__kwargtrans__ = null; // Removable marker
    anObject.constructor = Object;
    return anObject;
}

/* ... OBSOLETE, remove on or after y18m10d01
// 'Oneshot' dict promotor, used to enrich __all__ and help globals () return a true dict
export function __globals__ (anObject) {
    if (isinstance (anObject, dict)) {  // Don't attempt to promote (enrich) again, since it will make a copy
        return anObject;
    }
    else {
        return dict (anObject)
    }
}
*/

function build_mro(aClass) {
    let done = {}
    let result = [];
    function iterate_bases(bases) {
        for(var i = bases.length-1; i >= 0; i--) {
            let base = bases[i];
            let key = base.__name__+"-"+base.__module__;
            if (! (key in done)) {
                iterate_bases(base.__bases__)
                done[key] = true;
                result.unshift(base);
            }
        }
    }
    iterate_bases(aClass.__bases__);
    return result;
}

function make_mro(cls) {
  if (! cls.__mro__) {
      Object.defineProperty(cls, "__mro__", {value: build_mro(cls), configurable: false});
  }
  return cls.__mro__;
}

function create_next_super(cls) {
  var mro = make_mro(cls);
  var index = 0;
  return function(methodName) {
      while(index < mro.length) {
          let base = mro[index++];
          if (methodName in base.__class_attribs__)
              return base;
      }
      throw new Exception ('Superclass method not found');    // !!! Improve!
  }
}

// Partial implementation of super () .<methodName> (<params>)
export function __super__ (aClass, methodName, self) {
    let context = this;
    if (!context || !context.__next_super__) {
        let next_super = null;
        let cls = self.__class__ ? self.__class__ : self;
        if (cls !== aClass) {
            // we have to decide which mro to use
            let long_chain = create_next_super(cls);
            if (long_chain(methodName) === aClass)
                next_super = long_chain
            else
                next_super = create_next_super(aClass);
        }
        else
            next_super = create_next_super(aClass);

        if (context) {
          context = new Proxy(context, {
             get: function (target, prop) {
                if (prop === "__next_super__")
                    return next_super;
                return Reflect.get(...arguments);
              }});
          }
          else {
              context = {__next_super__: next_super};
          }
    }

    return context.__next_super__(methodName)[methodName].bind(context);
}

// Python property installer function, no member since that would bloat classes
export function property (getter, setter) {  // Returns a property descriptor rather than a property
    if (!setter) {  // ??? Make setter optional instead of dummy?
        setter = function () {};
    }
    return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
}

// Conditional JavaScript property installer function, prevents redefinition of properties if multiple Transcrypt apps are on one page
export function __setproperty__ (anObject, name, descriptor) {
    if (!anObject.hasOwnProperty (name)) {
        Object.defineProperty (anObject, name, descriptor);
    }
}

// Assert function, call to it only generated when compiling with --dassert option
export function assert (condition, message) {  // Message may be undefined
    if (!condition) {
        throw AssertionError (message, new Error ());
    }
}

// Merge function for keyword transfer objects
export function __mergekwargtrans__ (object0, object1) {
    var result = {};
    for (var attrib in object0) {
        result [attrib] = object0 [attrib];
    }
    for (var attrib in object1) {
        result [attrib] = object1 [attrib];
    }
    return result;
};

// Merge function for dataclass fields
export function __mergefields__ (targetClass, sourceClass) {
    let fieldNames = ['__reprfields__', '__comparefields__', '__initfields__']
    if (sourceClass [fieldNames [0]]) {
        if (targetClass [fieldNames [0]]) {
            for (let fieldName of fieldNames) {
                targetClass [fieldName] = new Set ([...targetClass [fieldName], ...sourceClass [fieldName]]);
            }
        }
        else {
            for (let fieldName of fieldNames) {
                targetClass [fieldName] = new Set (sourceClass [fieldName]);
            }
        }
    }
}

// Context manager support

export function __withblock__ (manager, statements) {
    if (hasattr (manager, '__enter__')) {
        try {
            manager.__enter__ ();
            statements ();
            manager.__exit__ ();
        }
        catch (exception) {
            // Same signature as CPython : type, value, traceback
            if (! (manager.__exit__ (exception.name, exception, exception.stack))) {
                throw exception;
            }
        }
    }
    else {  // Close an open file object, even if it doesn't support context management
        statements ();
        manager.close ();
    }
};

// Manipulating attributes by name

export function dir (obj) {
    var aList = [];
    for (var aKey in obj) {
        aList.push (aKey.startsWith ('py_') ? aKey.slice (3) : aKey);
    }
    aList.sort ();
    return aList;
};

export function setattr (obj, name, value) {
    obj [name] = value; // Will not work in combination with static retrieval of aliased attributes, too expensive
};

export function getattr (obj, name, default_) {
  if (default_ === undefined)
      return name in obj ? obj [name] : obj ['py_' + name];
  try {
      return name in obj ? obj [name] : default_;
  }
  catch (exception) {
  }
  return default_;
};

export function hasattr (obj, name) {
    try {
        return name in obj || 'py_' + name in obj;
    }
    catch (exception) {
        return false;
    }
};

export function delattr (obj, name) {
    if (name in obj) {
        delete obj [name];
    }
    else {
        delete obj ['py_' + name];
    }
};

// The __in__ function, used to mimic Python's 'in' operator
// In addition to CPython's semantics, the 'in' operator is also allowed to work on objects, avoiding a counterintuitive separation between Python dicts and JavaScript objects
// In general many Transcrypt compound types feature a deliberate blend of Python and JavaScript facilities, facilitating efficient integration with JavaScript libraries
// If only Python objects and Python dicts are dealt with in a certain context, the more pythonic 'hasattr' is preferred for the objects as opposed to 'in' for the dicts
export function __in__ (element, container) {
    if (container === undefined || container === null) {
        return false;
    }
    if (container.__contains__ instanceof Function) {
        return container.__contains__ (element);
    }
    else {                                      // Parameter 'element' itself is an array, string or a plain, non-dict JavaScript object
        return (
            container.indexOf ?                 // If it has an indexOf
            container.indexOf (element) > -1 :  // it's an array or a string,
            container.hasOwnProperty (element)  // else it's a plain, non-dict JavaScript object
        );
    }
};

// Find out if an attribute is special
export function __specialattrib__ (attrib) {
    return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
};

// Compute length of any object
export function len (anObject) {
    if (anObject === undefined || anObject === null) {
        return 0;
    }

    if (anObject.__len__ instanceof Function) {
        return anObject.__len__ ();
    }

    if (anObject.length !== undefined) {
        return anObject.length;
    }

    var length = 0;
    for (var attr in anObject) {
        if (!__specialattrib__ (attr)) {
            length++;
        }
    }

    return length;
};

// General conversions and checks

export function __i__ (any) {  //  Convert to iterable
    return py_typeof (any) == dict ? any.py_keys () : any;
}

export function __k__ (keyed, key) {  //  Check existence of dict key via retrieved element
    var result = keyed [key];
    if (typeof result == 'undefined') {
        if (keyed instanceof Array)
            if (key == +key && key >= 0 && keyed.length > key)
                return result;
            else
                throw IndexError (key, new Error());
        else
            throw KeyError (key, new Error());
    }
    return result;
}

// If the target object is somewhat true, return it. Otherwise return false.
// Try to follow Python conventions of truthyness
export function __t__ (target) {
    return (
        // Avoid invalid checks
        target === undefined || target === null ? false :

        // Take a quick shortcut if target is a simple type
        ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :

        // Use __bool__ (if present) to decide if target is true
        target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :

        // There is no __bool__, use __len__ (if present) instead
        target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :

        // There is no __bool__ and no __len__, declare Functions true.
        // Python objects are transpiled into instances of Function and if
        // there is no __bool__ or __len__, the object in Python is true.
        target instanceof Function ? target :

        // Target is something else, compute its len to decide
        len (target) !== 0 ? target :

        // When all else fails, declare target as false
        false
    );
}

export function float (any) {
    if (any == 'inf') {
        return Infinity;
    }
    else if (any == '-inf') {
        return -Infinity;
    }
    else if (any == 'nan') {
        return NaN;
    }
    else if (isNaN (parseFloat (any))) {    // Call to parseFloat needed to exclude '', ' ' etc.
        if (any === false) {
            return 0;
        }
        else if (any === true) {
            return 1;
        }
        else {  // Needed e.g. in autoTester.check, so "return any ? true : false" won't do
            throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
        }
    }
    else {
        return +any;
    }
};
float.__name__ = 'float';
float.__bases__ = [object];

export function int (any) {
    return float (any) | 0
};
int.__name__ = 'int';
int.__bases__ = [object];

__pragma__ ('ifdef', '__sform__')
Number.prototype.__format__ = function (fmt_spec) {
    if (fmt_spec == undefined || fmt_spec.strip ().length == 0) {
        return this.toString ();
    }
    var thousand_sep = false;
    var g_default = false;
    var width = 0;
    var zero = false;
    var alternate = false;
    var sign = '-';
    var align = '>';
    var fill = ' ';
    var precision = undefined;
    var ftype = undefined;
    var val = this.valueOf ();
    var is_negative = val < 0;
    val = Math.abs (val);

    function pad (s, width, fill, align) {
        if (fill == undefined) {
            fill = ' ';
        }
        if (align == undefined) {
            align = '>';
        }
        var alt = '';
        var sign = '';
        if (s.startswith (['+', '-'])) {
            sign = s [0];
            s = s.substr (1);
        }
        if (alternate && s.startswith (['0b', '0o', '0x'])) {
            alt = s.slice (0, 2);
            s = s.substr (2);
        }
        var len = s.length + sign.length + alt.length;
        var c = width - len;
        switch (align) {
            case '=':
                return sign + alt + __mul__ (fill, c) + s;
            case '>':
                return __mul__ (fill, c) + sign + alt + s;
            case '<':
                return sign + alt + s + __mul__ (fill, c);
            case '^':
                var m = ((c % 2) + 2) % 2;
                var c = Math.floor (c / 2);
                return __mul__ (fill, c) + sign + alt + s + __mul__ (fill, c + m);
            default:
                throw ValueError ("Invalid align type: '" + align + "'", new Error ());
        }
    };

    function format_float (val) {
        if (val.indexOf ('e+') == -1 && (ftype == 'g' || ftype == 'G')) {
            var parts = val.py_split ('.');
            var d = parts [0];
            var t = parts [1];
            while (t [t.length - 1] == '0') {
                t = t.slice (0, -1);
            }
            val = t != '' ? '.'.join ([d, t]) : d;
        }
        if (alternate && val.indexOf ('.') == -1) {
            val = val + '.';
        }
        return val;
    };

    if (fmt_spec.endswith (['b', 'c', 'd', 'e', 'E', 'f', 'F', 'g', 'G', 'n', 'o', 'x', 'X', '%'])) {
        ftype = fmt_spec [fmt_spec.length - 1];
        fmt_spec = fmt_spec.slice (0, -1);
        if (ftype == 'n') {
            ftype = Number.isInteger (val) ? 'd' : 'f';
        }
    }
    else {
        ftype = Number.isInteger (val) ? 'd' : 'g';
        g_default = true;
    }

    var parts = fmt_spec.split ('.');
    fmt_spec = parts [0];
    precision = parts [1];
    if (precision != undefined) {
        precision = parseInt (precision);
    }
    if (fmt_spec.length > 0 && fmt_spec [fmt_spec.length - 1] == ',') {
        thousand_sep = true;
        fmt_spec = fmt_spec.slice (0, -1);
    }
    if (fmt_spec.length > 0) {
        var _width = '';
        while (fmt_spec && fmt_spec [fmt_spec.length - 1].isnumeric ()) {
            _width = fmt_spec [fmt_spec.length - 1] + _width;
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (_width.length > 0) {
            if (_width [0] == '0') {
                width = parseInt (_width.substr (1));
                zero = true;
            }
            else {
                width = parseInt (_width);
            }
        }
        if (fmt_spec.length > 0 && fmt_spec [fmt_spec.length - 1] == '#') {
            alternate = true;
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (fmt_spec.length > 0 && fmt_spec.endswith (['+', '-', ' '])) {
            sign = fmt_spec [fmt_spec.length - 1];
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (fmt_spec.length > 0 && fmt_spec.endswith (['<', '>', '=', '^'])) {
            align = fmt_spec [fmt_spec.length - 1];
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (fmt_spec.length > 0) {
            fill = fmt_spec [0];
        }
    }

    if (isNaN (val)) {
        val = 'nan';
    }
    else if (val == Infinity) {
        val = 'inf';
    }
    else {
        switch (ftype) {
            case 'b':
                val = Math.floor (val).toString (2);
                if (alternate) {
                    val = '0b' + val;
                }
                break;
            case 'c':
                val = String.fromCharCode (Math.floor (val));
                break;
            case 'd':
                val = Math.floor (val).toString ();
                if (thousand_sep) {
                    val = val.replace (/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                break;
            case 'o':
                val = Math.floor (val).toString (8);
                if (alternate) {
                    val = '0o' + val;
                }
                break;
            case 'x':
            case 'X':
                val = Math.floor (val).toString (16);
                if (alternate) {
                    val = '0x' + val;
                }
                break;
            case 'e':
            case 'E':
                if (precision == undefined) {
                    precision = 6;
                }
                var num_exp = val.toExponential (precision).split ('e+');
                var num = num_exp [0];
                var exp = num_exp [1];
                val = num.toString () + 'e+' + pad (exp.toString(), 2, '0');
                val = format_float (val);
                break;
            case 'f':
            case 'F':
            case '%':
                if (precision == undefined) {
                    precision = 6;
                }
                if (ftype == '%') {
                    val *= 100;
                }
                val = val.toFixed (precision);
                val = format_float (val);
                if (ftype == '%') {
                    val += '%';
                }
                break;
            case 'g':
            case 'G':
                if (precision == undefined) {
                    precision = g_default ? 1 : 6;
                }
                if (precision == 0) {
                    precision = 1;
                }
                var convert_to_exponent = false;
                if (g_default) {
                    var parts = val.toString ().split ('.');
                    var digit_count = parts [0].length + parts [1].length;
                    if (digit_count >= precision) {
                        convert_to_exponent = true;
                    }
                }
                var num_exp = val.toExponential (precision - 1).split ('e+');
                var num = num_exp [0];
                var exp = num_exp [1];
                convert_to_exponent |= !((-4 <= exp && exp < precision));
                if (convert_to_exponent) {
                    val = num.toString() + 'e+' + pad (exp.toString(), 2, '0');
                }
                else {
                    val = val.toFixed (precision - 1 - exp);
                }
                val = format_float (val);
                break;
            default:
                throw ValueError ("Invalid format type: '" + ftype + "'", new Error ());
        }
    }
    if (ftype === ftype.toUpperCase ()) {
        val = val.toUpperCase ()
    }
    if (ftype != 'c') {
        if (sign == '-') {
            if (is_negative) {
                val = '-' + val;
            }
        }
        else {
            val = is_negative ? '-' + val : sign + val;
        }
    }
    if (zero) {
        fill = '0';
        align = '=';
    }
    if (width > 0) {
        val = pad (val, width, fill, align);
    }
    return val;
};
__pragma__ ('endif')

export function bool (any) {     // Always truly returns a bool, rather than something truthy or falsy
    return !!__t__ (any);
};
bool.__name__ = 'bool';         // So it can be used as a type with a name
bool.__bases__ = [int];


export var FunctionType = {__name__: "function", __module__: "builtins", __bases__: [object]};

export function py_typeof (anObject) {
    var aType = typeof anObject;
    if (aType == 'object') {    // Directly trying '__class__ in anObject' turns out to wreck anObject in Chrome if its a primitive
        try {
            return '__class__' in anObject ? anObject.__class__ : object;
        }
        catch (exception) {
            return aType;
        }
    }
    else if (aType == 'function') {
      return FunctionType;
    }
    else {
        return (    // Oddly, the braces are required here
            aType == 'boolean' ? bool :
            aType == 'string' ? str :
            aType == 'number' ? (anObject % 1 == 0 ? int : float) :
            null
        );
    }
};

var pid_counter = 0

export function py_id (anObject) {
  var pid = anObject.py_identifier
  if (pid) {
      return pid;
  }

  var aType = typeof anObject;
  if (aType == 'object') {
      pid = anObject.py_identifier = "__po" + pid_counter;
      pid_counter++;
  }
  else {
    pid = anObject.toString();
  }
  return pid;
}

export function issubclass (aClass, classinfo) {
    if (classinfo instanceof Array) {   // Assume in most cases it isn't, then making it recursive rather than two functions saves a call
        for (let aClass2 of classinfo) {
            if (issubclass (aClass, aClass2)) {
                return true;
            }
        }
        return false;
    }
    try {
        var aClass2 = aClass;
        if (aClass2 == classinfo) {
            return true;
        }
        else {
            var bases = [].slice.call (aClass2.__bases__);
            while (bases.length) {
                aClass2 = bases.shift ();
                if (aClass2 == classinfo) {
                    return true;
                }
                if (aClass2.__bases__.length) {
                    bases = [].slice.call (aClass2.__bases__).concat (bases);
                }
            }
            return false;
        }
    }
    catch (exception) {     // Using issubclass on primitives assumed rare
        return aClass == classinfo || classinfo == object;
    }
};

export function isinstance (anObject, classinfo) {
    try {
        return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
    }
    catch (exception) {
        return issubclass (py_typeof (anObject), classinfo);
    }
};

export function callable (anObject) {
    return anObject && typeof anObject == 'object' && '__call__' in anObject ? true : typeof anObject === 'function';
};

// Repr function uses __repr__ method, then __str__, then toString
export function repr (anObject) {
    try {
        return anObject.__repr__ ();
    }
    catch (exception) {
        try {
            return anObject.__str__ ();
        }
        catch (exception) { // anObject has no __repr__ and no __str__
            try {
                if (anObject == null) {
                    return 'None';
                }
                else if (anObject.constructor == Object) {
                    var result = '{';
                    var comma = false;
                    for (var attrib in anObject) {
                        if (!__specialattrib__ (attrib)) {
                            if (attrib.isnumeric ()) {
                                var attribRepr = attrib;                // If key can be interpreted as numerical, we make it numerical
                            }                                           // So we accept that '1' is misrepresented as 1
                            else {
                                var attribRepr = '\'' + attrib + '\'';  // Alpha key in dict
                            }

                            if (comma) {
                                result += ', ';
                            }
                            else {
                                comma = true;
                            }
                            result += attribRepr + ': ' + repr (anObject [attrib]);
                        }
                    }
                    result += '}';
                    return result;
                }
                else {
                    return typeof anObject == 'boolean' ? anObject.toString () .capitalize () : anObject.toString ();
                }
            }
            catch (exception) {
                return '<object of type: ' + typeof anObject + '>';
            }
        }
    }
};

// Char from Unicode or ASCII
export function chr (charCode) {
    return String.fromCharCode (charCode);
};

// Unicode or ASCII from char
export function ord (aChar) {
    return aChar.charCodeAt (0);
};

function min_max (f_compare, ...args) {
    // Assume no kwargs
    let dflt = undefined;
    function key(x) {return x}

    if (args.length > 0) {
        if (args[args.length-1] && args[args.length-1].hasOwnProperty ("__kwargtrans__")) {
            const kwargs = args[args.length - 1];
            args = args.slice(0, -1);
            if (kwargs.hasOwnProperty('py_default')) dflt = kwargs['py_default'];
            if (kwargs.hasOwnProperty('key')) key = kwargs['key'];
            if (Object.prototype.toString.call(key) !== '[object Function]') throw TypeError("object is not callable", new Error());
        }
    }

    if (args.length === 0) throw TypeError("expected at least 1 argument, got 0", new Error ());
    if (args.length > 1 && dflt !== undefined) throw TypeError("Cannot specify a default with multiple positional arguments", new Error ());
    if (args.length === 1){
        if (Object.prototype.toString.call(args[0]) !== '[object Array]') throw TypeError("object is not iterable", new Error());
        args = args[0];  // Passed in arg is itself an iterable
    }
    if (args.length === 0){
        if (dflt === undefined) throw ValueError ("arg is an empty sequence", new Error ());
        return dflt
    }

    return args.reduce((max_val, cur_val) => f_compare(key(cur_val), key(max_val)) ? cur_val : max_val);
}

// Maximum of n values
export function max (...args) {
    return min_max(function (a, b){return a > b}, ...args)
}

// Minimum of n numbers
export function min (...args) {
    return min_max(function (a, b){return a < b}, ...args)
}

// Integer to binary
export function bin (nbr) {
    const sign = nbr<0 ? '-' : '';
    const bin_val = Math.abs(parseInt(nbr)).toString(2);
    return sign.concat('0b', bin_val);
};

// Integer to octal
export function oct (nbr) {
    const sign = nbr<0 ? '-' : '';
    const oct_val = Math.abs(parseInt(nbr)).toString(8);
    return sign.concat('0o', oct_val);
};

// Integer to hexadecimal
export function hex (nbr) {
    const sign = nbr<0 ? '-' : '';
    const hex_val = Math.abs(parseInt(nbr)).toString(16);
    return sign.concat('0x', hex_val);
};

// Absolute value
__pragma__ ('ifdef', '__complex__')
export function abs (x) {
    try {
        return Math.abs (x);
    }
    catch (exception) {
        return Math.sqrt (x.real * x.real + x.imag * x.imag);
    }
};
__pragma__ ('else')
export var abs = Math.abs;
__pragma__ ('endif')

// Bankers rounding
export function round (number, ndigits) {
    if (ndigits) {
        var scale = Math.pow (10, ndigits);
        number *= scale;
    }

    var rounded = Math.round (number);
    if (rounded - number == 0.5 && rounded % 2) {   // Has rounded up to odd, should have rounded down to even
        rounded -= 1;
    }

    if (ndigits) {
        rounded /= scale;
    }

    return rounded;
};

__pragma__ ('ifdef', '__sform__')
export function format (value, fmt_spec) {
    if (value == undefined) {
        return 'None';
    }
    fmt_spec = fmt_spec || '';
    var tval = typeof value;
    switch (tval) {
        case 'number':
        case 'string':
            return value.__format__(fmt_spec);
        case 'boolean':
            return fmt_spec ? (value ? 1 : 0).__format__(fmt_spec) : str (value);
        case 'object':
            if ('__format__' in value) {
                return value.__format__ (fmt_spec);
            }
            else {
                return str (value).__format__ (fmt_spec);
            }
        default:
            return str (value).__format__ (fmt_spec);
    }
}
__pragma__ ('endif')

// BEGIN unified iterator model

export function __jsUsePyNext__ () {       // Add as 'next' method to make Python iterator JavaScript compatible
    try {
        var result = this.__next__ ();
        return {value: result, done: false};
    }
    catch (exception) {
        return {value: undefined, done: true};
    }
}

export function __pyUseJsNext__ () {       // Add as '__next__' method to make JavaScript iterator Python compatible
    var result = this.next ();
    if (result.done) {
        throw StopIteration (new Error ());
    }
    else {
        return result.value;
    }
}

export function py_iter (iterable) {                   // Alias for Python's iter function, produces a universal iterator / iterable, usable in Python and JavaScript
    if (typeof iterable == 'string' || '__iter__' in iterable) {    // JavaScript Array or string or Python iterable (string has no 'in')
        var result = iterable.__iter__ ();                          // Iterator has a __next__
        result.next = __jsUsePyNext__;                              // Give it a next
    }
    else if ('selector' in iterable) {                              // Assume it's a JQuery iterator
        var result = list (iterable) .__iter__ ();                  // Has a __next__
        result.next = __jsUsePyNext__;                              // Give it a next
    }
    else if ('next' in iterable) {                                  // It's a JavaScript iterator already,  maybe a generator, has a next and may have a __next__
        var result = iterable
        if (! ('__next__' in result)) {                             // If there's no danger of recursion
            result.__next__ = __pyUseJsNext__;                      // Give it a __next__
        }
    }
    else if (Symbol.iterator in iterable) {                         // It's a JavaScript iterable such as a typed array, but not an iterator
        var result = iterable [Symbol.iterator] ();                 // Has a next
        result.__next__ = __pyUseJsNext__;                          // Give it a __next__
    }
    else {
        throw IterableError (new Error ()); // No iterator at all
    }
    result [Symbol.iterator] = function () {return result;};
    return result;
}

export function py_next (iterator, value) {               // Called only in a Python context, could receive Python or JavaScript iterator
    try {                                   // Primarily assume Python iterator, for max speed
        var result = iterator.__next__ ();
    }
    catch (exception) {                     // JavaScript iterators are the exception here
        var result = iterator.next ();
        if (result.done) {
            if(!(value === undefined)) return value
            throw StopIteration (new Error ());
        }
        else {
            return result.value;
        }
    }
    if (result === undefined) {
        if(!(value === undefined)) return value
        throw StopIteration (new Error ());
    }
    else {
        return result;
    }
}

export function __PyIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
    this.__len__ = function () {return iterable.length};
}

__PyIterator__.prototype.__next__ = function() {
    if (this.index < this.iterable.length) {
        return this.iterable [this.index++];
    }
    else {
        throw StopIteration (new Error ());
    }
};

export function __JsIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}

__JsIterator__.prototype.next = function () {
    if (this.index < this.iterable.py_keys.length) {
        return {value: this.index++, done: false};
    }
    else {
        return {value: undefined, done: true};
    }
};

// END unified iterator model

// Reversed function for arrays
export function py_reversed (iterable) {
    iterable = iterable.slice ();
    iterable.reverse ();
    return iterable;
};

// Zip method for arrays and strings
export function zip () {
    var args = [] .slice.call (arguments);
    for (var i = 0; i < args.length; i++) {
        if (typeof args [i] == 'string') {
            args [i] = args [i] .split ('');
        }
        else if (!Array.isArray (args [i])) {
            args [i] = Array.from (args [i]);
        }
    }
    var shortest = args.length == 0 ? [] : args.reduce (    // Find shortest array in arguments
        function (array0, array1) {
            return array0.length < array1.length ? array0 : array1;
        }
    );
    return shortest.map (                   // Map each element of shortest array
        function (current, index) {         // To the result of this function
            return args.map (               // Map each array in arguments
                function (current) {        // To the result of this function
                    return current [index]; // Namely it's index't entry
                }
            );
        }
    );
};

// Range method, returning an array
export function range (start, stop, step) {
    if (stop == undefined) {
        // one param defined
        stop = start;
        start = 0;
    }
    if (step == undefined) {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};

// Any, all and sum

export function any (iterable) {
    for (let item of iterable) {
        if (bool (item)) {
            return true;
        }
    }
    return false;
}
export function all (iterable) {
    for (let item of iterable) {
        if (! bool (item)) {
            return false;
        }
    }
    return true;
}
export function sum (iterable) {
    let result = 0;
    for (let item of iterable) {
        result += item;
    }
    return result;
}

function* __enumerate__ (iterable, start=0) {
    if (start.hasOwnProperty("__kwargtrans__")) {
        // start was likely passed in as kwarg
        start = start['start'];
    }
    let n = start
    for (const item of iterable) {
        yield [n, item]
        n += 1
    }
}
export var py_enumerate = __enumerate__;  // Exporting a generator function in JS may be problematic but it allows enumerate to be lazy

// List extensions to Array

export function list (iterable) {                                      // All such creators should be callable without new
    let instance = iterable ? Array.from (iterable) : [];
    // Sort is the normal JavaScript sort, Python sort is a non-member function
    return instance;
}
Array.prototype.__class__ = list;   // All arrays are lists (not only if constructed by the list ctor), unless constructed otherwise
list.__name__ = 'list';
list.__bases__ = [object];

Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};

Array.prototype.__getslice__ = function (start, stop, step) {
    if (step === null) {
        step = 1;
    }
    if (start === null) {
        start = (step < 0 ? -1 : 0);
    }
    if (start < 0) {
        start = Math.max(this.length + start, 0);
    } else if (start > this.length || (start === this.length && step < 0)) {
        start = this.length > 0 ? this.length - 1 : 0;
    }

    if (stop === null) {
        stop = (step < 0 && this.length > 0 ? -1 : this.length);
    } else if (stop < 0) {
        stop = Math.max(this.length + stop, (step < 0 && this.length > 0 ? -1 : 0));
    } else if (stop > this.length) {
        stop = this.length;
    }

    if (step === 1) {
        return Array.prototype.slice.call(this, start, stop);
    }

    let result = list ([]);
    if (step > 0) {
        for (let index = start; index < stop; index += step) {
            result.push (this [index]);
        }
    } else if (step < 0) {
        for (let index = start; index > stop; index += step) {
            result.push (this [index]);
        }
    } else {
        throw ValueError ("slice step cannot be zero", new Error ());
    }

    return result;
};

Array.prototype.__setslice__ = function (start, stop, step, source) {
    if (step === null) {
        step = 1;
    }
    if (start === null) {
        start = (step < 0 ? -1 : 0);
    }
    if (start < 0) {
        start = Math.max(this.length + start, 0);
    } else if (start > this.length || (start === this.length && step < 0)) {
        start = this.length > 0 ? this.length - 1 : 0;
    }

    if (stop === null) {
        stop = (step < 0 && this.length > 0 ? -1 : this.length);
    } else if (stop < 0) {
        stop = Math.max(this.length + stop, (step < 0 && this.length > 0 ? -1 : 0));
    } else if (stop > this.length) {
        stop = this.length;
    }

    if (step === 1) { // Assign to 'ordinary' slice, replace subsequence
        Array.prototype.splice.apply (this, [start, stop - start] .concat (Array.from(source)));
    }
    else {
        // Validate assignment is valid based on Python's size rules
        const seq_len = Math.ceil((stop - start) / step)
        if((source.length > 0 || seq_len > 0) && (seq_len !== source.length)){
            // throw ValueError ("Invalid slice assignment", new Error ());
            throw ValueError ("attempt to assign sequence of size " + source.length + " to extended slice of size " + seq_len, new Error ());
        }
        // Assign to extended slice, replace designated items one by one
        let sourceIndex = 0;
        if (step > 0) {
            for (let targetIndex = start; targetIndex < stop; targetIndex += step) {
                this [targetIndex] = source [sourceIndex++];
            }
        } else if (step < 0) {
            for (let targetIndex = start; targetIndex > stop; targetIndex += step) {
                this [targetIndex] = source [sourceIndex++];
            }
        } else {
            throw ValueError ("slice step cannot be zero", new Error ());
        }

    }
};

Array.prototype.__repr__ = function () {
    if (this.__class__ == set && !this.length) {
        return 'set()';
    }

    let result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';

    for (let index = 0; index < this.length; index++) {
        if (index) {
            result += ', ';
        }
        result += repr (this [index]);
    }

    if (this.__class__ == tuple && this.length == 1) {
        result += ',';
    }

    result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';;
    return result;
};

Array.prototype.__str__ = Array.prototype.__repr__;

Array.prototype.append = function (element) {
    this.push (element);
};

Array.prototype.py_clear = function () {
    this.length = 0;
};

Array.prototype.py_copy = function () {
    return this.slice();
};

Array.prototype.extend = function (aList) {
    this.push.apply (this, aList);
};

Array.prototype.insert = function (index, element) {
    this.splice (index, 0, element);
};

Array.prototype.remove = function (element) {
    let index = this.indexOf (element);
    if (index === -1) {
        throw ValueError("list.remove(x): x not in list", new Error ());
    }
    this.splice (index, 1);
};

Array.prototype.index = function (element) {
    return this.indexOf (element);
};

Array.prototype.py_pop = function (index) {
    if(this.length === 0){
        throw IndexError("pop from empty list", new Error())
    }
    if (index === undefined) {
        return this.pop ();  // Remove last element
    }
    else {
        const idx = index < 0 ? this.length + index : index
        if(this[idx] === undefined){
            throw IndexError("pop index out of range", new Error())
        }
        return this.splice (idx, 1) [0];
    }
};

Array.prototype.py_sort = function () {
    __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));    // Can't work directly with arguments
    // Python params: (iterable, key = None, reverse = False)
    // py_sort is called with the Transcrypt kwargs mechanism, and just passes the params on to __sort__
    // __sort__ is def'ed with the Transcrypt kwargs mechanism
};

Array.prototype.__add__ = function (aList) {
    return list (this.concat (aList));
};

Array.prototype.__mul__ = function (scalar) {
    let result = this;
    for (let i = 1; i < scalar; i++) {
        result = result.concat (this);
    }
    return result;
};

Array.prototype.__rmul__ = Array.prototype.__mul__;

// Tuple extensions to Array

export function tuple (iterable) {
    let instance = iterable ? [] .slice.apply (iterable) : [];
    instance.__class__ = tuple; // Not all arrays are tuples
    return instance;
}
tuple.__name__ = 'tuple';
tuple.__bases__ = [object];

// Set extensions to Array
// N.B. Since sets are unordered, set operations will occasionally alter the 'this' array by sorting it

export function set (iterable) {
    let instance = [];
    if (iterable) {
        for (let index = 0; index < iterable.length; index++) {
            instance.add (iterable [index]);
        }
    }
    instance.__class__ = set;   // Not all arrays are sets
    return instance;
}
set.__name__ = 'set';
set.__bases__ = [object];


export function frozenset (iterable) {
    let instance = [];
    if (iterable) {
        for (let index = 0; index < iterable.length; index++) {
            instance.add (iterable [index]);
        }
    }
    instance.__class__ = frozenset;   // Not all arrays are sets
    return instance;
}
frozenset.__name__ = 'frozenset';
frozenset.__bases__ = [object];


Array.prototype.__bindexOf__ = function (element) { // Used to turn O (n^2) into O (n log n)
// Since sorting is lex, compare has to be lex. This also allows for mixed lists

    element += '';

    let mindex = 0;
    let maxdex = this.length - 1;

    while (mindex <= maxdex) {
        let index = (mindex + maxdex) / 2 | 0;
        let middle = this [index] + '';

        if (middle < element) {
            mindex = index + 1;
        }
        else if (middle > element) {
            maxdex = index - 1;
        }
        else {
            return index;
        }
    }

    return -1;
};

Array.prototype.add = function (element) {
    if (this.indexOf (element) == -1) { // Avoid duplicates in set
        this.push (element);
    }
};

Array.prototype.discard = function (element) {
    var index = this.indexOf (element);
    if (index != -1) {
        this.splice (index, 1);
    }
};

Array.prototype.isdisjoint = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            return false;
        }
    }
    return true;
};

Array.prototype.issuperset = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) == -1) {
            return false;
        }
    }
    return true;
};

Array.prototype.issubset = function (other) {
    return set (other.slice ()) .issuperset (this); // Sort copy of 'other', not 'other' itself, since it may be an ordered sequence
};

Array.prototype.union = function (other) {
    let result = set (this.slice () .sort ());
    for (let i = 0; i < other.length; i++) {
        if (result.__bindexOf__ (other [i]) == -1) {
            result.push (other [i]);
        }
    }
    return result;
};

Array.prototype.intersection = function (other) {
    this.sort ();
    let result = set ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            result.push (other [i]);
        }
    }
    return result;
};

Array.prototype.difference = function (other) {
    let sother = set (other.slice () .sort ());
    let result = set ();
    for (let i = 0; i < this.length; i++) {
        if (sother.__bindexOf__ (this [i]) == -1) {
            result.push (this [i]);
        }
    }
    return result;
};

Array.prototype.symmetric_difference = function (other) {
    return this.union (other) .difference (this.intersection (other));
};

Array.prototype.py_update = function () {   // O (n)
    let updated = [] .concat.apply (this.slice (), arguments) .sort ();
    this.py_clear ();
    for (let i = 0; i < updated.length; i++) {
        if (updated [i] != updated [i - 1]) {
            this.push (updated [i]);
        }
    }
};

Array.prototype.__eq__ = function (other) { // Also used for list
    if (this.length != other.length) {
        return false;
    }
    if (this.__class__ == set) {
        this.sort ();
        other.sort ();
    }
    for (let i = 0; i < this.length; i++) {
        if (this [i] != other [i]) {
            return false;
        }
    }
    return true;
};

Array.prototype.__ne__ = function (other) { // Also used for list
    return !this.__eq__ (other);
};

Array.prototype.__le__ = function (other) {
    if (this.__class__ == set) {
        return this.issubset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] > other [i]) {
                return false;
            }
            else if (this [i] < other [i]) {
                return true;
            }
        }
        return true;
    }
};

Array.prototype.__ge__ = function (other) {
    if (this.__class__ == set) {
        return this.issuperset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] < other [i]) {
                return false;
            }
            else if (this [i] > other [i]) {
                return true;
            }
        }
        return true;
    }
};

Array.prototype.__lt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issubset (other) && !this.issuperset (other) :
        !this.__ge__ (other)
    );
};

Array.prototype.__gt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issuperset (other) && !this.issubset (other) :
        !this.__le__ (other)
    );
};

// Byte array extensions

export function bytearray (bytable, encoding) {
    if (bytable == undefined) {
        return new Uint8Array (0);
    }
    else {
        let aType = py_typeof (bytable);
        if (aType == int) {
            return new Uint8Array (bytable);
        }
        else if (aType == str) {
            let aBytes = new Uint8Array (len (bytable));
            for (let i = 0; i < len (bytable); i++) {
                aBytes [i] = bytable.charCodeAt (i);
            }
            return aBytes;
        }
        else if (aType == list || aType == tuple) {
            return new Uint8Array (bytable);
        }
        else {
            throw py_TypeError;
        }
    }
}

export var bytes = bytearray;


Uint8Array.prototype.__add__ = function (aBytes) {
    let result = new Uint8Array (this.length + aBytes.length);
    result.set (this);
    result.set (aBytes, this.length);
    return result;
};

Uint8Array.prototype.__mul__ = function (scalar) {
    let result = new Uint8Array (scalar * this.length);
    for (let i = 0; i < scalar; i++) {
        result.set (this, i * this.length);
    }
    return result;
};

Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;

// String extensions

export function str (stringable) {
    if (typeof stringable === 'number')
        return stringable.toString();
    else {
        try {
            return stringable.__str__ ();
        }
        catch (exception) {
            try {
                return repr (stringable);
            }
            catch (exception) {
                return String (stringable); // No new, so no permanent String object but a primitive in a temporary 'just in time' wrapper
            }
        }
    }
};

String.prototype.__class__ = str;   // All strings are str
str.__name__ = 'str';
str.__bases__ = [object];

String.prototype.__iter__ = function () {new __PyIterator__ (this);};

String.prototype.__repr__ = function () {
    return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .py_replace ('\t', '\\t') .py_replace ('\n', '\\n');
};

String.prototype.__str__ = function () {
    return this;
};

String.prototype.capitalize = function () {
    return this.charAt (0).toUpperCase () + this.slice (1);
};

String.prototype.endswith = function (suffix, start=0, end) {
    if (end === undefined) {end = this.length}
    const str = this.slice(start, end)

    if (suffix instanceof Array) {
        for (var i=0;i<suffix.length;i++) {
            if (str.slice (-suffix[i].length) === suffix[i])
                return true;
        }
    } else
        return suffix === '' || str.slice (-suffix.length) === suffix;
    return false;
};

String.prototype.find = function (sub, start) {
    return this.indexOf (sub, start);
};

String.prototype.__getslice__ = function (start, stop, step) {
    if (step === null) {
        step = 1;
    }
    if (start === null) {
        start = (step < 0 ? -1 : 0);
    }
    if (start < 0) {
        start = Math.max(this.length + start, 0);
    } else if (start > this.length) {
        start = this.length > 0 ? this.length + (step < 0 ? -1 : 0) : 0;
    }

    if (stop === null) {
        stop = (step < 0 && this.length > 0 ? -1 : this.length);
    } else if (stop < 0) {
        stop = Math.max(this.length + stop, (step < 0 && this.length > 0 ? -1 : 0));
    } else if (stop > this.length) {
        stop = this.length;
    }

    if (step === 1) {
        return this.substring (start, (start > stop ? start : stop));
    }

    let result = '';
    if (step > 0) {
        for (var index = start; index < stop; index += step) {
            result = result.concat (this.charAt(index));
        }
    } else if (step < 0) {
        for (var index = start; index > stop; index += step) {
            result = result.concat (this.charAt(index));
        }
    }
    else {
        throw ValueError ("slice step cannot be zero", new Error ());
    }

    return result;
};

__pragma__ ('ifdef', '__sform__')
String.prototype.__format__ = function (fmt_spec) {
    if (fmt_spec == undefined || fmt_spec.strip ().length == 0) {
        return this.valueOf ();
    }
    var width = 0;
    var align = '<';
    var fill = ' ';
    var val = this.valueOf ();

    function pad (s, width, fill, align) {
        var len = s.length;
        var c = width - len;
        switch (align) {
            case '>':
                return __mul__ (fill, c) + s;
            case '<':
                return s + __mul__ (fill, c);
            case '^':
                var m = ((c % 2) + 2) % 2;
                var c = Math.floor (c / 2);
                return __mul__ (fill, c) + s + __mul__ (fill, c + m);
            default:
                return s;
        }
    };

    if (fmt_spec [fmt_spec.length - 1] == 's') {
        fmt_spec = fmt_spec.slice (0, -1);
    }
    if (fmt_spec.length > 0) {
        var _width = '';
        while (fmt_spec && fmt_spec [fmt_spec.length - 1].isnumeric ()) {
            _width = fmt_spec [fmt_spec.length - 1] + _width;
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (_width.length > 0) {
            width = parseInt (_width);
        }
        if (fmt_spec.length > 0 && fmt_spec.endswith (['<', '>', '^'])) {
            align = fmt_spec [fmt_spec.length - 1];
            fmt_spec = fmt_spec.slice (0, -1);
        }
        if (fmt_spec.length > 0) {
            fill = fmt_spec [0];
        }
    }
    if (width > 0) {
        val = pad (val, width, fill, align);
    }
    return val;
};
__pragma__ ('endif')

// Since it's worthwhile for the 'format' function to be able to deal with *args, it is defined as a property
// __get__ will produce a bound function if there's something before the dot
// Since a call using *args is compiled to e.g. <object>.<function>.apply (null, args), the function has to be bound already
// Otherwise it will never be, because of the null argument
// Using 'this' rather than 'null' contradicts the requirement to be able to pass bound functions around
// The object 'before the dot' won't be available at call time in that case, unless implicitly via the function bound to it
// While for Python methods this mechanism is generated by the compiler, for JavaScript methods it has to be provided manually
// Call memoizing is unattractive here, since every string would then have to hold a reference to a bound format method
__setproperty__ (String.prototype, 'format', {
    get: function () {return __get__ (this, function (self) {
        var args = tuple ([] .slice.apply (arguments).slice (1));
        var autoIndex = 0;
__pragma__ ('ifdef', '__sform__')
        return self.replace (/\{([^\{]*)\}/g, function (match, key) {
            var parts = key.split (':');
            key = parts [0];
            var fmt_spec = parts [1];
            parts = key.split ('!')
            key = parts [0];
            var conversion = parts [1];
            var value = undefined;
            if (key == '') {
                key = autoIndex++;
            }
            if (key == +key && args [key] !== undefined) {  // So key is numerical
                value = args [key];
            }
            else {              // Key is a string
                var attr = undefined;
                var idx = ("" + key) .indexOf ('.');    // ??? Why is conversion to string suddenly needed?
                if (idx != -1) {
                    attr = key.substring (idx + 1);
                    key = key.substring (0, idx);
                }
                else {
                    idx = ("" + key) .indexOf ('[');    // ??? Why is conversion to string suddenly needed?
                    if (idx != -1) {
                        attr = key.substring (idx + 1).slice (0, -1);
                        key = key.substring (0, idx);
                    }
                }

                if ((key == +key) && attr && args [key] !== undefined) {
                    value = args [key][attr];
                }
                else {
                    for (var index = 0; index < args.length; index++) {
                        // Find first 'dict' that has that key and the right field
                        if (typeof args [index] == 'object' && args [index] != null && args [index][key] !== undefined) {   // Why is check for null suddenly needed?
                            // Return that field field
                            if (attr) {
                                value = args [index][key][attr];
                            }
                            else {
                                value = args [index][key];
                            }
                            break;
                        }
                    }
                }
            }
            if (value === undefined) {
                return match;
            }
            if (conversion == 'r') {
                value = repr (value);
            }
            else if (conversion == 's') {
                value = str (value);
            }
            else if (conversion == 'a') {
                throw ValueError ("Conversion to ascii not yet supported: '" + match + "'", new Error ());
            }
            return format (value, fmt_spec);
        });
__pragma__ ('else')
        return self.replace (/\{(\w*)\}/g, function (match, key) {
            if (key == '') {
                key = autoIndex++;
            }
            if (key == +key) {  // So key is numerical
                return args [key] === undefined ? match : str (args [key]);
            }
            else {              // Key is a string
                for (var index = 0; index < args.length; index++) {
                    // Find first 'dict' that has that key and the right field
                    if (typeof args [index] == 'object' && args [index][key] !== undefined) {
                        return str (args [index][key]); // Return that field field
                    }
                }
                return match;
            }
        });
__pragma__ ('endif')
    });},
    enumerable: true
});

String.prototype.isalnum = function () {
    return /^[0-9a-zA-Z]{1,}$/.test(this)
}

String.prototype.isalpha = function () {
    return /^[a-zA-Z]{1,}$/.test(this)
}

String.prototype.isdecimal = function () {
    return /^[0-9]{1,}$/.test(this)
}

String.prototype.isdigit = function () {
    return this.isdecimal()
}

String.prototype.islower = function () {
    return /^[a-z]{1,}$/.test(this)
}

String.prototype.isupper = function () {
    return /^[A-Z]{1,}$/.test(this)
}

String.prototype.isspace = function () {
    return /^[\s]{1,}$/.test(this)
}

String.prototype.isnumeric = function () {
    return !isNaN (parseFloat (this)) && isFinite (this);
};

String.prototype.join = function (strings) {
    strings = Array.from (strings); // Much faster than iterating through strings char by char
    return strings.join (this);
};

String.prototype.lower = function () {
    return this.toLowerCase ();
};

String.prototype.py_replace = function (old, aNew, maxreplace) {
    if (maxreplace === undefined || maxreplace < 0) {
        return this.split(old).join(aNew);
    } else if (maxreplace === 0) {
        return this;
    } else {
        const pre = this.split(old, maxreplace).join(aNew);
        const rest = this.slice(this.split(old, maxreplace).join(old).length + 1)
        return pre.concat(rest.length>0 ? aNew : '', rest);
    }
};

String.prototype.lstrip = function (chars) {
    if (chars) {
        var start = 0;
        while (chars.indexOf (this[start]) >= 0) {
            start += 1;
        }
        return this.slice (start);
    }
    return this.replace (/^\s*/g, '');
};

String.prototype.rfind = function (sub, start) {
    return this.lastIndexOf (sub, start);
};

String.prototype.rsplit = function (sep, maxsplit) {    // Combination of general whitespace sep and positive maxsplit neither supported nor checked, expensive and rare
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }

    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            var maxrsplit = result.length - maxsplit;
            return [result.slice (0, maxrsplit) .join (sep)] .concat (result.slice (maxrsplit));
        }
        else {
            return result;
        }
    }
};

String.prototype.rstrip = function (chars) {
  if (chars) {
      var end = this.length - 1;
      while (chars.indexOf (this[end]) >= 0) {
          end -= 1;
      }
      return this.slice (0, end + 1);
  }
  return this.replace (/\s*$/g, '');
};

String.prototype.py_split = function (sep, maxsplit) {  // Combination of general whitespace sep and positive maxsplit neither supported nor checked, expensive and rare
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }

    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            return result.slice (0, maxsplit).concat ([result.slice (maxsplit).join (sep)]);
        }
        else {
            return result;
        }
    }
};

String.prototype.splitlines = function (keepends) {
    if (this.length === 0) {
        return [];
    }

    if (keepends === undefined || keepends === null || keepends === false) {
        return this.trimEnd().split(/\r?\n|\r|\n/g);
    }
    else {
        return this.split(/(?<=\n)(?=\n)|(?<=[\r\n])(?=[^\r\n])/g);
    }
};

String.prototype.startswith = function (prefix, start=0, end) {
    if (end === undefined) {end = this.length}
    const str = this.slice(start, end)

    if (prefix instanceof Array) {
        for (let i=0;i<prefix.length;i++) {
            if (str.indexOf (prefix [i]) === 0)
                return true;
        }
    } else {
        return str.indexOf(prefix) === 0;
    }
    return false;
}

String.prototype.strip = function (chars) {
    if (chars) {
        return this.lstrip (chars).rstrip (chars);
    }
    return this.trim ();
};

String.prototype.upper = function () {
    return this.toUpperCase ();
};

String.prototype.__mul__ = function (scalar) {
    var result = '';
    for (var i = 0; i < scalar; i++) {
        result = result + this;
    }
    return result;
};

String.prototype.__rmul__ = String.prototype.__mul__;

// Dict extensions to object

function __contains__ (element) {
    return this.hasOwnProperty (element);
}

function __keys__ () {
    var keys = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            keys.push (attrib);
        }
    }
    return keys;
}

function __items__ () {
    var items = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            items.push ([attrib, this [attrib]]);
        }
    }
    return items;
}

function __del__ (key) {
    delete this [key];
}

function __clear__ () {
    for (var attrib in this) {
        delete this [attrib];
    }
}

function __getdefault__ (aKey, aDefault) {  // Each Python object already has a function called __get__, so we call this one __getdefault__
    var result = this [aKey];
    if (result === undefined) {
        result = this ['py_' + aKey]
    }
    return result === undefined ? (aDefault === undefined ? null : aDefault) : result;
}

function __setdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result !== undefined) {
        return result;
    }
    var val = aDefault === undefined ? null : aDefault;
    this [aKey] = val;
    return val;
}

function __pop__ (aKey, aDefault) {
    var result = this [aKey];
    if (result !== undefined) {
        delete this [aKey];
        return result;
    } else {
        // Identify check because user could pass None
        if ( aDefault === undefined ) {
            throw KeyError (aKey, new Error());
        }
    }
    return aDefault;
}

function __popitem__ () {
    const aKeys = Object.keys (this);
    if (aKeys.length === 0) {
        throw KeyError ("popitem(): dictionary is empty", new Error ());
    }
    const aKey = aKeys[aKeys.length - 1]
    const result = tuple ([aKey, this [aKey]]);
    delete this [aKey];
    return result;
}

function __update__ (aDict) {
    for (var aKey in aDict) {
        this [aKey] = aDict [aKey];
    }
}

function __copy__ () {
    let dNew = {};
    for (let attrib in this) {
        dNew[attrib] = this[attrib];
    }
    return dict(dNew);
}

function __fromkeys__ (iterable, defVal) {
    if(iterable === undefined){
        throw TypeError("fromkeys expected at least 1 argument, got 0")
    }
    if ( !(['[object Array]', '[object String]'].includes(Object.prototype.toString.call(iterable))) ) {
        throw TypeError("object is not iterable", new Error());
    }

    if(defVal === undefined) defVal = null;
    let dNew = {};
    for (let idx= 0; idx < iterable.length; idx++) {
        dNew[iterable[idx]] = defVal;
    }
    return dict(dNew);
}

function __values__ () {
    var values = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            values.push (this [attrib]);
        }
    }
    return values;

}

function __dgetitem__ (aKey) {
    return this [aKey];
}

function __dsetitem__ (aKey, aValue) {
    this [aKey] = aValue;
}

export function dict (objectOrPairs) {
    let instance = {};
    if (!objectOrPairs || objectOrPairs instanceof Array) { // It's undefined or an array of pairs
        if (objectOrPairs) {
            for (let index = 0; index < objectOrPairs.length; index++) {
                const pair = objectOrPairs [index];
                if ( !(pair instanceof Array) || pair.length !== 2) {
                    throw ValueError(
                        "dict update sequence element #" + index +
                        " has length " + pair.length +
                        "; 2 is required", new Error());
                }
                const key = pair [0];
                let val = pair [1];
                if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
                     // User can potentially pass in an object
                     // that has a hierarchy of objects. This
                     // checks to make sure that these objects
                     // get converted to dict objects instead of
                     // leaving them as js objects.

                     if (!isinstance (objectOrPairs, dict)) {
                         val = dict (val);
                     }
                }
                instance [key] = val;
            }
        }
    }
    else {
        if (isinstance (objectOrPairs, dict)) {
            // Passed object is a dict already, so we need to be a little careful
            // N.B. - this is a shallow copy per python std - so
            // it is assumed that children have already become
            // python objects at some point.
            
            const aKeys = objectOrPairs.py_keys ();
            for (let index = 0; index < aKeys.length; index++ ) {
                const key = aKeys [index];
                instance [key] = objectOrPairs [key];
            }
        } else if (objectOrPairs instanceof Object) {
            // Passed object is a JavaScript object but not yet a dict, don't copy it
            instance = objectOrPairs;
        } else {
            // We have already covered Array so this indicates
            // that the passed object is not a js object - i.e.
            // it is an int or a string, which is invalid.

            throw ValueError ("Invalid type of object for dict creation", new Error ());
        }
    }

    // Transcrypt interprets e.g. {aKey: 'aValue'} as a Python dict literal rather than a JavaScript object literal
    // So dict literals rather than bare Object literals will be passed to JavaScript libraries
    // Some JavaScript libraries call all enumerable callable properties of an object that's passed to them
    // So the properties of a dict should be non-enumerable
    __setproperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
    __setproperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
    __setproperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
    __setproperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, 'py_items', {value: __items__, enumerable: false});
    __setproperty__ (instance, 'py_del', {value: __del__, enumerable: false});
    __setproperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
    __setproperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
    __setproperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
    __setproperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
    __setproperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
    __setproperty__ (instance, 'py_update', {value: __update__, enumerable: false});
    __setproperty__ (instance, 'py_copy', {value: __copy__, enumerable: false});
    __setproperty__ (instance, 'py_values', {value: __values__, enumerable: false});
    __setproperty__ (instance, 'py_fromkeys', {value: __fromkeys__, enumerable: false});
    __setproperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});    // Needed since compound keys necessarily
    __setproperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});    // trigger overloading to deal with slices
    return instance;
}

dict.__name__ = 'dict';
dict.__bases__ = [object];
dict.py_fromkeys = __fromkeys__

// Docstring setter

function __setdoc__ (docString) {
    this.__doc__ = docString;
    return this;
}

// Python classes, methods and functions are all translated to JavaScript functions
__setproperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});

// General operator overloading, only the ones that make most sense in matrix and complex operations

export function __jsmod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return a % b;
    }
};

export function __mod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
};


export function __pow__ (a, b) {
    if (typeof a == 'object' && '__pow__' in a) {
        return a.__pow__ (b);
    }
    else if (typeof b == 'object' && '__rpow__' in b) {
        return b.__rpow__ (a);
    }
    else {
        return Math.pow (a, b);
    }
};

export var pow = __pow__;   // Make available as builtin under usual name

__pragma__ ('ifndef', '__xtiny__')

export function __neg__ (a) {
    if (typeof a == 'object' && '__neg__' in a) {
        return a.__neg__ ();
    }
    else {
        return -a;
    }
};

export function __matmul__ (a, b) {
    return a.__matmul__ (b);
};

// Overloaded binary arithmetic

export function __mul__ (a, b) {
    if (typeof a == 'object' && '__mul__' in a) {
        return a.__mul__ (b);
    }
    else if (typeof b == 'object' && '__rmul__' in b) {
        return b.__rmul__ (a);
    }
    else if (typeof a == 'string') {
        return a.__mul__ (b);
    }
    else if (typeof b == 'string') {
        return b.__rmul__ (a);
    }
    else {
        return a * b;
    }
};

export function __truediv__ (a, b) {
    if (typeof a == 'object' && '__truediv__' in a) {
        return a.__truediv__ (b);
    }
    else if (typeof b == 'object' && '__rtruediv__' in b) {
        return b.__rtruediv__ (a);
    }
    else if (typeof a == 'object' && '__div__' in a) {
        return a.__div__ (b);
    }
    else if (typeof b == 'object' && '__rdiv__' in b) {
        return b.__rdiv__ (a);
    }
    else {
        return a / b;
    }
};

export function __floordiv__ (a, b) {
    if (typeof a == 'object' && '__floordiv__' in a) {
        return a.__floordiv__ (b);
    }
    else if (typeof b == 'object' && '__rfloordiv__' in b) {
        return b.__rfloordiv__ (a);
    }
    else if (typeof a == 'object' && '__div__' in a) {
        return a.__div__ (b);
    }
    else if (typeof b == 'object' && '__rdiv__' in b) {
        return b.__rdiv__ (a);
    }
    else {
        return Math.floor (a / b);
    }
};

export function __add__ (a, b) {
    if (typeof a == 'object' && '__add__' in a) {
        return a.__add__ (b);
    }
    else if (typeof b == 'object' && '__radd__' in b) {
        return b.__radd__ (a);
    }
    else {
        return a + b;
    }
};

export function __sub__ (a, b) {
    if (typeof a == 'object' && '__sub__' in a) {
        return a.__sub__ (b);
    }
    else if (typeof b == 'object' && '__rsub__' in b) {
        return b.__rsub__ (a);
    }
    else {
        return a - b;
    }
};

// Overloaded binary bitwise

export function __lshift__ (a, b) {
    if (a && typeof a == 'object' && '__lshift__' in a) {
        return a.__lshift__ (b);
    }
    else if (b && typeof b == 'object' && '__rlshift__' in b) {
        return b.__rlshift__ (a);
    }
    else {
        return a << b;
    }
};

export function __rshift__ (a, b) {
    if (a && typeof a == 'object' && '__rshift__' in a) {
        return a.__rshift__ (b);
    }
    else if (b && typeof b == 'object' && '__rrshift__' in b) {
        return b.__rrshift__ (a);
    }
    else {
        return a >> b;
    }
};

export function __or__ (a, b) {
    if (a && typeof a == 'object' && '__or__' in a) {
        return a.__or__ (b);
    }
    else if (b && typeof b == 'object' && '__ror__' in b) {
        return b.__ror__ (a);
    }
    else {
        return a | b;
    }
};

export function __xor__ (a, b) {
    if (a && typeof a == 'object' && '__xor__' in a) {
        return a.__xor__ (b);
    }
    else if (b && typeof b == 'object' && '__rxor__' in b) {
        return b.__rxor__ (a);
    }
    else {
        return a ^ b;
    }
};

export function __and__ (a, b) {
    if (a && typeof a == 'object' && '__and__' in a) {
        return a.__and__ (b);
    }
    else if (b && typeof b == 'object' && '__rand__' in b) {
        return b.__rand__ (a);
    }
    else {
        return a & b;
    }
};

// Overloaded binary compare

export function __eq__ (a, b) {
    if (a && typeof a == 'object' && '__eq__' in a) {
        return a.__eq__ (b);
    }
    else if (b && typeof b == 'object' && '__eq__' in b) {
        return b.__eq__ (a);
    }
    else {
        return a == b;
    }
};

export function __ne__ (a, b) {
    if (a && typeof a == 'object' && '__ne__' in a) {
        return a.__ne__ (b);
    }
    else if (b && typeof b == 'object' && '__ne__' in b) {
        return b.__ne__ (a);
    }
    else {
        return a != b
    }
};

export function __lt__ (a, b) {
    if (a && typeof a == 'object' && '__lt__' in a) {
        return a.__lt__ (b);
    }
    else {
        return a < b;
    }
};

export function __le__ (a, b) {
    if (a && typeof a == 'object' && '__le__' in a) {
        return a.__le__ (b);
    }
    else {
        return a <= b;
    }
};

export function __gt__ (a, b) {
    if (a && typeof a == 'object' && '__gt__' in a) {
        return a.__gt__ (b);
    }
    else {
        return a > b;
    }
};

export function __ge__ (a, b) {
    if (a && typeof a == 'object' && '__ge__' in a) {
        return a.__ge__ (b);
    }
    else {
        return a >= b;
    }
};

// Overloaded augmented general

export function __imatmul__ (a, b) {
    if ('__imatmul__' in a) {
        return a.__imatmul__ (b);
    }
    else {
        return a.__matmul__ (b);
    }
};

export function __ipow__ (a, b) {
    if (typeof a == 'object' && '__pow__' in a) {
        return a.__ipow__ (b);
    }
    else if (typeof a == 'object' && '__ipow__' in a) {
        return a.__pow__ (b);
    }
    else if (typeof b == 'object' && '__rpow__' in b) {
        return b.__rpow__ (a);
    }
    else {
        return Math.pow (a, b);
    }
};

export function __ijsmod__ (a, b) {
    if (typeof a == 'object' && '__imod__' in a) {
        return a.__ismod__ (b);
    }
    else if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rpow__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return a % b;
    }
};

export function __imod__ (a, b) {
    if (typeof a == 'object' && '__imod__' in a) {
        return a.__imod__ (b);
    }
    else if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
};

// Overloaded augmented arithmetic

export function __imul__ (a, b) {
    if (typeof a == 'object' && '__imul__' in a) {
        return a.__imul__ (b);
    }
    else if (typeof a == 'object' && '__mul__' in a) {
        return a = a.__mul__ (b);
    }
    else if (typeof b == 'object' && '__rmul__' in b) {
        return a = b.__rmul__ (a);
    }
    else if (typeof a == 'string') {
        return a = a.__mul__ (b);
    }
    else if (typeof b == 'string') {
        return a = b.__rmul__ (a);
    }
    else {
        return a *= b;
    }
};

export function __idiv__ (a, b) {
    if (typeof a == 'object' && '__idiv__' in a) {
        return a.__idiv__ (b);
    }
    else if (typeof a == 'object' && '__div__' in a) {
        return a = a.__div__ (b);
    }
    else if (typeof b == 'object' && '__rdiv__' in b) {
        return a = b.__rdiv__ (a);
    }
    else {
        return a /= b;
    }
};

export function __iadd__ (a, b) {
    if (typeof a == 'object' && '__iadd__' in a) {
        return a.__iadd__ (b);
    }
    else if (typeof a == 'object' && '__add__' in a) {
        return a = a.__add__ (b);
    }
    else if (typeof b == 'object' && '__radd__' in b) {
        return a = b.__radd__ (a);
    }
    else {
        return a += b;
    }
};

export function __isub__ (a, b) {
    if (typeof a == 'object' && '__isub__' in a) {
        return a.__isub__ (b);
    }
    else if (typeof a == 'object' && '__sub__' in a) {
        return a = a.__sub__ (b);
    }
    else if (typeof b == 'object' && '__rsub__' in b) {
        return a = b.__rsub__ (a);
    }
    else {
        return a -= b;
    }
};

// Overloaded augmented bitwise

export function __ilshift__ (a, b) {
    if (typeof a == 'object' && '__ilshift__' in a) {
        return a.__ilshift__ (b);
    }
    else if (typeof a == 'object' && '__lshift__' in a) {
        return a = a.__lshift__ (b);
    }
    else if (typeof b == 'object' && '__rlshift__' in b) {
        return a = b.__rlshift__ (a);
    }
    else {
        return a <<= b;
    }
};

export function __irshift__ (a, b) {
    if (typeof a == 'object' && '__irshift__' in a) {
        return a.__irshift__ (b);
    }
    else if (typeof a == 'object' && '__rshift__' in a) {
        return a = a.__rshift__ (b);
    }
    else if (typeof b == 'object' && '__rrshift__' in b) {
        return a = b.__rrshift__ (a);
    }
    else {
        return a >>= b;
    }
};

export function __ior__ (a, b) {
    if (typeof a == 'object' && '__ior__' in a) {
        return a.__ior__ (b);
    }
    else if (typeof a == 'object' && '__or__' in a) {
        return a = a.__or__ (b);
    }
    else if (typeof b == 'object' && '__ror__' in b) {
        return a = b.__ror__ (a);
    }
    else {
        return a |= b;
    }
};

export function __ixor__ (a, b) {
    if (typeof a == 'object' && '__ixor__' in a) {
        return a.__ixor__ (b);
    }
    else if (typeof a == 'object' && '__xor__' in a) {
        return a = a.__xor__ (b);
    }
    else if (typeof b == 'object' && '__rxor__' in b) {
        return a = b.__rxor__ (a);
    }
    else {
        return a ^= b;
    }
};

export function __iand__ (a, b) {
    if (typeof a == 'object' && '__iand__' in a) {
        return a.__iand__ (b);
    }
    else if (typeof a == 'object' && '__and__' in a) {
        return a = a.__and__ (b);
    }
    else if (typeof b == 'object' && '__rand__' in b) {
        return a = b.__rand__ (a);
    }
    else {
        return a &= b;
    }
};

// Indices and slices

export function __getitem__ (container, key) {                           // Slice c.q. index, direct generated call to runtime switch
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ (key);                             // Overloaded on container
    }
    else if ( ['[object Array]', '[object String]'].includes(Object.prototype.toString.call(container)) ) {
        const result = container[key < 0 ? container.length + key : key];
        if (result === undefined) {
            throw IndexError ("index out of range", new Error());
        }
        return result;
    }
    else {
        return container [key];                                         // Container must support bare JavaScript brackets
        /*
        If it turns out keychecks really have to be supported here, the following will work
        return __k__ (container, key);
        Could be inlined rather than a call, but performance not crucial since non-overloaded [] in context of overloaded [] is rare
        High volume numerical code will use Numscrypt anyhow which does many things via shortcuts
        */
    }
};

export function __setitem__ (container, key, value) {                    // Slice c.q. index, direct generated call to runtime switch
    if (typeof container == 'object' && '__setitem__' in container) {
        container.__setitem__ (key, value);                             // Overloaded on container
    }
    else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
        container [container.length + key] = value;
    }
    else {
        container [key] = value;                                        // Container must support bare JavaScript brackets
    }
};

export function __getslice__ (container, lower, upper, step) {           // Slice only, no index, direct generated call to runtime switch
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ ([lower, upper, step]);            // Container supports overloaded slicing c.q. indexing
    }
    else {
        return container.__getslice__ (lower, upper, step);             // Container only supports slicing injected natively in prototype
    }
};

export function __setslice__ (container, lower, upper, step, value) {    // Slice, no index, direct generated call to runtime switch
    if (typeof container == 'object' && '__setitem__' in container) {
        container.__setitem__ ([lower, upper, step], value);            // Container supports overloaded slicing c.q. indexing
    }
    else {
        container.__setslice__ (lower, upper, step, value);             // Container only supports slicing injected natively in prototype
    }
};

__pragma__ ('endif')
