"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

import {__class__, __get__, __pragma__, dict, object, __super__} from './__transcrypt_runtime_3_6_101__.mod.js';
import {Animal} from './animals.mod.js';
import * as dsm from './dogs_submodule.mod.js';

export var __name__ = 'dogs';
console.log (__name__);

export var Dog = __class__ ('Dog', [Animal], {
    __module__: __name__,
    get __init__ () {return __get__ (this, function (self, py_name) {
        self.species = dsm.getTaxoTag ();
        __super__ (Dog, '__init__') (self, py_name, 'meat', 'wooof');
    });}
});

