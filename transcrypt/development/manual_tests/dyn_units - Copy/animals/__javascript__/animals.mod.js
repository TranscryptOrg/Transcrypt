"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

import {__class__, __get__, __pragma__, dict, object, __super__} from './__transcrypt_runtime_3_6_101__.mod.js';
import * as asm from './animals_submodule.mod.js';

export var __name__ = 'animals';
console.log (__name__);

export var _individuals = dict ({});

export var find = function (py_name) {
    return _individuals [py_name];
};

export var Animal = __class__ ('Animal', [object], {
    __module__: __name__,
    get __init__ () {return __get__ (this, function (self, py_name, food, sound) {
        _individuals [py_name] = self;
        self.py_name = py_name;
        self.food = food;
        self.sound = sound;
        self.fed = false;
        document.getElementById (self.py_name).innerHTML = self.speak ('I was born just now! My kingdom is: {}. My species is {}'.format (asm.getTaxoTag (), self.species));
    });},
    get speak () {return __get__ (this, function (self, text) {
        return '{} says: '.format (self.py_name) + text;
    });},
    get feed () {return __get__ (this, function (self) {
        document.getElementById (self.py_name).innerHTML = self.speak ((self.fed ? 'No thanks, I first want to greet you with {}!'.format (self.sound) : 'Thanks a lot, I am now eating {}!'.format (self.food)));
        self.fed = true;
    });},
    get greet () {return __get__ (this, function (self) {
        document.getElementById (self.py_name).innerHTML = self.speak ((self.fed ? '{}, {}, {}!'.format (self.sound, self.sound, self.sound) : 'Sorry, I want to eat {} first!'.format (self.food)));
        self.fed = false;
    });}
});

