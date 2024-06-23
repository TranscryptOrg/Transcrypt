// Transcrypt'ed from Python, 2021-05-14 15:00:23
var __all__ = dict ({get AssertionError () {return AssertionError;}, set AssertionError (value) {AssertionError = value;}, get AttributeError () {return AttributeError;}, set AttributeError (value) {AttributeError = value;}, get BaseException () {return BaseException;}, set BaseException (value) {BaseException = value;}, get DeprecationWarning () {return DeprecationWarning;}, set DeprecationWarning (value) {DeprecationWarning = value;}, get Exception () {return Exception;}, set Exception (value) {Exception = value;}, get IndexError () {return IndexError;}, set IndexError (value) {IndexError = value;}, get IterableError () {return IterableError;}, set IterableError (value) {IterableError = value;}, get KeyError () {return KeyError;}, set KeyError (value) {KeyError = value;}, get NotImplementedError () {return NotImplementedError;}, set NotImplementedError (value) {NotImplementedError = value;}, get RuntimeWarning () {return RuntimeWarning;}, set RuntimeWarning (value) {RuntimeWarning = value;}, get StopIteration () {return StopIteration;}, set StopIteration (value) {StopIteration = value;}, get TypeError () {return TypeError;}, set TypeError (value) {TypeError = value;}, get UserWarning () {return UserWarning;}, set UserWarning (value) {UserWarning = value;}, get ValueError () {return ValueError;}, set ValueError (value) {ValueError = value;}, get Warning () {return Warning;}, set Warning (value) {Warning = value;}, get __Terminal__ () {return __Terminal__;}, set __Terminal__ (value) {__Terminal__ = value;}, get __conj__ () {return __conj__;}, set __conj__ (value) {__conj__ = value;}, get __name__ () {return __name__;}, set __name__ (value) {__name__ = value;}, get __sort__ () {return __sort__;}, set __sort__ (value) {__sort__ = value;}, get __terminal__ () {return __terminal__;}, set __terminal__ (value) {__terminal__ = value;}, get complex () {return complex;}, set complex (value) {complex = value;}, get divmod () {return divmod;}, set divmod (value) {divmod = value;}, get filter () {return filter;}, set filter (value) {filter = value;}, get input () {return input;}, set input (value) {input = value;}, get map () {return map;}, set map (value) {map = value;}, get print () {return print;}, set print (value) {print = value;}, get sorted () {return sorted;}, set sorted (value) {sorted = value;}});
var __name__ = 'org.transcrypt.__runtime__';
export var __envir__ = {};
__envir__.interpreter_name = 'python';
__envir__.transpiler_name = 'transcrypt';
__envir__.executor_name = __envir__.transpiler_name;
__envir__.transpiler_version = '3.8.0';

