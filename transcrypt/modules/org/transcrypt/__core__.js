__pragma__ ('stripcomments')

/* Nested module-object creator, part of the nesting may already exist and have attributes

A Transcrypt applicaton consists of a main module and additional modules.
Transcrypt modules constitute a unique, unambiguous tree by their dotted names, no matter which of the alternative module root paths they come from.
The main module is represented by a main function with the name of the application.
The locals of this function constitute the outer namespace of the Transcrypt application.
References to all local variables of this function are also assigned to attributes of local variable __all__, using the variable names as an attribute names.
The main function returns this local variable __all__ (that inside the function is also known by the name __world__)
Normally this function result is assigned to window.<application name>.
The function may than be exitted (unless its main line starts an ongoing activity), but the application namespace stays alive by the reference that window has to it.
In case of the ongoing activity including the script is enough to start it, in other cases it has to be started explicitly by calling window.<application name>.<entrypoint function>.
There may be multiple such entrypoint functions.

Additional modules are represented by objects rather than functions, nested into __world__ (so into __all__ of the main function).
This nesting can be directly or indirectly, according to the dotted paths of the additional modules.
One of the methods of the module object is the __init__ function, that's executed once at module initialisation time.

The additional modules also have an __all__ variable, an attribute rather than a local variable.
However this __all__ object is passed to the __init__ function, so becomes a local variable there.
Variables in additional modules first become locals to the __init__ function but references to all of them are assigned to __all__ under their same names.
This resembles the cause of affairs in the main function.
However __world__ only referes to the __all__ of the main module, not of any additional modules.
Importing a module boils down to adding all members of its __all__ to the local namespace, directly or via dotted access, depending on the way of import.

In each local namespace of the module function (main function for main module, __init__ for additional modules) there's a variable __name__ holding the name of the module.
Classes are created inside the static scope of a particular module, and at that (class creation) time their variable __module__ gets assigned a reference to __name__.
This assignement is generated explicitly by the compiler, as the class creation function __new__ of the metaclass isn't in the static scope containing __name__.

In case of
    import a
    import a.b
a will have been created at the moment that a.b is imported,
so all a.b. is allowed to do is an extra attribute in a, namely a reference to b,
not recreate a, since that would destroy attributes previously present in a

In case of
    import a.b
    import a
a will have to be created at the moment that a.b is imported

In general in a chain
    import a.b.c.d.e
a, a.b, a.b.c and a.b.c.d have to exist before e is created, since a.b.c.d should hold a reference to e.
Since this applies recursively, if e.g. c is already created, we can be sure a and a.b. will also be already created.

So to be able to create e, we'll have to walk the chain a.b.c.d, starting with a.
As soon as we encounter a module in the chain that isn't already there, we'll have to create the remainder (tail) of the chain.

e.g.
    import a.b.c.d.e
    import a.b.c

will generate
    var modules = {};
    __nest__ (a, 'b.c.d.e', __init__ (__world__.a.b.c.d.e));
    __nest__ (a, 'b.c', __init__ (__world__.a.b.c));

The task of the __nest__ function is to start at the head object and then walk to the chain of objects behind it (tail),
creating the ones that do not exist already, and insert the necessary module reference attributes into them.
*/

export function __nest__ (headObject, tailNames, value) {
    var current = headObject;
    // In some cases this will be <main function>.__all__,
    // which is the main module and is also known under the synonym <main function.__world__.
    // N.B. <main function> is the entry point of a Transcrypt application,
    // Carrying the same name as the application except the file name extension.

    if (tailNames != '') {  // Split on empty string doesn't give empty list
        // Find the last already created object in tailNames
        var tailChain = tailNames.split ('.');
        var firstNewIndex = tailChain.length;
        for (var index = 0; index < tailChain.length; index++) {
            if (!current.hasOwnProperty (tailChain [index])) {
                firstNewIndex = index;
                break;
            }
            current = current [tailChain [index]];
        }

        // Create the rest of the objects, if any
        for (var index = firstNewIndex; index < tailChain.length; index++) {
            current [tailChain [index]] = {};
            current = current [tailChain [index]];
        }
    }

    // Insert its new properties, it may have been created earlier and have other attributes
    for (let attrib of Object.getOwnPropertyNames (value)) {
        Object.defineProperty (current, attrib, {
            get () {return value [attrib];},
            enumerable: true,
            configurable: true
        });
    }
};

// Initialize module if not yet done and return its globals
export function __init__ (module) {
    if (!module.__inited__) {
        module.__all__.__init__ (module.__all__);
        module.__inited__ = true;
    }
    return module.__all__;
};

