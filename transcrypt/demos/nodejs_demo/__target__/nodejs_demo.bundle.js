'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Transcrypt'ed from Python, 2018-04-09 10:24:14
var __name__ = 'org.transcrypt.__runtime__';

function __nest__ (headObject, tailNames, value) {
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
}function __get__ (self, func, quotedFuncName) {
    if (self) {
        if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {
            if (quotedFuncName) {
                Object.defineProperty (self, quotedFuncName, {
                    value: function () {
                        var args = [] .slice.apply (arguments);
                        return func.apply (null, [self] .concat (args));
                    },
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [self] .concat (args));
            };
        }
        else {
            return func;
        }
    }
    else {
        return func;
    }
}var py_metatype = {
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
var object = {
    __init__: function (self) {},
    __metaclass__: py_metatype,
    __name__: 'object',
    __bases__: [],
    __new__: function (args) {
        var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
        if ('__getattr__' in this || '__setattr__' in this) {
            instance = new Proxy (instance, {
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
            });
        }
        this.__init__.apply (null, [instance] .concat (args));
        return instance;
    }
};
function __class__ (name, bases, attribs, meta) {
    if (meta === undefined) {
        meta = bases [0] .__metaclass__;
    }
    return meta.__new__ (meta, name, bases, attribs);
}function __kwargtrans__ (anObject) {
    anObject.__kwargtrans__ = null;
    anObject.constructor = Object;
    return anObject;
}
function __setProperty__ (anObject, name, descriptor) {
    if (!anObject.hasOwnProperty (name)) {
        Object.defineProperty (anObject, name, descriptor);
    }
}
function __in__ (element, container) {
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
}function __specialattrib__ (attrib) {
    return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
}function len (anObject) {
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
}function __t__ (target) {
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
function float (any) {
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
}float.__name__ = 'float';
float.__bases__ = [object];
function int (any) {
    return float (any) | 0
}int.__name__ = 'int';
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
    }    function format_float (val) {
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
    }    if (fmt_spec.endswith (['b', 'c', 'd', 'e', 'E', 'f', 'F', 'g', 'G', 'n', 'o', 'x', 'X', '%'])) {
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
        val = val.toUpperCase ();
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
function bool (any) {
    return !!__t__ (any);
}bool.__name__ = 'bool';
bool.__bases__ = [int];
function py_typeof (anObject) {
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
}function issubclass (aClass, classinfo) {
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
}function isinstance (anObject, classinfo) {
    try {
        return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
    }
    catch (exception) {
        return issubclass (py_typeof (anObject), classinfo);
    }
}function repr (anObject) {
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
}function max (nrOrSeq) {
    return arguments.length == 1 ? Math.max (...nrOrSeq) : Math.max (...arguments);
}function min (nrOrSeq) {
    return arguments.length == 1 ? Math.min (...nrOrSeq) : Math.min (...arguments);
}function round (number, ndigits) {
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
}function format (value, fmt_spec) {
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
function __PyIterator__ (iterable) {
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
function __JsIterator__ (iterable) {
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
function list (iterable) {
    var instance = iterable ? Array.from (iterable) : [];
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
    var result = list ([]);
    for (var index = start; index < stop; index += step) {
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
        var sourceIndex = 0;
        for (var targetIndex = start; targetIndex < stop; targetIndex += step) {
            this [targetIndex] = source [sourceIndex++];
        }
    }
};
Array.prototype.__repr__ = function () {
    if (this.__class__ == set && !this.length) {
        return 'set()';
    }
    var result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
    for (var index = 0; index < this.length; index++) {
        if (index) {
            result += ', ';
        }
        result += repr (this [index]);
    }
    if (this.__class__ == tuple && this.length == 1) {
        result += ',';
    }
    result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';    return result;
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
    var index = this.indexOf (element);
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
    var result = this;
    for (var i = 1; i < scalar; i++) {
        result = result.concat (this);
    }
    return result;
};
Array.prototype.__rmul__ = Array.prototype.__mul__;
function tuple (iterable) {
    var instance = iterable ? [] .slice.apply (iterable) : [];
    instance.__class__ = tuple;
    return instance;
}
tuple.__name__ = 'tuple';
tuple.__bases__ = [object];
function set (iterable) {
    var instance = [];
    if (iterable) {
        for (var index = 0; index < iterable.length; index++) {
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
    var mindex = 0;
    var maxdex = this.length - 1;
    while (mindex <= maxdex) {
        var index = (mindex + maxdex) / 2 | 0;
        var middle = this [index] + '';
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
    for (var i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issuperset = function (other) {
    this.sort ();
    for (var i = 0; i < other.length; i++) {
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
    var result = set (this.slice () .sort ());
    for (var i = 0; i < other.length; i++) {
        if (result.__bindexOf__ (other [i]) == -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.intersection = function (other) {
    this.sort ();
    var result = set ();
    for (var i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.difference = function (other) {
    var sother = set (other.slice () .sort ());
    var result = set ();
    for (var i = 0; i < this.length; i++) {
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
    var updated = [] .concat.apply (this.slice (), arguments) .sort ();
    this.py_clear ();
    for (var i = 0; i < updated.length; i++) {
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
    for (var i = 0; i < this.length; i++) {
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
    return this.issubset (other);
};
Array.prototype.__ge__ = function (other) {
    return this.issuperset (other);
};
Array.prototype.__lt__ = function (other) {
    return this.issubset (other) && !this.issuperset (other);
};
Array.prototype.__gt__ = function (other) {
    return this.issuperset (other) && !this.issubset (other);
};
Uint8Array.prototype.__add__ = function (aBytes) {
    var result = new Uint8Array (this.length + aBytes.length);
    result.set (this);
    result.set (aBytes, this.length);
    return result;
};
Uint8Array.prototype.__mul__ = function (scalar) {
    var result = new Uint8Array (scalar * this.length);
    for (var i = 0; i < scalar; i++) {
        result.set (this, i * this.length);
    }
    return result;
};
Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;
function str (stringable) {
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
}String.prototype.__class__ = str;
str.__name__ = 'str';
str.__bases__ = [object];
String.prototype.__iter__ = function () {};
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
    }    if (fmt_spec [fmt_spec.length - 1] == 's') {
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
__setProperty__ (String.prototype, 'format', {
    get: function () {return __get__ (this, function (self) {
        var args = tuple ([] .slice.apply (arguments).slice (1));
        var autoIndex = 0;
        return self.replace (/\{([^\{]*)\}/g, function (match, key) {
            var parts = key.split (':');
            key = parts [0];
            var fmt_spec = parts [1];
            parts = key.split ('!');
            key = parts [0];
            var conversion = parts [1];
            var value = undefined;
            if (key == '') {
                key = autoIndex++;
            }
            if (key == +key && args [key] != undefined) {
                value = args [key];
            }
            else {
                var attr = undefined;
                var idx = key.indexOf ('.');
                if (idx != -1) {
                    attr = key.substring (idx + 1);
                    key = key.substring (0, idx);
                }
                else {
                    idx = key.indexOf ('[');
                    if (idx != -1) {
                        attr = key.substring (idx + 1).slice (0, -1);
                        key = key.substring (0, idx);
                    }
                }
                if ((key == +key) && attr && args [key] != undefined) {
                    value = args [key][attr];
                }
                else {
                    for (var index = 0; index < args.length; index++) {
                        if (typeof args [index] == 'object' && args [index][key] != undefined) {
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
            if (value == undefined) {
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
};
String.prototype.isalpha = function () {
    return /^[a-zA-Z]{1,}$/.test(this)
};
String.prototype.isdecimal = function () {
    return /^[0-9]{1,}$/.test(this)
};
String.prototype.isdigit = function () {
    return this.isdecimal()
};
String.prototype.islower = function () {
    return /^[a-z]{1,}$/.test(this)
};
String.prototype.isupper = function () {
    return /^[A-Z]{1,}$/.test(this)
};
String.prototype.isspace = function () {
    return /^[\s]{1,}$/.test(this)
};
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
        result = this ['py_' + aKey];
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
function dict (objectOrPairs) {
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
    __setProperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
    __setProperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
    __setProperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
    __setProperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
    __setProperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
    __setProperty__ (instance, 'py_items', {value: __items__, enumerable: false});
    __setProperty__ (instance, 'py_del', {value: __del__, enumerable: false});
    __setProperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
    __setProperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
    __setProperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
    __setProperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
    __setProperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
    __setProperty__ (instance, 'py_update', {value: __update__, enumerable: false});
    __setProperty__ (instance, 'py_values', {value: __values__, enumerable: false});
    __setProperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
    __setProperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
    return instance;
}
dict.__name__ = 'dict';
dict.__bases__ = [object];
function __setdoc__ (docString) {
    this.__doc__ = docString;
    return this;
}
__setProperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
function __mod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
}function __mul__ (a, b) {
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
}
var BaseException =  __class__ ('BaseException', [object], {
	__module__: __name__,
});

var Exception =  __class__ ('Exception', [BaseException], {
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
		try {
			self.stack = kwargs.error.stack;
		}
		catch (__except0__) {
			self.stack = 'No stack trace available';
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (len (self.__args__)) {
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
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

var IterableError =  __class__ ('IterableError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
	});}
});

var StopIteration =  __class__ ('StopIteration', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
	});}
});

var ValueError =  __class__ ('ValueError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});

var KeyError =  __class__ ('KeyError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});

var AssertionError =  __class__ ('AssertionError', [Exception], {
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

var NotImplementedError =  __class__ ('NotImplementedError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});

var IndexError =  __class__ ('IndexError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});

var AttributeError =  __class__ ('AttributeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});

var py_TypeError =  __class__ ('py_TypeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});

var Warning =  __class__ ('Warning', [Exception], {
	__module__: __name__,
});

var UserWarning =  __class__ ('UserWarning', [Warning], {
	__module__: __name__,
});

var DeprecationWarning =  __class__ ('DeprecationWarning', [Warning], {
	__module__: __name__,
});

var RuntimeWarning =  __class__ ('RuntimeWarning', [Warning], {
	__module__: __name__,
});
var __sort__ = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {		var key = null;
	}	if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {		var reverse = false;
	}	if (arguments.length) {
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

var __Terminal__ =  __class__ ('__Terminal__', [object], {
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
var __terminal__ = __Terminal__ ();
var print = __terminal__.print;
var input = __terminal__.input;

// Transcrypt'ed from Python, 2018-04-09 10:24:14
try {
	var __language = window.navigator.language;
}
catch (__except0__) {
	var __language = 'en-US';
}
var __debugGetLanguage = function () {
	return __language;
};
var __adapt__ = function (request) {
	__language = request.headers ['accept-language'].py_split (',') [0];
};
var __date = new Date (0);
var __now = new Date ();
var __weekdays = list ([]);
var __weekdays_long = list ([]);
var __d = new Date (1467662339080);
for (var i = 0; i < 7; i++) {
	for (var [l, s] of tuple ([tuple ([__weekdays, 'short']), tuple ([__weekdays_long, 'long'])])) {
		l.append (__d.toLocaleString (__language, dict ({'weekday': s})).lower ());
	}
	__d.setDate (__d.getDate () + 1);
}
var __months = list ([]);
var __months_long = list ([]);
var __d = new Date (946681200000.0);
for (var i = 0; i < 12; i++) {
	for (var [l, s] of tuple ([tuple ([__months, 'short']), tuple ([__months_long, 'long'])])) {
		l.append (__d.toLocaleString (__language, dict ({'month': s})).lower ());
	}
	__d.setMonth (__d.getMonth () + 1);
}
var __lu = dict ({'Y': 0, 'm': 1, 'd': 2, 'H': 3, 'M': 4, 'S': 5});
var _lsplit = function (s, sep, maxsplit) {
	if (maxsplit == 0) {
		return list ([s]);
	}
	var py_split = s.py_split (sep);
	if (!(maxsplit)) {
		return py_split;
	}
	var ret = py_split.slice (0, maxsplit, 1);
	if (len (ret) == len (py_split)) {
		return ret;
	}
	ret.append (sep.join (py_split.__getslice__ (maxsplit, null, 1)));
	return ret;
};
var _local_time_tuple = function (jd) {
	var res = tuple ([jd.getFullYear (), jd.getMonth () + 1, jd.getDate (), jd.getHours (), jd.getMinutes (), jd.getSeconds (), (jd.getDay () > 0 ? jd.getDay () - 1 : 6), _day_of_year (jd, true), _daylight_in_effect (jd), jd.getMilliseconds ()]);
	return res;
};
var _utc_time_tuple = function (jd) {
	var res = tuple ([jd.getUTCFullYear (), jd.getUTCMonth () + 1, jd.getUTCDate (), jd.getUTCHours (), jd.getUTCMinutes (), jd.getUTCSeconds (), jd.getUTCDay () - 1, _day_of_year (jd, false), 0, jd.getUTCMilliseconds ()]);
	return res;
};
var _day_of_year = function (jd, local) {
	var day_offs = 0;
	if (jd.getHours () + (jd.getTimezoneOffset () * 60) / 3600 < 0) {
		var day_offs = -(1);
	}
	var was = jd.getTime ();
	var cur = jd.setHours (23);
	jd.setUTCDate (1);
	jd.setUTCMonth (0);
	jd.setUTCHours (0);
	jd.setUTCMinutes (0);
	jd.setUTCSeconds (0);
	var res = round ((cur - jd) / 86400000);
	if (!(local)) {
		res += day_offs;
	}
	if (res == 0) {
		var res = 365;
		jd.setTime (jd.getTime () - 86400);
		var last_year = jd.getUTCFullYear ();
		if (_is_leap (last_year)) {
			var res = 366;
		}
	}
	jd.setTime (was);
	return res;
};
var _is_leap = function (year) {
	return __mod__ (year, 4) == 0 && (__mod__ (year, 100) != 0 || __mod__ (year, 400) == 0);
};
var __jan_jun_tz = function (t, func) {
	var was = t.getTime ();
	t.setDate (1);
	var res = list ([]);
	for (var m of tuple ([0, 6])) {
		t.setMonth (m);
		if (!(func)) {
			res.append (t.getTimezoneOffset ());
		}
		else {
			res.append (func (t));
		}
	}
	t.setTime (was);
	return res;
};
var _daylight = function (t) {
	var jj = __jan_jun_tz (t);
	if (jj [0] != jj [1]) {
		return 1;
	}
	return 0;
};
var _daylight_in_effect = function (t) {
	var jj = __jan_jun_tz (t);
	if (min (jj [0], jj [1]) == t.getTimezoneOffset ()) {
		return 1;
	}
	return 0;
};
var _timezone = function (t) {
	var jj = __jan_jun_tz (t);
	return max (jj [0], jj [1]);
};
var __tzn = function (t) {
	try {
		return str (t).py_split ('(') [1].py_split (')') [0];
	}
	catch (__except0__) {
		return 'n.a.';
	}
};
var _tzname = function (t) {
	var cn = __tzn (t);
	var ret = list ([cn, cn]);
	var jj = __jan_jun_tz (t, __tzn);
	var ind = 0;
	if (!(_daylight_in_effect (t))) {
		var ind = 1;
	}
	for (var i of jj) {
		if (i != cn) {
			ret [ind] = i;
		}
	}
	return tuple (ret);
};
var altzone = __now.getTimezoneOffset ();
if (!(_daylight_in_effect (__now))) {
	var _jj = __jan_jun_tz (__now);
	var altzone = (altzone == _jj [1] ? _jj [0] : _jj [1]);
}
var altzone = altzone * 60;
var timezone = _timezone (__now) * 60;
var daylight = _daylight (__now);
var tzname = _tzname (__now);
var time = function () {
	return Date.now () / 1000;
};
var asctime = function (t) {
	return strftime ('%a %b %d %H:%M:%S %Y', t);
};
var mktime = function (t) {
	var d = new Date (t [0], t [1] - 1, t [2], t [3], t [4], t [5], 0);
	return (d - 0) / 1000;
};
var ctime = function (seconds) {
	if (!(seconds)) {
		var seconds = time ();
	}
	return asctime (localtime (seconds));
};
var localtime = function (seconds) {
	if (!(seconds)) {
		var seconds = time ();
	}
	return gmtime (seconds, true);
};
var gmtime = function (seconds, localtime) {
	if (!(seconds)) {
		var seconds = time ();
	}
	var millis = seconds * 1000;
	__date.setTime (millis);
	if (localtime) {
		var t = _local_time_tuple (__date);
	}
	else {
		var t = _utc_time_tuple (__date);
	}
	return t.__getslice__ (0, 9, 1);
};
var strptime = function (string, format$$1) {
	if (!(format$$1)) {
		var format$$1 = '%a %b %d %H:%M:%S %Y';
	}
	var __left0__ = tuple ([string, format$$1]);
	var ts = __left0__ [0];
	var fmt = __left0__ [1];
	var get_next = function (fmt) {
		var get_sep = function (fmt) {
			var res = list ([]);
			if (!(fmt)) {
				return tuple (['', '']);
			}
			for (var i = 0; i < len (fmt) - 1; i++) {
				var c = fmt [i];
				if (c == '%') {
					break;
				}
				res.append (c);
			}
			return tuple ([''.join (res), fmt.__getslice__ (i, null, 1)]);
		};
		var __left0__ = tuple ([null, null, null]);
		var d = __left0__ [0];
		var sep = __left0__ [1];
		var f = __left0__ [2];
		if (fmt) {
			if (fmt [0] == '%') {
				var d = fmt [1];
				var __left0__ = get_sep (fmt.__getslice__ (2, null, 1));
				var sep = __left0__ [0];
				var f = __left0__ [1];
			}
			else {
				var __left0__ = get_sep (fmt);
				var sep = __left0__ [0];
				var f = __left0__ [1];
			}
		}
		return tuple ([d, sep, f]);
	};
	var dir_val = dict ({});
	while (ts) {
		var __left0__ = get_next (fmt);
		var d = __left0__ [0];
		var sep = __left0__ [1];
		var fmt = __left0__ [2];
		if (sep == '') {
			var lv = null;
			if (d) {
				var l = -(1);
				if (d == 'Y') {
					var l = 4;
				}
				else if (d == 'a') {
					var l = len (__weekdays [0]);
				}
				else if (d == 'A') {
					var l = len (__weekdays_long [0]);
				}
				else if (d == 'b') {
					var l = len (__months [0]);
				}
				else if (__in__ (d, tuple (['d', 'm', 'H', 'M', 'S']))) {
					var l = 2;
				}
				if (l > -(1)) {
					var lv = list ([ts.__getslice__ (0, l, 1), ts.__getslice__ (l, null, 1)]);
				}
			}
			if (!(lv)) {
				var lv = list ([ts, '']);
			}
		}
		else {
			var lv = _lsplit (ts, sep, 1);
		}
		if (d == null) {
			var ts = lv [1];
			continue;
		}
		var __left0__ = tuple ([lv [1], lv [0]]);
		var ts = __left0__ [0];
		dir_val [d] = __left0__ [1];
		if (fmt == '') {
			break;
		}
	}
	var t = list ([1900, 1, 1, 0, 0, 0, 0, 1, -(1)]);
	var ignore_keys = list ([]);
	var have_weekday = false;
	for (var [d, v] of dir_val.py_items ()) {
		if (__in__ (d, ignore_keys)) {
			continue;
		}
		if (d == 'p') {
			continue;
		}
		if (__in__ (d, __lu.py_keys ())) {
			t [__lu [d]] = int (v);
			continue;
		}
		if (__in__ (d, tuple (['a', 'A', 'b', 'B']))) {
			var v = v.lower ();
		}
		if (d == 'm') {
			ignore_keys.append ('b');
			ignore_keys.append ('B');
		}
		if (d == 'a') {
			if (!(__in__ (v, __weekdays))) {
				var __except0__ = ValueError ('Weekday unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var have_weekday = true;
			t [6] = __weekdays.index (v);
		}
		else if (d == 'A') {
			if (!(__in__ (v, __weekdays_long))) {
				var __except0__ = ValueError ('Weekday unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			var have_weekday = true;
			t [6] = __weekdays_long.index (v);
		}
		else if (d == 'b') {
			if (!(__in__ (v, __months))) {
				var __except0__ = ValueError ('Month unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			t [1] = __months.index (v) + 1;
		}
		else if (d == 'B') {
			if (!(__in__ (v, __months_long))) {
				var __except0__ = ValueError ('Month unknown in your locale');
				__except0__.__cause__ = null;
				throw __except0__;
			}
			t [1] = __months_long.index (v) + 1;
		}
		else if (d == 'I') {
			var ampm = dir_val ['p'] || 'am';
			var ampm = ampm.lower ();
			var v = int (v);
			if (v == 12) {
				var v = 0;
			}
			else if (v > 12) {
				var __except0__ = ValueError (((("time data '" + string) + "' does not match format '") + format$$1) + "'");
				__except0__.__cause__ = null;
				throw __except0__;
			}
			if (ampm == 'pm') {
				v += 12;
			}
			t [__lu ['H']] = v;
		}
		else if (d == 'y') {
			t [0] = 2000 + int (v);
		}
		else if (d == 'Z') {
			if (__in__ (v.lower (), list (['gmt', 'utc']))) {
				t [-(1)] = 0;
			}
		}
	}
	var __date = new Date (0);
	__date.setUTCFullYear (t [0]);
	__date.setUTCMonth (t [1] - 1);
	__date.setUTCDate (t [2]);
	__date.setUTCHours (t [3]);
	t [7] = _day_of_year (__date);
	if (!(have_weekday)) {
		t [6] = __date.getUTCDay () - 1;
	}
	return t;
};
var strftime = function (format$$1, t) {
	var zf2 = function (v) {
		if (v < 10) {
			return '0' + str (v);
		}
		return v;
	};
	if (!(t)) {
		var t = localtime ();
	}
	var f = format$$1;
	for (var d of __lu.py_keys ()) {
		var k = '%' + d;
		if (!(__in__ (k, f))) {
			continue;
		}
		var v = zf2 (t [__lu [d]]);
		var f = f.py_replace (k, v);
	}
	for (var [d, l, pos] of tuple ([tuple (['b', __months, 1]), tuple (['B', __months_long, 1]), tuple (['a', __weekdays, 6]), tuple (['A', __weekdays_long, 6])])) {
		var p = t [pos];
		if (pos == 1) {
			var p = p - 1;
		}
		var v = l [p].capitalize ();
		var f = f.py_replace ('%' + d, v);
	}
	if (__in__ ('%p', f)) {
		if (t [3] > 11) {
			var ap = 'PM';
		}
		else {
			var ap = 'AM';
		}
		var f = f.py_replace ('%p', ap);
	}
	if (__in__ ('%y', f)) {
		var f = f.py_replace ('%y', str (t [0]).__getslice__ (-(2), null, 1));
	}
	if (__in__ ('%I', f)) {
		var v = t [3];
		if (v == 0) {
			var v = 12;
		}
		else if (v > 12) {
			var v = v - 12;
		}
		var f = f.py_replace ('%I', zf2 (v));
	}
	return f;
};

var __module_time__ = /*#__PURE__*/Object.freeze({
    __debugGetLanguage: __debugGetLanguage,
    __adapt__: __adapt__,
    __date: __date,
    __now: __now,
    __weekdays: __weekdays,
    __weekdays_long: __weekdays_long,
    get __d () { return __d; },
    __months: __months,
    __months_long: __months_long,
    __lu: __lu,
    _lsplit: _lsplit,
    _local_time_tuple: _local_time_tuple,
    _utc_time_tuple: _utc_time_tuple,
    _day_of_year: _day_of_year,
    _is_leap: _is_leap,
    __jan_jun_tz: __jan_jun_tz,
    _daylight: _daylight,
    _daylight_in_effect: _daylight_in_effect,
    _timezone: _timezone,
    __tzn: __tzn,
    _tzname: _tzname,
    get altzone () { return altzone; },
    timezone: timezone,
    daylight: daylight,
    tzname: tzname,
    time: time,
    asctime: asctime,
    mktime: mktime,
    ctime: ctime,
    localtime: localtime,
    gmtime: gmtime,
    strptime: strptime,
    strftime: strftime
});

// Transcrypt'ed from Python, 2018-04-09 10:24:14
var time$1 = {};
__nest__ (time$1, '', __module_time__);
var __name__$2 = '__main__';
var http = require ('http');

var Demo =  __class__ ('Demo', [object], {
	__module__: __name__$2,
	texts: tuple (['Welcome to the world of node.js', 'You can have your cake and eat it', "Use node's ecosystem while programming in Python", 'Using node.js from Transcrypt is easy', 'Take a Python ride into the node.js world']),
	get __init__ () {return __get__ (this, function (self, port) {
		print ('Demo server started on port', port);
		self.server = http.createServer (self.serve);
		self.server.listen (port);
		self.oldIndex = 0;
		self.newIndex = 0;
		self.count = 0;
	});},
	get serve () {return __get__ (this, function (self, request, response) {
		time$1.__adapt__ (request);
		response.writeHead (200);
		print ('Serving page', self.count);
		self.count++;
		while (self.newIndex == self.oldIndex) {
			self.newIndex = int (Math.random () * len (self.texts));
		}
		self.oldIndex = self.newIndex;
		response.end ('<h1>{}</h1><h1>{}</h1>'.format (self.texts [self.newIndex], time$1.localtime ()));
	});}
});
var demo = Demo (8090);

exports.http = http;
exports.Demo = Demo;
exports.demo = demo;