export function __nest__ (headObject, tailNames, value) {
    var current = headObject;
    if (tailNames != '') {
        var tailChain = tailNames.split ('.');
        var firstNewIndex = tailChain.length;
        for (var index = 0; index < tailChain.length; index++) {
            if (!current.hasOwnProperty (tailChain [index])) {
                firstNewIndex = index;
                break;
            }
            current = current [tailChain [index]];
        }
        for (var index = firstNewIndex; index < tailChain.length; index++) {
            current [tailChain [index]] = {};
            current = current [tailChain [index]];
        }
    }
    for (let attrib of Object.getOwnPropertyNames (value)) {
        Object.defineProperty (current, attrib, {
            get () {return value [attrib];},
            enumerable: true,
            configurable: true
        });
    }
};
export function __init__ (module) {
    if (!module.__inited__) {
        module.__all__.__init__ (module.__all__);
        module.__inited__ = true;
    }
    return module.__all__;
};
export function __get__ (aThis, func, quotedFuncName) {
    if (aThis) {
        if (aThis.hasOwnProperty ('__class__') || typeof aThis == 'string' || aThis instanceof String) {
            if (quotedFuncName) {
                Object.defineProperty (aThis, quotedFuncName, {
                    value: function () {
                        var args = [] .slice.apply (arguments);
                        return func.apply (null, [aThis] .concat (args));
                    },
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [aThis.__proxy__ ? aThis.__proxy__ : aThis] .concat (args));
            };
        }
        else {
            return func;
        }
    }
    else {
        return func;
    }
};
export function __getcm__ (aThis, func, quotedFuncName) {
    if (aThis.hasOwnProperty ('__class__')) {
        return function () {
            var args = [] .slice.apply (arguments);
            return func.apply (null, [aThis.__class__] .concat (args));
        };
    }
    else {
        return function () {
            var args = [] .slice.apply (arguments);
            return func.apply (null, [aThis] .concat (args));
        };
    }
};
export function __getsm__ (aThis, func, quotedFuncName) {
    return func;
};
export var py_metatype = {
    __name__: 'type',
    __bases__: [],
    __new__: function (meta, name, bases, attribs) {
        var cls = function () {
            var args = [] .slice.apply (arguments);
            return cls.__new__ (args);
        };
        for (var index = bases.length - 1; index >= 0; index--) {
            var base = bases [index];
            for (var attrib in base) {
                var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                if (descrip == null) {
                    continue;
                }
                Object.defineProperty (cls, attrib, descrip);
            }
            for (let symbol of Object.getOwnPropertySymbols (base)) {
                let descrip = Object.getOwnPropertyDescriptor (base, symbol);
                Object.defineProperty (cls, symbol, descrip);
            }
        }
        cls.__metaclass__ = meta;
        cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
        cls.__bases__ = bases;
        for (var attrib in attribs) {
            var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
            Object.defineProperty (cls, attrib, descrip);
        }
        for (let symbol of Object.getOwnPropertySymbols (attribs)) {
            let descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
            Object.defineProperty (cls, symbol, descrip);
        }
        return cls;
    }
};
py_metatype.__metaclass__ = py_metatype;
export var object = {
    __init__: function (self) {},
    __metaclass__: py_metatype,
    __name__: 'object',
    __bases__: [],
    __new__: function (args) {
        var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
        if ('__getattr__' in this || '__setattr__' in this) {
            instance.__proxy__ = new Proxy (instance, {
                get: function (target, name) {
                    let result = target [name];
                    if (result == undefined) {
                        return target.__getattr__ (name);
                    }
                    else {
                        return result;
                    }
                },
                set: function (target, name, value) {
                    try {
                        target.__setattr__ (name, value);
                    }
                    catch (exception) {
                        target [name] = value;
                    }
                    return true;
                }
            })
			instance = instance.__proxy__
        }
        this.__init__.apply (null, [instance] .concat (args));
        return instance;
    }
};
export function __class__ (name, bases, attribs, meta) {
    if (meta === undefined) {
        meta = bases [0] .__metaclass__;
    }
    return meta.__new__ (meta, name, bases, attribs);
};
export function __pragma__ () {};
export function __call__ (/* <callee>, <this>, <params>* */) {
    var args = [] .slice.apply (arguments);
    if (typeof args [0] == 'object' && '__call__' in args [0]) {
        return args [0] .__call__ .apply (args [1], args.slice (2));
    }
    else {
        return args [0] .apply (args [1], args.slice (2));
    }
};
__envir__.executor_name = __envir__.transpiler_name;
var __main__ = {__file__: ''};
var __except__ = null;
export function __kwargtrans__ (anObject) {
    anObject.__kwargtrans__ = null;
    anObject.constructor = Object;
    return anObject;
}
export function __super__ (aClass, methodName) {
    for (let base of aClass.__bases__) {
        if (methodName in base) {
           return base [methodName];
        }
    }
    throw new Exception ('Superclass method not found');
}
export function property (getter, setter) {
    if (!setter) {
        setter = function () {};
    }
    return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
}
export function __setproperty__ (anObject, name, descriptor) {
    if (!anObject.hasOwnProperty (name)) {
        Object.defineProperty (anObject, name, descriptor);
    }
}
export function assert (condition, message) {
    if (!condition) {
        throw AssertionError (message, new Error ());
    }
}
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
export function __withblock__ (manager, statements) {
    if (hasattr (manager, '__enter__')) {
        try {
            manager.__enter__ ();
            statements ();
            manager.__exit__ ();
        }
        catch (exception) {
            if (! (manager.__exit__ (exception.name, exception, exception.stack))) {
                throw exception;
            }
        }
    }
    else {
        statements ();
        manager.close ();
    }
};
export function dir (obj) {
    var aList = [];
    for (var aKey in obj) {
        aList.push (aKey.startsWith ('py_') ? aKey.slice (3) : aKey);
    }
    aList.sort ();
    return aList;
};
export function setattr (obj, name, value) {
    obj [name] = value;
};
export function getattr (obj, name) {
    return name in obj ? obj [name] : obj ['py_' + name];
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
export function __in__ (element, container) {
    if (container === undefined || container === null) {
        return false;
    }
    if (container.__contains__ instanceof Function) {
        return container.__contains__ (element);
    }
    else {
        return (
            container.indexOf ?
            container.indexOf (element) > -1 :
            container.hasOwnProperty (element)
        );
    }
};
export function __specialattrib__ (attrib) {
    return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
};
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
export function __i__ (any) {
    return py_typeof (any) == dict ? any.py_keys () : any;
}
export function __k__ (keyed, key) {
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
export function __t__ (target) {
    return (
        target === undefined || target === null ? false :
        ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
        target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
        target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
        target instanceof Function ? target :
        len (target) !== 0 ? target :
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
    else if (isNaN (parseFloat (any))) {
        if (any === false) {
            return 0;
        }
        else if (any === true) {
            return 1;
        }
        else {
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
export function bool (any) {
    return !!__t__ (any);
};
bool.__name__ = 'bool';
bool.__bases__ = [int];
export function py_typeof (anObject) {
    var aType = typeof anObject;
    if (aType == 'object') {
        try {
            return '__class__' in anObject ? anObject.__class__ : object;
        }
        catch (exception) {
            return aType;
        }
    }
    else {
        return (
            aType == 'boolean' ? bool :
            aType == 'string' ? str :
            aType == 'number' ? (anObject % 1 == 0 ? int : float) :
            null
        );
    }
};
export function issubclass (aClass, classinfo) {
    if (classinfo instanceof Array) {
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
    catch (exception) {
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
export function repr (anObject) {
    try {
        return anObject.__repr__ ();
    }
    catch (exception) {
        try {
            return anObject.__str__ ();
        }
        catch (exception) {
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
                                var attribRepr = attrib;
                            }
                            else {
                                var attribRepr = '\'' + attrib + '\'';
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
export function chr (charCode) {
    return String.fromCharCode (charCode);
};
export function ord (aChar) {
    return aChar.charCodeAt (0);
};
export function max (nrOrSeq) {
    return arguments.length == 1 ? Math.max (...nrOrSeq) : Math.max (...arguments);
};
export function min (nrOrSeq) {
    return arguments.length == 1 ? Math.min (...nrOrSeq) : Math.min (...arguments);
};
export function abs (x) {
    try {
        return Math.abs (x);
    }
    catch (exception) {
        return Math.sqrt (x.real * x.real + x.imag * x.imag);
    }
};
export function round (number, ndigits) {
    if (ndigits) {
        var scale = Math.pow (10, ndigits);
        number *= scale;
    }
    var rounded = Math.round (number);
    if (rounded - number == 0.5 && rounded % 2) {
        rounded -= 1;
    }
    if (ndigits) {
        rounded /= scale;
    }
    return rounded;
};
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
export function __jsUsePyNext__ () {
    try {
        var result = this.__next__ ();
        return {value: result, done: false};
    }
    catch (exception) {
        return {value: undefined, done: true};
    }
}
export function __pyUseJsNext__ () {
    var result = this.next ();
    if (result.done) {
        throw StopIteration (new Error ());
    }
    else {
        return result.value;
    }
}
export function py_iter (iterable) {
    if (typeof iterable == 'string' || '__iter__' in iterable) {
        var result = iterable.__iter__ ();
        result.next = __jsUsePyNext__;
    }
    else if ('selector' in iterable) {
        var result = list (iterable) .__iter__ ();
        result.next = __jsUsePyNext__;
    }
    else if ('next' in iterable) {
        var result = iterable
        if (! ('__next__' in result)) {
            result.__next__ = __pyUseJsNext__;
        }
    }
    else if (Symbol.iterator in iterable) {
        var result = iterable [Symbol.iterator] ();
        result.__next__ = __pyUseJsNext__;
    }
    else {
        throw IterableError (new Error ());
    }
    result [Symbol.iterator] = function () {return result;};
    return result;
}
export function py_next (iterator) {
    try {
        var result = iterator.__next__ ();
    }
    catch (exception) {
        var result = iterator.next ();
        if (result.done) {
            throw StopIteration (new Error ());
        }
        else {
            return result.value;
        }
    }
    if (result == undefined) {
        throw StopIteration (new Error ());
    }
    else {
        return result;
    }
}
export function __PyIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
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
export function py_reversed (iterable) {
    iterable = iterable.slice ();
    iterable.reverse ();
    return iterable;
};
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
    var shortest = args.length == 0 ? [] : args.reduce (
        function (array0, array1) {
            return array0.length < array1.length ? array0 : array1;
        }
    );
    return shortest.map (
        function (current, index) {
            return args.map (
                function (current) {
                    return current [index];
                }
            );
        }
    );
};
export function range (start, stop, step) {
    if (stop == undefined) {
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
export function enumerate (iterable) {
    return zip (range (len (iterable)), iterable);
}
export function copy (anObject) {
    if (anObject == null || typeof anObject == "object") {
        return anObject;
    }
    else {
        var result = {};
        for (var attrib in obj) {
            if (anObject.hasOwnProperty (attrib)) {
                result [attrib] = anObject [attrib];
            }
        }
        return result;
    }
}
export function deepcopy (anObject) {
    if (anObject == null || typeof anObject == "object") {
        return anObject;
    }
    else {
        var result = {};
        for (var attrib in obj) {
            if (anObject.hasOwnProperty (attrib)) {
                result [attrib] = deepcopy (anObject [attrib]);
            }
        }
        return result;
    }
}
export function list (iterable) {
    let instance = iterable ? Array.from (iterable) : [];
    return instance;
}
Array.prototype.__class__ = list;
list.__name__ = 'list';
list.__bases__ = [object];
Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};
Array.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    else if (stop > this.length) {
        stop = this.length;
    }
    if (step == 1) {
        return Array.prototype.slice.call(this, start, stop);
    }
    let result = list ([]);
    for (let index = start; index < stop; index += step) {
        result.push (this [index]);
    }
    return result;
};
Array.prototype.__setslice__ = function (start, stop, step, source) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    if (step == null) {
        Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
    }
    else {
        let sourceIndex = 0;
        for (let targetIndex = start; targetIndex < stop; targetIndex += step) {
            this [targetIndex] = source [sourceIndex++];
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
Array.prototype.extend = function (aList) {
    this.push.apply (this, aList);
};
Array.prototype.insert = function (index, element) {
    this.splice (index, 0, element);
};
Array.prototype.remove = function (element) {
    let index = this.indexOf (element);
    if (index == -1) {
        throw ValueError ("list.remove(x): x not in list", new Error ());
    }
    this.splice (index, 1);
};
Array.prototype.index = function (element) {
    return this.indexOf (element);
};
Array.prototype.py_pop = function (index) {
    if (index == undefined) {
        return this.pop ();
    }
    else {
        return this.splice (index, 1) [0];
    }
};
Array.prototype.py_sort = function () {
    __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
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
export function tuple (iterable) {
    let instance = iterable ? [] .slice.apply (iterable) : [];
    instance.__class__ = tuple;
    return instance;
}
tuple.__name__ = 'tuple';
tuple.__bases__ = [object];
export function set (iterable) {
    let instance = [];
    if (iterable) {
        for (let index = 0; index < iterable.length; index++) {
            instance.add (iterable [index]);
        }
    }
    instance.__class__ = set;
    return instance;
}
set.__name__ = 'set';
set.__bases__ = [object];
Array.prototype.__bindexOf__ = function (element) {
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
    if (this.indexOf (element) == -1) {
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
    return set (other.slice ()) .issuperset (this);
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
Array.prototype.py_update = function () {
    let updated = [] .concat.apply (this.slice (), arguments) .sort ();
    this.py_clear ();
    for (let i = 0; i < updated.length; i++) {
        if (updated [i] != updated [i - 1]) {
            this.push (updated [i]);
        }
    }
};
Array.prototype.__eq__ = function (other) {
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
Array.prototype.__ne__ = function (other) {
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
                return String (stringable);
            }
        }
    }
};
String.prototype.__class__ = str;
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
String.prototype.endswith = function (suffix) {
    if (suffix instanceof Array) {
        for (var i=0;i<suffix.length;i++) {
            if (this.slice (-suffix[i].length) == suffix[i])
                return true;
        }
    } else
        return suffix == '' || this.slice (-suffix.length) == suffix;
    return false;
};
String.prototype.find = function (sub, start) {
    return this.indexOf (sub, start);
};
String.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    var result = '';
    if (step == 1) {
        result = this.substring (start, stop);
    }
    else {
        for (var index = start; index < stop; index += step) {
            result = result.concat (this.charAt(index));
        }
    }
    return result;
};
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
__setproperty__ (String.prototype, 'format', {
    get: function () {return __get__ (this, function (self) {
        var args = tuple ([] .slice.apply (arguments).slice (1));
        var autoIndex = 0;
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
            if (key == +key && args [key] !== undefined) {
                value = args [key];
            }
            else {
                var attr = undefined;
                var idx = ("" + key) .indexOf ('.');
                if (idx != -1) {
                    attr = key.substring (idx + 1);
                    key = key.substring (0, idx);
                }
                else {
                    idx = ("" + key) .indexOf ('[');
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
                        if (typeof args [index] == 'object' && args [index] != null && args [index][key] !== undefined) {
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
    strings = Array.from (strings);
    return strings.join (this);
};
String.prototype.lower = function () {
    return this.toLowerCase ();
};
String.prototype.py_replace = function (old, aNew, maxreplace) {
    return this.split (old, maxreplace) .join (aNew);
};
String.prototype.lstrip = function () {
    return this.replace (/^\s*/g, '');
};
String.prototype.rfind = function (sub, start) {
    return this.lastIndexOf (sub, start);
};
String.prototype.rsplit = function (sep, maxsplit) {
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
String.prototype.rstrip = function () {
    return this.replace (/\s*$/g, '');
};
String.prototype.py_split = function (sep, maxsplit) {
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
String.prototype.startswith = function (prefix) {
    if (prefix instanceof Array) {
        for (var i=0;i<prefix.length;i++) {
            if (this.indexOf (prefix [i]) == 0)
                return true;
        }
    } else
        return this.indexOf (prefix) == 0;
    return false;
};
String.prototype.strip = function () {
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
function __getdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result == undefined) {
        result = this ['py_' + aKey]
    }
    return result == undefined ? (aDefault == undefined ? null : aDefault) : result;
}
function __setdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        return result;
    }
    var val = aDefault == undefined ? null : aDefault;
    this [aKey] = val;
    return val;
}
function __pop__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        delete this [aKey];
        return result;
    } else {
        if ( aDefault === undefined ) {
            throw KeyError (aKey, new Error());
        }
    }
    return aDefault;
}
function __popitem__ () {
    var aKey = Object.keys (this) [0];
    if (aKey == null) {
        throw KeyError ("popitem(): dictionary is empty", new Error ());
    }
    var result = tuple ([aKey, this [aKey]]);
    delete this [aKey];
    return result;
}
function __update__ (aDict) {
    for (var aKey in aDict) {
        this [aKey] = aDict [aKey];
    }
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
    var instance = {};
    if (!objectOrPairs || objectOrPairs instanceof Array) {
        if (objectOrPairs) {
            for (var index = 0; index < objectOrPairs.length; index++) {
                var pair = objectOrPairs [index];
                if ( !(pair instanceof Array) || pair.length != 2) {
                    throw ValueError(
                        "dict update sequence element #" + index +
                        " has length " + pair.length +
                        "; 2 is required", new Error());
                }
                var key = pair [0];
                var val = pair [1];
                if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
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
            var aKeys = objectOrPairs.py_keys ();
            for (var index = 0; index < aKeys.length; index++ ) {
                var key = aKeys [index];
                instance [key] = objectOrPairs [key];
            }
        } else if (objectOrPairs instanceof Object) {
            instance = objectOrPairs;
        } else {
            throw ValueError ("Invalid type of object for dict creation", new Error ());
        }
    }
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
    __setproperty__ (instance, 'py_values', {value: __values__, enumerable: false});
    __setproperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
    __setproperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
    return instance;
}
dict.__name__ = 'dict';
dict.__bases__ = [object];
function __setdoc__ (docString) {
    this.__doc__ = docString;
    return this;
}
__setproperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
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
export var pow = __pow__;
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
export function __lshift__ (a, b) {
    if (typeof a == 'object' && '__lshift__' in a) {
        return a.__lshift__ (b);
    }
    else if (typeof b == 'object' && '__rlshift__' in b) {
        return b.__rlshift__ (a);
    }
    else {
        return a << b;
    }
};
export function __rshift__ (a, b) {
    if (typeof a == 'object' && '__rshift__' in a) {
        return a.__rshift__ (b);
    }
    else if (typeof b == 'object' && '__rrshift__' in b) {
        return b.__rrshift__ (a);
    }
    else {
        return a >> b;
    }
};
export function __or__ (a, b) {
    if (typeof a == 'object' && '__or__' in a) {
        return a.__or__ (b);
    }
    else if (typeof b == 'object' && '__ror__' in b) {
        return b.__ror__ (a);
    }
    else {
        return a | b;
    }
};
export function __xor__ (a, b) {
    if (typeof a == 'object' && '__xor__' in a) {
        return a.__xor__ (b);
    }
    else if (typeof b == 'object' && '__rxor__' in b) {
        return b.__rxor__ (a);
    }
    else {
        return a ^ b;
    }
};
export function __and__ (a, b) {
    if (typeof a == 'object' && '__and__' in a) {
        return a.__and__ (b);
    }
    else if (typeof b == 'object' && '__rand__' in b) {
        return b.__rand__ (a);
    }
    else {
        return a & b;
    }
};
export function __eq__ (a, b) {
    if (typeof a == 'object' && '__eq__' in a) {
        return a.__eq__ (b);
    }
    else {
        return a == b;
    }
};
export function __ne__ (a, b) {
    if (typeof a == 'object' && '__ne__' in a) {
        return a.__ne__ (b);
    }
    else {
        return a != b
    }
};
export function __lt__ (a, b) {
    if (typeof a == 'object' && '__lt__' in a) {
        return a.__lt__ (b);
    }
    else {
        return a < b;
    }
};
export function __le__ (a, b) {
    if (typeof a == 'object' && '__le__' in a) {
        return a.__le__ (b);
    }
    else {
        return a <= b;
    }
};
export function __gt__ (a, b) {
    if (typeof a == 'object' && '__gt__' in a) {
        return a.__gt__ (b);
    }
    else {
        return a > b;
    }
};
export function __ge__ (a, b) {
    if (typeof a == 'object' && '__ge__' in a) {
        return a.__ge__ (b);
    }
    else {
        return a >= b;
    }
};
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
export function __getitem__ (container, key) {
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ (key);
    }
    else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
        return container [container.length + key];
    }
    else {
        return container [key];
    }
};
export function __setitem__ (container, key, value) {
    if (typeof container == 'object' && '__setitem__' in container) {
        container.__setitem__ (key, value);
    }
    else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
        container [container.length + key] = value;
    }
    else {
        container [key] = value;
    }
};
export function __getslice__ (container, lower, upper, step) {
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ ([lower, upper, step]);
    }
    else {
        return container.__getslice__ (lower, upper, step);
    }
};
export function __setslice__ (container, lower, upper, step, value) {
    if (typeof container == 'object' && '__setitem__' in container) {
        container.__setitem__ ([lower, upper, step], value);
    }
    else {
        container.__setslice__ (lower, upper, step, value);
    }
};
export var BaseException =  __class__ ('BaseException', [object], {
	__module__: __name__,
});
export var Exception =  __class__ ('Exception', [BaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
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
		self.__args__ = args;
		if (kwargs.error != null) {
			self.stack = kwargs.error.stack;
		}
		else if (Error) {
			self.stack = new Error ().stack;
		}
		else {
			self.stack = 'No stack trace available';
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
		}
		else if (len (self.__args__)) {
			return '{}({})'.format (self.__class__.__name__, repr (self.__args__ [0]));
		}
		else {
			return '{}()'.format (self.__class__.__name__);
		}
	});},
	get __str__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return str (tuple (self.__args__));
		}
		else if (len (self.__args__)) {
			return str (self.__args__ [0]);
		}
		else {
			return '';
		}
	});}
});
export var IterableError =  __class__ ('IterableError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
	});}
});
export var StopIteration =  __class__ ('StopIteration', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
	});}
});
export var ValueError =  __class__ ('ValueError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
export var KeyError =  __class__ ('KeyError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
export var AssertionError =  __class__ ('AssertionError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		if (message) {
			Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
		}
		else {
			Exception.__init__ (self, __kwargtrans__ ({error: error}));
		}
	});}
});
export var NotImplementedError =  __class__ ('NotImplementedError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
export var IndexError =  __class__ ('IndexError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
export var AttributeError =  __class__ ('AttributeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
export var py_TypeError =  __class__ ('py_TypeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
export var Warning =  __class__ ('Warning', [Exception], {
	__module__: __name__,
});
export var UserWarning =  __class__ ('UserWarning', [Warning], {
	__module__: __name__,
});
export var DeprecationWarning =  __class__ ('DeprecationWarning', [Warning], {
	__module__: __name__,
});
export var RuntimeWarning =  __class__ ('RuntimeWarning', [Warning], {
	__module__: __name__,
});
export var __sort__ = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {;
		var key = null;
	};
	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {;
		var reverse = false;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (key) {
		iterable.sort ((function __lambda__ (a, b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return (key (a) > key (b) ? 1 : -(1));
		}));
	}
	else {
		iterable.sort ();
	}
	if (reverse) {
		iterable.reverse ();
	}
};
export var sorted = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {;
		var key = null;
	};
	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {;
		var reverse = false;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (py_typeof (iterable) == dict) {
		var result = copy (iterable.py_keys ());
	}
	else {
		var result = copy (iterable);
	}
	__sort__ (result, key, reverse);
	return result;
};
export var map = function (func, iterable) {
	return (function () {
		var __accu0__ = [];
		for (var item of iterable) {
			__accu0__.append (func (item));
		}
		return __accu0__;
	}) ();
};
export var filter = function (func, iterable) {
	if (func == null) {
		var func = bool;
	}
	return (function () {
		var __accu0__ = [];
		for (var item of iterable) {
			if (func (item)) {
				__accu0__.append (item);
			}
		}
		return __accu0__;
	}) ();
};
export var divmod = function (n, d) {
	return tuple ([Math.floor (n / d), __mod__ (n, d)]);
};
export var complex =  __class__ ('complex', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, real, imag) {
		if (typeof imag == 'undefined' || (imag != null && imag.hasOwnProperty ("__kwargtrans__"))) {;
			var imag = null;
		};
		if (imag == null) {
			if (py_typeof (real) == complex) {
				self.real = real.real;
				self.imag = real.imag;
			}
			else {
				self.real = real;
				self.imag = 0;
			}
		}
		else {
			self.real = real;
			self.imag = imag;
		}
	});},
	get __neg__ () {return __get__ (this, function (self) {
		return complex (-(self.real), -(self.imag));
	});},
	get __exp__ () {return __get__ (this, function (self) {
		var modulus = Math.exp (self.real);
		return complex (modulus * Math.cos (self.imag), modulus * Math.sin (self.imag));
	});},
	get __log__ () {return __get__ (this, function (self) {
		return complex (Math.log (Math.sqrt (self.real * self.real + self.imag * self.imag)), Math.atan2 (self.imag, self.real));
	});},
	get __pow__ () {return __get__ (this, function (self, other) {
		return self.__log__ ().__mul__ (other).__exp__ ();
	});},
	get __rpow__ () {return __get__ (this, function (self, real) {
		return self.__mul__ (Math.log (real)).__exp__ ();
	});},
	get __mul__ () {return __get__ (this, function (self, other) {
		if (typeof other === 'number') {
			return complex (self.real * other, self.imag * other);
		}
		else {
			return complex (self.real * other.real - self.imag * other.imag, self.real * other.imag + self.imag * other.real);
		}
	});},
	get __rmul__ () {return __get__ (this, function (self, real) {
		return complex (self.real * real, self.imag * real);
	});},
	get __div__ () {return __get__ (this, function (self, other) {
		if (typeof other === 'number') {
			return complex (self.real / other, self.imag / other);
		}
		else {
			var denom = other.real * other.real + other.imag * other.imag;
			return complex ((self.real * other.real + self.imag * other.imag) / denom, (self.imag * other.real - self.real * other.imag) / denom);
		}
	});},
	get __rdiv__ () {return __get__ (this, function (self, real) {
		var denom = self.real * self.real;
		return complex ((real * self.real) / denom, (real * self.imag) / denom);
	});},
	get __add__ () {return __get__ (this, function (self, other) {
		if (typeof other === 'number') {
			return complex (self.real + other, self.imag);
		}
		else {
			return complex (self.real + other.real, self.imag + other.imag);
		}
	});},
	get __radd__ () {return __get__ (this, function (self, real) {
		return complex (self.real + real, self.imag);
	});},
	get __sub__ () {return __get__ (this, function (self, other) {
		if (typeof other === 'number') {
			return complex (self.real - other, self.imag);
		}
		else {
			return complex (self.real - other.real, self.imag - other.imag);
		}
	});},
	get __rsub__ () {return __get__ (this, function (self, real) {
		return complex (real - self.real, -(self.imag));
	});},
	get __repr__ () {return __get__ (this, function (self) {
		return '({}{}{}j)'.format (self.real, (self.imag >= 0 ? '+' : ''), self.imag);
	});},
	get __str__ () {return __get__ (this, function (self) {
		return __repr__ (self).__getslice__ (1, -(1), 1);
	});},
	get __eq__ () {return __get__ (this, function (self, other) {
		if (typeof other === 'number') {
			return self.real == other;
		}
		else {
			return self.real == other.real && self.imag == other.imag;
		}
	});},
	get __ne__ () {return __get__ (this, function (self, other) {
		if (typeof other === 'number') {
			return self.real != other;
		}
		else {
			return self.real != other.real || self.imag != other.imag;
		}
	});},
	get conjugate () {return __get__ (this, function (self) {
		return complex (self.real, -(self.imag));
	});}
});
export var __conj__ = function (aNumber) {
	if (isinstance (aNumber, complex)) {
		return complex (aNumber.real, -(aNumber.imag));
	}
	else {
		return complex (aNumber, 0);
	}
};
export var __Terminal__ =  __class__ ('__Terminal__', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.buffer = '';
		try {
			self.element = document.getElementById ('__terminal__');
		}
		catch (__except0__) {
			self.element = null;
		}
		if (self.element) {
			self.element.style.overflowX = 'auto';
			self.element.style.boxSizing = 'border-box';
			self.element.style.padding = '5px';
			self.element.innerHTML = '_';
		}
	});},
	get print () {return __get__ (this, function (self) {
		var sep = ' ';
		var end = '\n';
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sep': var sep = __allkwargs0__ [__attrib0__]; break;
						case 'end': var end = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.buffer = '{}{}{}'.format (self.buffer, sep.join ((function () {
			var __accu0__ = [];
			for (var arg of args) {
				__accu0__.append (str (arg));
			}
			return __accu0__;
		}) ()), end).__getslice__ (-(4096), null, 1);
		if (self.element) {
			self.element.innerHTML = self.buffer.py_replace ('\n', '<br>').py_replace (' ', '&nbsp');
			self.element.scrollTop = self.element.scrollHeight;
		}
		else {
			console.log (sep.join ((function () {
				var __accu0__ = [];
				for (var arg of args) {
					__accu0__.append (str (arg));
				}
				return __accu0__;
			}) ()));
		}
	});},
	get input () {return __get__ (this, function (self, question) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'question': var question = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.print ('{}'.format (question), __kwargtrans__ ({end: ''}));
		var answer = window.prompt ('\n'.join (self.buffer.py_split ('\n').__getslice__ (-(8), null, 1)));
		self.print (answer);
		return answer;
	});}
});
export var __terminal__ = __Terminal__ ();
export var print = __terminal__.print;
export var input = __terminal__.input;

//# sourceMappingURL=org.transcrypt.__runtime__.map