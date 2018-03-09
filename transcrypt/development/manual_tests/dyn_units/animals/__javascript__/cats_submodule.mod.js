"use strict";
// Transcrypt'ed from Python, 2018-03-09 13:41:41

import {__rt__} from './__transcrypt_runtime_3_6_101__.mod.js';

var cats_submodule = function () {
    __all__ = {};

    var __init__ = __rt__.__init__ (__rt__) .__init__;
    var __nest__ = __init__ (__rt__) .__nest__;
    var __class__ = __init__ (__rt__) .__class__;
    var __get__ = __init__ (__rt__) .__get__;
    var __pragma__ = __init__ (_rt__) .__pragma__;
    
	__nest__ (
		__all__,
		'cats_submodule', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var getTaxoTag = function () {
						return 'cat';
					};
					__pragma__ ('<all>')
						__all__.getTaxoTag = getTaxoTag;
					__pragma__ ('</all>')
				}
			}
		}
	);
    
    return __all__;
};

export {cats_submodule};
