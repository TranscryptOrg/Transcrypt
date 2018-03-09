import {__rt__} from './__transcrypt_runtime_3_6_101__.mod.js';

var animals = (function () {
    var __all__ = {};
    var __init__ = __rt__.__init__ (__rt__) .__init__;
    var __nest__ = __init__ (__rt__) .__nest__;
    var __class__ = __init__ (__rt__) .__class__;
    var __get__ = __init__ (__rt__) .__get__;
    var __pragma__ = __init__ (_rt__) .__pragma__;
    
    var __name__ = '__main__';
    var asm =  __init__ (__world__.animals_submodule);
"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

    var _individuals = dict ({});
    var find = function (py_name) {
        return _individuals [py_name];
    };
    var Animal = __class__ ('Animal', [object], {
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
    __pragma__ ('<use>' +
        '__rt__' +
        'animals_submodule' +
    '</use>')
    __pragma__ ('<all>')
        __all__.Animal = Animal;
        __all__.__name__ = __name__;
        __all__._individuals = _individuals;
        __all__.find = find;
    __pragma__ ('</all>')
    return __all__;
}) ();

export {animals};
