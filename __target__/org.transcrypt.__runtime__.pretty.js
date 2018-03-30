/* 000001 */ // Transcrypt'ed from Python, 2018-03-29 19:52:57
/* 000001 */ var __name__ = 'org.transcrypt.__runtime__';
/* 000003 */ export var __envir__ = {};
/* 000003 */ __envir__.interpreter_name = 'python';
/* 000003 */ __envir__.transpiler_name = 'transcrypt';
/* 000003 */ __envir__.executor_name = __envir__.transpiler_name;
/* 000003 */ __envir__.transpiler_version = '3.7.1';
/* 000003 */ 
/* 000004 */ export function __nest__ (headObject, tailNames, value) {
/* 000004 */     var current = headObject;
/* 000004 */     if (tailNames != '') {
/* 000004 */         var tailChain = tailNames.split ('.');
/* 000004 */         var firstNewIndex = tailChain.length;
/* 000004 */         for (var index = 0; index < tailChain.length; index++) {
/* 000004 */             if (!current.hasOwnProperty (tailChain [index])) {
/* 000004 */                 firstNewIndex = index;
/* 000004 */                 break;
/* 000004 */             }
/* 000004 */             current = current [tailChain [index]];
/* 000004 */         }
/* 000004 */         for (var index = firstNewIndex; index < tailChain.length; index++) {
/* 000004 */             current [tailChain [index]] = {};
/* 000004 */             current = current [tailChain [index]];
/* 000004 */         }
/* 000004 */     }
/* 000004 */     for (let attrib of Object.getOwnPropertyNames (value)) {
/* 000004 */         Object.defineProperty (current, attrib, {
/* 000004 */             get () {return value [attrib];},
/* 000004 */             enumerable: true,
/* 000004 */             configurable: true
/* 000004 */         });
/* 000004 */     }
/* 000004 */ };
/* 000004 */ export function __init__ (module) {
/* 000004 */     if (!module.__inited__) {
/* 000004 */         module.__all__.__init__ (module.__all__);
/* 000004 */         module.__inited__ = true;
/* 000004 */     }
/* 000004 */     return module.__all__;
/* 000004 */ };
/* 000004 */ export function __get__ (self, func, quotedFuncName) {
/* 000004 */     if (self) {
/* 000004 */         if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {
/* 000004 */             if (quotedFuncName) {
/* 000004 */                 Object.defineProperty (self, quotedFuncName, {
/* 000004 */                     value: function () {
/* 000004 */                         var args = [] .slice.apply (arguments);
/* 000004 */                         return func.apply (null, [self] .concat (args));
/* 000004 */                     },
/* 000004 */                     writable: true,
/* 000004 */                     enumerable: true,
/* 000004 */                     configurable: true
/* 000004 */                 });
/* 000004 */             }
/* 000004 */             return function () {
/* 000004 */                 var args = [] .slice.apply (arguments);
/* 000004 */                 return func.apply (null, [self] .concat (args));
/* 000004 */             };
/* 000004 */         }
/* 000004 */         else {
/* 000004 */             return func;
/* 000004 */         }
/* 000004 */     }
/* 000004 */     else {
/* 000004 */         return func;
/* 000004 */     }
/* 000004 */ };
/* 000004 */ export function __getcm__ (self, func, quotedFuncName) {
/* 000004 */     if (self.hasOwnProperty ('__class__')) {
/* 000004 */         return function () {
/* 000004 */             var args = [] .slice.apply (arguments);
/* 000004 */             return func.apply (null, [self.__class__] .concat (args));
/* 000004 */         };
/* 000004 */     }
/* 000004 */     else {
/* 000004 */         return function () {
/* 000004 */             var args = [] .slice.apply (arguments);
/* 000004 */             return func.apply (null, [self] .concat (args));
/* 000004 */         };
/* 000004 */     }
/* 000004 */ };
/* 000004 */ export function __getsm__ (self, func, quotedFuncName) {
/* 000004 */     return func;
/* 000004 */ };
/* 000004 */ export var py_metatype = {
/* 000004 */     __name__: 'type',
/* 000004 */     __bases__: [],
/* 000004 */     __new__: function (meta, name, bases, attribs) {
/* 000004 */         var cls = function () {
/* 000004 */             var args = [] .slice.apply (arguments);
/* 000004 */             return cls.__new__ (args);
/* 000004 */         };
/* 000004 */         for (var index = bases.length - 1; index >= 0; index--) {
/* 000004 */             var base = bases [index];
/* 000004 */             for (var attrib in base) {
/* 000004 */                 var descrip = Object.getOwnPropertyDescriptor (base, attrib);
/* 000004 */                 Object.defineProperty (cls, attrib, descrip);
/* 000004 */             }
/* 000004 */         }
/* 000004 */         cls.__metaclass__ = meta;
/* 000004 */         cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
/* 000004 */         cls.__bases__ = bases;
/* 000004 */         for (var attrib in attribs) {
/* 000004 */             var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
/* 000004 */             Object.defineProperty (cls, attrib, descrip);
/* 000004 */         }
/* 000004 */         return cls;
/* 000004 */     }
/* 000004 */ };
/* 000004 */ py_metatype.__metaclass__ = py_metatype;
/* 000004 */ export var object = {
/* 000004 */     __init__: function (self) {},
/* 000004 */     __metaclass__: py_metatype,
/* 000004 */     __name__: 'object',
/* 000004 */     __bases__: [],
/* 000004 */     __new__: function (args) {
/* 000004 */         var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
/* 000004 */         this.__init__.apply (null, [instance] .concat (args));
/* 000004 */         return instance;
/* 000004 */     }
/* 000004 */ };
/* 000004 */ export function __class__ (name, bases, attribs, meta) {
/* 000004 */     if (meta === undefined) {
/* 000004 */         meta = bases [0] .__metaclass__;
/* 000004 */     }
/* 000004 */     return meta.__new__ (meta, name, bases, attribs);
/* 000004 */ };
/* 000004 */ export function __pragma__ () {};
/* 000005 */ export function __call__ (/* <callee>, <this>, <params>* */) {
/* 000005 */     var args = [] .slice.apply (arguments);
/* 000005 */     if (typeof args [0] == 'object' && '__call__' in args [0]) {
/* 000005 */         return args [0] .__call__ .apply (args [1], args.slice (2));
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return args [0] .apply (args [1], args.slice (2));
/* 000005 */     }
/* 000005 */ };
/* 000005 */ __envir__.executor_name = __envir__.transpiler_name;
/* 000005 */ var __main__ = {__file__: ''};
/* 000005 */ var __except__ = null;
/* 000005 */ export function __kwargtrans__ (anObject) {
/* 000005 */     anObject.__kwargtrans__ = null;
/* 000005 */     anObject.constructor = Object;
/* 000005 */     return anObject;
/* 000005 */ }
/* 000005 */ export function __globals__ (anObject) {
/* 000005 */     if (isinstance (anObject, dict)) {
/* 000005 */         return anObject;
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return dict (anObject)
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function __super__ (aClass, methodName) {
/* 000005 */     for (var index = 0; index < aClass.__bases__.length; index++) {
/* 000005 */         var base = aClass.__bases__ [index];
/* 000005 */         if (methodName in base) {
/* 000005 */            return base [methodName];
/* 000005 */         }
/* 000005 */     }
/* 000005 */     throw new Exception ('Superclass method not found');
/* 000005 */ }
/* 000005 */ export function property (getter, setter) {
/* 000005 */     if (!setter) {
/* 000005 */         setter = function () {};
/* 000005 */     }
/* 000005 */     return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
/* 000005 */ }
/* 000005 */ export function __setProperty__ (anObject, name, descriptor) {
/* 000005 */     if (!anObject.hasOwnProperty (name)) {
/* 000005 */         Object.defineProperty (anObject, name, descriptor);
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function assert (condition, message) {
/* 000005 */     if (!condition) {
/* 000005 */         throw AssertionError (message, new Error ());
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function __merge__ (object0, object1) {
/* 000005 */     var result = {};
/* 000005 */     for (var attrib in object0) {
/* 000005 */         result [attrib] = object0 [attrib];
/* 000005 */     }
/* 000005 */     for (var attrib in object1) {
/* 000005 */         result [attrib] = object1 [attrib];
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ export function dir (obj) {
/* 000005 */     var aList = [];
/* 000005 */     for (var aKey in obj) {
/* 000005 */         aList.push (aKey.startsWith ('py_') ? aKey.slice (3) : aKey);
/* 000005 */     }
/* 000005 */     aList.sort ();
/* 000005 */     return aList;
/* 000005 */ };
/* 000005 */ export function setattr (obj, name, value) {
/* 000005 */     obj [name] = value;
/* 000005 */ };
/* 000005 */ export function getattr (obj, name) {
/* 000005 */     return name in obj ? obj [name] : obj ['py_' + name];
/* 000005 */ };
/* 000005 */ export function hasattr (obj, name) {
/* 000005 */     try {
/* 000005 */         return name in obj || 'py_' + name in obj;
/* 000005 */     }
/* 000005 */     catch (exception) {
/* 000005 */         return false;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function delattr (obj, name) {
/* 000005 */     if (name in obj) {
/* 000005 */         delete obj [name];
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         delete obj ['py_' + name];
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __in__ (element, container) {
/* 000005 */     if (container === undefined || container === null) {
/* 000005 */         return false;
/* 000005 */     }
/* 000005 */     if (container.__contains__ instanceof Function) {
/* 000005 */         return container.__contains__ (element);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return (
/* 000005 */             container.indexOf ?
/* 000005 */             container.indexOf (element) > -1 :
/* 000005 */             container.hasOwnProperty (element)
/* 000005 */         );
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __specialattrib__ (attrib) {
/* 000005 */     return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
/* 000005 */ };
/* 000005 */ export function len (anObject) {
/* 000005 */     if (anObject === undefined || anObject === null) {
/* 000005 */         return 0;
/* 000005 */     }
/* 000005 */     if (anObject.__len__ instanceof Function) {
/* 000005 */         return anObject.__len__ ();
/* 000005 */     }
/* 000005 */     if (anObject.length !== undefined) {
/* 000005 */         return anObject.length;
/* 000005 */     }
/* 000005 */     var length = 0;
/* 000005 */     for (var attr in anObject) {
/* 000005 */         if (!__specialattrib__ (attr)) {
/* 000005 */             length++;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return length;
/* 000005 */ };
/* 000005 */ export function __i__ (any) {
/* 000005 */     return py_typeof (any) == dict ? any.py_keys () : any;
/* 000005 */ }
/* 000005 */ export function __k__ (keyed, key) {
/* 000005 */     var result = keyed [key];
/* 000005 */     if (typeof result == 'undefined') {
/* 000005 */         if (keyed instanceof Array)
/* 000005 */             if (key == +key && key >= 0 && keyed.length > key)
/* 000005 */                 return result;
/* 000005 */             else
/* 000005 */                 throw IndexError (key, new Error());
/* 000005 */         else
/* 000005 */             throw KeyError (key, new Error());
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ }
/* 000005 */ export function __t__ (target) {
/* 000005 */     return (
/* 000005 */         target === undefined || target === null ? false :
/* 000005 */         ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
/* 000005 */         target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
/* 000005 */         target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
/* 000005 */         target instanceof Function ? target :
/* 000005 */         len (target) !== 0 ? target :
/* 000005 */         false
/* 000005 */     );
/* 000005 */ }
/* 000005 */ export function float (any) {
/* 000005 */     if (any == 'inf') {
/* 000005 */         return Infinity;
/* 000005 */     }
/* 000005 */     else if (any == '-inf') {
/* 000005 */         return -Infinity;
/* 000005 */     }
/* 000005 */     else if (any == 'nan') {
/* 000005 */         return NaN;
/* 000005 */     }
/* 000005 */     else if (isNaN (parseFloat (any))) {
/* 000005 */         if (any === false) {
/* 000005 */             return 0;
/* 000005 */         }
/* 000005 */         else if (any === true) {
/* 000005 */             return 1;
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
/* 000005 */         }
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return +any;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ float.__name__ = 'float';
/* 000005 */ float.__bases__ = [object];
/* 000005 */ export function int (any) {
/* 000005 */     return float (any) | 0
/* 000005 */ };
/* 000005 */ int.__name__ = 'int';
/* 000005 */ int.__bases__ = [object];
/* 000005 */ export function bool (any) {
/* 000005 */     return !!__t__ (any);
/* 000005 */ };
/* 000005 */ bool.__name__ = 'bool';
/* 000005 */ bool.__bases__ = [int];
/* 000005 */ export function py_typeof (anObject) {
/* 000005 */     var aType = typeof anObject;
/* 000005 */     if (aType == 'object') {
/* 000005 */         try {
/* 000005 */             return '__class__' in anObject ? anObject.__class__ : object;
/* 000005 */         }
/* 000005 */         catch (exception) {
/* 000005 */             return aType;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return (
/* 000005 */             aType == 'boolean' ? bool :
/* 000005 */             aType == 'string' ? str :
/* 000005 */             aType == 'number' ? (anObject % 1 == 0 ? int : float) :
/* 000005 */             null
/* 000005 */         );
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function issubclass (aClass, classinfo) {
/* 000005 */     if (classinfo instanceof Array) {
/* 000005 */         for (var index = 0; index < classinfo.length; index++) {
/* 000005 */             var aClass2 = classinfo [index];
/* 000005 */             if (issubclass (aClass, aClass2)) {
/* 000005 */                 return true;
/* 000005 */             }
/* 000005 */         }
/* 000005 */         return false;
/* 000005 */     }
/* 000005 */     try {
/* 000005 */         var aClass2 = aClass;
/* 000005 */         if (aClass2 == classinfo) {
/* 000005 */             return true;
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             var bases = [].slice.call (aClass2.__bases__);
/* 000005 */             while (bases.length) {
/* 000005 */                 aClass2 = bases.shift ();
/* 000005 */                 if (aClass2 == classinfo) {
/* 000005 */                     return true;
/* 000005 */                 }
/* 000005 */                 if (aClass2.__bases__.length) {
/* 000005 */                     bases = [].slice.call (aClass2.__bases__).concat (bases);
/* 000005 */                 }
/* 000005 */             }
/* 000005 */             return false;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     catch (exception) {
/* 000005 */         return aClass == classinfo || classinfo == object;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function isinstance (anObject, classinfo) {
/* 000005 */     try {
/* 000005 */         return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
/* 000005 */     }
/* 000005 */     catch (exception) {
/* 000005 */         return issubclass (py_typeof (anObject), classinfo);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function callable (anObject) {
/* 000005 */     return anObject && typeof anObject == 'object' && '__call__' in anObject ? true : typeof anObject === 'function';
/* 000005 */ };
/* 000005 */ export function repr (anObject) {
/* 000005 */     try {
/* 000005 */         return anObject.__repr__ ();
/* 000005 */     }
/* 000005 */     catch (exception) {
/* 000005 */         try {
/* 000005 */             return anObject.__str__ ();
/* 000005 */         }
/* 000005 */         catch (exception) {
/* 000005 */             try {
/* 000005 */                 if (anObject == null) {
/* 000005 */                     return 'None';
/* 000005 */                 }
/* 000005 */                 else if (anObject.constructor == Object) {
/* 000005 */                     var result = '{';
/* 000005 */                     var comma = false;
/* 000005 */                     for (var attrib in anObject) {
/* 000005 */                         if (!__specialattrib__ (attrib)) {
/* 000005 */                             if (attrib.isnumeric ()) {
/* 000005 */                                 var attribRepr = attrib;
/* 000005 */                             }
/* 000005 */                             else {
/* 000005 */                                 var attribRepr = '\'' + attrib + '\'';
/* 000005 */                             }
/* 000005 */                             if (comma) {
/* 000005 */                                 result += ', ';
/* 000005 */                             }
/* 000005 */                             else {
/* 000005 */                                 comma = true;
/* 000005 */                             }
/* 000005 */                             result += attribRepr + ': ' + repr (anObject [attrib]);
/* 000005 */                         }
/* 000005 */                     }
/* 000005 */                     result += '}';
/* 000005 */                     return result;
/* 000005 */                 }
/* 000005 */                 else {
/* 000005 */                     return typeof anObject == 'boolean' ? anObject.toString () .capitalize () : anObject.toString ();
/* 000005 */                 }
/* 000005 */             }
/* 000005 */             catch (exception) {
/* 000005 */                 return '<object of type: ' + typeof anObject + '>';
/* 000005 */             }
/* 000005 */         }
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function chr (charCode) {
/* 000005 */     return String.fromCharCode (charCode);
/* 000005 */ };
/* 000005 */ export function ord (aChar) {
/* 000005 */     return aChar.charCodeAt (0);
/* 000005 */ };
/* 000005 */ export function max (nrOrSeq) {
/* 000005 */     return arguments.length == 1 ? Math.max.apply (null, nrOrSeq) : Math.max.apply (null, arguments);
/* 000005 */ };
/* 000005 */ export function min (nrOrSeq) {
/* 000005 */     return arguments.length == 1 ? Math.min.apply (null, nrOrSeq) : Math.min.apply (null, arguments);
/* 000005 */ };
/* 000005 */ var abs = Math.abs;
/* 000005 */ export function round (number, ndigits) {
/* 000005 */     if (ndigits) {
/* 000005 */         var scale = Math.pow (10, ndigits);
/* 000005 */         number *= scale;
/* 000005 */     }
/* 000005 */     var rounded = Math.round (number);
/* 000005 */     if (rounded - number == 0.5 && rounded % 2) {
/* 000005 */         rounded -= 1;
/* 000005 */     }
/* 000005 */     if (ndigits) {
/* 000005 */         rounded /= scale;
/* 000005 */     }
/* 000005 */     return rounded;
/* 000005 */ };
/* 000005 */ export function __jsUsePyNext__ () {
/* 000005 */     try {
/* 000005 */         var result = this.__next__ ();
/* 000005 */         return {value: result, done: false};
/* 000005 */     }
/* 000005 */     catch (exception) {
/* 000005 */         return {value: undefined, done: true};
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function __pyUseJsNext__ () {
/* 000005 */     var result = this.next ();
/* 000005 */     if (result.done) {
/* 000005 */         throw StopIteration (new Error ());
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return result.value;
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function py_iter (iterable) {
/* 000005 */     if (typeof iterable == 'string' || '__iter__' in iterable) {
/* 000005 */         var result = iterable.__iter__ ();
/* 000005 */         result.next = __jsUsePyNext__;
/* 000005 */     }
/* 000005 */     else if ('selector' in iterable) {
/* 000005 */         var result = list (iterable) .__iter__ ();
/* 000005 */         result.next = __jsUsePyNext__;
/* 000005 */     }
/* 000005 */     else if ('next' in iterable) {
/* 000005 */         var result = iterable
/* 000005 */         if (! ('__next__' in result)) {
/* 000005 */             result.__next__ = __pyUseJsNext__;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     else if (Symbol.iterator in iterable) {
/* 000005 */         var result = iterable [Symbol.iterator] ();
/* 000005 */         result.__next__ = __pyUseJsNext__;
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         throw IterableError (new Error ());
/* 000005 */     }
/* 000005 */     result [Symbol.iterator] = function () {return result;};
/* 000005 */     return result;
/* 000005 */ }
/* 000005 */ export function py_next (iterator) {
/* 000005 */     try {
/* 000005 */         var result = iterator.__next__ ();
/* 000005 */     }
/* 000005 */     catch (exception) {
/* 000005 */         var result = iterator.next ();
/* 000005 */         if (result.done) {
/* 000005 */             throw StopIteration (new Error ());
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             return result.value;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     if (result == undefined) {
/* 000005 */         throw StopIteration (new Error ());
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return result;
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function __PyIterator__ (iterable) {
/* 000005 */     this.iterable = iterable;
/* 000005 */     this.index = 0;
/* 000005 */ }
/* 000005 */ __PyIterator__.prototype.__next__ = function() {
/* 000005 */     if (this.index < this.iterable.length) {
/* 000005 */         return this.iterable [this.index++];
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         throw StopIteration (new Error ());
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __JsIterator__ (iterable) {
/* 000005 */     this.iterable = iterable;
/* 000005 */     this.index = 0;
/* 000005 */ }
/* 000005 */ __JsIterator__.prototype.next = function () {
/* 000005 */     if (this.index < this.iterable.py_keys.length) {
/* 000005 */         return {value: this.index++, done: false};
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return {value: undefined, done: true};
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function py_reversed (iterable) {
/* 000005 */     iterable = iterable.slice ();
/* 000005 */     iterable.reverse ();
/* 000005 */     return iterable;
/* 000005 */ };
/* 000005 */ export function zip () {
/* 000005 */     var args = [] .slice.call (arguments);
/* 000005 */     for (var i = 0; i < args.length; i++) {
/* 000005 */         if (typeof args [i] == 'string') {
/* 000005 */             args [i] = args [i] .split ('');
/* 000005 */         }
/* 000005 */         else if (!Array.isArray (args [i])) {
/* 000005 */             args [i] = Array.from (args [i]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     var shortest = args.length == 0 ? [] : args.reduce (
/* 000005 */         function (array0, array1) {
/* 000005 */             return array0.length < array1.length ? array0 : array1;
/* 000005 */         }
/* 000005 */     );
/* 000005 */     return shortest.map (
/* 000005 */         function (current, index) {
/* 000005 */             return args.map (
/* 000005 */                 function (current) {
/* 000005 */                     return current [index];
/* 000005 */                 }
/* 000005 */             );
/* 000005 */         }
/* 000005 */     );
/* 000005 */ };
/* 000005 */ export function range (start, stop, step) {
/* 000005 */     if (stop == undefined) {
/* 000005 */         stop = start;
/* 000005 */         start = 0;
/* 000005 */     }
/* 000005 */     if (step == undefined) {
/* 000005 */         step = 1;
/* 000005 */     }
/* 000005 */     if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
/* 000005 */         return [];
/* 000005 */     }
/* 000005 */     var result = [];
/* 000005 */     for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
/* 000005 */         result.push(i);
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ export function any (iterable) {
/* 000005 */     for (var index = 0; index < iterable.length; index++) {
/* 000005 */         if (bool (iterable [index])) {
/* 000005 */             return true;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return false;
/* 000005 */ }
/* 000005 */ export function all (iterable) {
/* 000005 */     for (var index = 0; index < iterable.length; index++) {
/* 000005 */         if (! bool (iterable [index])) {
/* 000005 */             return false;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return true;
/* 000005 */ }
/* 000005 */ export function sum (iterable) {
/* 000005 */     var result = 0;
/* 000005 */     for (var index = 0; index < iterable.length; index++) {
/* 000005 */         result += iterable [index];
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ }
/* 000005 */ export function enumerate (iterable) {
/* 000005 */     return zip (range (len (iterable)), iterable);
/* 000005 */ }
/* 000005 */ export function copy (anObject) {
/* 000005 */     if (anObject == null || typeof anObject == "object") {
/* 000005 */         return anObject;
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var result = {};
/* 000005 */         for (var attrib in obj) {
/* 000005 */             if (anObject.hasOwnProperty (attrib)) {
/* 000005 */                 result [attrib] = anObject [attrib];
/* 000005 */             }
/* 000005 */         }
/* 000005 */         return result;
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function deepcopy (anObject) {
/* 000005 */     if (anObject == null || typeof anObject == "object") {
/* 000005 */         return anObject;
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var result = {};
/* 000005 */         for (var attrib in obj) {
/* 000005 */             if (anObject.hasOwnProperty (attrib)) {
/* 000005 */                 result [attrib] = deepcopy (anObject [attrib]);
/* 000005 */             }
/* 000005 */         }
/* 000005 */         return result;
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export function list (iterable) {
/* 000005 */     var instance = iterable ? [] .slice.apply (iterable) : [];
/* 000005 */     return instance;
/* 000005 */ }
/* 000005 */ Array.prototype.__class__ = list;
/* 000005 */ list.__name__ = 'list';
/* 000005 */ list.__bases__ = [object];
/* 000005 */ Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};
/* 000005 */ Array.prototype.__getslice__ = function (start, stop, step) {
/* 000005 */     if (start < 0) {
/* 000005 */         start = this.length + start;
/* 000005 */     }
/* 000005 */     if (stop == null) {
/* 000005 */         stop = this.length;
/* 000005 */     }
/* 000005 */     else if (stop < 0) {
/* 000005 */         stop = this.length + stop;
/* 000005 */     }
/* 000005 */     else if (stop > this.length) {
/* 000005 */         stop = this.length;
/* 000005 */     }
/* 000005 */     var result = list ([]);
/* 000005 */     for (var index = start; index < stop; index += step) {
/* 000005 */         result.push (this [index]);
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Array.prototype.__setslice__ = function (start, stop, step, source) {
/* 000005 */     if (start < 0) {
/* 000005 */         start = this.length + start;
/* 000005 */     }
/* 000005 */     if (stop == null) {
/* 000005 */         stop = this.length;
/* 000005 */     }
/* 000005 */     else if (stop < 0) {
/* 000005 */         stop = this.length + stop;
/* 000005 */     }
/* 000005 */     if (step == null) {
/* 000005 */         Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var sourceIndex = 0;
/* 000005 */         for (var targetIndex = start; targetIndex < stop; targetIndex += step) {
/* 000005 */             this [targetIndex] = source [sourceIndex++];
/* 000005 */         }
/* 000005 */     }
/* 000005 */ };
/* 000005 */ Array.prototype.__repr__ = function () {
/* 000005 */     if (this.__class__ == set && !this.length) {
/* 000005 */         return 'set()';
/* 000005 */     }
/* 000005 */     var result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
/* 000005 */     for (var index = 0; index < this.length; index++) {
/* 000005 */         if (index) {
/* 000005 */             result += ', ';
/* 000005 */         }
/* 000005 */         result += repr (this [index]);
/* 000005 */     }
/* 000005 */     if (this.__class__ == tuple && this.length == 1) {
/* 000005 */         result += ',';
/* 000005 */     }
/* 000005 */     result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';;
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Array.prototype.__str__ = Array.prototype.__repr__;
/* 000005 */ Array.prototype.append = function (element) {
/* 000005 */     this.push (element);
/* 000005 */ };
/* 000005 */ Array.prototype.py_clear = function () {
/* 000005 */     this.length = 0;
/* 000005 */ };
/* 000005 */ Array.prototype.extend = function (aList) {
/* 000005 */     this.push.apply (this, aList);
/* 000005 */ };
/* 000005 */ Array.prototype.insert = function (index, element) {
/* 000005 */     this.splice (index, 0, element);
/* 000005 */ };
/* 000005 */ Array.prototype.remove = function (element) {
/* 000005 */     var index = this.indexOf (element);
/* 000005 */     if (index == -1) {
/* 000005 */         throw ValueError ("list.remove(x): x not in list", new Error ());
/* 000005 */     }
/* 000005 */     this.splice (index, 1);
/* 000005 */ };
/* 000005 */ Array.prototype.index = function (element) {
/* 000005 */     return this.indexOf (element);
/* 000005 */ };
/* 000005 */ Array.prototype.py_pop = function (index) {
/* 000005 */     if (index == undefined) {
/* 000005 */         return this.pop ();
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return this.splice (index, 1) [0];
/* 000005 */     }
/* 000005 */ };
/* 000005 */ Array.prototype.py_sort = function () {
/* 000005 */     __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
/* 000005 */ };
/* 000005 */ Array.prototype.__add__ = function (aList) {
/* 000005 */     return list (this.concat (aList));
/* 000005 */ };
/* 000005 */ Array.prototype.__mul__ = function (scalar) {
/* 000005 */     var result = this;
/* 000005 */     for (var i = 1; i < scalar; i++) {
/* 000005 */         result = result.concat (this);
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Array.prototype.__rmul__ = Array.prototype.__mul__;
/* 000005 */ export function tuple (iterable) {
/* 000005 */     var instance = iterable ? [] .slice.apply (iterable) : [];
/* 000005 */     instance.__class__ = tuple;
/* 000005 */     return instance;
/* 000005 */ }
/* 000005 */ tuple.__name__ = 'tuple';
/* 000005 */ tuple.__bases__ = [object];
/* 000005 */ export function set (iterable) {
/* 000005 */     var instance = [];
/* 000005 */     if (iterable) {
/* 000005 */         for (var index = 0; index < iterable.length; index++) {
/* 000005 */             instance.add (iterable [index]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     instance.__class__ = set;
/* 000005 */     return instance;
/* 000005 */ }
/* 000005 */ set.__name__ = 'set';
/* 000005 */ set.__bases__ = [object];
/* 000005 */ Array.prototype.__bindexOf__ = function (element) {
/* 000005 */     element += '';
/* 000005 */     var mindex = 0;
/* 000005 */     var maxdex = this.length - 1;
/* 000005 */     while (mindex <= maxdex) {
/* 000005 */         var index = (mindex + maxdex) / 2 | 0;
/* 000005 */         var middle = this [index] + '';
/* 000005 */         if (middle < element) {
/* 000005 */             mindex = index + 1;
/* 000005 */         }
/* 000005 */         else if (middle > element) {
/* 000005 */             maxdex = index - 1;
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             return index;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return -1;
/* 000005 */ };
/* 000005 */ Array.prototype.add = function (element) {
/* 000005 */     if (this.indexOf (element) == -1) {
/* 000005 */         this.push (element);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ Array.prototype.discard = function (element) {
/* 000005 */     var index = this.indexOf (element);
/* 000005 */     if (index != -1) {
/* 000005 */         this.splice (index, 1);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ Array.prototype.isdisjoint = function (other) {
/* 000005 */     this.sort ();
/* 000005 */     for (var i = 0; i < other.length; i++) {
/* 000005 */         if (this.__bindexOf__ (other [i]) != -1) {
/* 000005 */             return false;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return true;
/* 000005 */ };
/* 000005 */ Array.prototype.issuperset = function (other) {
/* 000005 */     this.sort ();
/* 000005 */     for (var i = 0; i < other.length; i++) {
/* 000005 */         if (this.__bindexOf__ (other [i]) == -1) {
/* 000005 */             return false;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return true;
/* 000005 */ };
/* 000005 */ Array.prototype.issubset = function (other) {
/* 000005 */     return set (other.slice ()) .issuperset (this);
/* 000005 */ };
/* 000005 */ Array.prototype.union = function (other) {
/* 000005 */     var result = set (this.slice () .sort ());
/* 000005 */     for (var i = 0; i < other.length; i++) {
/* 000005 */         if (result.__bindexOf__ (other [i]) == -1) {
/* 000005 */             result.push (other [i]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Array.prototype.intersection = function (other) {
/* 000005 */     this.sort ();
/* 000005 */     var result = set ();
/* 000005 */     for (var i = 0; i < other.length; i++) {
/* 000005 */         if (this.__bindexOf__ (other [i]) != -1) {
/* 000005 */             result.push (other [i]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Array.prototype.difference = function (other) {
/* 000005 */     var sother = set (other.slice () .sort ());
/* 000005 */     var result = set ();
/* 000005 */     for (var i = 0; i < this.length; i++) {
/* 000005 */         if (sother.__bindexOf__ (this [i]) == -1) {
/* 000005 */             result.push (this [i]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Array.prototype.symmetric_difference = function (other) {
/* 000005 */     return this.union (other) .difference (this.intersection (other));
/* 000005 */ };
/* 000005 */ Array.prototype.py_update = function () {
/* 000005 */     var updated = [] .concat.apply (this.slice (), arguments) .sort ();
/* 000005 */     this.py_clear ();
/* 000005 */     for (var i = 0; i < updated.length; i++) {
/* 000005 */         if (updated [i] != updated [i - 1]) {
/* 000005 */             this.push (updated [i]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */ };
/* 000005 */ Array.prototype.__eq__ = function (other) {
/* 000005 */     if (this.length != other.length) {
/* 000005 */         return false;
/* 000005 */     }
/* 000005 */     if (this.__class__ == set) {
/* 000005 */         this.sort ();
/* 000005 */         other.sort ();
/* 000005 */     }
/* 000005 */     for (var i = 0; i < this.length; i++) {
/* 000005 */         if (this [i] != other [i]) {
/* 000005 */             return false;
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return true;
/* 000005 */ };
/* 000005 */ Array.prototype.__ne__ = function (other) {
/* 000005 */     return !this.__eq__ (other);
/* 000005 */ };
/* 000005 */ Array.prototype.__le__ = function (other) {
/* 000005 */     return this.issubset (other);
/* 000005 */ };
/* 000005 */ Array.prototype.__ge__ = function (other) {
/* 000005 */     return this.issuperset (other);
/* 000005 */ };
/* 000005 */ Array.prototype.__lt__ = function (other) {
/* 000005 */     return this.issubset (other) && !this.issuperset (other);
/* 000005 */ };
/* 000005 */ Array.prototype.__gt__ = function (other) {
/* 000005 */     return this.issuperset (other) && !this.issubset (other);
/* 000005 */ };
/* 000005 */ export function bytearray (bytable, encoding) {
/* 000005 */     if (bytable == undefined) {
/* 000005 */         return new Uint8Array (0);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var aType = py_typeof (bytable);
/* 000005 */         if (aType == int) {
/* 000005 */             return new Uint8Array (bytable);
/* 000005 */         }
/* 000005 */         else if (aType == str) {
/* 000005 */             var aBytes = new Uint8Array (len (bytable));
/* 000005 */             for (var i = 0; i < len (bytable); i++) {
/* 000005 */                 aBytes [i] = bytable.charCodeAt (i);
/* 000005 */             }
/* 000005 */             return aBytes;
/* 000005 */         }
/* 000005 */         else if (aType == list || aType == tuple) {
/* 000005 */             return new Uint8Array (bytable);
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             throw py_TypeError;
/* 000005 */         }
/* 000005 */     }
/* 000005 */ }
/* 000005 */ export var bytes = bytearray;
/* 000005 */ Uint8Array.prototype.__add__ = function (aBytes) {
/* 000005 */     var result = new Uint8Array (this.length + aBytes.length);
/* 000005 */     result.set (this);
/* 000005 */     result.set (aBytes, this.length);
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Uint8Array.prototype.__mul__ = function (scalar) {
/* 000005 */     var result = new Uint8Array (scalar * this.length);
/* 000005 */     for (var i = 0; i < scalar; i++) {
/* 000005 */         result.set (this, i * this.length);
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;
/* 000005 */ export function str (stringable) {
/* 000005 */     if (typeof stringable === 'number')
/* 000005 */         return stringable.toString();
/* 000005 */     else {
/* 000005 */         try {
/* 000005 */             return stringable.__str__ ();
/* 000005 */         }
/* 000005 */         catch (exception) {
/* 000005 */             try {
/* 000005 */                 return repr (stringable);
/* 000005 */             }
/* 000005 */             catch (exception) {
/* 000005 */                 return String (stringable);
/* 000005 */             }
/* 000005 */         }
/* 000005 */     }
/* 000005 */ };
/* 000005 */ String.prototype.__class__ = str;
/* 000005 */ str.__name__ = 'str';
/* 000005 */ str.__bases__ = [object];
/* 000005 */ String.prototype.__iter__ = function () {new __PyIterator__ (this);};
/* 000005 */ String.prototype.__repr__ = function () {
/* 000005 */     return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .py_replace ('\t', '\\t') .py_replace ('\n', '\\n');
/* 000005 */ };
/* 000005 */ String.prototype.__str__ = function () {
/* 000005 */     return this;
/* 000005 */ };
/* 000005 */ String.prototype.capitalize = function () {
/* 000005 */     return this.charAt (0).toUpperCase () + this.slice (1);
/* 000005 */ };
/* 000005 */ String.prototype.endswith = function (suffix) {
/* 000005 */     if (suffix instanceof Array) {
/* 000005 */         for (var i=0;i<suffix.length;i++) {
/* 000005 */             if (this.slice (-suffix[i].length) == suffix[i])
/* 000005 */                 return true;
/* 000005 */         }
/* 000005 */     } else
/* 000005 */         return suffix == '' || this.slice (-suffix.length) == suffix;
/* 000005 */     return false;
/* 000005 */ };
/* 000005 */ String.prototype.find = function (sub, start) {
/* 000005 */     return this.indexOf (sub, start);
/* 000005 */ };
/* 000005 */ String.prototype.__getslice__ = function (start, stop, step) {
/* 000005 */     if (start < 0) {
/* 000005 */         start = this.length + start;
/* 000005 */     }
/* 000005 */     if (stop == null) {
/* 000005 */         stop = this.length;
/* 000005 */     }
/* 000005 */     else if (stop < 0) {
/* 000005 */         stop = this.length + stop;
/* 000005 */     }
/* 000005 */     var result = '';
/* 000005 */     if (step == 1) {
/* 000005 */         result = this.substring (start, stop);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         for (var index = start; index < stop; index += step) {
/* 000005 */             result = result.concat (this.charAt(index));
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ __setProperty__ (String.prototype, 'format', {
/* 000005 */     get: function () {return __get__ (this, function (self) {
/* 000005 */         var args = tuple ([] .slice.apply (arguments).slice (1));
/* 000005 */         var autoIndex = 0;
/* 000005 */         return self.replace (/\{(\w*)\}/g, function (match, key) {
/* 000005 */             if (key == '') {
/* 000005 */                 key = autoIndex++;
/* 000005 */             }
/* 000005 */             if (key == +key) {
/* 000005 */                 return args [key] == undefined ? match : str (args [key]);
/* 000005 */             }
/* 000005 */             else {
/* 000005 */                 for (var index = 0; index < args.length; index++) {
/* 000005 */                     if (typeof args [index] == 'object' && args [index][key] != undefined) {
/* 000005 */                         return str (args [index][key]);
/* 000005 */                     }
/* 000005 */                 }
/* 000005 */                 return match;
/* 000005 */             }
/* 000005 */         });
/* 000005 */     });},
/* 000005 */     enumerable: true
/* 000005 */ });
/* 000005 */ String.prototype.isalnum = function () {
/* 000005 */     return /^[0-9a-zA-Z]{1,}$/.test(this)
/* 000005 */ }
/* 000005 */ String.prototype.isalpha = function () {
/* 000005 */     return /^[a-zA-Z]{1,}$/.test(this)
/* 000005 */ }
/* 000005 */ String.prototype.isdecimal = function () {
/* 000005 */     return /^[0-9]{1,}$/.test(this)
/* 000005 */ }
/* 000005 */ String.prototype.isdigit = function () {
/* 000005 */     return this.isdecimal()
/* 000005 */ }
/* 000005 */ String.prototype.islower = function () {
/* 000005 */     return /^[a-z]{1,}$/.test(this)
/* 000005 */ }
/* 000005 */ String.prototype.isupper = function () {
/* 000005 */     return /^[A-Z]{1,}$/.test(this)
/* 000005 */ }
/* 000005 */ String.prototype.isspace = function () {
/* 000005 */     return /^[\s]{1,}$/.test(this)
/* 000005 */ }
/* 000005 */ String.prototype.isnumeric = function () {
/* 000005 */     return !isNaN (parseFloat (this)) && isFinite (this);
/* 000005 */ };
/* 000005 */ String.prototype.join = function (strings) {
/* 000005 */     return strings.join (this);
/* 000005 */ };
/* 000005 */ String.prototype.lower = function () {
/* 000005 */     return this.toLowerCase ();
/* 000005 */ };
/* 000005 */ String.prototype.py_replace = function (old, aNew, maxreplace) {
/* 000005 */     return this.split (old, maxreplace) .join (aNew);
/* 000005 */ };
/* 000005 */ String.prototype.lstrip = function () {
/* 000005 */     return this.replace (/^\s*/g, '');
/* 000005 */ };
/* 000005 */ String.prototype.rfind = function (sub, start) {
/* 000005 */     return this.lastIndexOf (sub, start);
/* 000005 */ };
/* 000005 */ String.prototype.rsplit = function (sep, maxsplit) {
/* 000005 */     if (sep == undefined || sep == null) {
/* 000005 */         sep = /\s+/;
/* 000005 */         var stripped = this.strip ();
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var stripped = this;
/* 000005 */     }
/* 000005 */     if (maxsplit == undefined || maxsplit == -1) {
/* 000005 */         return stripped.split (sep);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var result = stripped.split (sep);
/* 000005 */         if (maxsplit < result.length) {
/* 000005 */             var maxrsplit = result.length - maxsplit;
/* 000005 */             return [result.slice (0, maxrsplit) .join (sep)] .concat (result.slice (maxrsplit));
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             return result;
/* 000005 */         }
/* 000005 */     }
/* 000005 */ };
/* 000005 */ String.prototype.rstrip = function () {
/* 000005 */     return this.replace (/\s*$/g, '');
/* 000005 */ };
/* 000005 */ String.prototype.py_split = function (sep, maxsplit) {
/* 000005 */     if (sep == undefined || sep == null) {
/* 000005 */         sep = /\s+/;
/* 000005 */         var stripped = this.strip ();
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var stripped = this;
/* 000005 */     }
/* 000005 */     if (maxsplit == undefined || maxsplit == -1) {
/* 000005 */         return stripped.split (sep);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         var result = stripped.split (sep);
/* 000005 */         if (maxsplit < result.length) {
/* 000005 */             return result.slice (0, maxsplit).concat ([result.slice (maxsplit).join (sep)]);
/* 000005 */         }
/* 000005 */         else {
/* 000005 */             return result;
/* 000005 */         }
/* 000005 */     }
/* 000005 */ };
/* 000005 */ String.prototype.startswith = function (prefix) {
/* 000005 */     if (prefix instanceof Array) {
/* 000005 */         for (var i=0;i<prefix.length;i++) {
/* 000005 */             if (this.indexOf (prefix [i]) == 0)
/* 000005 */                 return true;
/* 000005 */         }
/* 000005 */     } else
/* 000005 */         return this.indexOf (prefix) == 0;
/* 000005 */     return false;
/* 000005 */ };
/* 000005 */ String.prototype.strip = function () {
/* 000005 */     return this.trim ();
/* 000005 */ };
/* 000005 */ String.prototype.upper = function () {
/* 000005 */     return this.toUpperCase ();
/* 000005 */ };
/* 000005 */ String.prototype.__mul__ = function (scalar) {
/* 000005 */     var result = '';
/* 000005 */     for (var i = 0; i < scalar; i++) {
/* 000005 */         result = result + this;
/* 000005 */     }
/* 000005 */     return result;
/* 000005 */ };
/* 000005 */ String.prototype.__rmul__ = String.prototype.__mul__;
/* 000005 */ function __contains__ (element) {
/* 000005 */     return this.hasOwnProperty (element);
/* 000005 */ }
/* 000005 */ function __keys__ () {
/* 000005 */     var keys = [];
/* 000005 */     for (var attrib in this) {
/* 000005 */         if (!__specialattrib__ (attrib)) {
/* 000005 */             keys.push (attrib);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return keys;
/* 000005 */ }
/* 000005 */ function __items__ () {
/* 000005 */     var items = [];
/* 000005 */     for (var attrib in this) {
/* 000005 */         if (!__specialattrib__ (attrib)) {
/* 000005 */             items.push ([attrib, this [attrib]]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return items;
/* 000005 */ }
/* 000005 */ function __del__ (key) {
/* 000005 */     delete this [key];
/* 000005 */ }
/* 000005 */ function __clear__ () {
/* 000005 */     for (var attrib in this) {
/* 000005 */         delete this [attrib];
/* 000005 */     }
/* 000005 */ }
/* 000005 */ function __getdefault__ (aKey, aDefault) {
/* 000005 */     var result = this [aKey];
/* 000005 */     if (result == undefined) {
/* 000005 */         result = this ['py_' + aKey]
/* 000005 */     }
/* 000005 */     return result == undefined ? (aDefault == undefined ? null : aDefault) : result;
/* 000005 */ }
/* 000005 */ function __setdefault__ (aKey, aDefault) {
/* 000005 */     var result = this [aKey];
/* 000005 */     if (result != undefined) {
/* 000005 */         return result;
/* 000005 */     }
/* 000005 */     var val = aDefault == undefined ? null : aDefault;
/* 000005 */     this [aKey] = val;
/* 000005 */     return val;
/* 000005 */ }
/* 000005 */ function __pop__ (aKey, aDefault) {
/* 000005 */     var result = this [aKey];
/* 000005 */     if (result != undefined) {
/* 000005 */         delete this [aKey];
/* 000005 */         return result;
/* 000005 */     } else {
/* 000005 */         if ( aDefault === undefined ) {
/* 000005 */             throw KeyError (aKey, new Error());
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return aDefault;
/* 000005 */ }
/* 000005 */ function __popitem__ () {
/* 000005 */     var aKey = Object.keys (this) [0];
/* 000005 */     if (aKey == null) {
/* 000005 */         throw KeyError ("popitem(): dictionary is empty", new Error ());
/* 000005 */     }
/* 000005 */     var result = tuple ([aKey, this [aKey]]);
/* 000005 */     delete this [aKey];
/* 000005 */     return result;
/* 000005 */ }
/* 000005 */ function __update__ (aDict) {
/* 000005 */     for (var aKey in aDict) {
/* 000005 */         this [aKey] = aDict [aKey];
/* 000005 */     }
/* 000005 */ }
/* 000005 */ function __values__ () {
/* 000005 */     var values = [];
/* 000005 */     for (var attrib in this) {
/* 000005 */         if (!__specialattrib__ (attrib)) {
/* 000005 */             values.push (this [attrib]);
/* 000005 */         }
/* 000005 */     }
/* 000005 */     return values;
/* 000005 */ }
/* 000005 */ function __dgetitem__ (aKey) {
/* 000005 */     return this [aKey];
/* 000005 */ }
/* 000005 */ function __dsetitem__ (aKey, aValue) {
/* 000005 */     this [aKey] = aValue;
/* 000005 */ }
/* 000005 */ export function dict (objectOrPairs) {
/* 000005 */     var instance = {};
/* 000005 */     if (!objectOrPairs || objectOrPairs instanceof Array) {
/* 000005 */         if (objectOrPairs) {
/* 000005 */             for (var index = 0; index < objectOrPairs.length; index++) {
/* 000005 */                 var pair = objectOrPairs [index];
/* 000005 */                 if ( !(pair instanceof Array) || pair.length != 2) {
/* 000005 */                     throw ValueError(
/* 000005 */                         "dict update sequence element #" + index +
/* 000005 */                         " has length " + pair.length +
/* 000005 */                         "; 2 is required", new Error());
/* 000005 */                 }
/* 000005 */                 var key = pair [0];
/* 000005 */                 var val = pair [1];
/* 000005 */                 if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
/* 000005 */                      if (!isinstance (objectOrPairs, dict)) {
/* 000005 */                          val = dict (val);
/* 000005 */                      }
/* 000005 */                 }
/* 000005 */                 instance [key] = val;
/* 000005 */             }
/* 000005 */         }
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         if (isinstance (objectOrPairs, dict)) {
/* 000005 */             var aKeys = objectOrPairs.py_keys ();
/* 000005 */             for (var index = 0; index < aKeys.length; index++ ) {
/* 000005 */                 var key = aKeys [index];
/* 000005 */                 instance [key] = objectOrPairs [key];
/* 000005 */             }
/* 000005 */         } else if (objectOrPairs instanceof Object) {
/* 000005 */             instance = objectOrPairs;
/* 000005 */         } else {
/* 000005 */             throw ValueError ("Invalid type of object for dict creation", new Error ());
/* 000005 */         }
/* 000005 */     }
/* 000005 */     __setProperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
/* 000005 */     __setProperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
/* 000005 */     __setProperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
/* 000005 */     __setProperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_items', {value: __items__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_del', {value: __del__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_update', {value: __update__, enumerable: false});
/* 000005 */     __setProperty__ (instance, 'py_values', {value: __values__, enumerable: false});
/* 000005 */     __setProperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
/* 000005 */     __setProperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
/* 000005 */     return instance;
/* 000005 */ }
/* 000005 */ dict.__name__ = 'dict';
/* 000005 */ dict.__bases__ = [object];
/* 000005 */ function __setdoc__ (docString) {
/* 000005 */     this.__doc__ = docString;
/* 000005 */     return this;
/* 000005 */ }
/* 000005 */ __setProperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
/* 000005 */ export function __jsmod__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__mod__' in a) {
/* 000005 */         return a.__mod__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rmod__' in b) {
/* 000005 */         return b.__rmod__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a % b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __mod__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__mod__' in a) {
/* 000005 */         return a.__mod__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rmod__' in b) {
/* 000005 */         return b.__rmod__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return ((a % b) + b) % b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __pow__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__pow__' in a) {
/* 000005 */         return a.__pow__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rpow__' in b) {
/* 000005 */         return b.__rpow__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return Math.pow (a, b);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __neg__ (a) {
/* 000005 */     if (typeof a == 'object' && '__neg__' in a) {
/* 000005 */         return a.__neg__ ();
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return -a;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __matmul__ (a, b) {
/* 000005 */     return a.__matmul__ (b);
/* 000005 */ };
/* 000005 */ export function __mul__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__mul__' in a) {
/* 000005 */         return a.__mul__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rmul__' in b) {
/* 000005 */         return b.__rmul__ (a);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'string') {
/* 000005 */         return a.__mul__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'string') {
/* 000005 */         return b.__rmul__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a * b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __truediv__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__truediv__' in a) {
/* 000005 */         return a.__truediv__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rtruediv__' in b) {
/* 000005 */         return b.__rtruediv__ (a);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__div__' in a) {
/* 000005 */         return a.__div__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rdiv__' in b) {
/* 000005 */         return b.__rdiv__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a / b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __floordiv__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__floordiv__' in a) {
/* 000005 */         return a.__floordiv__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rfloordiv__' in b) {
/* 000005 */         return b.__rfloordiv__ (a);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__div__' in a) {
/* 000005 */         return a.__div__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rdiv__' in b) {
/* 000005 */         return b.__rdiv__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return Math.floor (a / b);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __add__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__add__' in a) {
/* 000005 */         return a.__add__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__radd__' in b) {
/* 000005 */         return b.__radd__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a + b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __sub__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__sub__' in a) {
/* 000005 */         return a.__sub__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rsub__' in b) {
/* 000005 */         return b.__rsub__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a - b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __lshift__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__lshift__' in a) {
/* 000005 */         return a.__lshift__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rlshift__' in b) {
/* 000005 */         return b.__rlshift__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a << b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __rshift__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__rshift__' in a) {
/* 000005 */         return a.__rshift__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rrshift__' in b) {
/* 000005 */         return b.__rrshift__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a >> b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __or__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__or__' in a) {
/* 000005 */         return a.__or__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__ror__' in b) {
/* 000005 */         return b.__ror__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a | b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __xor__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__xor__' in a) {
/* 000005 */         return a.__xor__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rxor__' in b) {
/* 000005 */         return b.__rxor__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a ^ b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __and__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__and__' in a) {
/* 000005 */         return a.__and__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rand__' in b) {
/* 000005 */         return b.__rand__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a & b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __eq__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__eq__' in a) {
/* 000005 */         return a.__eq__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a == b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ne__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__ne__' in a) {
/* 000005 */         return a.__ne__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a != b
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __lt__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__lt__' in a) {
/* 000005 */         return a.__lt__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a < b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __le__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__le__' in a) {
/* 000005 */         return a.__le__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a <= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __gt__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__gt__' in a) {
/* 000005 */         return a.__gt__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a > b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ge__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__ge__' in a) {
/* 000005 */         return a.__ge__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a >= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __imatmul__ (a, b) {
/* 000005 */     if ('__imatmul__' in a) {
/* 000005 */         return a.__imatmul__ (b);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a.__matmul__ (b);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ipow__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__pow__' in a) {
/* 000005 */         return a.__ipow__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__ipow__' in a) {
/* 000005 */         return a.__pow__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rpow__' in b) {
/* 000005 */         return b.__rpow__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return Math.pow (a, b);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ijsmod__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__imod__' in a) {
/* 000005 */         return a.__ismod__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__mod__' in a) {
/* 000005 */         return a.__mod__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rpow__' in b) {
/* 000005 */         return b.__rmod__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a % b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __imod__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__imod__' in a) {
/* 000005 */         return a.__imod__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__mod__' in a) {
/* 000005 */         return a.__mod__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rmod__' in b) {
/* 000005 */         return b.__rmod__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return ((a % b) + b) % b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __imul__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__imul__' in a) {
/* 000005 */         return a.__imul__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__mul__' in a) {
/* 000005 */         return a = a.__mul__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rmul__' in b) {
/* 000005 */         return a = b.__rmul__ (a);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'string') {
/* 000005 */         return a = a.__mul__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'string') {
/* 000005 */         return a = b.__rmul__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a *= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __idiv__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__idiv__' in a) {
/* 000005 */         return a.__idiv__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__div__' in a) {
/* 000005 */         return a = a.__div__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rdiv__' in b) {
/* 000005 */         return a = b.__rdiv__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a /= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __iadd__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__iadd__' in a) {
/* 000005 */         return a.__iadd__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__add__' in a) {
/* 000005 */         return a = a.__add__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__radd__' in b) {
/* 000005 */         return a = b.__radd__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a += b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __isub__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__isub__' in a) {
/* 000005 */         return a.__isub__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__sub__' in a) {
/* 000005 */         return a = a.__sub__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rsub__' in b) {
/* 000005 */         return a = b.__rsub__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a -= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ilshift__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__ilshift__' in a) {
/* 000005 */         return a.__ilshift__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__lshift__' in a) {
/* 000005 */         return a = a.__lshift__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rlshift__' in b) {
/* 000005 */         return a = b.__rlshift__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a <<= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __irshift__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__irshift__' in a) {
/* 000005 */         return a.__irshift__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__rshift__' in a) {
/* 000005 */         return a = a.__rshift__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rrshift__' in b) {
/* 000005 */         return a = b.__rrshift__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a >>= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ior__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__ior__' in a) {
/* 000005 */         return a.__ior__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__or__' in a) {
/* 000005 */         return a = a.__or__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__ror__' in b) {
/* 000005 */         return a = b.__ror__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a |= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __ixor__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__ixor__' in a) {
/* 000005 */         return a.__ixor__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__xor__' in a) {
/* 000005 */         return a = a.__xor__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rxor__' in b) {
/* 000005 */         return a = b.__rxor__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a ^= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __iand__ (a, b) {
/* 000005 */     if (typeof a == 'object' && '__iand__' in a) {
/* 000005 */         return a.__iand__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof a == 'object' && '__and__' in a) {
/* 000005 */         return a = a.__and__ (b);
/* 000005 */     }
/* 000005 */     else if (typeof b == 'object' && '__rand__' in b) {
/* 000005 */         return a = b.__rand__ (a);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return a &= b;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __getitem__ (container, key) {
/* 000005 */     if (typeof container == 'object' && '__getitem__' in container) {
/* 000005 */         return container.__getitem__ (key);
/* 000005 */     }
/* 000005 */     else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
/* 000005 */         return container [container.length + key];
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return container [key];
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __setitem__ (container, key, value) {
/* 000005 */     if (typeof container == 'object' && '__setitem__' in container) {
/* 000005 */         container.__setitem__ (key, value);
/* 000005 */     }
/* 000005 */     else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
/* 000005 */         container [container.length + key] = value;
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         container [key] = value;
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __getslice__ (container, lower, upper, step) {
/* 000005 */     if (typeof container == 'object' && '__getitem__' in container) {
/* 000005 */         return container.__getitem__ ([lower, upper, step]);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         return container.__getslice__ (lower, upper, step);
/* 000005 */     }
/* 000005 */ };
/* 000005 */ export function __setslice__ (container, lower, upper, step, value) {
/* 000005 */     if (typeof container == 'object' && '__setitem__' in container) {
/* 000005 */         container.__setitem__ ([lower, upper, step], value);
/* 000005 */     }
/* 000005 */     else {
/* 000005 */         container.__setslice__ (lower, upper, step, value);
/* 000005 */     }
/* 000005 */ };
/* 000015 */ 
/* 000015 */ export var BaseException =  __class__ ('BaseException', [object], {
/* 000015 */ 	__module__: __name__,
/* 000015 */ });
/* 000018 */ 
/* 000018 */ export var Exception =  __class__ ('Exception', [BaseException], {
/* 000019 */ 	__module__: __name__,
/* 000020 */ 	get __init__ () {return __get__ (this, function (self) {
/* 000020 */ 		var kwargs = dict ();
/* 000020 */ 		if (arguments.length) {
/* 000020 */ 			var __ilastarg0__ = arguments.length - 1;
/* 000020 */ 			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
/* 000020 */ 				var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000020 */ 				for (var __attrib0__ in __allkwargs0__) {
/* 000020 */ 					switch (__attrib0__) {
/* 000020 */ 						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
/* 000020 */ 						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
/* 000020 */ 					}
/* 000020 */ 				}
/* 000020 */ 				delete kwargs.__kwargtrans__;
/* 000020 */ 			}
/* 000020 */ 			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
/* 000020 */ 		}
/* 000020 */ 		else {
/* 000020 */ 			var args = tuple ();
/* 000020 */ 		}
/* 000021 */ 		self.__args__ = args;
/* 000022 */ 		try {
/* 000023 */ 			self.stack = kwargs.error.stack;
/* 000023 */ 		}
/* 000023 */ 		catch (__except0__) {
/* 000025 */ 			self.stack = 'No stack trace available';
/* 000025 */ 		}
/* 000026 */ 	});},
/* 000028 */ 	get __repr__ () {return __get__ (this, function (self) {
/* 000029 */ 		if (len (self.__args__)) {
/* 000030 */ 			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
/* 000030 */ 		}
/* 000031 */ 		else {
/* 000032 */ 			return '{}()'.format (self.__class__.__name__);
/* 000032 */ 		}
/* 000032 */ 	});},
/* 000034 */ 	get __str__ () {return __get__ (this, function (self) {
/* 000035 */ 		if (len (self.__args__) > 1) {
/* 000036 */ 			return str (tuple (self.__args__));
/* 000036 */ 		}
/* 000037 */ 		else if (len (self.__args__)) {
/* 000038 */ 			return str (self.__args__ [0]);
/* 000038 */ 		}
/* 000039 */ 		else {
/* 000040 */ 			return '';
/* 000040 */ 		}
/* 000040 */ 	});}
/* 000040 */ });
/* 000042 */ 
/* 000042 */ export var IterableError =  __class__ ('IterableError', [Exception], {
/* 000042 */ 	__module__: __name__,
/* 000043 */ 	get __init__ () {return __get__ (this, function (self, error) {
/* 000044 */ 		Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
/* 000044 */ 	});}
/* 000044 */ });
/* 000046 */ 
/* 000046 */ export var StopIteration =  __class__ ('StopIteration', [Exception], {
/* 000046 */ 	__module__: __name__,
/* 000047 */ 	get __init__ () {return __get__ (this, function (self, error) {
/* 000048 */ 		Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
/* 000048 */ 	});}
/* 000048 */ });
/* 000050 */ 
/* 000050 */ export var ValueError =  __class__ ('ValueError', [Exception], {
/* 000050 */ 	__module__: __name__,
/* 000051 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000052 */ 		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000052 */ 	});}
/* 000052 */ });
/* 000054 */ 
/* 000054 */ export var KeyError =  __class__ ('KeyError', [Exception], {
/* 000054 */ 	__module__: __name__,
/* 000055 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000056 */ 		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000056 */ 	});}
/* 000056 */ });
/* 000058 */ 
/* 000058 */ export var AssertionError =  __class__ ('AssertionError', [Exception], {
/* 000058 */ 	__module__: __name__,
/* 000059 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000060 */ 		if (message) {
/* 000061 */ 			Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000061 */ 		}
/* 000062 */ 		else {
/* 000063 */ 			Exception.__init__ (self, __kwargtrans__ ({error: error}));
/* 000063 */ 		}
/* 000063 */ 	});}
/* 000063 */ });
/* 000065 */ 
/* 000065 */ export var NotImplementedError =  __class__ ('NotImplementedError', [Exception], {
/* 000065 */ 	__module__: __name__,
/* 000066 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000067 */ 		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000067 */ 	});}
/* 000067 */ });
/* 000069 */ 
/* 000069 */ export var IndexError =  __class__ ('IndexError', [Exception], {
/* 000069 */ 	__module__: __name__,
/* 000070 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000071 */ 		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000071 */ 	});}
/* 000071 */ });
/* 000073 */ 
/* 000073 */ export var AttributeError =  __class__ ('AttributeError', [Exception], {
/* 000073 */ 	__module__: __name__,
/* 000074 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000075 */ 		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000075 */ 	});}
/* 000075 */ });
/* 000077 */ 
/* 000077 */ export var py_TypeError =  __class__ ('py_TypeError', [Exception], {
/* 000077 */ 	__module__: __name__,
/* 000078 */ 	get __init__ () {return __get__ (this, function (self, message, error) {
/* 000079 */ 		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
/* 000079 */ 	});}
/* 000079 */ });
/* 000085 */ 
/* 000085 */ export var Warning =  __class__ ('Warning', [Exception], {
/* 000085 */ 	__module__: __name__,
/* 000085 */ });
/* 000090 */ 
/* 000090 */ export var UserWarning =  __class__ ('UserWarning', [Warning], {
/* 000090 */ 	__module__: __name__,
/* 000090 */ });
/* 000093 */ 
/* 000093 */ export var DeprecationWarning =  __class__ ('DeprecationWarning', [Warning], {
/* 000093 */ 	__module__: __name__,
/* 000093 */ });
/* 000096 */ 
/* 000096 */ export var RuntimeWarning =  __class__ ('RuntimeWarning', [Warning], {
/* 000096 */ 	__module__: __name__,
/* 000096 */ });
/* 000101 */ export var __sort__ = function (iterable, key, reverse) {
/* 000101 */ 	if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {;
/* 000101 */ 		var key = null;
/* 000101 */ 	};
/* 000101 */ 	if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {;
/* 000101 */ 		var reverse = false;
/* 000101 */ 	};
/* 000101 */ 	if (arguments.length) {
/* 000101 */ 		var __ilastarg0__ = arguments.length - 1;
/* 000101 */ 		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
/* 000101 */ 			var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000101 */ 			for (var __attrib0__ in __allkwargs0__) {
/* 000101 */ 				switch (__attrib0__) {
/* 000101 */ 					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
/* 000101 */ 					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
/* 000101 */ 					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
/* 000101 */ 				}
/* 000101 */ 			}
/* 000101 */ 		}
/* 000101 */ 	}
/* 000101 */ 	else {
/* 000101 */ 	}
/* 000102 */ 	if (key) {
/* 000103 */ 		iterable.sort ((function __lambda__ (a, b) {
/* 000103 */ 			if (arguments.length) {
/* 000103 */ 				var __ilastarg0__ = arguments.length - 1;
/* 000103 */ 				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
/* 000103 */ 					var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000103 */ 					for (var __attrib0__ in __allkwargs0__) {
/* 000103 */ 						switch (__attrib0__) {
/* 000103 */ 							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
/* 000103 */ 							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
/* 000103 */ 						}
/* 000103 */ 					}
/* 000103 */ 				}
/* 000103 */ 			}
/* 000103 */ 			else {
/* 000103 */ 			}
/* 000103 */ 			return (key (a) > key (b) ? 1 : -(1));
/* 000103 */ 		}));
/* 000103 */ 	}
/* 000104 */ 	else {
/* 000105 */ 		iterable.sort ();
/* 000105 */ 	}
/* 000107 */ 	if (reverse) {
/* 000108 */ 		iterable.reverse ();
/* 000108 */ 	}
/* 000108 */ };
/* 000110 */ export var sorted = function (iterable, key, reverse) {
/* 000110 */ 	if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {;
/* 000110 */ 		var key = null;
/* 000110 */ 	};
/* 000110 */ 	if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {;
/* 000110 */ 		var reverse = false;
/* 000110 */ 	};
/* 000110 */ 	if (arguments.length) {
/* 000110 */ 		var __ilastarg0__ = arguments.length - 1;
/* 000110 */ 		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
/* 000110 */ 			var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000110 */ 			for (var __attrib0__ in __allkwargs0__) {
/* 000110 */ 				switch (__attrib0__) {
/* 000110 */ 					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
/* 000110 */ 					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
/* 000110 */ 					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
/* 000110 */ 				}
/* 000110 */ 			}
/* 000110 */ 		}
/* 000110 */ 	}
/* 000110 */ 	else {
/* 000110 */ 	}
/* 000111 */ 	if (py_typeof (iterable) == dict) {
/* 000112 */ 		var result = copy (iterable.py_keys ());
/* 000112 */ 	}
/* 000113 */ 	else {
/* 000114 */ 		var result = copy (iterable);
/* 000114 */ 	}
/* 000116 */ 	__sort__ (result, key, reverse);
/* 000117 */ 	return result;
/* 000117 */ };
/* 000121 */ export var map = function (func, iterable) {
/* 000122 */ 	return (function () {
/* 000122 */ 		var __accu0__ = [];
/* 000122 */ 		for (var item of iterable) {
/* 000122 */ 			__accu0__.append (func (item));
/* 000122 */ 		}
/* 000122 */ 		return __accu0__;
/* 000122 */ 	}) ();
/* 000122 */ };
/* 000125 */ export var filter = function (func, iterable) {
/* 000126 */ 	if (func == null) {
/* 000127 */ 		var func = bool;
/* 000127 */ 	}
/* 000128 */ 	return (function () {
/* 000128 */ 		var __accu0__ = [];
/* 000128 */ 		for (var item of iterable) {
/* 000128 */ 			if (func (item)) {
/* 000128 */ 				__accu0__.append (item);
/* 000128 */ 			}
/* 000128 */ 		}
/* 000128 */ 		return __accu0__;
/* 000128 */ 	}) ();
/* 000128 */ };
/* 000130 */ export var divmod = function (n, d) {
/* 000131 */ 	return tuple ([Math.floor (n / d), __mod__ (n, d)]);
/* 000131 */ };
/* 000237 */ 
/* 000237 */ export var __Terminal__ =  __class__ ('__Terminal__', [object], {
/* 000237 */ 	__module__: __name__,
/* 000247 */ 	get __init__ () {return __get__ (this, function (self) {
/* 000248 */ 		self.buffer = '';
/* 000250 */ 		try {
/* 000251 */ 			self.element = document.getElementById ('__terminal__');
/* 000251 */ 		}
/* 000251 */ 		catch (__except0__) {
/* 000253 */ 			self.element = null;
/* 000253 */ 		}
/* 000255 */ 		if (self.element) {
/* 000256 */ 			self.element.style.overflowX = 'auto';
/* 000257 */ 			self.element.style.boxSizing = 'border-box';
/* 000258 */ 			self.element.style.padding = '5px';
/* 000259 */ 			self.element.innerHTML = '_';
/* 000259 */ 		}
/* 000261 */ 	});},
/* 000263 */ 	get print () {return __get__ (this, function (self) {
/* 000263 */ 		var sep = ' ';
/* 000263 */ 		var end = '\n';
/* 000263 */ 		if (arguments.length) {
/* 000263 */ 			var __ilastarg0__ = arguments.length - 1;
/* 000263 */ 			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
/* 000263 */ 				var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000263 */ 				for (var __attrib0__ in __allkwargs0__) {
/* 000263 */ 					switch (__attrib0__) {
/* 000263 */ 						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
/* 000263 */ 						case 'sep': var sep = __allkwargs0__ [__attrib0__]; break;
/* 000263 */ 						case 'end': var end = __allkwargs0__ [__attrib0__]; break;
/* 000263 */ 					}
/* 000263 */ 				}
/* 000263 */ 			}
/* 000263 */ 			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
/* 000263 */ 		}
/* 000263 */ 		else {
/* 000263 */ 			var args = tuple ();
/* 000263 */ 		}
/* 000264 */ 		self.buffer = '{}{}{}'.format (self.buffer, sep.join ((function () {
/* 000264 */ 			var __accu0__ = [];
/* 000264 */ 			for (var arg of args) {
/* 000264 */ 				__accu0__.append (str (arg));
/* 000264 */ 			}
/* 000264 */ 			return __accu0__;
/* 000264 */ 		}) ()), end).__getslice__ (-(4096), null, 1);
/* 000266 */ 		if (self.element) {
/* 000267 */ 			self.element.innerHTML = self.buffer.py_replace ('\n', '<br>').py_replace (' ', '&nbsp');
/* 000268 */ 			self.element.scrollTop = self.element.scrollHeight;
/* 000268 */ 		}
/* 000269 */ 		else {
/* 000270 */ 			console.log (sep.join ((function () {
/* 000270 */ 				var __accu0__ = [];
/* 000270 */ 				for (var arg of args) {
/* 000270 */ 					__accu0__.append (str (arg));
/* 000270 */ 				}
/* 000270 */ 				return __accu0__;
/* 000270 */ 			}) ()));
/* 000270 */ 		}
/* 000270 */ 	});},
/* 000272 */ 	get input () {return __get__ (this, function (self, question) {
/* 000272 */ 		if (arguments.length) {
/* 000272 */ 			var __ilastarg0__ = arguments.length - 1;
/* 000272 */ 			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
/* 000272 */ 				var __allkwargs0__ = arguments [__ilastarg0__--];
/* 000272 */ 				for (var __attrib0__ in __allkwargs0__) {
/* 000272 */ 					switch (__attrib0__) {
/* 000272 */ 						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
/* 000272 */ 						case 'question': var question = __allkwargs0__ [__attrib0__]; break;
/* 000272 */ 					}
/* 000272 */ 				}
/* 000272 */ 			}
/* 000272 */ 		}
/* 000272 */ 		else {
/* 000272 */ 		}
/* 000273 */ 		self.print ('{}'.format (question), __kwargtrans__ ({end: ''}));
/* 000274 */ 		var answer = window.prompt ('\n'.join (self.buffer.py_split ('\n').__getslice__ (-(16), null, 1)));
/* 000275 */ 		self.print (answer);
/* 000276 */ 		return answer;
/* 000278 */ 	});}
/* 000278 */ });
/* 000280 */ export var __terminal__ = __Terminal__ ();
/* 000282 */ export var print = __terminal__.print;
/* 000282 */ 