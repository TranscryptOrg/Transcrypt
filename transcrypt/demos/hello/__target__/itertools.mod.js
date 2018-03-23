import {list, tuple} from './org.transcrypt.__runtime__.mod.js';
var __name__ = 'itertools';
export var chain = function () {
    var args = [] .slice.apply (arguments);
    var result = [];
    for (var index = 0; index < args.length; index++) {
        result = result.concat (args [index]);
    }
    return list (result);
}