var modules = {};
import {__envir__, __nest__, __init__, __get__, __getcm__, __getsm__, py_metatype, object, __class__, __pragma__, __call__, __kwargtrans__, __globals__, __super__, property, __setProperty__, __merge__, dir, setattr, getattr, hasattr, delattr, __in__, __specialattrib__, len, __i__, __k__, __t__, float, int, bool, py_typeof, issubclass, isinstance, callable, repr, chr, ord, max, min, abs, round, py_reversed, zip, range, any, all, sum, enumerate, copy, deepcopy, list, tuple, set, bytearray, bytes, str, dict, __jsmod__, __mod__, __pow__, __neg__, __matmul__, __mul__, __truediv__, __floordiv__, __add__, __sub__, __lshift__, __rshift__, __or__, __xor__, __and__, __eq__, __ne__, __lt__, __le__, __gt__, __ge__, __imatmul__, __ipow__, __ijsmod__, __imod__, __imul__, __idiv__, __iadd__, __isub__, __ilshift__, __irshift__, __ior__, __ixor__, __iand__, __getitem__, __setitem__, __getslice__, __setslice__, Exception, IterableError, StopIteration, ValueError, KeyError, AssertionError, NotImplementedError, IndexError, AttributeError, TypeError, Warning, UserWarning, DeprecationWarning, RuntimeWarning, __sort__, sorted, map, filter, complex, __conj__, __Terminal__, __terminal__, print} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'modules.mod5';
import * as __module_modules_mod4__ from './modules.mod4.mod.js';
__nest__ (modules, 'mod4', __module_modules_mod4__);

/*
    for (let symbol of Object.getOwnPropertySymbols (value)) {
        let descrip = Object.getOwnPropertyDescriptor (value, symbol);
        Object.defineProperty (current, symbol, descrip);
    }
*/
/*
    Object.defineProperty (modules, 'mod4', {
      get() {return __module_modules_mod4__;},
      enumerable: true,
      configurable: true
    });
*/
/*
function NEST (parentMod, childName, childMod) {
    Object.defineProperty (parentMod, childName, {
      get() {return childMod;},
      enumerable: true,
      configurable: true
    });
}
*/

function NEST (parentMod, childName, childMod) {
    // Define module object
    var childObj = {};
    
    console.log (787, childMod);
    
    /*
    for (var attrib in childMod) {
        console.log (555, attrib)
        var descrip = Object.getOwnPropertyDescriptor (childMod, attrib);
        Object.defineProperty (childObj, attrib, descrip);
    }                    

    for (let name of Object.getOwnPropertyNames (childMod)) {
        console.log (666, name)
        let descrip = Object.getOwnPropertyDescriptor (childMod, name);
        Object.defineProperty (childObj, name, descrip);
    }
    */
    
    for (let attrib of Object.getOwnPropertyNames (childMod)) {       
        Object.defineProperty (childObj, attrib, {
            get() {return childMod [attrib];},
            enumerable: true,
            configurable: true        
        });
    }
    
    /*
    // Give it the required exported method
    Object.defineProperty (childObj, 'mod4Add1', {
        get() {return childMod.mod4Add1;},
        enumerable: true,
        configurable: true        
    });
    */
    
    parentMod [childName] = childObj;
}

NEST (modules, 'mod4', __module_modules_mod4__);

modules.mod4.pi = 3.14;

console.log (modules.mod4);

export var mod5Add2 = function (variable) {
	return modules.mod4.mod4Add1 (variable + 1);
};