// Since we want to assign functions, a = b.f should make b.f produce a bound function
// So __get__ should be called by a property rather then a function
// Factory __get__ creates one of three curried functions for func
// Which one is produced depends on what's to the left of the dot of the corresponding JavaScript property
export function __get__ (aThis, func, quotedFuncName) {// Param aThis is thing before the dot, if it's there
    if (aThis) {
        if (aThis.hasOwnProperty ('__class__') || typeof aThis == 'string' || aThis instanceof String) {           // Object before the dot
            var bound = function () {                                   // Return bound function, code duplication for efficiency if no memoizing
                var args = [] .slice.apply (arguments);             // So multilayer search prototype, apply __get__, call curry func that calls func
                return func.apply (null, [aThis.__proxy__ ? aThis.__proxy__ : aThis] .concat (args));
            };

            if (quotedFuncName) {                                   // Memoize call since fcall is on, by installing bound function in instance
                Object.defineProperty (func, "name", {value:quotedFuncName})
                // copy addintional attributes
                for(var n in func) {
                  bound[n] = func[n];
                }
                bound.__repr__ = function() {
                  return "method {} of {}".format(quotedFuncName, repr(aThis)); };

                Object.defineProperty (aThis, quotedFuncName, {      // Will override the non-own property, next time it will be called directly
                    value: bound,
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            return bound;
        }
        else {                                                      // Class before the dot
            return func;                                            // Return static method
        }
    }
    else {                                                          // Nothing before the dot
        return func;                                                // Return free function
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


function _is_python_descryptor(descript) {
  if (descript.value === undefined || descript.value === null)
    return false;

  return descript.value.__get__ !== undefined;
}

function _to_python_descriptor(instance, descript) {
  // use python descriptor protocol
  var value = descript.value;

  var get = value.__get__;
  descript.get = function() {
      return get(instance);
  }

  if (value.__set__) {
    var set = value.__set__;
    descript.set = function(val) {
        set(instance, val);
    }
  }

  delete descript.value;
  delete descript.writable;
  return descript;
}

// Mother of all metaclasses
export var py_metatype = {
    __name__: 'type',
    __bases__: [],
    __class_attribs__: {__init__: true},

    // Overridable class creation worker
    __new__: function (meta, name, bases, attribs) {
        // Create the class cls, a functor, which the class creator function will return
        var cls = function () {                     // If cls is called with arg0, arg1, etc, it calls its __new__ method with [arg0, arg1, etc]
            var args = [] .slice.apply (arguments); // It has a __new__ method, not yet but at call time, since it is copied from the parent in the loop below
            return cls.__new__ (args);              // Each Python class directly or indirectly derives from object, which has the __new__ method
        };                                          // If there are no bases in the Python source, the compiler generates [object] for this parameter

        var python_descriptors = []

        // Copy all methods, including __new__, properties and static attributes from base classes to new cls object
        // The new class object will simply be the prototype of its instances
        // JavaScript prototypical single inheritance will do here, since any object has only one class
        // This has nothing to do with Python multiple inheritance, that is implemented explictly in the copy loop below
        for (var index = bases.length - 1; index >= 0; index--) {   // Reversed order, since class vars of first base should win
            var base = bases [index];
            for (var attrib in base) {
                var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                if (descrip == null) {  // Another library modified Function.prototype
                    continue;
                }
                Object.defineProperty (cls, attrib, descrip);
                if (_is_python_descryptor (descrip))
                    python_descriptors.push (attrib);
            }
            for (let symbol of Object.getOwnPropertySymbols (base)) {
                let descrip = Object.getOwnPropertyDescriptor (base, symbol);
                Object.defineProperty (cls, symbol, descrip);
            }
        }

        // Add class specific attributes to the created cls object
        cls.__metaclass__ = meta;
        cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
        cls.__bases__ = bases;
        cls.__class_attribs__ = attribs;

        if (! ("__init__" in attribs)) {
            attribs["__init__"] = function() {
                __super__.call(this, cls, "__init__", arguments[0]).apply(this, arguments);
            }
        }

        // Add own methods, properties and own static attributes to the created cls object
        for (var attrib in attribs) {
            var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
            Object.defineProperty (cls, attrib, descrip);
            if (_is_python_descryptor (descrip))
                python_descriptors.push (attrib);
        }
        for (let symbol of Object.getOwnPropertySymbols (attribs)) {
            let descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
            Object.defineProperty (cls, symbol, descrip);
        }

        if (python_descriptors.length)
            cls.__descriptors__ = python_descriptors;

        meta.__init__(cls, name, bases, attribs)
        // Return created cls object
        return cls;
    },

    __init__: function(cls, name, bases, attribs) {
    }
};
py_metatype.__metaclass__ = py_metatype;

// Mother of all classes
export var object = {
    __init__: function (self) {},

    __metaclass__: py_metatype, // By default, all classes have metaclass type, since they derive from object
    __name__: 'object',
    __class_attribs__: {__init__: true},
    __bases__: [],

    // Object creator function, is inherited by all classes (so could be global)
    __new__: function (args) {  // Args are just the constructor args
        // In JavaScript the Python class is the prototype of the Python object
        // In this way methods and static attributes will be available both with a class and an object before the dot
        // The descriptor produced by __get__ will return the right method flavor
        var instance = Object.create (this, {__class__: {value: this, enumerable: true}});

        if ('__getattr__' in this || '__setattr__' in this) {
            instance.__proxy__ = new Proxy (instance, {
                get: function (target, name) {
                    let result = target [name];
                    if (result === undefined) {  // Target doesn't have attribute named name
                        return target.__getattr__ (name);
                    }
                    else {
                        return result;	// Will be bound to the target.__proxy__ to allow call chaining (as in issue #587)
                    }
                },
                set: function (target, name, value) {
                    try {
                        target.__setattr__ (name, value);
                    }
                    catch (exception) {         // Target doesn't have a __setattr__ method
                        target [name] = value;
                    }
                    return true;
                }
            })
			      instance = instance.__proxy__
        }

        if (this.__descriptors__) {
            for (var attrib of this.__descriptors__) {
                var descrip = Object.getOwnPropertyDescriptor (this, attrib);
                Object.defineProperty (instance, attrib, _to_python_descriptor(instance, descrip));
            }
        }

        // Call constructor
        this.__init__.apply (null, [instance] .concat (args));

        // Return constructed instance
        return instance;
    }
};

// Class creator facade function, calls class creation worker
export function __class__ (name, bases, attribs, meta) {         // Parameter meta is optional
    if (meta === undefined) {
        meta = py_metatype;
        for(let b of bases) {
            if (b.__metaclass__ !== py_metatype) {
                meta = b.__metaclass__;
                break;
            }
        }
    }
    return meta.__new__ (meta, name, bases, attribs);
};

// Define __pragma__ to preserve '<all>' and '</all>', since it's never generated as a function, must be done early, so here
export function __pragma__ () {};
