"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

import {__rt__} from './__transcrypt_runtime_3_6_101__.mod.js';
import {animals} from './animals.mod.js';
import {cats_submodule} from './cats_submodule.mod.js';

var cats = function () {
    __all__ = {};
    var __init__ = __rt__.__init__ (__rt__) .__init__;
    var __nest__ = __init__ (__rt__) .__nest__;
    var __class__ = __init__ (__rt__) .__class__;
    var __get__ = __init__ (__rt__) .__get__;
    var __pragma__ = __init__ (_rt__) .__pragma__;
    
    var csm =  __init__ (cats_submodule);
    
    var Cat = __class__ ('Cat', [Animal], {
        __module__: __name__,
        get __init__ () {return __get__ (this, function (self, py_name) {
            self.species = csm.getTaxoTag ();
            __super__ (Cat, '__init__') (self, py_name, 'fish', 'mraaaw');
        });}
    });
    __pragma__ ('<use>' +
        '__rt__' +
        'cats_submodule' +
    '</use>')
    __pragma__ ('<all>');
        __all__.Cat = Cat;
    __pragma__ ('</all>');
    
    return __all__;
}

export {cats};
