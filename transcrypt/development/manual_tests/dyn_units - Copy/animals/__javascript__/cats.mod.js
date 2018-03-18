"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

import {__class__, __get__, __pragma__, dict, object, __super__} from './__transcrypt_runtime_3_6_101__.mod.js';
import {Animal} from './animals.mod.js';
import * as csm from './cats_submodule.mod.js';
   
export var __name__ = 'cats';
console.log (__name__);

export var Cat = __class__ ('Cat', [Animal], {
    __module__: __name__,
    get __init__ () {return __get__ (this, function (self, py_name) {
        self.species = csm.getTaxoTag ();
        __super__ (Cat, '__init__') (self, py_name, 'fish', 'mraaaw');
    });}
});

