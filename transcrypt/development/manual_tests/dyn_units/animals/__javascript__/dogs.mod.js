"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

import {__rt__} from './__transcrypt_runtime_3_6_101__.mod.js';
import {animals} from './animals.mod.js';
import {dogs_submodule} from './dogs_submodule.mod.js';

var dogs = function () {
    __all__ = {};
    var __init__ = __rt__.__init__ (__rt__) .__init__;
    var __nest__ = __rt__.__init__ (__rt__) .__nest__;
    var __class__ = __init__ (__rt__) .__class__;
    var __get__ = __init__ (__rt__) .__get__;
    var __pragma__ = __init__ (_rt__) .__pragma__;
    
    var dsm =  __init__ (dogs_submodule);
    
    var Dog = __class__ ('Dog', [Animal], {
        __module__: __name__,
        get __init__ () {return __get__ (this, function (self, py_name) {
            self.species = dsm.getTaxoTag ();
            __super__ (Dog, '__init__') (self, py_name, 'meat', 'wooof');
        });}
    });
    __pragma__ ('<use>' +
        '__rt__' +
        'dogs_submodule' +
    '</use>')
    __pragma__ ('<all>');
        __all__.Dog = Dog;
    __pragma__ ('</all>');
    
    return __all__;
};

export {dogs};
